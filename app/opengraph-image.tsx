import {
  OG_CONTENT_TYPE,
  OG_DEFAULT_ALT,
  OG_SIZE,
  renderOgImage,
} from "@/lib/og";

export const alt = OG_DEFAULT_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/** Default OG card for any page without its own opengraph-image override. */
export default async function Image() {
  return renderOgImage({
    eyebrow: "Lava Design",
    title: "Engineering, Architecture & Design Studio",
    subtitle: "Houston · Orlando · Dubai",
  });
}
