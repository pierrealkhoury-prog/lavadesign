import Link from "next/link";
import { DISCIPLINES, type DisciplineSlug } from "@/lib/projects";

const BASE_PATH = "/work";

export function DisciplineFilter({
  active,
}: {
  active: DisciplineSlug | null;
}) {
  return (
    <nav aria-label="Filter by discipline">
      <ul className="flex flex-wrap gap-2">
        <li>
          <FilterChip href={BASE_PATH} active={active === null}>
            All
          </FilterChip>
        </li>
        {DISCIPLINES.map((d) => (
          <li key={d.slug}>
            <FilterChip
              href={`${BASE_PATH}?d=${d.slug}`}
              active={active === d.slug}
            >
              {d.label}
            </FilterChip>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function FilterChip({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  const base =
    "inline-flex items-center rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] transition-colors";
  const state = active
    ? "bg-ash text-obsidian"
    : "border border-border text-smoke hover:border-ash hover:text-ash";
  return (
    <Link href={href} className={`${base} ${state}`}>
      {children}
    </Link>
  );
}
