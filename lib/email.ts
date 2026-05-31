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
