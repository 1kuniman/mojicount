import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SITE_URL, SITE_NAME, SITE_DESC } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  verification: { google: "cA-41LRoOTDuIN9IvgUqBxxrSkT5-mQsH1rlFLFp8sQ" },
  robots: { index: true, follow: true },
  openGraph: { type: "website", locale: "ja_JP", siteName: SITE_NAME, description: SITE_DESC },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#16110d" };

export default function ShelfLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Yuji+Syuku&family=Zen+Old+Mincho:wght@400;600&family=Klee+One:wght@400;600&family=IM+Fell+English:ital@0;1&family=IM+Fell+English+SC&display=swap"
        />
        <link rel="stylesheet" href="/shoka/shoka.css" />
        <link rel="preload" as="image" href="/assets/shelf.jpg" />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
