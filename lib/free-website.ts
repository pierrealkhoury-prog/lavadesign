// /free-website — "Lava Zero" campaign data (subscription-based website offer).
//
// Distinct from lib/web-design.ts. That module is the USD, fixed-price studio
// packages with Stripe Checkout. THIS is the subscription model: $0 upfront,
// one flat monthly amount, build cost recovered over 36 months.
//
// PRICING IS DERIVED FROM THE REAL PACKAGE BUILD VALUES in lib/web-design.ts.
// Each Zero plan maps onto one studio package; its build value IS that
// package's basePrice (imported below, so it stays in sync). The monthly is
// build ÷ ~13 rounded to a clean price ending in 9 — smaller plans nearer
// ÷12, larger nearer ÷15 — and offboarding is ~10-15% of build value rounded
// to a clean number. The derivation is shown per plan.
//
// No Stripe wiring — this campaign converts over WhatsApp, so every CTA is a
// pre-filled wa.me link. The interactive calculator (app/free-website/
// calculator.tsx) is the one client component; it imports the plans and the
// add-on config below so the display numbers live in exactly one place.

import { formatPrice, getPackage } from "@/lib/web-design";

export type ZeroPlanSlug = "launch" | "business" | "store" | "brand";

export type ZeroPlan = {
  slug: ZeroPlanSlug;
  name: string;
  /** One-line "what this is". */
  basis: string;
  /** USD / month. */
  monthly: number;
  /** USD — build value, recovered over 36 months. Sourced from the mapped
   *  lib/web-design.ts package's basePrice. */
  buildValue: number;
  /** USD — one-time offboarding fee if you take everything and leave. */
  offboard: number;
  /** What the plan includes, in card order. */
  includes: string[];
  /** Audience descriptor. */
  bestFor: string;
  /** ★ Most popular badge + featured styling. */
  featured?: boolean;
  /** Pre-filled WhatsApp message for this plan's "Start" CTA. */
  waMessage: string;
};

/**
 * Each Zero plan is the subscription version of a studio package; the buyout
 * math is driven by that package's real build value (its basePrice).
 */
function buildValueOf(packageSlug: string): number {
  const pkg = getPackage(packageSlug);
  if (!pkg) throw new Error(`free-website: unknown source package ${packageSlug}`);
  return pkg.basePrice;
}

// ─── Plans ───────────────────────────────────────────────────────────────────

export const ZERO_PLANS: ZeroPlan[] = [
  {
    slug: "launch",
    name: "Zero Launch",
    basis: "A single high-converting landing page",
    // build $1,250 ÷ 12.6 → $99  ·  offboard $150 ≈ 12% of build
    monthly: 99,
    buildValue: buildValueOf("landing-page"),
    offboard: 150,
    includes: [
      "Custom-designed landing page + copywriting",
      "Static hosting, SSL, daily backups",
      ".com domain registered in your name",
      "1 business email account",
      "Lead capture form + Google Analytics",
      "30 min of content changes / month",
    ],
    bestFor:
      'Campaigns, single services, "we need to exist online this week".',
    waMessage: "Hi, I'd like to start a Zero Launch plan",
  },
  {
    slug: "business",
    name: "Zero Business",
    basis: "Full custom website, 5–8 pages",
    // build $2,600 ÷ 13.1 → $199  ·  offboard $300 ≈ 11.5% of build
    monthly: 199,
    buildValue: buildValueOf("business-website"),
    offboard: 300,
    includes: [
      "5–8 custom-designed pages + full copywriting",
      "Blog / news section",
      "Managed CMS hosting, SSL, daily backups",
      ".com domain registered in your name",
      "2 business email accounts",
      "Full on-page SEO + schema markup",
      "1 hour of content changes / month",
    ],
    bestFor:
      "SMEs, clinics, real estate, restaurants, professional services.",
    featured: true,
    waMessage: "Hi, I'd like to start a Zero Business plan",
  },
  {
    slug: "store",
    name: "Zero Store",
    basis: "Complete e-commerce store",
    // build $4,900 ÷ 14.0 → $349  ·  offboard $600 ≈ 12.2% of build
    monthly: 349,
    buildValue: buildValueOf("ecommerce"),
    offboard: 600,
    includes: [
      "Custom storefront, up to 50 products",
      "Payment gateway + tax-compliant invoicing",
      "E-commerce hosting + platform updates",
      ".com domain registered in your name",
      "3 business email accounts",
      "Abandoned cart automation + Meta Pixel",
      "2 hours of content changes / month",
    ],
    bestFor: "Retail, D2C brands, restaurants taking online orders.",
    waMessage: "Hi, I'd like to start a Zero Store plan",
  },
  {
    slug: "brand",
    name: "Zero Brand+",
    basis: "Brand identity + website, from scratch",
    // build $6,500 ÷ 14.5 → $449  ·  offboard $800 ≈ 12.3% of build
    monthly: 449,
    buildValue: buildValueOf("brand-website"),
    offboard: 800,
    includes: [
      "Logo design + brand guidelines",
      "Business card & letterhead design",
      "Up to 8 custom pages + full copywriting",
      "Managed hosting, SSL, daily backups",
      ".com domain registered in your name",
      "5 business email accounts",
      "Google Business Profile setup",
      "2 hours of content changes / month",
    ],
    bestFor:
      "New businesses and rebrands launching with nothing but a name and an idea.",
    waMessage: "Hi, I'd like to start a Zero Brand+ plan",
  },
];

// ─── Calculator config ───────────────────────────────────────────────────────
//
// Live monthly total = plan.monthly + premium domain + (8 × extra emails)
//                      + Spanish version (first 12 months only).
// The early-exit table = (3 × current monthly total) + a declining buyout of
// the plan's build value. Mechanics match the original draft exactly.

/**
 * Premium-domain add-on — replaces the old .com/.ae toggle. Standard
 * .com/.net/.org is included in every plan; this is the paid upgrade for the
 * common specialty TLDs. The +$5/mo is derived from the only concrete delta
 * this site publishes: .ae (~$115/yr) − .com (~$60/yr) ≈ +$55/yr ≈ +$5/mo.
 * TLDs outside `covers` follow the site's published "Quoted per TLD" policy.
 */
export const PREMIUM_DOMAIN = {
  monthlyAdd: 5,
  /** TLDs the flat +$5/mo covers. */
  covers: [".io", ".co", ".shop", ".store", ".design"],
  /** Everything else stays on the site's "Quoted per TLD" policy. */
  quotedNote:
    "Other TLDs (.ai, .inc, and exotic extensions) are quoted per domain before signup.",
};

/** USD per extra business-email account, per month. Same Standard product the
 *  plans bundle (~$6/mo cost) at ~30% margin. */
export const EMAIL_ADD_PER_USER = 8;
export const MAX_EXTRA_EMAILS = 10;
export const EMAIL_NOTE =
  "Extra accounts are the same Standard business-email product as the ones included in your plan. Google Workspace and Microsoft 365 upgrades are available at pass-through pricing.";

/**
 * Second-language add-on — replaces the original "Arabic version" add-on with
 * the market-fit equivalent. A recurring surcharge for the first 12 months only,
 * so the calculator shows a first-year vs after-year total when it's on.
 */
export const SECOND_LANGUAGE = {
  label: "Spanish version",
  monthlyAdd: 40,
  months: 12,
  quotedNote: "Other languages available, quoted per language.",
};

/** Early exit = this many months of subscription as an exit fee… */
export const EXIT_FEE_MONTHS = 3;

/** …plus a build-value buyout that shrinks the longer you stay. */
export const BUYOUT_TIERS: { label: string; factor: number }[] = [
  { label: "Months 1–12", factor: 1 },
  { label: "Months 13–24", factor: 0.6 },
  { label: "Months 25–36", factor: 0.3 },
];

// ─── Fair-exit terms (declining buyout table, shown in full on the page) ──────

export const BUYOUT_TABLE: { when: string; owed: string; free?: boolean }[] = [
  { when: "Months 1–12", owed: "100% of build value" },
  { when: "Months 13–24", owed: "60% of build value" },
  { when: "Months 25–36", owed: "30% of build value" },
  { when: "After month 36", owed: "$0 — nothing owed", free: true },
];

// ─── WhatsApp CTAs ───────────────────────────────────────────────────────────

export const WHATSAPP_NUMBER = "971504255360";

/** Build a wa.me link with a URL-encoded pre-filled message. */
export function whatsappUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** Opening-line message for the general "chat to us" CTAs. */
export const WA_GENERAL =
  "Hi, I'm interested in the Lava Zero free website offer";

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Format a whole-USD amount, e.g. 1250 → "$1,250". Shared with /web-design so
 *  currency rendering is identical across the site. */
export const formatUsd = formatPrice;

export function getZeroPlan(slug: ZeroPlanSlug): ZeroPlan {
  const plan = ZERO_PLANS.find((p) => p.slug === slug);
  if (!plan) throw new Error(`Unknown Zero plan: ${slug}`);
  return plan;
}
