import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import ArticleMeta from "@/components/ArticleMeta";

export const metadata: Metadata = {
  title: "全角と半角は何が違う？——「１２３」と「123」が別物として扱われる理由",
  description:
    "全角と半角の違いをコンピュータの文字コードの観点から解説。フォームで弾かれる理由、検索でヒットしない理由が分かります。",
};

export default function Page() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-12">
      <p className="text-xs text-ink-faint font-mono tracking-widest">COLUMN</p>
      <Breadcrumb items={[{ name: "コラム", href: "/column/" }, { name: "全角と半角は何が違う？" }]} />
      <ArticleMeta
        title="全角と半角は何が違う？——「１２３」と「123」が別物として扱われる理由"
        description="全角と半角の違いをコンピュータの文字コードの観点から解説。フォームで弾かれる理由、検索でヒットしない理由が分かります。"
        path="/column/zenkaku-hankaku/"
        publishedDate="2026-07-31"
      />
      <h1 className="mt-2 font-mincho text-2xl sm:text-3xl font-bold text-ink leading-snug">
        全角と半角は何が違う？——「１２３」と「123」が別物として扱われる理由
      </h1>

      <div className="mt-8 space-y-8 text-[15px] leading-loose text-ink-soft">
        <p>
          電話番号を入力したら「半角で入力してください」と弾かれる。Excelで検索しても、全角の「１２３」は半角の「123」でヒットしない。見た目はほとんど同じなのに、なぜコンピュータはこの2つを区別するのでしょうか。
        </p>

        <section>
          <h2 className="font-mincho text-xl font-bold text-ink rule-shu">見た目が似ているだけの「別の文字」</h2>
          <p className="mt-3">
            答えはシンプルで、全角の「１」と半角の「1」は、コンピュータ内部ではまったく別の文字だからです。文字にはそれぞれ番号（文字コード）が割り当てられていて、半角の「1」はU+0031、全角の「１」はU+FF11という別々の番号を持っています。人間には同じ「いち」に見えても、機械にとっては「あ」と「か」くらい違う存在です。
          </p>
          <p className="mt-3">
            全角文字が生まれたのは、日本語の組版の都合です。漢字やかなは正方形のマスに収まるようにデザインされており、その中に英数字を混ぜたとき幅を揃えるために「漢字と同じ幅の英数字」が用意されました。これが全角英数字の正体です。
          </p>
        </section>

        <section>
          <h2 className="font-mincho text-xl font-bold text-ink rule-shu">なぜフォームで弾かれるのか</h2>
          <p className="mt-3">
            システムの内部では、電話番号や郵便番号を「半角数字であること」を前提に検証・保存していることが多いためです。全角の「０９０」を受け付けると、検索・照合・集計のたびに変換が必要になり、不具合の温床になります。だから入力の段階で半角に統一してもらう設計が定番になっています。逆に、宛名印刷など「見た目の整い」を重視する場面では全角が指定されることもあります。どちらが正しいというより、用途によって求められる形が違うのです。
          </p>
        </section>

        <section>
          <h2 className="font-mincho text-xl font-bold text-ink rule-shu">カタカナにも全角と半角がある</h2>
          <p className="mt-3">
            「ア」と「ｱ」のように、カタカナにも全角・半角の区別があります。半角カタカナは昔の限られた通信環境で生まれた名残で、今でも銀行の振込名義などで使われています。ただし濁点が別の文字になる（「ガ」が「ｶﾞ」の2文字になる）など扱いにクセがあり、文字数のカウントや検索でズレの原因になりがちです。
          </p>
        </section>

        <section>
          <h2 className="font-mincho text-xl font-bold text-ink rule-shu">一括で変換するには</h2>
          <p className="mt-3">
            住所録の整理やデータクレンジングで「全角半角が混ざったリスト」を揃えたいときは、当サイトの<Link href="/convert/" className="text-shu underline underline-offset-2">全角半角・かな変換</Link>が使えます。英数字・記号の全角⇄半角、ひらがな⇄カタカナをワンクリックで一括変換でき、処理はすべてブラウザ内で完結するため、顧客名簿のようなデータでも外部に送信される心配がありません。
          </p>
        </section>
      </div>

      <p className="mt-10 text-sm">
        <Link href="/column/" className="text-shu underline underline-offset-2">← コラム一覧へ</Link>
      </p>
    </article>
  );
}
