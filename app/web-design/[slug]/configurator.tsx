"use client";

import { useMemo, useState } from "react";
import {
  type WebDesignAddon,
  type WebDesignPackage,
  formatPrice,
} from "@/lib/web-design";

/**
 * Configurator — client-side state for selected add-ons + live total.
 *
 * Security model: this component knows ONLY slugs. It never sends prices
 * to the server. When checkout is wired (Stage C), it'll POST
 * `{ packageSlug, addonSlugs }` to /api/checkout/session — the server
 * looks up the Stripe Price IDs from lib/web-design.ts and Stripe is
 * the source of truth for the actual amounts charged.
 */
export function Configurator({
  pkg,
  addons,
}: {
  pkg: WebDesignPackage;
  addons: WebDesignAddon[];
}) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [submitting, setSubmitting] = useState(false);

  const selectedAddons = useMemo(
    () => addons.filter((a) => selected.has(a.slug)),
    [addons, selected],
  );

  const total = useMemo(
    () =>
      pkg.basePrice + selectedAddons.reduce((sum, a) => sum + a.price, 0),
    [pkg.basePrice, selectedAddons],
  );

  function toggle(slug: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  }

  // Stage B: button is non-functional. Stage C wires this to POST to
  // /api/checkout/session and redirect to the Stripe-hosted page.
  async function handleCheckout() {
    // eslint-disable-next-line no-console
    console.log("[configurator] would POST:", {
      packageSlug: pkg.slug,
      addonSlugs: [...selected],
    });
    setSubmitting(true);
    setTimeout(() => setSubmitting(false), 600);
  }

  return (
    <div className="flex flex-col gap-10">
      {/* Add-ons list */}
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ember">
          Add-ons (optional)
        </p>
        <ul className="mt-6 divide-y divide-border/70 border-y border-border/70">
          {addons.map((addon) => {
            const isOn = selected.has(addon.slug);
            return (
              <li key={addon.slug}>
                <button
                  type="button"
                  onClick={() => toggle(addon.slug)}
                  aria-pressed={isOn}
                  className="group flex w-full items-baseline justify-between gap-6 py-4 text-left transition-colors hover:bg-charcoal/30"
                >
                  <span className="flex items-baseline gap-4">
                    {/* Toggle indicator — circle, fills with ember when on */}
                    <span
                      aria-hidden
                      className={[
                        "relative inline-block h-4 w-4 shrink-0 translate-y-0.5 rounded-full border transition-colors",
                        isOn
                          ? "border-ember bg-ember"
                          : "border-border bg-transparent group-hover:border-ember/60",
                      ].join(" ")}
                    >
                      {isOn ? (
                        <span
                          aria-hidden
                          className="absolute inset-0 m-auto block h-1.5 w-1.5 rounded-full bg-obsidian"
                          style={{ marginTop: 5, marginLeft: 5 }}
                        />
                      ) : null}
                    </span>
                    <span className="font-serif text-base leading-snug text-ash sm:text-lg">
                      {addon.name}
                    </span>
                  </span>
                  <span
                    className={[
                      "shrink-0 font-mono text-sm tabular-nums transition-colors",
                      isOn ? "text-ember" : "text-smoke group-hover:text-ash",
                    ].join(" ")}
                  >
                    +{formatPrice(addon.price)}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Total + CTA panel */}
      <div className="relative rounded-md border border-ember/40 bg-obsidian/60 p-8 shadow-[0_18px_42px_-12px_rgba(245,176,75,0.28)]">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ember">
          Your build
        </p>
        <ul className="mt-6 space-y-3 border-b border-border/70 pb-5">
          <li className="flex items-baseline justify-between gap-4">
            <span className="font-serif text-base text-ash">{pkg.name}</span>
            <span className="font-mono text-sm tabular-nums text-ash">
              {formatPrice(pkg.basePrice)}
            </span>
          </li>
          {selectedAddons.length === 0 ? (
            <li className="font-serif text-sm italic text-smoke">
              No add-ons selected. Toggle any above to add.
            </li>
          ) : (
            selectedAddons.map((a) => (
              <li
                key={a.slug}
                className="flex items-baseline justify-between gap-4"
              >
                <span className="font-serif text-sm text-smoke">{a.name}</span>
                <span className="font-mono text-sm tabular-nums text-ember">
                  +{formatPrice(a.price)}
                </span>
              </li>
            ))
          )}
        </ul>
        <div className="mt-5 flex items-baseline justify-between gap-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-smoke">
            Total
          </span>
          <span className="font-display text-3xl font-black tabular-nums tracking-[-0.01em] text-ash">
            {formatPrice(total)}
            <span className="pl-2 font-mono text-[10px] uppercase tracking-[0.3em] text-smoke">
              USD
            </span>
          </span>
        </div>

        <button
          type="button"
          onClick={handleCheckout}
          disabled={submitting}
          className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-lava px-6 py-4 font-mono text-xs uppercase tracking-[0.22em] text-obsidian transition-colors hover:bg-ember disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Wiring next stage…" : "Proceed to checkout →"}
        </button>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-smoke">
          Stage C will wire Stripe — test mode, 4242 cards.
        </p>
      </div>

      {/* Trust strip */}
      <ul className="space-y-2 font-serif text-sm leading-relaxed text-smoke">
        <li>
          <span className="text-ember">•</span> Payment is split — 50% to
          start, 50% on launch.
        </li>
        <li>
          <span className="text-ember">•</span> Card data never touches our
          servers — Stripe handles every charge directly.
        </li>
        <li>
          <span className="text-ember">•</span> You&rsquo;ll get a receipt
          immediately and we&rsquo;ll be in touch within one business day.
        </li>
      </ul>
    </div>
  );
}
