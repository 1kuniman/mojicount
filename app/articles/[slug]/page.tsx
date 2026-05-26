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

  return (
    <main className="flex-1">
      <article className="max-w-3xl mx-auto px-4 py-8 sm:py-10">
        {/* パンくず */}
        <nav className="text-xs text-gray-400 mb-4 flex flex-wrap items-center gap-1.5" aria-label="パンくず">
          <Link href="/" className="hover:text-pink-500">ホーム</Link>
          <span>/</span>
          {category && (
            <>
              <Link href={`/category/${category.slug}`} className="hover:text-pink-500">
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
              className="inline-block text-xs font-semibold text-pink-600 bg-pink-50 border border-pink-100 rounded-full px-3 py-1"
            >
              {category.emoji} {category.name}
            </Link>
          )}
          <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold text-gray-800 leading-snug">
            {article.title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-400">
            <span>公開日 {article.date}</span>
            {article.updated && <span>更新日 {article.updated}</span>}
            <span>約{minutes}分で読めます</span>
          </div>
        </header>

        <div className="mt-6">
          <AdSpace label="スポンサーリンク" />
        </div>

        {/* 目次（自動生成） */}
        <TableOfContents items={toc} />

        {/* 本文 */}
        <div className="mt-4">
          <ArticleBody blocks={article.blocks} />
        </div>

        {/* タグ */}
        {article.tags.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {article.tags.map((t) => (
              <span key={t} className="text-xs text-pink-500 bg-pink-50 rounded-full px-3 py-1">
                #{t}
              </span>
            ))}
          </div>
        )}

        {/* 記事末尾のアフィリエイトバナー枠 */}
        <div className="mt-8">
          <AdSpace label="おすすめサービス（PR）" variant="rect" />
        </div>

        <div className="mt-8">
          <MedicalDisclaimer variant="block" />
        </div>
      </article>

      {/* 関連記事 */}
      {related.length > 0 && (
        <section className="bg-pink-50/50 border-t border-pink-100">
          <div className="max-w-5xl mx-auto px-4 py-10">
            <h2 className="text-xl font-extrabold text-gray-800 mb-5">関連記事</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {related.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/articles"
                className="inline-block bg-white text-pink-600 border border-pink-200 font-medium px-6 py-2.5 rounded-full hover:bg-pink-50 transition-colors text-sm"
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
