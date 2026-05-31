import Link from "next/link";

const FOOTER_LINKS = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "Studio" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteFooter() {
  const year = 2026;

  return (
    <footer className="mt-32 border-t border-border/60 bg-basalt">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-16 sm:px-10 md:flex-row md:items-end md:justify-between">
        <div>
          <Link
            href="/"
            className="font-display text-3xl font-black uppercase tracking-[0.16em] text-ash"
          >
            Lava<span className="text-lava">.</span>
          </Link>
          <p className="mt-4 max-w-sm font-serif text-base italic text-smoke">
            Engineering, architecture, and the design that surrounds
            them. Studios in Houston, Orlando, and Dubai.
          </p>
        </div>

        <div className="flex flex-col gap-6 md:items-end">
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {FOOTER_LINKS.map((link) => (
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
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-smoke">
            <a
              href="mailto:info@lavadesign.us"
              className="transition-colors hover:text-ash"
            >
              info@lavadesign.us
            </a>
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-smoke">
            &copy; {year} Lava Design — Houston · Orlando · Dubai
          </p>
        </div>
      </div>
    </footer>
  );
}
