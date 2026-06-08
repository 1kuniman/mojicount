import type { Metadata } from "next";
import EncodeTool from "@/components/EncodeTool";
import ToolHeader from "@/components/ToolHeader";
import Faq from "@/components/Faq";

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

      <section className="mt-14 max-w-2xl">
        <h2 className="font-mincho text-xl font-bold text-ink rule-shu">使い方</h2>
        <ol className="mt-4 space-y-2 text-[15px] text-ink-soft leading-relaxed list-decimal pl-5">
          <li>入力欄に文字列を貼り付けます。</li>
          <li>「Base64 エンコード」などのボタンを押すと、結果が表示されます。</li>
          <li>結果をコピーするか、入力欄に送って続けて変換できます。</li>
        </ol>
        <h2 className="font-mincho text-xl font-bold text-ink rule-shu mt-10">こんなときに</h2>
        <p className="mt-4 text-[15px] text-ink-soft leading-relaxed">
          設定ファイルやAPIのパラメータに含まれるBase64文字列の中身を確認したいとき、URLに含まれる日本語やパーセント表記をデコードして読みたいとき、逆に文字列を安全に受け渡すためにエンコードしたいときなどに使えます。
        </p>
      </section>

      <div className="max-w-2xl">
        <Faq
          items={[
            {
              q: "日本語はそのまま変換できますか？",
              a: "はい。内部でUTF-8として扱うため、日本語や絵文字を含む文字列もBase64・URLエンコードで正しく相互変換できます。",
            },
            {
              q: "デコードでエラーが出ます。",
              a: "入力がBase64やURLエンコードの形式として正しくない場合に表示されます。余分な空白や欠けた文字がないか確認してください。",
            },
            {
              q: "入力した文字列は送信されますか？",
              a: "いいえ。変換はすべてブラウザ内で実行され、サーバーへの送信や保存は行われません。",
            },
          ]}
        />
      </div>
    </div>
  );
}
