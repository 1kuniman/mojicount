export interface Tool {
  slug: string;
  href: string;
  title: string;
  short: string;       // ナビ用の短い名前
  description: string; // 一覧の説明
  mark: string;        // 見出しの記号（朱印風）
}

export const TOOLS: Tool[] = [
  {
    slug: "count",
    href: "/count/",
    title: "文字数カウント",
    short: "文字数カウント",
    description:
      "空白込み/抜き・改行抜き・原稿用紙換算・バイト数・文字種別・読了時間・SNS文字数制限まで、貼り付けた瞬間にすべて表示。",
    mark: "字",
  },
  {
    slug: "convert",
    href: "/convert/",
    title: "全角半角・かな変換",
    short: "変換",
    description:
      "全角⇄半角（英数記号）、ひらがな⇄カタカナ、大文字⇄小文字をワンクリックで相互変換。",
    mark: "変",
  },
  {
    slug: "format",
    href: "/format/",
    title: "テキスト整形",
    short: "整形",
    description:
      "重複行削除・空行削除・行トリム・連続スペース圧縮・並び替えを組み合わせて一括クリーンアップ。",
    mark: "整",
  },
];
