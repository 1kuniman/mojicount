import type { Category, CategorySlug } from "./types";

export const categories: Category[] = [
  {
    slug: "medical-diet",
    name: "医療ダイエット",
    shortName: "医療ダイエット",
    emoji: "💉",
    description:
      "GLP-1・GIP受容体作動薬などの医療痩身を、効果・副作用・費用の観点から本音で比較します。",
    primary: true,
  },
  {
    slug: "datsumo",
    name: "脱毛",
    shortName: "脱毛",
    emoji: "✨",
    description:
      "医療脱毛と光（サロン）脱毛の違い、全身・顔・VIOの選び方をわかりやすく解説します。",
    primary: true,
  },
  {
    slug: "clinic",
    name: "美容クリニック",
    shortName: "美容クリニック",
    emoji: "🌸",
    description:
      "二重整形・鼻整形・美容皮膚科など、目的別におすすめの美容クリニックを比較します。",
    primary: true,
  },
  {
    slug: "guide",
    name: "はじめての美容医療",
    shortName: "初心者ガイド",
    emoji: "📖",
    description:
      "「何から始めればいい？」という方へ。美容医療の基礎知識とクリニックの選び方をまとめました。",
    primary: false,
  },
];

const categoryMap = new Map<CategorySlug, Category>(
  categories.map((c) => [c.slug, c])
);

export function getCategory(slug: CategorySlug): Category | undefined {
  return categoryMap.get(slug);
}

export const primaryCategories = categories.filter((c) => c.primary);
