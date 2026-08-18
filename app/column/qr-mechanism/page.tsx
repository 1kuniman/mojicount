import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import ArticleMeta from "@/components/ArticleMeta";

export const metadata: Metadata = {
  title: "QRコードはなぜ一部が欠けても読めるのか——誤り訂正の仕組み",
  description:
    "QRコードの構造（切り出しシンボル・データ領域）と、誤り訂正レベルL/M/Q/Hの意味、ロゴ入りQRが成立する理由を解説します。",
  alternates: { canonical: "https://www.mojimojicount.com/column/qr-mechanism/" },
};

export default function Page() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-12">
      <p className="text-xs text-ink-faint font-mono tracking-widest">COLUMN</p>
      <Breadcrumb items={[{ name: "コラム", href: "/column/" }, { name: "QRコードはなぜ欠けても読めるのか" }]} />
      <ArticleMeta
        title="QRコードはなぜ一部が欠けても読めるのか——誤り訂正の仕組み"
        description="QRコードの構造（切り出しシンボル・データ領域）と、誤り訂正レベルL/M/Q/Hの意味、ロゴ入りQRが成立する理由を解説します。"
        path="/column/qr-mechanism/"
        publishedDate="2026-07-30"
      />
      <h1 className="mt-2 font-mincho text-2xl sm:text-3xl font-bold text-ink leading-snug">
        QRコードはなぜ一部が欠けても読めるのか——誤り訂正の仕組み
      </h1>

      <div className="mt-8 space-y-8 text-[15px] leading-loose text-ink-soft">
        <p>
          汚れたポスターのQRコードが普通に読めたり、真ん中にロゴが入ったQRコードが成立したりするのは、よく考えると不思議です。画像の一部が失われているのに、なぜ元のURLを復元できるのか。鍵は「誤り訂正」という仕組みにあります。
        </p>

        <section>
          <h2 className="font-mincho text-xl font-bold text-ink rule-shu">QRコードの基本構造</h2>
          <p className="mt-3">
            QRコードの三隅にある大きな四角は「切り出しシンボル（ファインダーパターン）」と呼ばれ、カメラがコードの位置と向きを見つけるための目印です。ここが隠れると読み取りは一気に難しくなります。残りの領域に、白黒のマス（モジュール）としてデータ本体と、後述する訂正用の符号が敷き詰められています。
          </p>
        </section>

        <section>
          <h2 className="font-mincho text-xl font-bold text-ink rule-shu">誤り訂正＝あらかじめ持っておく「予備の情報」</h2>
          <p className="mt-3">
            QRコードは、データ本体に加えて、リード・ソロモン符号という方式で作った訂正用の符号を一緒に埋め込んでいます。ざっくり言えば「一部が読めなくても残りから逆算できるように、冗長な情報を予め持たせておく」仕組みです。このおかげで、汚れや欠けで一部のマスが読めなくても、残った部分から元のデータを数学的に復元できます。
          </p>
          <p className="mt-3">
            どれだけ欠けに耐えられるかは、生成時に選ぶ誤り訂正レベルで決まります。Lは約7%、Mは約15%、Qは約25%、Hは約30%の欠損まで復元可能です。レベルを上げるほど頑丈になりますが、その分訂正用の符号が増えるため、同じ内容でもコードは細かく複雑になります。
          </p>
        </section>

        <section>
          <h2 className="font-mincho text-xl font-bold text-ink rule-shu">ロゴ入りQRが成立する理由</h2>
          <p className="mt-3">
            中央にロゴを重ねたQRコードは、実は「わざと一部を欠けさせている」状態です。誤り訂正の復元力の範囲内であれば、ロゴで隠れた部分は計算で補われるため、問題なく読み取れます。だからロゴを入れる場合は、復元力に余裕のあるレベルH（約30%）を選ぶのが定石です。逆に、画面表示だけで汚れの心配がないなら、レベルLやMでコードをシンプルに保つ方が読み取りやすくなります。
          </p>
          <p className="mt-3">
            当サイトの<Link href="/qr/" className="text-shu underline underline-offset-2">QRコード生成</Link>では、誤り訂正レベルの選択と中央へのロゴ埋め込みの両方に対応しています。生成はすべてブラウザ内で行われるため、社内URLのような公開したくない情報でも安心して使えます。
          </p>
        </section>
      </div>

      <p className="mt-10 text-sm">
        <Link href="/column/" className="text-shu underline underline-offset-2">← コラム一覧へ</Link>
      </p>
    </article>
  );
}
