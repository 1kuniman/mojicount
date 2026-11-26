import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { Y_PATH } from "@/lib/y2027";
import { K_ITEMS, K_PATH, K_PUBLISHED, kDoc, kPath, kTagged } from "@/lib/kichi";
import { Aff, Body, Crumbs, FaqBlock, JsonLd, Orn } from "@/components/Parts";
import { YLink } from "@/components/Y2027";
import { KichiCards, KichiItems } from "@/components/Kichi";
import { KichiNext } from "@/components/KichiNext";

export const dynamicParams = false;
export function generateStaticParams() {
  return K_ITEMS.filter((it) => kDoc(it.slug)).map((it) => ({ item: it.slug }));
}
const find = (slug: string) => {
  const it = K_ITEMS.find((x) => x.slug === slug);
  const d = it && kDoc(it.slug);
  return it && d ? { it, d } : null;
};

export function generateMetadata({ params }: { params: { item: string } }): Metadata {
  const f = find(params.item);
  if (!f) return {};
  const url = SITE_URL + kPath(f.it);
  return {
    title: { absolute: `${f.d.title}｜${SITE_NAME}` },
    description: f.d.description,
    alternates: { canonical: url },
    openGraph: { title: f.d.title, description: f.d.description, url, images: [{ url: "/og/default.jpg", width: 1200, height: 630 }] },
    twitter: { title: f.d.title, description: f.d.description, images: ["/og/default.jpg"] },
  };
}

export default function KichiItemPage({ params }: { params: { item: string } }) {
  const f = find(params.item);
  if (!f) notFound();
  const { it, d } = f;
  const url = SITE_URL + kPath(it);
  const i = K_ITEMS.indexOf(it);
  const prev = K_ITEMS[(i - 1 + K_ITEMS.length) % K_ITEMS.length];
  const next = K_ITEMS[(i + 1) % K_ITEMS.length];
  const shop = it.slug === "saifu" || it.slug === "takarakuji";
  return (
    <main className="sheet">
      <Crumbs trail={[{ name: "宵の書架", href: "/" }, { name: "2027年の運勢", href: Y_PATH }, { name: "吉日カレンダー", href: K_PATH }, { name: it.label }]} />
      <p className="kicker">2027年の暦・{it.label}</p>
      <h1>{d.h1}</h1>
      <Orn />
      <p className="badge"><span>{it.sub}</span></p>
      <p className="lead">{d.lead}</p>
      <KichiNext days={kTagged()} />
      {shop && <KichiItems items={it.lucky} title={it.slug === "saifu" ? "吉日に使い始める財布を探す" : "吉日の買いものに"} />}
      <Body doc={d} />
      <Aff place="aff-2027" head={it.affHead} note={it.affNote} />
      <YLink href={`${K_PATH}#calendar`} label="2027年の吉日を、月ごとのカレンダーで見る" />
      <FaqBlock faq={d.faq} />
      {!shop && <KichiItems items={it.lucky} title="吉日に合わせて新調するなら" />}
      <nav className="pn" aria-label="前後の項目">
        <Link href={kPath(prev)}>‹ {prev.label}</Link>
        <Link href={kPath(next)}>{next.label} ›</Link>
      </nav>
      <section className="shelf-h">
        <p className="chap">2027年の吉日</p>
        <h2>ほかの吉日を読む</h2>
        <KichiCards current={it.slug} />
      </section>
      <YLink href={Y_PATH} label="生年月日から、あなたの2027年の運勢を読む" />
      <p className="note">吉日は、暦に伝わる言い伝えです。日取りを決める手がかりのひとつとしてお使いください。</p>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: d.h1,
          description: d.description,
          url,
          mainEntityOfPage: url,
          inLanguage: "ja",
          datePublished: K_PUBLISHED,
          dateModified: K_PUBLISHED,
          author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL + "/about/" },
          publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL + "/" },
          isPartOf: { "@type": "CollectionPage", name: "2027年の吉日カレンダー", url: SITE_URL + K_PATH },
        }}
      />
    </main>
  );
}
