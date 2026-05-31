import type { MetadataRoute } from "next";
import { getProjectsWithDetail } from "@/lib/projects";
import { SERVICES } from "@/lib/services";

const BASE = "https://lavadesign.us";

/**
 * Sitemap for crawlers. Includes:
 * - static top-level pages
 * - every project with a detail page (excludes light entries)
 * - every service detail page
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPaths: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1.0, freq: "weekly" },
    { path: "/work", priority: 0.9, freq: "weekly" },
    { path: "/services", priority: 0.9, freq: "monthly" },
    { path: "/about", priority: 0.7, freq: "monthly" },
    { path: "/contact", priority: 0.7, freq: "yearly" },
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((p) => ({
    url: BASE + p.path,
    lastModified: now,
    changeFrequency: p.freq,
    priority: p.priority,
  }));

  const projectEntries: MetadataRoute.Sitemap = getProjectsWithDetail().map(
    (p) => ({
      url: `${BASE}/work/${p.slug}`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.8,
    }),
  );

  const serviceEntries: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${BASE}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.8,
  }));

  return [...staticEntries, ...projectEntries, ...serviceEntries];
}
