import type { Article, Block, CategorySlug } from "../types";

import manjaroToha from "./manjaro-toha";
import manjaroRanking2026 from "./manjaro-ranking-2026";
import medicalDietInjectionHikaku from "./medical-diet-injection-hikaku";
import datsumoSalonRanking2026 from "./datsumo-salon-ranking-2026";
import medicalVsHikariDatsumo from "./medical-vs-hikari-datsumo";
import biyouClinicRanking2026 from "./biyou-clinic-ranking-2026";
import futaeSeikeiHiyou from "./futae-seikei-hiyou";
import hanaSeikeiRanking2026 from "./hana-seikei-ranking-2026";
import biyouHifukaRanking from "./biyou-hifuka-ranking";
import biyouIryouBeginnerGuide from "./biyou-iryou-beginner-guide";

/** 公開記事一覧（新しい順） */
export const articles: Article[] = [
  manjaroToha,
  manjaroRanking2026,
  medicalDietInjectionHikaku,
  datsumoSalonRanking2026,
  medicalVsHikariDatsumo,
  biyouClinicRanking2026,
  futaeSeikeiHiyou,
  hanaSeikeiRanking2026,
  biyouHifukaRanking,
  biyouIryouBeginnerGuide,
].sort((a, b) => (a.date < b.date ? 1 : -1));

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: CategorySlug): Article[] {
  return articles.filter((a) => a.category === category);
}

export const popularArticles: Article[] = articles.filter((a) => a.popular);

/** 同じカテゴリを優先しつつ、足りなければ他カテゴリから補って関連記事を返す */
export function getRelatedArticles(slug: string, limit = 3): Article[] {
  const current = getArticle(slug);
  if (!current) return [];
  const sameCategory = articles.filter(
    (a) => a.slug !== slug && a.category === current.category
  );
  const others = articles.filter(
    (a) => a.slug !== slug && a.category !== current.category
  );
  return [...sameCategory, ...others].slice(0, limit);
}

/** 記事本文の h2 ブロックから目次を生成する */
export interface TocItem {
  id: string;
  text: string;
}

export function buildToc(blocks: Block[]): TocItem[] {
  return blocks
    .filter((b): b is Extract<Block, { type: "h2" }> => b.type === "h2")
    .map((b) => ({ id: b.id, text: b.text }));
}

/** ざっくりした読了時間（分）。日本語は400字/分で概算。 */
export function estimateReadingMinutes(blocks: Block[]): number {
  const chars = blocks.reduce((sum, b) => {
    if ("text" in b && b.text) return sum + b.text.length;
    if ("items" in b && b.items) return sum + b.items.join("").length;
    if (b.type === "table") {
      const cells = [...b.headers, ...b.rows.flat()].join("");
      return sum + cells.length;
    }
    return sum;
  }, 0);
  return Math.max(1, Math.round(chars / 400));
}
