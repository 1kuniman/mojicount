export interface Tool {
  slug: string;
  href: string;
  title: string;
  subtitle: string;   // サイドバー用の短い説明
  description: string; // トップ一覧の説明
  mark: string;        // 朱印風の記号
  accent: string;      // テーマ色
  accentSoft: string;  // 淡い背景色
}

export const TOOLS: Tool[] = [
  {
    slug: "count",
    href: "/count/",
    title: "文字数カウント",
    subtitle: "文字数・行数・原稿用紙・SNS制限",
    description:
      "空白込み/抜き・改行抜き・原稿用紙換算・バイト数・文字種別・読了時間・SNS文字数制限まで、貼り付けた瞬間にすべて表示。",
    mark: "字",
    accent: "#c8402c",
    accentSoft: "#f7e4df",
  },
  {
    slug: "convert",
    href: "/convert/",
    title: "全角半角・かな変換",
    subtitle: "全角半角・ひらがなカタカナ・大小文字",
    description:
      "全角⇄半角（英数記号）、ひらがな⇄カタカナ、大文字⇄小文字をワンクリックで相互変換。",
    mark: "変",
    accent: "#2f6a93",
    accentSoft: "#dde8f1",
  },
  {
    slug: "format",
    href: "/format/",
    title: "テキスト整形",
    subtitle: "重複行・空行削除・並び替え・トリム",
    description:
      "重複行削除・空行削除・行トリム・連続スペース圧縮・並び替えを組み合わせて一括クリーンアップ。",
    mark: "整",
    accent: "#3f7256",
    accentSoft: "#dde9e1",
  },
];
