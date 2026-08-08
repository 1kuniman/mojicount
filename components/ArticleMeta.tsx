import Link from "next/link";

const SITE_URL = "https://www.mojimojicount.com";
const AUTHOR_NAME = "いっくん";

function formatJa(dateStr: string): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  return `${y}年${m}月${d}日`;
}

export default function ArticleMeta({
  title,
  description,
  path,
  publishedDate,
  modifiedDate,
}: {
  title: string;
  description: string;
  path: string; // 例: "/column/base64/"
  publishedDate: string; // "2026-07-30" 形式
  modifiedDate?: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    author: {
      "@type": "Person",
      name: AUTHOR_NAME,
      url: `${SITE_URL}/about/`,
    },
    publisher: {
      "@type": "Organization",
      name: "もじもじツール",
      url: SITE_URL,
    },
    datePublished: publishedDate,
    dateModified: modifiedDate || publishedDate,
    mainEntityOfPage: `${SITE_URL}${path}`,
  };

  return (
    <>
      <div className="flex items-center gap-2 text-xs text-ink-faint mb-6">
        <Link href="/about/" className="hover:text-shu transition-colors">
          文：{AUTHOR_NAME}
        </Link>
        <span aria-hidden="true">・</span>
        <time dateTime={publishedDate}>{formatJa(publishedDate)}</time>
        {modifiedDate && modifiedDate !== publishedDate && (
          <span>（更新：{formatJa(modifiedDate)}）</span>
        )}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
