import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { ServiceCard } from "@/components/service-card";
import {
  getCategoryMeta,
  getServicesByCategory,
} from "@/lib/services";

const PAGE_DESCRIPTION =
  "Engineering and architecture services — alongside the brand, web, and packaging design that surrounds them. Two studios, one team.";

export const metadata: Metadata = {
  title: "Services",
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: "Services",
    description: PAGE_DESCRIPTION,
    url: "/services",
    images: ["/opengraph-image"],
  },
  twitter: {
    title: "Services",
    description: PAGE_DESCRIPTION,
    images: ["/opengraph-image"],
  },
};

export default function ServicesPage() {
  const engineering = getServicesByCategory("engineering");
  const design = getServicesByCategory("design");

  return (
    <>
      <HeroBand />
      <EngineeringGroup services={engineering} />
      <DesignServicesGroup services={design} />
      <HowWeWorkSection />
      <ClosingCta />
    </>
  );
}

// ─── How we work — 5-step process flow ──────────────────────────────────────

const PROCESS_STEPS = [
  {
    title: "Brief & Discovery",
    description:
      "We start by understanding the project — scope, constraints, goals, and the standards it has to meet. For engineering, that means site conditions and code; for design, brand and audience. Either way, we get specific before we start.",
  },
  {
    title: "Concept & Direction",
    description:
      "We translate the brief into a direction — early schemes, system approaches, or design concepts — so you can see and shape the thinking before it's locked in.",
  },
  {
    title: "Engineering & Design",
    description:
      "The core work. Permit-ready mechanical, electrical, plumbing, structural, and civil documents — or finished design, artwork, and visualization — developed with the same rigor and material attention.",
  },
  {
    title: "Documentation & Coordination",
    description:
      "We produce the deliverables and coordinate the details — contractor-biddable drawing sets, production-ready files, cross-discipline checks — so what we hand over is built to be built from.",
  },
  {
    title: "Delivery & Support",
    description:
      "We deliver, and we stay reachable — through permitting, revisions, fabrication, or launch. The relationship doesn't end at handoff.",
  },
];

function HowWeWorkSection() {
  return (
    <section className="relative border-y border-border bg-basalt">
      {/* Ember hairline at the top — matches the home-page lighting pass. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(245,176,75,0.45), transparent)",
        }}
      />
      <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 md:py-32">
        <Reveal>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="font-mono text-xs uppercase tracking-[0.32em] text-ember text-glow-ember">
                How we work
              </p>
              <h2 className="mt-6 font-display text-4xl font-black uppercase leading-[0.95] tracking-[-0.01em] text-ash sm:text-5xl md:text-6xl">
                From first conversation
                <span className="block font-serif text-3xl font-normal italic tracking-normal text-ember sm:text-4xl md:text-5xl">
                  to final delivery.
                </span>
              </h2>
            </div>
            <p className="font-serif text-lg leading-relaxed text-smoke md:col-span-6 md:col-start-7 md:text-xl">
              Every project moves through the same five stages — whether
              it&rsquo;s a building&rsquo;s systems or a brand&rsquo;s
              identity. Clear at each step, so you always know where things
              stand.
            </p>
          </div>
        </Reveal>

        {/* Step flow — relative container so the connecting ember line can
            be positioned absolutely behind the numbered badges. Desktop:
            horizontal line through the centers of the badges (top:28px).
            Mobile: vertical line down the badge column (left:28px). The
            line ends inside the first/last badge — basalt-bg circles
            visually "cut" it so the flow reads as connected segments. */}
        <div className="relative mt-20 md:mt-24">
          {/* Horizontal line — desktop only */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-[28px] hidden h-px md:block"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(245,176,75,0.4) 8%, rgba(245,176,75,0.4) 92%, transparent 100%)",
            }}
          />
          {/* Vertical line — mobile only */}
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-[28px] left-[28px] top-[28px] w-px md:hidden"
            style={{
              background:
                "linear-gradient(180deg, rgba(245,176,75,0.45) 0%, rgba(245,176,75,0.25) 100%)",
            }}
          />

          <ol className="grid grid-cols-1 gap-12 md:grid-cols-5 md:gap-6">
            {PROCESS_STEPS.map((step, i) => (
              <li key={step.title}>
                {/* Staggered reveal: each step appears ~120ms after the
                    previous, so the flow reads left-to-right on desktop
                    and top-to-bottom on mobile when scrolled into view. */}
                <Reveal delay={i * 120}>
                  <div className="flex gap-6 md:flex-col md:gap-6">
                    <span
                      aria-hidden
                      className="relative z-10 inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-basalt font-mono text-base tabular-nums text-ember text-glow-ember ring-1 ring-ember/40"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1 md:mt-2">
                      <h3 className="font-display text-xl font-black uppercase leading-tight tracking-[-0.01em] text-ash">
                        {step.title}
                      </h3>
                      <p className="mt-3 font-serif text-sm leading-relaxed text-smoke">
                        {step.description}
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

// ─── Hero ────────────────────────────────────────────────────────────────────

function HeroBand() {
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
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-ember">
            Services
          </p>
          <h1 className="max-w-5xl font-display text-5xl font-black uppercase leading-[0.95] tracking-[-0.01em] text-ash sm:text-7xl md:text-8xl">
            Comprehensive design
            <span className="block font-serif text-4xl font-normal italic tracking-normal text-ember sm:text-5xl md:text-6xl">
              solutions.
            </span>
          </h1>
          <p className="max-w-3xl font-serif text-xl leading-relaxed text-smoke md:text-2xl">
            We offer a wide range of engineering design services, alongside
            construction administration for residential and commercial
            projects — from new builds and additions to alterations, changes
            of occupancy, and renovations. Our strength is lead time and
            communication: we keep you close to every detail of the job,
            leaving no vague points.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

// ─── Engineering Group ──────────────────────────────────────────────────────

function EngineeringGroup({
  services,
}: {
  services: ReturnType<typeof getServicesByCategory>;
}) {
  const meta = getCategoryMeta("engineering");
  return (
    <section className="border-y border-border bg-basalt">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 md:py-32">
        <Reveal>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="font-mono text-xs uppercase tracking-[0.32em] text-ember">
                The focus
              </p>
              <h2 className="mt-6 font-display text-4xl font-black uppercase leading-[0.95] tracking-[-0.01em] text-ash sm:text-5xl md:text-6xl">
                Engineering &amp;
                <span className="block font-serif text-3xl font-normal italic tracking-normal text-ember sm:text-4xl md:text-5xl">
                  architecture.
                </span>
              </h2>
            </div>
            <p className="font-serif text-lg leading-relaxed text-smoke md:col-span-6 md:col-start-7 md:text-xl">
              {meta.blurb}
            </p>
          </div>
        </Reveal>

        <div className="mt-20 grid grid-cols-1 gap-x-10 gap-y-20 md:grid-cols-2">
          {services.map((svc, i) => (
            <Reveal key={svc.slug} delay={(i % 2) * 80}>
              <ServiceCard service={svc} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Design Services Group ──────────────────────────────────────────────────

function DesignServicesGroup({
  services,
}: {
  services: ReturnType<typeof getServicesByCategory>;
}) {
  const meta = getCategoryMeta("design");
  // Offset numbering so design services pick up where engineering left off (07–10).
  const numberOffset = getServicesByCategory("engineering").length;

  return (
    <section className="relative bg-obsidian">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(245,176,75,0.5), transparent)",
        }}
      />
      <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 md:py-32">
        <Reveal>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="font-mono text-xs uppercase tracking-[0.32em] text-ember">
                Also offered
              </p>
              <h2 className="mt-6 font-display text-4xl font-black uppercase leading-[0.95] tracking-[-0.01em] text-ash sm:text-5xl md:text-6xl">
                Design
                <span className="block font-serif text-3xl font-normal italic tracking-normal text-ember sm:text-4xl md:text-5xl">
                  services.
                </span>
              </h2>
            </div>
            <p className="font-serif text-lg leading-relaxed text-smoke md:col-span-6 md:col-start-7 md:text-xl">
              {meta.blurb}
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((svc, i) => (
            <Reveal key={svc.slug} delay={i * 80}>
              <ServiceCard service={svc} index={numberOffset + i} />
            </Reveal>
          ))}
        </div>
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
              Let&rsquo;s begin building
              <span className="block font-serif text-2xl font-normal italic tracking-normal text-ember sm:text-4xl">
                your dream.
              </span>
            </h2>
            <p className="mt-4 max-w-xl font-serif text-base text-smoke">
              Tell us about the project — we reply to every serious enquiry
              within two working days.
            </p>
          </div>
          <Link
            href="/contact"
            className="rounded-full bg-lava px-8 py-4 font-mono text-xs uppercase tracking-[0.22em] text-obsidian transition-colors hover:bg-ember"
          >
            Start a project
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
