# もじもじツール（mojimojicount.com）

文章まわりの作業を速くする、**ブラウザ内完結**の無料ツール集。
入力テキストはサーバーに送信されず、すべてクライアント側で処理します。

## 収録ツール
- **文字数カウント** (`/count`) — 空白込み/抜き・改行抜き・原稿用紙換算・バイト数(UTF-8/16/Shift-JIS概算)・文字種別・漢字比率・読了時間・SNS文字数制限チェック
- **全角半角・かな変換** (`/convert`) — 全角⇄半角(英数記号)、ひらがな⇄カタカナ、英字の大文字⇄小文字
- **テキスト整形** (`/format`) — 重複行削除・空行削除・行トリム・連続スペース圧縮・並び替え

## 技術構成
- Next.js 14 (App Router) / TypeScript / Tailwind CSS
- `next.config.mjs` で `output: "export"`（完全静的書き出し。`out/` が生成される）
- ロジックは `lib/text.ts` に純粋関数として集約（UIから分離・テストしやすい）

## ローカル開発
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # 静的書き出し → out/
```

## Vercel へのデプロイ
既存の mojimojicount.com の Vercel プロジェクトはそのまま使えます。
GitHub リポジトリの中身をこのソースに差し替えて push すれば、Vercel が自動でビルド・公開します。
（Vercel は Next.js を自動検出します。静的書き出しなので追加設定は不要です。）

## 新しいツールを足すとき
1. `lib/text.ts` に処理関数を追加（純粋関数）
2. `components/XxxTool.tsx` を `"use client"` で作成
3. `app/xxx/page.tsx` を作成（`metadata` + 見出し + ツール + 使い方 + `<Faq />`）
4. `lib/tools.ts` の `TOOLS` 配列に1件追加 → ナビ・トップ・サイトマップに自動反映

各ツールページには「使い方」「こんなときに」「FAQ」の本文を必ず置く構成にしてあります
（薄いページにせず、検索・広告審査の両面で評価されやすくするため）。

## Google AdSense を入れる場合
審査通過後、`app/layout.tsx` の `<head>` 内に AdSense のスクリプトタグを追加し、
広告枠を置きたい箇所にユニットを差し込みます（`ca-pub-XXXX` は自分の発行IDに置換）。
ツール本体は本文量が少ないため、各ページ下部の解説・FAQ の充実が審査の鍵になります。

## デザイン
和紙のような地色 + 墨色 + 校正の朱色をテーマにした、editorial 寄りの最小構成。
見出しは明朝(Shippori Mincho)、本文はゴシック(Zen Kaku Gothic New)、数値は等幅(IBM Plex Mono)。
フォントは実行時に Google Fonts から読み込みます（ビルド時の取得なし）。
