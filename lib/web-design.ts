// Phase 1 — /web-design product data.
//
// PLACEHOLDER PRICES — the USD numbers below are rough AED→USD conversions
// from the lavaprintshop.com source page, used purely so Stage A renders
// with realistic-looking copy. Pierre is confirming the real USD prices
// separately and will replace them, along with the Stripe Price IDs,
// before Stage C wires checkout. Until then, `stripePriceId` is left
// unset and the page renders prices as display-only.
//
// Voice: studio tone (editorial, calm, declarative). NOT the source page's
// "ship in days / no agency runaround" sales voice — that was a different
// brand's positioning.

export type WebDesignPackage = {
  slug: string;
  name: string;
  /** One-line "what this is". */
  tagline: string;
  /** USD, placeholder. */
  basePrice: number;
  /** Display label, e.g. "10–14 days". */
  timeline: string;
  /** What's included, ~5-10 bullets. */
  includes: string[];
  /** Audience descriptor. */
  bestFor: string;
  /** ★ Most popular badge on the landing card. */
  featured?: boolean;
  /** Filled in Stage C when the Stripe Price exists. */
  stripePriceId?: string;
};

export type WebDesignAddon = {
  slug: string;
  name: string;
  /** USD, placeholder. */
  price: number;
  /** Filled in Stage C. */
  stripePriceId?: string;
};

export type MaintenancePlan = {
  slug: string;
  name: string;
  /** USD per month, placeholder. */
  monthlyPrice: number;
  /** Short positioning line. */
  summary: string;
  /** What's included this tier. */
  includes: string[];
  featured?: boolean;
  /** Filled in Stage C (recurring Stripe Price). */
  stripePriceId?: string;
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
  },
];

// ─── Add-ons ────────────────────────────────────────────────────────────────

export const ADDONS: WebDesignAddon[] = [
  { slug: "arabic-version", name: "Arabic version of the site", price: 500 },
  { slug: "extra-page", name: "Extra page (custom design + copy)", price: 165 },
  { slug: "logo-only", name: "Logo design only", price: 410 },
  { slug: "blog-post", name: "Blog post (writing + on-page SEO)", price: 110 },
  { slug: "booking-system", name: "Booking / appointment system", price: 500 },
  { slug: "multilingual", name: "Multilingual setup (3+ languages)", price: 680 },
  {
    slug: "crm-integration",
    name: "CRM integration (HubSpot, Zoho, Salesforce)",
    price: 410,
  },
  { slug: "live-chat", name: "Live chat / WhatsApp integration", price: 165 },
  { slug: "redesign-audit", name: "Existing site redesign audit", price: 410 },
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

/** Format a USD whole-dollar price for display. */
export function formatPrice(usd: number): string {
  return `$${usd.toLocaleString("en-US")}`;
}
