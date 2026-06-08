import type { Metadata } from "next";
import ConvertTool from "@/components/ConvertTool";
import Faq from "@/components/Faq";

export const metadata: Metadata = {
  title: "全角半角・ひらがなカタカナ変換",
  description:
    "全角⇄半角（英数・記号）、ひらがな⇄カタカナ、英字の大文字⇄小文字をワンクリックで相互変換。ブラウザ内で完結し、テキストは送信されません。",
};

export default function ConvertPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-10">
      <header className="mb-8">
        <h1 className="font-mincho text-3xl sm:text-4xl font-bold text-ink">全角半角・かな変換</h1>
        <p className="mt-3 text-ink-soft leading-relaxed max-w-2xl">
          全角と半角（英数字・記号）の相互変換、ひらがなとカタカナの相互変換、英字の大文字・小文字変換に対応。フォーム入力やデータ整理での表記ゆれをまとめて整えられます。
        </p>
      </header>

      <ConvertTool />

      <section className="mt-14 max-w-2xl">
        <h2 className="font-mincho text-xl font-bold text-ink rule-shu">使い方</h2>
        <ol className="mt-4 space-y-2 text-[15px] text-ink-soft leading-relaxed list-decimal pl-5">
          <li>「変換前」に文章を入力します。</li>
          <li>適用したい変換ボタンを押すと、「変換後」に結果が表示されます。</li>
          <li>結果をコピーするか、入力欄に送って別の変換を続けられます。</li>
        </ol>
        <h2 className="font-mincho text-xl font-bold text-ink rule-shu mt-10">こんなときに</h2>
        <p className="mt-4 text-[15px] text-ink-soft leading-relaxed">
          住所や氏名の全角・半角の統一、CSVやスプレッドシートに貼る前の表記ゆれの整理、フリガナのひらがな・カタカナ統一、英単語の大文字小文字そろえなどに使えます。
        </p>
      </section>

      <div className="max-w-2xl">
        <Faq
          items={[
            {
              q: "どの文字が全角半角の対象ですか？",
              a: "英数字と記号、スペースが対象です。全角→半角では全角の英数記号と全角スペースを半角に、半角→全角ではその逆に変換します。",
            },
            {
              q: "濁点付きのカタカナもひらがなに変換できますか？",
              a: "「ガ」「パ」などの清濁・半濁を含むかな（基本範囲）に対応しています。一部の特殊な記号は変換対象外です。",
            },
            {
              q: "変換した文章は保存されますか？",
              a: "保存も送信もされません。すべてブラウザ内で処理され、ページを離れるとデータは残りません。",
            },
          ]}
        />
      </div>
    </div>
  );
}
