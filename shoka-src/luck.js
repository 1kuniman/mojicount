/* ---------- 幸運のしるし：色と小さな挿絵 ---------- */
const LUCK_COL={
 "朱色":{c:"#d23c22"},"若葉色":{c:"#6f9a2e",w:"#a9c96a"},"レモン色":{c:"#b39208",w:"#f0dc4a"},
 "真珠色":{g:"linear-gradient(115deg,#8d7d96 10%,#6f879c 38%,#a88d72 62%,#857398 88%)",w:"#e4dbe6",c2:"#cfc3d6"},
 "金色":{g:"linear-gradient(180deg,#d8b45a 15%,#a5761f 85%)",w:"#e8c870"},"生成り色":{c:"#8c7748",w:"#e9dcbc",c2:"#d8c79f"},
 "淡い桃色":{c:"#c45e76",w:"#f2bcc6",c2:"#e795a8"},"深い葡萄色":{c:"#5b2148"},"藍色":{c:"#27457a"},"焦げ茶色":{c:"#5b3920"},
 "空色":{c:"#3f8fcb",w:"#9fcdee"},"水色":{c:"#2f9fb8",w:"#a7dde8"}};
const LUCK_ICON={
 "朝の時間":`<path d="M6 46h52M14 52h36"/><path d="M19 46a13 13 0 0 1 26 0"/><path d="M32 26v-6M18.5 31.5l-4-4M45.5 31.5l4-4M12 40H7M57 40h-5"/>`,
 "花の香り":`<circle cx="24" cy="22" r="3.2"/><circle cx="24" cy="15" r="4"/><circle cx="30.7" cy="19.8" r="4"/><circle cx="28.1" cy="27.7" r="4"/><circle cx="19.9" cy="27.7" r="4"/><circle cx="17.3" cy="19.8" r="4"/><path d="M24 31c1 8-1 15 0 23M24 44c5-6 11-6 14-4-4 5-10 6-14 4z"/><path d="M38 14c4 2 4 6 0 8s-4 6 0 8M45 18c4 2 4 6 0 8s-4 6 0 8"/>`,
 "手紙":`<rect x="10" y="18" width="44" height="30" rx="2"/><path d="M10 20l22 16 22-16"/><path d="M32 44c-3-3-6-4-6-7a3 3 0 0 1 6-1 3 3 0 0 1 6 1c0 3-3 4-6 7z" fill="currentColor" fill-opacity=".18"/>`,
 "月の夜":`<path d="M36 12a18 18 0 1 0 14 30 15 15 0 1 1-14-30z" fill="currentColor" fill-opacity=".12"/><path d="M14 14v6M11 17h6M16 44v4M14 46h4M52 14v4M50 16h4"/>`,
 "日なた":`<circle cx="32" cy="22" r="8"/><path d="M32 8v4M32 32v4M18 22h4M42 22h4M22 12l3 3M42 12l-3 3M22 32l3-3M42 32l-3-3"/><path d="M6 50h52M12 50c1-4 3-5 4-6M16 50c0-3 1-4 2-5M46 50c1-4 3-5 4-6M50 50c0-3 1-4 2-5"/>`,
 "整った机":`<path d="M6 40h52M10 40v14M54 40v14"/><path d="M14 40v-6h14v6M15 34v-4h12v4"/><path d="M46 40v-14l-6-8M40 18l-5 3 3 4 5-2z"/><path d="M33 40v-7h5v7M34 33l-1-5M37 33l1-6"/>`,
 "花束":`<circle cx="24" cy="18" r="6"/><circle cx="38" cy="16" r="6"/><circle cx="32" cy="27" r="6"/><circle cx="24" cy="18" r="1.5"/><circle cx="38" cy="16" r="1.5"/><circle cx="32" cy="27" r="1.5"/><path d="M24 24l7 18M38 22l-5 20M32 33v9M26 42h12l-3 14h-6z"/><path d="M27 46c-6 1-8-2-8-4 3 0 6 1 8 4zM37 46c6 1 8-2 8-4-3 0-6 1-8 4z"/>`,
 "夜の読書":`<path d="M8 46c8-4 16-4 22 0v-22c-6-4-14-4-22 0zM30 46c6-4 14-4 22 0v-22c-8-4-16-4-22 0z"/><path d="M12 30h12M12 35h12M35 30h12M35 35h12"/><path d="M54 18v-6"/><path d="M54 12c-2-2-1-5 0-7 1 2 2 5 0 7z" fill="currentColor" fill-opacity=".25"/>`,
 "旅の計画":`<circle cx="32" cy="32" r="20"/><circle cx="32" cy="32" r="16"/><path d="M32 18l4 14-4 14-4-14z" fill="currentColor" fill-opacity=".15"/><path d="M32 10v4M32 50v4M10 32h4M50 32h4"/>`,
 "早朝の散歩":`<path d="M4 32h56"/><path d="M40 32a7 7 0 0 1 14 0M47 21v-3M39 24l-2-2M55 24l2-2"/><path d="M30 32c-2 8-12 12-14 24M34 32c0 8 4 14 10 24"/><path d="M14 32V20"/><circle cx="14" cy="15" r="7"/><path d="M24 44l2 1M33 47l2-1M28 52l2 1" />`,
 "星空":`<path d="M16 14l2 5 5 1-5 2-2 5-2-5-5-2 5-1z" fill="currentColor" fill-opacity=".15"/><path d="M44 26l1.5 3.5 3.5 1-3.5 1.5-1.5 3.5-1.5-3.5-3.5-1.5 3.5-1z"/><path d="M28 44l1 3 3 1-3 1-1 3-1-3-3-1 3-1z"/><path d="M20 22l22 8M44 32l-15 13" stroke-dasharray="1 3"/><circle cx="52" cy="12" r="1"/><circle cx="10" cy="44" r="1"/><circle cx="54" cy="50" r="1"/>`,
 "雨の日":`<path d="M10 30a22 22 0 0 1 44 0c-3-3-7-3-11 0-3-3-8-3-11 0-3-3-8-3-11 0-4-3-8-3-11 0z"/><path d="M32 8v2M32 30v18a4 4 0 0 1-8 0"/><path d="M14 38l-2 4M48 38l-2 4M20 48l-2 4M44 50l-2 4"/>`,
 "赤い小物":`<path d="M20 26h24l4 22a4 4 0 0 1-4 4H20a4 4 0 0 1-4-4z" fill="currentColor" fill-opacity=".12"/><path d="M20 26c-2-4 0-8 4-8h16c4 0 6 4 4 8M24 18c2 3 14 3 16 0"/><path d="M32 26c-6-6-12-2-8 1M32 26c6-6 12-2 8 1M32 26l-4 8M32 26l4 8"/>`,
 "上質な布":`<path d="M10 22c8-6 14 2 22-2s14-6 22 0v18c-8-6-14-2-22 2s-14-4-22 2z"/><path d="M10 40v8c8-6 14 2 22-2s14-6 22 0v-8"/><path d="M20 22v18M32 20v18M44 20v18" stroke-dasharray="1.5 3"/>`,
 "二つで一組の物":`<circle cx="25" cy="34" r="12"/><circle cx="39" cy="34" r="12"/><path d="M25 22l-3-6h6zM39 22l-3-6h6z" fill="currentColor" fill-opacity=".2"/>`,
 "手料理":`<path d="M8 34h48c0 12-10 18-24 18S8 46 8 34z"/><path d="M22 52h20"/><path d="M14 34c4-5 10-6 18-6s14 1 18 6"/><path d="M24 24c-3-3 3-5 0-9M32 22c-3-3 3-5 0-9M40 24c-3-3 3-5 0-9"/><path d="M44 30l14-20M48 31l13-18"/>`,
 "ひまわり":`<circle cx="32" cy="22" r="7" fill="currentColor" fill-opacity=".2"/><path d="M32 13c-2-5 2-8 0-10M32 13c2-5-2-8 0-10M39 16c3-4 7-3 9-5M41 22c5 0 6 3 9 3M39 28c3 4 2 7 5 9M32 31c0 5-2 6-1 9M25 28c-3 4-6 4-8 7M23 22c-5 0-7-3-9-2M25 16c-3-4-7-4-9-6"/><path d="M32 31v26M32 46c6-6 12-6 16-4-5 5-11 6-16 4zM32 40c-6-5-11-5-14-3 4 4 9 5 14 3z"/>`,
 "ハーブティー":`<path d="M14 28h30v8a15 15 0 0 1-30 0z"/><path d="M44 31c6 0 7 8 0 9"/><path d="M8 52h42"/><path d="M22 22c-3-3 3-5 0-8M30 22c-3-3 3-5 0-8M38 22c-3-3 3-5 0-8"/><path d="M48 18c4-8 12-8 12-8s0 8-8 10c-2 1-4 0-4-2zM48 18l6-5"/>`,
 "鏡":`<ellipse cx="32" cy="24" rx="14" ry="17"/><ellipse cx="32" cy="24" rx="10" ry="13"/><path d="M28 41l-1 16h10l-1-16"/><path d="M26 16l4-4M25 22l8-8"/>`,
 "黒い宝石":`<path d="M14 24l8-10h20l8 10-18 26z" fill="currentColor" fill-opacity=".55"/><path d="M14 24h36M22 14l4 10 6-10 6 10 4-10M26 24l6 26 6-26" stroke="#fbf5e8" stroke-opacity=".55"/><path d="M52 10l1 3 3 1-3 1-1 3-1-3-3-1 3-1z"/>`,
 "地図":`<path d="M8 16l14-5 20 5 14-5v38l-14 5-20-5-14 5z"/><path d="M22 11v38M42 16v38"/><path d="M14 40c6-4 8-12 14-12s8 8 14 6 6-10 10-12" stroke-dasharray="2 3"/><path d="M48 18l4 4M52 18l-4 4"/>`,
 "古い腕時計":`<circle cx="32" cy="32" r="13"/><circle cx="32" cy="32" r="10"/><path d="M32 24v8l5 3"/><path d="M26 20l2-10h8l2 10M26 44l2 10h8l2-10"/><path d="M45 32h3"/>`,
 "新しい道具":`<path d="M44 8l12 12-26 26-14 4 4-14z"/><path d="M40 12l12 12M20 36l8 8"/><path d="M16 50l4-4"/><path d="M12 14l1.5 4 4 1.5-4 1.5-1.5 4-1.5-4-4-1.5 4-1.5z"/>`,
 "貝殻":`<path d="M32 50L10 30c0-12 10-20 22-20s22 8 22 20z" fill="currentColor" fill-opacity=".1"/><path d="M32 50L18 15M32 50L25 11M32 50V10M32 50l7-39M32 50l14-35M32 50L11 25M32 50l21-25"/><path d="M26 50h12l-2 6h-8z"/>`
};
function luckBox(label,txt,key,i,washCol){
  let pic="",name=`<b>${txt}</b>`;
  if(i===0){const L=LUCK_COL[txt]||{c:"var(--ink)"};const w=L.w||L.c||"#ccc";
    pic=`<svg class="lpic" viewBox="0 0 64 64" aria-hidden="true"><g filter="url(#wcs)"><path d="M10 34c0-14 12-22 24-21s21 9 20 21-11 18-24 17S10 46 10 34z" fill="${w}" fill-opacity=".9"/><path d="M18 30c2-8 10-12 17-10s10 8 7 14-12 8-18 5-7-4-6-9z" fill="${L.c2||L.c||w}" fill-opacity=".45"/></g></svg>`;
    name=`<b class="lcol" style="${L.g?`background:${L.g};-webkit-background-clip:text;background-clip:text;color:transparent`:`color:${L.c}`}">${txt}</b>`}
  else pic=`<span class="lpic"><svg viewBox="0 0 64 64" aria-hidden="true"><g filter="url(#wcs)" opacity=".45"><path d="M8 36c0-12 12-19 25-18s23 8 22 18-11 16-24 15S8 47 8 36z" fill="${washCol}"/></g><g class="lline" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${LUCK_ICON[txt]||""}</g></svg><img src="assets/luck/${key}.webp" alt="" onerror="this.remove()"></span>`;
  return`<div class="luck"><span class="lt2">${label}</span>${pic}${name}</div>`}
const luckWord=t=>{const L=LUCK_COL[t];if(!L)return t;return L.g?`<span class="lcol" style="background:${L.g};-webkit-background-clip:text;background-clip:text;color:transparent">${t}</span>`:`<span class="lcol" style="color:${L.c}">${t}</span>`};
const inkCol=c=>{const n=parseInt(c.slice(1),16),l=(.299*(n>>16)+.587*(n>>8&255)+.114*(n&255))/255;return`color-mix(in srgb,${c} ${l>.8?42:68}%,#5a4a3c)`};
