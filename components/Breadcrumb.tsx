import Link from "next/link";

const SITE_URL = "https://www.mojimojicount.com";

export interface Crumb {
  name: string;
  href?: string; // 最後の項目（現在地）はhrefなし
}

export default function Breadcrumb({ items }: { items: Crumb[] }) {
  const all: Crumb[] = [{ name: "ホーム", href: "/" }, ...items];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      ...(c.href ? { item: `${SITE_URL}${c.href}` } : {}),
    })),
  };

  return (
    <>
      <nav aria-label="パンくずリスト" className="mb-5">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-ink-faint">
          {all.map((c, i) => (
            <li key={c.name} className="flex items-center gap-1.5">
              {c.href ? (
                <Link href={c.href} className="hover:text-shu transition-colors">
                  {c.name}
                </Link>
              ) : (
                <span className="text-ink-soft">{c.name}</span>
              )}
              {i < all.length - 1 && <span aria-hidden="true">/</span>}
            </li>
          ))}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
