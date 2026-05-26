// 美容すすめ - データモデル定義

export type CategorySlug = "medical-diet" | "datsumo" | "clinic" | "guide";

/** 記事本文を構成するブロック。h2 は目次の自動生成に使われる（id 必須）。 */
export type Block =
  | { type: "h2"; id: string; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "note"; title?: string; text: string }
  | { type: "table"; caption?: string; headers: string[]; rows: string[][] };

/** 口コミ風セクション。あくまで一般的な声のイメージ例（実在の個人の感想ではない）。 */
export interface Review {
  nickname: string;
  age: string;
  rating: number;
  text: string;
}

export interface Author {
  id: string;
  name: string;
  role: string;
  emoji: string;
  bio: string;
}

export interface Article {
  slug: string;
  title: string;
  /** メタディスクリプション兼カード説明文 */
  description: string;
  category: CategorySlug;
  tags: string[];
  /** ISO 形式 yyyy-mm-dd */
  date: string;
  updated?: string;
  /** 一覧で目立たせる人気記事フラグ */
  popular?: boolean;
  /** 先月人気ランキング用の順位（1〜5） */
  monthlyRank?: number;
  /** 執筆者 ID（lib/authors.ts） */
  author?: string;
  /** 「この記事でわかること」 */
  summary?: string[];
  /** 「編集部の結論」 */
  conclusion?: string;
  /** 「こんな人におすすめ」 */
  bestFor?: string[];
  /** 「関連する施術・クリニック」で表示するカテゴリ（省略時は category） */
  relatedServiceCategory?: CategorySlug;
  /** 口コミ風セクション（イメージ例） */
  reviews?: Review[];
  blocks: Block[];
}

export interface Category {
  slug: CategorySlug;
  name: string;
  /** ナビ・見出し用の短いラベル */
  shortName: string;
  emoji: string;
  description: string;
  /** トップページのカテゴリ別セクションに表示するか */
  primary: boolean;
}

export interface Service {
  id: string;
  name: string;
  category: CategorySlug;
  rank: number;
  catchphrase: string;
  /** 5 点満点 */
  rating: number;
  priceFrom: string;
  features: string[];
  /** おすすめポイント（3つ） */
  pros: string[];
  cons: string[];
  recommendedFor: string;
}

/** トップページ「あなたの悩みから探す」用 */
export interface Concern {
  id: string;
  label: string;
  emoji: string;
  description: string;
  /** リンク先カテゴリ */
  category: CategorySlug;
}
