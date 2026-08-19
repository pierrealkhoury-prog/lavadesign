/**
 * Where this deployment thinks it lives, and whether search engines should be
 * allowed in.
 *
 * The app is finished on lavadesign.vercel.app before the domain is switched
 * over from the old WordPress site, so for now there are two public hosts and
 * only one of them should ever be indexed.
 *
 * Detection, in order:
 *  1. SITE_INDEXABLE — explicit override ("true" / "false"). Use it to force
 *     the answer from the Vercel dashboard without a code change.
 *  2. VERCEL_PROJECT_PRODUCTION_URL — Vercel sets this to the project's
 *     production domain, and it becomes the CUSTOM domain as soon as one is
 *     attached. So the day lavadesign.us is pointed here, indexing turns
 *     itself on; until then it stays off. No flag to remember at launch.
 *  3. Neither set (local dev, other hosts) — not indexable.
 */

export const CANONICAL_HOST = "https://lavadesign.us";

/** Bare hostname of the canonical site, e.g. "lavadesign.us". */
const CANONICAL_HOSTNAME = new URL(CANONICAL_HOST).hostname;

export function isIndexable(): boolean {
  const override = process.env.SITE_INDEXABLE;
  if (override === "true") return true;
  if (override === "false") return false;

  const productionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (!productionUrl) return false;

  // The var holds a bare host ("lavadesign.us"), not a URL.
  const host = productionUrl.replace(/^https?:\/\//, "").split("/")[0];
  return host === CANONICAL_HOSTNAME || host === `www.${CANONICAL_HOSTNAME}`;
}
