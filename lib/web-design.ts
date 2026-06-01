// Phase 1 — /web-design product data.
//
// PLACEHOLDER PRICES — the USD numbers below are rough AED→USD conversions
// from the lavaprintshop.com source page. Display-only; Stripe Checkout is
// driven by `stripePriceId` (the canonical source of truth at payment time).
// If the display number and the Stripe Price diverge, the customer pays
// whatever Stripe says.
//
// STRIPE PRICE IDs are TEST mode (pk/sk_test_, price_1Td...) — swap to live
// IDs before flipping the env. Use the Stripe Dashboard's TEST/LIVE toggle
// to confirm which mode each Price belongs to.
//
// Voice: studio tone (editorial, calm, declarative). NOT the source page's
// "ship in days / no agency runaround" sales voice — that was a different
// brand's positioning.

export type WebDesignPackage = {
  slug: string;
  name: string;
  /** One-line "what this is". */
  tagline: string;
  /** USD, display number. */
  basePrice: number;
  /** Display label, e.g. "10–14 days". */
  timeline: string;
  /** What's included, ~5-10 bullets. */
  includes: string[];
  /** Audience descriptor. */
  bestFor: string;
  /** ★ Most popular badge on the landing card. */
  featured?: boolean;
  /** Stripe Price ID — required for checkout to work. */
  stripePriceId: string;
};

export type WebDesignAddon = {
  slug: string;
  name: string;
  /** USD, display number. */
  price: number;
  /** Stripe Price ID — required for checkout to work. */
  stripePriceId: string;
};

export type MaintenancePlan = {
  slug: string;
  name: string;
  /** USD per month, display number. */
  monthlyPrice: number;
  /** Short positioning line. */
  summary: string;
  /** What's included this tier. */
  includes: string[];
  featured?: boolean;
  /** Stripe Price ID — recurring monthly. */
  stripePriceId: string;
};

export type HostingPlan = {
  name: string;
  bestFor: string;
  /** Display label, e.g. "$95/year". */
  price: string;
};

export type DomainOption = {
  name: string;
  /** Display label. */
  price: string;
  note?: string;
};

export type EmailOption = {
  name: string;
  /** Display label. */
  price: string;
  note?: string;
};

// ─── Packages ───────────────────────────────────────────────────────────────

export const PACKAGES: WebDesignPackage[] = [
  {
    slug: "execute",
    name: "Execute",
    tagline: "You bring the design. We build, optimize, deploy.",
    basePrice: 500,
    timeline: "3–5 days",
    includes: [
      "Up to 5 pages",
      "Mobile-responsive build",
      "Form integration",
      "Domain & hosting setup",
      "On-page SEO basics",
      "One round of revisions",
    ],
    bestFor: "Clients with their own designer or finished design files.",
    stripePriceId: "price_1TdJ25JLdo4fARiSg4qAHKHd",
  },
  {
    slug: "landing-page",
    name: "Landing Page",
    tagline: "A single page, designed to convert.",
    basePrice: 1250,
    timeline: "5–7 days",
    includes: [
      "Custom design, no templates",
      "Full copywriting",
      "Imagery sourced or produced",
      "Mobile-responsive",
      "Lead-capture form",
      "Google Analytics + Search Console",
      "On-page SEO",
      "First year of hosting included",
      "Two rounds of revisions",
    ],
    bestFor: "Product launches, services, campaigns, lead generation.",
    stripePriceId: "price_1TdJ2wJLdo4fARiS9d8rXyf5",
  },
  {
    slug: "business-website",
    name: "Business Website",
    tagline: "A full custom site that represents the business properly.",
    basePrice: 2600,
    timeline: "10–14 days",
    includes: [
      "Five to eight pages, custom designed",
      "Full copywriting (English)",
      "Imagery and graphics",
      "Blog or news section",
      "Contact + lead-capture forms",
      "Google Analytics + Search Console",
      "Full on-page SEO",
      "Schema markup for rich search results",
      "First year of hosting included",
      "Two business email accounts, one year",
      "Three rounds of revisions",
    ],
    bestFor:
      "SMEs, professional services, clinics, real estate, restaurants, agencies.",
    featured: true,
    stripePriceId: "price_1TdJ3GJLdo4fARiSlqgsMB1e",
  },
  {
    slug: "ecommerce",
    name: "E-commerce",
    tagline: "An online store, ready to take orders from day one.",
    basePrice: 4900,
    timeline: "3–4 weeks",
    includes: [
      "Custom-designed storefront",
      "Up to 50 products configured",
      "Product photography styling guidance",
      "Copywriting for collections + key products",
      "Payment gateway (Stripe / Telr / PayTabs)",
      "Shipping zones + rates configured",
      "VAT-compliant invoicing",
      "Customer accounts + order management",
      "Abandoned-cart automation",
      "Analytics, Search Console, Meta Pixel",
      "Full on-page SEO",
      "First year of platform + support",
      "Three business email accounts, one year",
      "Three rounds of revisions",
    ],
    bestFor: "Retail, D2C brands, restaurants taking online orders, marketplaces.",
    stripePriceId: "price_1TdJ3wJLdo4fARiSZVzwITgF",
  },
  {
    slug: "brand-website",
    name: "Brand + Website",
    tagline: "Launching from scratch. Brand and site, end to end.",
    basePrice: 6500,
    timeline: "4–5 weeks",
    includes: [
      "Logo design — three directions, final vector files",
      "Brand colors, typography, mini brand guidelines",
      "Business stationery (business card + letterhead)",
      "Custom-designed website, up to 8 pages",
      "Full copywriting (English)",
      "Imagery and graphics",
      "Domain registration + hosting",
      "Five business email accounts, one year",
      "Full on-page SEO",
      "Google Business Profile setup",
      "Three rounds of revisions per phase",
    ],
    bestFor: "New businesses, rebrands, founders launching something new.",
    stripePriceId: "price_1TdJ4CJLdo4fARiSflK7ieSg",
  },
];

// ─── Add-ons ────────────────────────────────────────────────────────────────

export const ADDONS: WebDesignAddon[] = [
  {
    slug: "arabic-version",
    name: "Arabic version of the site",
    price: 500,
    stripePriceId: "price_1TdJS0JLdo4fARiSlD12ZnN0",
  },
  {
    slug: "extra-page",
    name: "Extra page (custom design + copy)",
    price: 165,
    stripePriceId: "price_1TdJSMJLdo4fARiScbiSUlFs",
  },
  {
    slug: "logo-only",
    name: "Logo design only",
    price: 410,
    stripePriceId: "price_1TdJSyJLdo4fARiS1w9yjjQf",
  },
  {
    slug: "blog-post",
    name: "Blog post (writing + on-page SEO)",
    price: 110,
    stripePriceId: "price_1TdJTMJLdo4fARiScRSkoS4w",
  },
  {
    slug: "booking-system",
    name: "Booking / appointment system",
    price: 500,
    stripePriceId: "price_1TdJThJLdo4fARiSBWJshGzn",
  },
  {
    slug: "multilingual",
    name: "Multilingual setup (3+ languages)",
    price: 680,
    stripePriceId: "price_1TdJUDJLdo4fARiS7pYa5AdT",
  },
  {
    slug: "crm-integration",
    name: "CRM integration (HubSpot, Zoho, Salesforce)",
    price: 410,
    stripePriceId: "price_1TdJUbJLdo4fARiSQ4rMCK6f",
  },
  {
    slug: "live-chat",
    name: "Live chat / WhatsApp integration",
    price: 165,
    stripePriceId: "price_1TdJUyJLdo4fARiSOtcg7HKP",
  },
  {
    slug: "redesign-audit",
    name: "Existing site redesign audit",
    price: 410,
    stripePriceId: "price_1TdJVQJLdo4fARiSXo8b9zvW",
  },
];

// ─── Maintenance plans (recurring) ──────────────────────────────────────────

export const MAINTENANCE: MaintenancePlan[] = [
  {
    slug: "care",
    name: "Care",
    monthlyPrice: 95,
    summary:
      "Updates, patches, backups, monitoring, monthly health report. Hands-off peace of mind.",
    includes: [
      "Plugin and core updates",
      "Security patches",
      "Daily backups",
      "Uptime monitoring",
      "Monthly health report",
    ],
    stripePriceId: "price_1TdJE5JLdo4fARiSxtWkfWMq",
  },
  {
    slug: "care-plus",
    name: "Care+",
    monthlyPrice: 230,
    summary:
      "Everything in Care, plus two hours of monthly changes and a quarterly performance review.",
    includes: [
      "Everything in Care",
      "Two hours / month of content or design changes",
      "Plugin upgrades",
      "Quarterly performance review",
    ],
    featured: true,
    stripePriceId: "price_1TdJEeJLdo4fARiSpBMW554C",
  },
  {
    slug: "growth",
    name: "Growth",
    monthlyPrice: 545,
    summary:
      "Everything in Care+, plus ongoing SEO work, monthly content, analytics reporting, and a quarterly strategy call.",
    includes: [
      "Everything in Care+",
      "Ongoing on-page SEO",
      "Two blog posts / month",
      "Monthly analytics report",
      "Quarterly strategy call",
    ],
    stripePriceId: "price_1TdJF8JLdo4fARiSrOuOSKhe",
  },
];

// ─── Hosting / domains / email ──────────────────────────────────────────────

export const HOSTING: HostingPlan[] = [
  {
    name: "Static Hosting",
    bestFor: "Landing pages, business sites",
    price: "~$95/year",
  },
  {
    name: "Managed CMS Hosting",
    bestFor: "Sites with blogs or frequent updates",
    price: "~$260/year",
  },
  {
    name: "E-commerce Hosting",
    bestFor: "Online stores",
    price: "~$40/month + platform fees",
  },
];

export const DOMAINS: DomainOption[] = [
  { name: ".com / .net / .org", price: "~$60/year" },
  {
    name: ".ae",
    price: "~$115/year",
    note: "Requires a UAE trade license — we handle the paperwork.",
  },
  { name: ".shop / .store / .design / others", price: "Quoted per TLD" },
];

export const EMAIL: EmailOption[] = [
  {
    name: "Standard (10 GB, web + mobile)",
    price: "~$70/user/year",
  },
  {
    name: "Google Workspace",
    price: "From ~$10/user/month",
    note: "Pass-through pricing",
  },
  {
    name: "Microsoft 365",
    price: "From ~$11/user/month",
    note: "Pass-through pricing",
  },
];

// ─── Helpers ────────────────────────────────────────────────────────────────

export function getPackage(slug: string): WebDesignPackage | undefined {
  return PACKAGES.find((p) => p.slug === slug);
}

export function getAddon(slug: string): WebDesignAddon | undefined {
  return ADDONS.find((a) => a.slug === slug);
}

export function getMaintenancePlan(slug: string): MaintenancePlan | undefined {
  return MAINTENANCE.find((m) => m.slug === slug);
}

/** Format a USD whole-dollar price for display. */
export function formatPrice(usd: number): string {
  return `$${usd.toLocaleString("en-US")}`;
}
