import type { MetadataRoute } from "next";
import { CANONICAL_HOST, isIndexable } from "@/lib/site";

/**
 * Crawler rules.
 *
 * Until lavadesign.us actually points at this app, the only public URL is the
 * preview domain (lavadesign.vercel.app) — and letting Google index that
 * would put staging content in search results and set up a duplicate-content
 * fight with the real domain later. So indexing is refused everywhere except
 * the canonical host. See lib/site.ts for how that's detected.
 */
export default function robots(): MetadataRoute.Robots {
  if (!isIndexable()) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${CANONICAL_HOST}/sitemap.xml`,
    host: CANONICAL_HOST,
  };
}
