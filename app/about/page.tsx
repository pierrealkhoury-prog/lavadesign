import type { Metadata } from "next";
import Link from "next/link";
import { DISCIPLINES } from "@/lib/projects";

const PAGE_DESCRIPTION =
  "Lava Design is a multidisciplinary studio led by engineering and architecture in the US, with 2D & 3D design, branding, and event activations across the wider practice. Studios in Houston, Orlando, and Dubai.";

export const metadata: Metadata = {
  title: "Studio",
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: "Studio",
    description: PAGE_DESCRIPTION,
    url: "/about",
    images: ["/opengraph-image"],
  },
  twitter: {
    title: "Studio",
    description: PAGE_DESCRIPTION,
    images: ["/opengraph-image"],
  },
};

const PRINCIPLES = [
  {
    title: "One studio, every discipline.",
    body: "We design end-to-end, from a full set of building systems to the wordmark on the door. Holding every discipline in-house is what keeps the work coherent.",
  },
  {
    title: "Material before motif.",
    body: "We start with what a project is physically made of — steel, concrete, ink, code — and let the language follow from that.",
  },
  {
    title: "Engineering you can build from.",
    body: "Our US practice delivers permit-ready, contractor-biddable documents across mechanical, electrical, plumbing, structural, and civil scopes. The drawings are made to be built, not just approved.",
  },
  {
    title: "Productized where it serves.",
    body: "For the work that suits it — websites, branding, artworking — we sell as clear, fixed-scope packages, so clients know exactly what they're buying.",
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
          A studio that designs
          <span className="block font-serif text-4xl font-normal italic tracking-normal text-ember sm:text-5xl md:text-6xl">
            across every dimension.
          </span>
        </h1>
        <div className="mt-12 max-w-4xl space-y-8">
          <p className="font-serif text-2xl leading-snug text-ash md:text-3xl">
            Lava Design is a multidisciplinary studio. In the United States,
            our work is led by engineering and architecture — full building
            systems, structural and MEP design, and the site infrastructure
            that carries them — delivered out of our studios in Houston and
            Orlando.
          </p>
          <p className="font-serif text-lg leading-relaxed text-smoke">
            That engineering practice sits inside a wider studio. Across the
            group, we also design in 2D and 3D, build brands, and stage
            events and activations — disciplines anchored in our Dubai
            studio and the wider region. We treat it all as one practice:
            the same material attention runs through a set of building
            systems and a wordmark alike.
          </p>
          <p className="font-serif text-lg italic leading-relaxed text-smoke">
            Founded in 2012, the studio stays deliberately small and senior.
            Every project is taken from first conversation through delivery
            by the people you actually meet — wherever in the world it&rsquo;s
            based.
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
