import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import {
  BUYOUT_TABLE,
  WA_GENERAL,
  ZERO_PLANS,
  formatUsd,
  whatsappUrl,
  type ZeroPlan,
} from "@/lib/free-website";
import { Calculator } from "./calculator";

const PAGE_DESCRIPTION =
  "Lava Zero — a custom-designed website for $0 upfront. One flat monthly subscription covers design, hosting, domain, business email, and management. From $99/month.";

export const metadata: Metadata = {
  title: "Free Website — Lava Zero",
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: "Free Website — Lava Zero",
    description: PAGE_DESCRIPTION,
    url: "/free-website",
    images: ["/opengraph-image"],
  },
  twitter: {
    title: "Free Website — Lava Zero",
    description: PAGE_DESCRIPTION,
    images: ["/opengraph-image"],
  },
};

/**
 * /free-website — the "Lava Zero" campaign ($0 upfront, subscription model).
 *
 * Same design system and section rhythm as /web-design: alternating obsidian /
 * basalt bands, ember hairlines at the top of every basalt band, Reveal
 * scroll-ins. Content, pricing, plans, terms, and the live calculator come
 * from lib/free-website.ts. This campaign converts over WhatsApp, so the CTAs
 * are pre-filled wa.me links rather than Stripe Checkout.
 */
export default function FreeWebsitePage() {
  return (
    <>
      <Hero />
      <HowItWorksSection />
      <PlansSection />
      <CalculatorSection />
      <IncludedSection />
      <TermsSection />
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
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-32 sm:px-10 md:py-40">
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-ember text-glow-ember">
            Lava Zero · Web design without the upfront cost
          </p>
          <h1 className="min-w-0 max-w-5xl font-display text-5xl font-black uppercase leading-[0.95] tracking-[-0.01em] text-ash sm:text-7xl md:text-8xl">
            Your website.
            <span className="block font-serif text-4xl font-normal italic tracking-normal text-ember sm:text-5xl md:text-6xl">
              $0 upfront.
            </span>
          </h1>
          <p className="min-w-0 max-w-3xl font-serif text-xl leading-relaxed text-smoke md:text-2xl">
            We design, write, and build your custom website for free. You pay
            one flat monthly subscription that covers everything it takes to
            keep it running — hosting, your domain, business email, security,
            and ongoing management. Stay subscribed and the website itself
            never costs you a dime.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="#plans"
              className="rounded-full bg-lava px-8 py-4 font-mono text-xs uppercase tracking-[0.22em] text-obsidian transition-colors hover:bg-ember"
            >
              See plans — from $99/mo
            </Link>
            <Link
              href="#calculator"
              className="rounded-full border border-border px-8 py-4 font-mono text-xs uppercase tracking-[0.22em] text-ash transition-colors hover:border-ash"
            >
              Build your monthly price
            </Link>
          </div>

          {/* Stat strip */}
          <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-border pt-10 sm:grid-cols-4">
            {HERO_STATS.map((stat) => (
              <div key={stat.label}>
                <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-smoke">
                  {stat.label}
                </dt>
                <dd className="mt-2 font-display text-xl font-black uppercase tracking-[-0.01em] text-ash">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>
    </section>
  );
}

const HERO_STATS = [
  { label: "Upfront cost", value: "$0" },
  { label: "Live in", value: "5–14 days" },
  { label: "Design", value: "100% custom" },
  { label: "After 36 months", value: "Site is fully yours" },
];

// ─── How it works ────────────────────────────────────────────────────────────

const STEPS = [
  {
    title: "Pick a plan",
    body: "Choose the plan that fits your business — from a single landing page to a full online store. Sign the agreement and pay your first month. That's the only payment to start.",
  },
  {
    title: "We build it — free",
    body: "Our Dubai studio designs your site from scratch, writes the copy, registers your domain in your name, and sets up your business email. Most sites launch in 5–14 days.",
  },
  {
    title: "You subscribe monthly",
    body: "Your subscription covers hosting, domain renewal, email hosting, SSL, daily backups, security updates, and a monthly allowance of content changes.",
  },
  {
    title: "Own it outright",
    body: "Complete 36 months and the design and build are fully paid off. Keep subscribing for the running services only, or take everything and go — no build fee owed.",
  },
];

function HowItWorksSection() {
  return (
    <section className="relative border-y border-border bg-basalt">
      <EmberHairline />
      <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 md:py-32">
        <Reveal>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="font-mono text-xs uppercase tracking-[0.32em] text-ember text-glow-ember">
                How it works
              </p>
              <h2 className="mt-6 font-display text-4xl font-black uppercase leading-[0.95] tracking-[-0.01em] text-ash sm:text-5xl md:text-6xl">
                One subscription,
                <span className="block font-serif text-3xl font-normal italic tracking-normal text-ember sm:text-4xl md:text-5xl">
                  everything handled.
                </span>
              </h2>
            </div>
            <p className="font-serif text-lg leading-relaxed text-smoke md:col-span-6 md:col-start-7 md:text-xl">
              No design invoice. No developer quote. No separate renewal bills
              for hosting, domain, and email. One predictable monthly amount
              from day one.
            </p>
          </div>
        </Reveal>

        {/* 4-step horizontal flow with ember connecting line — same pattern
            as the /web-design "How a web project moves" section. */}
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
            {STEPS.map((step, i) => (
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
                        Step {i + 1}
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

// ─── Plans ───────────────────────────────────────────────────────────────────

function PlansSection() {
  return (
    <section
      id="plans"
      className="mx-auto max-w-7xl scroll-mt-24 px-6 py-24 sm:px-10 md:py-32"
    >
      <Reveal>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-ember text-glow-ember">
              Plans &amp; pricing
            </p>
            <h2 className="mt-6 font-display text-4xl font-black uppercase leading-[0.95] tracking-[-0.01em] text-ash sm:text-5xl md:text-6xl">
              Four plans,
              <span className="block font-serif text-3xl font-normal italic tracking-normal text-ember sm:text-4xl md:text-5xl">
                zero upfront on all.
              </span>
            </h2>
          </div>
          <p className="font-serif text-lg leading-relaxed text-smoke md:col-span-6 md:col-start-7 md:text-xl">
            All prices in USD. The standard agreement runs in 12-month cycles
            with a 36-month build-recovery term — see the fair exit terms
            below.
          </p>
        </div>
      </Reveal>

      <ul className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {ZERO_PLANS.map((plan, i) => (
          /* h-full down the whole chain (li → Reveal → card) so the four
             cards share a row height and their CTAs line up, whatever the
             feature list length. */
          <li key={plan.slug} className="h-full">
            <Reveal delay={(i % 4) * 80} className="h-full">
              <PlanCard plan={plan} />
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}

function PlanCard({ plan }: { plan: ZeroPlan }) {
  return (
    <article
      className={[
        "flex h-full flex-col gap-5 rounded-md border bg-obsidian/40 p-7 transition-colors duration-300",
        plan.featured
          ? "border-ember/60 shadow-[0_18px_42px_-12px_rgba(245,176,75,0.28)]"
          : "border-border hover:border-ember/40",
      ].join(" ")}
    >
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-display text-xl font-black uppercase tracking-[-0.01em] text-ash">
          {plan.name}
        </h3>
        {plan.featured ? (
          <span className="shrink-0 rounded-full bg-ember/15 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.22em] text-ember">
            ★ Most popular
          </span>
        ) : null}
      </div>
      <p className="font-serif text-sm italic leading-snug text-smoke">
        {plan.basis}
      </p>

      <div className="border-y border-border py-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-smoke">
          Today: <span className="text-lava">$0</span>
        </p>
        <p className="mt-2 font-display text-4xl font-black tabular-nums tracking-[-0.01em] text-ash">
          {formatUsd(plan.monthly)}
          <span className="pl-2 font-mono text-[10px] uppercase tracking-[0.3em] text-smoke">
            /mo
          </span>
        </p>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-smoke">
          build value {formatUsd(plan.buildValue)}
        </p>
      </div>

      <ul className="flex-1 space-y-2.5">
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

      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-smoke">
          Best for
        </p>
        <p className="mt-2 font-serif text-sm leading-relaxed text-ash">
          {plan.bestFor}
        </p>
      </div>

      <a
        href={whatsappUrl(plan.waMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className={[
          "mt-auto inline-flex items-center justify-center rounded-full px-6 py-3 font-mono text-xs uppercase tracking-[0.22em] transition-colors",
          plan.featured
            ? "bg-lava text-obsidian hover:bg-ember"
            : "border border-border text-ash hover:border-ash",
        ].join(" ")}
      >
        Start {plan.name} →
      </a>
    </article>
  );
}

// ─── Calculator ──────────────────────────────────────────────────────────────

function CalculatorSection() {
  return (
    <section className="relative border-y border-border bg-basalt">
      <EmberHairline />
      <div
        id="calculator"
        className="mx-auto max-w-7xl scroll-mt-24 px-6 py-24 sm:px-10 md:py-32"
      >
        <Reveal>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="font-mono text-xs uppercase tracking-[0.32em] text-ember text-glow-ember">
                Price calculator
              </p>
              <h2 className="mt-6 font-display text-4xl font-black uppercase leading-[0.95] tracking-[-0.01em] text-ash sm:text-5xl md:text-6xl">
                Build your exact
                <span className="block font-serif text-3xl font-normal italic tracking-normal text-ember sm:text-4xl md:text-5xl">
                  monthly amount.
                </span>
              </h2>
            </div>
            <p className="font-serif text-lg leading-relaxed text-smoke md:col-span-6 md:col-start-7 md:text-xl">
              Choose your plan and options. The total updates live — and shows
              exactly what leaving early would cost, so there are no surprises
              hidden in the contract.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <Calculator />
        </Reveal>
      </div>
    </section>
  );
}

// ─── What the subscription covers ────────────────────────────────────────────

const INCLUDED = [
  {
    title: "Hosting & SSL",
    body: "Fast, secure hosting matched to your plan, with SSL certificate, uptime monitoring, and daily backups.",
  },
  {
    title: "Domain renewal",
    body: "Your domain's annual registration is covered and renewed automatically — and it stays registered in your name, always.",
  },
  {
    title: "Business email",
    body: "Professional name@yourcompany.com addresses, hosted and maintained, with web and mobile access.",
  },
  {
    title: "Security & updates",
    body: "Software updates, security patches, and monitoring so your site never quietly breaks or gets compromised.",
  },
  {
    title: "Content changes",
    body: "A monthly allowance of edits — new photos, updated prices, fresh text. Send it on WhatsApp; we handle it.",
  },
  {
    title: "Support",
    body: "A real team in JLT, Dubai. WhatsApp, email, or call — we reply within one business day.",
  },
];

function IncludedSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 sm:px-10 md:py-32">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.32em] text-ember text-glow-ember">
          What your subscription covers
        </p>
        <h2 className="mt-6 max-w-3xl font-display text-4xl font-black uppercase leading-[0.95] tracking-[-0.01em] text-ash sm:text-5xl md:text-6xl">
          Every month,
          <span className="block font-serif text-3xl font-normal italic tracking-normal text-ember sm:text-4xl md:text-5xl">
            all of this is on us.
          </span>
        </h2>
      </Reveal>

      <ul className="mt-16 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 md:grid-cols-3">
        {INCLUDED.map((item, i) => (
          <li key={item.title}>
            <Reveal
              delay={(i % 3) * 80}
              className="flex flex-col gap-3 border-t border-border pt-5"
            >
              <span className="font-mono text-xs tabular-nums text-ember">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-xl font-black uppercase leading-tight tracking-[-0.01em] text-ash">
                {item.title}
              </h3>
              <p className="font-serif text-base leading-relaxed text-smoke">
                {item.body}
              </p>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}

// ─── Fair exit terms ─────────────────────────────────────────────────────────

function TermsSection() {
  return (
    <section className="relative border-y border-border bg-basalt">
      <EmberHairline />
      <div
        id="terms"
        className="mx-auto max-w-7xl scroll-mt-24 px-6 py-24 sm:px-10 md:py-32"
      >
        <Reveal>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-6">
              <p className="font-mono text-xs uppercase tracking-[0.32em] text-ember text-glow-ember">
                Fair exit terms
              </p>
              <h2 className="mt-6 font-display text-4xl font-black uppercase leading-[0.95] tracking-[-0.01em] text-ash sm:text-5xl md:text-6xl">
                The site is free
                <span className="block font-serif text-3xl font-normal italic tracking-normal text-ember sm:text-4xl md:text-5xl">
                  because you stay.
                </span>
              </h2>
            </div>
            <p className="font-serif text-lg leading-relaxed text-smoke md:col-span-6 md:text-xl">
              We put the full terms on this page — not in fine print — because
              this model only works with trust. Your agreement runs in 12-month
              cycles. The build cost is fully absorbed by us over 36 months of
              subscription.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Leaving early — declining buyout table */}
          <Reveal>
            <TermCard title="Leaving before 36 months">
              <p className="font-serif text-base leading-relaxed text-smoke">
                If you cancel early, you pay a 3-month exit fee plus a buyout of
                the remaining build value. The buyout shrinks every year you
                stay:
              </p>
              <table className="mt-6 w-full border-collapse">
                <thead>
                  <tr>
                    <th className="pb-3 text-left font-mono text-[10px] uppercase tracking-[0.22em] text-smoke">
                      When you leave
                    </th>
                    <th className="pb-3 text-right font-mono text-[10px] uppercase tracking-[0.22em] text-smoke">
                      Build buyout owed
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {BUYOUT_TABLE.map((row) => (
                    <tr key={row.when}>
                      <td
                        className={[
                          "border-t border-border py-3 font-serif text-sm",
                          row.free ? "font-semibold text-ember" : "text-ash",
                        ].join(" ")}
                      >
                        {row.when}
                      </td>
                      <td
                        className={[
                          "border-t border-border py-3 text-right font-mono text-sm tabular-nums",
                          row.free ? "font-semibold text-ember" : "text-smoke",
                        ].join(" ")}
                      >
                        {row.owed}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TermCard>
          </Reveal>

          {/* Renewal & notice */}
          <Reveal delay={80}>
            <TermCard title="Renewal & notice period">
              <p className="font-serif text-base leading-relaxed text-smoke">
                Your subscription renews in 12-month cycles. To cancel or not
                renew, give us written notice at least{" "}
                <strong className="text-ash">
                  90 days before your contract anniversary
                </strong>
                . Without notice, the agreement renews for a further 12 months,
                because we commit to your hosting, domain, and email services a
                full year in advance.
              </p>
              <p className="mt-4 font-serif text-base leading-relaxed text-smoke">
                Notice is simple: one email to{" "}
                <a
                  href="mailto:info@lavaprints.com"
                  className="text-ember underline-offset-4 hover:underline"
                >
                  info@lavaprints.com
                </a>
                . We confirm in writing within one business day.
              </p>
            </TermCard>
          </Reveal>

          {/* Taking everything with you — offboarding fees */}
          <Reveal>
            <TermCard title="Taking everything with you">
              <p className="font-serif text-base leading-relaxed text-smoke">
                When you leave — whenever that is — you can take your complete
                website, all content, and your domain. Our one-time offboarding
                service covers full data export, files handover, and domain
                transfer assistance:
              </p>
              <ul className="mt-6 divide-y divide-border/70 border-y border-border/70">
                {ZERO_PLANS.map((plan) => (
                  <li
                    key={plan.slug}
                    className="flex items-baseline justify-between gap-4 py-3"
                  >
                    <span className="font-serif text-sm text-ash">
                      {plan.name}
                    </span>
                    <span className="shrink-0 font-mono text-sm tabular-nums text-ember">
                      {formatUsd(plan.offboard)}
                    </span>
                  </li>
                ))}
              </ul>
            </TermCard>
          </Reveal>

          {/* What's always yours */}
          <Reveal delay={80}>
            <TermCard title="What's always yours">
              <p className="font-serif text-base leading-relaxed text-smoke">
                Your domain is registered in{" "}
                <strong className="text-ash">your name</strong> from day one —
                we manage it, but you are the legal owner. Your content, your
                images, and your customer data belong to you at all times. After
                36 completed months, the design and code are yours outright too,
                with no buyout.
              </p>
              <p className="mt-4 font-serif text-base leading-relaxed text-smoke">
                All amounts on this page are in USD. A signed agreement with
                these exact terms is provided before any project starts.
              </p>
            </TermCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function TermCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article className="flex h-full flex-col rounded-md border border-border bg-obsidian/40 p-8">
      <h3 className="font-display text-lg font-black uppercase tracking-[-0.01em] text-ash">
        {title}
      </h3>
      <div className="mt-4">{children}</div>
    </article>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

const FAQ = [
  {
    q: "Is the website really free?",
    a: "Yes — you pay $0 for design and development. We recover our build cost gradually through your monthly subscription over 36 months, the same subscription that also pays for your hosting, domain, email, and management. If you complete 36 months, the build is fully settled and you owe nothing for it, ever.",
  },
  {
    q: "Is this a template website?",
    a: "No. Every Lava Zero site is the same custom design and build we sell as our fixed-price packages — designed from a blank page for your brand by our Dubai studio, with copywriting included.",
  },
  {
    q: "What happens after 36 months?",
    a: "The build is paid off. You can keep your subscription running for the ongoing services (hosting, domain, email, updates, content changes), switch to one of our lighter maintenance plans, or take everything and host it yourself with only the offboarding fee.",
  },
  {
    q: "Why is there a buyout if I leave early?",
    a: "Because we paid for your website's design and development upfront on your behalf. If you leave before that cost is recovered, the buyout simply settles the unrecovered portion — and it drops by roughly a third each year you stay. Everything you've already paid in subscriptions covered the services you received; it isn't lost.",
  },
  {
    q: "Who owns my domain and content?",
    a: "You do, from day one. The domain is registered in your name; we manage renewals as part of your subscription. Your content, images, and customer data are yours at all times.",
  },
  {
    q: "Can I upgrade my plan later?",
    a: "Yes. You can upgrade anytime — for example from Zero Launch to Zero Business. We quote the additional build work, adjust your monthly amount, and the 36-month recovery clock for the new work starts from the upgrade date.",
  },
  {
    q: "What if I miss the 90-day notice window?",
    a: "The agreement renews for a further 12 months, because we prepay and commit to your hosting, domain registration, and email hosting a year at a time. We send you a reminder 120 days before your anniversary so the window never sneaks up on you.",
  },
  {
    q: "How do I pay each month?",
    a: "Billing is monthly by card through Stripe — the same processor we use across the studio. Your card details never touch our servers, and you get a receipt on every charge. All prices shown are in USD.",
  },
];

function FaqSection() {
  return (
    <section id="faq" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-24 sm:px-10 md:py-32">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.32em] text-ember text-glow-ember">
          FAQ
        </p>
        <h2 className="mt-6 max-w-3xl font-display text-4xl font-black uppercase leading-[0.95] tracking-[-0.01em] text-ash sm:text-5xl md:text-6xl">
          Questions,
          <span className="block font-serif text-3xl font-normal italic tracking-normal text-ember sm:text-4xl md:text-5xl">
            answered straight.
          </span>
        </h2>
      </Reveal>

      <ul className="mt-16 divide-y divide-border/70 border-y border-border/70">
        {FAQ.map((item, i) => (
          <li key={item.q}>
            <Reveal delay={(i % 4) * 60}>
              {/* <details> gives click-to-expand with no JS — same accordion
                  the /web-design FAQ uses. */}
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
    </section>
  );
}

// ─── Closing CTA ─────────────────────────────────────────────────────────────

function ClosingCta() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-32 sm:px-10">
      <Reveal>
        <div className="flex flex-col items-start gap-8 rounded-md border border-border bg-basalt p-10 md:flex-row md:items-center md:justify-between md:p-16">
          <div>
            <h2 className="max-w-2xl font-display text-3xl font-black uppercase leading-tight tracking-[-0.01em] text-ash sm:text-5xl">
              Start today.
              <span className="block font-serif text-2xl font-normal italic tracking-normal text-ember sm:text-4xl">
                Pay $0 today.
              </span>
            </h2>
            <p className="mt-4 max-w-xl font-serif text-base text-smoke">
              Tell us about your business on WhatsApp. We&rsquo;ll recommend a
              plan, confirm your monthly amount, and give you a launch date —
              within one business day.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a
              href={whatsappUrl(WA_GENERAL)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-lava px-8 py-4 font-mono text-xs uppercase tracking-[0.22em] text-obsidian transition-colors hover:bg-ember"
            >
              Chat on WhatsApp →
            </a>
            <Link
              href="/contact"
              className="rounded-full border border-border px-8 py-4 font-mono text-xs uppercase tracking-[0.22em] text-ash transition-colors hover:border-ash"
            >
              Book a call
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
