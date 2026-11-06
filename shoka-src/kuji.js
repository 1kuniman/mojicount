/* ---------- 今夜のくじ：一日一回、本を一冊と運勢を引く ---------- */
const KUJI_RANKS=[
 {r:"大吉",w:14,cls:"hi",
  sou:["灯りがいちばん明るい夜。迷っていたことに、静かな答えが届きます。","追い風の一日。小さく始めたことほど、大きく育っていきます。","積み重ねてきたものが、今夜ひとつの形になります。"],
  negai:["思いきって口にすれば、叶う","人の手を借りると、早く叶う"],
  koi:["素直なひと言が、縁を近づける","待つより、こちらから声をかけて"],
  shigoto:["任されたことに、全力で応えて","新しい提案が、よく通る日"],
  machi:["思いがけない人から、便りあり","近いうちに、向こうから来る"]},
 {r:"中吉",w:20,cls:"hi",
  sou:["穏やかな上り坂。焦らず進めば、ちょうどよい所に着きます。","人との縁に恵まれる一日。誘いには、軽やかに乗ってみて。","調子は上向き。ひとつ片づけるごとに、心も軽くなります。"],
  negai:["順を追えば、叶う","ひとつに絞ると、叶いやすい"],
  koi:["会話の中に、うれしい発見がある","共通の話題が、距離を縮める"],
  shigoto:["段取りを整えると、はかどる","人に相談すると、道がひらける"],
  machi:["知らせは、少し遅れて届く","思い出したころに、来る"]},
 {r:"小吉",w:20,cls:"",
  sou:["小さな幸せを拾える日。足もとの景色に、目を向けて。","控えめに見えて、確かな一日。丁寧さが、あとで実ります。","大きく動くより、身の回りを整えるのに向いた夜です。"],
  negai:["焦らなければ、叶う","時間をかけるほど、確かになる"],
  koi:["さりげない気づかいが、伝わる","短い連絡を、こまめに"],
  shigoto:["見直しが、成果につながる","目の前のひとつを、丁寧に"],
  machi:["静かに待てば、来る","便りより先に、うわさが届く"]},
 {r:"吉",w:22,cls:"",
  sou:["ほどよく穏やかな一日。いつもの習慣が、心を支えます。","変わらない日々の中に、うれしい兆しがひとつ。","可もなく不可もなく、だからこそ自分のペースを大切に。"],
  negai:["手順を守れば、叶う","人に話すと、形になる"],
  koi:["いつもの場所に、縁がある","肩の力を抜くと、うまくいく"],
  shigoto:["約束の時間を、守って吉","整理整頓が、運を呼ぶ"],
  machi:["来るが、少し時間がかかる","こちらから連絡すると、早い"]},
 {r:"末吉",w:16,cls:"",
  sou:["今は種まきの時。結果は、少しあとからついてきます。","はじめは思うようにいかなくても、終わりよければすべてよし。","じっくり育てる運。急がず、続けることが鍵になります。"],
  negai:["あきらめなければ、のちに叶う","形を変えて、叶う"],
  koi:["急がず、相手の話をよく聞いて","ゆっくり育つ縁を、大切に"],
  shigoto:["地道な準備が、後で効く","今日の失敗は、明日の糧"],
  machi:["遅れて来る","待ちわびたころに、来る"]},
 {r:"凶",w:8,cls:"lo",
  sou:["今夜は立ち止まる夜。無理をせず、早めに休むのが吉。凶は、これ以上は下がらないしるしです。","風向きが変わる前の静けさ。慎重に過ごせば、明日はもう上り坂です。"],
  negai:["今は時を待って","言葉を選べば、道は残る"],
  koi:["言いすぎに注意。一晩おいて","ひとりの時間を大切に"],
  shigoto:["確認をもう一度","大きな決断は、明日に"],
  machi:["今は来ない。でも、必ず来る","こちらの準備を、先に"]}];
const KUJI_KEY="yoi-kuji";
const kujiToday=()=>{const t=new Date();return`${t.getFullYear()}-${t.getMonth()+1}-${t.getDate()}`};
function kujiLoad(){try{const v=JSON.parse(localStorage.getItem(KUJI_KEY)||"null");if(v&&v.d===kujiToday()&&BOOKS[v.id])return v}catch(e){}return null}
let KUJI=kujiLoad();
function kujiDraw(){const r=Math.random;const ids=ORDER;const id=ids[Math.floor(r()*ids.length)];
  const tot=KUJI_RANKS.reduce((a,x)=>a+x.w,0);let x=r()*tot,ri=0;for(;ri<KUJI_RANKS.length-1;ri++){x-=KUJI_RANKS[ri].w;if(x<0)break}
  const R=KUJI_RANKS[ri];const p=a=>Math.floor(r()*a.length);
  KUJI={d:kujiToday(),id,ri,no:1+Math.floor(r()*100),s:p(R.sou),n:p(R.negai),k:p(R.koi),g:p(R.shigoto),m:p(R.machi)};
  try{localStorage.setItem(KUJI_KEY,JSON.stringify(KUJI))}catch(e){}return KUJI}
const kujiFor=id=>!shared&&KUJI&&KUJI.d===kujiToday()&&KUJI.id===id?KUJI:null;
function kujiHTML(q){const R=KUJI_RANKS[q.ri],B=BOOKS[q.id];
  return`<div class="pg omi ${R.cls}"><div class="chap">今夜のくじ</div><div class="omino">第${kj(q.no)}番</div>
<div class="omirank"><span>${R.r}</span></div><p class="omisou">${R.sou[q.s]}</p>
<dl class="omil"><div><dt>願い事</dt><dd>${R.negai[q.n]}</dd></div><div><dt>恋愛</dt><dd>${R.koi[q.k]}</dd></div><div><dt>仕事</dt><dd>${R.shigoto[q.g]}</dd></div><div><dt>待ち人</dt><dd>${R.machi[q.m]}</dd></div></dl>
${(()=>{const t=new Date();const it=(typeof luckyItemsFor==="function")&&luckyItemsFor(q.id,`${q.id}|kuji|${t.getFullYear()}-${t.getMonth()+1}-${t.getDate()}`);return it&&it[0]?`<p class="omilk"><span>ラッキーアイテム</span><a href="${amz(it[0].kw)}" target="_blank" rel="sponsored noopener">${it[0].n} ›</a></p>`:""})()}<p class="omibook">今夜あなたを呼んだのは<b>${B.title}</b>。次の頁から、続きを読み解きます。</p></div>`}

/* shelf: the roulette that picks tonight's book */
let kujiOn=false;
const kujiBtn=document.getElementById("kujibtn");
function kujiLabel(){if(!kujiBtn)return;const done=!!(KUJI&&KUJI.d===kujiToday());kujiBtn.querySelector("b").textContent=done?"今夜のくじを、もう一度ひらく":"迷ったら、今夜のくじを引く";
  kujiBtn.querySelector("small").textContent=done?`今日は${KUJI_RANKS[KUJI.ri].r}・${BOOKS[KUJI.id].title}`:"本が一冊と、今日の運勢がでます"}
function kujiOpen(id){choose(id)}
if(kujiBtn){kujiLabel();kujiBtn.addEventListener("click",e=>{e.stopPropagation();if(busy||kujiOn||shelf.classList.contains("off"))return;
  const q=KUJI&&KUJI.d===kujiToday()?KUJI:kujiDraw();kujiLabel();
  const ids=[...rowEl.querySelectorAll(".bk3")].map(b=>b.dataset.book);const end=ids.indexOf(q.id);
  if(reduced||end<0){kujiOpen(q.id);return}
  kujiOn=true;shelf.classList.add("kuji");kujiBtn.disabled=true;
  const start=Math.floor(Math.random()*ids.length);const N=2*ids.length+((end-start)%ids.length+ids.length)%ids.length;
  if(pulled)push(pulled);let i=0,lit=null;(function hop(){const id=ids[(start+i)%ids.length];if(lit)lit.classList.remove("lit");lit=bk(id);if(lit)lit.classList.add("lit");
    if(i>=N){setTimeout(()=>{if(lit)lit.classList.remove("lit");pull(id);const el=bk(id);if(el)el.classList.add("picked");setTimeout(()=>{if(el)el.classList.remove("picked");shelf.classList.remove("kuji");kujiBtn.disabled=false;kujiOn=false;kujiOpen(id)},1300)},250);return}
    i++;const t=i/N;setTimeout(hop,55+420*Math.pow(t,3))})()})}
/* the slip stamps itself in the first time its page is on screen */
function omiVisible(){(isMob()?[k]:[2*k-1,2*k]).forEach(i=>{const f=book.querySelector(`.face[data-f="${i}"]`);if(f&&f.querySelector(".omi")&&!f.classList.contains("omigo"))requestAnimationFrame(()=>requestAnimationFrame(()=>f.classList.add("omigo")))})}
