// content/*.json の形・分量・禁止表現・重複をチェックする: node scripts/check-content.mjs [dir]
import fs from "node:fs";
import path from "node:path";
const dir = process.argv[2] || "content";
const BAN = [/いかがでしたか/, /！/, /!/, /調査(によ|では|結果)/, /統計/, /研究(によ|では|で明)/, /\d+\s*[%％]/, /専門家/, /鑑定士/, /口コミ/, /体験談/, /必ず(不幸|別れ|病)/, /について解説/, /結論から/, /[\u{1F300}-\u{1FAFF}]/u, /<[a-z]/i, /\*\*/];
const len = (d) => d.sections.map((s) => s.paras.join("") + (s.list || []).join("")).join("").length;
const seen = new Map();
let bad = 0;
for (const f of fs.readdirSync(dir).filter((f) => f.endsWith(".json") && f !== "data.json")) {
  const c = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
  const docs = [...(c.hub ? [["hub", c.hub, true]] : []), ...Object.entries(c.items || {}).map(([k, v]) => [k, v, false])];
  for (const [k, d, hub] of docs) {
    const issues = [];
    for (const key of ["title", "description", "h1", "lead"]) if (typeof d[key] !== "string" || !d[key]) issues.push("no " + key);
    if (!Array.isArray(d.sections) || !d.sections.length) issues.push("no sections");
    const n = len(d);
    if (n < (hub ? 2800 : 1800)) issues.push("short " + n);
    if ((d.title || "").length > 40) issues.push("title " + d.title.length);
    const dl = (d.description || "").length;
    if (dl < 70 || dl > 135) issues.push("desc " + dl);
    if (!Array.isArray(d.faq) || d.faq.length < 3) issues.push("faq " + (d.faq || []).length);
    const all = [d.title, d.description, d.h1, d.lead, ...d.sections.flatMap((s) => [s.h2, ...s.paras, ...(s.list || [])]), ...(d.faq || []).flatMap((q) => [q.q, q.a])].join("\n");
    for (const re of BAN) { const m = re.exec(all); if (m) issues.push("ban:" + all.slice(Math.max(0, m.index - 12), m.index + 14).replace(/\n/g, " ")); }
    if (d.sections.some((s) => /まとめ/.test(s.h2))) issues.push("h2まとめ");
    for (const s of d.sections) for (const p of s.paras) {
      if (p.length < 40) continue;
      const key = p.slice(0, 40);
      if (seen.has(key)) issues.push("dup with " + seen.get(key)); else seen.set(key, `${f}:${k}`);
    }
    console.log(`${issues.length ? "NG" : "ok"} ${f}:${k} ${n}字 ${issues.join(" / ")}`);
    if (issues.length) bad++;
  }
}
console.log(bad ? `${bad} 件に要確認` : "すべてOK");
