"use client";

import { useState } from "react";

/**
 * Subscribe button — POSTs { maintenanceSlug } to /api/checkout/session
 * (subscription branch) and redirects to Stripe-hosted Checkout. The
 * client knows only the slug; the server resolves the recurring Stripe
 * Price ID and creates the Session in subscription mode.
 */
export function SubscribeButton({
  maintenanceSlug,
  featured,
}: {
  maintenanceSlug: string;
  featured?: boolean;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ maintenanceSlug }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? `Subscribe failed (HTTP ${res.status})`);
      }
      window.location.href = data.url;
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      console.error("[subscribe] checkout error", message);
      setError(message);
      setSubmitting(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        disabled={submitting}
        className={[
          "mt-auto inline-flex w-full items-center justify-center rounded-full px-6 py-3 font-mono text-xs uppercase tracking-[0.22em] transition-colors disabled:cursor-not-allowed disabled:opacity-60",
          featured
            ? "bg-lava text-obsidian hover:bg-ember"
            : "border border-border text-ash hover:border-ash",
        ].join(" ")}
      >
        {submitting ? "Opening Stripe…" : "Subscribe →"}
      </button>
      {error ? (
        <p
          role="alert"
          className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-lava"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
