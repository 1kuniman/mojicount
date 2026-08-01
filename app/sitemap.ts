import type { MetadataRoute } from "next";
import { TOOLS } from "@/lib/tools";

const STATIC_PAGES = [
  "/privacy/",
  "/about/",
  "/contact/",
  "/column/",
  "/column/genkoyoshi/",
  "/column/gib-vs-gb/",
  "/column/password-safety/",
  "/column/qr-mechanism/",
  "/column/base64/",
  "/column/zenkaku-hankaku/",
  "/column/url-encode/",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.mojimojicount.com";
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...TOOLS.map((t) => ({
      url: `${base}${t.href}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...STATIC_PAGES.map((p) => ({
      url: `${base}${p}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
