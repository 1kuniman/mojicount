// 本の中のデータ（shoka-src）を解説ページ用に content/data.json へ書き出す: node scripts/dump-data.cjs
const fs=require('fs');const src=fs.readFileSync("shoka-src/data_lp.js",'utf8')+'\n'+fs.readFileSync("shoka-src/p2_data.js",'utf8');
const names=[...src.matchAll(/^(?:const|let|var)\s+([A-Za-z_][A-Za-z0-9_]*)\s*=/gm)].map(m=>m[1]);
const f=new Function(src+'\nreturn {'+names.join(',')+'};');const d=f();
const out={};for(const n of names){const v=d[n];if(typeof v==='function')continue;out[n]=v}
fs.writeFileSync("content/data.json",JSON.stringify(out,null,1));
