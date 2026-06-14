import type { Metadata } from "next";
import DataSizeTool from "@/components/DataSizeTool";
import ToolHeader from "@/components/ToolHeader";
import Faq from "@/components/Faq";
import RelatedTools from "@/components/RelatedTools";

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
        lead="数値と単位を入力すると、バイトから KB・MB・GB・TB・PB（10進）と KiB・MiB・GiB・TiB・PiB（2進）まで、一度にまとめて換算します。各値はワンクリックでコピーできます。"
      />

      <DataSizeTool />

      <div className="max-w-2xl">
        <section className="mt-14">
          <h2 className="font-mincho text-xl font-bold text-ink rule-shu">使い方</h2>
          <ol className="mt-4 space-y-2 text-[15px] text-ink-soft leading-relaxed list-decimal pl-5">
            <li>数値を入力し、その単位を選びます。</li>
            <li>各単位への換算結果が一覧で表示されます。</li>
            <li>必要に応じて「2進（1024）」「10進（1000）」を切り替えます。</li>
          </ol>
        </section>

        <section className="mt-10">
          <h2 className="font-mincho text-xl font-bold text-ink rule-shu">2進（1024）と10進（1000）の違い</h2>
          <div className="mt-4 space-y-4 text-[15px] text-ink-soft leading-relaxed">
            <p>
              コンピュータの世界では、1KBを<span className="text-ink font-medium">1024バイト</span>として扱う方式（2進、厳密にはKiB・MiBなど）と、<span className="text-ink font-medium">1000バイト</span>として扱う方式（10進）があります。
            </p>
            <p>
              WindowsなどのOSがファイルサイズを表示するときは1024、ハードディスクやUSBメモリなどストレージ製品の容量表記は1000で計算されることが多く、これが「買った容量より少なく見える」原因にもなります。同じ数値でも方式によって結果が変わるため、用途に合わせて選んでください。
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="font-mincho text-xl font-bold text-ink rule-shu">こんなときに</h2>
          <ul className="mt-4 space-y-2 text-[15px] text-ink-soft leading-relaxed list-disc pl-5">
            <li>アップロード上限「10MBまで」に収まるかを確認する</li>
            <li>動画・画像ファイルの容量をGB単位で見積もる</li>
            <li>通信量・転送量をMB/GBで把握する</li>
            <li>ストレージ表記（1000基準）とOS表示（1024基準）のズレを確かめる</li>
          </ul>
        </section>
      </div>

      <div className="max-w-2xl">
        <Faq
          items={[
            {
              q: "1KBは1024バイトですか、1000バイトですか？",
              a: "両方の流儀があります。OSのファイルサイズ表示は1024、ストレージ製品の容量表記は1000で計算されることが多いです。本ツールはボタンで切り替えられます。",
            },
            {
              q: "KiB・MiBとは何ですか？",
              a: "1024を基準とする単位を明確に区別するための表記で、KiB（キビバイト）=1024B、MiB=1024KiB と定義されています。本ツールの「2進（1024）」がこれに相当します。",
            },
            {
              q: "どんな場面で使えますか？",
              a: "アップロード上限の確認、動画・画像ファイルの容量見積もり、回線速度や転送量の計算など、サイズ単位をまたいで比較したいときに便利です。",
            },
            {
              q: "とても大きな数や小さな数はどう表示されますか？",
              a: "桁が極端に大きい/小さい場合は指数表記（例: 1.2345e+9）で表示し、それ以外は最大6桁の小数で丸めて表示します。",
            },
            {
              q: "ビット(bit)とバイト(byte)は変換できますか？",
              a: "本ツールはバイト基準（B・KB・MB…）の換算です。1バイト=8ビットなので、ビットに直したい場合はバイト数を8倍してください。通信速度のMbpsなどはビット基準である点に注意します。",
            },
            {
              q: "アップロード上限が「10MB」のとき、何バイトですか？",
              a: "2進方式なら10MB=10,485,760バイト、10進方式なら10,000,000バイトです。システムによって判定方式が異なるため、上限ぎりぎりのときは少し余裕を持たせると安全です。",
            },
          ]}
        />
      </div>

      <RelatedTools currentSlug="datasize" />
    </div>
  );
}
