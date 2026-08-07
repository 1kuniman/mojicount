import type { Metadata } from "next";
import ConvertTool from "@/components/ConvertTool";
import ToolHeader from "@/components/ToolHeader";
import Faq from "@/components/Faq";
import RelatedTools from "@/components/RelatedTools";
import RelatedColumns from "@/components/RelatedColumns";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "全角半角・ひらがなカタカナ変換",
  description:
    "全角⇄半角（英数・記号）、ひらがな⇄カタカナ、英字の大文字⇄小文字をワンクリックで相互変換。ブラウザ内で完結し、テキストは送信されません。",
};

export default function ConvertPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-10">
      <Breadcrumb items={[{ name: "ツール一覧", href: "/" }, { name: "全角半角・かな変換" }]} />

      <ToolHeader
        slug="convert"
        lead="全角と半角（英数字・記号）の相互変換、ひらがなとカタカナの相互変換、英字の大文字・小文字変換に対応。フォーム入力やデータ整理での表記ゆれをまとめて整えられます。"
      />

      <ConvertTool />

      <div className="max-w-2xl">
        <section className="mt-14">
          <h2 className="font-mincho text-xl font-bold text-ink rule-shu">使い方</h2>
          <ol className="mt-4 space-y-2 text-[15px] text-ink-soft leading-relaxed list-decimal pl-5">
            <li>「変換前」に文章を入力します。</li>
            <li>適用したい変換ボタンを押すと、「変換後」に結果が表示されます。</li>
            <li>結果をコピーするか、入力欄に送って別の変換を続けられます。</li>
          </ol>
        </section>

        <section className="mt-10">
          <h2 className="font-mincho text-xl font-bold text-ink rule-shu">変換の種類</h2>
          <div className="mt-4 space-y-4 text-[15px] text-ink-soft leading-relaxed">
            <p>
              <span className="text-ink font-medium">全角 → 半角 / 半角 → 全角</span>：英数字・記号・スペースを相互に変換します。「ＡＢＣ１２３」を「ABC123」にしたり、その逆を行います。
            </p>
            <p>
              <span className="text-ink font-medium">ひらがな → カタカナ / カタカナ → ひらがな</span>：かなを相互変換します。フリガナの表記をそろえたいときに便利です。
            </p>
            <p>
              <span className="text-ink font-medium">大文字 → 小文字 / 小文字 → 大文字</span>：英字の大文字・小文字を一括で切り替えます。
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="font-mincho text-xl font-bold text-ink rule-shu">こんなときに</h2>
          <ul className="mt-4 space-y-2 text-[15px] text-ink-soft leading-relaxed list-disc pl-5">
            <li>住所・氏名・電話番号の全角/半角を統一してから提出・登録する</li>
            <li>スプレッドシートやCSVに貼る前に、表記ゆれをそろえる</li>
            <li>フリガナをカタカナ（またはひらがな）に統一する</li>
            <li>英単語・型番の大文字小文字をまとめてそろえる</li>
          </ul>
        </section>
      </div>

      <div className="max-w-2xl">
        <Faq
          items={[
            {
              q: "どの文字が全角半角の対象ですか？",
              a: "英数字と記号、スペースが対象です。全角→半角では全角の英数記号と全角スペースを半角に、半角→全角ではその逆に変換します。漢字やかなは変換されません。",
            },
            {
              q: "濁点付きのカタカナもひらがなに変換できますか？",
              a: "「ガ」「パ」などの清濁・半濁を含むかな（基本範囲）に対応しています。一部の特殊な記号は変換対象外です。",
            },
            {
              q: "複数の変換を続けて行えますか？",
              a: "はい。結果を入力欄に送るボタンで、変換後のテキストを次の変換にそのまま使えます。たとえば半角化したあとに大文字化する、といった連続処理ができます。",
            },
            {
              q: "変換した文章は保存されますか？",
              a: "保存も送信もされません。すべてブラウザ内で処理され、ページを離れるとデータは残りません。",
            },
          ]}
        />
      </div>

      <RelatedColumns currentSlug="convert" />
      <RelatedTools currentSlug="convert" />
    </div>
  );
}
