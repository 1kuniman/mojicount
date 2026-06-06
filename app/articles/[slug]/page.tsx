import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getArticle,
  getRelatedArticles,
  getFaqs,
  articles,
  buildToc,
  estimateReadingMinutes,
} from "@/lib/articles";
import { getCategory } from "@/lib/categories";
import { siteUrl } from "@/lib/site";
import ArticleBody from "@/app/components/ArticleBody";
import TableOfContents from "@/app/components/TableOfContents";
import ArticleCard from "@/app/components/ArticleCard";
import AdSpace from "@/app/components/AdSpace";
import MedicalDisclaimer from "@/app/components/MedicalDisclaimer";
import RelatedServices from "@/app/components/RelatedServices";
import PriceCompareTable from "@/app/components/PriceCompareTable";
import PopularRanking from "@/app/components/PopularRanking";
import ArticleJsonLd from "@/app/components/ArticleJsonLd";
import { AuthorBadge, AuthorCard } from "@/app/components/AuthorBadge";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "記事が見つかりません" };

  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/articles/${article.slug}` },
    openGraph: {
      type: "article",
      url: `${siteUrl}/articles/${article.slug}`,
      title: article.title,
      description: article.description,
      publishedTime: article.date,
      modifiedTime: article.updated ?? article.date,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const category = getCategory(article.category);
  const toc = buildToc(article.blocks);
  const related = getRelatedArticles(slug);
  const faqs = getFaqs(article);
  const minutes = estimateReadingMinutes(article.blocks);
  const relatedServiceCategory = article.relatedServiceCategory ?? article.category;

  // 記事カテゴリ・タグに応じて料金比較表を出し分ける
  const isManjaroArticle =
    article.category === "medical-diet" &&
    (article.tags.some((t) => t.includes("マンジャロ")) ||
      article.title.includes("マンジャロ"));
  const isDatsumoArticle = article.category === "datsumo";
  const priceTableType = isManjaroArticle
    ? ("manjaro" as const)
    : isDatsumoArticle
      ? ("datsumo" as const)
      : null;

  return (
    <main className="flex-1">
      {/* 構造化データ（BlogPosting / FAQPage） */}
      <ArticleJsonLd article={article} faqs={faqs} />

      <div className="max-w-6xl mx-auto px-4 lg:flex lg:gap-8 lg:items-start">
      <article className="w-full max-w-3xl mx-auto lg:mx-0 lg:flex-1 lg:min-w-0 py-8 sm:py-10">
        {/* パンくず */}
        <nav className="text-xs text-gray-400 mb-4 flex flex-wrap items-center gap-1.5" aria-label="パンくず">
          <Link href="/" className="hover:text-brand-deep">ホーム</Link>
          <span>/</span>
          {category && (
            <>
              <Link href={`/category/${category.slug}`} className="hover:text-brand-deep">
                {category.name}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-gray-500 truncate">{article.title}</span>
        </nav>

        <header>
          {category && (
            <Link
              href={`/category/${category.slug}`}
              className="inline-block text-xs font-semibold text-brand-deep bg-brand-light/25 rounded-full px-3 py-1"
            >
              {category.emoji} {category.name}
            </Link>
          )}
          <h1 className="mt-3 font-serif text-2xl sm:text-3xl font-bold text-gray-800 leading-snug">
            {article.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
            <AuthorBadge id={article.author} />
            <span className="text-gray-400">公開 {article.date}</span>
            <span className="text-gray-400">約{minutes}分</span>
            {article.updated && (
              <span className="inline-flex items-center gap-1 font-semibold text-brand-deep bg-brand-light/25 rounded-full px-2.5 py-1">
                🔄 最終更新 {article.updated}
              </span>
            )}
          </div>
        </header>

        <div className="mt-6">
          <AdSpace label="スポンサーリンク" />
        </div>

        {/* 編集部の結論 */}
        {article.conclusion && (
          <div className="mt-6 rounded-2xl border-2 border-brand/40 bg-white p-5">
            <p className="font-bold text-brand-deep mb-1.5 flex items-center gap-1.5">
              <span>✅</span> 編集部の結論
            </p>
            <p className="text-sm text-gray-700 leading-7">{article.conclusion}</p>
          </div>
        )}

        {/* この記事でわかること */}
        {article.summary && article.summary.length > 0 && (
          <div className="mt-5 rounded-2xl bg-brand-light/15 border border-brand-light/40 p-5">
            <p className="font-bold text-gray-800 mb-3 flex items-center gap-1.5">
              <span>📝</span> この記事でわかること
            </p>
            <ul className="space-y-2">
              {article.summary.map((s, i) => (
                <li key={i} className="flex gap-2 text-sm text-gray-700 leading-7">
                  <span className="text-brand flex-shrink-0">✓</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 目次（自動生成） */}
        <TableOfContents items={toc} />

        {/* 本文 */}
        <div className="mt-4">
          <ArticleBody blocks={article.blocks} />
        </div>

        {/* 料金比較表（カテゴリに応じて自動表示） */}
        {priceTableType && (
          <section className="mt-10 rounded-2xl border border-brand-light/40 bg-white p-5 sm:p-6">
            <PriceCompareTable
              type={priceTableType}
              heading={
                priceTableType === "manjaro"
                  ? "マンジャロ 料金比較【2026年5月】"
                  : "医療脱毛 料金比較【2026年5月】"
              }
            />
            <div className="mt-3 text-center">
              <Link
                href="/compare"
                className="text-sm font-medium text-brand-deep hover:text-brand"
              >
                料金比較ページで詳しく見る →
              </Link>
            </div>
          </section>
        )}

        {/* こんな人におすすめ */}
        {article.bestFor && article.bestFor.length > 0 && (
          <section className="mt-10 rounded-2xl bg-gradient-to-br from-brand-light/20 to-cream border border-brand-light/40 p-5">
            <h2 className="font-serif text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span>🌷</span> こんな人におすすめ
            </h2>
            <ul className="space-y-2">
              {article.bestFor.map((b, i) => (
                <li key={i} className="flex gap-2 text-sm text-gray-700 leading-7">
                  <span className="text-brand-deep flex-shrink-0">●</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* よくある質問（FAQ） */}
        {article.faqs && article.faqs.length > 0 && (
          <section className="mt-10">
            <h2 className="font-serif text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span aria-hidden>❓</span> よくある質問（FAQ）
            </h2>
            <div className="space-y-3">
              {article.faqs.map((f, i) => (
                <details
                  key={i}
                  className="group rounded-xl border border-brand-light/40 bg-white overflow-hidden"
                >
                  <summary className="cursor-pointer list-none px-4 py-3 flex items-start gap-2 font-bold text-sm text-gray-800 hover:bg-cream transition-colors">
                    <span className="text-brand-deep flex-shrink-0">Q.</span>
                    <span className="flex-1">{f.q}</span>
                    <span className="text-brand-deep flex-shrink-0 transition-transform group-open:rotate-180" aria-hidden>
                      ▼
                    </span>
                  </summary>
                  <div className="px-4 pb-4 pt-1 flex gap-2 text-sm leading-7 text-gray-700 border-t border-brand-light/20">
                    <span className="text-brand font-bold flex-shrink-0">A.</span>
                    <p>{f.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* タグ */}
        {article.tags.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {article.tags.map((t) => (
              <span key={t} className="text-xs text-brand-deep bg-brand-light/20 rounded-full px-3 py-1">
                #{t}
              </span>
            ))}
          </div>
        )}

        {/* 記事末尾のアフィリエイトバナー枠 */}
        <div className="mt-8">
          <AdSpace label="おすすめサービス（PR）" variant="rect" />
        </div>

        {/* 関連する施術・クリニック */}
        <RelatedServices category={relatedServiceCategory} />

        {/* 著者 */}
        <div className="mt-10">
          <h2 className="font-serif text-lg font-bold text-gray-800 mb-3">この記事を書いた人</h2>
          <AuthorCard id={article.author} />
        </div>

        <div className="mt-8">
          <MedicalDisclaimer variant="block" />
        </div>
      </article>

      {/* サイドバー：人気記事 TOP10（内部リンク強化） */}
      <aside className="hidden lg:block lg:w-72 lg:flex-shrink-0 py-10">
        <div className="sticky top-20 space-y-6">
          <PopularRanking limit={10} currentSlug={article.slug} />
          <AdSpace label="スポンサーリンク" />
        </div>
      </aside>
      </div>

      {/* 関連記事 */}
      {related.length > 0 && (
        <section className="bg-white border-t border-brand-light/30">
          <div className="max-w-5xl mx-auto px-4 py-10">
            <h2 className="font-serif text-xl font-bold text-gray-800 mb-5">関連記事</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {related.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/articles"
                className="inline-block bg-white text-brand-deep border border-brand-light font-medium px-6 py-2.5 rounded-full hover:bg-cream transition-colors text-sm"
              >
                記事一覧を見る
              </Link>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
