import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { ServiceCard } from "@/components/service-card";
import {
  getCategoryMeta,
  getServicesByCategory,
} from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Engineering and architecture services — alongside the brand, web, and packaging design that surrounds them. Two studios, one team.",
};

export default function ServicesPage() {
  const engineering = getServicesByCategory("engineering");
  const design = getServicesByCategory("design");

  return (
    <>
      <HeroBand />
      <EngineeringGroup services={engineering} />
      <DesignServicesGroup services={design} />
      <ClosingCta />
    </>
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
