import type { Metadata } from "next";
import QRTool from "@/components/QRTool";
import ToolHeader from "@/components/ToolHeader";
import Faq from "@/components/Faq";
import RelatedTools from "@/components/RelatedTools";
import RelatedColumns from "@/components/RelatedColumns";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "QRコード生成（URL・テキスト → PNG/SVG保存）",
  description:
    "URLやテキストからQRコードを無料で生成。色・サイズ・誤り訂正レベルを調整してPNG/SVGで保存できます。ブラウザ内で完結します。",
};

export default function QrPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-10">
      <Breadcrumb items={[{ name: "ツール一覧", href: "/" }, { name: "QRコード生成" }]} />

      <ToolHeader
        slug="qr"
        lead="URLや任意のテキストからQRコードを生成します。色やサイズ、誤り訂正レベルを変えて、PNGまたはSVGで保存できます。生成はすべてブラウザ内で行われ、入力内容は送信されません。"
      />
      <QRTool />

      <section className="mt-14 max-w-2xl">
        <h2 className="font-mincho text-xl font-bold text-ink rule-shu">使い方</h2>
        <ol className="mt-4 space-y-2 text-[15px] text-ink-soft leading-relaxed list-decimal pl-5">
          <li>URLまたはテキストを入力します。</li>
          <li>サイズ・色・誤り訂正レベルを必要に応じて調整します。</li>
          <li>「PNGで保存」または「SVGで保存」でダウンロードします。</li>
        </ol>
        <h2 className="font-mincho text-xl font-bold text-ink rule-shu mt-10">誤り訂正レベルとは</h2>
        <p className="mt-4 text-[15px] text-ink-soft leading-relaxed">
          QRコードは一部が汚れたり隠れても読み取れるよう、誤り訂正の強さをL→M→Q→Hの順で選べます。高いほど復元力が上がりますが、その分コードが複雑になります。印刷やロゴ重ねをするならQ〜H、画面表示中心ならL〜Mが目安です。
        </p>
      </section>

      <div className="max-w-2xl">
        <Faq
          items={[
            { q: "入力したURLは送信されますか？", a: "いいえ。QRの生成はすべてブラウザ内で行われ、サーバーへの送信や保存はありません。" },
            { q: "PNGとSVGはどう使い分けますか？", a: "画面やSNS用途ならPNG、印刷や拡大しても劣化させたくない場合は、ベクター形式のSVGがおすすめです。" },
            { q: "色を変えても読み取れますか？", a: "前景と背景のコントラストが十分あれば読み取れます。淡い色同士にすると読み取りにくくなるため注意してください。" },
            { q: "長い文字も入れられますか？", a: "文字数が多いほどコードが複雑になり、限界を超えると生成できません。URL短縮などで短くするのがおすすめです。" },
          ]}
        />
      </div>

      <RelatedColumns currentSlug="qr" />
      <RelatedTools currentSlug="qr" />
    </div>
  );
}
