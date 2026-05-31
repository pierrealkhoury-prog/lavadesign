import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "This page didn't make it past the drawing board. Head back to Lava Design — engineering, architecture, and design studio.",
  robots: { index: false, follow: true },
};

/**
 * Global 404 — caught by Next 16's App Router when no route matches.
 * Nav + footer come from the root layout so the page sits inside the
 * standard chrome. Visual language mirrors the home hero (radial ember
 * ambient, glowing eyebrow, Archivo display + Fraunces italic accent)
 * at a slightly quieter intensity so the page reads as a calm dead-end
 * rather than an alarm.
 */
export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Subtle molten ambient — same vocabulary as the home hero, gentler. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-80"
        style={{
          background:
            "radial-gradient(60% 50% at 25% 20%, rgba(255,77,28,0.16), transparent 70%), radial-gradient(40% 50% at 85% 90%, rgba(245,176,75,0.12), transparent 70%)",
        }}
      />

      <div className="mx-auto flex min-h-[70vh] max-w-7xl flex-col justify-center gap-12 px-6 py-32 sm:px-10 md:py-40">
        <p className="font-mono text-xs uppercase tracking-[0.32em] text-ember text-glow-ember">
          404 · Page not found
        </p>
        <h1 className="max-w-4xl font-display text-5xl font-black uppercase leading-[0.95] tracking-[-0.01em] text-ash sm:text-7xl md:text-8xl">
          Lost the
          <span className="block font-serif text-4xl font-normal italic tracking-normal text-ember sm:text-5xl md:text-6xl">
            <span className="text-lava">thread</span>.
          </span>
        </h1>
        <p className="max-w-2xl font-serif text-xl leading-relaxed text-smoke md:text-2xl">
          This page didn&rsquo;t make it past the drawing board.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/"
            className="rounded-full bg-lava px-8 py-4 font-mono text-xs uppercase tracking-[0.22em] text-obsidian transition-colors hover:bg-ember"
          >
            Back home
          </Link>
          <Link
            href="/work"
            className="rounded-full border border-border px-8 py-4 font-mono text-xs uppercase tracking-[0.22em] text-ash transition-colors hover:border-ash"
          >
            See the work
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-border px-8 py-4 font-mono text-xs uppercase tracking-[0.22em] text-ash transition-colors hover:border-ash"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </section>
  );
}
