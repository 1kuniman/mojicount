// 本棚アプリ（public/shoka/）を shoka-src/ から組み立てる。npm run build の前に自動で走る。
import fs from "node:fs";
import path from "node:path";
const src = path.resolve("shoka-src");
const out = path.resolve("public/shoka");
fs.mkdirSync(out, { recursive: true });
// 本の追加章（shoka-src/deep/<本>.json。tsuki-a / tsuki-b は月の書にまとめる）
const DEEP = {};
const deepDir = path.join(src, "deep");
if (fs.existsSync(deepDir))
  for (const f of fs.readdirSync(deepDir).filter((f) => f.endsWith(".json")).sort()) {
    const id = f.replace(/\.json$/, "").replace(/-[ab]$/, "");
    DEEP[id] = Object.assign(DEEP[id] || {}, JSON.parse(fs.readFileSync(path.join(deepDir, f), "utf8")));
  }
const parts = ["data_lp.js", "p2_data.js", "luck.js"].map((f) => fs.readFileSync(path.join(src, f), "utf8"));
const js = [...parts, `const DEEP=${JSON.stringify(DEEP)};`, `const LUCKY=${fs.readFileSync(path.join(process.cwd(), "content/lucky.json"), "utf8")};`, fs.readFileSync(path.join(src, "p3_engine.js"), "utf8"), fs.readFileSync(path.join(src, "audio.js"), "utf8"), fs.readFileSync(path.join(src, "kuji.js"), "utf8")].join("\n");
fs.writeFileSync(path.join(out, "app.js"), js);
// the stylesheet is served from /shoka/, so asset urls must be absolute
fs.writeFileSync(path.join(out, "shoka.css"), fs.readFileSync(path.join(src, "style.css"), "utf8").replace(/url\((["']?)assets\//g, "url($1/assets/"));
console.log("shoka: app.js", (js.length / 1024).toFixed(0) + "KB");
