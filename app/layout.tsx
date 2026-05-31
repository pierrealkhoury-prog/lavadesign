import type { Metadata } from "next";
import { Archivo, Fraunces, Space_Mono } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const SITE_DESCRIPTION =
  "Lava Design is an engineering and architecture studio in Houston and Orlando, delivering permit-ready MEP, structural, and civil design — part of a multidisciplinary practice spanning 2D & 3D, branding, and event activations.";

export const metadata: Metadata = {
  title: {
    default: "Lava Design — Engineering, Architecture & Design Studio",
    template: "%s · Lava Design",
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL("https://lavadesign.us"),
  applicationName: "Lava Design",
  authors: [{ name: "Lava Design" }],
  generator: "Next.js",
  openGraph: {
    type: "website",
    siteName: "Lava Design",
    locale: "en_US",
    title: {
      default: "Lava Design — Engineering, Architecture & Design Studio",
      template: "%s · Lava Design",
    },
    description: SITE_DESCRIPTION,
    url: "/",
    // The actual image comes from app/opengraph-image.tsx (file convention) —
    // each segment can override it by adding its own opengraph-image.tsx.
  },
  twitter: {
    card: "summary_large_image",
    title: {
      default: "Lava Design — Engineering, Architecture & Design Studio",
      template: "%s · Lava Design",
    },
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${fraunces.variable} ${spaceMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-obsidian text-ash antialiased">
        <SiteNav />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
