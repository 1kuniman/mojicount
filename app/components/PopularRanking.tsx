import Link from "next/link";
import { getPopularTop10 } from "@/lib/articles";
import { getCategory } from "@/lib/categories";

const rankColor = (i: number) =>
  i === 0
    ? "bg-gradient-to-br from-amber-400 to-yellow-500"
    : i === 1
      ? "bg-gradient-to-br from-slate-300 to-slate-400"
      : i === 2
        ? "bg-gradient-to-br from-amber-600 to-orange-700"
        : "bg-brand-light";

/**
 * 人気記事 TOP10。記事サイドバー・トップページ等で内部リンクを強化するために使用。
 */
export default function PopularRanking({
  limit = 10,
  heading = "人気記事 TOP10",
  currentSlug,
}: {
  limit?: number;
  heading?: string;
  /** 表示中の記事を除外したい場合に指定 */
  currentSlug?: string;
}) {
  let items = getPopularTop10(currentSlug ? limit + 1 : limit);
  if (currentSlug) items = items.filter((a) => a.slug !== currentSlug);
  items = items.slice(0, limit);

  if (items.length === 0) return null;

  return (
    <section className="rounded-2xl border border-brand-light/40 bg-white overflow-hidden">
      <h2 className="font-serif text-base font-bold text-gray-800 bg-gradient-to-r from-brand-light/30 to-cream px-4 py-3 flex items-center gap-2">
        <span aria-hidden>🏆</span> {heading}
      </h2>
      <ol className="divide-y divide-brand-light/20">
        {items.map((a, i) => {
          const cat = getCategory(a.category);
          return (
            <li key={a.slug}>
              <Link
                href={`/articles/${a.slug}`}
                className="flex items-start gap-3 px-4 py-3 hover:bg-cream transition-colors group"
              >
                <span
                  className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] text-white ${rankColor(
                    i
                  )}`}
                >
                  {i + 1}
                </span>
                <span className="min-w-0">
                  <span className="block text-[13px] font-medium text-gray-800 leading-snug group-hover:text-brand-deep transition-colors line-clamp-2">
                    {a.title}
                  </span>
                  {cat && <span className="text-[10px] text-gray-400">{cat.name}</span>}
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
