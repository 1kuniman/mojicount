import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { SECS, bookOf, itemDoc, secBySlug, secPath, yItemPath, Y_PATH, Y_UPDATED, yOg } from "@/lib/y2027";
import { Aff, Body, LuckyItems, Crumbs, FaqBlock, JsonLd, OpenBook, Orn, Plate } from "@/components/Parts";
import { Months, YCards, YLink, YSecs } from "@/components/Y2027";
import { LEAD_2027 } from "@/lib/lucky";

export const dynamicParams = false;
export function generateStaticParams() {
  return SECS.flatMap((s) => s.items.filter((it) => itemDoc(s, it)).map((it) => ({ sec: s.slug, item: it.slug })));
}

const find = (p: { sec: string; item: string }) => {
  const s = secBySlug(p.sec);
  const it = s?.items.find((x) => x.slug === p.item);
  const d = s && it ? itemDoc(s, it) : undefined;
  return s && it && d ? { s, it, d } : null;
};

export function generateMetadata({ params }: { params: { sec: string; item: string } }): Metadata {
  const f = find(params);
  if (!f) return {};
  const url = SITE_URL + yItemPath(f.s, f.it);
  const og = yOg([f.s.slug, f.it.slug]);
  return {
    title: { absolute: `${f.d.title}｜${SITE_NAME}` },
    description: f.d.description,
    alternates: { canonical: url },
    openGraph: { title: f.d.title, description: f.d.description, url, images: [{ url: og, width: 1200, height: 630 }] },
    twitter: { title: f.d.title, description: f.d.description, images: [og] },
  };
}

export default function YItemPage({ params }: { params: { sec: string; item: string } }) {
  const f = find(params);
  if (!f) notFound();
  const { s, it, d } = f;
  const b = bookOf(s);
  const bi = b.items.find((x) => x.slug === it.slug);
  const i = s.items.indexOf(it);
  const prev = s.items[(i - 1 + s.items.length) % s.items.length];
  const next = s.items[(i + 1) % s.items.length];
  const url = SITE_URL + yItemPath(s, it);
  const name = it.label.replace("の2027年", "");
  return (
    <main className="sheet">
      <Crumbs trail={[{ name: "宵の書架", href: "/" }, { name: "2027年の運勢", href: Y_PATH }, { name: s.title, href: secPath(s) }, { name: it.label }]} />
      <p className="kicker">2027年の運勢・{s.short}</p>
      <h1>{d.h1}</h1>
      <Orn />
      <Plate item={bi} book={b} />
      {it.sub && <p className="badge"><span>{it.sub}</span></p>}
      <p className="lead">{d.lead}</p>
      <Body doc={d} />
      <Aff
        head={`${name}の2027年、ひとりで決めきれないことは`}
        note={
          s.id === "kyusei"
            ? "結婚や転職、引っ越しの時期と方位は、九星気学で鑑定する占い師に、生年月日からじかにみてもらうこともできます。"
            : s.id === "seiza"
              ? "結婚や転職の決めどきは、西洋占星術の占い師に、生まれた日時からのホロスコープでじかに読んでもらうこともできます。"
              : "結婚や転職の決めどきは、占い師に生年月日からじかにみてもらう方法もあります。"
        }
      />
      <Months months={d.months} title={`${name}の2027年、月ごとの過ごし方`} />
      <YLink href={it.evergreen} label={s.id === "eto" ? "九星気学でも、あなたの2027年を読む" : `${name}の性格・恋愛・仕事をくわしく読む`} />
      <OpenBook book={b} label={`${b.title}をひらいて、${s.id === "seiza" ? "あなたの星座" : "あなたの本命星と方位盤"}を読む`} />
      <FaqBlock faq={d.faq} />
      <LuckyItems book={b} item={bi} lead={LEAD_2027} title={`${name}の2027年のラッキーアイテム`} />
      <nav className="pn" aria-label="前後の項目">
        <Link href={yItemPath(s, prev)}>‹ {prev.label}</Link>
        <Link href={yItemPath(s, next)}>{next.label} ›</Link>
      </nav>
      <section className="shelf-h">
        <p className="chap">{s.title}</p>
        <h2>{s.id === "kyusei" ? "ほかの本命星の2027年" : s.id === "eto" ? "ほかの干支の2027年" : "ほかの星座の2027年"}</h2>
        <YCards sec={s} current={it.slug} />
      </section>
      <section className="shelf-h">
        <p className="chap">2027年のほかの読みかた</p>
        <h2>ほかの占いで読む2027年</h2>
        <YSecs except={s.slug} />
      </section>
      <p className="note">占いは、いまの自分をふり返るための読みものです。</p>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: d.h1,
          description: d.description,
          url,
          mainEntityOfPage: url,
          image: SITE_URL + yOg([s.slug, it.slug]),
          inLanguage: "ja",
          datePublished: Y_UPDATED,
          dateModified: Y_UPDATED,
          author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL + "/about/" },
          publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL + "/" },
          isPartOf: { "@type": "CollectionPage", name: s.title, url: SITE_URL + secPath(s) },
        }}
      />
    </main>
  );
}
