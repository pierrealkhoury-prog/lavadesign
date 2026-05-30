import Link from "next/link";
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
    title: "Architectural Design",
    body: "Creativity and functionality combined, from new builds to renovation. Conceptual planning, structural coordination, building-permit assistance.",
    gradient:
      "linear-gradient(135deg, #ff4d1c 0%, #7a1a0a 55%, #14100e 100%)",
  },
  {
    title: "Structural Engineering",
    body: "Building, foundation, CMU and wood-frame design, steel structure design and seismic analysis.",
    gradient:
      "linear-gradient(135deg, #8c7f78 0%, #2a221f 50%, #14100e 100%)",
  },
  {
    title: "Mechanical & Plumbing",
    body: "Heat-load calculations, HVAC, refrigeration, plumbing and water-supply systems, energy compliance, control systems.",
    gradient:
      "linear-gradient(135deg, #f5b04b 0%, #ff4d1c 50%, #7a1a0a 100%)",
  },
  {
    title: "Electrical Engineering",
    body: "Power distribution, interior/exterior lighting design, photometric study, energy-code compliance, low-current systems.",
    gradient:
      "linear-gradient(135deg, #f5b04b 0%, #8c7f78 50%, #1c1715 100%)",
  },
  {
    title: "Civil Engineering",
    body: "Site development, grading, drainage, paving, utilities, erosion control (SWPPP).",
    gradient:
      "linear-gradient(135deg, #ff4d1c 0%, #1c1715 100%)",
  },
  {
    title: "Interior Design & Renovation",
    body: "Space planning, material selection, lighting design, custom millwork, energy-efficient remodels.",
    gradient:
      "linear-gradient(135deg, #f4ede5 0%, #8c7f78 40%, #14100e 100%)",
  },
];

const DESIGN_SERVICES = [
  {
    title: "Web Design & Development",
    body: "Distinct, high-performing digital identities that attract customers, provoke engagement, and inspire growth.",
  },
  {
    title: "Branding & Identity",
    body: "Work with our brand consultants and designers to custom-design a new identity or refresh an existing one.",
  },
  {
    title: "Artwork & Packaging",
    body: "Production-ready artwork and packaging design that makes products shelf-ready and on-brand.",
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
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-80"
        style={{
          background:
            "radial-gradient(60% 50% at 20% 10%, rgba(255,77,28,0.28), transparent 70%), radial-gradient(40% 40% at 85% 90%, rgba(245,176,75,0.18), transparent 70%)",
        }}
      />
      <Reveal>
        <div className="mx-auto flex max-w-7xl flex-col gap-14 px-6 py-32 sm:px-10 md:py-40">
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-ember">
            Multidisciplinary engineering &amp; design — Houston · Orlando
          </p>
          <h1 className="max-w-5xl font-display text-5xl font-black uppercase leading-[0.95] tracking-[-0.01em] text-ash sm:text-7xl md:text-8xl">
            We design across every
            <span className="block font-serif text-4xl font-normal italic tracking-normal text-ember sm:text-5xl md:text-6xl">
              <span className="text-lava">dimension</span>.
            </span>
          </h1>
          <p className="max-w-3xl font-serif text-xl leading-relaxed text-smoke md:text-2xl">
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
              href="#services"
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
    <section className="border-y border-border bg-basalt">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 md:py-32">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-ember">
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
          <dl className="mt-20 grid grid-cols-2 gap-y-10 border-t border-border pt-10 md:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-2">
                <dt className="font-display text-5xl font-black tracking-[-0.02em] text-ash sm:text-6xl">
                  {stat.value}
                </dt>
                <dd className="font-mono text-[11px] uppercase tracking-[0.22em] text-smoke">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
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
            The core of the practice. Permit-ready documents across every
            building system, coordinated under one roof — so what gets drawn
            is what gets built.
          </p>
        </div>
      </Reveal>

      <div className="mt-20 grid grid-cols-1 gap-x-10 gap-y-20 md:grid-cols-2">
        {ENGINEERING.map((cap, i) => (
          <Reveal key={cap.title} delay={(i % 2) * 80} className="flex flex-col gap-6">
            <ImageSlot
              gradient={cap.gradient}
              aspect="aspect-[4/3]"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-xs tabular-nums text-ember">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-2xl font-black uppercase tracking-[-0.01em] text-ash sm:text-3xl">
                {cap.title}
              </h3>
            </div>
            <p className="font-serif text-lg leading-relaxed text-smoke">
              {cap.body}
            </p>
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
    <section className="border-y border-border bg-basalt">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 md:py-32">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.32em] text-ember">
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

        <Reveal delay={120}>
          <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => (
              <WorkCard key={p.slug} project={p} priority />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function DesignServicesSection() {
  return (
    <section className="relative bg-obsidian">
      {/* Subtle top ember rule to mark a discipline shift */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(245,176,75,0.5), transparent)",
        }}
      />
      <div className="mx-auto max-w-7xl px-6 py-32 sm:px-10 md:py-40">
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
              A distinct practice for the brand, web, and packaging work
              that surrounds the buildings. Built on the same material
              discipline as the engineering side.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-3">
          {DESIGN_SERVICES.map((svc, i) => (
            <Reveal
              key={svc.title}
              delay={i * 80}
              className="flex h-full flex-col gap-6 bg-basalt p-10 transition-colors hover:bg-charcoal"
            >
              <span className="font-mono text-xs tabular-nums text-ember">
                0{i + 1}
              </span>
              <h3 className="font-display text-2xl font-black uppercase tracking-[-0.01em] text-ash">
                {svc.title}
              </h3>
              <p className="font-serif text-base leading-relaxed text-smoke">
                {svc.body}
              </p>
              <Link
                href="/contact"
                className="mt-auto inline-flex items-center font-mono text-[11px] uppercase tracking-[0.22em] text-ash transition-colors hover:text-ember"
              >
                Start a project →
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function PrinciplesSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-32 sm:px-10 md:py-40">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.32em] text-ember">
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
    </section>
  );
}

function StudiosSection() {
  return (
    <section className="border-y border-border bg-basalt">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 md:py-32">
        <Reveal>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="font-mono text-xs uppercase tracking-[0.32em] text-ember">
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
