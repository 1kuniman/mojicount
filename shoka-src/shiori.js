/* ---------- しおり：読んだ本の記録・かよった日数・蔵書票 ----------
   どれもこの端末（localStorage）の中だけに保存する */
const SHIORI_KEY="yoi-done",VISIT_KEY="yoi-visit";
const sDay=(t=new Date())=>`${t.getFullYear()}-${t.getMonth()+1}-${t.getDate()}`;
function shioriLoad(){try{const v=JSON.parse(localStorage.getItem(SHIORI_KEY)||"{}");return v&&typeof v==="object"&&!Array.isArray(v)?v:{}}catch(e){return{}}}
var DONE=shioriLoad(); /* var：本棚の起動（先に走る）から呼ばれても、未初期化エラーにならないように */
const doneCount=()=>ORDER.filter(id=>DONE[id]).length;
/* 読んだ冊数でかわる呼び名（最後は全冊） */
function shioriRank(n){const all=ORDER.length;if(n>=all)return"書架の主";if(n>=Math.ceil(all*.6))return"司書見習い";if(n>=3)return"書架の常連";if(n>=1)return"見習いの読み手";return"はじめての来訪者"}
/* かよった日数：今日はじめて来たときだけ数える */
let VISIT={last:"",n:0,total:0};
(function(){try{const v=JSON.parse(localStorage.getItem(VISIT_KEY)||"null");if(v&&typeof v.n==="number")VISIT=v}catch(e){}
  const today=sDay();if(VISIT.last!==today){const y=new Date();y.setDate(y.getDate()-1);VISIT={last:today,n:VISIT.last===sDay(y)?VISIT.n+1:1,total:(VISIT.total||0)+1};try{localStorage.setItem(VISIT_KEY,JSON.stringify(VISIT))}catch(e){}}})();
const sGa=(name,p)=>{try{if(typeof gtag==="function")gtag("event",name,p)}catch(e){}};

const exBtn=document.getElementById("exbtn"),exPanel=document.getElementById("exlibris"),toastEl=document.getElementById("toast");
let toastT=null;
function toast(html,ms){if(!toastEl)return;toastEl.innerHTML=html;toastEl.hidden=false;void toastEl.offsetWidth;toastEl.classList.add("on");clearTimeout(toastT);toastT=setTimeout(()=>{toastEl.classList.remove("on");setTimeout(()=>{toastEl.hidden=true},400)},ms||4200)}
/* 本棚：読んだ本に栞をはさむ。ボタンの冊数も合わせる */
function shioriPaint(){if(!DONE)return;if(typeof rowEl!=="undefined"&&rowEl)rowEl.querySelectorAll(".bk3").forEach(b=>b.classList.toggle("done",!!DONE[b.dataset.book]));
  if(exBtn){const n=doneCount();exBtn.querySelector("b").textContent=n;exBtn.classList.toggle("all",n>=ORDER.length)}}
/* 結果の頁まで読んだら、その本を「読んだ」ことにする（友だちから届いた本は数えない） */
function shioriSeen(){if(!DONE||shared||!landed||!cur||DONE[cur])return;const passed=cur==="tsuki"?!!(S.tarot&&S.tarot.revealed):!!opened[cur];if(!passed)return;
  const ri=resultIndex();if(!(isMob()?k>=ri:2*k>=ri))return;
  DONE[cur]=sDay();try{localStorage.setItem(SHIORI_KEY,JSON.stringify(DONE))}catch(e){}
  const n=doneCount(),all=ORDER.length;shioriPaint();sGa("book_read",{book:cur,count:String(n)});
  setTimeout(()=>{if(typeof sfx==="function")sfx("pick");toast(n>=all?`<b>${all}冊すべてを読みました</b><span>あなたは「${shioriRank(n)}」です。蔵書票をご覧ください</span>`:`<b>『${BOOKS[cur].title}』に栞をはさみました</b><span>${all}冊のうち ${n}冊・${shioriRank(n)}</span>`,n>=all?7000:4200)},1400)}

function exRender(){if(!exPanel)return;const n=doneCount(),all=ORDER.length;
  const rows=ORDER.map(id=>{const d=DONE[id],B=BOOKS[id];const dt=d?d.split("-").slice(1).join("/"):"";
    return`<button type="button" class="exb${d?" on":""}" data-id="${id}"><i style="background-image:url(/assets/${id}-spine.webp)"></i><b>${B.title}</b><small>${d?`${dt} 読了`:"まだ"}</small>${d?'<em>読</em>':""}</button>`}).join("");
  const next=ORDER.find(id=>!DONE[id]);
  exPanel.querySelector(".exin").innerHTML=`<button type="button" class="exx" aria-label="とじる">×</button>
<div class="exk">EX LIBRIS</div><h2>蔵書票</h2>
<p class="exr"><b>${shioriRank(n)}</b><span>${all}冊のうち ${n}冊を読みました</span></p>
<div class="exbar"><i style="width:${Math.round(n/all*100)}%"></i></div>
<div class="exg">${rows}</div>
<p class="exv">書架にかよった日　通算 <b>${VISIT.total}</b> 日${VISIT.n>1?`・<b>${VISIT.n}</b> 日つづけて`:""}</p>
<p class="exn">${n>=all?"すべての本に栞がはさまりました。くじは毎日引き直せます。また明日、書架でお待ちしています。":next?`つぎは『${BOOKS[next].title}』はいかがですか。まだ読んでいない本を押すと、その本を手に取ります。`:""}</p>
<p class="exf">この記録は、いまお使いの端末の中にだけ残ります。</p>`}
function exOpen(){if(!exPanel)return;exRender();exPanel.hidden=false;sGa("exlibris_open",{count:String(doneCount())})}
function exClose(){if(exPanel)exPanel.hidden=true}
if(exBtn)exBtn.addEventListener("click",e=>{e.stopPropagation();if(typeof busy!=="undefined"&&busy)return;exOpen()});
if(exPanel)exPanel.addEventListener("click",e=>{e.stopPropagation();const b=e.target.closest&&e.target.closest(".exb");
  if(b){exClose();const id=b.dataset.id;if(typeof pull==="function"&&shelf&&!shelf.classList.contains("off"))setTimeout(()=>pull(id),150);return}
  if(e.target===exPanel||(e.target.closest&&e.target.closest(".exx")))exClose()});
addEventListener("keydown",e=>{if(e.key==="Escape")exClose()});
shioriPaint();
