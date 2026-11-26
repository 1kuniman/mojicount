"use client";

import { useEffect, useState } from "react";

type D = { d: string; w: string; t: string[] };
const NAMES: [string, string][] = [["tensha", "天赦日"], ["manbai", "一粒万倍日"], ["tora", "寅の日"], ["mi", "巳の日"]];
const ALL: Record<string, string> = { tensha: "天赦日", manbai: "一粒万倍日", tora: "寅の日", mi: "巳の日", tsuchinotomi: "己巳の日", kinoene: "甲子の日" };
const label = (t: string[]) => t.filter((k) => !(k === "mi" && t.includes("tsuchinotomi"))).map((k) => ALL[k]).join("・");
const jp = (d: string, w: string) => `${+d.slice(5, 7)}月${+d.slice(8)}日（${w}）`;

/** 今日の暦と、つぎの吉日（見ている人の今日の日付から。日本時間） */
export function KichiNext({ days }: { days: D[] }) {
  const [today, setToday] = useState<string | null>(null);
  useEffect(() => {
    const p = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Tokyo", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
    setToday(p);
  }, []);
  if (!today) return null;
  const last = days[days.length - 1].d;
  if (today > last) return null;
  const diff = (d: string) => Math.round((Date.parse(d + "T00:00:00Z") - Date.parse(today + "T00:00:00Z")) / 86400000);
  const now = days.find((x) => x.d === today);
  const rows = NAMES.map(([k, n]) => ({ n, x: days.find((x) => x.d > today && x.t.includes(k)) })).filter((r) => r.x);
  const best = days.find((x) => x.d > today && x.t.includes("tensha") && x.t.includes("manbai"));
  return (
    <section className="knext" aria-label="今日の暦とつぎの吉日">
      <p className="chap">今日の暦</p>
      <p className="kn-today">
        {+today.slice(5, 7)}月{+today.slice(8)}日は
        {now ? <b>{label(now.t)}</b> : "、ここに載せている吉日にはあたりません"}
        {now ? "です" : ""}
      </p>
      <dl>
        {rows.map((r) => (
          <div key={r.n}>
            <dt>つぎの{r.n}</dt>
            <dd>
              {r.x!.d.slice(0, 4) !== today.slice(0, 4) ? `${r.x!.d.slice(0, 4)}年` : ""}
              {jp(r.x!.d, r.x!.w)}
              <small>あと{diff(r.x!.d)}日</small>
            </dd>
          </div>
        ))}
        {best && (
          <div className="best">
            <dt>天赦日と一粒万倍日が重なる日</dt>
            <dd>
              {best.d.slice(0, 4) !== today.slice(0, 4) ? `${best.d.slice(0, 4)}年` : ""}
              {jp(best.d, best.w)}
              <small>あと{diff(best.d)}日</small>
            </dd>
          </div>
        )}
      </dl>
    </section>
  );
}
