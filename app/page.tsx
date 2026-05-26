import Link from "next/link";
import { primaryCategories } from "@/lib/categories";
import { popularArticles, articles } from "@/lib/articles";
import { featuredTop3 } from "@/lib/services";
import ArticleCard from "./components/ArticleCard";
import RankingCard from "./components/RankingCard";
import AdSpace from "./components/AdSpace";

export default function Home() {
  const latest = articles.slice(0, 6);
  const popular = (popularArticles.length ? popularArticles : latest).slice(0, 6);

  return (
    <main className="flex-1">
      {/* ヒーロー */}
      <section className="relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 pt-12 pb-14 sm:pt-16 sm:pb-20 text-center">
          <p className="inline-block text-xs font-semibold text-pink-500 bg-pink-50 border border-pink-100 rounded-full px-3 py-1 mb-5">
            医療ダイエット・脱毛・美容クリニックを本音で比較
          </p>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-800 leading-tight">
            あなたに合う美容クリニック、
            <br className="hidden sm:block" />
            <span className="text-pink-500">見つかりますか？</span>
          </h1>
          <p className="mt-5 text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
            効果・副作用・費用をフラットに比較。はじめての美容医療でも後悔しないために、
            「知っておきたいこと」をやさしくまとめました。
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/ranking"
              className="bg-gradient-to-r from-pink-400 to-rose-400 text-white font-bold px-6 py-3 rounded-full shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all text-sm"
            >
              おすすめランキングを見る
            </Link>
            <Link
              href="/articles/biyou-iryou-beginner-guide"
              className="bg-white text-pink-600 border border-pink-200 font-bold px-6 py-3 rounded-full hover:bg-pink-50 transition-colors text-sm"
            >
              はじめての方はこちら
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 space-y-16 pb-16">
        <AdSpace label="スポンサーリンク" />

        {/* カテゴリ別おすすめ */}
        <section>
          <SectionHeading title="カテゴリから探す" subtitle="気になるジャンルを選んでください" />
          <div className="grid sm:grid-cols-3 gap-4">
            {primaryCategories.map((c) => (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                className="group rounded-2xl border border-pink-100 bg-white p-6 hover:border-pink-300 hover:shadow-md transition-all"
              >
                <div className="text-4xl mb-3">{c.emoji}</div>
                <h3 className="font-bold text-gray-800 group-hover:text-pink-600 transition-colors">
                  {c.name}
                </h3>
                <p className="mt-2 text-xs text-gray-500 leading-relaxed">{c.description}</p>
                <span className="mt-4 inline-block text-sm font-medium text-pink-500">
                  記事を見る →
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* 人気記事 */}
        <section>
          <SectionHeading title="人気の記事" subtitle="よく読まれている美容医療ガイド" link="/articles" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {popular.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </section>

        {/* おすすめサービス TOP3 */}
        <section>
          <SectionHeading
            title="おすすめサービス TOP3"
            subtitle="編集部の比較基準でピックアップ"
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

        <AdSpace label="スポンサーリンク" variant="rect" />
      </div>
    </main>
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
        <h2 className="text-xl sm:text-2xl font-extrabold text-gray-800">{title}</h2>
        {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
      </div>
      {link && (
        <Link href={link} className="text-sm font-medium text-pink-500 hover:text-pink-600 whitespace-nowrap">
          もっと見る →
        </Link>
      )}
    </div>
  );
}
