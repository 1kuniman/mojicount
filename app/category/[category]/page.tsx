import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, getCategory } from "@/lib/categories";
import { getArticlesByCategory } from "@/lib/articles";
import { getServicesByCategory } from "@/lib/services";
import type { CategorySlug } from "@/lib/types";
import ArticleCard from "@/app/components/ArticleCard";
import RankingCard from "@/app/components/RankingCard";
import AdSpace from "@/app/components/AdSpace";
import MedicalDisclaimer from "@/app/components/MedicalDisclaimer";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategory(category as CategorySlug);
  if (!cat) return { title: "カテゴリが見つかりません" };

  return {
    title: `${cat.name}の記事一覧`,
    description: cat.description,
    alternates: { canonical: `/category/${cat.slug}` },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = getCategory(category as CategorySlug);
  if (!cat) notFound();

  const categoryArticles = getArticlesByCategory(cat.slug);
  const services = getServicesByCategory(cat.slug);

  return (
    <main className="flex-1">
      {/* カテゴリヘッダー */}
      <section className="text-center px-4 pt-12 pb-10 bg-gradient-to-b from-brand-light/25 to-transparent">
        <div className="text-5xl mb-3">{cat.emoji}</div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-gray-800">{cat.name}</h1>
        <p className="mt-3 text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed">
          {cat.description}
        </p>
      </section>

      <div className="max-w-5xl mx-auto px-4 pb-16 space-y-14">
        <AdSpace label="スポンサーリンク" />

        {/* 記事一覧 */}
        <section>
          <h2 className="font-serif text-xl font-bold text-gray-800 mb-5">{cat.name}の記事</h2>
          {categoryArticles.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryArticles.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">準備中です。</p>
          )}
        </section>

        {/* カテゴリ内ランキング */}
        {services.length > 0 && (
          <section>
            <div className="flex items-end justify-between mb-5">
              <h2 className="font-serif text-xl font-bold text-gray-800">{cat.name}おすすめ</h2>
              <Link href="/ranking" className="text-sm font-medium text-brand-deep hover:text-brand">
                ランキングを見る →
              </Link>
            </div>
            <div className="space-y-5">
              {services.map((s) => (
                <RankingCard key={s.id} service={s} />
              ))}
            </div>
            <p className="mt-3 text-xs text-gray-400 text-center">
              ※ 掲載内容は編集部による比較構成例です。最新情報は各公式サイトをご確認ください。
            </p>
          </section>
        )}

        <MedicalDisclaimer variant="block" />
      </div>
    </main>
  );
}
