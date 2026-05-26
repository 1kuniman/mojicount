import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getArticle,
  getRelatedArticles,
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
import ReviewsSection from "@/app/components/ReviewsSection";
import RelatedServices from "@/app/components/RelatedServices";
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
  const minutes = estimateReadingMinutes(article.blocks);
  const relatedServiceCategory = article.relatedServiceCategory ?? article.category;

  return (
    <main className="flex-1">
      <article className="max-w-3xl mx-auto px-4 py-8 sm:py-10">
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

        {/* 読者の声（イメージ例） */}
        {article.reviews && <ReviewsSection reviews={article.reviews} />}

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
