import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "運営者情報",
  description: "もじもじツールの運営者情報とサイトの方針について。",
  alternates: { canonical: "https://www.mojimojicount.com/about/" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <h1 className="font-mincho text-3xl font-bold text-ink">運営者情報</h1>

      <div className="mt-8 space-y-10 text-[15px] leading-relaxed text-ink-soft">
        <section>
          <h2 className="font-mincho text-xl font-bold text-ink rule-shu">運営者</h2>
          <p className="mt-3">
            いっくん（<a href="https://x.com/ikkun_dev" target="_blank" rel="noopener noreferrer" className="text-shu underline underline-offset-2">@ikkun_dev</a>）。クラウドインフラを専門とする現役のエンジニアです。業務では Microsoft Azure を用いたシステムの設計・運用に携わっており、個人ではAIを活用したWebツールの開発・公開を行っています。開発の過程はXで発信しています。
          </p>
        </section>

        <section>
          <h2 className="font-mincho text-xl font-bold text-ink rule-shu">このサイトについて</h2>
          <p className="mt-3">
            「もじもじツール」は、文章まわりの細かな作業を素早く片づけるための無料ツール集です。文字数のカウント、全角半角の変換、テキストの整形、QRコードの生成など、運営者自身が日々の仕事や執筆で「あったら助かる」と感じたものを実装しています。
          </p>
          <p className="mt-3">
            一番のこだわりは、<strong className="text-ink">すべての処理をブラウザ内で完結させている</strong>ことです。入力した文章や生成したパスワードがサーバーへ送信されることはないため、公開前の原稿や業務のテキストも安心して扱えます。
          </p>
        </section>

        <section>
          <h2 className="font-mincho text-xl font-bold text-ink rule-shu">コンテンツの方針</h2>
          <p className="mt-3">
            ツールの解説やコラムは、運営者が技術者として確認できる事実に基づいて執筆しています。誤りを見つけた場合は<Link href="/contact/" className="text-shu underline underline-offset-2">お問い合わせ</Link>からご指摘いただけると助かります。
          </p>
        </section>
      </div>
    </div>
  );
}
