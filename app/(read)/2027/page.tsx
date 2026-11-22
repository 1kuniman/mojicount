import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { topDoc, Y_PATH, Y_UPDATED, yOg } from "@/lib/y2027";
import { Body, Crumbs, FaqBlock, JsonLd, Orn, Aff } from "@/components/Parts";
import { YSecs } from "@/components/Y2027";
import { MyYear } from "@/components/Me";
import { meData } from "@/lib/meData";

export function generateMetadata(): Metadata {
  const d = topDoc();
  if (!d) return {};
  const url = SITE_URL + Y_PATH;
  const og = yOg([]);
  return {
    title: { absolute: `${d.title}｜${SITE_NAME}` },
    description: d.description,
    alternates: { canonical: url },
    openGraph: { title: d.title, description: d.description, url, images: [{ url: og, width: 1200, height: 630 }] },
    twitter: { title: d.title, description: d.description, images: [og] },
  };
}

export default function Y2027Top() {
  const d = topDoc();
  if (!d) notFound();
  const url = SITE_URL + Y_PATH;
  return (
    <main className="sheet">
      <Crumbs trail={[{ name: "宵の書架", href: "/" }, { name: "2027年の運勢" }]} />
      <p className="kicker">2027年の運勢</p>
      <h1>{d.h1}</h1>
      <Orn />
      <MyYear data={meData()}>
        <Aff place="aff-me" head="四つの占いを重ねて、もっと深く読むなら" note="生年月日を伝えて、占い師にあなたの2027年をじかにみてもらう方法もあります。結婚や転職の決めどきを相談する人が多い時期です。" />
      </MyYear>
      <p className="lead">{d.lead}</p>
      <section className="shelf-h" style={{ marginTop: 28 }}>
        <p className="chap">四つの読みかた</p>
        <h2>どの占いで、2027年を読みますか</h2>
        <YSecs />
      </section>
      <Body doc={d} />
      <FaqBlock faq={d.faq} />
      <Aff place="aff-2027hub" />
      <p className="note">占いは、いまの自分をふり返るための読みものです。</p>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: d.h1,
          description: d.description,
          url,
          mainEntityOfPage: url,
          image: SITE_URL + yOg([]),
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
