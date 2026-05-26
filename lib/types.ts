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
  pros: string[];
  cons: string[];
  recommendedFor: string;
}
