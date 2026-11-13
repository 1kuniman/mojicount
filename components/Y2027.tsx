import Link from "next/link";
import { illSrc } from "@/lib/books";
import type { Month, YItem, YSec } from "@/lib/y2027";
import { SECS, secPath, yItemPath } from "@/lib/y2027";

/** 12か月の過ごし方（暦の表） */
export function Months({ months, title }: { months: Month[]; title: string }) {
  if (!months?.length) return null;
  return (
    <section className="months">
      <p className="chap">月ごとの暦</p>
      <h2>{title}</h2>
      <dl>
        {months.map((m, i) => (
          <div key={i} id={m.m.startsWith("2028") ? "m-next1" : `m${m.m.match(/^(\d+)月/)?.[1] ?? i}`}>
            <dt>{m.m}</dt>
            <dd>{m.t}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/** 2027年のページの一覧カード */
export function YCards({ sec, current }: { sec: YSec; current?: string }) {
  return (
    <ul className="cards">
      {sec.items.map((it: YItem) => {
        const src = illSrc(it.ill);
        return (
          <li key={it.slug}>
            <Link href={yItemPath(sec, it)} aria-current={it.slug === current ? "page" : undefined}>
              {src ? <span className="th"><img src={src} alt="" loading="lazy" width={84} height={84} /></span> : <span className="th blank" aria-hidden="true">{it.label[0]}</span>}
              <b>{it.label}</b>
              {it.sub && <small>{it.sub}</small>}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/** 2027年の四つの入り口 */
export function YSecs({ except }: { except?: string }) {
  return (
    <ul className="ysecs">
      {SECS.filter((s) => s.slug !== except).map((s) => (
        <li key={s.slug}>
          <Link href={secPath(s)}>
            <b>{s.title}</b>
            <small>{s.id === "kyusei" ? "本命星ごとの一年と、月ごとの暦" : s.id === "seiza" ? "12星座ごとの一年と、星の動き" : s.id === "eto" ? "生まれ年の干支と、丁未の年の相性" : "パーソナルイヤーで読む九つの一年"}</small>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** 解説ページに置く、2027年版への案内 */
export function YLink({ href, label }: { href: string; label: string }) {
  return (
    <p className="ylink">
      <Link href={href}>
        <span className="yr">2027</span>
        <span>{label} ›</span>
      </Link>
    </p>
  );
}
