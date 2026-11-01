import type { MetadataRoute } from "next";
import { BOOKS, bookContent, bookPath, itemPath } from "@/lib/books";
import { SITE_URL } from "@/lib/site";
import { SECS, itemDoc, secDoc, secPath, topDoc, yItemPath, Y_PATH } from "@/lib/y2027";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date("2026-10-31");
  const u = (p: string, priority: number) => ({ url: SITE_URL + p, lastModified: now, changeFrequency: "monthly" as const, priority });
  return [
    u("/", 1),
    u("/mokuroku/", 0.6),
    ...BOOKS.flatMap((b) => [
      u(bookPath(b), 0.9),
      ...b.items.filter((it) => bookContent(b).items[it.key]).map((it) => u(itemPath(b, it), 0.7)),
    ]),
    ...(topDoc() ? [u(Y_PATH, 0.9)] : []),
    ...SECS.filter((s) => secDoc(s)).flatMap((s) => [u(secPath(s), 0.9), ...s.items.filter((it) => itemDoc(s, it)).map((it) => u(yItemPath(s, it), 0.8))]),
    u("/about/", 0.3),
    u("/privacy/", 0.2),
    u("/contact/", 0.2),
  ];
}
