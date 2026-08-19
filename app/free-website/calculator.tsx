"use client";

import { useState } from "react";
import {
  BUYOUT_TIERS,
  EMAIL_ADD_PER_USER,
  EMAIL_NOTE,
  EXIT_FEE_MONTHS,
  MAX_EXTRA_EMAILS,
  PREMIUM_DOMAIN,
  SECOND_LANGUAGE,
  ZERO_PLANS,
  formatUsd,
  type ZeroPlanSlug,
} from "@/lib/free-website";

/**
 * Lava Zero price calculator — client state for the live monthly total and
 * the early-exit cost table.
 *
 * The math mirrors the campaign draft exactly:
 *   monthly total = plan.monthly + premium domain + (8 × extra emails)
 *                   + Spanish version (first 12 months only)
 *   early exit    = (3 × current monthly total) + declining build-value buyout
 *
 * The Spanish add-on is a first-year-only surcharge, so when it's on the total
 * shows both figures ("$239/mo first year → $199/mo after"). All amounts USD.
 */
export function Calculator() {
  const [planSlug, setPlanSlug] = useState<ZeroPlanSlug>("business");
  const [premiumDomain, setPremiumDomain] = useState(false);
  const [emails, setEmails] = useState(0);
  const [spanish, setSpanish] = useState(false);

  const plan = ZERO_PLANS.find((p) => p.slug === planSlug)!;

  const domainAdd = premiumDomain ? PREMIUM_DOMAIN.monthlyAdd : 0;
  const emailAdd = emails * EMAIL_ADD_PER_USER;
  const languageAdd = spanish ? SECOND_LANGUAGE.monthlyAdd : 0;

  // Steady-state monthly (after the Spanish surcharge ends) vs the first-year
  // monthly (while it applies). Equal when Spanish is off.
  const afterYearTotal = plan.monthly + domainAdd + emailAdd;
  const firstYearTotal = afterYearTotal + languageAdd;

  // Line-item breakdown, in the order the draft lists them.
  const lines: { label: string; amount: string }[] = [
    { label: `${plan.name} plan`, amount: formatUsd(plan.monthly) },
  ];
  if (domainAdd) {
    lines.push({ label: "Premium domain", amount: `+${formatUsd(domainAdd)}` });
  }
  if (emailAdd) {
    lines.push({
      label: `${emails} extra email account${emails > 1 ? "s" : ""}`,
      amount: `+${formatUsd(emailAdd)}`,
    });
  }
  if (languageAdd) {
    lines.push({
      label: `${SECOND_LANGUAGE.label} (first ${SECOND_LANGUAGE.months} mo)`,
      amount: `+${formatUsd(languageAdd)}`,
    });
  }

  // Early-exit preview: 3-month exit fee (three months of whatever the
  // subscription costs at that point) + the declining build buyout. Only the
  // first tier still carries the Spanish surcharge — it has dropped off by
  // month 13, so charging it in the later rows would overstate the exit cost
  // on the one page that promises no surprises.
  const exitRows = BUYOUT_TIERS.map((tier, i) => ({
    when: tier.label,
    amount:
      (i === 0 ? firstYearTotal : afterYearTotal) * EXIT_FEE_MONTHS +
      Math.round(plan.buildValue * tier.factor),
  }));

  return (
    <div className="mt-16 grid grid-cols-1 overflow-hidden rounded-md border border-border lg:grid-cols-[1.15fr_0.85fr]">
      {/* ─── Controls ─────────────────────────────────────────────────── */}
      <div className="bg-obsidian/40 p-8 sm:p-10">
        {/* Plan */}
        <Field label="Plan" id="calc-plan">
          <Segmented aria-labelledby="calc-plan">
            {ZERO_PLANS.map((p) => (
              <SegButton
                key={p.slug}
                pressed={planSlug === p.slug}
                onClick={() => setPlanSlug(p.slug)}
              >
                {p.name}
              </SegButton>
            ))}
          </Segmented>
        </Field>

        {/* Extra emails */}
        <Field
          label="Extra email accounts"
          suffix={`+${formatUsd(EMAIL_ADD_PER_USER)}/user/mo`}
          id="calc-emails"
        >
          <div
            role="group"
            aria-labelledby="calc-emails"
            className="inline-flex items-center overflow-hidden rounded-full border border-border"
          >
            <StepperButton
              label="Remove one email account"
              onClick={() => setEmails((n) => Math.max(0, n - 1))}
              disabled={emails === 0}
            >
              &minus;
            </StepperButton>
            <output className="w-14 text-center font-mono text-sm tabular-nums text-ash">
              {emails}
            </output>
            <StepperButton
              label="Add one email account"
              onClick={() => setEmails((n) => Math.min(MAX_EXTRA_EMAILS, n + 1))}
              disabled={emails === MAX_EXTRA_EMAILS}
            >
              +
            </StepperButton>
          </div>
          <Disclosure summary="What's an extra account?">
            {EMAIL_NOTE}
          </Disclosure>
        </Field>

        {/* Add-ons */}
        <Field label="Add-ons" id="calc-addons">
          <div className="space-y-4">
            {/* Premium domain */}
            <div>
              <Toggle
                checked={premiumDomain}
                onChange={setPremiumDomain}
                label="Premium domain"
                price={`+${formatUsd(PREMIUM_DOMAIN.monthlyAdd)}/mo`}
              />
              <Disclosure summary="Which domains does this cover?">
                Covers {PREMIUM_DOMAIN.covers.join(", ")}. Standard .com / .net /
                .org is included in every plan. {PREMIUM_DOMAIN.quotedNote}
              </Disclosure>
            </div>

            {/* Spanish version */}
            <div>
              <Toggle
                checked={spanish}
                onChange={setSpanish}
                label={`${SECOND_LANGUAGE.label}`}
                price={`+${formatUsd(SECOND_LANGUAGE.monthlyAdd)}/mo (first ${SECOND_LANGUAGE.months} months)`}
              />
              <Disclosure summary="How does the first-12-months price work?">
                The {formatUsd(SECOND_LANGUAGE.monthlyAdd)}/mo surcharge applies
                for the first {SECOND_LANGUAGE.months} months only, then drops
                off — your total returns to the base plan price.{" "}
                {SECOND_LANGUAGE.quotedNote}
              </Disclosure>
            </div>
          </div>
        </Field>
      </div>

      {/* ─── Output ───────────────────────────────────────────────────── */}
      <div aria-live="polite" className="flex flex-col bg-charcoal p-8 sm:p-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-smoke">
          Your monthly subscription
        </p>

        {/* Total — dual figure while the first-year Spanish surcharge applies */}
        <p className="mt-3 font-display text-5xl font-black tabular-nums leading-none tracking-[-0.01em] text-ash sm:text-6xl">
          {formatUsd(firstYearTotal)}
          <span className="pl-2 font-mono text-sm uppercase tracking-[0.2em] text-ember">
            /mo
          </span>
        </p>
        {spanish ? (
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.18em] text-ember">
            first {SECOND_LANGUAGE.months} months → {formatUsd(afterYearTotal)}
            /mo after
          </p>
        ) : null}
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-smoke">
          $0 upfront · billed monthly
        </p>

        {/* Line items */}
        <ul className="mt-8 border-t border-border/70">
          {lines.map((line) => (
            <li
              key={line.label}
              className="flex items-baseline justify-between gap-4 border-b border-border/70 py-2.5"
            >
              <span className="font-serif text-sm text-smoke">
                {line.label}
              </span>
              <span className="font-mono text-sm tabular-nums text-ash">
                {line.amount}
              </span>
            </li>
          ))}
        </ul>

        {/* Early-exit preview */}
        <div className="mt-auto rounded-md border border-border/70 bg-obsidian/50 p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-smoke">
            If you cancel early (3-month exit fee + build buyout)
          </p>
          <table className="mt-3 w-full border-collapse">
            <tbody>
              {exitRows.map((row) => (
                <tr key={row.when}>
                  <td className="border-t border-border/70 py-1.5 font-serif text-sm text-smoke">
                    {row.when}
                  </td>
                  <td className="border-t border-border/70 py-1.5 text-right font-mono text-sm tabular-nums text-ash">
                    {formatUsd(row.amount)}
                  </td>
                </tr>
              ))}
              <tr>
                <td className="border-t border-border/70 py-1.5 font-serif text-sm font-semibold text-ember">
                  After month 36
                </td>
                <td className="border-t border-border/70 py-1.5 text-right font-mono text-sm font-semibold tabular-nums text-ember">
                  $0
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Small building blocks ───────────────────────────────────────────────────

function Field({
  label,
  suffix,
  id,
  children,
}: {
  label: string;
  suffix?: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-8 last:mb-0">
      {/* Labelled via id + aria-labelledby (the fields wrap groups / an
          <output>, not a single labelable control), matching the draft. */}
      <label
        id={id}
        className="mb-3 block font-mono text-[10px] uppercase tracking-[0.22em] text-smoke"
      >
        {label}
        {suffix ? (
          <span className="ml-2 normal-case tracking-normal text-smoke/70">
            {suffix}
          </span>
        ) : null}
      </label>
      {children}
    </div>
  );
}

function Segmented({
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div role="group" className="flex flex-wrap gap-2" {...rest}>
      {children}
    </div>
  );
}

function SegButton({
  pressed,
  onClick,
  children,
}: {
  pressed: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={[
        "rounded-full border px-4 py-2 font-serif text-sm transition-colors",
        pressed
          ? "border-ash bg-ash text-obsidian"
          : "border-border text-ash hover:border-ember/60",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function StepperButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="flex h-10 w-11 items-center justify-center font-display text-lg text-ash transition-colors hover:bg-obsidian/60 disabled:cursor-not-allowed disabled:text-smoke/40"
    >
      {children}
    </button>
  );
}

/** Add-on toggle row — checkbox styled like the /web-design configurator's
 *  toggle indicator (circle, fills ember when on). */
function Toggle({
  checked,
  onChange,
  label,
  price,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  price: string;
}) {
  return (
    <label className="flex cursor-pointer select-none items-baseline justify-between gap-4">
      <span className="flex items-baseline gap-3">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="peer sr-only"
        />
        {/* The real checkbox is sr-only, so its native focus ring is
            invisible — the dot mirrors it via peer-focus-visible instead,
            otherwise keyboard users have no idea where they are. */}
        <span
          aria-hidden
          className={[
            "relative inline-block h-4 w-4 shrink-0 translate-y-0.5 rounded-full border transition-colors",
            "peer-focus-visible:ring-2 peer-focus-visible:ring-ember peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-obsidian",
            checked ? "border-ember bg-ember" : "border-border bg-transparent",
          ].join(" ")}
        >
          {checked ? (
            <span
              aria-hidden
              className="absolute left-1/2 top-1/2 block h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-obsidian"
            />
          ) : null}
        </span>
        <span className="font-serif text-base text-ash">{label}</span>
      </span>
      <span
        className={[
          "shrink-0 font-mono text-xs tabular-nums transition-colors",
          checked ? "text-ember" : "text-smoke",
        ].join(" ")}
      >
        {price}
      </span>
    </label>
  );
}

/** Inline "expand for detail" disclosure — the site's real detail pattern
 *  (same <details> idiom as the FAQ accordions), used here instead of a
 *  modal (the repo has no modal component). */
function Disclosure({
  summary,
  children,
}: {
  summary: string;
  children: React.ReactNode;
}) {
  return (
    <details className="group mt-2">
      <summary className="flex cursor-pointer list-none items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-smoke transition-colors hover:text-ash">
        <span
          aria-hidden
          className="text-ember transition-transform duration-200 group-open:rotate-45"
        >
          +
        </span>
        {summary}
      </summary>
      <p className="mt-2 max-w-md font-serif text-xs leading-relaxed text-smoke">
        {children}
      </p>
    </details>
  );
}
