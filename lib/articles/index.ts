import type { Article, Block, CategorySlug, Faq } from "../types";

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
// 2026年5月 追加分
import manjaro202605 from "./manjaro-2026-05";
import shonanDatsumoReview from "./shonan-datsumo-review";
import gorillaClinicReview from "./gorilla-clinic-review";
import iryouDatsumoHikaku2026 from "./iryou-datsumo-hikaku-2026";
import shimiLaserHikaku2026 from "./shimi-laser-hikaku-2026";
import hyaluronicAcid2026 from "./hyaluronic-acid-2026";
import botoxHikaku2026 from "./botox-hikaku-2026";
import iryouSoushinRanking2026 from "./iryou-soushin-ranking-2026";
import futaeMaibotsu2026 from "./futae-maibotsu-2026";
import biyouHifukaMenu from "./biyou-hifuka-menu";
// 2026年5月 料金比較・口コミ強化分
import iryouDatsumoRyoukinSouba2026 from "./iryou-datsumo-ryoukin-souba-2026";
import reginaClinicReview2026 from "./regina-clinic-review-2026";
import freyaClinicReview2026 from "./freya-clinic-review-2026";
import rizeClinicReview2026 from "./rize-clinic-review-2026";
import shonanDatsumoReview2026 from "./shonan-datsumo-review-2026";
import manjaroKoukaFukusayou2026 from "./manjaro-kouka-fukusayou-2026";
import actuallyClinicReview from "./actually-clinic-review";
import iryouVsSalonDatsumo2026 from "./iryou-vs-salon-datsumo-2026";
import datsumoSalonOsusume2026 from "./datsumo-salon-osusume-2026";
import biyouIryouHajimeruMae from "./biyou-iryou-hajimeru-mae";
// 2026年5月末 追加分（口コミ・徹底比較・部位別ガイド・選び方）
import freyaClinicKuchikomi2026 from "./freya-clinic-kuchikomi-2026";
import rizeClinicKuchikomi2026 from "./rize-clinic-kuchikomi-2026";
import mensRizeKuchikomi2026 from "./mens-rize-kuchikomi-2026";
import gorillaClinicKuchikomi2026 from "./gorilla-clinic-kuchikomi-2026";
import actuallyClinicManjaroKuchikomi from "./actually-clinic-manjaro-kuchikomi";
import levaClinicReview from "./leva-clinic-review";
import monaClinicReview from "./mona-clinic-review";
import shonanDatsumoKuchikomi2026 from "./shonan-datsumo-kuchikomi-2026";
import iryouVsSalonDatsumoTetteihikaku2026 from "./iryou-vs-salon-datsumo-tetteihikaku-2026";
import vioDatsumoOsusume2026 from "./vio-datsumo-osusume-2026";
import kaoDatsumoOsusume2026 from "./kao-datsumo-osusume-2026";
import higeDatsumoOsusume2026 from "./hige-datsumo-osusume-2026";
import manjaroVsOzempic2026 from "./manjaro-vs-ozempic-2026";
import glp1DietToha from "./glp1-diet-toha";
import shibouYoukaiOsusume2026 from "./shibou-youkai-osusume-2026";
import iryouDietShuruiHikaku2026 from "./iryou-diet-shurui-hikaku-2026";
import biyouClinicCounselingFlow from "./biyou-clinic-counseling-flow";
import iryouDatsumoKaisuuMeyasu from "./iryou-datsumo-kaisuu-meyasu";
import datsumoSalonOsusumeRanking2026 from "./datsumo-salon-osusume-ranking-2026";
import biyouIryouErabikata2026 from "./biyou-iryou-erabikata-2026";
// 2026年6月 追加分（「ぶっちゃけ」本音スタイル）
import datsumoBucchakeKaisuu2026 from "./datsumo-bucchake-kaisuu-2026";
import datsumoBucchakeItami2026 from "./datsumo-bucchake-itami-2026";
import datsumoKoukaiRiyuuTop52026 from "./datsumo-koukai-riyuu-top5-2026";
import freyaBucchake2026 from "./freya-bucchake-2026";
import rizeBucchake2026 from "./rize-bucchake-2026";
import mensRizeBucchake2026 from "./mens-rize-bucchake-2026";
import gorillaBucchake2026 from "./gorilla-bucchake-2026";
import manjaroBucchakeNankiro2026 from "./manjaro-bucchake-nankiro-2026";
import actuallyBucchake2026 from "./actually-bucchake-2026";
import levaBucchake2026 from "./leva-bucchake-2026";
import iryouVsHikariBucchake2026 from "./iryou-vs-hikari-bucchake-2026";
import vioBucchakeItami2026 from "./vio-bucchake-itami-2026";
import salonVsIryouBucchakeOtoku2026 from "./salon-vs-iryou-bucchake-otoku-2026";
import manjaroVsWegovyBucchake2026 from "./manjaro-vs-wegovy-bucchake-2026";
import biyouClinicBucchakeCounseling2026 from "./biyou-clinic-bucchake-counseling-2026";
// 2026年6月 SEO強化 追加分（競合の少ないキーワード30本）
import actuallyManjaroRyoukin2026 from "./actually-manjaro-ryoukin-2026";
import levaManjaroRyoukin2026 from "./leva-manjaro-ryoukin-2026";
import monaManjaroRyoukin2026 from "./mona-manjaro-ryoukin-2026";
import manjaro05mg25mgChigai2026 from "./manjaro-0-5mg-2-5mg-chigai-2026";
import manjaroShokujiSeigen2026 from "./manjaro-shokuji-seigen-2026";
import manjaroHakikeTaisaku2026 from "./manjaro-hakike-taisaku-2026";
import manjaroKoukaKikan2026 from "./manjaro-kouka-kikan-2026";
import glp1VsManjaro2026 from "./glp1-vs-manjaro-2026";
import onlineDietMeritDemerit2026 from "./online-diet-merit-demerit-2026";
import iryouDietHajimeruMae2026 from "./iryou-diet-hajimeru-mae-2026";
import mensRizeRyoukinKuchikomi2026 from "./mens-rize-ryoukin-kuchikomi-2026";
import gorillaDatsumoRyoukinKuchikomi2026 from "./gorilla-datsumo-ryoukin-kuchikomi-2026";
import freyaMensRyoukinKuchikomi2026 from "./freya-mens-ryoukin-kuchikomi-2026";
import mensVioDatsumoOsusume2026 from "./mens-vio-datsumo-osusume-2026";
import mensZenshinDatsumoRyoukin2026 from "./mens-zenshin-datsumo-ryoukin-2026";
import reginaYoyakuTorinikui2026 from "./regina-yoyaku-torinikui-2026";
import freyaGekkaku2300Jittai2026 from "./freya-gekkaku-2300-jittai-2026";
import rizeTsuikaShoushaHoshou2026 from "./rize-tsuika-shousha-hoshou-2026";
import shonanDatsumoYoyakuKonzatsu2026 from "./shonan-datsumo-yoyaku-konzatsu-2026";
import iryouDatsumoCounseling102026 from "./iryou-datsumo-counseling-10-2026";
import iryouDatsumoNansaiKara2026 from "./iryou-datsumo-nansai-kara-2026";
import iryouDatsumoHiyake2026 from "./iryou-datsumo-hiyake-2026";
import iryouDatsumoNinshinJunyu2026 from "./iryou-datsumo-ninshin-junyu-2026";
import iryouDatsumoAftercare2026 from "./iryou-datsumo-aftercare-2026";
import iryouDatsumoKoukaDenai2026 from "./iryou-datsumo-kouka-denai-2026";
import datsumoShavingYarikata2026 from "./datsumo-shaving-yarikata-2026";
import iryouDatsumoShiharaiHouhou2026 from "./iryou-datsumo-shiharai-houhou-2026";
import iryouDatsumoCoolingOff2026 from "./iryou-datsumo-cooling-off-2026";
import datsumoSalonHeiten2026 from "./datsumo-salon-heiten-2026";
import iryouVsBiyouDatsumoChigai2026 from "./iryou-vs-biyou-datsumo-chigai-2026";

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
  manjaro202605,
  shonanDatsumoReview,
  gorillaClinicReview,
  iryouDatsumoHikaku2026,
  shimiLaserHikaku2026,
  hyaluronicAcid2026,
  botoxHikaku2026,
  iryouSoushinRanking2026,
  futaeMaibotsu2026,
  biyouHifukaMenu,
  iryouDatsumoRyoukinSouba2026,
  reginaClinicReview2026,
  freyaClinicReview2026,
  rizeClinicReview2026,
  shonanDatsumoReview2026,
  manjaroKoukaFukusayou2026,
  actuallyClinicReview,
  iryouVsSalonDatsumo2026,
  datsumoSalonOsusume2026,
  biyouIryouHajimeruMae,
  freyaClinicKuchikomi2026,
  rizeClinicKuchikomi2026,
  mensRizeKuchikomi2026,
  gorillaClinicKuchikomi2026,
  actuallyClinicManjaroKuchikomi,
  levaClinicReview,
  monaClinicReview,
  shonanDatsumoKuchikomi2026,
  iryouVsSalonDatsumoTetteihikaku2026,
  vioDatsumoOsusume2026,
  kaoDatsumoOsusume2026,
  higeDatsumoOsusume2026,
  manjaroVsOzempic2026,
  glp1DietToha,
  shibouYoukaiOsusume2026,
  iryouDietShuruiHikaku2026,
  biyouClinicCounselingFlow,
  iryouDatsumoKaisuuMeyasu,
  datsumoSalonOsusumeRanking2026,
  biyouIryouErabikata2026,
  datsumoBucchakeKaisuu2026,
  datsumoBucchakeItami2026,
  datsumoKoukaiRiyuuTop52026,
  freyaBucchake2026,
  rizeBucchake2026,
  mensRizeBucchake2026,
  gorillaBucchake2026,
  manjaroBucchakeNankiro2026,
  actuallyBucchake2026,
  levaBucchake2026,
  iryouVsHikariBucchake2026,
  vioBucchakeItami2026,
  salonVsIryouBucchakeOtoku2026,
  manjaroVsWegovyBucchake2026,
  biyouClinicBucchakeCounseling2026,
  actuallyManjaroRyoukin2026,
  levaManjaroRyoukin2026,
  monaManjaroRyoukin2026,
  manjaro05mg25mgChigai2026,
  manjaroShokujiSeigen2026,
  manjaroHakikeTaisaku2026,
  manjaroKoukaKikan2026,
  glp1VsManjaro2026,
  onlineDietMeritDemerit2026,
  iryouDietHajimeruMae2026,
  mensRizeRyoukinKuchikomi2026,
  gorillaDatsumoRyoukinKuchikomi2026,
  freyaMensRyoukinKuchikomi2026,
  mensVioDatsumoOsusume2026,
  mensZenshinDatsumoRyoukin2026,
  reginaYoyakuTorinikui2026,
  freyaGekkaku2300Jittai2026,
  rizeTsuikaShoushaHoshou2026,
  shonanDatsumoYoyakuKonzatsu2026,
  iryouDatsumoCounseling102026,
  iryouDatsumoNansaiKara2026,
  iryouDatsumoHiyake2026,
  iryouDatsumoNinshinJunyu2026,
  iryouDatsumoAftercare2026,
  iryouDatsumoKoukaDenai2026,
  datsumoShavingYarikata2026,
  iryouDatsumoShiharaiHouhou2026,
  iryouDatsumoCoolingOff2026,
  datsumoSalonHeiten2026,
  iryouVsBiyouDatsumoChigai2026,
].sort((a, b) => (a.date < b.date ? 1 : -1));

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: CategorySlug): Article[] {
  return articles.filter((a) => a.category === category);
}

export const popularArticles: Article[] = articles.filter((a) => a.popular);

/** 「先月人気だった記事 TOP5」: monthlyRank 指定を優先し、足りなければ人気・新着で補完 */
export function getMonthlyTop5(): Article[] {
  const ranked = articles
    .filter((a) => typeof a.monthlyRank === "number")
    .sort((a, b) => (a.monthlyRank ?? 99) - (b.monthlyRank ?? 99));
  const rest = articles.filter((a) => typeof a.monthlyRank !== "number");
  const ordered = [...ranked, ...rest.filter((a) => a.popular), ...rest];
  // 重複除去して5件
  const seen = new Set<string>();
  const result: Article[] = [];
  for (const a of ordered) {
    if (seen.has(a.slug)) continue;
    seen.add(a.slug);
    result.push(a);
    if (result.length === 5) break;
  }
  return result;
}

/** 人気記事 TOP N（サイドバー用）。popular→monthlyRank→新着の順で重複なく抽出 */
export function getPopularTop10(limit = 10): Article[] {
  const ranked = articles
    .filter((a) => typeof a.monthlyRank === "number")
    .sort((a, b) => (a.monthlyRank ?? 99) - (b.monthlyRank ?? 99));
  const ordered = [
    ...ranked,
    ...articles.filter((a) => a.popular && typeof a.monthlyRank !== "number"),
    ...articles,
  ];
  const seen = new Set<string>();
  const result: Article[] = [];
  for (const a of ordered) {
    if (seen.has(a.slug)) continue;
    seen.add(a.slug);
    result.push(a);
    if (result.length === limit) break;
  }
  return result;
}

/**
 * 記事のFAQを取得する。article.faqs があればそれを使い、
 * なければ本文の「よくある質問」見出し以下の「Q. … A. …」形式の段落から抽出する。
 * FAQPage 構造化データ（JSON-LD）の生成に使用。
 */
export function getFaqs(article: Article): Faq[] {
  if (article.faqs && article.faqs.length > 0) return article.faqs;
  const out: Faq[] = [];
  let inFaq = false;
  for (const b of article.blocks) {
    if (b.type === "h2") {
      inFaq = b.text.includes("よくある質問") || b.text.includes("FAQ") || b.text.includes("Q&A");
      continue;
    }
    if (!inFaq || b.type !== "p") continue;
    const t = b.text.trim();
    const qm = t.match(/^Q[.\．:：\s]*([\s\S]+)$/);
    if (!qm) continue;
    const rest = qm[1];
    const am = rest.match(/A[.\．:：\s]+([\s\S]+)$/);
    if (!am || am.index === undefined) continue;
    const q = rest.slice(0, am.index).trim().replace(/[\s　]+$/, "");
    const a = am[1].trim();
    if (q && a) out.push({ q, a });
  }
  return out;
}

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
