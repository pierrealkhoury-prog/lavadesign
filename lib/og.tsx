/*
 * Shared OG image renderer. Used by app/opengraph-image.tsx and the per-route
 * opengraph-image.tsx files in app/work/[slug] and app/services/[slug].
 *
 * Brand: obsidian background with a soft ember glow in the top-right corner,
 * mono eyebrow up top, Archivo Black uppercase title body, Fraunces italic
 * subtitle, smoke-coloured site URL at the bottom.
 */
import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png" as const;
export const OG_DEFAULT_ALT =
  "Lava Design — Engineering, Architecture & Design Studio";

const COLORS = {
  obsidian: "#0a0706",
  basalt: "#14100e",
  ash: "#f4ede5",
  ember: "#f5b04b",
  lava: "#ff4d1c",
  smoke: "#8c7f78",
} as const;

/**
 * Fetch a Google Font as an ArrayBuffer suitable for ImageResponse's `fonts`
 * option. Google's CSS API returns a woff2 URL by default, which Satori (the
 * engine ImageResponse uses) supports natively.
 */
async function loadGoogleFont(
  family: string,
  weight: number,
  italic = false,
): Promise<ArrayBuffer> {
  const fam = family.replace(/ /g, "+");
  const ital = italic ? "1," : "0,";
  const url = `https://fonts.googleapis.com/css2?family=${fam}:ital,wght@${ital}${weight}&display=swap`;
  const css = await (await fetch(url)).text();
  const match = css.match(/src:\s*url\(([^)]+)\)\s*format/);
  if (!match) throw new Error(`Font CSS missing src URL: ${family}@${weight}`);
  return (await fetch(match[1])).arrayBuffer();
}

export type OgCardProps = {
  /** Mono uppercase label at the top of the card. */
  eyebrow?: string;
  /** Big display title (Archivo Black uppercase). */
  title: string;
  /** Optional italic Fraunces subtitle in ember. */
  subtitle?: string;
};

export async function renderOgImage({
  eyebrow = "Lava Design",
  title,
  subtitle,
}: OgCardProps) {
  const [archivoBlack, frauncesItalic] = await Promise.all([
    loadGoogleFont("Archivo Black", 400),
    loadGoogleFont("Fraunces", 400, true),
  ]);

  // Scale the title down for long strings so multi-line wrapping stays clean.
  const titleSize =
    title.length > 60 ? 64 : title.length > 36 ? 80 : 96;

  return new ImageResponse(
    (
      <div
        style={{
          background: COLORS.obsidian,
          backgroundImage: `radial-gradient(circle at 100% 0%, rgba(255,77,28,0.32), transparent 55%), radial-gradient(circle at 0% 100%, rgba(245,176,75,0.12), transparent 55%)`,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "80px",
          color: COLORS.ash,
          fontFamily: "'Archivo Black', sans-serif",
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: 22,
            letterSpacing: "0.32em",
            color: COLORS.ember,
            textTransform: "uppercase",
          }}
        >
          <span>{eyebrow}</span>
          <span style={{ color: COLORS.lava }}>·</span>
        </div>

        <div style={{ display: "flex", flexGrow: 1 }} />

        {/* Title + subtitle block */}
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              display: "flex",
              fontSize: titleSize,
              lineHeight: 1.0,
              letterSpacing: "-0.01em",
              textTransform: "uppercase",
              maxWidth: 1040,
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div
              style={{
                display: "flex",
                fontSize: 36,
                fontFamily: "'Fraunces', serif",
                fontStyle: "italic",
                fontWeight: 400,
                color: COLORS.ember,
                maxWidth: 1040,
              }}
            >
              {subtitle}
            </div>
          ) : null}
        </div>

        <div style={{ display: "flex", flexGrow: 1 }} />

        {/* Footer: site URL + brand dot */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 20,
            letterSpacing: "0.24em",
            color: COLORS.smoke,
            textTransform: "uppercase",
            borderTop: `1px solid ${COLORS.basalt}`,
            paddingTop: 24,
          }}
        >
          <span>lavadesign.us</span>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span>Lava</span>
            <span style={{ color: COLORS.lava }}>.</span>
          </span>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        {
          name: "Archivo Black",
          data: archivoBlack,
          weight: 400,
          style: "normal",
        },
        {
          name: "Fraunces",
          data: frauncesItalic,
          weight: 400,
          style: "italic",
        },
      ],
    },
  );
}
