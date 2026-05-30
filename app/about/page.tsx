import type { Metadata } from "next";
import Link from "next/link";
import { DISCIPLINES } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "Lava is a Dubai-based multidisciplinary design studio working across 2D & 3D, interiors & architecture, events & activations, and engineering.",
};

const PRINCIPLES = [
  {
    title: "One studio, every discipline.",
    body: "We design end-to-end — from a wordmark to the building that carries it. Holding it all in-house is what keeps the work coherent.",
  },
  {
    title: "Material before motif.",
    body: "We start with what a project is physically made of — stone, ink, code, hot metal — and let the visual language fall out of that.",
  },
  {
    title: "Productized where it serves.",
    body: "For the work that suits it — websites, packaging, branding — we sell as fixed-scope packages so clients know what they're buying.",
  },
  {
    title: "Made in the region.",
    body: "We work with suppliers and craftspeople across the GCC. Most of what we ship is fabricated within an afternoon's drive.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-6 py-24 sm:px-10 md:py-32">
        <p className="font-mono text-xs uppercase tracking-[0.32em] text-ember">
          Studio
        </p>
        <h1 className="mt-6 max-w-4xl font-display text-5xl font-black uppercase leading-[0.95] tracking-[-0.01em] text-ash sm:text-7xl md:text-8xl">
          A small studio that
          <span className="block font-serif text-4xl font-normal italic tracking-normal text-ember sm:text-5xl md:text-6xl">
            ships at heat.
          </span>
        </h1>
        <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-12">
          <p className="font-serif text-2xl leading-snug text-ash md:col-span-7">
            Lava is a Dubai-based design studio working across four
            disciplines. We treat them as one practice — every project
            inherits the same material attention, whether it's a wordmark, a
            restaurant interior, an event activation or a piece of mechanical
            hardware.
          </p>
          <p className="font-serif text-lg leading-relaxed text-smoke md:col-span-5">
            Founded in 2020, the studio is led by a small senior team that
            takes every project from first conversation through delivery. We
            stay deliberately small so the people you meet are the people who
            do the work.
          </p>
        </div>
      </section>

      <section className="border-y border-border bg-basalt">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10">
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-ember">
            Disciplines
          </p>
          <ul className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2">
            {DISCIPLINES.map((d) => (
              <li
                key={d.slug}
                className="bg-basalt p-8 transition-colors hover:bg-charcoal"
              >
                <Link href={`/work?d=${d.slug}`} className="block">
                  <p className="font-display text-2xl font-black uppercase tracking-[-0.01em] text-ash">
                    {d.label}
                  </p>
                  <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-smoke">
                    See work →
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 sm:px-10">
        <p className="font-mono text-xs uppercase tracking-[0.32em] text-ember">
          Principles
        </p>
        <ol className="mt-10 grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
          {PRINCIPLES.map((p, i) => (
            <li key={p.title} className="flex gap-6">
              <span className="font-mono text-xs tabular-nums text-ember">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-2xl font-black uppercase tracking-[-0.01em] text-ash">
                  {p.title}
                </h3>
                <p className="mt-3 font-serif text-base leading-relaxed text-smoke">
                  {p.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 sm:px-10">
        <div className="flex flex-col items-start gap-6 rounded-md border border-border bg-basalt p-10 md:flex-row md:items-center md:justify-between md:p-14">
          <div>
            <h2 className="font-display text-3xl font-black uppercase tracking-[-0.01em] text-ash sm:text-4xl">
              Got a project in mind?
            </h2>
            <p className="mt-3 max-w-xl font-serif text-base text-smoke">
              Send us a brief — we reply to every serious enquiry within two
              working days.
            </p>
          </div>
          <Link
            href="/contact"
            className="rounded-full bg-lava px-8 py-4 font-mono text-xs uppercase tracking-[0.22em] text-obsidian transition-colors hover:bg-ember"
          >
            Start a conversation
          </Link>
        </div>
      </section>
    </>
  );
}
