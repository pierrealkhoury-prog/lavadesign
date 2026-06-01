import type { Metadata } from "next";
import Link from "next/link";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";

export const metadata: Metadata = {
  title: "Order received",
  description:
    "Thanks — your order is in. The studio will be in touch within one business day.",
  robots: { index: false, follow: false },
};

// Stripe redirects here with ?session_id=cs_test_... — we fetch the
// session server-side to render a friendly summary. The webhook is the
// source of truth for fulfillment; this page just confirms to the user
// that their payment cleared.
export default async function CheckoutSuccessPage(
  props: PageProps<"/web-design/checkout/success">,
) {
  const params = await props.searchParams;
  const sessionId = typeof params.session_id === "string" ? params.session_id : null;

  let session: Stripe.Checkout.Session | null = null;
  let fetchError: string | null = null;

  if (sessionId) {
    try {
      const stripe = getStripe();
      session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ["line_items"],
      });
    } catch (e) {
      fetchError = e instanceof Error ? e.message : String(e);
      console.error("[success] failed to retrieve session", fetchError);
    }
  }

  const customerEmail =
    session?.customer_details?.email ?? session?.customer_email ?? null;
  const customerName = session?.customer_details?.name ?? null;
  const items = session?.line_items?.data ?? [];
  const total = session?.amount_total ?? 0;
  const currency = (session?.currency ?? "usd").toUpperCase();
  const packageName =
    session?.metadata?.packageName ??
    items[0]?.description ??
    "your package";

  const dollars = total / 100;
  const totalDisplay = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: Number.isInteger(dollars) ? 0 : 2,
    maximumFractionDigits: Number.isInteger(dollars) ? 0 : 2,
  }).format(dollars);

  return (
    <section className="relative isolate overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-80"
        style={{
          background:
            "radial-gradient(60% 50% at 25% 20%, rgba(255,77,28,0.16), transparent 70%), radial-gradient(40% 50% at 85% 90%, rgba(245,176,75,0.12), transparent 70%)",
        }}
      />
      <div className="mx-auto flex min-h-[70vh] max-w-7xl flex-col gap-12 px-6 py-32 sm:px-10 md:py-40">
        <p className="font-mono text-xs uppercase tracking-[0.32em] text-ember text-glow-ember">
          Order received
        </p>
        <h1 className="max-w-4xl font-display text-5xl font-black uppercase leading-[0.95] tracking-[-0.01em] text-ash sm:text-7xl md:text-8xl">
          Thanks
          {customerName ? (
            <>
              ,
              <span className="block font-serif text-4xl font-normal italic tracking-normal text-ember sm:text-5xl md:text-6xl">
                {customerName.split(" ")[0]}.
              </span>
            </>
          ) : (
            <span className="block font-serif text-4xl font-normal italic tracking-normal text-ember sm:text-5xl md:text-6xl">
              that&rsquo;s in.
            </span>
          )}
        </h1>
        <p className="max-w-2xl font-serif text-xl leading-relaxed text-smoke md:text-2xl">
          Your <span className="text-ash">{packageName}</span> order is
          confirmed. Stripe will send a receipt
          {customerEmail ? (
            <>
              {" "}
              to <span className="text-ash">{customerEmail}</span>
            </>
          ) : null}
          . The studio will be in touch within one business day to
          schedule kickoff and send the intake form.
        </p>

        {/* Order summary card */}
        {session ? (
          <div className="max-w-2xl rounded-md border border-ember/40 bg-basalt p-8 shadow-[0_18px_42px_-12px_rgba(245,176,75,0.28)]">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ember">
              Order summary
            </p>
            <ul className="mt-6 space-y-3 border-b border-border/70 pb-5">
              {items.length === 0 ? (
                <li className="font-serif text-sm italic text-smoke">
                  (Line items unavailable — check Stripe Dashboard for details.)
                </li>
              ) : (
                items.map((li) => (
                  <li
                    key={li.id}
                    className="flex items-baseline justify-between gap-4"
                  >
                    <span className="font-serif text-base text-ash">
                      {li.description ?? "(line item)"}
                    </span>
                    <span className="font-mono text-sm tabular-nums text-smoke">
                      {formatLineAmount(li.amount_total ?? 0, currency)}
                    </span>
                  </li>
                ))
              )}
            </ul>
            <div className="mt-5 flex items-baseline justify-between gap-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-smoke">
                Total
              </span>
              <span className="font-display text-2xl font-black tabular-nums tracking-[-0.01em] text-ash">
                {totalDisplay}
                <span className="pl-2 font-mono text-[10px] uppercase tracking-[0.3em] text-smoke">
                  {currency}
                </span>
              </span>
            </div>
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-smoke">
              Reference: {session.id}
            </p>
          </div>
        ) : (
          <div className="max-w-2xl rounded-md border border-border bg-basalt p-8">
            <p className="font-serif text-base text-smoke">
              {sessionId
                ? "Couldn't load the session details right now — your payment is still recorded with Stripe, and we've received the order. The studio will be in touch shortly."
                : "No session id was supplied. If you just completed a payment, the order was still recorded with Stripe."}
            </p>
            {fetchError ? (
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-smoke">
                Debug: {fetchError}
              </p>
            ) : null}
          </div>
        )}

        {/* What happens next */}
        <div className="grid grid-cols-1 gap-10 border-t border-border pt-12 md:grid-cols-3">
          <Step
            n="01"
            title="Stripe receipt"
            body="Arrives in your inbox now."
          />
          <Step
            n="02"
            title="Intake form"
            body="From the studio within one business day. Short — scope, references, contacts."
          />
          <Step
            n="03"
            title="Kickoff"
            body="Design + copy starts as soon as the intake comes back."
          />
        </div>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/web-design"
            className="rounded-full border border-border px-8 py-4 font-mono text-xs uppercase tracking-[0.22em] text-ash transition-colors hover:border-ash"
          >
            ← All packages
          </Link>
          <Link
            href="/"
            className="rounded-full border border-border px-8 py-4 font-mono text-xs uppercase tracking-[0.22em] text-ash transition-colors hover:border-ash"
          >
            Lava Design home
          </Link>
        </div>
      </div>
    </section>
  );
}

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div>
      <span className="font-mono text-xs tabular-nums text-ember">{n}</span>
      <h3 className="mt-2 font-display text-lg font-black uppercase leading-tight tracking-[-0.01em] text-ash">
        {title}
      </h3>
      <p className="mt-2 font-serif text-sm leading-relaxed text-smoke">
        {body}
      </p>
    </div>
  );
}

function formatLineAmount(amount: number, currency: string): string {
  const dollars = amount / 100;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: Number.isInteger(dollars) ? 0 : 2,
    maximumFractionDigits: Number.isInteger(dollars) ? 0 : 2,
  }).format(dollars);
}
