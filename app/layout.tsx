import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mojicount.example.com";

export const metadata: Metadata = {
  title: "文字数カウンター - 無料テキスト解析ツール",
  description:
    "テキストの文字数・単語数・行数を瞬時に計測できる無料のオンラインツールです。コピー機能付きでスマホにも対応。ブログ・SNS・レポートなどの文字数確認にご活用ください。",
  keywords: ["文字数カウンター", "文字数カウント", "文字数確認", "テキスト解析", "無料ツール"],
  authors: [{ name: "文字数カウンター" }],
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: siteUrl,
    siteName: "文字数カウンター - 無料テキスト解析ツール",
    title: "文字数カウンター - 無料テキスト解析ツール",
    description:
      "テキストの文字数・単語数・行数を瞬時に計測できる無料のオンラインツールです。コピー機能付きでスマホにも対応。",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "文字数カウンター - 無料テキスト解析ツール",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "文字数カウンター - 無料テキスト解析ツール",
    description:
      "テキストの文字数・単語数・行数を瞬時に計測できる無料のオンラインツールです。",
    images: [`${siteUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "9hsoM-4jQQ8ck8mOn39f6Z5K9A5QZOZzd_AdUX24QPM",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${notoSansJP.variable}`}>
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8297663476934392"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="min-h-screen bg-gray-50 text-gray-800 antialiased">
        {children}
      </body>
    </html>
  );
}
