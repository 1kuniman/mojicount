import type { Metadata } from "next";
import ColorTool from "@/components/ColorTool";
import ToolHeader from "@/components/ToolHeader";
import Faq from "@/components/Faq";
import RelatedTools from "@/components/RelatedTools";

export const metadata: Metadata = {
  title: "カラーコード変換（HEX⇄RGB⇄HSL・プレビュー）",
  description:
    "HEX・RGB・HSL を相互変換できる無料ツール。カラーピッカーとプレビュー付きで、CSSやデザインの色指定に。ブラウザ内で完結します。",
};

export default function ColorPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-10">
      <ToolHeader
        slug="color"
        lead="色をHEX・RGB・HSLの各表記で相互に確認・変換できます。カラーピッカーで選ぶか、HEXコードを入力すると、プレビューと各形式の値がすぐに表示されます。CSSやデザインの色指定にどうぞ。"
      />
      <ColorTool />

      <section className="mt-14 max-w-2xl">
        <h2 className="font-mincho text-xl font-bold text-ink rule-shu">使い方</h2>
        <ol className="mt-4 space-y-2 text-[15px] text-ink-soft leading-relaxed list-decimal pl-5">
          <li>カラーピッカーで色を選ぶか、HEXコードを入力します。</li>
          <li>HEX・RGB・HSL の各値が表示されます。</li>
          <li>使いたい形式の「コピー」を押して、CSSなどに貼り付けます。</li>
        </ol>

        <h2 className="font-mincho text-xl font-bold text-ink rule-shu mt-10">HEX・RGB・HSLの違い</h2>
        <p className="mt-4 text-[15px] text-ink-soft leading-relaxed">
          HEXは <code className="font-mono text-sm">#RRGGBB</code> の16進数表記でWebで最も一般的。RGBは赤・緑・青を0〜255で表す形式。HSLは色相・彩度・明度で表すため、「同じ色味で少し明るく」といった調整が直感的に行えます。用途に応じて使い分けると便利です。
        </p>
      </section>

      <div className="max-w-2xl">
        <Faq
          items={[
            { q: "3桁のHEX（#c84など）も使えますか？", a: "はい。#RGB の短縮表記も認識し、6桁に展開して各形式へ変換します。" },
            { q: "入力した値は送信されますか？", a: "いいえ。変換はすべてブラウザ内で行われ、サーバーへの送信や保存はありません。" },
            { q: "プレビューの文字色が変わるのはなぜ？", a: "背景色に対して読みやすいよう、明るさに応じて文字色を自動で黒／白に切り替えています。" },
            { q: "透明度（アルファ）には対応していますか？", a: "現在はHEX・RGB・HSLの不透明色のみに対応しています。" },
          ]}
        />
      </div>

      <RelatedTools currentSlug="color" />
    </div>
  );
}
