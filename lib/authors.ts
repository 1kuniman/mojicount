import type { Author } from "./types";

/**
 * 執筆者プロフィール。当サイトは個人が運営しており、医師による監修は受けていません。
 * 実在しない人物（架空の編集長・ライター等）は掲載しません。
 */
export const authors: Author[] = [
  {
    id: "editorial",
    name: "美容すすめ編集部",
    role: "運営・編集",
    emoji: "🌸",
    bio: "個人が運営する美容医療の比較・情報サイトです。各クリニックの公式情報や公開されている情報をもとに、効果・費用・リスクをできるだけフラットに比較・整理しています。医師による監修は受けていません。記事は一般的な情報提供を目的としており、個別の診断・治療を行うものではありません。最終的な判断は必ず医師にご相談ください。",
  },
];

const authorMap = new Map(authors.map((a) => [a.id, a]));

export function getAuthor(id?: string): Author {
  return (id && authorMap.get(id)) || authors[0];
}
