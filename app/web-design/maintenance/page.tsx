import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import {
  MAINTENANCE,
  formatPrice,
  type MaintenancePlan,
} from "@/lib/web-design";
import { SubscribeButton } from "./subscribe-button";

const PAGE_DESCRIPTION =
  "Three monthly maintenance plans for sites we've built — Care, Care+, and Growth. Billed by Stripe, cancel any time. First month free with any new website package.";

export const metadata: Metadata = {
  title: "Web Maintenance",
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: "Web Maintenance",
    description: PAGE_DESCRIPTION,
    url: "/web-design/maintenance",
    images: ["/opengraph-image"],
  },
  twitter: {
    title: "Web Maintenance",
    description: PAGE_DESCRIPTION,
    images: ["/opengraph-image"],
  },
};

/**
 * /web-design/maintenance — recurring subscription tier picker.
 *
 * Stripe Checkout sessions can't mix payment + subscription line items,
 * so maintenance has its own page and its own Subscribe buttons. Each
 * button POSTs { maintenanceSlug } to /api/checkout/session which takes
 * the subscription branch.
 */
export default function MaintenancePage() {
  return (
    <article>
      <Hero />
      <Plans />
      <FaqStrip />
      <ClosingCta />
    </article>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-80"
        style={{
          background:
            "radial-gradient(60% 50% at 15% 0%, rgba(255,77,28,0.22), transparent 70%), radial-gradient(40% 50% at 90% 100%, rgba(245,176,75,0.16), transparent 70%)",
        }}
      />
      <Reveal>
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-24 sm:px-10 md:py-32">
          <Link
            href="/web-design"
            className="font-mono text-[10px] uppercase tracking-[0.3em] text-smoke transition-colors hover:text-ash"
          >
            ← Web design
          </Link>
          <div className="flex flex-col gap-6">
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-ember text-glow-ember">
              Web Maintenance
            </p>
            <h1 className="min-w-0 max-w-5xl font-display text-5xl font-black uppercase leading-[0.95] tracking-[-0.01em] text-ash sm:text-7xl md:text-8xl">
              The site is
              <span className="block font-serif text-4xl font-normal italic tracking-normal text-ember sm:text-5xl md:text-6xl">
                a living thing.
              </span>
            </h1>
            <p className="min-w-0 max-w-3xl font-serif text-xl leading-relaxed text-smoke md:text-2xl">
              Three monthly plans, billed by Stripe. Start the month after
              launch, cancel any time. The first month is free with any
              new website package.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Plans() {
  return (
    <section className="relative border-y border-border bg-basalt">
      <EmberHairline />
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10 md:py-24">
        <ul className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {MAINTENANCE.map((plan, i) => (
            <li key={plan.slug}>
              <Reveal delay={i * 100}>
                <PlanCard plan={plan} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function PlanCard({ plan }: { plan: MaintenancePlan }) {
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
        <h2 className="font-display text-2xl font-black uppercase tracking-[-0.01em] text-ash">
          {plan.name}
        </h2>
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
            <span
              aria-hidden
              className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-ember/70"
            />
            {item}
          </li>
        ))}
      </ul>
      <SubscribeButton maintenanceSlug={plan.slug} featured={plan.featured} />
    </article>
  );
}

// ─── FAQ strip — subscription-specific ──────────────────────────────────────

const FAQ = [
  {
    q: "How do I cancel?",
    a: "From Stripe's customer portal — link in the receipt — or by emailing us. Cancellation takes effect at the end of the billing cycle.",
  },
  {
    q: "When does the first charge happen?",
    a: "Immediately on subscribe. If your site launched in the last 30 days, get in touch — the first month is on us with any new website package.",
  },
  {
    q: "Can I switch plans later?",
    a: "Yes — up or down. We prorate the difference automatically.",
  },
  {
    q: "What if I just need a one-off change?",
    a: "Skip the plan and email us — we bill one-off changes at our standard hourly rate.",
  },
];

function FaqStrip() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10 md:py-24">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.32em] text-ember text-glow-ember">
          Questions
        </p>
        <h2 className="mt-6 max-w-3xl font-display text-3xl font-black uppercase leading-[0.95] tracking-[-0.01em] text-ash sm:text-4xl md:text-5xl">
          About the
          <span className="block font-serif text-2xl font-normal italic tracking-normal text-ember sm:text-3xl md:text-4xl">
            recurring side.
          </span>
        </h2>
      </Reveal>
      <ul className="mt-12 divide-y divide-border/70 border-y border-border/70">
        {FAQ.map((item, i) => (
          <li key={item.q}>
            <Reveal delay={(i % 3) * 60}>
              <details className="group py-5">
                <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6">
                  <span className="font-serif text-lg leading-snug text-ash">
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
    </section>
  );
}

function ClosingCta() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 sm:px-10">
      <Reveal>
        <div className="flex flex-col items-start gap-8 rounded-md border border-border bg-basalt p-10 md:flex-row md:items-center md:justify-between md:p-16">
          <div>
            <h2 className="max-w-2xl font-display text-3xl font-black uppercase leading-tight tracking-[-0.01em] text-ash sm:text-5xl">
              Not sure
              <span className="block font-serif text-2xl font-normal italic tracking-normal text-ember sm:text-4xl">
                which tier?
              </span>
            </h2>
            <p className="mt-4 max-w-xl font-serif text-base text-smoke">
              Tell us what the site does and how often it changes — we&rsquo;ll
              recommend the right level.
            </p>
          </div>
          <Link
            href="/contact"
            className="rounded-full border border-border px-8 py-4 font-mono text-xs uppercase tracking-[0.22em] text-ash transition-colors hover:border-ash"
          >
            Talk to us
          </Link>
        </div>
      </Reveal>
    </section>
  );
}

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
