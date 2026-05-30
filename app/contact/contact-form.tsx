"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { DISCIPLINES } from "@/lib/projects";
import {
  submitInquiry,
  type InquiryFormState,
} from "./actions";

const INITIAL: InquiryFormState = { status: "idle" };

export function ContactForm() {
  const [state, action] = useActionState(submitInquiry, INITIAL);

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="rounded-md border border-ember/40 bg-basalt p-10"
      >
        <p className="font-mono text-xs uppercase tracking-[0.32em] text-ember">
          Inquiry received
        </p>
        <p className="mt-4 font-serif text-2xl leading-snug text-ash">
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form action={action} noValidate className="flex flex-col gap-8">
      <Field
        id="name"
        label="Your name"
        autoComplete="name"
        error={state.fieldErrors?.name}
        required
      />
      <Field
        id="email"
        label="Email"
        type="email"
        autoComplete="email"
        error={state.fieldErrors?.email}
        required
      />

      <div className="flex flex-col gap-3">
        <label
          htmlFor="discipline"
          className="font-mono text-[10px] uppercase tracking-[0.3em] text-smoke"
        >
          Discipline (optional)
        </label>
        <select
          id="discipline"
          name="discipline"
          defaultValue=""
          className="rounded-none border-b border-border bg-transparent py-3 font-serif text-base text-ash focus:border-ash focus:outline-none"
        >
          <option value="">— Not sure yet —</option>
          {DISCIPLINES.map((d) => (
            <option key={d.slug} value={d.slug} className="bg-obsidian">
              {d.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-3">
        <label
          htmlFor="message"
          className="font-mono text-[10px] uppercase tracking-[0.3em] text-smoke"
        >
          What are you working on?
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          className="rounded-none border-b border-border bg-transparent py-3 font-serif text-base text-ash placeholder:text-smoke/60 focus:border-ash focus:outline-none"
        />
        {state.fieldErrors?.message ? (
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-lava">
            {state.fieldErrors.message}
          </p>
        ) : null}
      </div>

      {state.status === "error" && !state.fieldErrors ? (
        <p
          role="alert"
          className="font-mono text-[11px] uppercase tracking-[0.2em] text-lava"
        >
          {state.message}
        </p>
      ) : null}

      <SubmitButton />
    </form>
  );
}

function Field({
  id,
  label,
  type = "text",
  autoComplete,
  required,
  error,
}: {
  id: "name" | "email";
  label: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      <label
        htmlFor={id}
        className="font-mono text-[10px] uppercase tracking-[0.3em] text-smoke"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        autoComplete={autoComplete}
        required={required}
        className="rounded-none border-b border-border bg-transparent py-3 font-serif text-base text-ash placeholder:text-smoke/60 focus:border-ash focus:outline-none"
      />
      {error ? (
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-lava">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="self-start rounded-full bg-lava px-8 py-4 font-mono text-xs uppercase tracking-[0.22em] text-obsidian transition-colors hover:bg-ember disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Sending…" : "Send inquiry"}
    </button>
  );
}
