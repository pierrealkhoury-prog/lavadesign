"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

type DropdownLink = { href: string; label: string };

/**
 * Desktop nav dropdown ("Design Services"). Opens on hover and on click,
 * and on keyboard focus entering the group; closes on pointer-leave, Escape,
 * outside click, and route change.
 *
 * Desktop-only — the parent list is `hidden md:flex`, so this never renders
 * on touch. The mobile menu groups the same links as a static section.
 */
export function NavDropdown({
  label,
  links,
}: {
  label: string;
  links: readonly DropdownLink[];
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const pathname = usePathname();

  // Any of these links being the active route highlights the trigger.
  const active = links.some((l) => pathname.startsWith(l.href));

  // Close on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close on Escape + outside click while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointer = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <div
      ref={ref}
      className="relative"
      onPointerEnter={() => setOpen(true)}
      onPointerLeave={() => setOpen(false)}
      // Close when keyboard focus leaves the whole group.
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
        className={[
          "flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.22em] transition-colors",
          active || open ? "text-ash" : "text-smoke hover:text-ash",
        ].join(" ")}
      >
        {label}
        <span
          aria-hidden
          className={[
            "text-[0.9em] transition-transform duration-200",
            open ? "rotate-180" : "",
          ].join(" ")}
        >
          ▾
        </span>
      </button>

      {/* The panel sits below the trigger with a visual gap, but that gap has
          to stay *inside* this group — otherwise the pointer crossing it exits
          the group, fires onPointerLeave, and the menu closes before the
          cursor arrives. So the positioned wrapper starts flush at the
          trigger's bottom edge and pays the offset as transparent padding;
          the inner element carries the visible chrome. */}
      <div
        className={[
          "absolute left-0 top-full z-50 pt-3",
          open ? "" : "pointer-events-none",
        ].join(" ")}
      >
        <div
          id={menuId}
          role="menu"
          aria-label={label}
          inert={!open}
          className={[
            "min-w-52 rounded-md border border-border/60 bg-obsidian/95 p-2 shadow-[0_18px_42px_-12px_rgba(0,0,0,0.6)] backdrop-blur",
            "transition-[opacity,transform] duration-200 ease-out motion-reduce:transition-none",
            open
              ? "translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-1 opacity-0",
          ].join(" ")}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              role="menuitem"
              onClick={() => setOpen(false)}
              className={[
                "block rounded px-3 py-2.5 font-mono text-xs uppercase tracking-[0.22em] transition-colors",
                pathname.startsWith(link.href)
                  ? "text-ember"
                  : "text-smoke hover:bg-charcoal/60 hover:text-ash",
              ].join(" ")}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
