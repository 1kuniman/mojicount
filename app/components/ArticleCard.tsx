import Link from "next/link";
import type { Article } from "@/lib/types";
import { getCategory } from "@/lib/categories";

export default function ArticleCard({
  article,
  rank,
}: {
  article: Article;
  rank?: number;
}) {
  const category = getCategory(article.category);

  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group flex flex-col h-full rounded-2xl border border-pink-100 bg-white overflow-hidden hover:border-pink-300 hover:shadow-md transition-all"
    >
      {/* サムネ代わりのグラデーション帯 */}
      <div className="relative h-28 bg-gradient-to-br from-pink-100 via-rose-100 to-pink-50 flex items-center justify-center">
        <span className="text-4xl opacity-80">{category?.emoji ?? "🌸"}</span>
        {rank !== undefined && (
          <span className="absolute top-2 left-2 bg-pink-500 text-white text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center shadow">
            {rank}
          </span>
        )}
        {category && (
          <span className="absolute bottom-2 left-2 bg-white/85 text-pink-600 text-[11px] font-medium px-2 py-0.5 rounded-full">
            {category.name}
          </span>
        )}
      </div>

      <div className="flex flex-col flex-1 p-4">
        <h3 className="text-sm font-bold text-gray-800 leading-snug group-hover:text-pink-600 transition-colors line-clamp-2">
          {article.title}
        </h3>
        <p className="mt-2 text-xs text-gray-500 leading-relaxed line-clamp-3 flex-1">
          {article.description}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <time className="text-[11px] text-gray-400">{article.updated ?? article.date}</time>
          <span className="text-xs font-medium text-pink-500 group-hover:translate-x-0.5 transition-transform">
            続きを読む →
          </span>
        </div>
      </div>
    </Link>
  );
}
