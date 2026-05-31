import Image from "next/image";
import Link from "next/link";
import {
  type Project,
  getDisciplineLabel,
} from "@/lib/projects";

export function WorkCard({
  project,
  priority = false,
}: {
  project: Project;
  /** Forward to next/image for LCP-candidate cards (e.g. featured grid above the fold). */
  priority?: boolean;
}) {
  const isInteractive = !project.noDetail;

  const card = (
    <>
      <div
        className={[
          "relative aspect-[4/5] overflow-hidden rounded-md border border-border bg-basalt",
          isInteractive
            ? "transition-[transform,border-color,box-shadow] duration-300 group-hover:-translate-y-1 group-hover:border-ember/40 group-hover:shadow-[0_12px_38px_-8px_rgba(245,176,75,0.32)] group-focus-visible:ring-2 group-focus-visible:ring-lava"
            : "",
        ].join(" ")}
        style={project.thumb ? undefined : { background: project.gradient }}
      >
        {project.thumb ? (
          <Image
            src={project.thumb}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-contain"
            priority={priority}
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
      {project.caption ? (
        <p className="mt-3 font-serif text-sm italic leading-relaxed text-smoke">
          {project.caption}
        </p>
      ) : null}
    </>
  );

  if (!isInteractive) {
    return <div className="block">{card}</div>;
  }

  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block focus:outline-none"
    >
      {card}
    </Link>
  );
}
