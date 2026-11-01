import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BOOKS, itemPath } from "@/lib/books";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { SECS, bookOf, kiYearPalace, palaceTheme, secBySlug, secDoc, secPath, yItemPath, Y_PATH, Y_UPDATED, yOg } from "@/lib/y2027";
import { Aff, Body, Crumbs, FaqBlock, JsonLd, OpenBook, Orn, Plate } from "@/components/Parts";
import { YCards, YSecs } from "@/components/Y2027";

export const dynamicParams = false;
export function generateStaticParams() {
  return SECS.filter((s) => secDoc(s)).map((s) => ({ sec: s.slug }));
}

export function generateMetadata({ params }: { params: { sec: string } }): Metadata {
  const s = secBySlug(params.sec);
  const d = s && secDoc(s);
  if (!s || !d) return {};
  const url = SITE_URL + secPath(s);
  const og = yOg([s.slug, "index"]);
  return {
    title: { absolute: `${d.title}｜${SITE_NAME}` },
    description: d.description,
    alternates: { canonical: url },
    openGraph: { title: d.title, description: d.description, url, images: [{ url: og, width: 1200, height: 630 }] },
    twitter: { title: d.title, description: d.description, images: [og] },
  };
}

export default function YSecPage({ params }: { params: { sec: string } }) {
  const s = secBySlug(params.sec);
  const d = s && secDoc(s);
  if (!s || !d) notFound();
  const b = bookOf(s);
  const url = SITE_URL + secPath(s);
  const meguri = BOOKS.find((x) => x.id === "meguri")!;
  return (
    <main className="sheet">
      <Crumbs trail={[{ name: "宵の書架", href: "/" }, { name: "2027年の運勢", href: Y_PATH }, { name: s.title }]} />
      <p className="kicker">2027年の運勢・{s.short}</p>
      <h1>{d.h1}</h1>
      <Orn />
      <Plate book={b} />
      <p className="lead">{d.lead}</p>
      {s.id === "kyusei" && (
        <section className="shelf-h" style={{ marginTop: 28 }}>
          <p className="chap">2027年の年盤</p>
          <h2>九つの星が回る方位</h2>
          <div className="ywrap">
            <table className="ytable">
              <thead><tr><th>本命星</th><th>2027年の方位</th><th>一年のテーマ</th></tr></thead>
              <tbody>
                {s.items.map((it) => {
                  const p = kiYearPalace(it.key);
                  return (
                    <tr key={it.slug}>
                      <td><Link href={yItemPath(s, it)}>{it.label.replace("の2027年", "")}</Link></td>
                      <td>{p}</td>
                      <td>{palaceTheme(p).t}：{palaceTheme(p).s}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}
      {s.items.length > 0 && (
        <section className="shelf-h">
          <p className="chap">一覧</p>
          <h2>{s.id === "kyusei" ? "本命星ごとの2027年" : "12星座ごとの2027年"}</h2>
          <YCards sec={s} />
        </section>
      )}
      <Body doc={d} />
      {s.id === "suhi" && (
        <section className="shelf-h">
          <p className="chap">九つの一年</p>
          <h2>パーソナルイヤーごとの詳しい頁</h2>
          <ul className="cards">
            {meguri.items.map((it) => (
              <li key={it.slug}>
                <Link href={itemPath(meguri, it)}>
                  <span className="th blank" aria-hidden="true">{it.key}</span>
                  <b>{it.label}</b>
                  {it.sub && <small>{it.sub}</small>}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
      <OpenBook book={b} label={`${b.title}をひらいて、あなたの${s.id === "suhi" ? "数" : s.id === "kyusei" ? "本命星" : "星座"}を出す`} />
      <FaqBlock faq={d.faq} />
      <Aff />
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
          image: SITE_URL + yOg([s.slug, "index"]),
          inLanguage: "ja",
          datePublished: Y_UPDATED,
          dateModified: Y_UPDATED,
          author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL + "/about/" },
          publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL + "/" },
        }}
      />
    </main>
  );
}
