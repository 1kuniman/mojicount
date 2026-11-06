import L from "@/content/lucky.json";
import data from "@/content/data.json";
import type { Book, Item } from "@/lib/books";

export type Lucky = { n: string; kw: string; why: string };
const D = data as any;
const P = L.pool as Record<string, Lucky[]>;
const ORDER = L.order as Record<string, string[]>;
const EL = L.el as Record<string, Lucky>;

export const AMZ_TAG = L.tag;
export const amz = (kw: string) => `https://www.amazon.co.jp/s?k=${encodeURIComponent(kw)}&tag=${L.tag}`;

const h = (s: string) => {
  let x = 2166136261;
  for (const c of s) x = Math.imul(x ^ c.codePointAt(0)!, 16777619) >>> 0;
  return x;
};

/** 結果に合わせた三つのラッキーアイテム（本の中と同じ選び方。解説ページは日替わりにしない） */
export function luckyFor(book: Book, item?: Item): Lucky[] {
  const ord = ORDER[book.id];
  if (!L.tag || !ord) return [];
  const out: Lucky[] = [];
  if (item && book.id === "ishi") out.push({ n: `${item.label}のブレスレット`, kw: `${item.label} ブレスレット 天然石`, why: "あなたの守護石を、毎日身につけられる形で。" });
  if (item && book.id === "iro") {
    const c = item.label.replace("のオーラ", "");
    out.push({ n: `${c}色のハンカチ`, kw: `ハンカチ ${c}色`, why: `${c}のオーラを、手もとにそっと持ち歩いて。` });
  }
  if (item && book.id === "ki") {
    const k = D.KISEI[Number(item.key)];
    if (k && EL[k.el]) out.push(EL[k.el]);
  }
  const seed = `${book.id}|${item ? item.key : "hub"}`;
  for (let i = 0; out.length < 3 && i < 30; i++) {
    const p = P[ord[i % ord.length]];
    const it = p[h(seed + "|" + i) % p.length];
    if (!out.some((o) => o.n === it.n)) out.push(it);
  }
  return out;
}
