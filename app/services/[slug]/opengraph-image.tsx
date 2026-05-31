import { notFound } from "next/navigation";
import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  renderOgImage,
} from "@/lib/og";
import { getCategoryMeta, getService } from "@/lib/services";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Lava Design — Service";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return renderOgImage({
    eyebrow: `Lava Design · ${getCategoryMeta(service.category).label}`,
    title: service.title,
    subtitle: service.tagline,
  });
}
