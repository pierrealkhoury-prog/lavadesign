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

export const metadata: Metadata = {
  title: {
    default: "Lava — Multidisciplinary Design Studio",
    template: "%s · Lava",
  },
  description:
    "Lava is a multidisciplinary design studio working across 2D & 3D, interiors & architecture, events & activations, and engineering.",
  metadataBase: new URL("https://lavadesign.us"),
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
