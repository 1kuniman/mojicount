import type { Metadata } from "next";
import DataSizeTool from "@/components/DataSizeTool";
import ToolHeader from "@/components/ToolHeader";
import Faq from "@/components/Faq";

export const metadata: Metadata = {
  title: "データサイズ変換（B・KB・MB・GB・TB）",
  description:
    "バイト・KB・MB・GB・TB・PB をまとめて相互変換。1KB=1024 と 1000 の両方式に対応。ブラウザ内で完結する無料のデータ容量計算ツール。",
};

export default function DataSizePage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-10">
      <ToolHeader
        slug="datasize"
        lead="数値と単位を入力すると、バイト・KB・MB・GB・TB・PB を一度にまとめて換算します。1KB=1024バイト（2進）と1KB=1000バイト（10進）の両方式を切り替えられます。"
      />

      <DataSizeTool />

      <section className="mt-14 max-w-2xl">
        <h2 className="font-mincho text-xl font-bold text-ink rule-shu">使い方</h2>
        <ol className="mt-4 space-y-2 text-[15px] text-ink-soft leading-relaxed list-decimal pl-5">
          <li>数値を入力し、その単位を選びます。</li>
          <li>各単位への換算結果が一覧で表示されます。</li>
          <li>必要に応じて「2進（1024）」「10進（1000）」を切り替えます。</li>
        </ol>
        <h2 className="font-mincho text-xl font-bold text-ink rule-shu mt-10">2進と10進の違い</h2>
        <p className="mt-4 text-[15px] text-ink-soft leading-relaxed">
          コンピュータの世界では 1KB を 1024 バイトとして扱う方式（2進・厳密にはKiB等）と、ストレージの表記などで使われる 1KB＝1000 バイトの方式（10進）があります。同じ数値でも方式によって結果が変わるため、用途に合わせて選んでください。
        </p>
      </section>

      <div className="max-w-2xl">
        <Faq
          items={[
            {
              q: "1KBは1024バイトですか、1000バイトですか？",
              a: "両方の流儀があります。OSのファイルサイズ表示は1024、ストレージ製品の容量表記は1000で計算されることが多いです。本ツールはボタンで切り替えられます。",
            },
            {
              q: "どんな場面で使えますか？",
              a: "アップロード上限の確認、動画・画像ファイルの容量見積もり、回線速度や転送量の計算など、サイズ単位をまたいで比較したいときに便利です。",
            },
            {
              q: "とても大きな数や小さな数はどう表示されますか？",
              a: "桁が極端に大きい/小さい場合は指数表記（例: 1.2345e+9）で表示し、それ以外は最大6桁の小数で丸めて表示します。",
            },
          ]}
        />
      </div>
    </div>
  );
}
