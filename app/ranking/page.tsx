import type { Metadata } from "next";
import { services } from "@/lib/services";
import RankingTabs from "../components/RankingTabs";
import AdSpace from "../components/AdSpace";
import MedicalDisclaimer from "../components/MedicalDisclaimer";

export const metadata: Metadata = {
  title: "美容医療おすすめランキング2026年",
  description:
    "医療ダイエット・脱毛・美容クリニックのおすすめランキングを編集部の比較基準でカテゴリ別に紹介。星評価・おすすめポイント・料金の目安・こんな人におすすめをまとめ、後悔しないサービス選びをサポートします。",
  alternates: { canonical: "/ranking" },
};

export default function RankingPage() {
  return (
    <main className="flex-1">
      {/* ヘッダー */}
      <section className="text-center px-4 pt-12 pb-10 bg-gradient-to-b from-brand-light/25 to-transparent">
        <p className="inline-block text-xs font-semibold text-brand-deep bg-white/80 rounded-full px-3 py-1 mb-4 shadow-sm">
          2026年 最新版
        </p>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-gray-800">
          美容医療 おすすめランキング
        </h1>
        <p className="mt-3 text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed">
          医療ダイエット・脱毛・美容クリニックを、星評価・料金・サポートなど編集部の比較基準でランキング。
          カテゴリタブから、目的に合ったサービスを探せます。
        </p>
      </section>

      <div className="max-w-3xl mx-auto px-4 pb-16 space-y-10">
        {/* 目立つ位置のアフィリエイトバナー枠 */}
        <AdSpace label="注目のサービス（PR）" variant="rect" />

        <RankingTabs services={services} />

        <p className="text-xs text-gray-400 text-center leading-relaxed">
          ※ 本ランキングの★評価は編集部の独自評価であり、第三者の集計レビューではありません。料金は目安で、プラン・キャンペーンにより変動します。
          最新かつ正確な料金は各公式サイトでご確認ください。「無料カウンセリングを予約」は各クリニック公式サイトへのリンク（PR）です。
        </p>

        <AdSpace label="スポンサーリンク" />

        <MedicalDisclaimer variant="block" />
      </div>
    </main>
  );
}
