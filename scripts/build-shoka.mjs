// 本棚アプリ（public/shoka/）を shoka-src/ から組み立てる。npm run build の前に自動で走る。
import fs from "node:fs";
import path from "node:path";
const src = path.resolve("shoka-src");
const out = path.resolve("public/shoka");
fs.mkdirSync(out, { recursive: true });
const js = ["data_lp.js", "p2_data.js", "p3_engine.js"].map((f) => fs.readFileSync(path.join(src, f), "utf8")).join("\n");
fs.writeFileSync(path.join(out, "app.js"), js);
fs.copyFileSync(path.join(src, "style.css"), path.join(out, "shoka.css"));
console.log("shoka: app.js", (js.length / 1024).toFixed(0) + "KB");
