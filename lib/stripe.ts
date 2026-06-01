// Stripe server-side client.
//
// Loaded on demand by route handlers — not exported as a module-level
// singleton so import-time errors on a missing key don't kill unrelated
// pages during build/dev. Each handler calls `getStripe()` and bails
// gracefully if the env var is absent.
//
// Required env: STRIPE_SECRET_KEY (sk_test_... or sk_live_...)
// Optional:     NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY (browser, not used
//               by this module — set for future client-side Stripe.js)

import Stripe from "stripe";

let cached: Stripe | null = null;

export function getStripe(): Stripe {
  if (cached) return cached;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error(
      "STRIPE_SECRET_KEY is not set. Add it to .env.local before calling Stripe.",
    );
  }
  cached = new Stripe(key, {
    // Pinned API version that ships with the installed SDK. Stripe is
    // backwards-compatible inside a major version, but pinning means
    // upgrading the SDK won't silently change webhook payload shapes
    // or session field semantics.
    apiVersion: "2026-05-27.dahlia",
    typescript: true,
    appInfo: {
      name: "lavadesign.us",
      version: "0.1.0",
    },
  });
  return cached;
}
