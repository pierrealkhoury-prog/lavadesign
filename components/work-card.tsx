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
  // Use the full 16:9 hero as the thumb source — the 4:5 card acts as a
  // mask via overflow:hidden. The image always overflows horizontally
  // (since 16:9 in 4:5 with object-cover fills height and crops sides),
  // so any scale ≥ 1.0 keeps the card edge-to-edge with no empty gaps.
  const cardImage = project.heroDesktop;

  const card = (
    <>
      <div
        className={[
          "relative aspect-[4/5] overflow-hidden rounded-md border border-border bg-basalt",
          isInteractive
            ? "transition-[transform,border-color,box-shadow] duration-300 group-hover:-translate-y-1 group-hover:border-ember/40 group-hover:shadow-[0_12px_38px_-8px_rgba(245,176,75,0.32)] group-focus-visible:ring-2 group-focus-visible:ring-lava"
            : "",
        ].join(" ")}
        style={cardImage ? undefined : { background: project.gradient }}
      >
        {cardImage ? (
          <Image
            src={cardImage}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            // Default: scale 1.4 (zoomed in) at 70% opacity — the card
            // window shows a tight center of the hero.
            // Hover: scale 1.0 (natural object-cover) at 100% opacity —
            // image shrinks within the mask, revealing more of the
            // composition through the same card window. Card is always
            // filled because 16:9 hero at object-cover scale(1.0) still
            // overflows the 4:5 card horizontally — no gaps.
            // motion-reduce users get only the opacity change.
            className={
              isInteractive
                ? "object-cover opacity-50 transition duration-300 ease-out group-hover:opacity-100 motion-safe:scale-[1.4] motion-safe:group-hover:scale-100"
                : "object-cover"
            }
            priority={priority}
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/85 via-obsidian/20 to-transparent" />
        {/* Discipline label as a translucent pill in the top-left corner —
            higher contrast than the previous overlaid microcaps text. */}
        <span className="absolute left-4 top-4 inline-flex rounded-full border border-ash/20 bg-obsidian/70 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.22em] text-ash backdrop-blur">
          {getDisciplineLabel(project.discipline)}
        </span>
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-6">
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
