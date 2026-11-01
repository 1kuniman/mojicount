import fs from "node:fs";
import path from "node:path";
import type { Doc } from "@/lib/books";
import { BOOKS } from "@/lib/books";
import data from "@/content/data.json";

/* 2027年の運勢ページ（/2027/ 以下）。本文は content/y2027-*.json */
export type Month = { m: string; t: string };
export type YDoc = Doc & { months: Month[] };

export const YEAR = 2027;
export const Y_PATH = "/2027/";
const D = data as any;

const load = (f: string): Record<string, YDoc> => {
  const p = path.join(process.cwd(), "content", f);
  return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, "utf8")) : {};
};
let cache: Record<string, YDoc> | null = null;
const all = () => {
  if (!cache) cache = { ...prefix("kyusei", load("y2027-kyusei.json")), ...prefix("seiza", load("y2027-seiza-a.json")), ...prefix("seiza", load("y2027-seiza-b.json")), ...prefix("misc", load("y2027-misc.json")) };
  return cache;
};
function prefix(p: string, o: Record<string, YDoc>) {
  return Object.fromEntries(Object.entries(o).map(([k, v]) => [`${p}:${k}`, v]));
}

export type YItem = { key: string; slug: string; label: string; sub: string; ill: string; evergreen: string };
export type YSec = { id: "kyusei" | "seiza" | "suhi"; slug: string; title: string; short: string; book: string; items: YItem[]; docKey: string };

const ki = BOOKS.find((b) => b.id === "ki")!;
const hoshi = BOOKS.find((b) => b.id === "hoshi")!;
const KI_YEAR: Record<string, string> = { "1": "北西", "2": "西", "3": "北東", "4": "南", "5": "北", "6": "南西", "7": "東", "8": "南東", "9": "中宮" };

export const SECS: YSec[] = [
  {
    id: "kyusei", slug: "kyusei", title: "九星気学 2027年の運勢", short: "九星気学", book: "ki", docKey: "kyusei:hub",
    items: ki.items.map((it) => ({ key: it.key, slug: it.slug, label: `${it.label}の2027年`, sub: `${KI_YEAR[it.key]}に回座・${D.PALACE[KI_YEAR[it.key]].t}`, ill: it.ill, evergreen: `/kyusei/${it.slug}/` })),
  },
  {
    id: "seiza", slug: "seiza", title: "2027年の星占い", short: "12星座", book: "hoshi", docKey: "seiza:hub",
    items: hoshi.items.map((it) => ({ key: it.key, slug: it.slug, label: `${it.label}の2027年`, sub: it.sub || "", ill: it.ill, evergreen: `/seiza/${it.slug}/` })),
  },
  { id: "suhi", slug: "suhi", title: "数秘術 2027年の運勢", short: "数秘術", book: "meguri", docKey: "misc:suhi", items: [] },
];

export const secBySlug = (s: string) => SECS.find((x) => x.slug === s);
export const secPath = (s: YSec) => `${Y_PATH}${s.slug}/`;
export const yItemPath = (s: YSec, it: YItem) => `${Y_PATH}${s.slug}/${it.slug}/`;
export const topDoc = () => all()["misc:top"] as YDoc | undefined;
export const secDoc = (s: YSec) => all()[s.docKey] as YDoc | undefined;
export const itemDoc = (s: YSec, it: YItem) => all()[`${s.id}:${it.key}`] as YDoc | undefined;
export const bookOf = (s: YSec) => BOOKS.find((b) => b.id === s.book)!;
export const kiYearPalace = (key: string) => KI_YEAR[key];
export const palaceTheme = (p: string) => D.PALACE[p] as { t: string; s: string };

const hasPublic = (p: string) => fs.existsSync(path.join(process.cwd(), "public", p));
export const yOg = (parts: string[]) => {
  const p = `og/2027/${parts.join("/") || "index"}.jpg`;
  return hasPublic(p) ? "/" + p : "/og/default.jpg";
};
export const Y_UPDATED = "2026-11-01";
