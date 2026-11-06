import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BOOKS, bookBySlug, bookContent, bookPath, itemPath, ogSrc } from "@/lib/books";
import { SITE_URL, SITE_NAME } from "@/lib/site";
import { YLink } from "@/components/Y2027";
import { Aff, Body, LuckyItems, Crumbs, FaqBlock, ItemCards, JsonLd, OpenBook, Orn, OtherBooks, Plate } from "@/components/Parts";

export const dynamicParams = false;
export function generateStaticParams() {
  return BOOKS.flatMap((b) => b.items.filter((it) => bookContent(b).items[it.key]).map((it) => ({ book: b.slug, item: it.slug })));
}

const find = (p: { book: string; item: string }) => {
  const b = bookBySlug(p.book);
  const it = b?.items.find((x) => x.slug === p.item);
  const doc = b && it ? bookContent(b).items[it.key] : undefined;
  return b && it && doc ? { b, it, doc } : null;
};

export function generateMetadata({ params }: { params: { book: string; item: string } }): Metadata {
  const f = find(params);
  if (!f) return {};
  const url = SITE_URL + itemPath(f.b, f.it);
  const og = ogSrc(f.b, f.it);
  return {
    title: { absolute: `${f.doc.title}｜${SITE_NAME}` },
    description: f.doc.description,
    alternates: { canonical: url },
    openGraph: { title: f.doc.title, description: f.doc.description, url, images: [{ url: og, width: 1200, height: 630 }] },
    twitter: { title: f.doc.title, description: f.doc.description, images: [og] },
  };
}

const UPDATED = "2026-10-31";

export default function ItemPage({ params }: { params: { book: string; item: string } }) {
  const f = find(params);
  if (!f) notFound();
  const { b, it, doc } = f;
  const i = b.items.indexOf(it);
  const prev = b.items[(i - 1 + b.items.length) % b.items.length];
  const next = b.items[(i + 1) % b.items.length];
  const url = SITE_URL + itemPath(b, it);
  return (
    <main className="sheet">
      <Crumbs trail={[{ name: "宵の書架", href: "/" }, { name: `${b.title}（${b.art}）`, href: bookPath(b) }, { name: it.label }]} />
      <p className="kicker">{b.title}</p>
      <h1>{doc.h1}</h1>
      <Orn />
      <Plate item={it} book={b} />
      {it.sub && <p className="badge"><span>{it.sub}</span></p>}
      <p className="lead">{doc.lead}</p>
      <Body doc={doc} />
      {b.id === "ki" && <YLink href={`/2027/kyusei/${it.slug}/`} label={`${it.label}の2027年の運勢と月ごとの暦`} />}
      {b.id === "hoshi" && <YLink href={`/2027/seiza/${it.slug}/`} label={`${it.label}の2027年の運勢`} />}
      {b.id === "meguri" && <YLink href="/2027/suhi/" label="2027年のパーソナルイヤーを出して、一年を読む" />}
      <OpenBook book={b} label={`${b.title}で、あなたを占う`} />
      <FaqBlock faq={doc.faq} />
      <LuckyItems book={b} item={it} />
      <Aff />
      <nav className="pn" aria-label="前後の項目">
        <Link href={itemPath(b, prev)}>‹ {prev.label}</Link>
        <Link href={itemPath(b, next)}>{next.label} ›</Link>
      </nav>
      <section className="shelf-h">
        <p className="chap">同じ本の頁</p>
        <h2>{b.itemsLabel}の一覧</h2>
        <ItemCards book={b} current={it.slug} />
      </section>
      <section className="shelf-h">
        <p className="chap">ほかの本</p>
        <h2>書架のほかの九冊</h2>
        <OtherBooks except={b.id} />
      </section>
      <p className="note">占いは、いまの自分をふり返るための読みものです。</p>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: doc.h1,
          description: doc.description,
          url,
          mainEntityOfPage: url,
          image: SITE_URL + ogSrc(b, it),
          inLanguage: "ja",
          datePublished: UPDATED,
          dateModified: UPDATED,
          author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL + "/about/" },
          publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL + "/" },
          isPartOf: { "@type": "CollectionPage", name: `${b.title}（${b.art}）`, url: SITE_URL + bookPath(b) },
        }}
      />
    </main>
  );
}
