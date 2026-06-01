// POST /api/stripe/webhook
//
// Stripe events land here. Signature is verified against
// STRIPE_WEBHOOK_SECRET (whsec_...) before any side effects fire.
//
// Local dev: run `stripe listen --forward-to localhost:3000/api/stripe/webhook`
//            and copy the printed `whsec_...` into .env.local.
// Prod:      configure the endpoint in Stripe Dashboard → Webhooks. That
//            dashboard endpoint has its own `whsec_...`, different from
//            the CLI's. Same env var name, different value per environment.
//
// We listen for checkout.session.completed for one-time and subscription
// orders. The handler is idempotent at the email level — we'd want a DB
// or a Stripe-side idempotency mark before we make it truly idempotent.
// For now: low volume + manual fulfillment, duplicate emails are fine.

import { type NextRequest } from "next/server";
import type Stripe from "stripe";
import { sendOrderEmails, type OrderLineItem } from "@/lib/email";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return new Response("Missing stripe-signature header", { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("[webhook] STRIPE_WEBHOOK_SECRET is not set");
    return new Response("Webhook misconfigured", { status: 500 });
  }

  let stripe: Stripe;
  try {
    stripe = getStripe();
  } catch (e) {
    console.error("[webhook] Stripe client unavailable", e);
    return new Response("Stripe client misconfigured", { status: 500 });
  }

  // Raw body string — required for signature verification.
  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch (e) {
    console.error("[webhook] failed to read raw body", e);
    return new Response("Could not read request body", { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    console.error("[webhook] signature verification failed", message);
    return new Response(`Signature verification failed: ${message}`, {
      status: 400,
    });
  }

  console.info("[webhook] received event", {
    id: event.id,
    type: event.type,
    livemode: event.livemode,
  });

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutCompleted(
          stripe,
          event.data.object as Stripe.Checkout.Session,
        );
        break;
      // Subscription billing (Stage E) — invoice.paid + customer.subscription.*
      // will be added when the subscription Checkout goes live.
      default:
        // Stripe sends a wide stream of events; we ignore the ones we
        // don't care about and 200 anyway so Stripe doesn't retry.
        console.info("[webhook] ignored event type", { type: event.type });
    }
  } catch (e) {
    console.error("[webhook] handler threw — returning 500 so Stripe retries", e);
    return new Response("Handler error", { status: 500 });
  }

  return new Response(null, { status: 200 });
}

async function handleCheckoutCompleted(
  stripe: Stripe,
  session: Stripe.Checkout.Session,
) {
  // The session in the webhook payload doesn't carry line_items by
  // default — fetch the expanded version so we can render a friendly
  // owner notification.
  const expanded = await stripe.checkout.sessions.retrieve(session.id, {
    expand: ["line_items.data.price.product"],
  });

  const items: OrderLineItem[] = (expanded.line_items?.data ?? []).map(
    (li) => ({
      description: li.description ?? "(unnamed line item)",
      amount: formatAmount(li.amount_total ?? 0, expanded.currency ?? "usd"),
    }),
  );

  const total = formatAmount(
    expanded.amount_total ?? 0,
    expanded.currency ?? "usd",
  );

  const packageName =
    expanded.metadata?.packageName ??
    expanded.line_items?.data[0]?.description ??
    "Web Design package";

  const customerEmail =
    expanded.customer_details?.email ??
    expanded.customer_email ??
    "(no email)";
  const customerName = expanded.customer_details?.name ?? null;

  const dashboardUrl = `https://dashboard.stripe.com/${
    expanded.livemode ? "" : "test/"
  }checkout/sessions/${expanded.id}`;

  const result = await sendOrderEmails({
    sessionId: expanded.id,
    packageName,
    mode: expanded.mode === "subscription" ? "subscription" : "payment",
    customerEmail,
    customerName,
    totalDisplay: total,
    currency: expanded.currency ?? "usd",
    items,
    dashboardUrl,
  });
  console.info("[webhook] order emails dispatched", {
    sessionId: expanded.id,
    owner: result.ownerResult,
    customer: result.customerResult,
  });
}

/** Format Stripe's smallest-unit integer as a display string. */
function formatAmount(amount: number, currency: string): string {
  // Most currencies use 2 decimal places; Stripe's amounts come in the
  // smallest unit (cents for USD). USD with whole dollars looks cleaner
  // without trailing .00 — match the rest of the site's price display.
  const dollars = amount / 100;
  const wholeNumber = Number.isInteger(dollars);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
    minimumFractionDigits: wholeNumber ? 0 : 2,
    maximumFractionDigits: wholeNumber ? 0 : 2,
  }).format(dollars);
}
