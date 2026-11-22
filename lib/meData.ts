import { BOOKS, itemPath } from "@/lib/books";
import { ETO, SECS, itemDoc, kiYearPalace, palaceTheme, yItemPath } from "@/lib/y2027";
import data from "@/content/data.json";

/* 「わたしの2027年」と計算機に渡す、結果ごとの見出し・リンク（ビルド時に作る） */
export type MeItem = { label: string; sub: string; href: string; base?: string };
export type MeData = { star: Record<string, MeItem>; sign: MeItem[]; eto: MeItem[]; py: Record<string, MeItem> };

const D = data as any;
const sec = (id: string) => SECS.find((s) => s.id === id)!;
const book = (id: string) => BOOKS.find((b) => b.id === id)!;
/** 「…：テーマ」形式の h1 から、テーマだけを取り出す */
const themeOf = (h1?: string) => (h1 && h1.includes("：") ? h1.split("：").slice(1).join("：") : "");

let cache: MeData | null = null;
export function meData(): MeData {
  if (cache) return cache;
  const ks = sec("kyusei"), ss = sec("seiza"), es = sec("eto");
  const ki = book("ki"), hoshi = book("hoshi"), meguri = book("meguri");

  const star: Record<string, MeItem> = {};
  for (const it of ks.items) {
    const p = kiYearPalace(it.key);
    const b = ki.items.find((x) => x.key === it.key)!;
    star[it.key] = { label: D.KISEI[+it.key].jp, sub: `2027年は${p}・${palaceTheme(p).t}`, href: yItemPath(ks, it), base: itemPath(ki, b) };
  }
  const sign: MeItem[] = ss.items.map((it) => {
    const b = hoshi.items.find((x) => x.key === it.key)!;
    // 2027年の頁のタイトル「…12か月：◯◯」の◯◯を、その星座の2027年の一言として使う
    const t = itemDoc(ss, it)?.title || "";
    return { label: b.label, sub: (t.includes("：") ? t.split("：").slice(1).join("：") : "") || b.sub || "", href: yItemPath(ss, it), base: itemPath(hoshi, b) };
  });
  const eto: MeItem[] = es.items.map((it, i) => ({
    label: `${it.key}年・${ETO[i].animal}`,
    sub: themeOf(itemDoc(es, it)?.h1) || `未と${ETO[i].rel}`,
    href: yItemPath(es, it),
  }));
  const py: Record<string, MeItem> = {};
  for (const it of meguri.items) py[it.key] = { label: `パーソナルイヤー${it.key}`, sub: D.PY[it.key][0], href: itemPath(meguri, it) };

  cache = { star, sign, eto, py };
  return cache;
}
