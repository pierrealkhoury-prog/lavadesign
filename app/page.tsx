import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { WorkCard } from "@/components/work-card";
import { getFeaturedProjects } from "@/lib/projects";

// ─── Metadata ───────────────────────────────────────────────────────────────

const PAGE_DESCRIPTION =
  "Lava Design — an engineering-led technical design partner supporting architects, agencies, developers and project teams across the built environment. Studios in Houston and Orlando, with experience across the USA, UAE and GCC.";

export const metadata: Metadata = {
  description: PAGE_DESCRIPTION,
  openGraph: {
    description: PAGE_DESCRIPTION,
    url: "/",
    images: ["/opengraph-image"],
  },
  twitter: {
    description: PAGE_DESCRIPTION,
    images: ["/opengraph-image"],
  },
};

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const featured = getFeaturedProjects();
  return (
    <>
      <HeroSection />
      <ImpactSection />
      <PracticeSection />
      <ServicesSnapshotSection />
      <FeaturedWorkSection featured={featured} />
      <WhyLavaSection />
      <FinalCtaSection />
    </>
  );
}

// ─── 1. Hero ────────────────────────────────────────────────────────────────

/**
 * Hero — same dual-layout media (in-flow 16:9 banner on mobile, absolute
 * fill on desktop) and same wireframe-to-render video that was in place
 * before. Only the copy + CTAs change: positioning is now engineering-led
 * support, not multidisciplinary design.
 */
function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="relative aspect-video w-full md:absolute md:inset-0 md:-z-20 md:aspect-auto md:h-full">
        <picture>
          <source type="image/webp" srcSet="/home/hero-desktop.webp" />
          <source type="image/jpeg" srcSet="/home/hero-desktop.jpg" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/home/hero-desktop.jpg"
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover"
            fetchPriority="high"
          />
        </picture>
        <video
          src="/home/hero.mp4"
          poster="/home/hero-desktop.jpg"
          autoPlay
          muted
          playsInline
          preload="auto"
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
        />
      </div>

      {/* Desktop scrim — keeps the dark-left zone for the headline overlay. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 hidden md:block"
        style={{
          background:
            "linear-gradient(to right, rgba(10,7,6,0.92) 0%, rgba(10,7,6,0.7) 35%, rgba(10,7,6,0.1) 72%, rgba(10,7,6,0) 100%)",
        }}
      />

      <Reveal>
        <div className="mx-auto flex max-w-7xl flex-col gap-14 px-6 py-16 sm:px-10 md:py-40">
          <p className="min-w-0 font-mono text-xs uppercase tracking-[0.32em] text-ember text-glow-ember">
            Engineering-led technical design partner
          </p>
          <h1 className="min-w-0 max-w-5xl font-display text-5xl font-black uppercase leading-[0.95] tracking-[-0.01em] text-ash sm:text-7xl md:text-8xl">
            Engineering the technical backbone
            <span className="block font-serif text-4xl font-normal italic tracking-normal text-ember sm:text-5xl md:text-6xl">
              behind ambitious spaces.
            </span>
          </h1>
          <p className="min-w-0 max-w-3xl font-serif text-xl leading-relaxed text-smoke md:text-2xl">
            Lava Design supports architects, agencies, developers and
            project teams with coordinated engineering, documentation
            and design-development support across the built
            environment.
          </p>
          <div className="flex flex-wrap gap-4">
            {/* Primary action for the .us audience is lead generation —
                "Discuss a project" gets the filled-lava treatment, and
                "Explore our work" sits as the bordered secondary. */}
            <Link
              href="/contact"
              className="rounded-full bg-lava px-8 py-4 font-mono text-xs uppercase tracking-[0.22em] text-obsidian transition-colors hover:bg-ember"
            >
              Discuss a project
            </Link>
            <Link
              href="/work"
              className="rounded-full border border-border px-8 py-4 font-mono text-xs uppercase tracking-[0.22em] text-ash transition-colors hover:border-ash"
            >
              Explore our work
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

// ─── 2. Impact (asymmetric stat cards + SVG metaphors) ─────────────────────

/**
 * Asymmetric impact grid. Top row at lg+: a featured "120+ Projects" card
 * (col-span-7) + a wide "Multi-region reach" card (col-span-5). Bottom row:
 * three supporting cards (Disciplines / Studios / Years) at col-span-4
 * each. Stacks to single-column below lg so the cards stay compact on
 * mobile rather than ballooning.
 *
 * Each card carries its own small inline-SVG metaphor — no external lib.
 * Hover is subtle: ember border tint, soft glow, 2px lift, the metaphor
 * lines brighten via group-hover opacity. Per brief, deliberately not
 * over-animated.
 */
function ImpactSection() {
  return (
    <section className="relative border-y border-border bg-basalt">
      <EmberHairline />
      <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 md:py-32">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-ember text-glow-ember">
            Impact
          </p>
          <h2 className="mt-6 max-w-4xl font-display text-4xl font-black uppercase leading-[0.95] tracking-[-0.01em] text-ash sm:text-5xl md:text-6xl">
            Built across disciplines,
            <span className="block font-serif text-3xl font-normal italic tracking-normal text-ember sm:text-4xl md:text-5xl">
              projects and regions.
            </span>
          </h2>
          <p className="mt-8 max-w-3xl font-serif text-lg leading-relaxed text-smoke md:text-xl">
            From technical documentation to multidisciplinary project
            support, Lava Design brings structure, coordination and
            clarity to projects across sectors, disciplines and regions.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-6">
          {/* Top row: featured Projects + wide Multi-region */}
          <Reveal className="lg:col-span-7">
            <ProjectsCard />
          </Reveal>
          <Reveal delay={80} className="lg:col-span-5">
            <MultiRegionCard />
          </Reveal>
          {/* Bottom row: 3 supporting cards */}
          <Reveal delay={160} className="lg:col-span-4">
            <DisciplinesCard />
          </Reveal>
          <Reveal delay={200} className="lg:col-span-4">
            <StudiosCard />
          </Reveal>
          <Reveal delay={240} className="lg:col-span-4">
            <YearsCard />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** Shared base classes for every impact card. The `group` class lets
 *  child SVGs respond to card hover via group-hover utilities. */
const IMPACT_CARD =
  "group flex h-full flex-col gap-5 rounded-md border border-border bg-obsidian/40 p-7 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-ember/50 hover:shadow-[0_18px_42px_-16px_rgba(245,176,75,0.32)]";

function ProjectsCard() {
  return (
    <article className={IMPACT_CARD}>
      <ProjectsMetaphor />
      <p className="font-display text-6xl font-black tabular-nums leading-none tracking-[-0.01em] text-ash sm:text-7xl">
        120+
      </p>
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ember">
        Projects
      </p>
      <p className="max-w-md font-serif text-base leading-relaxed text-smoke">
        Shaped, documented or delivered across the built environment —
        from single-site fit-outs to multi-discipline campus work.
      </p>
    </article>
  );
}

function DisciplinesCard() {
  return (
    <article className={IMPACT_CARD}>
      <DisciplinesMetaphor />
      <p className="font-display text-5xl font-black tabular-nums leading-none tracking-[-0.01em] text-ash">
        4+
      </p>
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ember">
        Core engineering disciplines
      </p>
      <p className="font-serif text-sm leading-relaxed text-smoke">
        Structural, mechanical, electrical, civil — coordinated in-house.
      </p>
    </article>
  );
}

function StudiosCard() {
  return (
    <article className={IMPACT_CARD}>
      <StudiosMetaphor />
      <p className="font-display text-5xl font-black tabular-nums leading-none tracking-[-0.01em] text-ash">
        2
      </p>
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ember">
        US studios
      </p>
      <p className="font-serif text-sm leading-relaxed text-smoke">
        Houston and Orlando, with shared delivery across both.
      </p>
    </article>
  );
}

function YearsCard() {
  return (
    <article className={IMPACT_CARD}>
      <YearsMetaphor />
      <p className="font-display text-5xl font-black tabular-nums leading-none tracking-[-0.01em] text-ash">
        15+
      </p>
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ember">
        Years of cross-disciplinary experience
      </p>
      <p className="font-serif text-sm leading-relaxed text-smoke">
        Senior leadership with a track record across markets.
      </p>
    </article>
  );
}

function MultiRegionCard() {
  return (
    <article className={IMPACT_CARD}>
      <RegionsMetaphor />
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
        <h3 className="font-display text-3xl font-black uppercase leading-tight tracking-[-0.01em] text-ash sm:text-4xl">
          Multi-region reach
        </h3>
        <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-ember">
          USA · UAE · GCC
        </span>
      </div>
      <p className="max-w-md font-serif text-base leading-relaxed text-smoke">
        Projects, clients and collaborators across key markets, with
        regional insight and cross-border delivery support.
      </p>
    </article>
  );
}

// ─── Impact metaphors ───────────────────────────────────────────────────────
// Lightweight inline SVGs. Each one's stroke colors carry an opacity that
// lifts on group-hover via Tailwind's `group-hover:opacity-100` on the
// wrapping <g>. Pure SVG, no external deps.

function ProjectsMetaphor() {
  // Three stacked drawing sheets — each offset diagonally, the topmost
  // tinted ember to read as the "live" sheet.
  return (
    <svg
      aria-hidden
      viewBox="0 0 80 56"
      className="h-14 w-20"
      fill="none"
    >
      <g
        className="opacity-70 transition-opacity duration-300 group-hover:opacity-100"
        strokeLinecap="square"
      >
        <rect x="4" y="20" width="46" height="32" rx="1" stroke="rgba(245,176,75,0.45)" />
        <rect x="13" y="12" width="46" height="32" rx="1" stroke="rgba(245,176,75,0.65)" />
        <rect
          x="22"
          y="4"
          width="46"
          height="32"
          rx="1"
          fill="rgba(255,77,28,0.06)"
          stroke="rgba(245,176,75,0.95)"
        />
        {/* Three faint horizontal "line items" on the front sheet to suggest a drawing */}
        <line x1="28" y1="14" x2="58" y2="14" stroke="rgba(245,176,75,0.5)" strokeWidth="0.5" />
        <line x1="28" y1="20" x2="50" y2="20" stroke="rgba(245,176,75,0.35)" strokeWidth="0.5" />
        <line x1="28" y1="26" x2="54" y2="26" stroke="rgba(245,176,75,0.35)" strokeWidth="0.5" />
      </g>
    </svg>
  );
}

function DisciplinesMetaphor() {
  // Four parallel system lines stacked vertically. Subtle stagger in the
  // start position so they read as separate "tracks" running across the
  // card, like building-system runs in plan.
  return (
    <svg
      aria-hidden
      viewBox="0 0 80 56"
      className="h-14 w-20"
      fill="none"
    >
      <g
        className="opacity-70 transition-opacity duration-300 group-hover:opacity-100"
        strokeLinecap="round"
      >
        <line x1="4" y1="12" x2="76" y2="12" stroke="rgba(245,176,75,0.45)" strokeWidth="1.5" />
        <line x1="10" y1="24" x2="76" y2="24" stroke="rgba(245,176,75,0.6)" strokeWidth="1.5" />
        <line x1="4" y1="36" x2="70" y2="36" stroke="rgba(245,176,75,0.75)" strokeWidth="1.5" />
        <line x1="10" y1="48" x2="76" y2="48" stroke="rgba(255,77,28,0.9)" strokeWidth="1.5" />
        {/* Small connection dots — discipline interfaces */}
        <circle cx="40" cy="12" r="1.6" fill="rgba(245,176,75,0.8)" />
        <circle cx="40" cy="24" r="1.6" fill="rgba(245,176,75,0.8)" />
        <circle cx="40" cy="36" r="1.6" fill="rgba(245,176,75,0.8)" />
        <circle cx="40" cy="48" r="1.6" fill="rgba(255,77,28,0.95)" />
      </g>
    </svg>
  );
}

function StudiosMetaphor() {
  // Two glowing points connected by a thin line. Light "halo" ring around
  // each dot for the glow read.
  return (
    <svg
      aria-hidden
      viewBox="0 0 80 56"
      className="h-14 w-20"
      fill="none"
    >
      <g className="opacity-70 transition-opacity duration-300 group-hover:opacity-100">
        <line x1="14" y1="28" x2="66" y2="28" stroke="rgba(245,176,75,0.55)" strokeWidth="1" />
        {/* Houston */}
        <circle cx="14" cy="28" r="9" fill="rgba(255,77,28,0.1)" />
        <circle cx="14" cy="28" r="5" fill="none" stroke="rgba(255,77,28,0.45)" />
        <circle cx="14" cy="28" r="2.5" fill="rgba(255,77,28,0.95)" />
        {/* Orlando */}
        <circle cx="66" cy="28" r="9" fill="rgba(255,77,28,0.1)" />
        <circle cx="66" cy="28" r="5" fill="none" stroke="rgba(255,77,28,0.45)" />
        <circle cx="66" cy="28" r="2.5" fill="rgba(255,77,28,0.95)" />
      </g>
    </svg>
  );
}

function YearsMetaphor() {
  // Ruler / timeline: horizontal baseline with regular tick marks, taller
  // ticks at "milestone" intervals, an ember marker near the end.
  return (
    <svg
      aria-hidden
      viewBox="0 0 80 56"
      className="h-14 w-20"
      fill="none"
    >
      <g
        className="opacity-70 transition-opacity duration-300 group-hover:opacity-100"
        strokeLinecap="square"
      >
        <line x1="4" y1="40" x2="76" y2="40" stroke="rgba(245,176,75,0.55)" strokeWidth="1" />
        {/* short ticks at every 6px (small year units) */}
        {[10, 16, 22, 34, 40, 52, 58, 64].map((x) => (
          <line key={x} x1={x} y1="36" x2={x} y2="40" stroke="rgba(245,176,75,0.4)" strokeWidth="0.7" />
        ))}
        {/* taller "milestone" ticks at 5-year intervals */}
        <line x1="6" y1="28" x2="6" y2="40" stroke="rgba(245,176,75,0.75)" strokeWidth="1" />
        <line x1="28" y1="28" x2="28" y2="40" stroke="rgba(245,176,75,0.75)" strokeWidth="1" />
        <line x1="46" y1="28" x2="46" y2="40" stroke="rgba(245,176,75,0.85)" strokeWidth="1" />
        <line x1="70" y1="22" x2="70" y2="40" stroke="rgba(255,77,28,0.95)" strokeWidth="1.5" />
        {/* the "current" marker */}
        <circle cx="70" cy="20" r="2.2" fill="rgba(255,77,28,0.95)" />
      </g>
    </svg>
  );
}

function RegionsMetaphor() {
  // Three glowing points (USA, UAE, GCC) in a wide arrangement, connected
  // by molten-orange lines. Wider viewBox to suit the wide card.
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 60"
      className="h-16 w-full max-w-[260px]"
      fill="none"
    >
      <g className="opacity-75 transition-opacity duration-300 group-hover:opacity-100">
        {/* primary connection arcs — solid molten */}
        <line x1="20" y1="36" x2="110" y2="20" stroke="rgba(255,77,28,0.65)" strokeWidth="1" />
        <line x1="110" y1="20" x2="180" y2="40" stroke="rgba(255,77,28,0.65)" strokeWidth="1" />
        {/* faint return connection */}
        <line
          x1="20"
          y1="36"
          x2="180"
          y2="40"
          stroke="rgba(245,176,75,0.35)"
          strokeWidth="0.8"
          strokeDasharray="2 3"
        />
        {/* USA */}
        <circle cx="20" cy="36" r="11" fill="rgba(255,77,28,0.1)" />
        <circle cx="20" cy="36" r="6" fill="none" stroke="rgba(255,77,28,0.5)" />
        <circle cx="20" cy="36" r="3" fill="rgba(255,77,28,0.95)" />
        {/* UAE — slightly higher, the apex */}
        <circle cx="110" cy="20" r="11" fill="rgba(255,77,28,0.1)" />
        <circle cx="110" cy="20" r="6" fill="none" stroke="rgba(255,77,28,0.5)" />
        <circle cx="110" cy="20" r="3" fill="rgba(255,77,28,0.95)" />
        {/* GCC */}
        <circle cx="180" cy="40" r="11" fill="rgba(255,77,28,0.1)" />
        <circle cx="180" cy="40" r="6" fill="none" stroke="rgba(255,77,28,0.5)" />
        <circle cx="180" cy="40" r="3" fill="rgba(255,77,28,0.95)" />
      </g>
    </svg>
  );
}

// ─── 3. Practice (Technical Delivery + Design Support) ──────────────────────

const PRACTICE = [
  {
    title: "Technical Delivery",
    body: "Engineering, documentation, coordination and permit-ready support for project teams, architects and developers.",
  },
  {
    title: "Design Support",
    body: "2D / 3D visualisation, design-development assistance and creative production support when projects need more clarity, speed or presentation value.",
  },
];

function PracticeSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 sm:px-10 md:py-32">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.32em] text-ember text-glow-ember">
          The practice
        </p>
        <h2 className="mt-6 max-w-4xl font-display text-4xl font-black uppercase leading-[0.95] tracking-[-0.01em] text-ash sm:text-5xl md:text-6xl">
          Engineering-led.
          <span className="block font-serif text-3xl font-normal italic tracking-normal text-ember sm:text-4xl md:text-5xl">
            Design-aware.
          </span>
        </h2>
      </Reveal>

      <ul className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
        {PRACTICE.map((c, i) => (
          <li key={c.title}>
            <Reveal delay={i * 100}>
              <article className="flex h-full flex-col gap-5 rounded-md border border-border bg-basalt p-8 transition-colors duration-300 hover:border-ember/40">
                <span
                  aria-hidden
                  className="font-mono text-xs tabular-nums text-ember"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-2xl font-black uppercase tracking-[-0.01em] text-ash">
                  {c.title}
                </h3>
                <p className="font-serif text-base leading-relaxed text-smoke">
                  {c.body}
                </p>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}

// ─── 4. Services snapshot ───────────────────────────────────────────────────

/**
 * Eight focus areas linked through to /services/[slug] where a dedicated
 * page exists. Mechanical Engineering + Plumbing both point at the same
 * combined /services/mechanical-plumbing page (the current data model
 * keeps them together). 2D/3D Support and Project Documentation don't
 * yet have dedicated pages — they link to /services as a catch-all.
 *
 * The card's underline is sized for a future system-line / circuit-trace
 * animation: width grows on hover today as a hint.
 */
const SERVICES_SNAPSHOT = [
  { title: "Structural Engineering", href: "/services/structural-engineering" },
  { title: "Mechanical Engineering", href: "/services/mechanical-plumbing" },
  { title: "Electrical Engineering", href: "/services/electrical-engineering" },
  { title: "Plumbing", href: "/services/mechanical-plumbing" },
  { title: "Civil Engineering", href: "/services/civil-engineering" },
  { title: "2D / 3D Support", href: "/services" },
  { title: "Architectural Support", href: "/services/architectural-design" },
  { title: "Project Documentation", href: "/services" },
];

function ServicesSnapshotSection() {
  return (
    <section className="relative border-y border-border bg-basalt">
      <EmberHairline />
      <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 md:py-32">
        <Reveal>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="font-mono text-xs uppercase tracking-[0.32em] text-ember text-glow-ember">
                What we cover
              </p>
              <h2 className="mt-6 font-display text-4xl font-black uppercase leading-[0.95] tracking-[-0.01em] text-ash sm:text-5xl md:text-6xl">
                Engineering
                <span className="block font-serif text-3xl font-normal italic tracking-normal text-ember sm:text-4xl md:text-5xl">
                  across systems.
                </span>
              </h2>
            </div>
            <p className="font-serif text-lg leading-relaxed text-smoke md:col-span-6 md:col-start-7 md:text-xl">
              Eight focus areas, held in-house and coordinated under one
              roof. Each links through to the full service page.
            </p>
          </div>
        </Reveal>

        <ul className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES_SNAPSHOT.map((svc, i) => (
            <li key={svc.title}>
              <Reveal delay={(i % 4) * 60}>
                <Link
                  href={svc.href}
                  className="group flex h-full flex-col justify-between gap-6 rounded-md border border-border bg-obsidian/40 p-6 transition-colors duration-300 hover:border-ember/40"
                >
                  {/* Icon slot — short hairline that grows on hover.
                      Placeholder for a future system-line / circuit-trace
                      icon per the brief. */}
                  <div
                    aria-hidden
                    className="h-px w-12 bg-ember/50 transition-[width,background-color] duration-300 group-hover:w-20 group-hover:bg-ember"
                  />
                  <h3 className="font-display text-lg font-black uppercase leading-tight tracking-[-0.01em] text-ash">
                    {svc.title}
                  </h3>
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-smoke transition-colors group-hover:text-ash">
                    See service →
                  </p>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ─── 5. Featured work ───────────────────────────────────────────────────────

/**
 * Existing WorkCard is reused — it already displays the project name,
 * location, year and a 4:5 thumbnail with hover scale + opacity. Sector
 * and scope tags are not yet shown on the card; the brief acknowledges
 * this and asks for the *structure* to be ready for stronger case
 * studies later. WorkCard's data shape already carries those fields
 * (project.sector, project.scopeTags), so surfacing them on the card
 * is a future visual pass, not a data change.
 */
function FeaturedWorkSection({
  featured,
}: {
  featured: ReturnType<typeof getFeaturedProjects>;
}) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 sm:px-10 md:py-32">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-ember text-glow-ember">
              Selected work
            </p>
            <h2 className="mt-6 max-w-4xl font-display text-4xl font-black uppercase leading-[0.95] tracking-[-0.01em] text-ash sm:text-5xl md:text-6xl">
              Recent projects,
              <span className="block font-serif text-3xl font-normal italic tracking-normal text-ember sm:text-4xl md:text-5xl">
                coordinated end to end.
              </span>
            </h2>
          </div>
          <Link
            href="/work"
            className="font-mono text-xs uppercase tracking-[0.22em] text-smoke transition-colors hover:text-ash"
          >
            All work →
          </Link>
        </div>
      </Reveal>

      <div className="mt-16 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((project, i) => (
          <Reveal key={project.slug} delay={(i % 4) * 80}>
            <WorkCard project={project} priority={i === 0} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ─── 6. Why Lava Design ─────────────────────────────────────────────────────

const WHY_LAVA = [
  {
    title: "A partner, not a competitor",
    body: "We support architects, agencies and project teams with the technical depth needed to move ideas toward coordinated delivery.",
  },
  {
    title: "Creative thinking, engineered properly",
    body: "Our work connects design intent with practical systems, documentation and production realities.",
  },
  {
    title: "Coordinated across disciplines",
    body: "Structural, mechanical, electrical, plumbing, civil and design-support inputs can work together through one coordinated process.",
  },
  {
    title: "Regional insight, international delivery",
    body: "With experience across the USA, UAE and GCC, Lava Design understands how to support projects across different markets and expectations.",
  },
];

function WhyLavaSection() {
  return (
    <section className="relative border-y border-border bg-basalt">
      <EmberHairline />
      <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 md:py-32">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-ember text-glow-ember">
            Why Lava Design
          </p>
          <h2 className="mt-6 max-w-4xl font-display text-4xl font-black uppercase leading-[0.95] tracking-[-0.01em] text-ash sm:text-5xl md:text-6xl">
            What teams get
            <span className="block font-serif text-3xl font-normal italic tracking-normal text-ember sm:text-4xl md:text-5xl">
              by working with us.
            </span>
          </h2>
        </Reveal>

        <ol className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-2 lg:gap-12">
          {WHY_LAVA.map((r, i) => (
            <li key={r.title}>
              <Reveal
                delay={(i % 2) * 100}
                className="flex flex-col gap-4 border-t border-border pt-6"
              >
                <span className="font-mono text-xs tabular-nums text-ember">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-2xl font-black uppercase tracking-[-0.01em] text-ash">
                  {r.title}
                </h3>
                <p className="font-serif text-base leading-relaxed text-smoke">
                  {r.body}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

// ─── 7. Final CTA ───────────────────────────────────────────────────────────

function FinalCtaSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-32 sm:px-10">
      <Reveal>
        <div className="flex flex-col items-start gap-8 rounded-md border border-border bg-basalt p-10 md:flex-row md:items-center md:justify-between md:p-16">
          <div>
            <h2 className="max-w-2xl font-display text-3xl font-black uppercase leading-tight tracking-[-0.01em] text-ash sm:text-5xl">
              Have drawings, a concept
              <span className="block font-serif text-2xl font-normal italic tracking-normal text-ember sm:text-4xl">
                or a project challenge?
              </span>
            </h2>
            <p className="mt-4 max-w-2xl font-serif text-base text-smoke">
              Share your scope with Lava Design and let&rsquo;s
              identify the technical support, documentation or
              design-development input your project needs.
            </p>
          </div>
          <Link
            href="/contact"
            className="rounded-full bg-lava px-8 py-4 font-mono text-xs uppercase tracking-[0.22em] text-obsidian transition-colors hover:bg-ember"
          >
            Start a project review
          </Link>
        </div>
      </Reveal>
    </section>
  );
}

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Ember-tinted hairline at the top of a tonal band — matches other pages. */
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
