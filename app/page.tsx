import Link from "next/link";
import { concerns } from "@/lib/concerns";
import { popularArticles, articles, getMonthlyTop5 } from "@/lib/articles";
import { featuredTop3 } from "@/lib/services";
import { getCategory } from "@/lib/categories";
import ArticleCard from "./components/ArticleCard";
import RankingCard from "./components/RankingCard";
import AdSpace from "./components/AdSpace";

export default function Home() {
  const latest = articles.slice(0, 6);
  const popular = (popularArticles.length ? popularArticles : latest).slice(0, 6);
  const monthlyTop5 = getMonthlyTop5();
  const articleCount = articles.length;

  return (
    <main className="flex-1">
      {/* ヒーロー */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand via-brand-light to-[#fde7f1]">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_80%_20%,#ffffff,transparent_55%)]" />
        <div className="relative max-w-5xl mx-auto px-4 py-12 sm:py-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <p className="inline-block text-xs font-semibold text-brand-deep bg-white/80 rounded-full px-3 py-1 mb-5 shadow-sm">
                医療ダイエット・脱毛・美容クリニックの比較メディア
              </p>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white leading-tight drop-shadow-sm">
                美容医療、
                <br className="hidden sm:block" />
                もっと身近に。
              </h1>
              <p className="mt-5 text-sm sm:text-base text-white/95 leading-relaxed">
                リアルな口コミと徹底比較で、
                <br className="hidden sm:block" />
                あなたに合うクリニックが見つかる。
              </p>
              <div className="mt-7 flex flex-wrap items-center justify-center md:justify-start gap-3">
                <Link
                  href="/ranking"
                  className="bg-white text-brand-deep font-bold px-6 py-3 rounded-full shadow-md hover:-translate-y-0.5 transition-all text-sm"
                >
                  ランキングを見る
                </Link>
                <Link
                  href="/articles/biyou-iryou-beginner-guide"
                  className="bg-brand-deep/90 text-white border border-white/40 font-bold px-6 py-3 rounded-full hover:bg-brand-deep transition-colors text-sm"
                >
                  はじめての方へ
                </Link>
              </div>
            </div>

            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800"
                alt="美容医療を受ける女性のイメージ"
                width={800}
                height={600}
                className="w-full h-56 sm:h-72 md:h-80 object-cover rounded-3xl shadow-xl ring-4 ring-white/50"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 統計数字 */}
      <section className="bg-white border-b border-brand-light/30">
        <div className="max-w-5xl mx-auto px-4 py-6 grid grid-cols-3 gap-4 text-center">
          <Stat value="50院以上" label="比較クリニック数" />
          <Stat value="30記事以上" label="掲載記事数" sub={`（現在${articleCount}記事を公開中）`} />
          <Stat value="毎月" label="情報を更新" />
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 space-y-16 py-14">
        {/* あなたの悩みから探す */}
        <section>
          <SectionHeading title="あなたの悩みから探す" subtitle="気になるテーマを選んでください" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {concerns.map((c) => (
              <Link
                key={c.id}
                href={`/category/${c.category}`}
                className="group rounded-2xl border border-brand-light/40 bg-white p-4 text-center hover:border-brand hover:shadow-md transition-all"
              >
                <div className="text-3xl mb-2">{c.emoji}</div>
                <div className="font-bold text-sm text-gray-800 group-hover:text-brand-deep transition-colors">
                  {c.label}
                </div>
                <p className="mt-1 text-[11px] text-gray-500 leading-snug">{c.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <AdSpace label="スポンサーリンク" />

        {/* 編集部イチオシ */}
        <section>
          <SectionHeading
            title="編集部イチオシ"
            subtitle="編集部の比較基準でピックアップした3クリニック"
            link="/ranking"
          />
          <div className="space-y-5">
            {featuredTop3.map((s) => (
              <RankingCard key={s.id} service={s} />
            ))}
          </div>
          <p className="mt-3 text-xs text-gray-400 text-center">
            ※ 掲載内容は編集部による比較構成例です。最新情報は各公式サイトをご確認ください。
          </p>
        </section>

        {/* 先月人気だった記事 TOP5 */}
        <section>
          <SectionHeading title="先月人気だった記事 TOP5" subtitle="よく読まれた人気記事" />
          <ol className="rounded-2xl border border-brand-light/40 bg-white divide-y divide-brand-light/20 overflow-hidden">
            {monthlyTop5.map((a, i) => {
              const cat = getCategory(a.category);
              return (
                <li key={a.slug}>
                  <Link
                    href={`/articles/${a.slug}`}
                    className="flex items-center gap-4 p-4 hover:bg-cream transition-colors group"
                  >
                    <span
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm text-white ${
                        i === 0
                          ? "bg-gradient-to-br from-amber-400 to-yellow-500"
                          : i === 1
                            ? "bg-gradient-to-br from-slate-300 to-slate-400"
                            : i === 2
                              ? "bg-gradient-to-br from-amber-600 to-orange-700"
                              : "bg-brand-light"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-bold text-gray-800 group-hover:text-brand-deep transition-colors line-clamp-1">
                        {a.title}
                      </span>
                      <span className="text-[11px] text-gray-400">{cat?.name}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </section>

        {/* 人気の記事 */}
        <section>
          <SectionHeading title="人気の記事" subtitle="よく読まれている美容医療ガイド" link="/articles" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {popular.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </section>

        <AdSpace label="スポンサーリンク" variant="rect" />
      </div>
    </main>
  );
}

function Stat({ value, label, sub }: { value: string; label: string; sub?: string }) {
  return (
    <div>
      <div className="font-serif text-2xl sm:text-3xl font-bold text-brand-deep">{value}</div>
      <div className="text-xs text-gray-500 mt-0.5">{label}</div>
      {sub && <div className="text-[10px] text-gray-400">{sub}</div>}
    </div>
  );
}

function SectionHeading({
  title,
  subtitle,
  link,
}: {
  title: string;
  subtitle?: string;
  link?: string;
}) {
  return (
    <div className="flex items-end justify-between mb-5">
      <div>
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-gray-800">{title}</h2>
        {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
      </div>
      {link && (
        <Link href={link} className="text-sm font-medium text-brand-deep hover:text-brand whitespace-nowrap">
          もっと見る →
        </Link>
      )}
    </div>
  );
}
