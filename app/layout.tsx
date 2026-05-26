import type { Metadata } from "next";
import { Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import { siteUrl, siteName, siteDescription } from "@/lib/site";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const notoSerifJP = Noto_Serif_JP({
  variable: "--font-noto-serif-jp",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: "%s｜美容すすめ",
  },
  description: siteDescription,
  keywords: [
    "美容医療",
    "医療ダイエット",
    "マンジャロ",
    "医療脱毛",
    "脱毛サロン",
    "美容クリニック",
    "二重整形",
    "鼻整形",
    "美容皮膚科",
    "比較",
    "ランキング",
  ],
  authors: [{ name: "美容すすめ編集部" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: siteUrl,
    siteName,
    title: siteName,
    description: siteDescription,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    images: ["/og-image.png"],
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
    <html lang="ja" className={`${notoSansJP.variable} ${notoSerifJP.variable}`}>
      <head>
        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8297663476934392"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased text-gray-700">
        <SiteHeader />
        <div className="flex-1 flex flex-col">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
