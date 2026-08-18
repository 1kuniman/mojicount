import type { Metadata } from "next";
import CounterTool from "@/components/CounterTool";
import ToolHeader from "@/components/ToolHeader";
import Faq from "@/components/Faq";
import RelatedTools from "@/components/RelatedTools";
import RelatedColumns from "@/components/RelatedColumns";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "文字数カウント｜空白・原稿用紙・バイト数・SNS制限",
  description:
    "貼り付けた瞬間に文字数（空白込み/抜き）・行数・段落・原稿用紙換算・バイト数・文字種別・読了時間・SNS文字数制限を表示。ブラウザ内で完結し、テキストは送信されません。",
  alternates: { canonical: "https://www.mojimojicount.com/count/" },
};

export default function CountPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-10">
      <Breadcrumb items={[{ name: "ツール一覧", href: "/" }, { name: "文字数カウント" }]} />

      <ToolHeader
        slug="count"
        lead="文章を入力・貼り付けすると、文字数や行数だけでなく、原稿用紙の枚数、バイト数、文字種別、読了時間、主要SNSの文字数制限までまとめて確認できます。処理はすべてあなたのブラウザの中で行われます。"
      />

      <CounterTool />

      <div className="max-w-2xl">
        <section className="mt-14">
          <h2 className="font-mincho text-xl font-bold text-ink rule-shu">使い方</h2>
          <ol className="mt-4 space-y-2 text-[15px] text-ink-soft leading-relaxed list-decimal pl-5">
            <li>入力欄に文章を貼り付けるか、直接入力します。</li>
            <li>入力と同時に、右側と下部の数値が自動で更新されます。</li>
            <li>用途に応じて「空白込み」「空白抜き」「原稿用紙換算」などを確認します。</li>
          </ol>
        </section>

        <section className="mt-10">
          <h2 className="font-mincho text-xl font-bold text-ink rule-shu">それぞれの数値の見方</h2>
          <div className="mt-4 space-y-4 text-[15px] text-ink-soft leading-relaxed">
            <p>
              <span className="text-ink font-medium">空白込み／空白抜き</span>：空白込みはスペース・全角スペース・改行をすべて含む総数です。提出規定が「空白を含む」場合はこちらを見ます。空白抜きは本文の実質的な分量で、原稿のボリューム感を把握したいときに使います。
            </p>
            <p>
              <span className="text-ink font-medium">原稿用紙の枚数</span>：400字詰めを基準に、空白・改行を除いた文字数を400で割って算出します。「原稿用紙○枚程度」という指定の目安になります。
            </p>
            <p>
              <span className="text-ink font-medium">バイト数</span>：UTF-8・UTF-16・Shift-JIS（概算）で表示します。文字数制限ではなくバイト数制限があるフォーム（古いシステムなど）への入力時に役立ちます。
            </p>
            <p>
              <span className="text-ink font-medium">文字種別・漢字比率</span>：ひらがな・カタカナ・漢字・英数字などの内訳を表示します。漢字比率は読みやすさの目安で、一般的な文章では3割前後が読みやすいとされます。
            </p>
            <p>
              <span className="text-ink font-medium">SNS文字数チェック</span>：X・Instagram など主要SNSの上限に対する残り文字数を表示します。Xは全角を2文字として数える加重方式に近い概算です。
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="font-mincho text-xl font-bold text-ink rule-shu">こんなときに</h2>
          <ul className="mt-4 space-y-2 text-[15px] text-ink-soft leading-relaxed list-disc pl-5">
            <li>レポートや論文の「2000字以内」「800字以上」といった字数指定を満たしているか確認する</li>
            <li>Web記事や広告コピーの文字量を整える、メタディスクリプションを120字前後に収める</li>
            <li>SNS投稿前に文字数オーバーを防ぐ（特にXの140字相当）</li>
            <li>原稿用紙○枚という課題の分量を逆算する</li>
          </ul>
        </section>
      </div>

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
              q: "句読点や記号は文字数に含まれますか？",
              a: "含まれます。「。」「、」「！」などの記号も1文字として数えます。スペースや改行のみ、空白抜きの数値から除外されます。",
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

      <RelatedColumns currentSlug="count" />
      <RelatedTools currentSlug="count" />
    </div>
  );
}
