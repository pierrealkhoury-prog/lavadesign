import { Resend } from "resend";

/**
 * Email sending — wires the studio's contact form to Resend.
 *
 * Required env: RESEND_API_KEY  (set in .env.local; never committed)
 *
 * Optional env:
 *   - RESEND_FROM_EMAIL — sender. Defaults to "Lava Design <onboarding@resend.dev>",
 *     Resend's sandbox sender, which works without domain verification but can
 *     only deliver to the email registered to the Resend account. Once the
 *     lavadesign.us domain is verified in Resend, set this to e.g.
 *     "Lava Design <inquiry@lavadesign.us>".
 *   - INQUIRY_RECIPIENT — destination inbox. Defaults to info@lavadesign.us
 *     (the studio inbox per Pierre's spec). Override during development if
 *     the sandbox sender restricts delivery to a different address.
 */
export type InquiryEmailPayload = {
  name: string;
  email: string;
  message: string;
  discipline: string | null;
};

export type SendResult =
  | { ok: true; id: string }
  | { ok: false; error: string };

const DEFAULT_RECIPIENT = "info@lavadesign.us";
const DEFAULT_FROM = "Lava Design <onboarding@resend.dev>";

export async function sendInquiryNotification(
  payload: InquiryEmailPayload,
): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.INQUIRY_RECIPIENT ?? DEFAULT_RECIPIENT;

  // No key configured (e.g. local dev without secrets) — log the inquiry so
  // we have a trail, but don't throw. The DB write path runs independently;
  // the contact server action treats either path succeeding as success.
  if (!apiKey) {
    console.warn("[email] RESEND_API_KEY not set — email skipped", {
      to: recipient,
      from: payload.email,
      name: payload.name,
      discipline: payload.discipline,
    });
    return { ok: false, error: "RESEND_API_KEY not configured" };
  }

  const resend = new Resend(apiKey);
  const from = process.env.RESEND_FROM_EMAIL ?? DEFAULT_FROM;

  try {
    const result = await resend.emails.send({
      from,
      to: recipient,
      replyTo: payload.email,
      subject: `New inquiry — ${payload.name}`,
      text: renderInquiryText(payload),
    });
    if (result.error) {
      console.error("[email] Resend rejected the send", result.error);
      return { ok: false, error: result.error.message };
    }
    console.info("[email] inquiry notification sent", {
      id: result.data?.id,
      to: recipient,
    });
    return { ok: true, id: result.data?.id ?? "unknown" };
  } catch (error) {
    console.error("[email] Resend send threw", error);
    return {
      ok: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

function renderInquiryText(p: InquiryEmailPayload): string {
  return [
    `New inquiry from the lavadesign.us contact form.`,
    ``,
    `Name:       ${p.name}`,
    `Email:      ${p.email}`,
    `Discipline: ${p.discipline ?? "(not specified)"}`,
    ``,
    `Message`,
    `———————`,
    p.message,
    ``,
    `Reply directly to this email to respond — replyTo is set to ${p.email}.`,
  ].join("\n");
}

// ─── Web-design orders ──────────────────────────────────────────────────────

export type OrderLineItem = {
  description: string;
  /** Display amount in major units, e.g. "$2,600" or "$95/mo". */
  amount: string;
};

export type OrderEmailPayload = {
  /** Stripe Checkout session id — for cross-referencing with the dashboard. */
  sessionId: string;
  /** "Business Website", "Care+", etc. */
  packageName: string;
  /** "payment" (one-off) or "subscription" (recurring). */
  mode: "payment" | "subscription";
  /** Customer details, as collected by Stripe. */
  customerEmail: string;
  customerName?: string | null;
  /** Total in major units, e.g. "$4,010". */
  totalDisplay: string;
  currency: string;
  /** Line items (package + each add-on, or subscription only). */
  items: OrderLineItem[];
  /** "https://dashboard.stripe.com/test/payments/pi_..." */
  dashboardUrl?: string;
};

/**
 * Two emails fire after a successful Checkout: one to Pierre (the team
 * inbox, so the work can start) and one to the customer (confirmation
 * + what happens next). Either failing doesn't fail the webhook — we
 * just log; Stripe Dashboard remains the source of truth.
 *
 * Heads-up on the customer email in dev: the default Resend sender
 * (onboarding@resend.dev) only delivers to the address registered to
 * the Resend account. Customer confirmations will bounce until the
 * lavadesign.us domain is verified in Resend and RESEND_FROM_EMAIL is
 * set to something like "Lava Design <orders@lavadesign.us>".
 */
export async function sendOrderEmails(
  p: OrderEmailPayload,
): Promise<{
  ownerResult: SendResult;
  customerResult: SendResult;
}> {
  return {
    ownerResult: await sendOwnerOrderEmail(p),
    customerResult: await sendCustomerOrderEmail(p),
  };
}

async function sendOwnerOrderEmail(p: OrderEmailPayload): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.INQUIRY_RECIPIENT ?? DEFAULT_RECIPIENT;
  if (!apiKey) {
    console.warn("[email] RESEND_API_KEY not set — order owner email skipped", {
      to: recipient,
      sessionId: p.sessionId,
      packageName: p.packageName,
      total: p.totalDisplay,
    });
    return { ok: false, error: "RESEND_API_KEY not configured" };
  }
  const resend = new Resend(apiKey);
  const from = process.env.RESEND_FROM_EMAIL ?? DEFAULT_FROM;
  const subject = `New web-design order — ${p.packageName} — ${p.totalDisplay}`;
  try {
    const result = await resend.emails.send({
      from,
      to: recipient,
      replyTo: p.customerEmail,
      subject,
      text: renderOwnerOrderText(p),
    });
    if (result.error) {
      console.error("[email] order owner email rejected", result.error);
      return { ok: false, error: result.error.message };
    }
    console.info("[email] order owner email sent", {
      id: result.data?.id,
      to: recipient,
      sessionId: p.sessionId,
    });
    return { ok: true, id: result.data?.id ?? "unknown" };
  } catch (error) {
    console.error("[email] order owner email threw", error);
    return {
      ok: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

async function sendCustomerOrderEmail(
  p: OrderEmailPayload,
): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[email] RESEND_API_KEY not set — customer email skipped", {
      to: p.customerEmail,
      sessionId: p.sessionId,
    });
    return { ok: false, error: "RESEND_API_KEY not configured" };
  }
  const resend = new Resend(apiKey);
  const from = process.env.RESEND_FROM_EMAIL ?? DEFAULT_FROM;
  const replyTo = process.env.INQUIRY_RECIPIENT ?? DEFAULT_RECIPIENT;
  const subject = `Order received — ${p.packageName}`;
  try {
    const result = await resend.emails.send({
      from,
      to: p.customerEmail,
      replyTo,
      subject,
      text: renderCustomerOrderText(p),
    });
    if (result.error) {
      console.error("[email] customer order email rejected", result.error);
      return { ok: false, error: result.error.message };
    }
    console.info("[email] customer order email sent", {
      id: result.data?.id,
      to: p.customerEmail,
      sessionId: p.sessionId,
    });
    return { ok: true, id: result.data?.id ?? "unknown" };
  } catch (error) {
    console.error("[email] customer order email threw", error);
    return {
      ok: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

function renderOwnerOrderText(p: OrderEmailPayload): string {
  const modeLabel = p.mode === "subscription" ? "Subscription" : "One-time";
  const lines = [
    `New web-design ${modeLabel.toLowerCase()} order on lavadesign.us.`,
    ``,
    `Package:    ${p.packageName}`,
    `Mode:       ${modeLabel}`,
    `Customer:   ${p.customerName ?? "(no name supplied)"} <${p.customerEmail}>`,
    `Total:      ${p.totalDisplay} ${p.currency.toUpperCase()}`,
    ``,
    `Items`,
    `———————`,
    ...p.items.map((it) => `· ${it.description.padEnd(50)} ${it.amount}`),
    ``,
    `Stripe session: ${p.sessionId}`,
  ];
  if (p.dashboardUrl) lines.push(`Dashboard:      ${p.dashboardUrl}`);
  lines.push(
    ``,
    `Reply directly to this email to reach the customer — replyTo is ${p.customerEmail}.`,
  );
  return lines.join("\n");
}

function renderCustomerOrderText(p: OrderEmailPayload): string {
  return [
    `Thanks — your order is in.`,
    ``,
    `We've received your ${p.packageName} order from lavadesign.us. The studio will be in touch within one business day to schedule kickoff and send a short intake form.`,
    ``,
    `Order details`,
    `—————————————`,
    ...p.items.map((it) => `· ${it.description.padEnd(50)} ${it.amount}`),
    ``,
    `Total: ${p.totalDisplay} ${p.currency.toUpperCase()}`,
    ``,
    `Stripe will send a separate receipt to this address.`,
    ``,
    `Reply to this email if you have any questions — it reaches us directly.`,
    ``,
    `— Lava Design`,
  ].join("\n");
}
