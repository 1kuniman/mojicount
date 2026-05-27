import type { MetadataRoute } from "next";
import { articles } from "@/lib/articles";
import { categories } from "@/lib/categories";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    "",
    "/articles",
    "/compare",
    "/ranking",
    "/about",
    "/privacy",
    "/disclaimer",
    "/contact",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const categoryRoutes = categories.map((c) => ({
    url: `${siteUrl}/category/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const articleRoutes = articles.map((a) => ({
    url: `${siteUrl}/articles/${a.slug}`,
    lastModified: new Date(a.updated ?? a.date),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...categoryRoutes, ...articleRoutes];
}
