import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "GiBとGBは別物——500GBのSSDが465にしか見えない理由",
  description:
    "KB/MB/GB（10進）とKiB/MiB/GiB（2進）の違い、ストレージの容量表記が小さく見える理由を解説します。",
};

export default function Page() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-12">
      <p className="text-xs text-ink-faint font-mono tracking-widest">COLUMN</p>
      <Breadcrumb items={[{ name: "コラム", href: "/column/" }, { name: "GiBとGBは別物" }]} />
      <h1 className="mt-2 font-mincho text-2xl sm:text-3xl font-bold text-ink leading-snug">
        GiBとGBは別物——500GBのSSDが465にしか見えない理由
      </h1>

      <div className="mt-8 space-y-8 text-[15px] leading-loose text-ink-soft">
        <p>
          500GBのSSDを買ってPCにつないだら、465GBしか表示されない。スマホの128GBも、実際に使える量はそれより少なく見える。「損してるのでは？」と感じたことがある人は多いはずですが、これは不良品でも詐欺でもなく、単位の数え方が2種類あることが原因です。
        </p>

        <section>
          <h2 className="font-mincho text-xl font-bold text-ink rule-shu">10進のGBと2進のGiB</h2>
          <p className="mt-3">
            ストレージメーカーは「1GB = 10億バイト（1000×1000×1000）」という10進の定義で容量を表記します。一方、WindowsなどのOSは伝統的に「1024×1024×1024バイト」を1単位として容量を計算します。この1024系の単位は、正式にはGiB（ギビバイト）と呼びます。KiB・MiB・GiB・TiBの「i」は binary（2進）の意味です。
          </p>
          <p className="mt-3">
            500GB（10進）は500,000,000,000バイトです。これを1024系で割っていくと約465.7GiBになります。つまり「500GBが465に減った」のではなく、同じバイト数を違う単位で表示しているだけ、というのが正体です。
          </p>
        </section>

        <section>
          <h2 className="font-mincho text-xl font-bold text-ink rule-shu">エンジニアでも混同しやすい</h2>
          <p className="mt-3">
            厄介なのは、現場では今でも「1KB=1024バイト」のつもりでKBと書く文化が残っていることです。クラウドの料金表やメモリの仕様書ではGiB表記が使われる一方、一般向けの製品はGB表記が基本です。ファイル転送の見積もりやディスク設計で桁がズレる事故は、たいていこの混同から起きます。単位に「i」が付いているかどうかを見る癖をつけるだけで、かなり防げます。
          </p>
        </section>

        <section>
          <h2 className="font-mincho text-xl font-bold text-ink rule-shu">両方の単位で一括換算する</h2>
          <p className="mt-3">
            当サイトの<Link href="/datasize/" className="text-shu underline underline-offset-2">データサイズ変換</Link>は、この2系統を正しく区別して、1つの値をbitからKB・MB・GB・TB・PB（10進）とKiB・MiB・GiB・TiB・PiB（2進）へ同時に換算します。「1GiBは何MB？」のような換算を一目で確認でき、各値はワンクリックでコピーできます。
          </p>
        </section>
      </div>

      <p className="mt-10 text-sm">
        <Link href="/column/" className="text-shu underline underline-offset-2">← コラム一覧へ</Link>
      </p>
    </article>
  );
}
