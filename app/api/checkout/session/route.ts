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
import { getStripe } from "@/lib/stripe";
import {
  ADDONS,
  PACKAGES,
  getAddon,
  getPackage,
} from "@/lib/web-design";

export const runtime = "nodejs";

type CheckoutRequestBody = {
  packageSlug?: string;
  addonSlugs?: string[];
};

export async function POST(request: NextRequest) {
  let body: CheckoutRequestBody;
  try {
    body = (await request.json()) as CheckoutRequestBody;
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const pkg = body.packageSlug ? getPackage(body.packageSlug) : undefined;
  if (!pkg) {
    return Response.json(
      { error: `Unknown package slug: ${body.packageSlug ?? "(none)"}` },
      { status: 400 },
    );
  }

  // Deduplicate + validate add-on slugs. Anything unknown is silently
  // dropped rather than rejected — the client may have a stale list.
  const requestedAddons = Array.from(new Set(body.addonSlugs ?? []));
  const validAddons = requestedAddons
    .map((slug) => getAddon(slug))
    .filter((a): a is NonNullable<ReturnType<typeof getAddon>> => Boolean(a));

  // Build line items from canonical server-side data. Each Price ID is
  // looked up — the client's number is never read.
  const lineItems: Array<{ price: string; quantity: number }> = [
    { price: pkg.stripePriceId, quantity: 1 },
    ...validAddons.map((a) => ({ price: a.stripePriceId, quantity: 1 })),
  ];

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    new URL(request.url).origin;

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${baseUrl}/web-design/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/web-design/checkout/cancel?package=${pkg.slug}`,
      // Let Stripe collect / surface a customer record. The email goes
      // into the webhook payload + their receipt + our notification.
      customer_creation: "always",
      // Round-trip the slugs in metadata so the webhook can render a
      // human-readable summary without re-resolving line items.
      metadata: {
        packageSlug: pkg.slug,
        packageName: pkg.name,
        addonSlugs: validAddons.map((a) => a.slug).join(","),
      },
      // Surface the studio's UAE registration on the Stripe page.
      billing_address_collection: "auto",
      // 30-minute expiry — the link is one-shot per checkout intent.
      expires_at: Math.floor(Date.now() / 1000) + 60 * 30,
    });

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
  });
}
