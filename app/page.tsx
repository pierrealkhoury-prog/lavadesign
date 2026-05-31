import Link from "next/link";
import { AnimatedStat } from "@/components/animated-stat";
import { ImageSlot } from "@/components/image-slot";
import { Reveal } from "@/components/reveal";
import { WorkCard } from "@/components/work-card";
import { getFeaturedProjects } from "@/lib/projects";

// ─── Content (real copy from the spec — keep here so the layout reads top-down) ──

const STATS = [
  { value: "120+", label: "Projects" },
  { value: "4", label: "Engineering Disciplines" },
  { value: "2", label: "US Studios" },
  { value: "15+", label: "Years" },
];

const ENGINEERING = [
  {
    slug: "architectural-design",
    title: "Architectural Design",
    body: "Creativity and functionality combined, from new builds to renovation. Conceptual planning, structural coordination, building-permit assistance.",
    gradient:
      "linear-gradient(135deg, #ff4d1c 0%, #7a1a0a 55%, #14100e 100%)",
  },
  {
    slug: "structural-engineering",
    title: "Structural Engineering",
    body: "Building, foundation, CMU and wood-frame design, steel structure design and seismic analysis.",
    gradient:
      "linear-gradient(135deg, #8c7f78 0%, #2a221f 50%, #14100e 100%)",
  },
  {
    slug: "mechanical-plumbing",
    title: "Mechanical & Plumbing",
    body: "Heat-load calculations, HVAC, refrigeration, plumbing and water-supply systems, energy compliance, control systems.",
    gradient:
      "linear-gradient(135deg, #f5b04b 0%, #ff4d1c 50%, #7a1a0a 100%)",
  },
  {
    slug: "electrical-engineering",
    title: "Electrical Engineering",
    body: "Power distribution, interior/exterior lighting design, photometric study, energy-code compliance, low-current systems.",
    gradient:
      "linear-gradient(135deg, #f5b04b 0%, #8c7f78 50%, #1c1715 100%)",
  },
  {
    slug: "civil-engineering",
    title: "Civil Engineering",
    body: "Site development, grading, drainage, paving, utilities, erosion control (SWPPP).",
    gradient:
      "linear-gradient(135deg, #ff4d1c 0%, #1c1715 100%)",
  },
  {
    slug: "interior-design",
    title: "Interior Design & Renovation",
    body: "Space planning, material selection, lighting design, custom millwork, energy-efficient remodels.",
    gradient:
      "linear-gradient(135deg, #f4ede5 0%, #8c7f78 40%, #14100e 100%)",
  },
];

const DESIGN_SERVICES = [
  {
    slug: "web-design",
    title: "Web Design & Development",
    body: "Distinct, high-performing digital identities that attract customers, provoke engagement, and inspire growth.",
  },
  {
    slug: "branding-identity",
    title: "Logos & Branding",
    body: "Custom-design a new identity, or refresh an existing one — into a consistent system that carries across every touchpoint.",
  },
  {
    slug: "artworking",
    title: "Artworking",
    body: "Specialized art-production support that extends the capacity of creative teams and agencies — hourly or on retainer.",
  },
  {
    slug: "marketing-materials",
    title: "Marketing Materials",
    body: "Flyers, brochures, menus, and collateral that build recognition — designed and produced for print.",
  },
];

const PRINCIPLES = [
  {
    title: "Innovation",
    body: "We work with the latest technologies and methodologies, end to end.",
  },
  {
    title: "Expertise",
    body: "A highly skilled, multi-disciplinary team that thinks across every system.",
  },
  {
    title: "Quality",
    body: "The highest standards held on every project, from sketch to sign-off.",
  },
  {
    title: "Client-Centric",
    body: "Tailored to each client — the brief leads, not a template.",
  },
];

const STUDIOS = [
  {
    city: "Houston, TX",
    address: "12500 Barker Cypress Rd #18205\nCypress, TX 77429",
  },
  {
    city: "Orlando, FL",
    address: "268 Foxtail Loop\nDavenport, FL 33837",
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Faint ember gradient hairline used to mark transitions between major
 * sections. Sits 1px tall at the top edge of the parent (which must be
 * position:relative). Pure decoration — pointer-events disabled, hidden
 * from assistive tech.
 */
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

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const featured = getFeaturedProjects();

  return (
    <>
      <HeroSection />
      <StudioIntroSection />
      <EngineeringSection />
      <FeaturedWorkSection featured={featured} />
      <DesignServicesSection />
      <PrinciplesSection />
      <StudiosSection />
      <ContactCtaSection />
    </>
  );
}

// ─── Sections ────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Background image — native <picture> for art direction between mobile
          (4:5 portrait crop) and desktop (16:9 wide). WebP primary, JPEG
          fallback. fetchPriority=high so it's the LCP candidate. */}
      <picture>
        <source
          media="(min-width: 768px)"
          type="image/webp"
          srcSet="/home/hero-desktop.webp"
        />
        <source
          media="(min-width: 768px)"
          type="image/jpeg"
          srcSet="/home/hero-desktop.jpg"
        />
        <source type="image/webp" srcSet="/home/hero-mobile.webp" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/home/hero-mobile.jpg"
          alt=""
          aria-hidden
          className="absolute inset-0 -z-20 h-full w-full object-cover"
          fetchPriority="high"
        />
      </picture>

      {/* Mobile scrim — strong at the top (headline), moderate at the bottom
          so the CTAs read clearly without hiding the wireframe glow. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 md:hidden"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,7,6,0.92) 0%, rgba(10,7,6,0.78) 50%, rgba(10,7,6,0.55) 100%)",
        }}
      />
      {/* Desktop scrim — darkens the left zone where the headline sits,
          lets the wireframe-half of the image show through on the right. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 hidden md:block"
        style={{
          background:
            "linear-gradient(to right, rgba(10,7,6,0.92) 0%, rgba(10,7,6,0.7) 35%, rgba(10,7,6,0.1) 72%, rgba(10,7,6,0) 100%)",
        }}
      />

      <Reveal>
        <div className="mx-auto flex max-w-7xl flex-col gap-14 px-6 py-32 sm:px-10 md:py-40">
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-ember text-glow-ember">
            Multidisciplinary engineering &amp; design — Houston · Orlando
          </p>
          <h1 className="max-w-5xl font-display text-5xl font-black uppercase leading-[0.95] tracking-[-0.01em] text-ash sm:text-7xl md:text-8xl">
            We design across every
            <span className="block font-serif text-4xl font-normal italic tracking-normal text-ember sm:text-5xl md:text-6xl">
              <span className="text-lava">dimension</span>.
            </span>
          </h1>
          <p className="max-w-xl font-serif text-xl leading-relaxed text-smoke md:text-2xl">
            From permit-ready engineering to brands, interiors, and live
            activations — Lava Design is a multidisciplinary studio that
            carries an idea from the first sketch to the lights coming on.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/work"
              className="rounded-full bg-lava px-8 py-4 font-mono text-xs uppercase tracking-[0.22em] text-obsidian transition-colors hover:bg-ember"
            >
              See the work
            </Link>
            <Link
              href="/services"
              className="rounded-full border border-border px-8 py-4 font-mono text-xs uppercase tracking-[0.22em] text-ash transition-colors hover:border-ash"
            >
              Our services
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function StudioIntroSection() {
  return (
    <section className="relative border-y border-border bg-basalt">
      <EmberHairline />
      <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 md:py-32">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-ember text-glow-ember">
            The studio
          </p>
          <blockquote className="mt-8 max-w-5xl">
            <p className="font-serif text-3xl leading-snug text-ash sm:text-4xl md:text-5xl">
              Lava Design is a multidisciplinary engineering and design
              studio. We deliver{" "}
              <span className="italic text-ember">comprehensive,
              permit-ready engineering</span>{" "}
              — structural, mechanical, electrical, and civil — alongside
              architecture, interiors, and the brand and environmental
              design that brings a space to life.
            </p>
            <footer className="mt-8 font-serif text-lg italic leading-relaxed text-smoke">
              Two studios, Houston and Orlando, one team that thinks across
              disciplines.
            </footer>
          </blockquote>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative mt-20">
            {/* Soft ember underglow behind the stat strip — restrained warmth. */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-x-8 -bottom-4 -top-4 -z-0"
              style={{
                background:
                  "radial-gradient(70% 90% at 50% 50%, rgba(245,176,75,0.10), transparent 75%)",
              }}
            />
            <dl className="relative grid grid-cols-2 gap-y-10 border-t border-border pt-10 md:grid-cols-4">
              {STATS.map((stat) => (
                <AnimatedStat
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                />
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function EngineeringSection() {
  return (
    <section
      id="services"
      className="mx-auto max-w-7xl scroll-mt-24 px-6 py-32 sm:px-10 md:py-40"
    >
      <Reveal>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-ember text-glow-ember">
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
            The core of the practice. Permit-ready documents across every
            building system, coordinated under one roof — so what gets drawn
            is what gets built.
          </p>
        </div>
      </Reveal>

      <div className="mt-20 grid grid-cols-1 gap-x-10 gap-y-20 md:grid-cols-2">
        {ENGINEERING.map((cap, i) => (
          <Reveal key={cap.slug} delay={(i % 2) * 80}>
            <Link
              href={`/services/${cap.slug}`}
              className="group block focus:outline-none"
            >
              <div className="flex flex-col gap-6">
                <ImageSlot
                  gradient={cap.gradient}
                  aspect="aspect-[4/3]"
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="transition-[border-color,box-shadow,transform] duration-300 group-hover:-translate-y-1 group-hover:border-ember/40 group-hover:shadow-[0_18px_42px_-12px_rgba(245,176,75,0.32)] group-focus-visible:ring-2 group-focus-visible:ring-lava"
                />
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-xs tabular-nums text-ember">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-2xl font-black uppercase tracking-[-0.01em] text-ash transition-colors group-hover:text-ember sm:text-3xl">
                    {cap.title}
                  </h3>
                </div>
                <p className="font-serif text-lg leading-relaxed text-smoke">
                  {cap.body}
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function FeaturedWorkSection({
  featured,
}: {
  featured: ReturnType<typeof getFeaturedProjects>;
}) {
  return (
    <section className="relative border-y border-border bg-basalt">
      <EmberHairline />
      <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 md:py-32">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.32em] text-ember text-glow-ember">
                Selected work
              </p>
              <h2 className="mt-4 font-display text-4xl font-black uppercase leading-[0.95] tracking-[-0.01em] text-ash sm:text-5xl">
                Recent projects.
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

        {/* Per-card stagger so the four featured projects ripple in rather
            than landing as one block. */}
        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={120 + i * 90}>
              <WorkCard project={p} priority />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function DesignServicesSection() {
  return (
    <section className="relative bg-obsidian">
      <EmberHairline />
      <div className="mx-auto max-w-7xl px-6 py-32 sm:px-10 md:py-40">
        <Reveal>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="font-mono text-xs uppercase tracking-[0.32em] text-ember text-glow-ember">
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
              A distinct practice for the brand, web, and packaging work
              that surrounds the buildings. Built on the same material
              discipline as the engineering side.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {DESIGN_SERVICES.map((svc, i) => (
            <Reveal key={svc.slug} delay={i * 80}>
              <Link
                href={`/services/${svc.slug}`}
                className="group flex h-full flex-col gap-6 bg-basalt p-10 transition-[background-color,box-shadow] duration-300 hover:bg-charcoal hover:shadow-[inset_0_0_64px_-12px_rgba(245,176,75,0.22)] focus:outline-none focus-visible:ring-2 focus-visible:ring-ember"
              >
                <span className="font-mono text-xs tabular-nums text-ember">
                  0{i + 1}
                </span>
                <h3 className="font-display text-2xl font-black uppercase tracking-[-0.01em] text-ash transition-colors group-hover:text-ember">
                  {svc.title}
                </h3>
                <p className="font-serif text-base leading-relaxed text-smoke">
                  {svc.body}
                </p>
                <span className="mt-auto inline-flex items-center font-mono text-[11px] uppercase tracking-[0.22em] text-ash transition-colors group-hover:text-ember">
                  Explore service →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function PrinciplesSection() {
  // Wrapped in a full-width band so the ember hairline + bg-basalt tonal lift
  // span the viewport instead of being trapped inside max-w-7xl.
  return (
    <section className="relative border-y border-border bg-basalt">
      <EmberHairline />
      <div className="mx-auto max-w-7xl px-6 py-32 sm:px-10 md:py-40">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-ember text-glow-ember">
            Why Lava Design
          </p>
          <h2 className="mt-6 max-w-4xl font-display text-4xl font-black uppercase leading-[0.95] tracking-[-0.01em] text-ash sm:text-5xl md:text-6xl">
            A studio built on four principles.
          </h2>
        </Reveal>

        <ol className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <li className="flex flex-col gap-4 border-t border-border pt-6">
                <span className="font-mono text-xs tabular-nums text-ember">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-2xl font-black uppercase tracking-[-0.01em] text-ash">
                  {p.title}
                </h3>
                <p className="font-serif text-base leading-relaxed text-smoke">
                  {p.body}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function StudiosSection() {
  return (
    <section className="relative border-y border-border bg-charcoal">
      <EmberHairline />
      <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 md:py-32">
        <Reveal>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="font-mono text-xs uppercase tracking-[0.32em] text-ember text-glow-ember">
                Studios
              </p>
              <h2 className="mt-6 font-display text-4xl font-black uppercase leading-[0.95] tracking-[-0.01em] text-ash sm:text-5xl md:text-6xl">
                Two studios,
                <span className="block font-serif text-3xl font-normal italic tracking-normal text-ember sm:text-4xl md:text-5xl">
                  one team.
                </span>
              </h2>
            </div>
            <div className="space-y-3 font-mono text-[11px] uppercase tracking-[0.22em] text-smoke md:col-span-6 md:col-start-7">
              <p>Mon–Sat · 9–5</p>
              <p>
                <a
                  href="mailto:info@lavadesign.us"
                  className="text-ash transition-colors hover:text-ember"
                >
                  info@lavadesign.us
                </a>
              </p>
              <p>
                <a
                  href="tel:+13212701208"
                  className="text-ash transition-colors hover:text-ember"
                >
                  +1 321 270 1208
                </a>
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-2">
          {STUDIOS.map((studio, i) => (
            <Reveal
              key={studio.city}
              delay={i * 100}
              className="flex h-full flex-col gap-8 bg-basalt p-10 sm:p-14"
            >
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-ember">
                Studio · 0{i + 1}
              </p>
              <h3 className="font-display text-3xl font-black uppercase tracking-[-0.01em] text-ash sm:text-4xl">
                {studio.city}
              </h3>
              <address className="whitespace-pre-line font-serif text-lg not-italic leading-relaxed text-smoke">
                {studio.address}
              </address>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactCtaSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-32 sm:px-10">
      <Reveal>
        <div className="flex flex-col items-start gap-8 rounded-md border border-border bg-basalt p-10 md:flex-row md:items-center md:justify-between md:p-16">
          <div>
            <h2 className="max-w-2xl font-display text-3xl font-black uppercase leading-tight tracking-[-0.01em] text-ash sm:text-5xl">
              Let&rsquo;s build something
              <span className="block font-serif text-2xl font-normal italic tracking-normal text-ember sm:text-4xl">
                worth seeing.
              </span>
            </h2>
            <p className="mt-4 max-w-xl font-serif text-base text-smoke">
              We reply to every serious enquiry within two working days.
            </p>
          </div>
          <Link
            href="/contact"
            className="rounded-full bg-lava px-8 py-4 font-mono text-xs uppercase tracking-[0.22em] text-obsidian transition-colors hover:bg-ember"
          >
            Start a conversation
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
