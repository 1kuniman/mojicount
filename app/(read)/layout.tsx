import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";
import { SITE_URL, SITE_NAME, SITE_DESC } from "@/lib/site";
import "./read.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: `%s｜${SITE_NAME}` },
  description: SITE_DESC,
  verification: { google: "cA-41LRoOTDuIN9IvgUqBxxrSkT5-mQsH1rlFLFp8sQ" },
  robots: { index: true, follow: true },
  openGraph: { type: "article", locale: "ja_JP", siteName: SITE_NAME },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#16110d" };

export default function ReadLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Yuji+Syuku&family=Zen+Old+Mincho:wght@400;600&family=Klee+One:wght@400;600&display=swap"
        />
        {/* 共有リンク（#r-…）で来た人は本棚で友だちの本をひらく */}
        <script dangerouslySetInnerHTML={{ __html: "if(/^#r-[a-z]+-[a-z0-9-]+$/.test(location.hash))location.replace('/'+location.hash);" }} />
      </head>
      <body>
        <header className="rbar">
          <Link className="brand" href="/">宵の書架</Link>
          <nav aria-label="サイト">
            <Link href="/">本棚へ</Link>
            <Link href="/2027/">2027年の運勢</Link>
            <Link href="/mokuroku/">本の目録</Link>
          </nav>
        </header>
        {children}
        <footer className="rfoot">
          <span className="brand">宵の書架</span>
          <nav aria-label="サイト情報">
            <Link href="/mokuroku/">本の目録</Link>
            <Link href="/2027/">2027年の運勢</Link>
            <Link href="/about/">この書架について</Link>
            <Link href="/privacy/">プライバシーポリシー</Link>
            <Link href="/contact/">お問い合わせ</Link>
          </nav>
          占いの結果は、いまの自分をふり返るための読みものです。大切な判断は、ご自身の考えを大切に。
          <small className="amzn">Amazonのアソシエイトとして、宵の書架は適格販売により収入を得ています。</small>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
