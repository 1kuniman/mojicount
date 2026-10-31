# 宵の書架（mojimojicount.com）

本棚から一冊を選んで占う、無料の占いサイト。Next.js 14（App Router / static export）＋ Vercel。

## 構成
- `/` 本棚アプリ（`app/(shelf)`）。本体は `shoka-src/`（素のJS/CSS）。ビルド前に `scripts/build-shoka.mjs` が `public/shoka/` に組み立てる。
  - `/#b-<本のID>` でその本をひらいた状態で始まる（例 `/#b-kazu`）。
  - 結果の共有リンクは `/<本>/<結果>/#r-…`。解説ページに着地したあと本棚へ移り、友だちの本をひらく。
- `/<本>/` と `/<本>/<結果>/` 検索から来る人向けの解説ページ（`app/(read)`）。本文は `content/<本>.json`、本の定義は `lib/books.ts`。
- `content/data.json` 本の中の文章データ。`shoka-src` を直したら `node scripts/dump-data.cjs` で更新。
- `public/og/` シェア用カード画像。本文や題を変えたら `npm run build && npm run og && npm run build`（playwright が必要）。
- 電話占いなどのアフィリエイトは `lib/site.ts` の `AFF` に URL を入れると、解説ページに案内枠が出る。本棚アプリ側は `shoka-src/p3_engine.js` の `#aff`。
- 旧ツールのURLは `vercel.json` でトップへ転送。

## 画像
- 本の挿絵: `public/assets/ill/<キー>.webp`（例 `ishi-rose.webp`）。置けば本の中と解説ページの両方に出る。
- 表紙・背: `public/assets/<本のID>-cover.jpg` / `-spine.jpg`。
