import Link from "next/link";

export default function HomePage() {
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

      <div className="mx-auto flex max-w-7xl flex-col gap-16 px-6 py-32 sm:px-10 md:py-40">
        <p className="font-mono text-xs uppercase tracking-[0.32em] text-ember">
          Phase 0 · Scaffold online
        </p>

        <h1 className="max-w-5xl font-display text-5xl font-black uppercase leading-[0.95] tracking-[-0.01em] text-ash sm:text-7xl md:text-8xl">
          A multidisciplinary studio
          <span className="block font-serif text-4xl font-normal italic tracking-normal text-ember sm:text-5xl md:text-6xl">
            forged at <span className="text-lava">lava</span> heat.
          </span>
        </h1>

        <p className="max-w-2xl font-serif text-xl leading-relaxed text-smoke md:text-2xl">
          Branding, packaging, web design, interiors, architecture, events and
          engineering — built end-to-end by a single studio, sold as productized
          services online.
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
  );
}
