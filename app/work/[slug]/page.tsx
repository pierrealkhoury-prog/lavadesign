import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  getDisciplineLabel,
  getProject,
  getProjectsWithDetail,
} from "@/lib/projects";

export function generateStaticParams() {
  // Light entries don't get a detail route — skip them.
  return getProjectsWithDetail().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/work/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      type: "article",
      title: project.title,
      description: project.summary,
      url: `/work/${project.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.summary,
    },
  };
}

export default async function CaseStudyPage(
  props: PageProps<"/work/[slug]">,
) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project || project.noDetail) notFound();

  // Prev/next walks only projects that actually have a detail page.
  const detailProjects = getProjectsWithDetail();
  const index = detailProjects.findIndex((p) => p.slug === project.slug);
  const prev = index > 0 ? detailProjects[index - 1] : null;
  const next =
    index < detailProjects.length - 1 ? detailProjects[index + 1] : null;

  return (
    <article>
      {/* Hero — full-bleed: spans the entire viewport width edge to edge,
          no max-width, no horizontal padding. Art-directed <picture> swaps
          4:5 portrait on mobile, 16:9 on desktop. object-cover (both
          viewports) means the image always FILLS its container — no side
          letterbox bands when max-h-[85vh] makes the container wider than
          the image's natural ratio. Small vertical crop is acceptable on
          short viewports; the alternative was dark margins on every wide
          screen. */}
      <section className="relative aspect-[4/5] max-h-[85vh] w-full overflow-hidden md:aspect-video">
        {project.heroDesktop && project.heroMobile ? (
          <picture>
            <source
              media="(min-width: 768px)"
              srcSet={project.heroDesktop}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.heroMobile}
              alt={project.title}
              className="absolute inset-0 h-full w-full object-cover"
              fetchPriority="high"
            />
          </picture>
        ) : (
          <div
            aria-hidden
            className="h-full w-full"
            style={{ background: project.gradient }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto flex max-w-7xl flex-col gap-6 px-6 pb-16 sm:px-10">
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-ember">
            {getDisciplineLabel(project.discipline)}
          </p>
          <h1 className="max-w-5xl font-display text-5xl font-black uppercase leading-[0.95] tracking-[-0.01em] text-ash sm:text-7xl md:text-8xl">
            {project.title}
          </h1>
        </div>
      </section>

      {/* Meta strip — discipline + sector + location + year + role, in that order.
          Tailwind class names must be literal so the safelist picks them up. */}
      <section className="border-y border-border bg-basalt">
        <dl
          className={`mx-auto grid max-w-7xl grid-cols-2 gap-y-6 px-6 py-10 sm:px-10 ${metaColsClass(
            project,
          )}`}
        >
          <MetaItem label="Discipline">
            {getDisciplineLabel(project.discipline)}
          </MetaItem>
          {project.sector ? (
            <MetaItem label="Sector">{project.sector}</MetaItem>
          ) : null}
          <MetaItem label="Location">{project.location}</MetaItem>
          <MetaItem label="Year">{project.year}</MetaItem>
          {project.role ? (
            <MetaItem label="Role">{project.role}</MetaItem>
          ) : null}
        </dl>
      </section>

      {/* Scope tags */}
      {project.scopeTags ? (
        <section className="border-b border-border bg-basalt">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 px-6 py-6 sm:px-10">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-smoke">
              Scope
            </span>
            <ul className="flex flex-wrap gap-2">
              {project.scopeTags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-ash"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* Body */}
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-24 sm:px-10 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-4">
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-ember">
            Summary
          </p>
          <p className="mt-6 font-serif text-2xl leading-snug text-ash">
            {project.summary}
          </p>
        </div>
        <div className="space-y-6 md:col-span-7 md:col-start-6">
          {project.body.map((paragraph, i) => (
            <p
              key={i}
              className="font-serif text-lg leading-relaxed text-smoke"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* Gallery — 2 per row on sm+, contained inside max-w-7xl with page
          padding. Each image sits in a 3:2 framed card with object-contain
          so plans of any aspect display in full without crop. */}
      {project.gallery ? (
        <section className="mx-auto grid max-w-7xl grid-cols-1 gap-x-6 gap-y-12 px-6 pb-24 sm:grid-cols-2 sm:px-10">
          {project.gallery.map((item) => (
            <figure key={item.src} className="flex flex-col gap-4">
              <div className="relative aspect-[3/2] overflow-hidden rounded-md border border-border bg-basalt">
                <Image
                  src={item.src}
                  alt={item.caption}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-contain"
                />
              </div>
              <figcaption className="font-serif text-base italic text-smoke">
                {item.caption}
              </figcaption>
            </figure>
          ))}
        </section>
      ) : (
        <section className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 pb-24 sm:grid-cols-2 sm:px-10">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              aria-hidden
              className={`aspect-[4/3] rounded-md border border-border ${
                i === 0 ? "sm:col-span-2 sm:aspect-[16/7]" : ""
              }`}
              style={{
                background: project.gradient,
                opacity: 0.85 - i * 0.15,
              }}
            />
          ))}
        </section>
      )}

      {/* Prev / Next */}
      <nav
        aria-label="Project navigation"
        className="border-t border-border bg-basalt"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-10 sm:px-10">
          {prev ? (
            <Link
              href={`/work/${prev.slug}`}
              className="group flex flex-col gap-1"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-smoke">
                Previous
              </span>
              <span className="font-display text-lg font-black uppercase tracking-[-0.01em] text-ash transition-colors group-hover:text-lava">
                ← {prev.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/work/${next.slug}`}
              className="group flex flex-col items-end gap-1 text-right"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-smoke">
                Next
              </span>
              <span className="font-display text-lg font-black uppercase tracking-[-0.01em] text-ash transition-colors group-hover:text-lava">
                {next.title} →
              </span>
            </Link>
          ) : (
            <span />
          )}
        </div>
      </nav>
    </article>
  );
}

/** Count visible meta items and pick a stable Tailwind grid class.
 *  Literal class strings only so Tailwind v4's scanner picks them up. */
function metaColsClass(project: {
  sector?: string;
  role?: string;
}): string {
  const count = 3 + (project.sector ? 1 : 0) + (project.role ? 1 : 0);
  if (count >= 5) return "sm:grid-cols-5";
  if (count === 4) return "sm:grid-cols-4";
  return "sm:grid-cols-3";
}

function MetaItem({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <dt className="font-mono text-[10px] uppercase tracking-[0.3em] text-smoke">
        {label}
      </dt>
      <dd className="mt-2 font-serif text-base text-ash">{children}</dd>
    </div>
  );
}
