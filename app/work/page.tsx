import type { Metadata } from "next";
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

      <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <WorkCard key={p.slug} project={p} />
        ))}
      </div>

      {projects.length === 0 ? (
        <p className="mt-16 font-serif text-xl italic text-smoke">
          No projects yet in this discipline.
        </p>
      ) : null}
    </section>
  );
}
