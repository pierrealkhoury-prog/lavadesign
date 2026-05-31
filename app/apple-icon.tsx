import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 } as const;
export const contentType = "image/png";

/**
 * Apple touch icon — Lava "L." wordmark on obsidian, ember dot.
 * Matches the nav lockup but rendered at icon scale.
 */
export default async function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0706",
          backgroundImage:
            "radial-gradient(circle at 100% 0%, rgba(255,77,28,0.32), transparent 55%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          fontSize: 116,
          fontWeight: 900,
          color: "#f4ede5",
          letterSpacing: "-0.04em",
        }}
      >
        <span style={{ display: "flex", alignItems: "baseline" }}>
          L<span style={{ color: "#ff4d1c" }}>.</span>
        </span>
      </div>
    ),
    { ...size },
  );
}
