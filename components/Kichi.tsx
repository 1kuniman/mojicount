import Link from "next/link";
import { amz, type Lucky } from "@/lib/lucky";
import { K_DAYS, K_ITEMS, K_TAGS, kPath, type KDay } from "@/lib/kichi";

const dd = (x: KDay) => `${+x.d.slice(8)}日（${x.w}）`;
const strong = (x: KDay) => x.t.includes("tensha") || (x.t.includes("manbai") && (x.t.includes("tora") || x.t.includes("mi")));

/** 2027年の吉日を、月ごとに並べた暦 */
export function KichiCal() {
  return (
    <section className="months kcal" id="calendar">
      <p className="chap">月ごとの暦</p>
      <h2>2027年の吉日カレンダー</h2>
      <p className="kcal-note">★は、天赦日、または一粒万倍日に寅の日・巳の日が重なる日です。</p>
      <dl>
        {Array.from({ length: 12 }, (_, i) => {
          const mm = String(i + 1).padStart(2, "0");
          const days = K_DAYS.filter((x) => x.d.startsWith(`2027-${mm}`));
          return (
            <div key={mm} id={`m${i + 1}`}>
              <dt>{i + 1}月</dt>
              <dd>
                {K_TAGS.map((t) => {
                  const xs = days.filter((x) => x.t.includes(t.id));
                  if (!xs.length) return null;
                  return (
                    <span className="kline" key={t.id}>
                      <b>{t.name}</b>
                      {xs.map((x, j) => (
                        <span key={x.d} className={strong(x) ? "k-strong" : undefined}>
                          {j ? "、" : ""}
                          {strong(x) ? "★" : ""}
                          {dd(x)}
                        </span>
                      ))}
                    </span>
                  );
                })}
              </dd>
            </div>
          );
        })}
      </dl>
    </section>
  );
}

/** 吉日ごとの頁への案内 */
export function KichiCards({ current }: { current?: string }) {
  return (
    <ul className="cards">
      {K_ITEMS.map((it) => (
        <li key={it.slug}>
          <Link href={kPath(it)} aria-current={it.slug === current ? "page" : undefined}>
            <span className="th blank" aria-hidden="true">{it.mark}</span>
            <b>{it.label}</b>
            <small>{it.sub}</small>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** 吉日に合わせて新調するもの（Amazonの検索結果へ） */
export function KichiItems({ items, title }: { items: Lucky[]; title: string }) {
  return (
    <section className="lucky" data-place="lucky">
      <p className="chap">{title}</p>
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
