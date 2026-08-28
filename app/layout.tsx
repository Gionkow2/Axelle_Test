import type { Metadata, Viewport } from "next";
import { bricolage, cagliostro } from "@/lib/fonts";
import { site } from "@/lib/data/content";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://kokoro-organic-massage.example"),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: "Axelle Michiels" }],
  keywords: [
    "massage",
    "holistische massage",
    "Thaise massage",
    "oliemassage",
    "voetreflexologie",
    "biologische massage",
    "massage aan huis",
    "Kokoro",
  ],
  openGraph: {
    type: "website",
    locale: "nl_BE",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [
      {
        url: "/assets/kokoro/hero-massage.jpg",
        width: 2200,
        height: 1258,
        alt: "Rustige massage bij Kokoro Organic Massage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#264005",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nl-BE" className={`${cagliostro.variable} ${bricolage.variable}`}>
      <body>{children}</body>
    </html>
  );
}
