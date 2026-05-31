import { notFound } from "next/navigation";
import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  renderOgImage,
} from "@/lib/og";
import { getProject } from "@/lib/projects";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Lava Design — Case Study";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project || project.noDetail) notFound();

  return renderOgImage({
    eyebrow: project.sector
      ? `Lava Design · ${project.sector}`
      : "Lava Design · Case Study",
    title: project.title,
    subtitle: `${project.location} · ${project.year}`,
  });
}
