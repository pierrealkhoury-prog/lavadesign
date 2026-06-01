import type { Metadata } from "next";
import Link from "next/link";
import { getPackage } from "@/lib/web-design";

export const metadata: Metadata = {
  title: "Checkout cancelled",
  description: "Nothing was charged. The checkout was cancelled.",
  robots: { index: false, follow: false },
};

export default async function CheckoutCancelPage(
  props: PageProps<"/web-design/checkout/cancel">,
) {
  const params = await props.searchParams;
  const slug = typeof params.package === "string" ? params.package : null;
  const pkg = slug ? getPackage(slug) : null;
  const backHref = pkg ? `/web-design/${pkg.slug}` : "/web-design";
  const backLabel = pkg ? `Back to ${pkg.name}` : "All packages";

  return (
    <section className="relative isolate overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-80"
        style={{
          background:
            "radial-gradient(60% 50% at 25% 20%, rgba(255,77,28,0.12), transparent 70%), radial-gradient(40% 50% at 85% 90%, rgba(140,127,120,0.18), transparent 70%)",
        }}
      />
      <div className="mx-auto flex min-h-[70vh] max-w-7xl flex-col justify-center gap-10 px-6 py-32 sm:px-10 md:py-40">
        <p className="font-mono text-xs uppercase tracking-[0.32em] text-ember text-glow-ember">
          Checkout cancelled
        </p>
        <h1 className="max-w-4xl font-display text-5xl font-black uppercase leading-[0.95] tracking-[-0.01em] text-ash sm:text-7xl md:text-8xl">
          Nothing was
          <span className="block font-serif text-4xl font-normal italic tracking-normal text-ember sm:text-5xl md:text-6xl">
            charged.
          </span>
        </h1>
        <p className="max-w-2xl font-serif text-xl leading-relaxed text-smoke md:text-2xl">
          Your card wasn&rsquo;t touched. Pick up where you left off, or
          talk to us if you&rsquo;d rather start with a conversation.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href={backHref}
            className="rounded-full bg-lava px-8 py-4 font-mono text-xs uppercase tracking-[0.22em] text-obsidian transition-colors hover:bg-ember"
          >
            ← {backLabel}
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-border px-8 py-4 font-mono text-xs uppercase tracking-[0.22em] text-ash transition-colors hover:border-ash"
          >
            Talk to us
          </Link>
        </div>
      </div>
    </section>
  );
}
