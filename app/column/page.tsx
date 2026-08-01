import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "コラム一覧",
  description: "文字数・データサイズ・パスワード・QRコードなど、ツールにまつわる知識を解説するコラム集。",
};

const ARTICLES = [
  {
    href: "/column/url-encode/",
    title: "URLエンコードとは——「%20」の正体と、日本語URLが長くなる理由",
    desc: "URLの中の%付き文字列の意味と、スペースや日本語がそのまま使えない理由を解説します。",
  },
  {
    href: "/column/base64/",
    title: "Base64とは何か——なぜ画像を「文字」にできるのか",
    desc: "エンコードの仕組みと、暗号化との違い。サイズが1.33倍になる理由も解説します。",
  },
  {
    href: "/column/zenkaku-hankaku/",
    title: "全角と半角は何が違う？——「１２３」と「123」が別物として扱われる理由",
    desc: "文字コードの観点から、フォームで弾かれる理由・検索でヒットしない理由を解説します。",
  },
  {
    href: "/column/genkoyoshi/",
    title: "原稿用紙の文字数の数え方——句読点・小さい「っ」はどう数える？",
    desc: "400字詰め原稿用紙のルールと、Web上の文字数カウントとの違いを整理します。",
  },
  {
    href: "/column/gib-vs-gb/",
    title: "GiBとGBは別物——500GBのSSDが465にしか見えない理由",
    desc: "2進接頭辞と10進接頭辞の違いを、実例で分かりやすく解説します。",
  },
  {
    href: "/column/password-safety/",
    title: "安全なパスワードの作り方——長さ・文字種・パスフレーズ",
    desc: "推測されにくいパスワードの条件と、覚えやすさを両立する方法を解説します。",
  },
  {
    href: "/column/qr-mechanism/",
    title: "QRコードはなぜ一部が欠けても読めるのか——誤り訂正の仕組み",
    desc: "QRコードの構造と誤り訂正レベル（L/M/Q/H）の意味を解説します。",
  },
];

export default function ColumnIndexPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <h1 className="font-mincho text-3xl font-bold text-ink">コラム</h1>
      <p className="mt-4 text-[15px] text-ink-soft leading-relaxed">
        ツールにまつわる「そういえばどうなってるんだろう」を、運営者（現役エンジニア）が解説します。
      </p>

      <div className="mt-8 space-y-4">
        {ARTICLES.map((a) => (
          <Link
            key={a.href}
            href={a.href}
            className="block rounded-xl border border-line bg-paper p-5 hover:border-shu/50 transition-colors"
          >
            <h2 className="font-mincho text-lg font-bold text-ink leading-snug">{a.title}</h2>
            <p className="mt-2 text-sm text-ink-soft leading-relaxed">{a.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
