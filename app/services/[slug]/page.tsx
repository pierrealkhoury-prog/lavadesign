import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/reveal";
import {
  SERVICES,
  getCategoryMeta,
  getCategoryNeighbors,
  getService,
} from "@/lib/services";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(
  props: PageProps<"/services/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.summary,
    openGraph: {
      type: "article",
      title: service.title,
      description: service.summary,
      url: `/services/${service.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: service.title,
      description: service.summary,
    },
  };
}

export default async function ServiceDetailPage(
  props: PageProps<"/services/[slug]">,
) {
  const { slug } = await props.params;
  const service = getService(slug);
  if (!service) notFound();
  const categoryMeta = getCategoryMeta(service.category);
  const { prev, next } = getCategoryNeighbors(slug);

  return (
    <article>
      {/* Hero — title + tagline overlaid on the service image (gradient fallback).
          Inlined rather than using ImageSlot because we need the artwork
          positioned absolutely to fill the section's aspect box. */}
      <section className="relative aspect-[4/5] w-full overflow-hidden md:aspect-video md:max-h-[80vh]">
        {service.heroImage ? (
          <Image
            src={service.heroImage}
            alt={service.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ background: service.gradient }}
          />
        )}
        {/* Title-area scrim only — keeps the gradient/photo legible up top. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-obsidian via-obsidian/70 to-transparent" />
        <Reveal className="absolute inset-x-0 bottom-0">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 pb-16 sm:px-10">
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-ember">
              {categoryMeta.label}
            </p>
            <h1 className="max-w-5xl font-display text-5xl font-black uppercase leading-[0.95] tracking-[-0.01em] text-ash sm:text-7xl md:text-8xl">
              {service.title}
            </h1>
            <p className="max-w-3xl font-serif text-2xl italic leading-snug text-ember sm:text-3xl">
              {service.tagline}
            </p>
          </div>
        </Reveal>
      </section>

      {/* Summary + body — split layout matching the case-study rhythm. */}
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-24 sm:px-10 md:grid-cols-12 md:gap-16 md:py-32">
        <Reveal className="md:col-span-4">
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-ember">
            Summary
          </p>
          <p className="mt-6 font-serif text-2xl leading-snug text-ash">
            {service.summary}
          </p>
        </Reveal>
        <Reveal delay={120} className="space-y-6 md:col-span-7 md:col-start-6">
          {service.body.map((paragraph, i) => (
            <p
              key={i}
              className="font-serif text-lg leading-relaxed text-smoke"
            >
              {paragraph}
            </p>
          ))}
        </Reveal>
      </section>

      {/* Capabilities */}
      <section className="border-y border-border bg-basalt">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10">
          <Reveal>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
              <div className="md:col-span-4">
                <p className="font-mono text-xs uppercase tracking-[0.32em] text-ember">
                  What's included
                </p>
                <h2 className="mt-4 font-display text-3xl font-black uppercase tracking-[-0.01em] text-ash sm:text-4xl">
                  Capabilities.
                </h2>
              </div>
              <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2 md:col-span-7 md:col-start-6">
                {service.capabilities.map((cap) => (
                  <li
                    key={cap}
                    className="flex items-baseline gap-4 bg-basalt p-6"
                  >
                    <span aria-hidden className="text-ember">
                      ◆
                    </span>
                    <span className="font-display text-lg font-black uppercase tracking-[-0.01em] text-ash">
                      {cap}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Start-a-project CTA */}
      <section className="mx-auto max-w-7xl px-6 py-24 sm:px-10 md:py-32">
        <Reveal>
          <div className="flex flex-col items-start gap-8 rounded-md border border-border bg-basalt p-10 md:flex-row md:items-center md:justify-between md:p-16">
            <div>
              <h2 className="max-w-2xl font-display text-3xl font-black uppercase leading-tight tracking-[-0.01em] text-ash sm:text-4xl">
                Ready to start
                <span className="block font-serif text-2xl font-normal italic tracking-normal text-ember sm:text-3xl">
                  {service.title.toLowerCase()}?
                </span>
              </h2>
              <p className="mt-4 max-w-xl font-serif text-base text-smoke">
                Tell us about the project — we reply within two working days.
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

      {/* Prev / Next within the same category */}
      <nav
        aria-label="Service navigation"
        className="border-t border-border bg-basalt"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-10 sm:px-10">
          {prev ? (
            <Link
              href={`/services/${prev.slug}`}
              className="group flex flex-col gap-1"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-smoke">
                Previous
              </span>
              <span className="font-display text-lg font-black uppercase tracking-[-0.01em] text-ash transition-colors group-hover:text-lava">
                ← {prev.title}
              </span>
            </Link>
          ) : (
            <Link
              href="/services"
              className="group flex flex-col gap-1"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-smoke">
                Back
              </span>
              <span className="font-display text-lg font-black uppercase tracking-[-0.01em] text-ash transition-colors group-hover:text-lava">
                ← All services
              </span>
            </Link>
          )}
          {next ? (
            <Link
              href={`/services/${next.slug}`}
              className="group flex flex-col items-end gap-1 text-right"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-smoke">
                Next
              </span>
              <span className="font-display text-lg font-black uppercase tracking-[-0.01em] text-ash transition-colors group-hover:text-lava">
                {next.title} →
              </span>
            </Link>
          ) : (
            <Link
              href="/services"
              className="group flex flex-col items-end gap-1 text-right"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-smoke">
                Back
              </span>
              <span className="font-display text-lg font-black uppercase tracking-[-0.01em] text-ash transition-colors group-hover:text-lava">
                All services →
              </span>
            </Link>
          )}
        </div>
      </nav>
    </article>
  );
}
