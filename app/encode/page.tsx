import type { Metadata } from "next";
import EncodeTool from "@/components/EncodeTool";
import ToolHeader from "@/components/ToolHeader";
import Faq from "@/components/Faq";
import RelatedTools from "@/components/RelatedTools";

export const metadata: Metadata = {
  title: "Base64・URLエンコード/デコード",
  description:
    "Base64とURL（パーセント）エンコードの相互変換ツール。日本語（UTF-8）もそのまま正しく変換。ブラウザ内で完結し、入力はサーバーに送信されません。",
};

export default function EncodePage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-10">
      <ToolHeader
        slug="encode"
        lead="Base64 と URL（パーセント）エンコードの相互変換ができます。日本語を含む文字列も UTF-8 として正しく処理します。処理はすべてブラウザ内で行われます。"
      />

      <EncodeTool />

      <div className="max-w-2xl">
        <section className="mt-14">
          <h2 className="font-mincho text-xl font-bold text-ink rule-shu">使い方</h2>
          <ol className="mt-4 space-y-2 text-[15px] text-ink-soft leading-relaxed list-decimal pl-5">
            <li>入力欄に文字列を貼り付けます。</li>
            <li>「Base64 エンコード」などのボタンを押すと、結果が表示されます。</li>
            <li>結果をコピーするか、入力欄に送って続けて変換できます。</li>
          </ol>
        </section>

        <section className="mt-10">
          <h2 className="font-mincho text-xl font-bold text-ink rule-shu">Base64・URLエンコードとは</h2>
          <div className="mt-4 space-y-4 text-[15px] text-ink-soft leading-relaxed">
            <p>
              <span className="text-ink font-medium">Base64</span>は、画像やバイナリ、任意の文字列を、英数字と一部の記号だけで表せる形に変換する方式です。メールやJSON、設定ファイルの中でデータを安全に受け渡すときに使われます。見た目は意味のない文字列ですが、デコードすると元に戻ります。
            </p>
            <p>
              <span className="text-ink font-medium">URLエンコード（パーセントエンコード）</span>は、URLに使えない文字（日本語・スペース・記号など）を「%E3%81%82」のような形に置き換える方式です。クエリパラメータに日本語を含めるときなどに使われます。
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="font-mincho text-xl font-bold text-ink rule-shu">こんなときに</h2>
          <ul className="mt-4 space-y-2 text-[15px] text-ink-soft leading-relaxed list-disc pl-5">
            <li>設定ファイルやAPIレスポンスに含まれるBase64文字列の中身を確認する</li>
            <li>URLに含まれる日本語やパーセント表記をデコードして読む</li>
            <li>文字列を安全に受け渡すためにエンコードする</li>
            <li>エンコード→デコードを往復させて、文字化けの原因を切り分ける</li>
          </ul>
        </section>
      </div>

      <div className="max-w-2xl">
        <Faq
          items={[
            {
              q: "日本語はそのまま変換できますか？",
              a: "はい。内部でUTF-8として扱うため、日本語や絵文字を含む文字列もBase64・URLエンコードで正しく相互変換できます。",
            },
            {
              q: "Base64とURLエンコードは何が違いますか？",
              a: "Base64は任意のデータを英数字中心の文字列に変換する方式、URLエンコードはURLで使えない文字だけを%表記に置き換える方式です。目的が異なります。",
            },
            {
              q: "デコードでエラーが出ます。",
              a: "入力がBase64やURLエンコードの形式として正しくない場合に表示されます。余分な空白や欠けた文字がないか確認してください。",
            },
            {
              q: "入力した文字列は送信されますか？",
              a: "いいえ。変換はすべてブラウザ内で実行され、サーバーへの送信や保存は行われません。",
            },
            {
              q: "Base64とURLエンコードはどう使い分けますか？",
              a: "URLエンコードはアドレスやクエリに文字を安全に含めるための変換で、日本語や記号が「%E3%…」の形になります。Base64は任意のデータを英数字中心の文字列で表す変換で、設定値やトークン、データの埋め込みなどに使われます。",
            },
            {
              q: "画像やファイルもBase64にできますか？",
              a: "本ツールはテキストの変換に対応しています。画像などのファイルをBase64化したい場合は、ファイルを読み込む専用のツールが必要です。",
            },
          ]}
        />
      </div>

      <RelatedTools currentSlug="encode" />
    </div>
  );
}
