import type { Metadata } from "next";
import Link from "next/link";
import { primaryCategories } from "@/lib/categories";
import { getServicesByCategory } from "@/lib/services";
import RankingCard from "../components/RankingCard";
import AdSpace from "../components/AdSpace";
import MedicalDisclaimer from "../components/MedicalDisclaimer";

export const metadata: Metadata = {
  title: "美容医療おすすめランキング2026年",
  description:
    "医療ダイエット・脱毛・美容クリニックのおすすめランキングを編集部の比較基準でカテゴリ別に紹介。料金・サポート・口コミ傾向をふまえて、後悔しないサービス選びをサポートします。",
  alternates: { canonical: "/ranking" },
};

export default function RankingPage() {
  return (
    <main className="flex-1">
      {/* ヘッダー */}
      <section className="text-center px-4 pt-12 pb-10">
        <p className="inline-block text-xs font-semibold text-pink-500 bg-pink-50 border border-pink-100 rounded-full px-3 py-1 mb-4">
          2026年 最新版
        </p>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800">
          美容医療 おすすめランキング
        </h1>
        <p className="mt-3 text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed">
          医療ダイエット・脱毛・美容クリニックを、料金・診療体制・サポートなど編集部の比較基準でランキング。
          目的に合ったサービス選びの参考にしてください。
        </p>
      </section>

      <div className="max-w-3xl mx-auto px-4 pb-16 space-y-14">
        {/* 目立つ位置のアフィリエイトバナー枠 */}
        <AdSpace label="注目のサービス（PR）" variant="rect" />

        {/* カテゴリ内リンク */}
        <nav className="flex flex-wrap justify-center gap-2">
          {primaryCategories.map((c) => (
            <a
              key={c.slug}
              href={`#${c.slug}`}
              className="text-sm text-pink-600 bg-white border border-pink-200 rounded-full px-4 py-1.5 hover:bg-pink-50 transition-colors"
            >
              {c.emoji} {c.name}
            </a>
          ))}
        </nav>

        {primaryCategories.map((category, idx) => {
          const services = getServicesByCategory(category.slug);
          return (
            <section key={category.slug} id={category.slug} className="scroll-mt-20">
              <div className="mb-5">
                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-800 flex items-center gap-2">
                  <span>{category.emoji}</span>
                  {category.name}ランキング
                </h2>
                <p className="text-xs text-gray-500 mt-1">{category.description}</p>
              </div>

              <div className="space-y-5">
                {services.map((s) => (
                  <RankingCard key={s.id} service={s} />
                ))}
              </div>

              <div className="text-center mt-5">
                <Link
                  href={`/category/${category.slug}`}
                  className="text-sm font-medium text-pink-500 hover:text-pink-600"
                >
                  {category.name}の記事を読む →
                </Link>
              </div>

              {/* セクション間にもバナー枠 */}
              {idx < primaryCategories.length - 1 && (
                <div className="mt-10">
                  <AdSpace label="スポンサーリンク" />
                </div>
              )}
            </section>
          );
        })}

        <p className="text-xs text-gray-400 text-center leading-relaxed">
          ※ 本ランキングは編集部の比較基準に基づく構成例です。掲載名・料金・評価は実在の特定クリニックの公式情報ではありません。
          最新の正確な情報は各サービスの公式サイトでご確認ください。
        </p>

        <MedicalDisclaimer variant="block" />
      </div>
    </main>
  );
}
