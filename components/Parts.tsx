import Link from "next/link";
import type { Book, Doc, Item } from "@/lib/books";
import { BOOKS, bookPath, coverSrc, illSrc, itemPath, openHref } from "@/lib/books";
import { AFF, SITE_URL } from "@/lib/site";
import { COVER_META } from "@/lib/covers";
import { amz, luckyFor, type Lucky } from "@/lib/lucky";

/** 表紙の画像に、円の中の題字を重ねる */
export function Cover({ book, width, className, eager }: { book: Book; width: number; className?: string; eager?: boolean }) {
  const c = COVER_META[book.id]?.circle || [0.5, 0.49, 0.5, 0.33];
  const h = Math.round(width / (COVER_META[book.id]?.aspect || 0.665));
  const fs = Math.min(width * 0.13, (c[2] * width) / 3.5);
  return (
    <span className={"coverw " + (className || "")} style={{ width, height: h }}>
      <img src={coverSrc(book)} alt={`${book.title}の表紙`} width={width} height={h} loading={eager ? "eager" : "lazy"} />
      <span className="ct" style={{ left: `${c[0] * 100}%`, top: `${c[1] * 100}%`, fontSize: fs, color: book.id === "kazu" ? "#7a5418" : "#f3dc9a" }}>{book.title}</span>
    </span>
  );
}

export const Orn = () => (
  <svg className="orn" viewBox="0 0 120 12" aria-hidden="true">
    <path d="M0 6h46M74 6h46" stroke="currentColor" strokeWidth=".8" />
    <path d="M60 1l4 5-4 5-4-5z" fill="currentColor" />
    <circle cx="51" cy="6" r="1.3" fill="currentColor" />
    <circle cx="69" cy="6" r="1.3" fill="currentColor" />
  </svg>
);

export function Crumbs({ trail }: { trail: { name: string; href?: string }[] }) {
  const ld = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({ "@type": "ListItem", position: i + 1, name: t.name, ...(t.href ? { item: SITE_URL + t.href } : {}) })),
  };
  return (
    <nav className="crumbs" aria-label="現在地">
      <ol>
        {trail.map((t, i) => (
          <li key={i}>{t.href && i < trail.length - 1 ? <Link href={t.href}>{t.name}</Link> : <span aria-current="page">{t.name}</span>}</li>
        ))}
      </ol>
      <JsonLd data={ld} />
    </nav>
  );
}

export const JsonLd = ({ data }: { data: object }) => (
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
);

export function OpenBook({ book, label }: { book: Book; label?: string }) {
  return (
    <a className="open" href={openHref(book)}>
      <span className="seal" aria-hidden="true">読</span>
      <span>
        <b>{label || `${book.title}をひらいて占う`}</b>
        <small>{book.need}で読む・無料・登録なし</small>
      </span>
    </a>
  );
}

const KANJI = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];

export function Body({ doc }: { doc: Doc }) {
  return (
    <article>
      {doc.sections.map((s, i) => (
        <section key={i}>
          <p className="chap">第{KANJI[i] || i + 1}章</p>
          <h2>{s.h2}</h2>
          {s.paras.map((p, j) => (
            <p key={j} className={i === 0 && j === 0 ? "dc" : undefined}>{p}</p>
          ))}
          {s.list && s.list.length > 0 && (
            <ul>
              {s.list.map((l, j) => (
                <li key={j}>{l}</li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </article>
  );
}

export function FaqBlock({ faq }: { faq: { q: string; a: string }[] }) {
  if (!faq || !faq.length) return null;
  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <section className="faq">
      <p className="chap">問いと答え</p>
      <h2>よくある質問</h2>
      {faq.map((f, i) => (
        <details key={i}>
          <summary>{f.q}</summary>
          <p>{f.a}</p>
        </details>
      ))}
      <JsonLd data={ld} />
    </section>
  );
}

export function ItemCards({ book, current }: { book: Book; current?: string }) {
  return (
    <ul className="cards">
      {book.items.map((it) => {
        const src = illSrc(it.ill);
        return (
          <li key={it.slug}>
            <Link href={itemPath(book, it)} aria-current={it.slug === current ? "page" : undefined}>
              {src ? (
                <span className="th"><img src={src} alt="" loading="lazy" width={84} height={84} /></span>
              ) : (
                <span className="th blank" aria-hidden="true">{book.title[0]}</span>
              )}
              <b>{it.label}</b>
              {it.sub && <small>{it.sub}</small>}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function OtherBooks({ except }: { except?: string }) {
  return (
    <ul className="cards books">
      {BOOKS.filter((b) => b.id !== except).map((b) => (
        <li key={b.id}>
          <Link href={bookPath(b)}>
            <Cover book={b} width={76} className="cv" />
            <b>{b.title}</b>
            <small>{b.art}</small>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function Aff({ note, label, head }: { note?: string; label?: string; head?: string } = {}) {
  if (!AFF.url) return null;
  return (
    <aside className="aff">
      <small className="pr">PR</small>
      {head && <p className="aff-h">{head}</p>}
      <p>{note ?? AFF.note}</p>
      <a href={AFF.url} rel="sponsored noopener" target="_blank">{label ?? AFF.label}</a>
      <img className="px" src={AFF.pixel} width={1} height={1} alt="" />
      {AFF.sub && (
        <span className="aff-sub">
          <a href={AFF.sub.url} rel="sponsored noopener" target="_blank">{AFF.sub.label}</a>
          <img className="px" src={AFF.sub.pixel} width={1} height={1} alt="" />
        </span>
      )}
      <small>外部サイト（ココナラ）に移動します・広告</small>
    </aside>
  );
}

export function LuckyItems({ book, item, lead, title }: { book: Book; item?: Item; lead?: Lucky; title?: string }) {
  const items = luckyFor(book, item, lead);
  if (!items.length) return null;
  return (
    <section className="lucky">
      <p className="chap">{title ?? `${item ? `${item.label}の` : ""}ラッキーアイテム`}</p>
      <ol>
        {items.map((x, i) => (
          <li key={x.n}>
            <span className="n">{"一二三"[i]}</span>
            <a href={amz(x.kw)} target="_blank" rel="sponsored noopener">
              <b>{x.n}</b>
              <span className="w">{x.why}</span>
              <span className="go">Amazonで探す ›</span>
            </a>
          </li>
        ))}
      </ol>
      <small>PR・Amazonの検索結果に移動します</small>
    </section>
  );
}

export function Plate({ item, book }: { item?: Item; book: Book }) {
  const src = item ? illSrc(item.ill) : illSrc(book.hubIll);
  if (src) return <div className="plate"><img src={src} alt={item ? `${item.label}の挿絵` : `${book.title}の挿絵`} width={340} height={340} /></div>;
  return <div className="plate cover"><Cover book={book} width={240} eager /></div>;
}
