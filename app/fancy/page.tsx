import type { Metadata } from "next";
import FancyTool from "@/components/FancyTool";
import ToolHeader from "@/components/ToolHeader";
import Faq from "@/components/Faq";
import RelatedTools from "@/components/RelatedTools";
import RelatedColumns from "@/components/RelatedColumns";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "おしゃれ文字・フォント変換（SNS用の装飾文字）",
  description:
    "入力した文字を筆記体・袋文字・丸囲み・全角など13種の装飾フォントに一括変換。SNSのbioや投稿にそのままコピペできる無料ツール。ブラウザ内で完結します。",
};

export default function FancyPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-10">
      <Breadcrumb items={[{ name: "ツール一覧", href: "/" }, { name: "おしゃれ文字・フォント変換" }]} />

      <ToolHeader
        slug="fancy"
        lead="入力した英数字を、筆記体・袋文字・丸囲み・全角・スモールキャップスなど13種類の装飾フォントに一気に変換します。気に入ったものをコピーして、SNSのプロフィールや投稿、ユーザー名にそのまま貼り付けられます。"
      />

      <FancyTool />

      <section className="mt-14 max-w-2xl">
        <h2 className="font-mincho text-xl font-bold text-ink rule-shu">使い方</h2>
        <ol className="mt-4 space-y-2 text-[15px] text-ink-soft leading-relaxed list-decimal pl-5">
          <li>入力欄に文字（英数字）を打ち込みます。</li>
          <li>各スタイルの変換結果がすぐに一覧表示されます。</li>
          <li>使いたいスタイルの「コピー」を押して、貼り付けます。</li>
        </ol>

        <h2 className="font-mincho text-xl font-bold text-ink rule-shu mt-10">仕組み（豆知識）</h2>
        <p className="mt-4 text-[15px] text-ink-soft leading-relaxed">
          これは画像ではなく、Unicodeに定義された「数式用の英字」や「丸囲み文字」などの“文字そのもの”に置き換えています。だからコピペでどこにでも貼れます。フォントを変えているのではなく別の文字に変換しているため、環境によっては一部が表示されない場合があります。
        </p>

        <h2 className="font-mincho text-xl font-bold text-ink rule-shu mt-10">こんなときに</h2>
        <p className="mt-4 text-[15px] text-ink-soft leading-relaxed">
          SNSのプロフィール名や自己紹介を目立たせたいとき、投稿の見出しを装飾したいとき、ハンドルネームに個性を出したいときなどに使えます。
        </p>
      </section>

      <div className="max-w-2xl">
        <Faq
          items={[
            {
              q: "日本語（ひらがな・漢字）も変換できますか？",
              a: "装飾フォントは主に英数字向けのため、日本語はそのまま表示されます（全角変換や取り消し線・下線などは日本語にも適用されます）。",
            },
            {
              q: "コピーした文字が一部表示されません。",
              a: "貼り付け先のアプリやフォントが、その装飾文字（Unicode）に対応していない場合があります。別のスタイルを試すか、対応している場所でご利用ください。",
            },
            {
              q: "Instagramやプロフィールに使えますか？",
              a: "多くのSNSは装飾文字の表示に対応しています。ただしサービスによっては一部のスタイルが表示されないことがあるため、貼り付けてから確認するのがおすすめです。",
            },
            {
              q: "入力した文字は送信されますか？",
              a: "いいえ。変換はすべてブラウザ内で行われ、サーバーへの送信や保存はありません。",
            },
          ]}
        />
      </div>

      <RelatedColumns currentSlug="fancy" />
      <RelatedTools currentSlug="fancy" />
    </div>
  );
}
