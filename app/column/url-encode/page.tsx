import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import ArticleMeta from "@/components/ArticleMeta";

export const metadata: Metadata = {
  title: "URLエンコードとは——「%20」の正体と、日本語URLが長くなる理由",
  description:
    "URLの中の%20や%E3%81%82の意味を解説。なぜスペースや日本語はそのままURLに入れられないのか、仕組みから分かります。",
  alternates: { canonical: "https://www.mojimojicount.com/column/url-encode/" },
};

export default function Page() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-12">
      <p className="text-xs text-ink-faint font-mono tracking-widest">COLUMN</p>
      <Breadcrumb items={[{ name: "コラム", href: "/column/" }, { name: "URLエンコードとは" }]} />
      <ArticleMeta
        title="URLエンコードとは——「%20」の正体と、日本語URLが長くなる理由"
        description="URLの中の%20や%E3%81%82の意味を解説。なぜスペースや日本語はそのままURLに入れられないのか、仕組みから分かります。"
        path="/column/url-encode/"
        publishedDate="2026-08-01"
      />
      <h1 className="mt-2 font-mincho text-2xl sm:text-3xl font-bold text-ink leading-snug">
        URLエンコードとは——「%20」の正体と、日本語URLが長くなる理由
      </h1>

      <div className="mt-8 space-y-8 text-[15px] leading-loose text-ink-soft">
        <p>
          リンクをコピーしたら「%E3%81%82%E3%81%84」のような長い文字列になっていた。検索結果のURLに「%20」が混ざっている。誰もが一度は見たことのあるこの「%付きの文字列」の正体が、URLエンコード（パーセントエンコーディング）です。
        </p>

        <section>
          <h2 className="font-mincho text-xl font-bold text-ink rule-shu">URLに使える文字は決まっている</h2>
          <p className="mt-3">
            URLの仕様では、そのまま使える文字が半角の英数字と一部の記号（-、_、.、~など）に限られています。スペースや日本語、「?」「&」「=」のようにURLの中で特別な役割を持つ記号は、そのまま置くと「どこまでがアドレスで、どこからがデータか」が曖昧になってしまいます。
          </p>
          <p className="mt-3">
            そこで、使えない文字は「%＋16進数の番号」に置き換えるルールになっています。スペースは番号が16進で20なので「%20」に、「あ」はUTF-8で3バイト（E3 81 82）なので「%E3%81%82」になります。日本語のURLをコピーすると急に長くなるのは、1文字が3つの%付きコードに展開されるからです。
          </p>
        </section>

        <section>
          <h2 className="font-mincho text-xl font-bold text-ink rule-shu">「+」がスペースになることもある</h2>
          <p className="mt-3">
            検索フォームから送られたURLでは、スペースが「%20」ではなく「+」になっていることがあります。これはフォーム送信の古い慣習によるもので、同じスペースでも文脈によって表現が2通りあるのが紛らわしいところです。プログラムでURLを組み立てるときにこの違いを意識しないと、「+」がスペースに化ける・化けないのバグにつながります。
          </p>
        </section>

        <section>
          <h2 className="font-mincho text-xl font-bold text-ink rule-shu">エンコードとデコードを試してみる</h2>
          <p className="mt-3">
            仕組みは、実際に変換してみるのが一番早く腹落ちします。当サイトの<Link href="/encode/" className="text-shu underline underline-offset-2">エンコード・デコード</Link>では、任意のテキストのURLエンコードとデコード（元に戻す変換）をブラウザ内で試せます。「こんにちは」がどんな%列になるか、逆に長い%列が何と書いてあるのかを、その場で確認できます。入力はサーバーに送信されないため、業務のURLでも安心です。
          </p>
        </section>
      </div>

      <p className="mt-10 text-sm">
        <Link href="/column/" className="text-shu underline underline-offset-2">← コラム一覧へ</Link>
      </p>
    </article>
  );
}
