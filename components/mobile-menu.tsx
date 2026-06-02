"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const LINKS = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "Studio" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Contact" },
] as const;

/**
 * Mobile-only navigation. Renders a hamburger trigger; on open, the
 * full-screen dark panel is rendered into document.body via createPortal.
 *
 * Why the portal: the parent <header> uses backdrop-filter (the glass
 * effect on the sticky nav). Any ancestor with backdrop-filter creates a
 * containing block for `position: fixed` descendants — so a fixed panel
 * inside the header would be sized to the header's box, not the
 * viewport. Portalling to body bypasses that entirely.
 *
 * Other behaviour:
 *  - Closes on link click (so route changes feel snappy).
 *  - Closes on Escape.
 *  - Closes on route change (defensive).
 *  - Locks body scroll while open.
 */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Mark client-mounted so we can safely call createPortal (document
  // doesn't exist during SSR).
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close on Escape + lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const panel = (
    <div
      id="mobile-menu-panel"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      // z-[60] so the panel sits above the sticky header (z-50). Solid
      // obsidian — no transparency that could let underlying content
      // peek through.
      className="fixed inset-0 z-[60] flex flex-col bg-obsidian md:hidden"
    >
      {/* Header bar inside the panel — mirrors the site nav so the
          hamburger that opened the menu becomes the X that closes it,
          without the user having to look elsewhere. */}
      <div className="flex items-center justify-between border-b border-ash/10 px-6 py-5 sm:px-10">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="font-display text-xl font-black uppercase tracking-[0.18em] text-ash"
        >
          Lava<span className="text-lava">.</span>
        </Link>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
          className="inline-flex h-10 w-10 items-center justify-center rounded border border-ash/20 text-ash transition-colors hover:border-ash/50"
        >
          <span className="relative block h-3.5 w-5">
            <span
              aria-hidden
              className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 rotate-45 bg-ash"
            />
            <span
              aria-hidden
              className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 -rotate-45 bg-ash"
            />
          </span>
        </button>
      </div>

      <ul className="mx-auto flex w-full max-w-7xl flex-col gap-1 px-6 py-10 sm:px-10">
        {LINKS.map((link) => (
          <li
            key={link.href}
            className="border-b border-ash/10 last:border-b-0"
          >
            <Link
              href={link.href}
              onClick={() => setOpen(false)}
              className="block py-5 font-display text-3xl font-black uppercase tracking-[-0.01em] text-ash transition-colors hover:text-ember"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-auto mx-auto w-full max-w-7xl px-6 pb-10 sm:px-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-smoke">
          Lava Design — Houston · Orlando · Dubai
        </p>
      </div>
    </div>
  );

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-menu-panel"
        aria-label={open ? "Close menu" : "Open menu"}
        className="inline-flex h-10 w-10 items-center justify-center rounded border border-ash/20 text-ash transition-colors hover:border-ash/50"
      >
        {/* Two-line hamburger. Morphs to an X visually in the panel's
            own close button (the open trigger doesn't morph since it's
            hidden behind the panel once open). */}
        <span className="relative block h-3.5 w-5">
          <span
            aria-hidden
            className="absolute left-0 right-0 top-0 h-px bg-ash"
          />
          <span
            aria-hidden
            className="absolute left-0 right-0 bottom-0 h-px bg-ash"
          />
        </span>
      </button>
      {mounted && open ? createPortal(panel, document.body) : null}
    </div>
  );
}
