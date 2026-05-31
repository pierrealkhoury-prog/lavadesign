import type { Metadata } from "next";
import Link from "next/link";
import { DisciplineFilter } from "@/components/discipline-filter";
import { WorkCard } from "@/components/work-card";
import {
  getDisciplineLabel,
  getProjectsByDiscipline,
  isDisciplineSlug,
  type DisciplineSlug,
} from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected projects across 2D & 3D, interiors & architecture, events & activations, and engineering.",
};

export default async function WorkPage({
  searchParams,
}: {
  searchParams: Promise<{ d?: string }>;
}) {
  const { d } = await searchParams;
  const active: DisciplineSlug | null =
    d && isDisciplineSlug(d) ? d : null;
  const projects = getProjectsByDiscipline(active);

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 sm:px-10 md:py-32">
      <header className="flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-ember">
            Work
          </p>
          <h1 className="max-w-4xl font-display text-4xl font-black uppercase leading-[0.95] tracking-[-0.01em] text-ash sm:text-6xl">
            {active
              ? getDisciplineLabel(active)
              : "Selected projects across every discipline."}
          </h1>
        </div>
        <DisciplineFilter active={active} />
      </header>

      {projects.length > 0 ? (
        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <WorkCard key={p.slug} project={p} />
          ))}
        </div>
      ) : (
        <ComingSoonPanel discipline={active} />
      )}
    </section>
  );
}

/**
 * Empty-state panel shown when a discipline filter matches no projects.
 * Treated as deliberate "we don't have this in the portfolio yet" content
 * — forward-looking copy + a /contact CTA — rather than a bare message.
 */
function ComingSoonPanel({
  discipline,
}: {
  discipline: DisciplineSlug | null;
}) {
  const label = discipline ? getDisciplineLabel(discipline) : "This work";
  return (
    <div className="mt-16 max-w-3xl rounded-md border border-border bg-basalt p-10 md:p-14">
      <p className="font-mono text-xs uppercase tracking-[0.32em] text-ember">
        Coming soon
      </p>
      <p className="mt-6 font-serif text-2xl leading-snug text-ash sm:text-3xl">
        {label} work is coming to the portfolio soon.
      </p>
      <p className="mt-4 font-serif text-base leading-relaxed text-smoke">
        Have a project in this space? We&rsquo;d love to hear about it — and
        the studio is actively taking on briefs across every discipline.
      </p>
      <Link
        href="/contact"
        className="mt-8 inline-flex items-center rounded-full bg-lava px-8 py-4 font-mono text-xs uppercase tracking-[0.22em] text-obsidian transition-colors hover:bg-ember"
      >
        Start a conversation
      </Link>
    </div>
  );
}
