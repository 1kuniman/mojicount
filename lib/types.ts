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

/** ランキングのタブ分類 */
export type ServiceGroup = "datsumo-women" | "datsumo-men" | "diet";

export interface Service {
  id: string;
  name: string;
  /** カテゴリページ・関連施術の紐付け用 */
  category: CategorySlug;
  /** ランキングのタブ分類 */
  group: ServiceGroup;
  rank: number;
  catchphrase: string;
  /** 5 点満点（編集部の独自評価） */
  rating: number;
  priceFrom: string;
  /** 詳細な紹介文（300字以上。ランキングカードに表示） */
  description: string;
  features: string[];
  /** おすすめポイント（3つ） */
  pros: string[];
  cons: string[];
  recommendedFor: string;
  /** 「こんな人には向かない」（正直な注意点） */
  notRecommendedFor: string;
  /** 使用脱毛機器（例：ジェントルマックスプロ／蓄熱式 など）。脱毛以外では省略。 */
  machine?: string;
  /** 編集部の本音：良い点（正直な評価） */
  honestGood?: string;
  /** 編集部の本音：気になる点（正直な評価） */
  honestConcern?: string;
  /** 編集部独自アンケート（回答者300名）の満足度の目安。例："92%" */
  surveySatisfaction?: string;
  /** 編集部が調査してわかったこと（公式・口コミ・カウンセリング情報からの所感） */
  editorialFindings?: string;
  /** 公式サイトURL（アフィリエイト承認後にリンクを差し替え） */
  url: string;
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
