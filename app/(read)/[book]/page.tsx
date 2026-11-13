import type { Metadata } from "next";
import { YLink } from "@/components/Y2027";
import { notFound } from "next/navigation";
import { BOOKS, bookBySlug, bookContent, bookPath, coverSrc, ogSrc } from "@/lib/books";
import { AFF_NOTE, SITE_URL, SITE_NAME } from "@/lib/site";
import { Aff, Cover, Body, LuckyItems, Crumbs, FaqBlock, ItemCards, JsonLd, OpenBook, Orn, OtherBooks } from "@/components/Parts";

const Y27: Record<string, { href: string; label: string }> = {
  ki: { href: "/2027/kyusei/", label: "九星気学 2027年の運勢と月ごとの暦を読む" },
  hoshi: { href: "/2027/seiza/", label: "12星座の2027年の運勢を読む" },
  meguri: { href: "/2027/suhi/", label: "数秘術で読む2027年の運勢" },
};

export const dynamicParams = false;
export function generateStaticParams() {
  return BOOKS.map((b) => ({ book: b.slug }));
}

export function generateMetadata({ params }: { params: { book: string } }): Metadata {
  const b = bookBySlug(params.book);
  if (!b) return {};
  const hub = bookContent(b).hub;
  const title = hub?.title || `${b.title}｜${b.art}`;
  const description = hub?.description || `${b.art}で${b.q}を読む本。`;
  const url = SITE_URL + bookPath(b);
  const og = ogSrc(b);
  return {
    title: { absolute: `${title}｜${SITE_NAME}` },
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, images: [{ url: og, width: 1200, height: 630 }] },
    twitter: { title, description, images: [og] },
  };
}

export default function HubPage({ params }: { params: { book: string } }) {
  const b = bookBySlug(params.book);
  if (!b) notFound();
  const { hub } = bookContent(b);
  const url = SITE_URL + bookPath(b);
  return (
    <main className="sheet">
      <Crumbs trail={[{ name: "宵の書架", href: "/" }, { name: "本の目録", href: "/mokuroku/" }, { name: `${b.title}（${b.art}）` }]} />
      <p className="kicker">{b.title}</p>
      <h1>{hub?.h1 || b.art}</h1>
      <Orn />
      <div className="plate cover"><Cover book={b} width={240} eager /></div>
      <p className="badge"><span><b>わかること</b>　{b.q}</span><span><b>必要なもの</b>　{b.need}</span></p>
      {hub && <p className="lead">{hub.lead}</p>}
      {Y27[b.id] && <YLink href={Y27[b.id].href} label={Y27[b.id].label} />}
      <OpenBook book={b} />
      {hub && <Body doc={hub} />}
      <section className="shelf-h">
        <p className="chap">目次</p>
        <h2>{b.itemsLabel}の意味</h2>
        <ItemCards book={b} />
      </section>
      <OpenBook book={b} />
      {hub && <FaqBlock faq={hub.faq} />}
      <LuckyItems book={b} title={`${b.title}のラッキーアイテム`} />
      <Aff place="aff-hub" note={AFF_NOTE[b.id]} />
      <section className="shelf-h">
        <p className="chap">ほかの本</p>
        <h2>書架のほかの九冊</h2>
        <OtherBooks except={b.id} />
      </section>
      <p className="note">占いは、いまの自分をふり返るための読みものです。</p>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: hub?.h1 || b.art,
          description: hub?.description,
          url,
          inLanguage: "ja",
          isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL + "/" },
          hasPart: b.items.map((it) => ({ "@type": "Article", headline: it.label, url: `${url}${it.slug}/` })),
        }}
      />
    </main>
  );
}
