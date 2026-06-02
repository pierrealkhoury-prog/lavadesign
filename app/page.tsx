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
      {/* Media container — mobile: in-flow 3:2 banner (taller than 16:9
          so the wireframe-render has more presence above the fold).
          Desktop: absolute fill behind the headline overlay. */}
      <div className="relative aspect-[3/2] w-full overflow-hidden md:absolute md:inset-0 md:-z-20 md:aspect-auto md:h-full">
        <picture>
          <source type="image/webp" srcSet="/home/hero-desktop.webp" />
          <source type="image/jpeg" srcSet="/home/hero-desktop.jpg" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/home/hero-desktop.jpg"
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover motion-safe:scale-110 md:motion-safe:scale-100"
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
          className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden motion-safe:scale-110 md:motion-safe:scale-100"
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
        {/* Cinematic desktop spacing restored: generous pt + pb on md+ so
            the hero breathes against the wireframe-render. Mobile stays
            tight. Extra mt-10 on the CTA cluster pushes the buttons
            slightly lower from the body copy per brief. */}
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 pb-16 pt-10 sm:px-10 md:gap-10 md:pb-40 md:pt-28">
          <p className="min-w-0 font-mono text-xs uppercase tracking-[0.32em] text-ember text-glow-ember">
            Engineering-led technical design partner
          </p>
          <h1 className="min-w-0 max-w-5xl font-display text-5xl font-black uppercase leading-[0.95] tracking-[-0.01em] text-ash sm:text-7xl md:text-8xl">
            Engineering the technical backbone
            <span className="mt-2 block font-serif text-4xl font-normal italic tracking-normal text-ember sm:text-5xl md:text-6xl">
              behind ambitious spaces.
            </span>
          </h1>
          {/* Lighter body copy — ash at 75% reads brighter than smoke. */}
          <p className="min-w-0 max-w-3xl font-serif text-lg leading-relaxed text-ash/75 sm:text-xl md:text-2xl">
            Lava Design supports architects, agencies, developers and
            project teams with coordinated engineering, documentation
            and design-development support across the built
            environment.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 md:mt-10">
            {/* Primary: filled lava, WHITE text. Secondary: ash/40 stroke. */}
            <Link
              href="/contact"
              className="rounded-full bg-lava px-8 py-4 font-mono text-xs font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:bg-ember hover:text-obsidian"
            >
              Discuss a project
            </Link>
            <Link
              href="/work"
              className="rounded-full border border-ash/40 px-8 py-4 font-mono text-xs uppercase tracking-[0.22em] text-ash transition-colors hover:border-ash hover:bg-ash/5"
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
          {/* Top row: two equal-width featured cards (6/6 on lg). */}
          <Reveal className="lg:col-span-6">
            <ProjectsCard />
          </Reveal>
          <Reveal delay={80} className="lg:col-span-6">
            <MultiRegionCard />
          </Reveal>
          {/* Bottom row: three equal-width supporting cards (4/4/4 on lg). */}
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
 *  child SVGs respond to card hover via group-hover utilities.
 *  - bg-charcoal/60 — slightly lighter than the basalt section background
 *    so cards visibly raise off the page.
 *  - border-ash/15 — subtle warm-light edge that reads as a hairline on
 *    the dark background without feeling heavy.
 *  - Hover keeps the existing ember tint + glow + 2px lift. */
const IMPACT_CARD =
  "group flex h-full flex-col gap-5 rounded-md border border-ash/15 bg-charcoal/60 p-7 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-ember/50 hover:shadow-[0_18px_42px_-16px_rgba(245,176,75,0.32)]";

/** Compact variant for the three supporting cards. Tighter padding +
 *  gap + smaller number text on mobile so the vertical rhythm doesn't
 *  drag. Reverts to the full IMPACT_CARD spacing from sm+ — desktop
 *  stays unchanged. */
const IMPACT_CARD_COMPACT =
  "group flex h-full flex-col gap-3 rounded-md border border-ash/15 bg-charcoal/60 p-5 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-ember/50 hover:shadow-[0_18px_42px_-16px_rgba(245,176,75,0.32)] sm:gap-5 sm:p-7";

// Card layout: integrated technical diagram fills a full-bleed banner at
// the top of every card, then the number/title/label/body sit below.
// The diagrams are large, intentional, and read as embedded engineering
// drawings rather than tiny corner icons.

function ProjectsCard() {
  return (
    <article className={IMPACT_CARD}>
      <DiagramBanner>
        <ProjectsDiagram />
      </DiagramBanner>
      <p className="font-display text-6xl font-black tabular-nums leading-none tracking-[-0.01em] text-ash sm:text-7xl">
        120+
      </p>
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ember">
        Projects
      </p>
      <p className="font-serif text-base leading-relaxed text-ash/75">
        Shaped, documented or delivered across the built environment —
        from single-site fit-outs to multi-discipline campus work.
      </p>
    </article>
  );
}

function DisciplinesCard() {
  return (
    <article className={IMPACT_CARD_COMPACT}>
      <DiagramBanner compact>
        <DisciplinesDiagram />
      </DiagramBanner>
      <p className="font-display text-4xl font-black tabular-nums leading-none tracking-[-0.01em] text-ash sm:text-5xl">
        4+
      </p>
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ember">
        Core engineering disciplines
      </p>
      <p className="font-serif text-sm leading-relaxed text-ash/75 sm:text-base">
        Structural, mechanical, electrical, civil — coordinated in-house.
      </p>
    </article>
  );
}

function StudiosCard() {
  return (
    <article className={IMPACT_CARD_COMPACT}>
      <DiagramBanner compact>
        <StudiosDiagram />
      </DiagramBanner>
      <p className="font-display text-4xl font-black tabular-nums leading-none tracking-[-0.01em] text-ash sm:text-5xl">
        2
      </p>
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ember">
        US studios
      </p>
      <p className="font-serif text-sm leading-relaxed text-ash/75 sm:text-base">
        Houston and Orlando, with shared delivery across both.
      </p>
    </article>
  );
}

function YearsCard() {
  return (
    <article className={IMPACT_CARD_COMPACT}>
      <DiagramBanner compact>
        <YearsDiagram />
      </DiagramBanner>
      <p className="font-display text-4xl font-black tabular-nums leading-none tracking-[-0.01em] text-ash sm:text-5xl">
        15+
      </p>
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ember">
        Years of cross-disciplinary experience
      </p>
      <p className="font-serif text-sm leading-relaxed text-ash/75 sm:text-base">
        Senior leadership with a track record across markets.
      </p>
    </article>
  );
}

function MultiRegionCard() {
  return (
    <article className={IMPACT_CARD}>
      <DiagramBanner>
        <RegionsDiagram />
      </DiagramBanner>
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
        <h3 className="font-display text-3xl font-black uppercase leading-tight tracking-[-0.01em] text-ash sm:text-4xl">
          Multi-region reach
        </h3>
        <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-ember">
          USA · UAE · GCC
        </span>
      </div>
      <p className="font-serif text-base leading-relaxed text-ash/75">
        Projects, clients and collaborators across key markets, with
        regional insight and cross-border delivery support.
      </p>
    </article>
  );
}

/**
 * Full-bleed banner at the top of an Impact card. Cancels the card's
 * own padding via negative margins so the diagram sits edge-to-edge
 * inside the card frame, then re-establishes a faint top-radius and a
 * hairline divider underneath.
 *
 * - Featured cards (no `compact`): bg deeper, banner extends to p-7.
 * - Compact cards (supporting): banner extends to p-5 on mobile, p-7 sm+.
 *
 * The bg-obsidian/60 inside the banner gives the diagram a slightly
 * darker stage than the card body, so the technical lines pop without
 * needing high stroke contrast.
 */
function DiagramBanner({
  compact,
  children,
}: {
  compact?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={[
        "relative overflow-hidden rounded-t-[5px] border-b border-ash/10 bg-obsidian/60",
        // aspect 2:1 matches the 240x120 SVG viewBox so the diagrams
        // never stretch awkwardly.
        "aspect-[2/1]",
        compact
          ? "-mx-5 -mt-5 sm:-mx-7 sm:-mt-7"
          : "-mx-7 -mt-7",
      ].join(" ")}
    >
      {children}
    </div>
  );
}

// ─── Impact technical diagrams ──────────────────────────────────────────────
//
// Each diagram lives in a 240×120 viewBox (2:1, matches the banner).
// Common visual rules:
//   - Faint coordinate grid in the background (ash @ 6% opacity)
//   - Thin technical-drawing strokes
//   - Molten orange (lava) for primary highlight elements
//   - Soft ash strokes for supporting structure
//   - Small uppercase mono labels at low opacity
// Hover lifts each diagram via group-hover utilities — no constant
// animation except the Multi-region card's slow dash flow.

/** Shared SVG defs — faint grid pattern reused across all 5 diagrams. */
function DiagramGrid({ id }: { id: string }) {
  return (
    <defs>
      <pattern id={id} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <path
          d="M 20 0 L 0 0 0 20"
          fill="none"
          stroke="rgba(244,237,229,0.06)"
          strokeWidth="0.5"
        />
      </pattern>
    </defs>
  );
}

function ProjectsDiagram() {
  // Five offset technical drawing sheets stacked from back to front.
  // Each sheet shows faint plan-style line marks; the front sheet has
  // a tiny title block ("A-101") and a molten orange edge that glows
  // on hover. Sheets shift apart subtly on hover.
  return (
    <svg
      aria-hidden
      viewBox="0 0 240 120"
      preserveAspectRatio="xMidYMid meet"
      className="block h-full w-full"
      fill="none"
    >
      <DiagramGrid id="proj-grid" />
      <rect width="240" height="120" fill="url(#proj-grid)" />

      {/* Far back sheet */}
      <g className="opacity-50 transition-transform duration-500 group-hover:-translate-x-1 group-hover:-translate-y-1">
        <rect x="32" y="20" width="120" height="80" rx="1" stroke="rgba(244,237,229,0.20)" />
      </g>
      {/* Mid-back sheet */}
      <g className="opacity-65 transition-transform duration-500 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5">
        <rect x="44" y="26" width="120" height="80" rx="1" stroke="rgba(244,237,229,0.28)" />
      </g>
      {/* Mid sheet */}
      <g className="opacity-80 transition-transform duration-500">
        <rect x="56" y="32" width="120" height="80" rx="1" stroke="rgba(244,237,229,0.40)" />
      </g>
      {/* Mid-front sheet */}
      <g className="opacity-90 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:translate-y-0.5">
        <rect x="68" y="38" width="120" height="80" rx="1" stroke="rgba(244,237,229,0.55)" />
      </g>
      {/* Front "live" sheet with the plan, title block, lava edge */}
      <g className="transition-transform duration-500 group-hover:translate-x-1 group-hover:translate-y-1">
        <rect
          x="80"
          y="44"
          width="120"
          height="80"
          rx="1"
          fill="rgba(10,7,6,0.65)"
          stroke="rgba(255,81,0,0.85)"
          strokeWidth="0.9"
        />
        {/* Inner drawing area lines — plan marks */}
        <line x1="92" y1="58" x2="184" y2="58" stroke="rgba(244,237,229,0.55)" strokeWidth="0.5" />
        <line x1="92" y1="68" x2="160" y2="68" stroke="rgba(244,237,229,0.35)" strokeWidth="0.5" />
        <line x1="92" y1="78" x2="172" y2="78" stroke="rgba(244,237,229,0.35)" strokeWidth="0.5" />
        <line x1="92" y1="88" x2="148" y2="88" stroke="rgba(244,237,229,0.35)" strokeWidth="0.5" />
        <line x1="92" y1="98" x2="138" y2="98" stroke="rgba(244,237,229,0.3)" strokeWidth="0.5" />
        {/* Annotation tick */}
        <line x1="178" y1="58" x2="178" y2="98" stroke="rgba(244,237,229,0.25)" strokeWidth="0.4" />
        <line x1="175" y1="58" x2="181" y2="58" stroke="rgba(244,237,229,0.4)" strokeWidth="0.5" />
        <line x1="175" y1="98" x2="181" y2="98" stroke="rgba(244,237,229,0.4)" strokeWidth="0.5" />
        {/* Title block — bottom-right */}
        <rect
          x="165"
          y="107"
          width="34"
          height="14"
          stroke="rgba(255,81,0,0.7)"
          strokeWidth="0.6"
        />
        <text
          x="182"
          y="116.5"
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize="6"
          fill="rgba(244,237,229,0.7)"
          letterSpacing="0.8"
        >
          A-101
        </text>
        {/* Lava edge accent on the right edge — brightens on hover */}
        <line
          x1="200"
          y1="44"
          x2="200"
          y2="124"
          stroke="rgba(255,81,0,1)"
          strokeWidth="1.2"
          opacity="0.7"
          className="transition-opacity duration-300 group-hover:opacity-100"
        />
      </g>

      {/* Subtle mono label, top-left */}
      <text
        x="12"
        y="14"
        fontFamily="var(--font-mono)"
        fontSize="6"
        fill="rgba(244,237,229,0.35)"
        letterSpacing="1.5"
      >
        SHEET LOG
      </text>
    </svg>
  );
}

function RegionsDiagram() {
  // Three nodes (USA / UAE apex / GCC) on a faint latitude grid,
  // connected by molten orange arcs that flow slowly (the one
  // constant motion in the section — calm and premium).
  return (
    <svg
      aria-hidden
      viewBox="0 0 240 120"
      preserveAspectRatio="xMidYMid meet"
      className="block h-full w-full"
      fill="none"
    >
      <DiagramGrid id="region-grid" />
      <rect width="240" height="120" fill="url(#region-grid)" />

      {/* Latitude-style horizontal lines, faint */}
      <line x1="0" y1="40" x2="240" y2="40" stroke="rgba(244,237,229,0.08)" strokeWidth="0.4" strokeDasharray="2 4" />
      <line x1="0" y1="70" x2="240" y2="70" stroke="rgba(244,237,229,0.10)" strokeWidth="0.4" strokeDasharray="2 4" />
      <line x1="0" y1="100" x2="240" y2="100" stroke="rgba(244,237,229,0.08)" strokeWidth="0.4" strokeDasharray="2 4" />

      {/* Connection arcs — flowing dash (the one constant calm motion) */}
      <path
        d="M 40 75 Q 90 30 130 50"
        stroke="rgba(255,81,0,0.85)"
        strokeWidth="1.1"
        fill="none"
        strokeDasharray="6 4"
        className="impact-anim-flow"
      />
      <path
        d="M 130 50 Q 175 70 205 80"
        stroke="rgba(255,81,0,0.85)"
        strokeWidth="1.1"
        fill="none"
        strokeDasharray="6 4"
        className="impact-anim-flow"
      />
      {/* Static return connection — very faint */}
      <line
        x1="40"
        y1="75"
        x2="205"
        y2="80"
        stroke="rgba(244,237,229,0.18)"
        strokeWidth="0.5"
        strokeDasharray="2 4"
      />

      {/* USA — left */}
      <RegionNode cx={40} cy={75} label="USA" />
      {/* UAE — apex, slightly brighter */}
      <RegionNode cx={130} cy={50} label="UAE" bright />
      {/* GCC — right */}
      <RegionNode cx={205} cy={80} label="GCC" />
    </svg>
  );
}

function RegionNode({
  cx,
  cy,
  label,
  bright,
}: {
  cx: number;
  cy: number;
  label: string;
  bright?: boolean;
}) {
  const coreOpacity = bright ? 1 : 0.9;
  const haloOpacity = bright ? 0.2 : 0.12;
  return (
    <g className="transition-opacity duration-300">
      <circle cx={cx} cy={cy} r="14" fill={`rgba(255,81,0,${haloOpacity})`} />
      <circle
        cx={cx}
        cy={cy}
        r="8"
        fill="none"
        stroke="rgba(255,81,0,0.55)"
        strokeWidth="0.6"
        className="transition-all duration-300 group-hover:[r:10]"
      />
      <circle
        cx={cx}
        cy={cy}
        r="3.5"
        fill={`rgba(255,81,0,${coreOpacity})`}
        className="transition-opacity duration-300 group-hover:opacity-100"
      />
      <text
        x={cx}
        y={cy + 22}
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="7"
        fill="rgba(244,237,229,0.6)"
        letterSpacing="1.4"
      >
        {label}
      </text>
    </g>
  );
}

function DisciplinesDiagram() {
  // Four horizontal building-system layers, each with a distinct line
  // character (solid + grid for struct, segmented for mech, node-dotted
  // for elec, dashed + ground hatch for civil). Hover brightens each
  // layer in turn via staggered transition delays.
  return (
    <svg
      aria-hidden
      viewBox="0 0 240 120"
      preserveAspectRatio="xMidYMid meet"
      className="block h-full w-full"
      fill="none"
    >
      <DiagramGrid id="disc-grid" />
      <rect width="240" height="120" fill="url(#disc-grid)" />

      {/* Discipline labels — left column */}
      <g fontFamily="var(--font-mono)" fontSize="6" fill="rgba(244,237,229,0.5)" letterSpacing="1.3">
        <text x="12" y="22">STRUCT</text>
        <text x="12" y="50">MECH</text>
        <text x="12" y="78">ELEC</text>
        <text x="12" y="106">CIVIL</text>
      </g>

      {/* STRUCT — solid baseline + small vertical beam ticks */}
      <g className="opacity-70 transition-opacity duration-300 group-hover:opacity-100 [transition-delay:0ms]">
        <line x1="58" y1="20" x2="228" y2="20" stroke="rgba(244,237,229,0.6)" strokeWidth="0.9" />
        {[70, 90, 110, 130, 150, 170, 190, 210].map((x) => (
          <line key={x} x1={x} y1="16" x2={x} y2="24" stroke="rgba(244,237,229,0.5)" strokeWidth="0.5" />
        ))}
      </g>

      {/* MECH — segmented duct line */}
      <g className="opacity-70 transition-opacity duration-300 group-hover:opacity-100 [transition-delay:80ms]">
        <rect x="58" y="46" width="22" height="6" stroke="rgba(244,237,229,0.55)" strokeWidth="0.7" />
        <line x1="80" y1="49" x2="98" y2="49" stroke="rgba(244,237,229,0.4)" strokeWidth="0.6" />
        <rect x="98" y="46" width="22" height="6" stroke="rgba(244,237,229,0.55)" strokeWidth="0.7" />
        <line x1="120" y1="49" x2="138" y2="49" stroke="rgba(244,237,229,0.4)" strokeWidth="0.6" />
        <rect x="138" y="46" width="22" height="6" stroke="rgba(244,237,229,0.55)" strokeWidth="0.7" />
        <line x1="160" y1="49" x2="178" y2="49" stroke="rgba(244,237,229,0.4)" strokeWidth="0.6" />
        <rect x="178" y="46" width="22" height="6" stroke="rgba(244,237,229,0.55)" strokeWidth="0.7" />
        <line x1="200" y1="49" x2="228" y2="49" stroke="rgba(244,237,229,0.4)" strokeWidth="0.6" />
      </g>

      {/* ELEC — thin line with circuit nodes */}
      <g className="opacity-70 transition-opacity duration-300 group-hover:opacity-100 [transition-delay:160ms]">
        <line x1="58" y1="76" x2="228" y2="76" stroke="rgba(244,237,229,0.55)" strokeWidth="0.6" />
        {[70, 100, 130, 160, 190, 220].map((x) => (
          <circle key={x} cx={x} cy="76" r="2.2" fill="rgba(255,81,0,0.85)" />
        ))}
      </g>

      {/* CIVIL — dashed grade line + small ground hatches below */}
      <g className="opacity-70 transition-opacity duration-300 group-hover:opacity-100 [transition-delay:240ms]">
        <line
          x1="58"
          y1="104"
          x2="228"
          y2="104"
          stroke="rgba(244,237,229,0.55)"
          strokeWidth="0.7"
          strokeDasharray="3 3"
        />
        {[64, 84, 104, 124, 144, 164, 184, 204, 224].map((x) => (
          <line
            key={x}
            x1={x}
            y1="106"
            x2={x - 4}
            y2="112"
            stroke="rgba(244,237,229,0.35)"
            strokeWidth="0.5"
          />
        ))}
      </g>
    </svg>
  );
}

function StudiosDiagram() {
  // Two studio nodes (HOUSTON, ORLANDO) on a faint coordinate grid,
  // connected by a precise technical line with tick marks. Halos
  // expand on hover.
  return (
    <svg
      aria-hidden
      viewBox="0 0 240 120"
      preserveAspectRatio="xMidYMid meet"
      className="block h-full w-full"
      fill="none"
    >
      <DiagramGrid id="studio-grid" />
      <rect width="240" height="120" fill="url(#studio-grid)" />

      {/* Faint cross-hair guide lines through the center */}
      <line x1="0" y1="60" x2="240" y2="60" stroke="rgba(244,237,229,0.08)" strokeWidth="0.4" />
      <line x1="120" y1="0" x2="120" y2="120" stroke="rgba(244,237,229,0.08)" strokeWidth="0.4" />

      {/* Connection between nodes */}
      <line
        x1="55"
        y1="60"
        x2="185"
        y2="60"
        stroke="rgba(255,81,0,0.75)"
        strokeWidth="0.9"
        className="transition-opacity duration-300 group-hover:opacity-100"
      />
      {/* Tick marks along the connection — small technical surveying marks */}
      {[75, 95, 115, 135, 155, 175].map((x) => (
        <line
          key={x}
          x1={x}
          y1="57"
          x2={x}
          y2="63"
          stroke="rgba(244,237,229,0.3)"
          strokeWidth="0.4"
        />
      ))}

      {/* Houston node — left */}
      <StudioNode cx={55} cy={60} label="HOUSTON" />
      {/* Orlando node — right */}
      <StudioNode cx={185} cy={60} label="ORLANDO" />
    </svg>
  );
}

function StudioNode({
  cx,
  cy,
  label,
}: {
  cx: number;
  cy: number;
  label: string;
}) {
  return (
    <g>
      <circle cx={cx} cy={cy} r="12" fill="rgba(255,81,0,0.12)" />
      <circle
        cx={cx}
        cy={cy}
        r="7"
        fill="none"
        stroke="rgba(255,81,0,0.6)"
        strokeWidth="0.7"
        className="transition-all duration-300 group-hover:[r:9]"
      />
      <circle cx={cx} cy={cy} r="3" fill="rgba(255,81,0,1)" />
      <text
        x={cx}
        y={cy + 22}
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="6"
        fill="rgba(244,237,229,0.55)"
        letterSpacing="1.3"
      >
        {label}
      </text>
    </g>
  );
}

function YearsDiagram() {
  // Technical measuring ruler. Long horizontal baseline + many fine
  // ticks, three taller milestone ticks, current marker as a glowing
  // node at the end with tiny START / BUILD / NOW labels above.
  return (
    <svg
      aria-hidden
      viewBox="0 0 240 120"
      preserveAspectRatio="xMidYMid meet"
      className="block h-full w-full"
      fill="none"
    >
      <DiagramGrid id="years-grid" />
      <rect width="240" height="120" fill="url(#years-grid)" />

      {/* Milestone labels above the line */}
      <g fontFamily="var(--font-mono)" fontSize="6" fill="rgba(244,237,229,0.5)" letterSpacing="1.2" textAnchor="middle">
        <text x="22" y="46">START</text>
        <text x="120" y="46">BUILD</text>
        <text x="222" y="46">NOW</text>
      </g>

      {/* Baseline */}
      <line
        x1="18"
        y1="72"
        x2="226"
        y2="72"
        stroke="rgba(244,237,229,0.55)"
        strokeWidth="0.8"
      />

      {/* Many small year ticks */}
      {Array.from({ length: 21 }, (_, i) => 22 + i * 10).map((x) => (
        <line
          key={x}
          x1={x}
          y1="68"
          x2={x}
          y2="76"
          stroke="rgba(244,237,229,0.4)"
          strokeWidth="0.4"
          className="transition-opacity duration-300 group-hover:opacity-100"
        />
      ))}

      {/* Three taller milestone ticks */}
      <line x1="22" y1="52" x2="22" y2="76" stroke="rgba(244,237,229,0.85)" strokeWidth="0.9" />
      <line x1="120" y1="52" x2="120" y2="76" stroke="rgba(244,237,229,0.85)" strokeWidth="0.9" />
      <line x1="222" y1="52" x2="222" y2="76" stroke="rgba(255,81,0,1)" strokeWidth="1.2" />

      {/* Current marker — glowing node at the end */}
      <circle cx="222" cy="48" r="9" fill="rgba(255,81,0,0.18)" />
      <circle
        cx="222"
        cy="48"
        r="3.5"
        fill="rgba(255,81,0,1)"
        className="transition-all duration-300 group-hover:[r:4.5]"
      />

      {/* Subtle baseline annotation tick (below) */}
      <line x1="18" y1="86" x2="222" y2="86" stroke="rgba(244,237,229,0.18)" strokeWidth="0.4" strokeDasharray="2 3" />
      <text
        x="120"
        y="100"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="6"
        fill="rgba(244,237,229,0.4)"
        letterSpacing="1.5"
      >
        15+ YEARS
      </text>
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

      {/* Equal-width / equal-height cards matching the Impact section's
          contrast (charcoal raise on the obsidian band) and border. */}
      <ul className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-6">
        {PRACTICE.map((c, i) => (
          <li key={c.title}>
            <Reveal delay={i * 100}>
              <article className="flex h-full flex-col gap-5 rounded-md border border-ash/15 bg-charcoal/60 p-7 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-ember/50 hover:shadow-[0_18px_42px_-16px_rgba(245,176,75,0.32)]">
                <span
                  aria-hidden
                  className="font-mono text-xs tabular-nums text-ember"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-2xl font-black uppercase tracking-[-0.01em] text-ash">
                  {c.title}
                </h3>
                <p className="font-serif text-base leading-relaxed text-ash/75">
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

        {/* 2 columns from xs, 4 columns from lg+. Cards are equal-height
            via flex h-full. Border + bg match the Impact / Practice cards
            for consistent contrast across all snapshot blocks. */}
        <ul className="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
          {SERVICES_SNAPSHOT.map((svc, i) => (
            <li key={svc.title}>
              <Reveal delay={(i % 4) * 60}>
                <Link
                  href={svc.href}
                  className="group flex h-full flex-col justify-between gap-6 rounded-md border border-ash/15 bg-charcoal/60 p-5 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-ember/50 hover:shadow-[0_18px_42px_-16px_rgba(245,176,75,0.28)] sm:p-6"
                >
                  {/* Icon slot — short hairline that grows on hover. */}
                  <div
                    aria-hidden
                    className="h-px w-12 bg-ember/70 transition-[width,background-color] duration-300 group-hover:w-20 group-hover:bg-ember"
                  />
                  <h3 className="font-display text-base font-black uppercase leading-tight tracking-[-0.01em] text-ash sm:text-lg">
                    {svc.title}
                  </h3>
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ash/60 transition-colors group-hover:text-ember">
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

      {/* Mobile: horizontal CSS scroll-snap carousel — each card occupies
              ~88% of the viewport so the next card peeks at the edge,
              communicating swipeability without arrows or dots.
            Desktop (sm+): standard responsive grid, 2-up at sm, 4-up at lg.
          The negative -mx-6/-mx-10 + matching pl/pr on the carousel push
          the scroll surface to the screen edges so the peek of the next
          card lines up with the page padding. Reset at sm via mx-0. */}
      <div
        role="region"
        aria-label="Featured projects (swipe to browse)"
        className={[
          "mt-16 -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-6 pb-4 pl-6 pr-6 scrollbar-hide sm:scroll-px-0",
          "sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:overflow-visible sm:pb-0 sm:pl-0 sm:pr-0",
          "lg:grid-cols-4",
        ].join(" ")}
      >
        {featured.map((project, i) => (
          <div
            key={project.slug}
            // Flex mode: each card is 88% of viewport width with snap-start.
            // Grid mode (sm+): w-auto lets the grid layout decide.
            className="w-[88%] shrink-0 snap-start sm:w-auto sm:shrink"
          >
            <Reveal delay={(i % 4) * 80}>
              <WorkCard project={project} priority={i === 0} />
            </Reveal>
          </div>
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

        {/* Brighter top-of-card divider (ash/25 instead of border) so the
            four reasons read as clearly separated items, still subtle. */}
        <ol className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-2 lg:gap-12">
          {WHY_LAVA.map((r, i) => (
            <li key={r.title}>
              <Reveal
                delay={(i % 2) * 100}
                className="flex flex-col gap-4 border-t border-ash/25 pt-7"
              >
                <span className="font-mono text-xs tabular-nums text-ember">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-2xl font-black uppercase tracking-[-0.01em] text-ash">
                  {r.title}
                </h3>
                <p className="font-serif text-base leading-relaxed text-ash/75">
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
        <div className="flex flex-col items-start gap-8 rounded-md border border-ash/15 bg-charcoal/60 p-10 md:flex-row md:items-center md:justify-between md:p-16">
          <div>
            {/* &nbsp; keeps "a concept" together so the line never breaks
                with "a" stranded at the end. */}
            <h2 className="max-w-2xl font-display text-3xl font-black uppercase leading-tight tracking-[-0.01em] text-ash sm:text-5xl">
              Have drawings, a&nbsp;concept
              <span className="block font-serif text-2xl font-normal italic tracking-normal text-ember sm:text-4xl">
                or a project challenge?
              </span>
            </h2>
            <p className="mt-4 max-w-2xl font-serif text-base text-ash/75">
              Share your scope with Lava Design and let&rsquo;s
              identify the technical support, documentation or
              design-development input your project needs.
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 rounded-full bg-lava px-8 py-4 font-mono text-xs font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:bg-ember hover:text-obsidian"
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
