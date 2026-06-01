import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/reveal";
import {
  ADDONS,
  PACKAGES,
  formatPrice,
  getPackage,
} from "@/lib/web-design";
import { Configurator } from "./configurator";

export function generateStaticParams() {
  return PACKAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/web-design/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const pkg = getPackage(slug);
  if (!pkg) return {};
  const title = `${pkg.name} — Web Design`;
  return {
    title,
    description: pkg.tagline,
    openGraph: {
      type: "article",
      title,
      description: pkg.tagline,
      url: `/web-design/${pkg.slug}`,
      images: ["/opengraph-image"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: pkg.tagline,
      images: ["/opengraph-image"],
    },
  };
}

/**
 * /web-design/<slug> — per-package detail with the configurator.
 *
 * Stage B: configurator works (toggles + live total) but the checkout
 * button is a no-op that logs the would-be payload to the console.
 * Stage C: same page, the button POSTs to /api/checkout/session and
 * redirects to Stripe-hosted Checkout.
 *
 * The route is parametric so all 5 packages get the same template —
 * Stage D will require zero new pages, just verifying each one.
 */
export default async function PackagePage(
  props: PageProps<"/web-design/[slug]">,
) {
  const { slug } = await props.params;
  const pkg = getPackage(slug);
  if (!pkg) notFound();

  return (
    <article>
      {/* Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-80"
          style={{
            background:
              "radial-gradient(60% 50% at 15% 0%, rgba(255,77,28,0.22), transparent 70%), radial-gradient(40% 50% at 90% 100%, rgba(245,176,75,0.16), transparent 70%)",
          }}
        />
        <Reveal>
          <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-24 sm:px-10 md:py-32">
            <Link
              href="/web-design"
              className="font-mono text-[10px] uppercase tracking-[0.3em] text-smoke transition-colors hover:text-ash"
            >
              ← All packages
            </Link>
            <div className="flex flex-col gap-6">
              <p className="font-mono text-xs uppercase tracking-[0.32em] text-ember text-glow-ember">
                Web Design — Package
              </p>
              <h1 className="min-w-0 max-w-5xl font-display text-5xl font-black uppercase leading-[0.95] tracking-[-0.01em] text-ash sm:text-7xl md:text-8xl">
                {pkg.name}
                {pkg.featured ? (
                  <span className="ml-4 inline-flex translate-y-[-12px] rounded-full bg-ember/15 px-3 py-1 align-middle font-mono text-[10px] uppercase tracking-[0.22em] text-ember sm:translate-y-[-20px]">
                    ★ Most picked
                  </span>
                ) : null}
              </h1>
              <p className="max-w-3xl font-serif text-xl italic leading-snug text-ember md:text-2xl">
                {pkg.tagline}
              </p>
            </div>
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 border-t border-border pt-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-smoke">
                Base price
              </span>
              <span className="font-display text-4xl font-black tabular-nums tracking-[-0.01em] text-ash">
                {formatPrice(pkg.basePrice)}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-smoke">
                USD · {pkg.timeline}
              </span>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Includes + Configurator ─────────────────────────────────────────
          On desktop, the package "what's included" sits left, the
          configurator sits right. On mobile, includes first then
          configurator beneath. */}
      <section className="relative border-y border-border bg-basalt">
        <EmberHairline />
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 py-24 sm:px-10 md:grid-cols-12 md:py-32">
          <div className="md:col-span-5">
            <Reveal>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ember">
                What&rsquo;s included
              </p>
              <h2 className="mt-4 font-display text-3xl font-black uppercase leading-tight tracking-[-0.01em] text-ash sm:text-4xl">
                In {pkg.name}.
              </h2>
              <ul className="mt-8 space-y-3">
                {pkg.includes.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 font-serif text-base leading-relaxed text-smoke"
                  >
                    <span
                      aria-hidden
                      className="mt-2.5 inline-block h-1 w-1 shrink-0 rounded-full bg-ember/70"
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-10 border-t border-border pt-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-smoke">
                  Best for
                </p>
                <p className="mt-2 font-serif text-base leading-relaxed text-ash">
                  {pkg.bestFor}
                </p>
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <Reveal delay={120}>
              <Configurator pkg={pkg} addons={ADDONS} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* What happens next ─────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-24 sm:px-10">
        <Reveal>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="font-mono text-xs uppercase tracking-[0.32em] text-ember text-glow-ember">
                After checkout
              </p>
              <h2 className="mt-6 font-display text-3xl font-black uppercase leading-tight tracking-[-0.01em] text-ash sm:text-4xl">
                What happens
                <span className="block font-serif text-2xl font-normal italic tracking-normal text-ember sm:text-3xl">
                  next.
                </span>
              </h2>
            </div>
            <ol className="space-y-6 md:col-span-6 md:col-start-7">
              <li className="flex gap-4 font-serif text-lg leading-relaxed text-smoke">
                <span className="font-mono text-xs tabular-nums text-ember">
                  01
                </span>
                You&rsquo;ll get a Stripe receipt by email immediately.
              </li>
              <li className="flex gap-4 font-serif text-lg leading-relaxed text-smoke">
                <span className="font-mono text-xs tabular-nums text-ember">
                  02
                </span>
                Within one business day, we send a short intake form to
                gather scope details and reference links.
              </li>
              <li className="flex gap-4 font-serif text-lg leading-relaxed text-smoke">
                <span className="font-mono text-xs tabular-nums text-ember">
                  03
                </span>
                Design + copy starts. Most projects launch inside two
                weeks — see the timeline above.
              </li>
            </ol>
          </div>
        </Reveal>
      </section>
    </article>
  );
}

/** Ember-tinted hairline at the top of a basalt band. */
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
