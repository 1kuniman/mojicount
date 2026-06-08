import type { Metadata } from "next";
import CounterTool from "@/components/CounterTool";
import ToolHeader from "@/components/ToolHeader";
import Faq from "@/components/Faq";

export const metadata: Metadata = {
  title: "文字数カウント｜空白・原稿用紙・バイト数・SNS制限まで",
  description:
    "貼り付けた瞬間に文字数（空白込み/抜き）・行数・段落・原稿用紙換算・バイト数・文字種別・読了時間・SNS文字数制限を表示。ブラウザ内で完結し、テキストは送信されません。",
};

export default function CountPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-10">
      <ToolHeader
        slug="count"
        lead="文章を入力・貼り付けすると、文字数や行数だけでなく、原稿用紙の枚数、バイト数、文字種別、読了時間、主要SNSの文字数制限までまとめて確認できます。処理はすべてあなたのブラウザの中で行われます。"
      />

      <CounterTool />

      {/* 使い方 / 解説（AdSense的にも本文を確保） */}
      <section className="mt-14 max-w-2xl">
        <h2 className="font-mincho text-xl font-bold text-ink rule-shu">使い方</h2>
        <ol className="mt-4 space-y-2 text-[15px] text-ink-soft leading-relaxed list-decimal pl-5">
          <li>入力欄に文章を貼り付けるか、直接入力します。</li>
          <li>入力と同時に、右側と下部の数値が自動で更新されます。</li>
          <li>用途に応じて「空白込み」「空白抜き」「原稿用紙換算」などを確認します。</li>
        </ol>

        <h2 className="font-mincho text-xl font-bold text-ink rule-shu mt-10">こんなときに</h2>
        <p className="mt-4 text-[15px] text-ink-soft leading-relaxed">
          レポートや論文の「○○字以内」という指定の確認、Web記事や広告コピーの文字量調整、SNS投稿前の文字数オーバー防止、原稿用紙○枚という指定の換算などに使えます。文字種別や漢字比率は、読みやすさを整える目安になります。
        </p>
      </section>

      <div className="max-w-2xl">
        <Faq
          items={[
            {
              q: "入力した文章はどこかに送信されますか？",
              a: "いいえ。文字数の計算はすべてお使いのブラウザ内で実行され、サーバーに送信・保存されることはありません。下書きや未公開の原稿も安心して貼り付けられます。",
            },
            {
              q: "「空白込み」と「空白抜き」はどう違いますか？",
              a: "空白込みはスペースや全角スペース、改行を含めた総数です。空白抜きはそれらを除いた文字数で、本文の実質的なボリュームを把握したいときに使います。",
            },
            {
              q: "原稿用紙の枚数はどう数えていますか？",
              a: "一般的な400字詰め原稿用紙を基準に、空白・改行を除いた文字数を400で割って算出しています。あくまで目安としてご利用ください。",
            },
            {
              q: "Shift-JISのバイト数が他のツールと少し違います。",
              a: "本ツールのShift-JIS表示は、半角を1バイト・全角を2バイトとして数えた概算値です。正確なエンコード結果とは一部異なる場合があります。",
            },
            {
              q: "絵文字や環境依存文字は1文字として数えられますか？",
              a: "コードポイント単位で数えるため、絵文字やサロゲートペアの文字も基本的に1文字として扱います。",
            },
          ]}
        />
      </div>
    </div>
  );
}
