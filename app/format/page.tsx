import type { Metadata } from "next";
import FormatTool from "@/components/FormatTool";
import ToolHeader from "@/components/ToolHeader";
import Faq from "@/components/Faq";
import RelatedTools from "@/components/RelatedTools";
import RelatedColumns from "@/components/RelatedColumns";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "テキスト整形｜重複行削除・空行削除・並び替え",
  description:
    "重複行の削除、空行の削除、各行の前後トリム、連続スペースの圧縮、行の並び替えを組み合わせて一括クリーンアップ。ブラウザ内で完結し、テキストは送信されません。",
  alternates: { canonical: "https://www.mojimojicount.com/format/" },
};

export default function FormatPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-10">
      <Breadcrumb items={[{ name: "ツール一覧", href: "/" }, { name: "テキスト整形" }]} />

      <ToolHeader
        slug="format"
        lead="リストやログ、コピペで崩れた文章を、重複行の削除・空行の削除・前後の空白除去・連続スペースの圧縮・並び替えで一気に整えます。チェックを組み合わせると、入力と同時に結果へ反映されます。"
      />

      <FormatTool />

      <div className="max-w-2xl">
        <section className="mt-14">
          <h2 className="font-mincho text-xl font-bold text-ink rule-shu">使い方</h2>
          <ol className="mt-4 space-y-2 text-[15px] text-ink-soft leading-relaxed list-decimal pl-5">
            <li>適用したい整形オプションにチェックを入れます。</li>
            <li>入力欄にテキストを貼り付けると、結果が自動で更新されます。</li>
            <li>結果をコピーして利用します。</li>
          </ol>
        </section>

        <section className="mt-10">
          <h2 className="font-mincho text-xl font-bold text-ink rule-shu">各オプションと処理の順番</h2>
          <p className="mt-4 text-[15px] text-ink-soft leading-relaxed">
            処理は次の順番で適用されます：各行のトリム → 連続スペースの圧縮 → 空行の削除 → 重複行の削除 → 並び替え。重複の判定は、トリムなどを適用したあとの行を基準に行うため、前後の空白だけが違う行も同じ行として扱えます。
          </p>
          <ul className="mt-4 space-y-2 text-[15px] text-ink-soft leading-relaxed list-disc pl-5">
            <li><span className="text-ink font-medium">各行の前後の空白を削除</span>：行頭・行末の余分なスペースを取り除きます。</li>
            <li><span className="text-ink font-medium">連続する空白を1つに</span>：途中の連続スペースを1つにまとめます。</li>
            <li><span className="text-ink font-medium">空行を削除</span>：何も書かれていない行を詰めます。</li>
            <li><span className="text-ink font-medium">重複した行を削除</span>：同じ行は最初の1つだけ残します。</li>
            <li><span className="text-ink font-medium">並び替え</span>：行を昇順・降順に整列します。</li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="font-mincho text-xl font-bold text-ink rule-shu">こんなときに</h2>
          <ul className="mt-4 space-y-2 text-[15px] text-ink-soft leading-relaxed list-disc pl-5">
            <li>メールアドレスやキーワードのリストから重複を取り除く</li>
            <li>コピペで入り込んだ余分な空行・空白を一掃する</li>
            <li>項目を五十音順・アルファベット順に並べ替える</li>
            <li>名簿やタグの一覧を整理して、そのまま貼り付けられる形にする</li>
          </ul>
        </section>
      </div>

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
              q: "重複削除で、残るのは最初と最後どちらの行ですか？",
              a: "最初に現れた行が残り、2回目以降の同じ行が削除されます。元の並び順は保たれます（並び替えを併用しない場合）。",
            },
            {
              q: "大量の行でも使えますか？",
              a: "ブラウザ内で処理するため、極端に巨大なテキストでは動作が重くなることがあります。通常のリストや原稿であれば問題なく使えます。",
            },
          ]}
        />
      </div>

      <RelatedColumns currentSlug="format" />
      <RelatedTools currentSlug="format" />
    </div>
  );
}
