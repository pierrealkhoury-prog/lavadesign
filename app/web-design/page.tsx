import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import {
  ADDONS,
  DOMAINS,
  EMAIL,
  HOSTING,
  MAINTENANCE,
  PACKAGES,
  formatPrice,
  type MaintenancePlan,
  type WebDesignPackage,
} from "@/lib/web-design";

const PAGE_DESCRIPTION =
  "End-to-end custom websites — brand, copy, imagery, code, hosting, email, SEO — designed and built by our Dubai studio. Fixed scope, fixed price, transparent recurring costs.";

export const metadata: Metadata = {
  title: "Web Design",
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: "Web Design",
    description: PAGE_DESCRIPTION,
    url: "/web-design",
    images: ["/opengraph-image"],
  },
  twitter: {
    title: "Web Design",
    description: PAGE_DESCRIPTION,
    images: ["/opengraph-image"],
  },
};

/**
 * /web-design — long-form product landing.
 *
 * Stage A: marketing surface only — content, packages, maintenance, FAQ.
 * No Stripe wiring yet. Package "Configure & start" CTAs deliberately
 * point to /web-design/<slug> sub-routes that don't exist yet — those
 * land in Stage B alongside the configurator + Stripe Checkout flow.
 *
 * Tonal rhythm matches the home-page lighting pass: alternating obsidian
 * / basalt bands, ember hairlines at the top of every basalt band,
 * Reveal scroll-ins where they help.
 */
export default function WebDesignPage() {
  return (
    <>
      <Hero />
      <SubHeroStrip />
      <ApproachSection />
      <CapabilitiesSection />
      <PackagesSection />
      <HowWeWorkSection />
      <AddOnsSection />
      <HostingDomainsEmailSection />
      <MaintenanceSection />
      <SeoSection />
      <WhyUsSection />
      <FaqSection />
      <ClosingCta />
    </>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-80"
        style={{
          background:
            "radial-gradient(60% 50% at 15% 0%, rgba(255,77,28,0.25), transparent 70%), radial-gradient(40% 50% at 90% 100%, rgba(245,176,75,0.18), transparent 70%)",
        }}
      />
      <Reveal>
        <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6 py-32 sm:px-10 md:py-40">
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-ember text-glow-ember">
            Web Design
          </p>
          <h1 className="min-w-0 max-w-5xl font-display text-5xl font-black uppercase leading-[0.95] tracking-[-0.01em] text-ash sm:text-7xl md:text-8xl">
            Custom websites,
            <span className="block font-serif text-4xl font-normal italic tracking-normal text-ember sm:text-5xl md:text-6xl">
              end to end.
            </span>
          </h1>
          <p className="min-w-0 max-w-3xl font-serif text-xl leading-relaxed text-smoke md:text-2xl">
            Designed, written, built, and launched by our Dubai studio.
            Brand, copy, imagery, code, hosting, email, SEO — held
            in-house, on a single timeline, on a single invoice. Custom
            design every time, fixed price every time, no surprise
            renewals.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="#packages"
              className="rounded-full bg-lava px-8 py-4 font-mono text-xs uppercase tracking-[0.22em] text-obsidian transition-colors hover:bg-ember"
            >
              See packages
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-border px-8 py-4 font-mono text-xs uppercase tracking-[0.22em] text-ash transition-colors hover:border-ash"
            >
              Start a project
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

// ─── Sub-hero strip ─────────────────────────────────────────────────────────

function SubHeroStrip() {
  return (
    <section className="relative border-y border-border bg-basalt">
      <EmberHairline />
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-10">
        <Reveal>
          <p className="font-mono text-sm uppercase tracking-[0.32em] text-ash">
            Brand. Copy. Imagery. Code. Hosting. Email. SEO.
            <span className="block pt-3 text-ember sm:inline sm:pt-0 sm:pl-4">
              One studio, one timeline, one invoice.
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Approach ───────────────────────────────────────────────────────────────

function ApproachSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 sm:px-10 md:py-32">
      <Reveal>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-ember text-glow-ember">
              The approach
            </p>
            <h2 className="mt-6 font-display text-4xl font-black uppercase leading-[0.95] tracking-[-0.01em] text-ash sm:text-5xl md:text-6xl">
              One studio,
              <span className="block font-serif text-3xl font-normal italic tracking-normal text-ember sm:text-4xl md:text-5xl">
                no handoffs.
              </span>
            </h2>
          </div>
          <div className="space-y-6 md:col-span-6 md:col-start-7">
            <p className="font-serif text-lg leading-relaxed text-smoke md:text-xl">
              Most web projects move through five teams — copywriters,
              designers, developers, SEO specialists, project managers
              — and the handoffs are where the weeks go.
            </p>
            <p className="font-serif text-lg leading-relaxed text-smoke md:text-xl">
              We hold every discipline in-house and run one tight studio
              process. That&rsquo;s how a custom site can launch in days
              instead of months, and how the price stays fixed and the
              timeline holds.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

// ─── Capabilities ───────────────────────────────────────────────────────────

const CAPABILITIES = [
  { title: "Brand identity", note: "Logo, color, typography, mini-guidelines." },
  {
    title: "Copywriting",
    note: "Every word written for your audience, in English and Arabic.",
  },
  {
    title: "Custom design",
    note: "Designed for your business, not picked off a theme shop.",
  },
  {
    title: "Imagery",
    note: "Sourced, styled, or custom-produced for your site.",
  },
  {
    title: "Development",
    note: "Modern stack — fast, secure, mobile-first.",
  },
  {
    title: "Hosting & domains",
    note: "Registered, configured, managed. You stay the legal owner.",
  },
  {
    title: "Business email",
    note: "Professional addresses on your own domain.",
  },
  {
    title: "On-page SEO",
    note: "Built into every site we ship — not bolted on later.",
  },
  {
    title: "Ongoing support",
    note: "Maintenance plans that keep the site healthy.",
  },
];

function CapabilitiesSection() {
  return (
    <section className="relative border-y border-border bg-basalt">
      <EmberHairline />
      <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 md:py-32">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-ember text-glow-ember">
            What we cover
          </p>
          <h2 className="mt-6 max-w-3xl font-display text-4xl font-black uppercase leading-[0.95] tracking-[-0.01em] text-ash sm:text-5xl md:text-6xl">
            Everything a site needs,
            <span className="block font-serif text-3xl font-normal italic tracking-normal text-ember sm:text-4xl md:text-5xl">
              under one roof.
            </span>
          </h2>
        </Reveal>
        <ul className="mt-16 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 md:grid-cols-3">
          {CAPABILITIES.map((c, i) => (
            <li key={c.title}>
              <Reveal delay={(i % 3) * 80} className="flex flex-col gap-3 border-t border-border pt-5">
                <span className="font-mono text-xs tabular-nums text-ember">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-xl font-black uppercase leading-tight tracking-[-0.01em] text-ash">
                  {c.title}
                </h3>
                <p className="font-serif text-base leading-relaxed text-smoke">
                  {c.note}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ─── Packages ───────────────────────────────────────────────────────────────

function PackagesSection() {
  return (
    <section id="packages" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-24 sm:px-10 md:py-32">
      <Reveal>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-ember text-glow-ember">
              Packages
            </p>
            <h2 className="mt-6 font-display text-4xl font-black uppercase leading-[0.95] tracking-[-0.01em] text-ash sm:text-5xl md:text-6xl">
              Fixed price,
              <span className="block font-serif text-3xl font-normal italic tracking-normal text-ember sm:text-4xl md:text-5xl">
                fixed scope.
              </span>
            </h2>
          </div>
          <p className="font-serif text-lg leading-relaxed text-smoke md:col-span-6 md:col-start-7 md:text-xl">
            Five packages, each with what&rsquo;s included spelled out
            in full. Add-ons are listed below — pick what you need,
            leave the rest. The number on the card is what you pay.
          </p>
        </div>
      </Reveal>

      <ul className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {PACKAGES.map((pkg, i) => (
          <li key={pkg.slug}>
            <Reveal delay={(i % 3) * 80}>
              <PackageCard pkg={pkg} />
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}

function PackageCard({ pkg }: { pkg: WebDesignPackage }) {
  return (
    <article
      className={[
        "flex h-full flex-col gap-6 rounded-md border bg-obsidian/40 p-8 transition-colors duration-300",
        pkg.featured
          ? "border-ember/60 shadow-[0_18px_42px_-12px_rgba(245,176,75,0.28)]"
          : "border-border hover:border-ember/40",
      ].join(" ")}
    >
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-display text-2xl font-black uppercase tracking-[-0.01em] text-ash">
          {pkg.name}
        </h3>
        {pkg.featured ? (
          <span className="rounded-full bg-ember/15 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.22em] text-ember">
            ★ Most picked
          </span>
        ) : null}
      </div>
      <p className="font-serif text-base italic leading-snug text-smoke">
        {pkg.tagline}
      </p>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-y border-border py-5">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-smoke">
          From
        </span>
        <span className="font-display text-3xl font-black tabular-nums tracking-[-0.01em] text-ash">
          {formatPrice(pkg.basePrice)}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-smoke">
          USD · {pkg.timeline}
        </span>
      </div>
      <ul className="flex-1 space-y-2.5">
        {pkg.includes.map((item) => (
          <li
            key={item}
            className="flex gap-3 font-serif text-sm leading-snug text-smoke"
          >
            <span aria-hidden className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-ember/70" />
            {item}
          </li>
        ))}
      </ul>
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-smoke">
          Best for
        </p>
        <p className="mt-2 font-serif text-sm leading-relaxed text-ash">
          {pkg.bestFor}
        </p>
      </div>
      {/* Configure-and-start CTA — points at the package detail route
          that gets built in Stage B alongside the configurator + Stripe
          Checkout flow. Until then, these routes 404. */}
      <Link
        href={`/web-design/${pkg.slug}`}
        className="mt-auto inline-flex items-center justify-center rounded-full bg-lava px-6 py-3 font-mono text-xs uppercase tracking-[0.22em] text-obsidian transition-colors hover:bg-ember"
      >
        Configure &amp; start →
      </Link>
    </article>
  );
}

// ─── How we work — web-specific 4-step timeline ─────────────────────────────

const PROCESS = [
  {
    label: "Day 1",
    title: "Brief",
    body: "A short intake captures the business, audience, competitors, and the few reference sites you actually like. We confirm scope, timeline, and price. Work starts once 50% is in.",
  },
  {
    label: "Days 2–5",
    title: "Design & Copy",
    body: "We design the site and write every word. One full version to review — no endless mood boards.",
  },
  {
    label: "Days 5–10",
    title: "Build",
    body: "The approved design becomes a fast, secure, mobile-ready site. Staging links through the whole stretch.",
  },
  {
    label: "Final day",
    title: "Launch",
    body: "Migration to your domain, email and analytics configured, final QA, handover. The remaining 50% settles at launch.",
  },
];

function HowWeWorkSection() {
  return (
    <section className="relative border-y border-border bg-basalt">
      <EmberHairline />
      <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 md:py-32">
        <Reveal>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="font-mono text-xs uppercase tracking-[0.32em] text-ember text-glow-ember">
                How a web project moves
              </p>
              <h2 className="mt-6 font-display text-4xl font-black uppercase leading-[0.95] tracking-[-0.01em] text-ash sm:text-5xl md:text-6xl">
                Four steps,
                <span className="block font-serif text-3xl font-normal italic tracking-normal text-ember sm:text-4xl md:text-5xl">
                  often inside two weeks.
                </span>
              </h2>
            </div>
            <p className="font-serif text-lg leading-relaxed text-smoke md:col-span-6 md:col-start-7 md:text-xl">
              The studio&rsquo;s wider five-stage process (see{" "}
              <Link href="/services" className="text-ember underline-offset-4 hover:underline">
                Services
              </Link>
              ) applies to every engagement. For web projects, the cycle
              is tighter — most launch inside two weeks once we&rsquo;re
              into review.
            </p>
          </div>
        </Reveal>

        {/* 4-step horizontal flow with ember connecting line, same
            pattern as the /services How We Work, sized for 4 columns. */}
        <div className="relative mt-20 md:mt-24">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-[28px] hidden h-px md:block"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(245,176,75,0.4) 8%, rgba(245,176,75,0.4) 92%, transparent 100%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-[28px] left-[28px] top-[28px] w-px md:hidden"
            style={{
              background:
                "linear-gradient(180deg, rgba(245,176,75,0.45) 0%, rgba(245,176,75,0.25) 100%)",
            }}
          />
          <ol className="grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-6">
            {PROCESS.map((step, i) => (
              <li key={step.title}>
                <Reveal delay={i * 120}>
                  <div className="flex gap-6 md:flex-col md:gap-6">
                    <span
                      aria-hidden
                      className="relative z-10 inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-basalt font-mono text-base tabular-nums text-ember text-glow-ember ring-1 ring-ember/40"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1 md:mt-2">
                      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-smoke">
                        {step.label}
                      </p>
                      <h3 className="mt-2 font-display text-xl font-black uppercase leading-tight tracking-[-0.01em] text-ash">
                        {step.title}
                      </h3>
                      <p className="mt-3 font-serif text-sm leading-relaxed text-smoke">
                        {step.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

// ─── Add-ons ────────────────────────────────────────────────────────────────

function AddOnsSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 sm:px-10 md:py-32">
      <Reveal>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-ember text-glow-ember">
              Add-ons
            </p>
            <h2 className="mt-6 font-display text-4xl font-black uppercase leading-[0.95] tracking-[-0.01em] text-ash sm:text-5xl md:text-6xl">
              Pick what
              <span className="block font-serif text-3xl font-normal italic tracking-normal text-ember sm:text-4xl md:text-5xl">
                you actually need.
              </span>
            </h2>
          </div>
          <p className="font-serif text-lg leading-relaxed text-smoke md:col-span-6 md:col-start-7 md:text-xl">
            Add to any package. Prices are per add-on, USD, fixed.
            They&rsquo;ll appear in the configurator on each package
            page — toggle them on, the total updates live.
          </p>
        </div>
      </Reveal>

      <ul className="mt-16 divide-y divide-border/70 border-y border-border/70">
        {ADDONS.map((addon) => (
          <li
            key={addon.slug}
            className="flex items-baseline justify-between gap-6 py-5"
          >
            <span className="font-serif text-base leading-snug text-ash sm:text-lg">
              {addon.name}
            </span>
            <span className="shrink-0 font-mono text-sm tabular-nums text-ember">
              From {formatPrice(addon.price)}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

// ─── Hosting / domains / email ──────────────────────────────────────────────

function HostingDomainsEmailSection() {
  return (
    <section className="relative border-y border-border bg-basalt">
      <EmberHairline />
      <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 md:py-32">
        <Reveal>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="font-mono text-xs uppercase tracking-[0.32em] text-ember text-glow-ember">
                Hosting · Domains · Email
              </p>
              <h2 className="mt-6 font-display text-4xl font-black uppercase leading-[0.95] tracking-[-0.01em] text-ash sm:text-5xl md:text-6xl">
                Transparent
                <span className="block font-serif text-3xl font-normal italic tracking-normal text-ember sm:text-4xl md:text-5xl">
                  recurring costs.
                </span>
              </h2>
            </div>
            <p className="font-serif text-lg leading-relaxed text-smoke md:col-span-6 md:col-start-7 md:text-xl">
              No hidden renewals, no surprise invoices. You stay the
              legal owner of the domain and the accounts. First year of
              hosting is included on the Landing Page, Business Website,
              E-commerce, and Brand + Website packages.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-3">
          <PriceList
            label="Domains"
            items={DOMAINS.map((d) => ({
              name: d.name,
              price: d.price,
              note: d.note,
            }))}
          />
          <PriceList
            label="Hosting"
            items={HOSTING.map((h) => ({
              name: h.name,
              price: h.price,
              note: h.bestFor,
            }))}
          />
          <PriceList
            label="Business email"
            items={EMAIL.map((e) => ({
              name: e.name,
              price: e.price,
              note: e.note,
            }))}
          />
        </div>
      </div>
    </section>
  );
}

function PriceList({
  label,
  items,
}: {
  label: string;
  items: { name: string; price: string; note?: string }[];
}) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ember">
        {label}
      </p>
      <ul className="mt-6 divide-y divide-border/70 border-y border-border/70">
        {items.map((it) => (
          <li key={it.name} className="flex flex-col gap-2 py-5">
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-serif text-base text-ash">{it.name}</span>
              <span className="shrink-0 font-mono text-xs tabular-nums text-ember">
                {it.price}
              </span>
            </div>
            {it.note ? (
              <p className="font-serif text-xs italic text-smoke">{it.note}</p>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Maintenance ────────────────────────────────────────────────────────────

function MaintenanceSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 sm:px-10 md:py-32">
      <Reveal>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-ember text-glow-ember">
              Maintenance
            </p>
            <h2 className="mt-6 font-display text-4xl font-black uppercase leading-[0.95] tracking-[-0.01em] text-ash sm:text-5xl md:text-6xl">
              The site is
              <span className="block font-serif text-3xl font-normal italic tracking-normal text-ember sm:text-4xl md:text-5xl">
                a living thing.
              </span>
            </h2>
          </div>
          <p className="font-serif text-lg leading-relaxed text-smoke md:col-span-6 md:col-start-7 md:text-xl">
            Three monthly plans, billed by Stripe. Start the month
            after launch, cancel any time. First month is free with
            any new website package.
          </p>
        </div>
      </Reveal>

      <ul className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
        {MAINTENANCE.map((plan, i) => (
          <li key={plan.slug}>
            <Reveal delay={i * 100}>
              <MaintenanceCard plan={plan} />
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}

function MaintenanceCard({ plan }: { plan: MaintenancePlan }) {
  return (
    <article
      className={[
        "flex h-full flex-col gap-6 rounded-md border bg-obsidian/40 p-8 transition-colors duration-300",
        plan.featured
          ? "border-ember/60 shadow-[0_18px_42px_-12px_rgba(245,176,75,0.28)]"
          : "border-border hover:border-ember/40",
      ].join(" ")}
    >
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-display text-2xl font-black uppercase tracking-[-0.01em] text-ash">
          {plan.name}
        </h3>
        {plan.featured ? (
          <span className="rounded-full bg-ember/15 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.22em] text-ember">
            ★ Most picked
          </span>
        ) : null}
      </div>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-y border-border py-5">
        <span className="font-display text-3xl font-black tabular-nums tracking-[-0.01em] text-ash">
          {formatPrice(plan.monthlyPrice)}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-smoke">
          USD / month
        </span>
      </div>
      <p className="font-serif text-base leading-relaxed text-smoke">
        {plan.summary}
      </p>
      <ul className="space-y-2.5">
        {plan.includes.map((item) => (
          <li
            key={item}
            className="flex gap-3 font-serif text-sm leading-snug text-smoke"
          >
            <span aria-hidden className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-ember/70" />
            {item}
          </li>
        ))}
      </ul>
      {/* Subscription start CTA — wired to Stripe subscription Checkout
          in Stage E. For Stage A, points at /contact as a placeholder. */}
      <Link
        href="/contact"
        className="mt-auto inline-flex items-center justify-center rounded-full border border-border px-6 py-3 font-mono text-xs uppercase tracking-[0.22em] text-ash transition-colors hover:border-ash"
      >
        Subscribe →
      </Link>
    </article>
  );
}

// ─── SEO ────────────────────────────────────────────────────────────────────

const SEO_INCLUDED = [
  "Title tags, meta descriptions, heading hierarchy",
  "Schema.org structured data",
  "XML sitemap, robots.txt, canonical tags",
  "Open Graph & Twitter Card tags",
  "Image alt text, semantic HTML, accessibility basics",
  "Core Web Vitals optimization",
  "Google Search Console + Analytics 4 setup",
];

const SEO_ADDONS = [
  { name: "SEO audit (existing site)", price: "From $500" },
  { name: "Keyword research + content map", price: "From $550" },
  { name: "Local SEO setup (Google Business Profile + citations)", price: "From $330" },
  { name: "Monthly SEO retainer", price: "From $550/month" },
];

function SeoSection() {
  return (
    <section className="relative border-y border-border bg-basalt">
      <EmberHairline />
      <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 md:py-32">
        <Reveal>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="font-mono text-xs uppercase tracking-[0.32em] text-ember text-glow-ember">
                SEO
              </p>
              <h2 className="mt-6 font-display text-4xl font-black uppercase leading-[0.95] tracking-[-0.01em] text-ash sm:text-5xl md:text-6xl">
                SEO-ready
                <span className="block font-serif text-3xl font-normal italic tracking-normal text-ember sm:text-4xl md:text-5xl">
                  on day one.
                </span>
              </h2>
            </div>
            <p className="font-serif text-lg leading-relaxed text-smoke md:col-span-6 md:col-start-7 md:text-xl">
              Every site ships with the SEO foundations built in — not
              bolted on after launch. For ongoing work, the add-ons
              below cover audits, keyword strategy, and retainers.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ember">
              Included on every site
            </p>
            <ul className="mt-6 space-y-3">
              {SEO_INCLUDED.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 font-serif text-base leading-relaxed text-smoke"
                >
                  <span aria-hidden className="mt-2.5 inline-block h-1 w-1 shrink-0 rounded-full bg-ember/70" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ember">
              SEO add-ons
            </p>
            <ul className="mt-6 divide-y divide-border/70 border-y border-border/70">
              {SEO_ADDONS.map((it) => (
                <li
                  key={it.name}
                  className="flex items-baseline justify-between gap-4 py-4"
                >
                  <span className="font-serif text-base text-ash">{it.name}</span>
                  <span className="shrink-0 font-mono text-xs tabular-nums text-ember">
                    {it.price}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Why us ─────────────────────────────────────────────────────────────────

const WHY_US = [
  {
    title: "Custom, not templated.",
    body: "Every site is designed for the business. No themes dressed up as design.",
  },
  {
    title: "Fast.",
    body: "Most projects launch in under two weeks — the process is built for it.",
  },
  {
    title: "Full-service.",
    body: "Brand, copy, imagery, code, hosting, email, SEO — all under one roof, on one invoice.",
  },
  {
    title: "Honest pricing.",
    body: "Fixed package prices. Add-ons spelled out. No surprise renewals.",
  },
  {
    title: "Built to grow.",
    body: "Modern stack, fast load times, SEO-ready, easy to extend.",
  },
  {
    title: "You own everything.",
    body: "Code, domain, hosting, accounts — handed over at launch, no lock-in.",
  },
];

function WhyUsSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 sm:px-10 md:py-32">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.32em] text-ember text-glow-ember">
          Why us
        </p>
        <h2 className="mt-6 max-w-4xl font-display text-4xl font-black uppercase leading-[0.95] tracking-[-0.01em] text-ash sm:text-5xl md:text-6xl">
          What you&rsquo;re actually
          <span className="block font-serif text-3xl font-normal italic tracking-normal text-ember sm:text-4xl md:text-5xl">
            buying.
          </span>
        </h2>
      </Reveal>

      <ol className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
        {WHY_US.map((r, i) => (
          <li key={r.title}>
            <Reveal delay={(i % 3) * 80} className="flex flex-col gap-3 border-t border-border pt-6">
              <span className="font-mono text-xs tabular-nums text-ember">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-xl font-black uppercase leading-tight tracking-[-0.01em] text-ash">
                {r.title}
              </h3>
              <p className="font-serif text-base leading-relaxed text-smoke">
                {r.body}
              </p>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}

// ─── FAQ ────────────────────────────────────────────────────────────────────

const FAQ = [
  {
    q: "How can you deliver in days when other studios take months?",
    a: "We hold every discipline in-house — copy, design, build, SEO — so there are no handovers between teams. The work itself isn't faster; the wait time between stages is gone.",
  },
  {
    q: "Custom or templated?",
    a: "Custom. Every project starts from a blank page and is designed for your brand. We don't use theme shops or pre-made templates.",
  },
  {
    q: "Do I own everything at the end?",
    a: "Yes. The domain is registered in your name, the code is yours, and we transfer every admin account at launch. If you decide to leave us, you take everything with you.",
  },
  {
    q: "Can I edit the site myself after launch?",
    a: "Yes. Most packages ship with an editing system that lets you update text, images, and pages without touching code. A short training session is included.",
  },
  {
    q: "What happens after the first year of free hosting?",
    a: "Hosting renews at the published rates. You get an invoice 30 days before renewal — pay it, or move the site elsewhere. Up to you. No auto-charges.",
  },
  {
    q: "Do you build in WordPress?",
    a: "Sometimes. We choose the right tool for the project — modern static frameworks for speed, WordPress when you need its ecosystem, Shopify or our own stack for commerce. The recommendation comes with the brief.",
  },
  {
    q: "Can you write the site in Arabic?",
    a: "Yes. Arabic copy is an add-on (see Add-ons above) and is reviewed by a native speaker before launch.",
  },
  {
    q: "What if I need changes after launch?",
    a: "You can request them any time. Maintenance plans include a monthly allowance. One-off changes are billed at our standard hourly rate.",
  },
  {
    q: "Payment terms?",
    a: "50% to start, 50% on launch, by Stripe. For Brand + Website and E-commerce packages we can split into three payments (40 / 30 / 30).",
  },
  {
    q: "What if I'm not happy with the design?",
    a: "Each package includes revision rounds. If after the included revisions we still haven't landed it, we keep working — but we've never had a project that didn't get there.",
  },
];

function FaqSection() {
  return (
    <section className="relative border-y border-border bg-basalt">
      <EmberHairline />
      <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 md:py-32">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-ember text-glow-ember">
            Questions
          </p>
          <h2 className="mt-6 max-w-3xl font-display text-4xl font-black uppercase leading-[0.95] tracking-[-0.01em] text-ash sm:text-5xl md:text-6xl">
            Probably
            <span className="block font-serif text-3xl font-normal italic tracking-normal text-ember sm:text-4xl md:text-5xl">
              already answered.
            </span>
          </h2>
        </Reveal>

        <ul className="mt-16 divide-y divide-border/70 border-y border-border/70">
          {FAQ.map((item, i) => (
            <li key={item.q}>
              <Reveal delay={(i % 4) * 60}>
                {/* <details> gives us click-to-expand without any JS. The
                    marker is hidden; the question + chevron are styled
                    manually so it blends with the molten editorial tone. */}
                <details className="group py-5">
                  <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6">
                    <span className="font-serif text-lg leading-snug text-ash sm:text-xl">
                      {item.q}
                    </span>
                    <span
                      aria-hidden
                      className="shrink-0 font-mono text-base text-ember transition-transform duration-200 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-4 max-w-3xl font-serif text-base leading-relaxed text-smoke">
                    {item.a}
                  </p>
                </details>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ─── Closing CTA ────────────────────────────────────────────────────────────

function ClosingCta() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-32 sm:px-10">
      <Reveal>
        <div className="flex flex-col items-start gap-8 rounded-md border border-border bg-basalt p-10 md:flex-row md:items-center md:justify-between md:p-16">
          <div>
            <h2 className="max-w-2xl font-display text-3xl font-black uppercase leading-tight tracking-[-0.01em] text-ash sm:text-5xl">
              Tell us about
              <span className="block font-serif text-2xl font-normal italic tracking-normal text-ember sm:text-4xl">
                the project.
              </span>
            </h2>
            <p className="mt-4 max-w-xl font-serif text-base text-smoke">
              A short brief is enough. We&rsquo;ll come back with a
              recommendation, a fixed price, and a launch date — within
              one business day.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="rounded-full bg-lava px-8 py-4 font-mono text-xs uppercase tracking-[0.22em] text-obsidian transition-colors hover:bg-ember"
            >
              Start a project →
            </Link>
            <Link
              href="#packages"
              className="rounded-full border border-border px-8 py-4 font-mono text-xs uppercase tracking-[0.22em] text-ash transition-colors hover:border-ash"
            >
              See packages
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/** Ember-tinted hairline at the top of a basalt band. */
function EmberHairline() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 h-px"
      style={{
        background:
          "linear-gradient(90deg, transparent, rgba(245,176,75,0.45), transparent)",
      }}
    />
  );
}
