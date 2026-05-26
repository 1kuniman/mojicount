import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/lib/articles";
import { categories } from "@/lib/categories";
import ArticleCard from "../components/ArticleCard";
import AdSpace from "../components/AdSpace";

export const metadata: Metadata = {
  title: "記事一覧",
  description:
    "美容すすめの記事一覧。医療ダイエット・脱毛・美容クリニックに関する比較記事やランキング、初心者ガイドをまとめています。",
  alternates: { canonical: "/articles" },
};

export default function ArticlesPage() {
  return (
    <main className="flex-1">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <header className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800">記事一覧</h1>
          <p className="mt-2 text-sm text-gray-500">
            医療ダイエット・脱毛・美容クリニックの比較記事をまとめています。
          </p>
        </header>

        {/* カテゴリショートカット */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className="text-sm text-pink-600 bg-pink-50 border border-pink-100 rounded-full px-4 py-1.5 hover:bg-pink-100 transition-colors"
            >
              {c.emoji} {c.name}
            </Link>
          ))}
        </div>

        <div className="mb-8">
          <AdSpace label="スポンサーリンク" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </div>
    </main>
  );
}
