import Link from "next/link";
import { WorkCard } from "@/components/work-card";
import { DISCIPLINES, getFeaturedProjects } from "@/lib/projects";

export default function HomePage() {
  const featured = getFeaturedProjects();

  return (
    <>
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-80"
          style={{
            background:
              "radial-gradient(60% 50% at 20% 10%, rgba(255,77,28,0.28), transparent 70%), radial-gradient(40% 40% at 85% 90%, rgba(245,176,75,0.18), transparent 70%)",
          }}
        />
        <div className="mx-auto flex max-w-7xl flex-col gap-16 px-6 py-32 sm:px-10 md:py-40">
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-ember">
            Multidisciplinary design — Dubai
          </p>
          <h1 className="max-w-5xl font-display text-5xl font-black uppercase leading-[0.95] tracking-[-0.01em] text-ash sm:text-7xl md:text-8xl">
            A multidisciplinary studio
            <span className="block font-serif text-4xl font-normal italic tracking-normal text-ember sm:text-5xl md:text-6xl">
              forged at <span className="text-lava">lava</span> heat.
            </span>
          </h1>
          <p className="max-w-2xl font-serif text-xl leading-relaxed text-smoke md:text-2xl">
            Branding, packaging, web design, interiors, architecture, events
            and engineering — built end-to-end by a single studio, sold as
            productized services online.
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
              Browse services
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 sm:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-ember">
              Featured
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
        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <WorkCard key={p.slug} project={p} />
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-basalt">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10">
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-ember">
            Disciplines
          </p>
          <h2 className="mt-4 max-w-3xl font-display text-4xl font-black uppercase leading-[0.95] tracking-[-0.01em] text-ash sm:text-5xl">
            One studio, four disciplines, one shared material attention.
          </h2>
          <ul className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2">
            {DISCIPLINES.map((d, i) => (
              <li
                key={d.slug}
                className="bg-basalt p-8 transition-colors hover:bg-charcoal"
              >
                <Link href={`/work?d=${d.slug}`} className="block">
                  <span className="font-mono text-xs tabular-nums text-ember">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-4 font-display text-2xl font-black uppercase tracking-[-0.01em] text-ash">
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
        <div className="flex flex-col items-start gap-6 rounded-md border border-border bg-basalt p-10 md:flex-row md:items-center md:justify-between md:p-14">
          <div>
            <h2 className="font-display text-3xl font-black uppercase tracking-[-0.01em] text-ash sm:text-4xl">
              Ready to start something?
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
