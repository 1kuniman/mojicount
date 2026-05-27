import type { Metadata } from "next";
import Link from "next/link";
import PriceCompareTable from "../components/PriceCompareTable";
import AdSpace from "../components/AdSpace";
import MedicalDisclaimer from "../components/MedicalDisclaimer";

export const metadata: Metadata = {
  title: "料金比較｜医療脱毛・マンジャロの料金を一覧で比較【2026年5月】",
  description:
    "医療脱毛（全身・VIO・顔）とマンジャロ（医療ダイエット）の料金を、主要クリニックごとに一覧で比較。2026年5月時点の目安料金と料金相場の解説をまとめました。最新情報は各公式サイトでご確認ください。",
  alternates: { canonical: "/compare" },
};

export default function ComparePage() {
  return (
    <main className="flex-1">
      {/* ヘッダー */}
      <section className="text-center px-4 pt-12 pb-10 bg-gradient-to-b from-brand-light/25 to-transparent">
        <p className="inline-block text-xs font-semibold text-brand-deep bg-white/80 rounded-full px-3 py-1 mb-4 shadow-sm">
          2026年5月時点の目安
        </p>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-gray-800">
          料金比較
        </h1>
        <p className="mt-3 text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed">
          医療脱毛とマンジャロ（医療ダイエット）の料金を、主要クリニックごとに一覧で比較しました。
          料金はあくまで目安です。最新かつ正確な金額は各公式サイトでご確認ください。
        </p>
      </section>

      <div className="max-w-3xl mx-auto px-4 pb-16 space-y-12">
        {/* PR表示 */}
        <p className="text-xs text-gray-500 bg-brand-light/15 border border-brand-light/40 rounded-full px-4 py-2 text-center">
          ＜PR＞本ページにはアフィリエイト広告（プロモーション）が含まれます。「公式サイトへ」は各クリニック公式サイトへのリンクです。
        </p>

        {/* 医療脱毛 料金比較 */}
        <section id="datsumo" className="scroll-mt-20 space-y-4">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
              <span aria-hidden>✨</span> 医療脱毛の料金比較
            </h2>
            <p className="text-sm text-gray-700 leading-7">
              医療脱毛は、全身・VIO・顔のどこまでを含めるかで総額が大きく変わります。
              以下は女性向けの主要クリニックについて、全身5回・全身＋VIO5回・全身＋VIO＋顔5回の目安料金をまとめたものです。
            </p>
          </div>

          <PriceCompareTable type="datsumo" />

          <div className="rounded-2xl bg-brand-light/10 border border-brand-light/40 p-5">
            <h3 className="font-bold text-brand-deep mb-2 text-sm flex items-center gap-1.5">
              <span aria-hidden>📊</span> 医療脱毛の料金相場の見方
            </h3>
            <ul className="space-y-2 text-sm text-gray-700 leading-7">
              <li className="flex gap-2">
                <span className="text-brand flex-shrink-0">●</span>
                <span>
                  全身5回の相場は、業界中央値で約17万円前後が一つの目安です。
                  キャンペーンや学割を活用すると10万円前後から始められるクリニックもあります。
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-brand flex-shrink-0">●</span>
                <span>
                  VIOや顔を追加すると、毛が密集・産毛が多いぶん料金が上がる傾向があります。
                  「全身のみ」か「全身＋VIO＋顔」かで、総額は数万円〜10万円ほど変わります。
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-brand flex-shrink-0">●</span>
                <span>
                  表示価格のほかに、麻酔代・剃毛代・キャンセル料・追加照射費が別途かかる場合があります。
                  「総額でいくらになるか」をカウンセリングで必ず確認しましょう。
                </span>
              </li>
            </ul>
          </div>
        </section>

        <AdSpace label="スポンサーリンク" />

        {/* マンジャロ 料金比較 */}
        <section id="manjaro" className="scroll-mt-20 space-y-4">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
              <span aria-hidden>💉</span> マンジャロの料金比較
            </h2>
            <p className="text-sm text-gray-700 leading-7">
              マンジャロ（チルゼパチド）はダイエット目的では自由診療となり、用量（0.5mg・1mg・2.5mg）が上がるほど料金も高くなるのが一般的です。
              オンライン診療を中心に、クリニックによって料金体系が異なります。
            </p>
          </div>

          <PriceCompareTable type="manjaro" />

          <div className="rounded-2xl bg-brand-light/10 border border-brand-light/40 p-5">
            <h3 className="font-bold text-brand-deep mb-2 text-sm flex items-center gap-1.5">
              <span aria-hidden>📊</span> マンジャロの料金相場の見方
            </h3>
            <ul className="space-y-2 text-sm text-gray-700 leading-7">
              <li className="flex gap-2">
                <span className="text-brand flex-shrink-0">●</span>
                <span>
                  マンジャロは低用量（0.5mg）から始め、体調を見ながら段階的に用量を上げていくのが一般的です。
                  用量が上がるほど月額費用も上がるため、続けたときの総額を見積もっておきましょう。
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-brand flex-shrink-0">●</span>
                <span>
                  オンライン診療は通院不要で費用を抑えやすい一方、診察料・送料・採血の有無などで実質負担が変わります。
                  「極端に安い」場合は、診察やサポート体制を必ず確認してください。
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-brand flex-shrink-0">●</span>
                <span>
                  マンジャロは医療用医薬品です。個人輸入や通販での自己使用は重大なリスクがあるため避け、
                  必ず医師の診察を受けたうえで使用してください。
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* 関連リンク */}
        <div className="text-center">
          <Link
            href="/ranking"
            className="inline-block bg-gradient-to-r from-brand to-brand-deep text-white text-sm font-bold px-6 py-3 rounded-full shadow-sm hover:shadow-md transition-all"
          >
            おすすめランキングを見る →
          </Link>
        </div>

        <p className="text-xs text-gray-400 text-center leading-relaxed">
          ※料金は2026年5月時点の公開情報をもとにした目安です。プラン・キャンペーンにより変動するため、最新かつ正確な料金は各公式サイトでご確認ください。
          本ページの比較は編集部によるものであり、医療監修を受けたものではありません。
        </p>

        <MedicalDisclaimer variant="block" />
      </div>
    </main>
  );
}
