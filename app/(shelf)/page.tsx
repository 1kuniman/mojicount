import fs from "node:fs";
import path from "node:path";
import Script from "next/script";
import type { Metadata } from "next";
import { SITE_URL, SITE_NAME, SITE_DESC } from "@/lib/site";
import { BOOKS, bookPath } from "@/lib/books";

const TITLE = "宵の書架｜本棚から一冊選んで占う、無料の占い";

export const metadata: Metadata = {
  title: TITLE,
  description: SITE_DESC,
  alternates: { canonical: SITE_URL + "/" },
  openGraph: { title: TITLE, description: SITE_DESC, url: SITE_URL + "/", images: [{ url: "/og/default.jpg", width: 1200, height: 630, alt: SITE_NAME }] },
  twitter: { card: "summary_large_image", title: TITLE, description: SITE_DESC, images: ["/og/default.jpg"] },
};

const markup = fs.readFileSync(path.join(process.cwd(), "shoka-src/markup.html"), "utf8");

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL + "/",
  description: SITE_DESC,
  inLanguage: "ja",
  hasPart: BOOKS.map((b) => ({ "@type": "WebPage", name: `${b.title}（${b.art}）`, url: SITE_URL + bookPath(b) })),
};

export default function ShelfPage() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: markup }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Script src="/shoka/app.js" strategy="afterInteractive" />
    </>
  );
}
