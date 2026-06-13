import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import ToastHost from "@/components/ToastHost";

const SITE_NAME = "もじもじツール";
const SITE_DESC =
  "文字数カウント・全角半角/かな変換・テキスト整形が、すべてブラウザ内で完結する無料の文章ツール集。入力したテキストはサーバーに送信されません。";
const SITE_URL = "https://mojimojicount.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | ブラウザ完結の無料文章ツール集`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESC,
  keywords: ["文字数カウント", "文字数カウンター", "全角半角変換", "ひらがなカタカナ変換", "テキスト整形", "重複行削除", "原稿用紙 換算", "SNS 文字数"],
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | ブラウザ完結の無料文章ツール集`,
    description: SITE_DESC,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | ブラウザ完結の無料文章ツール集`,
    description: SITE_DESC,
    images: ["/og.png"],
  },
  verification: { google: "cA-41LRoOTDuIN9IvgUqBxxrSkT5-mQsH1rlFLFp8sQ" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" data-theme="light">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('theme');if(t!=='dark'){t='light';}document.documentElement.setAttribute('data-theme',t);}catch(e){}})();",
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Shippori+Mincho:wght@500;600;700&family=Zen+Kaku+Gothic+New:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        {/* Google AdSense（審査・配信用） */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8297663476934392"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen">
        <div className="flex flex-col md:flex-row min-h-screen">
          <Sidebar />
          <div className="flex-1 min-w-0 flex flex-col">
            <main className="flex-1 w-full">{children}</main>
            <Footer />
          </div>
        </div>
        <ToastHost />
      </body>
    </html>
  );
}
