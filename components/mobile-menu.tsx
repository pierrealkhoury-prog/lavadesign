"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

// A flat link, or a labelled group (rendered as a small heading + nested
// links). Links defined locally rather than imported from site-nav to avoid a
// circular import (site-nav imports this component).
type NavItem =
  | { type: "link"; href: string; label: string }
  | {
      type: "group";
      label: string;
      links: { href: string; label: string }[];
    };

const NAV_ITEMS: NavItem[] = [
  { type: "link", href: "/work", label: "Work" },
  { type: "link", href: "/services", label: "Services" },
  {
    type: "group",
    label: "Design Services",
    links: [
      { href: "/web-design", label: "Web Design" },
      { href: "/free-website", label: "Free Website" },
    ],
  },
  { type: "link", href: "/about", label: "Studio" },
  { type: "link", href: "/team", label: "Team" },
  { type: "link", href: "/contact", label: "Contact" },
];

/**
 * Mobile-only navigation. Renders a hamburger trigger; the full-screen
 * dark panel is rendered into document.body via createPortal.
 *
 * Why the portal: the parent <header> uses backdrop-filter (the glass
 * effect on the sticky nav). Any ancestor with backdrop-filter creates a
 * containing block for `position: fixed` descendants — so a fixed panel
 * inside the header would be sized to the header's box, not the
 * viewport. Portalling to body bypasses that entirely.
 *
 * Transitions: the panel stays mounted once the component is client-side
 * mounted, and fades + slides between closed/open states (rather than
 * popping in), so opening never appears sudden. `inert` while closed keeps
 * its links out of the tab order and pointer flow.
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
      // Kept mounted; visibility is driven by the open state so the panel
      // can fade + slide instead of popping in. `inert` while closed
      // removes it from tab order and pointer events without needing a
      // separate pointer-events utility.
      inert={!open}
      className={[
        "fixed inset-0 z-[60] flex flex-col bg-obsidian md:hidden",
        "transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none",
        open
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-2 opacity-0",
      ].join(" ")}
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
          <MenuIcon open={open} />
        </button>
      </div>

      {/* Links settle in with a slightly larger slide than the panel for a
          subtle layered entrance. */}
      <ul
        className={[
          "mx-auto flex w-full max-w-7xl flex-col gap-1 px-6 py-10 sm:px-10",
          "transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none",
          open ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0",
        ].join(" ")}
      >
        {NAV_ITEMS.map((item) =>
          item.type === "link" ? (
            <li
              key={item.href}
              className="border-b border-ash/10 last:border-b-0"
            >
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="block py-5 font-display text-3xl font-black uppercase tracking-[-0.01em] text-ash transition-colors hover:text-ember"
              >
                {item.label}
              </Link>
            </li>
          ) : (
            <li
              key={item.label}
              className="border-b border-ash/10 py-5 last:border-b-0"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-smoke">
                {item.label}
              </p>
              <ul className="mt-2">
                {item.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block py-2 font-display text-2xl font-black uppercase tracking-[-0.01em] text-ash transition-colors hover:text-ember"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ),
        )}
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
        <MenuIcon open={open} />
      </button>
      {mounted ? createPortal(panel, document.body) : null}
    </div>
  );
}

/**
 * Three-line hamburger that morphs into an X. The top and bottom bars
 * translate to the vertical centre and counter-rotate; the middle bar
 * fades out. Animated via transform/opacity transitions so the change is
 * smooth, and disabled under prefers-reduced-motion.
 */
function MenuIcon({ open }: { open: boolean }) {
  const bar =
    "absolute left-0 right-0 h-px bg-ash transition-[transform,opacity] duration-300 ease-out motion-reduce:transition-none";
  return (
    <span aria-hidden className="relative block h-3.5 w-5">
      <span
        className={`${bar} top-0 ${open ? "translate-y-[6px] rotate-45" : ""}`}
      />
      <span
        className={`${bar} top-1/2 -translate-y-1/2 ${open ? "opacity-0" : "opacity-100"}`}
      />
      <span
        className={`${bar} bottom-0 ${open ? "-translate-y-[6px] -rotate-45" : ""}`}
      />
    </span>
  );
}
