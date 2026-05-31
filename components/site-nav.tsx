import Link from "next/link";

const NAV_LINKS = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "Studio" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-obsidian/80 backdrop-blur">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-10"
      >
        <Link
          href="/"
          className="font-display text-xl font-black uppercase tracking-[0.18em] text-ash transition-colors hover:text-lava"
        >
          Lava<span className="text-lava">.</span>
        </Link>

        {/* "Sign in" was here, pointing to /sign-in — pulled until Phase 2
            wires Clerk + a real /sign-in route. With the link present, Next
            prefetches /sign-in on hover and logs a 404 in the console. */}
        <ul className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-mono text-xs uppercase tracking-[0.22em] text-smoke transition-colors hover:text-ash"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
