import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { Y_PATH } from "@/lib/y2027";
import { K_ITEMS, K_PATH, K_PUBLISHED, kHub, kTagged } from "@/lib/kichi";
import { Aff, Body, Crumbs, FaqBlock, JsonLd, Orn } from "@/components/Parts";
import { YSecs } from "@/components/Y2027";
import { KichiCal, KichiCards, KichiItems } from "@/components/Kichi";
import { KichiNext } from "@/components/KichiNext";

const d = kHub();
const url = SITE_URL + K_PATH;
export const metadata: Metadata = {
  title: { absolute: `${d.title}｜${SITE_NAME}` },
  description: d.description,
  alternates: { canonical: url },
  openGraph: { title: d.title, description: d.description, url, images: [{ url: "/og/default.jpg", width: 1200, height: 630 }] },
  twitter: { title: d.title, description: d.description, images: ["/og/default.jpg"] },
};

export default function KichiHub() {
  return (
    <main className="sheet">
      <Crumbs trail={[{ name: "宵の書架", href: "/" }, { name: "2027年の運勢", href: Y_PATH }, { name: "2027年の吉日カレンダー" }]} />
      <p className="kicker">2027年の暦</p>
      <h1>{d.h1}</h1>
      <Orn />
      <p className="lead">{d.lead}</p>
      <KichiNext days={kTagged()} />
      <section className="shelf-h" style={{ marginTop: 28 }}>
        <p className="chap">吉日ごとの頁</p>
        <h2>知りたい吉日から読む</h2>
        <KichiCards />
      </section>
      <KichiCal />
      <Aff place="aff-2027" head="大切な日取りを、ひとりで決めきれないときは" note="入籍や開業、引っ越しの日取りは、生年月日もあわせて占い師にじかにみてもらう方法もあります。" />
      <Body doc={d} />
      <FaqBlock faq={d.faq} />
      <KichiItems items={K_ITEMS[0].lucky} title="吉日に合わせて新調するなら" />
      <section className="shelf-h">
        <p className="chap">2027年の運勢</p>
        <h2>あなたの2027年を読む</h2>
        <YSecs except="kichijitsu" />
      </section>
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
        }}
      />
    </main>
  );
}
