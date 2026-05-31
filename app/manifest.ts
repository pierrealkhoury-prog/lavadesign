import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Lava Design",
    short_name: "Lava Design",
    description:
      "Engineering, architecture, and design studio with offices in Houston, Orlando, and Dubai.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0706",
    theme_color: "#ff4d1c",
    icons: [
      { src: "/favicon.ico", sizes: "256x256", type: "image/x-icon" },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
