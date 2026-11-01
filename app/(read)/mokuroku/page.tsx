import type { Metadata } from "next";
import Link from "next/link";
import { BOOKS, bookPath, coverSrc, itemPath, bookContent } from "@/lib/books";
import { SITE_URL } from "@/lib/site";
import { Cover, Crumbs, Orn, OpenBook } from "@/components/Parts";
import { YSecs } from "@/components/Y2027";

export const metadata: Metadata = {
  title: "本の目録｜十冊の占いの本と、すべての頁",
  description: "宵の書架にある十冊の占いの本（数秘術・名前の相性・パーソナルイヤー・タロット・12星座・夢占い・守護石・九星気学・オーラ・前世）と、それぞれの解説の頁の一覧です。",
  alternates: { canonical: SITE_URL + "/mokuroku/" },
};

export default function Mokuroku() {
  return (
    <main className="sheet">
      <Crumbs trail={[{ name: "宵の書架", href: "/" }, { name: "本の目録" }]} />
      <p className="kicker">目録</p>
      <h1>十冊の占いの本</h1>
      <Orn />
      <p className="lead">本棚の十冊と、それぞれの本に綴じてある頁の一覧です。気になる頁から読んでも、本棚から一冊を手に取って占っても構いません。</p>
      <section className="shelf-h">
        <p className="chap">年の暦</p>
        <h2><Link href="/2027/" style={{ textDecoration: "none" }}>2027年の運勢</Link></h2>
        <YSecs />
      </section>
      {BOOKS.map((b) => (
        <section key={b.id} className="shelf-h">
          <p className="chap">{b.art}</p>
          <h2><Link href={bookPath(b)} style={{ textDecoration: "none" }}>{b.title}</Link></h2>
          <div style={{ display: "flex", gap: 22, alignItems: "flex-start", flexWrap: "wrap" }}>
            <Link href={bookPath(b)} style={{ flex: "none", width: 86 }}>
              <Cover book={b} width={86} />
            </Link>
            <div style={{ flex: 1, minWidth: 220 }}>
              <p style={{ margin: "0 0 .6em", textIndent: 0 }}>{bookContent(b).hub?.description || `${b.art}で${b.q}を読む本。`}</p>
              <p style={{ margin: 0, textIndent: 0, fontSize: 14.5, lineHeight: 2.1 }}>
                {b.items.filter((it) => bookContent(b).items[it.key]).map((it, i) => (
                  <span key={it.slug}>{i > 0 && "　"}<Link href={itemPath(b, it)}>{it.label}</Link></span>
                ))}
              </p>
            </div>
          </div>
          <OpenBook book={b} />
        </section>
      ))}
    </main>
  );
}
