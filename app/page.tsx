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
            <Link
              href="/work"
              className="rounded-full bg-lava px-8 py-4 font-mono text-xs uppercase tracking-[0.22em] text-obsidian transition-colors hover:bg-ember"
            >
              Explore our work
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-border px-8 py-4 font-mono text-xs uppercase tracking-[0.22em] text-ash transition-colors hover:border-ash"
            >
              Discuss a project
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

// ─── 2. Impact (stat cards) ─────────────────────────────────────────────────

/**
 * Each stat is a card — NOT an animated counter. Structure prepared so a
 * later pass can attach a visual metaphor in the icon slot per the brief:
 *   projects     → stacked drawing sheets / project cards
 *   disciplines  → layered building systems
 *   studios      → connected location points
 *   years        → timeline / milestone line
 *   regions      → glowing connection map
 * The icon slot is rendered as a faint ember-tinted square for now.
 */
type ImpactStat = {
  value: string;
  label: string;
  description: string;
  /** Last stat ("Multi-region clients") isn't a number — display smaller. */
  qualitative?: boolean;
};

const IMPACT_STATS: ImpactStat[] = [
  {
    value: "120+",
    label: "Projects",
    description:
      "Shaped, documented or delivered across the built environment.",
  },
  {
    value: "4+",
    label: "Core engineering disciplines",
    description:
      "Structural, mechanical, electrical, civil — coordinated in-house.",
  },
  {
    value: "2",
    label: "US studios",
    description:
      "Houston and Orlando, with shared delivery across both.",
  },
  {
    value: "15+",
    label: "Years of cross-disciplinary experience",
    description:
      "Senior leadership with a track record across markets.",
  },
  {
    value: "USA · UAE · GCC",
    label: "Multi-region clients",
    description:
      "Project teams across markets, with regional insight on both sides.",
    qualitative: true,
  },
];

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
            clarity to projects across markets.
          </p>
        </Reveal>

        <ul className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {IMPACT_STATS.map((stat, i) => (
            <li key={stat.label}>
              <Reveal delay={(i % 3) * 80}>
                <article className="flex h-full flex-col gap-5 rounded-md border border-border bg-obsidian/40 p-7 transition-colors duration-300 hover:border-ember/40">
                  {/* Icon slot — placeholder for the future visual metaphor */}
                  <div
                    aria-hidden
                    className="h-10 w-10 rounded border border-border"
                    style={{
                      background:
                        "radial-gradient(circle at 30% 30%, rgba(245,176,75,0.15), transparent 65%)",
                    }}
                  />
                  <p
                    className={
                      stat.qualitative
                        ? "font-display text-2xl font-black tracking-[-0.01em] text-ash sm:text-3xl"
                        : "font-display text-5xl font-black tabular-nums tracking-[-0.01em] text-ash"
                    }
                  >
                    {stat.value}
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ember">
                    {stat.label}
                  </p>
                  <p className="font-serif text-sm leading-relaxed text-smoke">
                    {stat.description}
                  </p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
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
