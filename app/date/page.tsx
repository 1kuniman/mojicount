import type { Metadata } from "next";
import DateTool from "@/components/DateTool";
import ToolHeader from "@/components/ToolHeader";
import Faq from "@/components/Faq";
import RelatedTools from "@/components/RelatedTools";
import RelatedColumns from "@/components/RelatedColumns";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "日付・時間計算（経過日数・何日後・曜日・Unix時間）",
  description:
    "2つの日付の経過日数、◯日後/◯日前の日付と曜日、Unix時間と日時の相互変換ができる無料ツール。ブラウザ内で完結します。",
};

export default function DatePage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-10">
      <Breadcrumb items={[{ name: "ツール一覧", href: "/" }, { name: "日付・時間計算" }]} />

      <ToolHeader
        slug="date"
        lead="2つの日付の間が何日あるか、ある日から◯日後／◯日前はいつか（曜日つき）、Unix時間と日時の変換——日付まわりの計算をまとめて行えます。うるう年や月またぎも自動で考慮します。"
      />

      <DateTool />

      <section className="mt-14 max-w-2xl">
        <h2 className="font-mincho text-xl font-bold text-ink rule-shu">使い方</h2>
        <ol className="mt-4 space-y-2 text-[15px] text-ink-soft leading-relaxed list-decimal pl-5">
          <li>上のタブで「期間」「何日後・何日前」「Unix時間」を切り替えます。</li>
          <li>日付や数値を入力すると、結果が自動で更新されます。</li>
          <li>期間計算では「両端を含める」かどうかを選べます。</li>
        </ol>

        <h2 className="font-mincho text-xl font-bold text-ink rule-shu mt-10">「両端を含める」とは</h2>
        <p className="mt-4 text-[15px] text-ink-soft leading-relaxed">
          たとえば契約期間や宿泊日数では、初日と最終日の両方を数える「両端入れ」と、片方だけ数える「片端入れ」で結果が1日変わります。請求やレンタルの日数計算では両端入れが使われることが多いので、用途に合わせて切り替えてください。
        </p>

        <h2 className="font-mincho text-xl font-bold text-ink rule-shu mt-10">こんなときに</h2>
        <p className="mt-4 text-[15px] text-ink-soft leading-relaxed">
          締め切りまであと何日か、記念日から何日経ったか、◯日後の提出期限は何曜日か、といった確認に使えます。Unix時間の変換は、ログやAPIのタイムスタンプを読みたいときに便利です。
        </p>
      </section>

      <div className="max-w-2xl">
        <Faq
          items={[
            {
              q: "うるう年や月をまたぐ計算も正しく出ますか？",
              a: "はい。2月29日を含む期間や、月・年をまたぐ計算も自動で考慮して算出します。",
            },
            {
              q: "「年月日」での表示はどう数えていますか？",
              a: "開始日から見て、何年何ヶ月何日かを暦どおりに分解して表示します。月の日数の違いも反映されます。",
            },
            {
              q: "Unix時間の基準は何ですか？",
              a: "1970年1月1日00:00:00（UTC）からの経過秒数です。日時への変換結果は、お使いの端末のタイムゾーンで表示されます。",
            },
            {
              q: "営業日（土日祝を除く）も計算できますか？",
              a: "現在は暦日ベースの計算のみに対応しています。祝日や土日を除いた営業日計算には対応していません。",
            },
            {
              q: "入力した日付は送信されますか？",
              a: "いいえ。計算はすべてブラウザ内で行われ、サーバーへの送信や保存はありません。",
            },
          ]}
        />
      </div>

      <RelatedColumns currentSlug="date" />
      <RelatedTools currentSlug="date" />
    </div>
  );
}
