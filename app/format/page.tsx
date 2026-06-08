import type { Metadata } from "next";
import FormatTool from "@/components/FormatTool";
import ToolHeader from "@/components/ToolHeader";
import Faq from "@/components/Faq";

export const metadata: Metadata = {
  title: "テキスト整形｜重複行削除・空行削除・並び替え",
  description:
    "重複行の削除、空行の削除、各行の前後トリム、連続スペースの圧縮、行の並び替えを組み合わせて一括クリーンアップ。ブラウザ内で完結し、テキストは送信されません。",
};

export default function FormatPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-10">
      <ToolHeader
        slug="format"
        lead="リストやログ、コピペで崩れた文章を、重複行の削除・空行の削除・前後の空白除去・連続スペースの圧縮・並び替えで一気に整えます。チェックを組み合わせると、入力と同時に結果へ反映されます。"
      />

      <FormatTool />

      <section className="mt-14 max-w-2xl">
        <h2 className="font-mincho text-xl font-bold text-ink rule-shu">使い方</h2>
        <ol className="mt-4 space-y-2 text-[15px] text-ink-soft leading-relaxed list-decimal pl-5">
          <li>適用したい整形オプションにチェックを入れます。</li>
          <li>入力欄にテキストを貼り付けると、結果が自動で更新されます。</li>
          <li>結果をコピーして利用します。</li>
        </ol>
        <h2 className="font-mincho text-xl font-bold text-ink rule-shu mt-10">こんなときに</h2>
        <p className="mt-4 text-[15px] text-ink-soft leading-relaxed">
          メールアドレスやキーワードのリストから重複を取り除く、コピペで入った余分な空行や空白を消す、項目を五十音順・アルファベット順に並べ替える、といった下準備に向いています。
        </p>
      </section>

      <div className="max-w-2xl">
        <Faq
          items={[
            {
              q: "処理の順番は決まっていますか？",
              a: "トリム → 連続スペースの圧縮 → 空行削除 → 重複削除 → 並び替え の順で適用されます。重複削除は、トリム後の行を基準に判定します。",
            },
            {
              q: "並び替えの基準は何ですか？",
              a: "日本語ロケールに基づく文字列比較で、昇順・降順に並べ替えます。数字混じりの行も文字列として比較されます。",
            },
            {
              q: "大量の行でも使えますか？",
              a: "ブラウザ内で処理するため、極端に巨大なテキストでは動作が重くなることがあります。通常のリストや原稿であれば問題なく使えます。",
            },
          ]}
        />
      </div>
    </div>
  );
}
