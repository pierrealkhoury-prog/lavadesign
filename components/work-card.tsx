import Image from "next/image";
import Link from "next/link";
import {
  type Project,
  getDisciplineLabel,
} from "@/lib/projects";

export function WorkCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block focus:outline-none"
    >
      <div
        className="relative aspect-[4/5] overflow-hidden rounded-md border border-border bg-basalt transition-transform duration-300 group-hover:-translate-y-1 group-focus-visible:ring-2 group-focus-visible:ring-lava"
        style={
          project.heroImage ? undefined : { background: project.gradient }
        }
      >
        {project.heroImage ? (
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ash/80">
            {getDisciplineLabel(project.discipline)}
          </p>
          <h3 className="font-display text-2xl font-black uppercase leading-tight tracking-[-0.01em] text-ash">
            {project.title}
          </h3>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.22em] text-smoke">
        <span>{project.location}</span>
        <span>{project.year}</span>
      </div>
    </Link>
  );
}
