export interface Tool {
  slug: string;
  href: string;
  title: string;
  subtitle: string;
  description: string;
  mark: string;
  accent: string;
  accentSoft: string;
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
  {
    slug: "encode",
    href: "/encode/",
    title: "エンコード・デコード",
    subtitle: "Base64・URLエンコード/デコード",
    description:
      "Base64 と URL（パーセント）エンコードの相互変換。日本語（UTF-8）もそのまま正しく処理します。",
    mark: "符",
    accent: "#6b4a8f",
    accentSoft: "#e7dff0",
  },
  {
    slug: "datasize",
    href: "/datasize/",
    title: "データサイズ変換",
    subtitle: "B・KB・MB・GB・TB の相互換算",
    description:
      "バイト/KB/MB/GB/TB/PB をまとめて相互変換。1KB=1024 と 1000 の両方式に対応。",
    mark: "量",
    accent: "#b9742a",
    accentSoft: "#f3e6d4",
  },
  {
    slug: "date",
    href: "/date/",
    title: "日付・時間計算",
    subtitle: "経過日数・何日後・曜日・Unix時間",
    description:
      "2つの日付の経過日数（年月日・週・時間）、◯日後/◯日前の日付と曜日、Unix時間⇄日時の変換に対応。",
    mark: "暦",
    accent: "#2f7d72",
    accentSoft: "#d8e8e4",
  },
  {
    slug: "password",
    href: "/password/",
    title: "パスワード生成",
    subtitle: "強力なパスワードをブラウザ内で生成",
    description:
      "文字数や文字種を指定して安全なパスワードを生成。すべて端末内で生成され、どこにも送信されません。",
    mark: "鍵",
    accent: "#a23e5c",
    accentSoft: "#f0dde3",
  },
];
