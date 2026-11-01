// シェア用カード画像（1200×630）を public/og/ に作る。
// 使い方: npm run build → npm run og → もう一度 npm run build（画像のパスがページに入る）
// 必要: playwright（npx playwright install chromium）
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const OUT = path.resolve("out");
const PUB = path.resolve("public");
if (!fs.existsSync(OUT)) throw new Error("先に npm run build してください");

const pick = (html, re) => (re.exec(html) || [])[1] || "";
const strip = (s) => s.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;/g, "'").trim();
const dataUri = (p) => {
  const f = path.join(PUB, p);
  if (!p || !fs.existsSync(f) || !fs.statSync(f).isFile()) return "";
  const ext = path.extname(f).slice(1).replace("jpg", "jpeg");
  return `data:image/${ext};base64,${fs.readFileSync(f).toString("base64")}`;
};

// out/<book>/index.html と out/<book>/<item>/index.html を集める
const jobs = [];
// 2027年の運勢（/2027/<sec>/ と /2027/<sec>/<item>/）は挿絵を使う
const Y = path.join(OUT, "2027");
if (fs.existsSync(Y))
  for (const sec of fs.readdirSync(Y)) {
    const d = path.join(Y, sec);
    if (!fs.statSync(d).isDirectory()) continue;
    if (fs.existsSync(path.join(d, "index.html"))) jobs.push({ file: path.join("og", "2027", sec, "index.jpg"), html: fs.readFileSync(path.join(d, "index.html"), "utf8"), hub: false });
    for (const item of fs.readdirSync(d)) {
      const f = path.join(d, item, "index.html");
      if (fs.existsSync(f)) jobs.push({ file: path.join("og", "2027", sec, `${item}.jpg`), html: fs.readFileSync(f, "utf8"), hub: false });
    }
  }
for (const book of fs.readdirSync(OUT)) {
  const hub = path.join(OUT, book, "index.html");
  if (!fs.existsSync(hub) || ["mokuroku", "about", "privacy", "contact", "2027"].includes(book)) continue;
  jobs.push({ file: path.join("og", book, "index.jpg"), html: fs.readFileSync(hub, "utf8"), hub: true });
  for (const item of fs.readdirSync(path.join(OUT, book))) {
    const f = path.join(OUT, book, item, "index.html");
    if (fs.existsSync(f)) jobs.push({ file: path.join("og", book, `${item}.jpg`), html: fs.readFileSync(f, "utf8"), hub: false });
  }
}

const shelf = dataUri("assets/shelf.jpg");
// 表紙の円の位置（本棚アプリと同じ値）
const META = JSON.parse(/const META=(\{.*?\});/.exec(fs.readFileSync("shoka-src/p3_engine.js", "utf8"))[1]);
const coverHtml = (src, title) => {
  const id = (/assets\/([a-z]+)-cover/.exec(src) || [])[1];
  const c = (META[id] || {}).circle || [0.5, 0.49, 0.5, 0.33];
  const light = id === "kazu";
  return `<div class="cvw"><img class="cv" src="${dataUri(src.replace(/^\//, ""))}"><span class="ct" style="left:${c[0] * 100}%;top:${c[1] * 100}%;width:${c[2] * 300}px;font-size:${Math.min(40, (c[2] * 300) / 3.5)}px;color:${light ? "#7a5418" : "#f3dc9a"}">${title}</span></div>`;
};
const page = (o) => `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Yuji+Syuku&family=Klee+One:wght@400;600&display=swap">
<style>
*{box-sizing:border-box}html,body{margin:0}
body{width:1200px;height:630px;overflow:hidden;position:relative;background:#16110d;color:#eadcc0;font-family:"Klee One",serif}
.bg{position:absolute;inset:-30px;background:url(${shelf}) center/cover;filter:blur(14px) brightness(.32) saturate(1.1)}
.glow{position:absolute;inset:0;background:radial-gradient(700px 500px at 18% 10%,rgba(255,170,90,.28),rgba(0,0,0,0) 60%),radial-gradient(900px 600px at 100% 100%,rgba(0,0,0,.6),rgba(0,0,0,0) 60%)}
.paper{position:absolute;left:470px;top:70px;right:70px;bottom:70px;background:#efe5ce;border-radius:3px;box-shadow:0 30px 60px rgba(0,0,0,.6);color:#2b221c;padding:56px 56px 40px;display:flex;flex-direction:column}
.paper:before,.paper:after{content:"";position:absolute;inset:14px;border:1.5px solid rgba(147,49,31,.38)}.paper:after{inset:20px;border-width:1px;border-color:rgba(147,49,31,.18)}
.k{font-size:24px;letter-spacing:.28em;color:#93311f}
.t{font-family:"Yuji Syuku",serif;font-size:${o.big}px;line-height:1.35;letter-spacing:.05em;margin:18px 0 0;word-break:auto-phrase}
.s{font-size:26px;color:#6e5f50;margin-top:16px;letter-spacing:.08em}
.b{margin-top:auto;font-family:"Yuji Syuku",serif;font-size:30px;letter-spacing:.24em;color:#2b221c;display:flex;align-items:center;gap:14px}
.b i{flex:1;height:1px;background:linear-gradient(90deg,rgba(147,49,31,.5),rgba(147,49,31,0))}
.art{position:absolute;left:70px;top:70px;width:360px;height:490px;display:grid;place-items:center}
.cvw{position:relative;width:300px;height:450px;transform:rotate(-3deg)}
.art img.cv{width:300px;height:450px;object-fit:cover;border-radius:2px 6px 6px 2px;box-shadow:0 2px 0 rgba(0,0,0,.4),14px 22px 40px rgba(0,0,0,.65)}
.ct{position:absolute;transform:translate(-50%,-50%);text-align:center;white-space:nowrap;font-family:"Yuji Syuku",serif;font-size:40px;letter-spacing:.12em;text-shadow:0 1px 0 rgba(0,0,0,.35)}
.art img.il{width:380px;height:380px;object-fit:cover;-webkit-mask:radial-gradient(closest-side,#000 64%,transparent 100%)}
</style></head><body><div class="bg"></div><div class="glow"></div>
<div class="art">${o.img}</div>
<div class="paper"><div class="k">${o.kicker}</div><div class="t">${o.title}</div>${o.sub ? `<div class="s">${o.sub}</div>` : ""}<div class="b">宵の書架<i></i></div></div>
</body></html>`;

const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1200, height: 630 } });
if (process.env.OG_FONT_CSS) {
  // オフライン環境用：フォントのCSSを差し替える
  const css = fs.readFileSync(process.env.OG_FONT_CSS, "utf8");
  await ctx.route("https://fonts.googleapis.com/**", (r) => r.fulfill({ contentType: "text/css", body: css }));
  if (process.env.OG_FONT_DIR)
    await ctx.route("https://fonts.local/**", (r) => r.fulfill({ contentType: "font/woff2", body: fs.readFileSync(path.join(process.env.OG_FONT_DIR, new URL(r.request().url()).pathname)) }));
}
const p = await ctx.newPage();
const make = async (file, o) => {
  fs.mkdirSync(path.dirname(path.join(PUB, file)), { recursive: true });
  await p.setContent(page(o), { waitUntil: "load" });
  await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: path.join(PUB, file), type: "jpeg", quality: 82 });
};

for (const j of jobs) {
  const h1 = strip(pick(j.html, /<h1[^>]*>([\s\S]*?)<\/h1>/));
  const kicker = strip(pick(j.html, /<p class="kicker">([\s\S]*?)<\/p>/));
  const sub = strip(pick(j.html, /<p class="badge"><span>([^<]*)<\/span><\/p>/));
  const plate = pick(j.html, /<div class="plate[^"]*">(?:<span[^>]*>)?<img[^>]*src="([^"]+)"/);
  const cover = pick(j.html, /<div class="plate cover">(?:<span[^>]*>)?<img[^>]*src="([^"]+)"/);
  if (!plate && !cover) continue;
  const bookTitle = (/^(.の書)/.exec(kicker) || [])[1] || kicker;
  const img = j.hub || cover ? coverHtml(cover || plate, bookTitle) : `<img class="il" src="${dataUri(plate.slice(1))}">`;
  const big = h1.length > 16 ? 50 : h1.length > 11 ? 58 : 66;
  await make(j.file, { kicker, title: h1, sub: h1.includes(sub) ? "" : sub, img, big });
}
await make(path.join("og", "default.jpg"), {
  kicker: "十冊の占いの本",
  title: "直感で、一冊を手に取って",
  sub: "数秘術・タロット・星座・夢占い・九星気学・守護石・オーラ・前世",
  img: coverHtml("/assets/tsuki-cover.jpg", "月の書"),
  big: 54,
});
await b.close();
console.log("og:", jobs.length + 1, "枚");
