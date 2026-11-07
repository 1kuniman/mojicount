/* ---------- 音：効果音とBGM。初期値はオフ。トグルで全オン/オフ、つまみで音量 ---------- */
const SND_KEY="yoi-snd";
const SND={on:false,vol:.6,hinted:false};
try{Object.assign(SND,JSON.parse(localStorage.getItem(SND_KEY)||"{}"))}catch(e){}
const sndSave=()=>{try{localStorage.setItem(SND_KEY,JSON.stringify(SND))}catch(e){}};
const SFX={flip:"/assets/audio/flip.mp3",spin:"/assets/audio/spin.mp3",pick:"/assets/audio/pick.mp3"};
const BGM_SRC="/assets/audio/bgm.mp3";
const sndEls={};let bgm=null,bgmOk=null,spinLoop=null;
function sndEl(k){if(!sndEls[k]){const a=new Audio(SFX[k]);a.preload="auto";sndEls[k]=a}return sndEls[k]}
/* 効果音：同じ音が重なっても鳴るように、都度複製 */
function sfx(k){if(!SND.on)return;try{const a=sndEl(k).cloneNode();a.volume=Math.min(1,SND.vol);a.play().catch(()=>{})}catch(e){}}
function spinStart(){if(!SND.on)return;spinStop();try{spinLoop=sndEl("spin").cloneNode();spinLoop.loop=true;spinLoop.volume=Math.min(1,SND.vol*.8);spinLoop.play().catch(()=>{})}catch(e){}}
function spinStop(){if(spinLoop){try{spinLoop.pause()}catch(e){}spinLoop=null}}
/* BGM：ファイルがあるときだけ。置き場所は assets/audio/bgm.mp3 */
function bgmStart(){if(!SND.on||bgmOk===false)return;if(!bgm){bgm=new Audio(BGM_SRC);bgm.loop=true;bgm.preload="auto";bgm.addEventListener("error",()=>{bgmOk=false;bgm=null});bgm.addEventListener("canplay",()=>{bgmOk=true})}
  bgm.volume=Math.min(1,SND.vol*.45);bgm.play().catch(()=>{})}
function bgmStop(){if(bgm){try{bgm.pause()}catch(e){}}}
function sndApply(){if(bgm)bgm.volume=Math.min(1,SND.vol*.45);if(spinLoop)spinLoop.volume=Math.min(1,SND.vol*.8)}
/* 画面のボタン：どのバーのものを押しても同じ */
const sndBtns=[...document.querySelectorAll(".sndbtn")];
const sndPanel=document.getElementById("sndpanel"),sndVol=document.getElementById("sndvol"),sndHint=document.getElementById("sndhint");
let sndPanelT=null;
function sndRender(){sndBtns.forEach(b=>{b.classList.toggle("on",SND.on);b.setAttribute("aria-pressed",SND.on?"true":"false");b.querySelector("span").textContent=SND.on?"音 オン":"音 オフ"});if(sndVol)sndVol.value=Math.round(SND.vol*100)}
function sndPanelShow(anchor){if(!sndPanel)return;const r=anchor.getBoundingClientRect();sndPanel.hidden=false;sndPanel.style.top=(r.bottom+8)+"px";
  const w=sndPanel.offsetWidth;sndPanel.style.left=Math.max(8,Math.min(innerWidth-w-8,r.left+r.width/2-w/2))+"px";clearTimeout(sndPanelT);sndPanelT=setTimeout(sndPanelHide,5000)}
function sndPanelHide(){if(sndPanel)sndPanel.hidden=true}
function sndToggle(anchor){SND.on=!SND.on;SND.hinted=true;sndSave();sndRender();if(sndHint)sndHint.hidden=true;
  if(SND.on){bgmStart();sfx("flip");sndPanelShow(anchor)}else{bgmStop();spinStop();sndPanelHide()}}
sndBtns.forEach(b=>b.addEventListener("click",e=>{e.stopPropagation();if(SND.on&&sndPanel&&sndPanel.hidden){sndPanelShow(b);return}sndToggle(b)}));
if(sndVol){sndVol.addEventListener("input",()=>{SND.vol=sndVol.value/100;sndApply();clearTimeout(sndPanelT);sndPanelT=setTimeout(sndPanelHide,5000)});sndVol.addEventListener("change",()=>{sndSave();sfx("flip")})}
if(sndPanel){sndPanel.addEventListener("click",e=>e.stopPropagation());addEventListener("click",()=>{if(!sndPanel.hidden)sndPanelHide()})}
/* 初めての人への案内：音のボタンのそばに一度だけ */
if(sndHint&&!SND.hinted&&!SND.on){const b=sndBtns.find(x=>x.closest("#shelf"))||sndBtns[0];if(b){const r=b.getBoundingClientRect();sndHint.hidden=false;sndHint.style.top=(r.bottom+8)+"px";const w=sndHint.offsetWidth;sndHint.style.left=Math.max(8,Math.min(innerWidth-w-8,r.right-w))+"px";
  setTimeout(()=>{sndHint.hidden=true},12000)}}
/* タブを離れたらBGMを止め、戻ったら再開 */
document.addEventListener("visibilitychange",()=>{if(document.hidden)bgmStop();else if(SND.on)bgmStart()});
sndRender();
