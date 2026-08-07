import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "文字化けはなぜ起きるのか——「縺薙」や「?????」の正体",
  description:
    "文字化けの原因である文字コードの不一致を解説。UTF-8とShift_JISの違い、CSVをExcelで開くと化ける理由と対処法も紹介します。",
};

export default function Page() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-12">
      <p className="text-xs text-ink-faint font-mono tracking-widest">COLUMN</p>
      <Breadcrumb items={[{ name: "コラム", href: "/column/" }, { name: "文字化けはなぜ起きるのか" }]} />
      <h1 className="mt-2 font-mincho text-2xl sm:text-3xl font-bold text-ink leading-snug">
        文字化けはなぜ起きるのか——「縺薙」や「?????」の正体
      </h1>

      <div className="mt-8 space-y-8 text-[15px] leading-loose text-ink-soft">
        <p>
          CSVをExcelで開いたら日本語が「縺薙ｓ縺ｫ縺｡縺ｯ」になっていた。海外のサービスに日本語を入力したら「?????」に変わってしまった。この現象が文字化けで、原因はほぼ1つに集約されます。書いたときと読むときで、使っている「文字の対応表」が違うのです。
        </p>

        <section>
          <h2 className="font-mincho text-xl font-bold text-ink rule-shu">文字コードは「番号と文字の対応表」</h2>
          <p className="mt-3">
            コンピュータは文字そのものを保存しているわけではなく、文字に割り当てられた番号を保存しています。その番号と文字の対応関係を決めたルールが文字コードです。日本語環境では、世界標準のUTF-8と、Windowsで長く使われてきたShift_JIS（CP932）が代表的です。
          </p>
          <p className="mt-3">
            同じ「こんにちは」でも、UTF-8とShift_JISでは保存される番号の並びがまったく違います。UTF-8で書かれたデータをShift_JISだと思って読むと、番号の区切り方も対応表も食い違うため、まったく別の漢字の羅列に化けます。「縺」で始まる独特な化け方は、UTF-8のデータをShift_JISとして解釈したときの典型的なパターンです。
          </p>
        </section>

        <section>
          <h2 className="font-mincho text-xl font-bold text-ink rule-shu">「?」になるのは別の理由</h2>
          <p className="mt-3">
            一方、日本語がすべて「?」や「□」になる場合は、変換先の文字コードにその文字が存在しないケースです。日本語を扱えない文字コードへ変換しようとして、表現できない文字が代替記号に置き換えられた状態です。この場合は元データが失われているため、後から復元できないことがほとんどです。化けたものを直すより、元データを正しい設定で扱い直す方が確実です。
          </p>
        </section>

        <section>
          <h2 className="font-mincho text-xl font-bold text-ink rule-shu">CSVをExcelで開くと化ける理由</h2>
          <p className="mt-3">
            多くのシステムはCSVをUTF-8で出力しますが、Excelは環境によってCSVをShift_JISとして開こうとします。この食い違いが、日本語CSVの文字化けの定番パターンです。対処としては、Excelの「データ」タブからテキストファイルとして読み込み、文字コードにUTF-8を指定して開く方法が確実です。あるいは、出力側でBOM付きUTF-8にすると、ExcelがUTF-8だと判断してくれます。
          </p>
        </section>

        <section>
          <h2 className="font-mincho text-xl font-bold text-ink rule-shu">文字の扱いを確かめたいときは</h2>
          <p className="mt-3">
            文字コードそのものの変換はテキストエディタ（VS Codeなど）の機能が確実ですが、全角と半角が混在していたり、余分な空白や重複行が混ざっていたりするデータの整理には、当サイトの<Link href="/convert/" className="text-shu underline underline-offset-2">全角半角・かな変換</Link>や<Link href="/format/" className="text-shu underline underline-offset-2">テキスト整形</Link>が使えます。どちらもブラウザ内で処理されるため、業務データでも外部に送信される心配はありません。
          </p>
        </section>
      </div>

      <p className="mt-10 text-sm">
        <Link href="/column/" className="text-shu underline underline-offset-2">← コラム一覧へ</Link>
      </p>
    </article>
  );
}
