import type { MetadataRoute } from "next";
import { BOOKS, bookContent, bookPath, itemPath } from "@/lib/books";
import { SITE_URL } from "@/lib/site";
import { SECS, itemDoc, secDoc, secPath, topDoc, yItemPath, Y_PATH } from "@/lib/y2027";
import LM from "@/content/lastmod.json";

export const dynamic = "force-static";

/* 更新日は content/lastmod.json（npm run lastmod で生成、本文の項目ごと）と、
   読む人に見える形でページの型を変えた日（SIG・手で更新）のうち、新しいほう */
const SIG: Record<string, string> = {
  "tpl:home": "2026-11-23", // 本棚：蔵書票・栞
  "tpl:book": "2026-11-12", // 本ごとのココナラ案内
  "tpl:item": "2026-11-12", // 案内を本文直後へ・本ごとの文面
  "tpl:item:ki": "2026-11-14", // 見出し下に2027年版へのリンク
  "tpl:item:hoshi": "2026-11-14",
  "tpl:y2027": "2026-11-22", // わたしの2027年
  "tpl:ysec": "2026-11-22", // 計算機
  "tpl:book:ki": "2026-11-22",
  "tpl:book:hoshi": "2026-11-22",
  "tpl:book:meguri": "2026-11-22",
  "tpl:yitem": "2026-11-12", // 結婚・転職に結びつけた案内
  "tpl:mokuroku": "2026-11-01",
  "tpl:privacy": "2026-11-23", // しおり・蔵書票の保存を追記
};
const lm = { ...(LM as Record<string, string>), ...SIG };
const FALLBACK = "2026-10-31";
const latest = (...keys: string[]) => {
  const ds = keys.map((k) => lm[k]).filter(Boolean).sort();
  return new Date(ds.length ? ds[ds.length - 1] : FALLBACK);
};
const YFILES: Record<string, string[]> = {
  kyusei: ["y2027-kyusei.json"],
  seiza: ["y2027-seiza-a.json", "y2027-seiza-b.json"],
  misc: ["y2027-misc.json"],
  eto: ["y2027-eto.json"],
};
const ydoc = (docKey: string) => {
  const [p, k] = docKey.split(":");
  return (YFILES[p] || []).map((f) => `${f}:${k}`);
};

export default function sitemap(): MetadataRoute.Sitemap {
  const u = (p: string, priority: number, d: Date) => ({ url: SITE_URL + p, lastModified: d, changeFrequency: "monthly" as const, priority });
  return [
    u("/", 1, latest("tpl:home")),
    u("/mokuroku/", 0.6, latest("tpl:mokuroku")),
    ...BOOKS.flatMap((b) => [
      u(bookPath(b), 0.9, latest("tpl:book", `tpl:book:${b.id}`, ...b.contentFiles.map((f) => `${f}.json:hub`))),
      ...b.items
        .filter((it) => bookContent(b).items[it.key])
        .map((it) => u(itemPath(b, it), 0.7, latest("tpl:item", `tpl:item:${b.id}`, ...b.contentFiles.map((f) => `${f}.json:items.${it.key}`)))),
    ]),
    ...(topDoc() ? [u(Y_PATH, 0.9, latest("tpl:y2027", ...ydoc("misc:top")))] : []),
    ...SECS.filter((s) => secDoc(s)).flatMap((s) => [
      u(secPath(s), 0.9, latest("tpl:ysec", ...ydoc(s.docKey))),
      ...s.items.filter((it) => itemDoc(s, it)).map((it) => u(yItemPath(s, it), 0.8, latest("tpl:yitem", ...ydoc(`${s.id}:${it.key}`)))),
    ]),
    u("/about/", 0.3, latest("tpl:about")),
    u("/privacy/", 0.2, latest("tpl:privacy")),
    u("/contact/", 0.2, latest("tpl:contact")),
  ];
}
