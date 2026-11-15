// サイトマップの lastmod を、ページごとの実際の更新日から作る。
// content/*.json の各項目（本の hub / items.<key>、2027年の各キー）と、
// git の履歴で最後に中身が変わった日を調べて
// content/lastmod.json に書き出す。
// ビルドでは実行しない（ビルドサーバーの履歴は浅い可能性があるため）。
// 中身を変えてコミットしたあとに `npm run lastmod` を実行し、生成された content/lastmod.json もコミットする。
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const OUT = path.join(root, "content", "lastmod.json");
const git = (...a) => execFileSync("git", a, { cwd: root, encoding: "utf8", maxBuffer: 64 << 20 });

try {
  git("rev-parse", "HEAD");
} catch {
  console.log("lastmod: git の履歴が無いため、既存の content/lastmod.json を使います");
  process.exit(0);
}

const day = (iso) => iso.slice(0, 10);
const commits = (file) =>
  git("log", "--format=%H %cI", "--", file)
    .trim()
    .split("\n")
    .filter(Boolean)
    .map((l) => l.split(" "))
    .reverse(); // 古い順

const out = {};
const SKIP = new Set(["data.json", "lucky.json", "lastmod.json"]);
for (const f of fs.readdirSync(path.join(root, "content")).filter((x) => x.endsWith(".json") && !SKIP.has(x))) {
  const rel = `content/${f}`;
  const last = {}; // key -> [json文字列, 日付]
  for (const [h, d] of commits(rel)) {
    let j;
    try {
      j = JSON.parse(git("show", `${h}:${rel}`));
    } catch {
      continue;
    }
    const parts = {};
    if (j && typeof j === "object" && "items" in j) {
      parts.hub = j.hub;
      for (const [k, v] of Object.entries(j.items || {})) parts[`items.${k}`] = v;
    } else {
      for (const [k, v] of Object.entries(j || {})) parts[k] = v;
    }
    for (const [k, v] of Object.entries(parts)) {
      const s = JSON.stringify(v);
      if (!last[k] || last[k][0] !== s) last[k] = [s, day(d)];
    }
  }
  for (const [k, [, d]] of Object.entries(last)) out[`${f}:${k}`] = d;
}

// ページの型（テンプレート）の変更日は、見た目が変わったものだけを app/sitemap.ts の SIG に手で書く

const sorted = Object.fromEntries(Object.entries(out).sort(([a], [b]) => a.localeCompare(b)));
fs.writeFileSync(OUT, JSON.stringify(sorted, null, 1) + "\n");
console.log(`lastmod: ${Object.keys(sorted).length} 件を書き出しました`);
