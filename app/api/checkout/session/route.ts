// POST /api/checkout/session
//
// Receives { packageSlug, addonSlugs[] } from the configurator client,
// validates every slug against the canonical data in lib/web-design.ts,
// builds Stripe line items using the server-known Stripe Price IDs,
// creates a Checkout Session, and returns its url for the client to
// redirect to.
//
// Security model: the client only ever sends slugs (internal IDs).
// Prices live in lib/web-design.ts and the actual amounts come from
// Stripe at the Price ID level. A malicious client cannot lower the
// total by tampering with the request body — slugs that don't exist
// 400, and unknown slugs are silently dropped.

import { NextRequest } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import {
  ADDONS,
  MAINTENANCE,
  PACKAGES,
  getAddon,
  getMaintenancePlan,
  getPackage,
} from "@/lib/web-design";

export const runtime = "nodejs";

type CheckoutRequestBody = {
  // One-time package purchase
  packageSlug?: string;
  addonSlugs?: string[];
  // Subscription (mutually exclusive with the package fields)
  maintenanceSlug?: string;
};

export async function POST(request: NextRequest) {
  let body: CheckoutRequestBody;
  try {
    body = (await request.json()) as CheckoutRequestBody;
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    new URL(request.url).origin;

  try {
    const stripe = getStripe();
    const params = body.maintenanceSlug
      ? buildSubscriptionParams(body, baseUrl)
      : buildPaymentParams(body, baseUrl);
    if ("error" in params) {
      return Response.json({ error: params.error }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create(params);
    if (!session.url) {
      console.error("[checkout] Stripe returned a session without a url", {
        id: session.id,
      });
      return Response.json(
        { error: "Could not start checkout. Please try again." },
        { status: 500 },
      );
    }
    return Response.json({ url: session.url });
  } catch (error) {
    console.error("[checkout] session create failed", error);
    const message = error instanceof Error ? error.message : String(error);
    return Response.json(
      { error: `Stripe session creation failed: ${message}` },
      { status: 500 },
    );
  }
}

/** One-time payment branch: { packageSlug, addonSlugs[] } */
function buildPaymentParams(
  body: CheckoutRequestBody,
  baseUrl: string,
): Stripe.Checkout.SessionCreateParams | { error: string } {
  const pkg = body.packageSlug ? getPackage(body.packageSlug) : undefined;
  if (!pkg) {
    return { error: `Unknown package slug: ${body.packageSlug ?? "(none)"}` };
  }

  // Deduplicate + validate add-on slugs. Anything unknown is silently
  // dropped rather than rejected — the client may have a stale list.
  const requestedAddons = Array.from(new Set(body.addonSlugs ?? []));
  const validAddons = requestedAddons
    .map((slug) => getAddon(slug))
    .filter((a): a is NonNullable<ReturnType<typeof getAddon>> => Boolean(a));

  return {
    mode: "payment",
    line_items: [
      { price: pkg.stripePriceId, quantity: 1 },
      ...validAddons.map((a) => ({ price: a.stripePriceId, quantity: 1 })),
    ],
    success_url: `${baseUrl}/web-design/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/web-design/checkout/cancel?package=${pkg.slug}`,
    customer_creation: "always",
    metadata: {
      packageSlug: pkg.slug,
      packageName: pkg.name,
      addonSlugs: validAddons.map((a) => a.slug).join(","),
    },
    billing_address_collection: "auto",
    expires_at: Math.floor(Date.now() / 1000) + 60 * 30,
  };
}

/** Subscription branch: { maintenanceSlug } */
function buildSubscriptionParams(
  body: CheckoutRequestBody,
  baseUrl: string,
): Stripe.Checkout.SessionCreateParams | { error: string } {
  const plan = body.maintenanceSlug
    ? getMaintenancePlan(body.maintenanceSlug)
    : undefined;
  if (!plan) {
    return {
      error: `Unknown maintenance plan slug: ${body.maintenanceSlug ?? "(none)"}`,
    };
  }

  return {
    mode: "subscription",
    line_items: [{ price: plan.stripePriceId, quantity: 1 }],
    success_url: `${baseUrl}/web-design/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/web-design/checkout/cancel?maintenance=${plan.slug}`,
    // customer_creation is not allowed in subscription mode — Stripe
    // always creates a Customer for subscriptions automatically.
    metadata: {
      maintenanceSlug: plan.slug,
      maintenanceName: plan.name,
      packageName: `${plan.name} (maintenance)`,
    },
    // Stripe Subscription metadata is separate from the Session — mirror
    // the slug onto the Subscription so renewal events carry it forward.
    subscription_data: {
      metadata: {
        maintenanceSlug: plan.slug,
        maintenanceName: plan.name,
      },
    },
    billing_address_collection: "auto",
  };
}

// Surface the catalog snapshot via GET — handy for a quick health check
// in dev ("did my Price IDs land?") without hitting Stripe.
export function GET() {
  return Response.json({
    packages: PACKAGES.map((p) => ({
      slug: p.slug,
      name: p.name,
      stripePriceId: p.stripePriceId,
    })),
    addons: ADDONS.map((a) => ({
      slug: a.slug,
      name: a.name,
      stripePriceId: a.stripePriceId,
    })),
    maintenance: MAINTENANCE.map((m) => ({
      slug: m.slug,
      name: m.name,
      stripePriceId: m.stripePriceId,
    })),
  });
}
