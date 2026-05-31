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
    default: "Lava Design — Engineering, Architecture & Design Studio",
    template: "%s · Lava Design",
  },
  description:
    "Lava Design is an engineering and architecture studio in Houston and Orlando, delivering permit-ready MEP, structural, and civil design — part of a multidisciplinary practice spanning 2D & 3D, branding, and event activations.",
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
