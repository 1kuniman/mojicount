import type { Article, Faq } from "@/lib/types";
import { siteUrl, siteName } from "@/lib/site";
import { getAuthor } from "@/lib/authors";

/**
 * 記事ページの構造化データ（JSON-LD）。
 * - BlogPosting：記事メタ情報
 * - FAQPage：よくある質問（faqs が1件以上ある場合のみ）
 * 検索結果でのリッチリザルト表示（FAQリッチリザルト等）を狙う。
 */
export default function ArticleJsonLd({
  article,
  faqs,
}: {
  article: Article;
  faqs: Faq[];
}) {
  const url = `${siteUrl}/articles/${article.slug}`;
  const author = getAuthor(article.author);

  const blogPosting = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.updated ?? article.date,
    author: { "@type": "Person", name: author.name },
    publisher: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    inLanguage: "ja",
  };

  const faqPage =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPosting) }}
      />
      {faqPage && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
        />
      )}
    </>
  );
}
