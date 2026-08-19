import Link from "next/link";
import { MobileMenu } from "@/components/mobile-menu";
import { NavDropdown } from "@/components/nav-dropdown";

// Flat links before / after the "Design Services" dropdown, so the dropdown
// sits between Services and Studio: Work · Services · Design Services ▾ · …
const NAV_LEADING = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
] as const;

const NAV_TRAILING = [
  { href: "/about", label: "Studio" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Contact" },
] as const;

export const DESIGN_SERVICES_LINKS = [
  { href: "/web-design", label: "Web Design" },
  { href: "/free-website", label: "Free Website" },
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

        {/* Desktop nav — server-rendered links with a client dropdown for
            Design Services. */}
        <ul className="hidden items-center gap-10 md:flex">
          {NAV_LEADING.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-mono text-xs uppercase tracking-[0.22em] text-smoke transition-colors hover:text-ash"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <NavDropdown label="Design Services" links={DESIGN_SERVICES_LINKS} />
          </li>
          {NAV_TRAILING.map((link) => (
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

        {/* Mobile nav — client component with hamburger + slide-down panel. */}
        <MobileMenu />
      </nav>
    </header>
  );
}
