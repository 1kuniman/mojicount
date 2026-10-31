/* ================= arithmetic ================= */
const digits=n=>String(n).split("").reduce((a,b)=>a+ +b,0);
const reduce=n=>{while(n>9)n=digits(n);return n};
function lifePath(y,m,d){const steps=[];let s=digits(y)+digits(m)+digits(d);
  steps.push(`${String(y).split("").join("+")} + ${String(m).split("").join("+")} + ${String(d).split("").join("+")} = ${s}`);
  while(s>9&&![11,22,33].includes(s)){const t=digits(s);steps.push(`${String(s).split("").join("+")} = ${t}`);s=t}return{n:s,steps}}
const personalYear=(m,d,yr)=>reduce(digits(m)+digits(d)+digits(yr));
const personalMonth=(m,d,yr,mo)=>reduce(personalYear(m,d,yr)+mo);
const KJ="〇一二三四五六七八九";const kanjiNum=n=>String(n).split("").map(c=>KJ[+c]).join("");
const SYN=29.530588853,REFNM=Date.UTC(2000,0,6,18,14)/864e5;
const moonAgeAt=ms=>{const d=ms/864e5-REFNM;return((d%SYN)+SYN)%SYN};
const birthMoon=(b,h)=>{const age=moonAgeAt(Date.UTC(b.y,b.m-1,b.d,(h>=0?h:12)-9,0));const f=age/SYN;return{age,f,idx:Math.floor(f*8)%8,lit:(1-Math.cos(2*Math.PI*f))/2}};
function nextMoons(){const now=Date.now(),a=moonAgeAt(now);const nm=now+(SYN-a)*864e5;const fm=now+((a<SYN/2?SYN/2:SYN*1.5)-a)*864e5;
  const fmt=ms=>{const d=new Date(ms+9*3600e3);return`${d.getUTCMonth()+1}月${d.getUTCDate()}日`};return{nm:fmt(nm),fm:fmt(fm)}}
/* lit part of a moon disc as an SVG path. f: 0 new, .5 full */
function moonLit(cx,cy,r,f){const k=Math.cos(2*Math.PI*f),rx=Math.abs(k)*r,wax=f<.5;
  const limb=wax?1:0,term=wax?(k>0?0:1):(k>0?1:0);
  return`M${cx} ${cy-r}A${r} ${r} 0 0 ${limb} ${cx} ${cy+r}A${rx.toFixed(2)} ${r} 0 0 ${term} ${cx} ${cy-r}Z`}

/* ================= state ================= */
let shared=false,SHR=null,S0=null,sharedParts=null,pendingJump=false;
const SITE_URL="https://www.mojimojicount.com";
const AFFL={url:"https://px.a8.net/svt/ejp?a8mat=4BESUD+2HWHWA+2PEO+C3BAQ",px:"https://www13.a8.net/0.gif?a8mat=4BESUD+2HWHWA+2PEO+C3BAQ",sub:"https://px.a8.net/svt/ejp?a8mat=4BESUD+2IHXI2+2PEO+1BP19U",subpx:"https://www15.a8.net/0.gif?a8mat=4BESUD+2IHXI2+2PEO+1BP19U"};
const TAROT_SLUG=["fool","magician","high-priestess","empress","emperor","hierophant","lovers","chariot","strength","hermit","wheel-of-fortune","justice","hanged-man","death","temperance","devil","tower","star","moon","sun","judgement","world"];
const STONE_SLUG={rose:"rose-quartz",moon:"moonstone",rhodo:"rhodochrosite",amethyst:"amethyst",labra:"labradorite",crystal:"crystal",carnelian:"carnelian",tiger:"tigers-eye",citrine:"citrine"};
const KI_SLUG=["","ippaku-suisei","jikoku-dosei","sanpeki-mokusei","shiroku-mokusei","goou-dosei","roppaku-kinsei","shichiseki-kinsei","happaku-dosei","kyushi-kasei"];
const SEO_PATH={kazu:p=>`/lifepath/${p[0]}/`,en:p=>`/aisho/${reduce(+p[0]+ +p[1])}/`,meguri:p=>`/personal-year/${p[0]}/`,tsuki:p=>`/tarot/${TAROT_SLUG[+p[0]]}/`,
 hoshi:p=>`/seiza/${ZOD[+p[0]].k}/`,yume:p=>`/yume/${p[0]}/`,ishi:p=>`/stone/${STONE_SLUG[STONES[p[0]+"-"+p[1]].k]}/`,ki:p=>`/kyusei/${KI_SLUG[+p[0]]}/`,
 iro:p=>`/aura/${p[0]}/`,tama:p=>`/zense/${p[0]}-${p[1]}/`};
const shareLink=(id,tk)=>{let path="/";try{path=SEO_PATH[id](tk)}catch(e){}return`${SITE_URL}${path}#r-${id}-${tk.join("-")}`};
let S={birth:{y:1990,m:1,d:1},partner:{y:1992,m:6,d:15},theme:"love",btime:-1,sit:"kata",tq:"love",dream:"water",feel:"good",nameA:"",nameB:"",stQ1:"love",stQ2:"tired",colors:[],pl1:"sea",pl2:"book",pl3:"vow",tarot:{deck:[],picks:[],revealed:false}};
try{const v=JSON.parse(localStorage.getItem("yoi-shoka")||"null");if(v&&v.birth){delete v.tarot;Object.assign(S,v)}}catch(e){}
const save=()=>{if(shared)return;try{localStorage.setItem("yoi-shoka",JSON.stringify(S))}catch(e){}};
const Y=new Date().getFullYear(),M=new Date().getMonth()+1;

/* ================= procedural textures ================= */
function cnv(w,h){const c=document.createElement("canvas");c.width=w;c.height=h;return[c,c.getContext("2d")]}
let seed=7;const rnd=()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483646};
const setVar=(k,v)=>document.documentElement.style.setProperty(k,v);
function woodTex(w,h,vertical){const[c,g]=cnv(w,h);g.fillStyle="#2b1c12";g.fillRect(0,0,w,h);const L=vertical?w:h,Lo=vertical?h:w;
  for(let i=0;i<L;i+=1.4){const lt=rnd()<.45;g.strokeStyle=lt?`rgba(140,95,55,${.05+rnd()*.09})`:`rgba(0,0,0,${.08+rnd()*.12})`;g.lineWidth=.5+rnd()*.9;const ph=rnd()*9;
    g.beginPath();for(let t=-10;t<=Lo+10;t+=14){const o=i+Math.sin(t*.006+ph)*4+Math.sin(t*.03+ph*2)*.8;vertical?(t<0?g.moveTo(o,t):g.lineTo(o,t)):(t<0?g.moveTo(t,o):g.lineTo(t,o))}g.stroke()}
  return c.toDataURL()}
function makeTextures(){
  {const[c,g]=cnv(300,300);const im=g.createImageData(300,300);
   for(let i=0;i<im.data.length;i+=4){const v=rnd();im.data[i]=110;im.data[i+1]=80;im.data[i+2]=40;im.data[i+3]=v<.5?v*26:v*14}
   g.putImageData(im,0,0);g.lineCap="round";
   for(let i=0;i<120;i++){g.strokeStyle=`rgba(100,70,30,${.025+rnd()*.04})`;g.lineWidth=.5+rnd()*.6;const x=rnd()*300,y=rnd()*300,a=rnd()*6.28,l=4+rnd()*14;
     g.beginPath();g.moveTo(x,y);g.quadraticCurveTo(x+Math.cos(a+1)*l*.5,y+Math.sin(a+1)*l*.5,x+Math.cos(a)*l,y+Math.sin(a)*l);g.stroke()}
   setVar("--paper-tex",`url(${c.toDataURL()})`)}
  {const[c,g]=cnv(140,140);
   for(let y=0;y<140;y+=2){g.fillStyle=`rgba(255,255,255,${.02+rnd()*.035})`;g.fillRect(0,y,140,1)}
   for(let x=0;x<140;x+=2){g.fillStyle=`rgba(0,0,0,${.05+rnd()*.07})`;g.fillRect(x,0,1,140)}
   for(let i=0;i<500;i++){g.fillStyle=rnd()<.5?"rgba(0,0,0,.18)":"rgba(255,255,255,.05)";g.fillRect(rnd()*140,rnd()*140,1,1)}
   setVar("--cloth-tex",`url(${c.toDataURL()})`)}
  {const[c,g]=cnv(120,120);g.fillStyle="#fff";g.fillRect(0,0,120,120);g.globalCompositeOperation="destination-out";
   for(let i=0;i<260;i++){g.fillStyle=`rgba(0,0,0,${.25+rnd()*.6})`;g.beginPath();g.arc(rnd()*120,rnd()*120,rnd()*1.3+.2,0,6.28);g.fill()}
   setVar("--ink-mask",`url(${c.toDataURL()})`)}
  setVar("--wood-h",`url(${woodTex(600,40,false)})`);setVar("--wood-v",`url(${woodTex(90,600,true)})`);
}

/* ================= light ================= */
const light={x:.18,y:.06};
const candleEl=document.getElementById("candle");
function setLight(x,y){light.x=x;light.y=y;candleEl.style.setProperty("--lx",x*100+"%");candleEl.style.setProperty("--ly",y*100+"%")}
function drawTable(){
  const c=document.getElementById("table"),dpr=Math.min(2,devicePixelRatio||1);const W=innerWidth,H=innerHeight;
  c.width=W*dpr;c.height=H*dpr;const g=c.getContext("2d");g.scale(dpr,dpr);
  const mob=W<760,lx=(mob?.5:.18)*W,ly=(mob?-.02:.06)*H;
  seed=31;g.fillStyle="#1b140f";g.fillRect(0,0,W,H);
  const plank=Math.max(150,H/4.2);
  for(let p=0;p*plank<H+plank;p++){
    const y0=p*plank;const tone=rnd()*14-7;g.fillStyle=`rgb(${30+tone},${22+tone*.8},${16+tone*.6})`;g.fillRect(0,y0,W,plank);
    const ph=rnd()*100,f=.002+rnd()*.003;
    for(let y=y0;y<y0+plank;y+=1.6){
      const lt=rnd()<.5;g.strokeStyle=lt?`rgba(120,82,48,${.04+rnd()*.07})`:`rgba(0,0,0,${.06+rnd()*.1})`;g.lineWidth=.6+rnd()*.9;
      g.beginPath();for(let x=-10;x<=W+20;x+=18){const yy=y+Math.sin(x*f+ph+y*.01)*7+Math.sin(x*.011+ph*2)*1.6;x<0?g.moveTo(x,yy):g.lineTo(x,yy)}g.stroke()}
    if(rnd()<.7){const kx=rnd()*W,ky=y0+plank*(.3+rnd()*.4);for(let r=3;r<26;r+=2.4){g.strokeStyle=`rgba(0,0,0,${.18-r*.005})`;g.lineWidth=1;g.beginPath();g.ellipse(kx,ky,r*2.6,r*.55,0,0,6.28);g.stroke()}}
    g.fillStyle="rgba(0,0,0,.65)";g.fillRect(0,y0,W,2);g.fillStyle="rgba(255,210,160,.05)";g.fillRect(0,y0+2,W,1);
  }
  const im=g.getImageData(0,0,c.width,c.height);for(let i=0;i<im.data.length;i+=4){const n=(rnd()-.5)*10;im.data[i]+=n;im.data[i+1]+=n;im.data[i+2]+=n}g.putImageData(im,0,0);
  const R=Math.hypot(W,H)*.75;
  g.globalCompositeOperation="lighter";let rg=g.createRadialGradient(lx,ly,0,lx,ly,R);
  rg.addColorStop(0,"rgba(255,170,90,.28)");rg.addColorStop(.35,"rgba(200,110,50,.10)");rg.addColorStop(1,"rgba(0,0,0,0)");g.fillStyle=rg;g.fillRect(0,0,W,H);
  g.globalCompositeOperation="source-over";rg=g.createRadialGradient(lx,ly,R*.25,lx,ly,R*1.05);rg.addColorStop(0,"rgba(0,0,0,0)");rg.addColorStop(1,"rgba(0,0,0,.55)");g.fillStyle=rg;g.fillRect(0,0,W,H);
}
const deskLight=()=>innerWidth<760?[.5,-.02]:[.18,.06];

/* ================= dust ================= */
const dustC=document.getElementById("dust"),dg=dustC.getContext("2d");const motes=[],puffs=[];
const reduced=matchMedia("(prefers-reduced-motion:reduce)").matches;
function sizeDust(){const dpr=Math.min(2,devicePixelRatio||1);dustC.width=innerWidth*dpr;dustC.height=innerHeight*dpr;dg.setTransform(dpr,0,0,dpr,0,0);
  motes.length=0;for(let i=0;i<80;i++)motes.push({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*1.3+.3,vx:(Math.random()-.5)*.06,vy:-(Math.random()*.05+.008),ph:Math.random()*6.28})}
function dustLoop(t){
  const W=innerWidth,H=innerHeight;dg.clearRect(0,0,W,H);const lx=light.x*W,ly=light.y*H,R=Math.hypot(W,H)*.6;
  for(const m of motes){m.x+=m.vx+Math.sin(t/3200+m.ph)*.06;m.y+=m.vy;if(m.y<-5){m.y=H+5;m.x=Math.random()*W}if(m.x<-5)m.x=W+5;if(m.x>W+5)m.x=-5;
    const near=Math.max(0,1-Math.hypot(m.x-lx,m.y-ly)/R);const a=.05+near*.55*(.6+.4*Math.sin(t/900+m.ph));
    dg.fillStyle=`rgba(255,222,170,${a})`;dg.beginPath();dg.arc(m.x,m.y,m.r,0,6.28);dg.fill()}
  for(let i=puffs.length-1;i>=0;i--){const p=puffs[i];p.x+=p.vx;p.y+=p.vy;p.vx*=.965;p.vy=p.vy*.965-.004;p.life-=.011;p.r+=.05;
    if(p.life<=0){puffs.splice(i,1);continue}const gr=dg.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r);gr.addColorStop(0,`rgba(232,214,184,${p.life*.16})`);gr.addColorStop(1,"rgba(232,214,184,0)");dg.fillStyle=gr;dg.beginPath();dg.arc(p.x,p.y,p.r,0,6.28);dg.fill()}
  if(!reduced)requestAnimationFrame(dustLoop)}
function puff(rect){const edges=[[rect.left,rect.right,rect.bottom,1],[rect.left,rect.right,rect.top,-1]];
  for(const[a,b,y,dir]of edges)for(let i=0;i<46;i++){const x=a+Math.random()*(b-a);puffs.push({x,y:y+dir*2,vx:(x-(a+b)/2)/(b-a)*1.6*Math.random(),vy:dir*(Math.random()*.7+.1),r:Math.random()*5+3,life:.55+Math.random()*.35})}
  for(const x of[rect.left,rect.right])for(let i=0;i<26;i++)puffs.push({x,y:rect.top+Math.random()*rect.height,vx:(x===rect.left?-1:1)*(Math.random()*.9+.1),vy:(Math.random()-.5)*.3,r:Math.random()*5+3,life:.5+Math.random()*.3})}

/* ================= emblems ================= */
function grad(id,metal){const st=metal==="silver"?["#4a4f5a","#eef1f3","#9aa3ad","#dfe4e8","#4a4f5a"]:["#6f4e1f","#f3dc9a","#b88a3b","#efd287","#6f4e1f"];
  return`<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1">${st.map((c,i)=>`<stop offset="${[0,.3,.52,.74,1][i]}" stop-color="${c}"/>`).join("")}</linearGradient>`}
const P9=(i,R,cx=100,cy=100)=>{const a=(-90+(i%9)*40)*Math.PI/180;return[cx+R*Math.cos(a),cy+R*Math.sin(a)]};
const pts=(a,R)=>a.map(i=>P9(i,R).map(v=>v.toFixed(1)).join(",")).join(" ");
function emblem(type,id,metal,opt={}){
  const mini=!!opt.mini,nums=!mini&&opt.nums!==false,sw=mini?2.4:1;
  let ring=`<circle cx="100" cy="100" r="96" stroke-width="${1.2*sw}"/>`;
  if(!mini){ring+=`<circle cx="100" cy="100" r="86" stroke-width=".6"/>`;let t="";for(let i=0;i<72;i++){const a=i*5*Math.PI/180,r1=i%2?90:88;t+=`M${(100+r1*Math.cos(a)).toFixed(1)} ${(100+r1*Math.sin(a)).toFixed(1)}L${(100+94*Math.cos(a)).toFixed(1)} ${(100+94*Math.sin(a)).toFixed(1)}`}ring+=`<path d="${t}" stroke-width=".6"/>`}
  let body="",fill="";
  if(type==="kazu"){body=`<circle cx="100" cy="100" r="60" stroke-width="${.9*sw}"/><polygon points="${pts([1,4,2,8,5,7],60)}" stroke-width="${.9*sw}"/><polygon points="${pts([3,6,9],60)}" stroke-width="${.9*sw}"/><circle cx="100" cy="100" r="5" stroke-width="${.8*sw}"/>`;
    if(nums)for(let i=1;i<=9;i++){const[x,y]=P9(i,76);fill+=`<text x="${x.toFixed(1)}" y="${y.toFixed(1)}">${i}</text>`}}
  if(type==="en"){const dy=Math.sqrt(34*34-17*17);body=`<circle cx="83" cy="100" r="34" stroke-width="${sw}"/><circle cx="117" cy="100" r="34" stroke-width="${sw}"/><circle cx="100" cy="100" r="64" stroke-width="${.7*sw}"/>`;
    for(const y of[100-dy,100+dy])fill+=`<path d="M100 ${y-7}L103 ${y}L100 ${y+7}L97 ${y}Z"/>`;
    if(!mini)for(const x of[36,164])fill+=`<circle cx="${x}" cy="100" r="2.4"/>`}
  if(type==="meguri"){let d="";for(let t=0;t<=6.28*2.6;t+=.12){const r=5+t*3.25,a=t-1.57;d+=(t?"L":"M")+(100+r*Math.cos(a)).toFixed(1)+" "+(100+r*Math.sin(a)).toFixed(1)}
    body=`<path d="${d}" stroke-width="${.9*sw}"/>`;for(let i=0;i<9;i++){const[x,y]=P9(i,mini?78:74);fill+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${mini?5:3}"/>`}}
  if(type==="tsuki"){fill+=`<path d="${moonLit(100,100,mini?46:36,.13)}"/>`;if(!mini){for(let i=0;i<8;i++){const a=(-90+i*45)*Math.PI/180,x=100+70*Math.cos(a),y=100+70*Math.sin(a);
      body+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="7" stroke-width=".8"/>`;fill+=`<path d="${moonLit(+x.toFixed(1),+y.toFixed(1),7,(i+.5)/8)}"/>`}}}
  return`<svg class="sigil" viewBox="0 0 200 200" aria-hidden="true"><defs>${grad(id,metal)}</defs><g fill="none" stroke="url(#${id})">${ring}${body}</g><g fill="url(#${id})" font-family="IM Fell English, serif" font-size="13" text-anchor="middle" dominant-baseline="central">${fill}</g></svg>`}
function inkSigil(type){return emblem(type,"x",null,{nums:false}).replace(/url\(#x\)/g,"currentColor").replace(/<defs>.*?<\/defs>/,"").replace('class="sigil"','')}
const RULE=`<svg class="rule" viewBox="0 0 120 8" preserveAspectRatio="none" aria-hidden="true"><path d="M2 4 C20 1.5, 40 6.5, 58 4 M62 4 C80 1.5, 100 6.5, 118 4" fill="none" stroke="currentColor" stroke-width=".8"/><circle cx="60" cy="4" r="1.6" fill="currentColor"/></svg>`;
const FLEURON=`<svg viewBox="0 0 60 30" aria-hidden="true"><path d="M30 15c-6-9-16-9-20-3 5-1 9 1 11 4-4-1-8 0-10 3 6 1 13-1 19-4zm0 0c6-9 16-9 20-3-5-1-9 1-11 4 4-1 8 0 10 3-6 1-13-1-19-4z" fill="currentColor"/><circle cx="30" cy="15" r="2" fill="currentColor"/></svg>`;

/* ================= the four books ================= */
const dateStr=b=>`${b.y}年${b.m}月${b.d}日`;
const dc=t=>/[一二三ー「『（]/.test(t[0])?t:/[0-9A-Za-z]/.test(t[0])?`<span class="dc">${t[0]}</span>${t.slice(1)}`:`<span class="dc jp">${t[0]}</span>${t.slice(1)}`;
const chapter=(no,title,body)=>`<div class="pg"><div class="chap">第${no}章</div><h2>${title}</h2><p>${dc(body)}</p></div>`;
function dateFields(pre,b,label){const yo=[],mo=[],dd=[];for(let y=Y;y>=1930;y--)yo.push(`<option value="${y}"${y===b.y?" selected":""}>${y}</option>`);
  for(let m=1;m<=12;m++)mo.push(`<option value="${m}"${m===b.m?" selected":""}>${m}</option>`);const dn=new Date(b.y,b.m,0).getDate();
  for(let d=1;d<=dn;d++)dd.push(`<option value="${d}"${d===b.d?" selected":""}>${d}</option>`);
  return`${label?`<div class="who">${label}</div>`:""}<div class="fields"><select id="${pre}-y" aria-label="${label||""}生まれた年">${yo.join("")}</select><span>年</span><select id="${pre}-m" aria-label="${label||""}生まれた月">${mo.join("")}</select><span>月</span><select id="${pre}-d" aria-label="${label||""}生まれた日">${dd.join("")}</select><span>日</span></div>`}
function mdFields(pre,b){const mo=[],dd=[];for(let m=1;m<=12;m++)mo.push(`<option value="${m}"${m===b.m?" selected":""}>${m}</option>`);const dn=new Date(2000,b.m,0).getDate();
  for(let d=1;d<=dn;d++)dd.push(`<option value="${d}"${d===b.d?" selected":""}>${d}</option>`);
  return`<div class="fields"><input type="hidden" id="${pre}-y" value="${b.y}"><select id="${pre}-m" aria-label="生まれた月">${mo.join("")}</select><span>月</span><select id="${pre}-d" aria-label="生まれた日">${dd.join("")}</select><span>日</span></div>`}
const iconChoices=(key,items)=>`<div class="ichoices" data-key="${key}">${Object.entries(items).map(([v,o])=>`<button type="button" class="choice ic${S[key]===v?" on":""}" data-v="${v}"><span class="thumb"><svg viewBox="0 0 72 64" aria-hidden="true"><path d="${o.icon}"/></svg><img src="assets/ill/yume-${v}.webp" alt="" loading="lazy" onerror="this.remove()"></span><span class="cn2">${o.name}</span></button>`).join("")}</div>`;
const seal=`<div class="sealrow"><button class="seal" id="go" type="button" aria-label="読みはじめる">読</button><span class="sealnote"><b>この印を押して</b>読みはじめる<i>›</i></span></div>`;
const wheelCanvas=marks=>`<canvas class="wheel" data-draw="wheel" data-marks='${JSON.stringify(marks)}'></canvas>`;

const kj=n=>{if(n<10)return KJ[n];if(n===10)return"十";if(n<20)return"十"+KJ[n-10];const t=Math.floor(n/10),o=n%10;return KJ[t]+"十"+(o?KJ[o]:"")};
const TODAY=new Date(),todayJP=`${kanjiNum(TODAY.getFullYear())}年${kj(TODAY.getMonth()+1)}月${kj(TODAY.getDate())}日`;
const choices=(key,items,grid)=>`<div class="choices${grid?" grid":""}" data-key="${key}">${Object.entries(items).map(([v,o])=>`<button type="button" class="choice${S[key]===v?" on":""}" data-v="${v}"><i></i><span class="cn2">${o.name}</span><span class="cs">${o.sub}</span></button>`).join("")}</div>`;
/* illustration plates: a generated watercolor (assets/ill/<key>.webp) over a painted placeholder */
const ILLC={ishi:["#8fc4bd","#c9b8ec","#e9c98a"],ki:["#e6cf8f","#d8a77a","#a9c49a"],iro:["#e59ab3","#9fc0d8","#e9c64f"],tama:["#8f96d3","#c9b8ec","#e9c98a"],kazu:["#d9b66a","#c9a7cf","#9fc0d8"],en:["#e7a3a8","#f0c6a8","#c9a7cf"],meguri:["#a9c49a","#e6cf8f","#9fc0d8"],tsuki:["#b5a6dc","#9fc0d8","#e7b9cf"],hoshi:["#8fb0dc","#c9b8ec","#f0d6a0"],yume:["#f2b8a0","#c9b8ec","#a8d0d8"]};
function illus(key,motif,o={}){const c=ILLC[o.book||cur];let sd=0;for(const ch of key)sd=(sd*31+ch.charCodeAt(0))%9973;const rr=()=>{sd=(sd*16807)%2147483647;return(sd%1000)/1000};
  const blobs=c.map((col,i)=>`<ellipse cx="${(80+rr()*140).toFixed(0)}" cy="${(60+rr()*80).toFixed(0)}" rx="${(70+rr()*50).toFixed(0)}" ry="${(45+rr()*35).toFixed(0)}" fill="${col}" fill-opacity="${(.5-i*.08).toFixed(2)}"/>`).join("");
  return`<figure class="ill${o.cls?" "+o.cls:""}"><svg class="wash" viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><g filter="url(#wcf)">${blobs}</g><g class="mot" fill="none" stroke="var(--rubric)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${motif||""}</g></svg><img src="assets/ill/${key}.webp" alt="" onerror="this.remove()">${o.badge?`<span class="badge">${o.badge}</span>`:""}</figure>`}
const motNum=n=>`<text x="150" y="128" text-anchor="middle" font-family="IM Fell English,serif" font-size="96" fill="var(--rubric)" stroke="none" opacity=".75">${n}</text>`;
const motTwo=`<circle cx="130" cy="100" r="42"/><circle cx="170" cy="100" r="42"/>`;
const motOrbit=`<circle cx="150" cy="100" r="58"/><circle cx="150" cy="100" r="34" stroke-dasharray="3 6"/><circle cx="208" cy="100" r="6" fill="var(--rubric)"/>`;
const motConst=st=>`<polyline points="${st.map(([x,y])=>`${(75+x*1.5).toFixed(0)},${(25+y*1.5).toFixed(0)}`).join(" ")}" stroke-width="1.2" opacity=".8"/>${st.map(([x,y])=>`<circle cx="${(75+x*1.5).toFixed(0)}" cy="${(25+y*1.5).toFixed(0)}" r="3.2" fill="var(--rubric)" stroke="none"/>`).join("")}`;
const motIcon=d=>`<path d="${d}" transform="translate(96 46) scale(1.5)" stroke-width="1.4"/>`;
const tface=i=>{const T=TAROT[i];return`<div class="tface"><span class="rn">${ROMAN[i]}</span><svg viewBox="0 0 60 60" aria-hidden="true">${TSYM[i]}</svg><span class="tn">${T.jp}</span><span class="te">${T.en}</span><img class="timg" src="assets/ill/tarot-${i}.webp" alt="" onerror="this.remove()"></div>`};
const tback=()=>`<div class="tback"></div>`;
function newDraw(){const d=[...Array(22).keys()];for(let i=d.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[d[i],d[j]]=[d[j],d[i]]}S.tarot={deck:d,picks:[],revealed:false}}
const tq=()=>S.tq==="self"?"core":S.tq;
const isN=(v,lo,hi)=>/^\d+$/.test(v)&&+v>=lo&&+v<=hi;
const choices3=(key,items)=>`<div class="choices grid g3" data-key="${key}">${Object.entries(items).map(([v,o])=>`<button type="button" class="choice${S[key]===v?" on":""}" data-v="${v}"><i></i><span class="cn2">${o.name}</span><span class="cs">${o.sub}</span></button>`).join("")}</div>`;
const swatches=()=>`<div class="swatches">${Object.entries(AURA).map(([c,a])=>{const i=S.colors.indexOf(c);return`<button type="button" class="sw9${i>=0?" on":""}" data-c="${c}" aria-label="${a.jp}" style="--c:${a.col}"><span class="dot"></span>${i>=0?`<b>${i+1}</b>`:""}<span class="nm9">${a.jp}</span></button>`}).join("")}</div>`;
const motGem=col=>`<path d="M150 34l46 34-46 104-46-104z" fill="${col}" fill-opacity=".55"/><path d="M104 68h92M150 34l-18 34 18 104 18-104z" stroke-width="1.1"/>`;
const motLoshu=st=>{let s="";const ord=[4,9,2,3,5,7,8,1,6];ord.forEach((n,i)=>{const x=105+(i%3)*30,y=55+Math.floor(i/3)*30;s+=`<rect x="${x}" y="${y}" width="28" height="28" rx="2" ${n===st?'fill="var(--rubric)" fill-opacity=".35"':""}/><text x="${x+14}" y="${y+19}" text-anchor="middle" font-size="13" fill="var(--rubric)" stroke="none">${n}</text>`});return s};
const motAura=cols=>cols.map((c,i)=>`<circle cx="150" cy="100" r="${70-i*20}" fill="${AURA[c].col}" fill-opacity="${.32+i*.12}" stroke="none"/>`).join("");
const motSoul=`<path d="M150 150c-30-20-34-56-8-80 4 16 14 22 22 20-8-20 2-40 18-48-2 22 18 36 12 64-4 20-22 34-44 44z" stroke-width="1.4"/><circle cx="150" cy="118" r="5" fill="var(--rubric)" stroke="none"/>`;
function kiBoard(center,mine){const pos=["南東","南","南西","東","中宮","西","北東","北","北西"];const at={};LOSHU.forEach((p,j)=>at[p]=((center-1+j)%9)+1);
  return`<div class="loshu">${pos.map(p=>`<div class="lc${at[p]===mine?" me":""}"><b>${KJ[at[p]]}</b><span>${p}</span></div>`).join("")}</div>`}
const BOOKS={
 kazu:{title:"数の書",en:"The Book of Numbers",cloth:"#d6cab0",endc:"#e6dcc6",metal:"gold",tag:"本質",art:"ピタゴラス数秘術",
  blurb:"生まれた日の数から、あなたの本質を読む",sub:"ピタゴラス数秘術による<br>生年月日の読みかた",
  tok(){return[lifePath(S.birth.y,S.birth.m,S.birth.d).n,personalYear(S.birth.m,S.birth.d,Y)]},
  untok(p){if(p.length!==2||!LP[p[0]]||!isN(p[1],1,9))return false;SHR=[+p[0],+p[1]];return true},
  pages(){const lp=SHR?{n:SHR[0],steps:[]}:lifePath(S.birth.y,S.birth.m,S.birth.d),L=LP[lp.n],py=SHR?SHR[1]:personalYear(S.birth.m,S.birth.d,Y),pyN=SHR?reduce(SHR[1]+1):personalYear(S.birth.m,S.birth.d,Y+1);
   return[
    {rh:"序",html:`<div class="pg"><div class="chap">序</div>${illus(cur+"-intro","",{cls:"wide"})}<h2 class="sm">生まれた日に、<br>数が刻まれている</h2><p>古代ギリシャの数学者ピタゴラスは、世界のすべては数で説明できると考えました。その流れを汲む数秘術では、生年月日の数字をすべて足し合わせ、一桁になるまで還元して得られる数を「ライフパスナンバー」と呼びます。</p></div>`},
    {rh:"記入",input:true,html:`<div class="pg"><div class="chap">記入</div><h2>生まれた日を、<br>ここに</h2>${dateFields("b",S.birth)}${seal}<p class="fine" style="margin-top:auto">マスターナンバー11・22・33は還元せず、そのまま読みます。書き入れた日付はこの端末の外へは出ません。</p></div>`},
    {rh:"あなたの数",html:`<div class="pg numpage">${illus("kazu-"+lp.n,motNum(lp.n),{cls:"tall"})}<div class="bnum">${lp.n}</div><div class="nm">${L.name}</div><div class="kw">${L.kw}</div><div class="calc">${SHR?"":`${dateStr(S.birth)}<br>${lp.steps.join(" → ")}`}</div></div>`},
    {rh:"第一章",html:chapter("一","あなたの本質",L.core)},
    {rh:"第二章",html:chapter("二","与えられた強み",L.gift)},
    {rh:"第三章",html:chapter("三","つまずきやすい場所",L.shadow)},
    {rh:"第四章",html:chapter("四","恋と、人とのあいだ",L.love)},
    {rh:"第五章",html:chapter("五","仕事とお金",L.work)},
    {rh:"第六章",html:`<div class="pg"><div class="chap">第六章</div><h2>相性の良い数</h2><div class="affin">${L.comp.map(c=>`<span>${c}</span>`).join("")}</div><p>似た価値観で、隣にいて安心できる組み合わせです。違う数との関係も、お互いの欠けを補う縁になります。気になる人がいるなら、棚の「縁の書」で二人の数を確かめてみてください。</p></div>`},
    {rh:"第七章",html:`<div class="pg"><div class="chap">第七章</div><h2>${kanjiNum(Y)}年のあなた</h2><div class="yearrow"><span class="yn">${py}</span><span class="yt">${PY[py][0]}</span></div><p>${PY[py][1]}</p>${RULE}<p class="fine">${kanjiNum(Y+1)}年は「${PY[pyN][0]}」へ移ります。月ごとの流れは、棚の「巡の書」に書かれています。</p></div>`}]},
  share(){const lp=lifePath(S.birth.y,S.birth.m,S.birth.d),L=LP[lp.n];return{x:`私のライフパスナンバーは【${lp.n} ${L.name}】。キーワードは「${L.kw}」でした。`,copy:`ライフパスナンバー ${lp.n}「${L.name}」(${L.kw})`}},
  after:{h:"迷いを、<br>言葉にしたい人へ",p:"数は性質と流れを示します。けれど「この恋をどうするか」「仕事を変えるべきか」という個別の答えは、あなたの状況を聞いた人にしか出せません。具体的な悩みがあるなら、一度プロの鑑定で整理してもらうのも手です。"}},

 en:{title:"縁の書",en:"The Book of Bonds",cloth:"#b88177",endc:"#d8b3a9",metal:"gold",tag:"相性",art:"数秘術（名前の数）",
  blurb:"いまの二人の状況と名前から、関係のかたちを読む",sub:"二人の名前の数を足して読む<br>関係の数秘術",
  tok(){const a=nameNumber(S.nameA),b=nameNumber(S.nameB);return a&&b?[a.n,b.n,S.sit]:null},
  untok(p){if(p.length!==3||!LP[p[0]]||!LP[p[1]]||!SIT[p[2]])return false;SHR=[+p[0],+p[1]];S.sit=p[2];return true},
  pages(){const A=SHR?{n:SHR[0],ro:""}:nameNumber(S.nameA)||{n:1,ro:"",steps:[]},Bn=SHR?{n:SHR[1],ro:""}:nameNumber(S.nameB)||{n:1,ro:"",steps:[]};const ra=reduce(A.n),rb=reduce(Bn.n);
   const rel=reduce(A.n+Bn.n),R=REL[rel];const tie=ra===rb?"mirror":(LP[A.n].comp.includes(rb)||LP[Bn.n].comp.includes(ra))?"harmony":(ra%2===rb%2?"resonance":"complement");const T=TIE[tie];const St=SIT[S.sit];
   const esc=x=>String(x).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));const LA=SHR?"この本の持ち主":esc(S.nameA),LB=SHR?"あの人":esc(S.nameB);
   return[
    {rh:"序",html:`<div class="pg"><div class="chap">序</div>${illus("en-intro","",{cls:"wide"})}<h2 class="sm">名前の響きにも、<br>数が宿っている</h2><p>数秘術では、名前の一音一音を数に置き換えて足し合わせ、その人の「名前の数」を出します。二人の名前の数を足すと、二人の関係そのものが持つ数が現れます。誕生日を知らない相手とでも読める占いです。</p></div>`},
    {rh:"問い",input:true,html:`<div class="pg"><div class="chap">問い</div><h2>いまの二人は</h2>${choices("sit",SIT)}<p class="fine" style="margin-top:auto">選んだ状況に合わせて、第三章と第四章の内容が変わります。</p></div>`},
    {rh:"記入",input:true,gate:true,html:`<div class="pg"><div class="chap">記入</div><h2>二人の名前を</h2><label class="who" for="na">あなたの名前</label><input class="nfield" id="na" type="text" inputmode="text" autocomplete="off" placeholder="ひらがなで　例：さくら" value="${esc(S.nameA)}"><label class="who" for="nb">あの人の名前</label><input class="nfield" id="nb" type="text" inputmode="text" autocomplete="off" placeholder="ひらがなで　例：はると" value="${esc(S.nameB)}"><p class="nerr" id="nerr" role="alert"></p>${seal}<p class="fine" style="margin-top:auto">名前はひらがな・カタカナ・ローマ字で。下の名前だけでも、フルネームでも読めます。書き入れた名前はこの端末の外へは出ません。</p></div>`},
    {rh:"二人の数",html:`<div class="pg numpage">${illus("en-"+rel,motTwo,{cls:"tall"})}<div class="bnum">${rel}</div><div class="nm">${R.name}</div><div class="kw">${R.kw}</div><div class="calc">${LA} ${A.n} ＋ ${LB} ${Bn.n} ＝ ${A.n+Bn.n}${A.n+Bn.n>9?` → ${rel}`:""}</div></div>`},
    {rh:"第一章",html:chapter("一","二人の関係",R.body)},
    {rh:"第二章",html:`<div class="pg"><div class="chap">第二章</div><h2>${T.name}</h2><p>${dc(T.body)}</p><p class="fine">${LA}の数 ${A.n}${A.ro?`（${A.ro.toUpperCase()}）`:""}・${LB}の数 ${Bn.n}${Bn.ro?`（${Bn.ro.toUpperCase()}）`:""}</p></div>`},
    {rh:"第三章",html:`<div class="pg"><div class="chap">第三章</div><h2>${St.h}</h2><p>${dc(St.body)}</p><p class="fine">いまの二人：${St.name}</p></div>`},
    {rh:"第四章",html:`<div class="pg"><div class="chap">第四章</div><h2>次の一歩</h2><ol class="acts">${St.acts.map(x=>`<li>${x}</li>`).join("")}</ol><p><span class="lbl">数より</span>${R.adv}</p></div>`},
    {rh:"第五章",html:`<div class="pg"><div class="chap">第五章</div><h2>あの人の恋の癖</h2><p>${dc(LP[Bn.n].love)}</p><p class="fine">${LB}の名前の数 ${Bn.n}「${LP[Bn.n].name}」の傾向です。文中の「あなた」を、あの人に置き換えて読んでください。</p></div>`},
    {rh:"第六章",html:`<div class="pg"><div class="chap">第六章</div><h2>二人へのことば</h2><p>${dc(T.adv)}</p>${RULE}<p class="fine">数が教えてくれるのは関係の傾向までです。どう育てるかは、二人が決められます。</p></div>`}]},
  share(){const A=nameNumber(S.nameA)||{n:1},Bn=nameNumber(S.nameB)||{n:1},rel=reduce(A.n+Bn.n);return{x:`あの人との関係の数は【${rel} ${REL[rel].name}】でした。`,copy:`関係の数 ${rel}「${REL[rel].name}」`}},
  after:{h:"あの人の気持ちを、<br>聞いてみたい夜に",p:"数が示すのは、二人の関係の性質までです。いまあの人が何を考えているのか、この先どうなるのかは、名前の数だけでは読めません。ひとりで考えて眠れない夜は、恋愛の相談に強い鑑定師に話を聞いてもらうのも一つの方法です。"}},

 meguri:{title:"巡の書",en:"The Book of Cycles",cloth:"#66755a",endc:"#a9b39a",metal:"gold",tag:"運気",art:"数秘術（個人年・個人月）",
  blurb:"九年の巡りの中で、今年と月々の流れを読む",sub:"九年でひと巡りする<br>あなたの暦",
  tok(){return[personalYear(S.birth.m,S.birth.d,Y),S.theme]},
  untok(p){if(p.length!==2||!isN(p[0],1,9)||!THEMES[p[1]])return false;SHR=[+p[0]];S.theme=p[1];return true},
  pages(){const b=S.birth,pyOf=yy=>SHR?reduce(SHR[0]+(yy-Y)+9):personalYear(b.m,b.d,yy),pmOf=(yy,mo)=>reduce(pyOf(yy)+mo),py=pyOf(Y),pyN=pyOf(Y+1);
   const row=m=>{const n=pmOf(Y,m),p=PM[n];return`<tr class="${m===M?"now":""}"><th>${MONTHS[m-1]}${m===M?"<em>今月</em>":""}</th><td class="n">${n}</td><td><b>${p.t}</b><span>${p.s}</span></td></tr>`};
   const next3=[0,1,2].map(i=>{let m=M+i,y=Y;if(m>12){m-=12;y++}const n=pmOf(y,m);return`<div class="mo"><div class="mh"><span class="n">${n}</span><span>${MONTHS[m-1]}${y!==Y?`（${y}）`:""}・${PM[n].t}</span></div><p>${PM[n].l}</p><p><span class="lbl">${THEMES[S.theme]}</span>${PMT[S.theme][n]}</p></div>`}).join("");
   return[
    {rh:"序",html:`<div class="pg"><div class="chap">序</div>${illus(cur+"-intro","",{cls:"wide"})}<h2 class="sm">人生は、<br>九年でひと巡りする</h2><p>数秘術では、人生は九年ごとに一巡すると考えます。生まれた月と日に今年の西暦を足し、一桁にした数を「パーソナルイヤー」と呼びます。それが、あなたが九年の巡りのどこにいるかを示します。</p></div>`},
    {rh:"記入",input:true,html:`<div class="pg"><div class="chap">記入</div><h2>生まれた日を、<br>ここに</h2>${dateFields("b",S.birth)}<div class="who">いま、いちばん気になること</div>${choices("theme",Object.fromEntries(Object.entries(THEMES).map(([k2,v])=>[k2,{name:v,sub:THEME_SUB[k2]}])),true)}${seal}<p class="fine" style="margin-top:auto">選んだことに合わせて、月ごとの助言が変わります。書き入れた内容はこの端末の外へは出ません。</p></div>`},
    {rh:"今年の数",html:`<div class="pg numpage">${illus("meguri-"+py,motOrbit,{cls:"tall"})}<div class="bnum">${py}</div><div class="nm">${PY[py][0]}</div><div class="kw">${kanjiNum(Y)}年・九年周期の${kanjiNum(py)}年目</div><div class="calc">${SHR?"":`${b.m}月${b.d}日 ＋ ${Y}年<br>${String(b.m).split("").join("+")}+${String(b.d).split("").join("+")}+${String(Y).split("").join("+")} → ${py}`}</div></div>`},
    {rh:"第一章",html:chapter("一",`${kanjiNum(Y)}年の流れ`,PY[py][1])},
    {rh:"第二章",html:`<div class="pg"><div class="chap">第二章</div><h2>月ごとの暦 <small style="font-size:.6em">一月〜六月</small></h2><table class="cal">${[1,2,3,4,5,6].map(row).join("")}</table></div>`},
    {rh:"第三章",html:`<div class="pg"><div class="chap">第三章</div><h2>月ごとの暦 <small style="font-size:.6em">七月〜十二月</small></h2><table class="cal">${[7,8,9,10,11,12].map(row).join("")}</table></div>`},
    {rh:"第四章",html:`<div class="pg"><div class="chap">第四章</div><h2>これからの三か月 <small style="font-size:.55em">${THEMES[S.theme]}</small></h2>${next3}</div>`},
    {rh:"第五章",html:`<div class="pg"><div class="chap">第五章</div><h2>${kanjiNum(Y+1)}年へ</h2><div class="yearrow"><span class="yn">${pyN}</span><span class="yt">${PY[pyN][0]}</span></div><p>${PY[pyN][1]}</p></div>`}]},
  share(){const py=personalYear(S.birth.m,S.birth.d,Y);return{x:`${Y}年の私はパーソナルイヤー${py}「${PY[py][0]}」でした。`,copy:`${Y}年 パーソナルイヤー${py}「${PY[py][0]}」`}},
  after:{h:"決めかねていることが、<br>あるなら",p:"暦は流れを示しますが、転職や引っ越し、別れ話といった具体的な決断の答えまでは書かれていません。あなたの状況を踏まえて一緒に考えてくれる相手として、プロの鑑定を使ってみるのも手です。"}},

 tsuki:{tok(){return S.tarot.revealed&&S.tarot.picks.length===3?[...S.tarot.picks,S.tq]:null},
  untok(p){if(p.length!==4||!TQ[p[3]])return false;const c=p.slice(0,3);if(!c.every(x=>isN(x,0,21))||new Set(c).size<3)return false;const picks=c.map(Number);S.tarot={deck:[...picks,...[...Array(22).keys()].filter(x=>!picks.includes(x))],picks,revealed:true};S.tq=p[3];return true},
  title:"月の書",en:"The Book of the Moon",cloth:"#857d9b",endc:"#b9b2c9",metal:"silver",tag:"札読み",art:"タロット（大アルカナ二十二枚）",
  blurb:"三枚の札で、これまでと、いまと、これからを読む",sub:"三枚の札で読む<br>今夜のことば",
  pages(){const P=S.tarot.picks,ok=S.tarot.revealed&&P.length===3,q=TQ[S.tq];
   const wait=`<p class="fine" style="text-align:center;margin-top:4cqh">まだ札がひらかれていません。<br>前の頁で三枚を選び、札をひらいてください。</p>`;
   const fan=S.tarot.deck.map((ci,n)=>{const a=-38+76*n/21;return`<button type="button" class="tcard${P.includes(ci)?" picked":""}" data-i="${ci}" style="--a:${a.toFixed(1)}deg" aria-label="札${n+1}">${tback()}</button>`}).join("");
   const slots=POS.map((p,n)=>`<div class="tslot${P[n]!=null?" full":""}">${P[n]!=null?tback():""}<span>${p.name}</span></div>`).join("");
   const ch=(n)=>{if(!ok)return`<div class="pg"><div class="chap">第${KJ[n+1]}章</div><h2>${POS[n].name}</h2>${wait}</div>`;const T=TAROT[P[n]];
     return`<div class="pg"><div class="chap">第${KJ[n+1]}章　${POS[n].name}</div><div class="tchap"><div class="tsm">${tface(P[n])}</div><div><h2 class="lt">${T.jp}</h2><div class="tkw">${T.en}<br>${T.kw}</div></div></div><p>${T.core}</p>${S.tq!=="self"?`<p><span class="lbl">${q.name}</span>${T[S.tq]}</p>`:""}<p class="fine">${POS[n].lead}</p></div>`};
   const k0=ok?TAROT[P[0]].kw.split("・")[0]:"",k1=ok?TAROT[P[1]].kw.split("・")[0]:"",k2=ok?TAROT[P[2]].kw.split("・")[0]:"";
   return[
    {rh:"序",html:`<div class="pg"><div class="chap">序</div>${illus(cur+"-intro","",{cls:"wide"})}<h2 class="sm">今夜の札は、<br>今夜だけのもの</h2><p>タロットは七十八枚の札からなる占いの道具です。この本では、そのうち物語の柱となる二十二枚、「大アルカナ」だけを使います。</p></div>`},
    {rh:"問い",input:true,html:`<div class="pg"><div class="chap">問い</div><h2>今夜、札に<br>たずねること</h2>${choices("tq",TQ)}<p class="fine" style="margin-top:auto">問いを心に浮かべたまま、次の頁で札を引いてください。</p></div>`},
    {rh:"札を引く",input:true,gate:true,html:`<div class="pg tpick"><div class="chap">札を引く</div><h2 class="sm">心を静めて、三枚を</h2><div class="fan">${fan}</div><div class="tslots">${slots}</div><div class="tact"><button class="seal" id="reveal" type="button" aria-label="札をひらく"${P.length<3?" disabled":""}>開</button><div class="tnote"><b id="tstate">${P.length<3?`扇から、あと${3-P.length}枚選んでください`:"この印を押して、札をひらく"}</b><button class="reshuffle" id="reshuffle" type="button">札を混ぜなおす</button></div></div></div>`},
    {rh:"ひらいた札",html:`<div class="pg"><div class="chap">ひらいた札</div><h2>${ok?"あなたの三枚":"三枚の札"}</h2><div class="reveal">${POS.map((p,n)=>`<div class="rv"><div class="tc">${ok?tface(P[n]):""}${tback()}</div><span class="lb">${p.name}</span>${ok?`<span class="nmc">${TAROT[P[n]].jp}</span>`:""}</div>`).join("")}</div>${ok?`<p class="fine" style="text-align:center">問い：${q.name}　次の頁から、一枚ずつ読んでいきます。</p>`:wait}</div>`},
    {rh:"第一章",html:ch(0)},{rh:"第二章",html:ch(1)},{rh:"第三章",html:ch(2)},
    {rh:"第四章",html:ok?`<div class="pg"><div class="chap">第四章</div><h2>札からのことば</h2><p>${dc(`「${k0}」から始まり、いまは「${k1}」の中にいて、これから「${k2}」へ向かう流れが出ています。`)}</p><p>いちばん大切なのは、二枚目の札です。いまのあなたが「${TAROT[P[1]].jp}」の状態にあることを、まず受け止めてください。そこから「${TAROT[P[2]].jp}」へ向かうために、今夜できることは、ひとつで十分です。</p>${RULE}<p class="fine">同じ問いでも、引く夜が変われば札も変わります。気になったら、また別の夜に。</p></div>`:`<div class="pg"><div class="chap">第四章</div><h2>札からのことば</h2>${wait}</div>`}]},
  share(){const P=S.tarot.picks;if(!(S.tarot.revealed&&P.length===3))return{x:"三枚の札を引きました。",copy:"三枚の札"};const n=P.map(i=>TAROT[i].jp);return{x:`今夜の札は【${n.join("・")}】でした。`,copy:`今夜の三枚（${TQ[S.tq].name}）：${POS.map((p,i)=>`${p.name}「${n[i]}」`).join(" ")}`}},
  after:{h:"札の続きを、<br>人の声で聞きたいとき",p:"三枚の札が示すのは、いまの心の向きまでです。あの人の本当の気持ちや、具体的にどう動けばいいかは、あなたの話を聞いた人にしか答えられません。札が気になった夜は、タロットを得意とする鑑定師に続きを読んでもらうのも一つの方法です。"}},
 hoshi:{tok(){return[signOf(S.birth.m,S.birth.d)]},untok(p){if(p.length!==1||!isN(p[0],0,11))return false;const f=ZOD[+p[0]].from;S.birth={y:S.birth.y,m:f[0],d:f[1]};return true},
  title:"星の書",en:"The Book of Stars",cloth:"#5d6b80",endc:"#9eabbe",metal:"gold",tag:"星座",art:"西洋占星術（太陽星座）",
  blurb:"誕生日の星座から、性質と相性を読む",sub:"誕生日の空に昇っていた<br>十二の星座",
  pages(){const z=signOf(S.birth.m,S.birth.d),Z=ZOD[z];const mates=ZOD.map((x,i)=>({x,i})).filter(o=>o.i!==z&&ZMATCH[Z.el].includes(o.x.el));
   const nxt=ZOD[(z+1)%12].from,end=`${nxt[0]}月${nxt[1]-1}日`;
   return[
    {rh:"序",html:`<div class="pg"><div class="chap">序</div>${illus("hoshi-intro","",{cls:"wide"})}<h2 class="sm">生まれた日の空に、<br>星座が昇っていた</h2><p>太陽は一年をかけて、空の十二の星座をめぐります。あなたが生まれた日に太陽がいた場所、それがあなたの星座です。二千年以上読み継がれてきた、もっとも身近な星のことばです。</p></div>`},
    {rh:"記入",input:true,html:`<div class="pg"><div class="chap">記入</div><h2>誕生日を、<br>ここに</h2>${mdFields("b",S.birth)}${seal}<p class="fine" style="margin-top:auto">星座は誕生日の月と日で決まります。星座の境目に生まれた人は、隣の星座も読んでみてください。</p></div>`},
    {rh:"あなたの星座",html:`<div class="pg numpage">${illus("hoshi-"+Z.k,motConst(Z.stars),{cls:"tall"})}<div class="nm">${Z.jp}</div><div class="kw">${Z.en}・${Z.kw}</div><div class="calc">${Z.from[0]}月${Z.from[1]}日〜${end}　${ELEM[Z.el]}<br>守護星　${Z.ruler}</div></div>`},
    {rh:"第一章",html:chapter("一",`${Z.jp}のあなた`,Z.core)},
    {rh:"第二章",html:chapter("二","恋のかたち",Z.love)},
    {rh:"第三章",html:chapter("三","仕事と才能",Z.work)},
    {rh:"第四章",html:`<div class="pg"><div class="chap">第四章</div><h2>響き合う星座</h2><div class="mates">${mates.map(o=>`<div class="mate">${illus("hoshi-"+o.x.k,motConst(o.x.stars),{cls:"mini"})}<span>${o.x.jp}</span></div>`).join("")}</div><p>${Z.el}の星座と${ZMATCH[Z.el][1]}の星座は、物事を感じる温度が近く、自然に分かり合える組み合わせです。違う星座との関係も、お互いの足りないところを補う縁になります。</p></div>`},
    {rh:"第五章",html:`<div class="pg"><div class="chap">第五章</div><h2>幸運のしるし</h2><div class="lucks">${["色","時間","もの"].map((t,i)=>luckBox(t,Z.luck[i],`${Z.k}-${i}`,i,(LUCK_COL[Z.luck[0]]||{}).w||(LUCK_COL[Z.luck[0]]||{}).c||"#d9c7e8")).join("")}</div>${RULE}<p>迷ったときは、${luckWord(Z.luck[0])}のものを身につけてみてください。星のことばは、背中を押してほしいときにそっと寄り添ってくれます。</p></div>`}]},
  share(){const Z=ZOD[signOf(S.birth.m,S.birth.d)];return{x:`私は【${Z.jp}】。キーワードは「${Z.kw}」でした。`,copy:`${Z.jp}（${Z.kw}）`}},
  after:{h:"星の続きを、<br>あなたの言葉で聞きたいなら",p:"星座が教えてくれるのは、あなたの生まれ持った性質までです。いま悩んでいる恋や仕事の具体的な答えは、あなたの話を聞いた人にしか出せません。占星術に詳しい鑑定師に、ホロスコープ全体を読んでもらうのも一つの方法です。"}},

 yume:{tok(){return[S.dream,S.feel]},untok(p){if(p.length!==2||!DREAMS[p[0]]||!FEEL[p[1]])return false;S.dream=p[0];S.feel=p[1];return true},
  title:"夢の書",en:"The Book of Dreams",cloth:"#b16f5d",endc:"#d9b0a2",metal:"gold",tag:"夢占い",art:"夢占い（夢のモチーフ解釈）",
  blurb:"夢、または直感で選んだ絵から、心のサインを読む",sub:"夢と直感の絵から読む<br>心のサイン",
  pages(){const D=DREAMS[S.dream],Fe=FEEL[S.feel];
   return[
    {rh:"序",html:`<div class="pg"><div class="chap">序</div>${illus("yume-intro","",{cls:"wide"})}<h2 class="sm">夢は、心が書いた<br>手紙のようなもの</h2><p>眠っているあいだ、心は言葉にできなかった気持ちを、絵や出来事に置き換えて見せてくれます。夢を覚えていない夜は、直感で惹かれた絵が、その手紙の代わりになります。</p></div>`},
    {rh:"問い",input:true,html:`<div class="pg"><div class="chap">問い</div><h2 class="sm">気になる絵を、ひとつ</h2><p class="fine qlead">最近見た夢に出てきたものを。夢を覚えていなければ、いま惹かれる絵を直感で。</p>${iconChoices("dream",DREAMS)}</div>`},
    {rh:"問い",input:true,html:`<div class="pg"><div class="chap">問い</div><h2 class="sm">その絵を見て、<br>どう感じましたか</h2>${choices("feel",FEEL)}${seal}<p class="fine" style="margin-top:auto">夢で見た人は夢の中の気持ちを、夢を見ていない人は「夢は見ていない」を選んでください。</p></div>`},
    {rh:"夢のしるし",html:`<div class="pg numpage">${illus("yume-"+S.dream,motIcon(D.icon),{cls:"tall"})}<div class="nm">${D.name}${S.feel==="none"?"のしるし":"の夢"}</div><div class="kw">${Fe.name}</div></div>`},
    {rh:"第一章",html:`<div class="pg"><div class="chap">第一章</div><h2>${S.feel==="none"?"絵のことば":"夢のことば"}</h2><p>${dc(D.core)}</p><p>${Fe.t}</p></div>`},
    {rh:"第二章",html:chapter("二","恋のしるし",D.love)},
    {rh:"第三章",html:`<div class="pg"><div class="chap">第三章</div><h2>今日のすごし方</h2><p>${dc(D.act)}</p>${RULE}<p class="fine">夢やしるしの意味は、受け取る人の状況によって変わります。心当たりのある読み方だけを、受け取ってください。</p></div>`}]},
  share(){const D=DREAMS[S.dream];return{x:S.feel==="none"?`いまの私へのしるしは【${D.name}】でした。`:`【${D.name}】の夢を見ました。`,copy:`${D.name}の夢（${FEEL[S.feel].name}）`}},
  after:{h:"くり返し見る夢が、<br>気になるなら",p:"同じ夢を何度も見るとき、心は同じことを伝えようとしています。夢の意味は、あなたのいまの状況と重ね合わせて初めてはっきりします。気になる夢が続くときは、話を聞いてくれる鑑定師に相談してみるのも一つの方法です。"}},
 ishi:{title:"石の書",en:"The Book of Stones",cloth:"#1d4f4b",endc:"#9fc2bd",metal:"gold",tag:"守護石",art:"パワーストーン（石のことば）",
  blurb:"いまの願いと心の状態から、あなたを守る石を読む",sub:"願いと心から選ぶ<br>あなたを守る石",
  tok(){return[S.stQ1,S.stQ2]},untok(p){if(p.length!==2||!STQ1[p[0]]||!STQ2[p[1]])return false;S.stQ1=p[0];S.stQ2=p[1];return true},
  pages(){const St=STONES[S.stQ1+"-"+S.stQ2];
   return[
    {rh:"序",html:`<div class="pg"><div class="chap">序</div>${illus("ishi-intro","",{cls:"wide"})}<h2 class="sm">石は、何万年もの<br>時間を宿している</h2><p>大地の奥で、長い時間をかけて生まれた石には、それぞれ固有のことばがあるとされてきました。いまの願いと心の状態から、あなたにいちばん寄り添う石を選びます。</p></div>`},
    {rh:"問い",input:true,gate:true,html:`<div class="pg"><div class="chap">問い</div><h2 class="sm">いま、いちばん<br>欲しいものは</h2>${choices3("stQ1",STQ1)}<div class="who">いまの心は</div>${choices3("stQ2",STQ2)}${seal}</div>`},
    {rh:"あなたの石",html:`<div class="pg numpage">${illus("ishi-"+St.k,motGem(St.col),{cls:"tall"})}<div class="nm">${St.jp}</div><div class="kw">${St.en}・${St.kw}</div><div class="calc">願い：${STQ1[S.stQ1].name}　心：${STQ2[S.stQ2].name}</div></div>`},
    {rh:"第一章",html:chapter("一","石のことば",St.core)},
    {rh:"第二章",html:chapter("二","恋のお守りとして",St.love)},
    {rh:"第三章",html:`<div class="pg"><div class="chap">第三章</div><h2>石との付き合いかた</h2><p><span class="lbl">身につける</span>${St.wear}</p><p><span class="lbl">浄化する</span>${St.care}</p>${RULE}<p class="fine">石は、あなたの願いを思い出させてくれる道具です。力を決めるのは、いつもあなた自身です。</p></div>`}]},
  share(){const St=STONES[S.stQ1+"-"+S.stQ2];return{x:`いまの私を守る石は【${St.jp}】でした。`,copy:`守護石「${St.jp}」（${St.kw}）`}},
  after:{h:"石だけでは、<br>ほどけない悩みがあるなら",p:"石は気持ちを整える手助けをしてくれますが、具体的な悩みの答えまでは教えてくれません。いま抱えていることを言葉にしたいときは、話を聞いてくれる鑑定師に相談してみるのも一つの方法です。"}},

 ki:{title:"気の書",en:"The Book of Nine Stars",cloth:"#b07829",endc:"#dcc79c",metal:"gold",tag:"九星",art:"九星気学（本命星と年盤）",
  blurb:"生まれ年の星から、性質と今年の運気を読む",sub:"九つの星と方位で読む<br>あなたの運気",
  tok(){return[honmei(kiYear(S.birth.y,S.birth.m,S.birth.d))]},untok(p){if(p.length!==1||!isN(p[0],1,9))return false;SHR=[+p[0]];return true},
  pages(){const st=SHR?SHR[0]:honmei(kiYear(S.birth.y,S.birth.m,S.birth.d)),K=KISEI[st];const ty=kiYear(TODAY.getFullYear(),TODAY.getMonth()+1,TODAY.getDate()),c0=honmei(ty),c1=honmei(ty+1);
   const p0=palaceOf(st,c0),p1=palaceOf(st,c1),P0=PALACE[p0],P1=PALACE[p1];
   return[
    {rh:"序",html:`<div class="pg"><div class="chap">序</div>${illus("ki-intro","",{cls:"wide"})}<h2 class="sm">九つの星が、<br>巡りながら運を運ぶ</h2><p>九星気学では、生まれた年によって一白水星から九紫火星まで、九つの星のどれかを持って生まれると考えます。九つの星は毎年位置を変え、その年の運気の流れをつくります。</p></div>`},
    {rh:"記入",input:true,html:`<div class="pg"><div class="chap">記入</div><h2>生まれた日を、<br>ここに</h2>${dateFields("b",S.birth)}${seal}<p class="fine" style="margin-top:auto">九星気学では、一年の始まりを立春（二月四日ごろ）とします。一月一日から二月三日までに生まれた人は、前の年の星になります。</p></div>`},
    {rh:"あなたの星",html:`<div class="pg numpage">${illus("ki-"+st,motLoshu(st),{cls:"tall"})}<div class="nm">${K.jp}</div><div class="kw">${K.kw}</div><div class="calc">${SHR?"":`${ty===S.birth.y?"":""}生まれ年（立春で区切る） ${kiYear(S.birth.y,S.birth.m,S.birth.d)}年`}</div></div>`},
    {rh:"第一章",html:chapter("一",`${K.jp}のあなた`,K.core)},
    {rh:"第二章",html:`<div class="pg"><div class="chap">第二章</div><h2>恋と仕事</h2><p><span class="lbl">恋</span>${K.love}</p><p><span class="lbl">仕事</span>${K.work}</p></div>`},
    {rh:"第三章",html:`<div class="pg"><div class="chap">第三章</div><h2 class="sm">${kanjiNum(ty)}年の方位盤</h2>${kiBoard(c0,st)}<p class="fine" style="text-align:center">上が南。あなたの星は今年「${p0}」に巡っています。</p><div class="yearrow"><span class="yt">${P0.t}</span></div><p>${P0.l}</p></div>`},
    {rh:"第四章",html:`<div class="pg"><div class="chap">第四章</div><h2>${kanjiNum(ty+1)}年へ</h2><div class="yearrow"><span class="yt">${P1.t}</span></div><p class="fine">${P1.s}</p><p>${P1.l}</p>${RULE}<p class="fine">${kanjiNum(ty+1)}年は、あなたの星が「${p1}」へ移ります。</p></div>`}]},
  share(){const st=honmei(kiYear(S.birth.y,S.birth.m,S.birth.d));return{x:`私の本命星は【${KISEI[st].jp}】でした。`,copy:`本命星「${KISEI[st].jp}」（${KISEI[st].kw}）`}},
  after:{h:"引っ越しや転職の<br>時期に迷ったら",p:"九星気学は、方位や時期を選ぶときに古くから使われてきた占術です。具体的な引っ越し先や決断の時期は、生年月日と状況を合わせて読む必要があります。気になるときは、九星気学に詳しい鑑定師に相談してみてください。"}},

 iro:{title:"色の書",en:"The Book of Colors",cloth:"#66393f",endc:"#c9a7bc",metal:"gold",tag:"オーラ",art:"カラーセラピー（オーラの色）",
  blurb:"直感で選んだ三つの色から、あなたのオーラを読む",sub:"惹かれる色で読む<br>あなたのオーラ",
  tok(){return S.colors.length===3?S.colors:null},untok(p){if(p.length!==3||!p.every(c=>AURA[c])||new Set(p).size<3)return false;S.colors=p;return true},
  validate(){return S.colors.length<3?"色を三つ、惹かれる順に選んでください。":""},
  pages(){const C=S.colors.length===3?S.colors:["violet","blue","pink"],A1=AURA[C[0]],A2=AURA[C[1]],A3=AURA[C[2]];
   return[
    {rh:"序",html:`<div class="pg"><div class="chap">序</div>${illus("iro-intro","",{cls:"wide"})}<h2 class="sm">人はみな、<br>見えない色をまとっている</h2><p>考えるより先に惹かれる色には、いまのあなたの心がそのまま映っています。九つの色から、直感で惹かれる順に三つを選んでください。一つ目があなたのオーラの色です。</p></div>`},
    {rh:"色を選ぶ",input:true,gate:true,html:`<div class="pg"><div class="chap">色を選ぶ</div><h2 class="sm">惹かれる順に、<br>三つの色を</h2>${swatches()}<p class="fine" style="margin:0;text-align:center">もう一度触れると、選んだ色を外せます。</p><p class="nerr" id="nerr" role="alert"></p>${seal}</div>`},
    {rh:"あなたの色",html:`<div class="pg numpage">${illus("iro-"+C[0],motAura(C),{cls:"tall"})}<div class="nm"><span style="color:${inkCol(A1.col)}">${A1.jp}</span>のオーラ</div><div class="kw">${A1.kw}</div><div class="trio">${C.map((c,i)=>`<span style="--c:${AURA[c].col}"><i></i><em style="color:${inkCol(AURA[c].col)}">${AURA[c].jp}</em>${["オーラ","求める色","隠れた色"][i]}</span>`).join("")}</div></div>`},
    {rh:"第一章",html:chapter("一",`${A1.jp}をまとう人`,A1.core)},
    {rh:"第二章",html:`<div class="pg"><div class="chap">第二章</div><h2>いま求めている色</h2><div class="cdot" style="--c:${A2.col}"></div><p>${dc(A2.want)}</p><p class="fine">二つ目に選んだ<b style="color:${inkCol(A2.col)}">${A2.jp}</b>は、${A2.kw}の色です。</p></div>`},
    {rh:"第三章",html:`<div class="pg"><div class="chap">第三章</div><h2>隠れている色</h2><div class="cdot" style="--c:${A3.col}"></div><p>${dc(A3.hidden)}</p><p class="fine">三つ目に選んだ${A3.jp}は、${A3.kw}の色です。</p></div>`},
    {rh:"第四章",html:chapter("四","恋のかたち",A1.love)}]},
  share(){const C=S.colors.length===3?S.colors:["violet"];return{x:`私のオーラは【${AURA[C[0]].jp}】でした。`,copy:`オーラの色「${AURA[C[0]].jp}」（${AURA[C[0]].kw}）`}},
  after:{h:"心の色が、<br>くすんで見える日に",p:"色は、いまの心の状態を映す鏡です。気持ちが沈んで色が見えにくいときは、誰かに話を聞いてもらうだけで、また鮮やかさが戻ってくることがあります。"}},

 tama:{title:"魂の書",en:"The Book of Souls",cloth:"#1c2a42",endc:"#8f96b3",metal:"gold",tag:"前世",art:"前世占い（魂の記憶）",
  blurb:"惹かれる情景から、魂が覚えている前世を読む",sub:"魂の記憶をたどる<br>前世の物語",
  tok(){return[S.pl1,S.pl2,S.pl3]},untok(p){if(p.length!==3||!PLQ1[p[0]]||!PLQ2[p[1]]||!PLQ3[p[2]])return false;S.pl1=p[0];S.pl2=p[1];S.pl3=p[2];return true},
  pages(){const L=LIVES[S.pl1+"-"+S.pl2];
   return[
    {rh:"序",html:`<div class="pg"><div class="chap">序</div>${illus("tama-intro","",{cls:"wide"})}<h2 class="sm">魂は、いくつもの<br>人生を旅してきた</h2><p>なぜか懐かしい場所、理由もなく惹かれるもの。それは魂が覚えている、前の人生の記憶かもしれません。三つの問いに直感で答えて、あなたの魂の物語をたどります。</p></div>`},
    {rh:"問い",input:true,html:`<div class="pg"><div class="chap">問い</div><h2 class="sm">目を閉じて、<br>浮かんだ場所は</h2>${choices3("pl1",PLQ1)}<div class="who">そのとき、手にしているものは</div>${choices3("pl2",PLQ2)}</div>`},
    {rh:"問い",input:true,gate:true,html:`<div class="pg"><div class="chap">問い</div><h2 class="sm">その人生で、<br>守っていたものは</h2>${choices("pl3",PLQ3)}${seal}</div>`},
    {rh:"前世のあなた",html:`<div class="pg numpage">${illus("tama-"+S.pl1+"-"+S.pl2,motSoul,{cls:"tall"})}<div class="nm">${L.jp}</div><div class="kw">${L.era}</div><div class="calc">${L.kw}</div></div>`},
    {rh:"第一章",html:chapter("一","その人生",L.story)},
    {rh:"第二章",html:`<div class="pg"><div class="chap">第二章</div><h2>今世に残った才能</h2><p>${dc(L.gift)}</p>${RULE}<p>${VOWS[S.pl3]}</p></div>`},
    {rh:"第三章",html:chapter("三","今世のテーマ",L.lesson)}]},
  share(){const L=LIVES[S.pl1+"-"+S.pl2];return{x:`私の前世は【${L.jp}】でした。`,copy:`前世「${L.jp}」（${L.era}）`}},
  after:{h:"魂の物語の続きを、<br>聞いてみたいなら",p:"前世の物語は、いまのあなたを理解するためのひとつの手がかりです。いまの人間関係やくり返す悩みと重ねて読み解くには、霊感や前世鑑定を得意とする鑑定師に話を聞いてもらうのも一つの方法です。"}}
};
const ORDER=["kazu","en","meguri","tsuki","hoshi","yume","ishi","ki","iro","tama"];

/* ================= compose a book into faces ================= */
let cur="kazu",F=[],SHEETS=9,k=0,landed=false,busy=false;
function compose(){
  const B=BOOKS[cur];const body=B.pages();const sh=B.share();
  const tk=shared?sharedParts:(B.tok?B.tok():null),link=tk?shareLink(cur,tk):SITE_URL+"/";
  const share=encodeURIComponent(`${sh.x}\nあなたも一冊、ひらいてみて。 #宵の書架 #${B.title}`);
  const f=[{type:"cover"},{type:"endpaper",plate:true},{type:"title"},...body.map(x=>({type:"page",...x})),
    {type:"page",rh:"栞",html:`<div class="pg"><div class="chap">栞</div><h2>この頁を、<br>誰かに届ける</h2><p>Xに書き残すと、あなたの結果がひらいた状態の本へのリンクが付きます。受け取った人は、同じ頁をそのまま読めます。生年月日や名前は、リンクに含まれません。</p><div class="btns"><a class="inkbtn" href="https://twitter.com/intent/tweet?text=${share}&url=${encodeURIComponent(link)}" target="_blank" rel="noopener">Xに書き残す</a><button class="inkbtn" type="button" id="copy" data-copy="${encodeURIComponent(sh.copy+"\n"+link)}">結果とリンクを写しとる</button><button class="inkbtn" type="button" id="again">書き入れなおす</button></div></div>`},
    {type:"page",rh:"跋",html:`<div class="pg"><div class="chap">跋</div><h2>${B.after.h}</h2><p>${B.after.p}</p><div class="btns"><a class="inkbtn solid" id="aff" href="${AFFL.url}" target="_blank" rel="sponsored noopener">ココナラの電話占いで相談する</a><img src="${AFFL.px}" width="1" height="1" alt="" style="position:absolute;width:1px;height:1px;opacity:0"><a class="afsub" href="${AFFL.sub}" target="_blank" rel="sponsored noopener">電話が苦手なら、メールで相談</a><img src="${AFFL.subpx}" width="1" height="1" alt="" style="position:absolute;width:1px;height:1px;opacity:0"><p class="fine" style="text-align:center">PR・外部サイト（ココナラ）に移動します</p></div></div>`}];
  if((f.length+3)%2)f.push({type:"page",blank:true,html:`<div class="pg blank">${FLEURON}</div>`});
  f.push({type:"colophon"},{type:"endpaper"},{type:"back"});
  return f}
function faceHTML(i){
  const B=BOOKS[cur],it=F[i],c=F.length-3;
  switch(it.type){
   case"cover":{const c=META[cur].circle;return`<div class="cvimg" style="background-image:url(assets/${cur}-cover.jpg)"></div><div class="cvt" style="left:${(c[0]-c[2]/2)*100}%;top:${(c[1]-c[3]/2)*100}%;width:${c[2]*100}%;height:${c[3]*100}%"><div class="emb title">${B.title}</div><div class="mrule e"></div><div class="emb sc">${B.en}</div></div>`}
   case"back":return`<div class="cvimg rev" style="background-image:url(assets/${cur}-cover.jpg)"></div>`;
   case"endpaper":return it.plate?`<div class="endsheet"><div class="plate"><div class="exl">Ex Libris</div>${inkSigil(cur)}<div class="own">この本をひらいた夜<br><b>${todayJP}</b></div></div></div>`:`<div class="endsheet"></div>`;
   case"title":return FRAME+`<div class="pg titlepage"><div class="vt">${B.title}</div><div class="tp-orn">${inkSigil(cur)}</div><div class="tp-sub">${B.sub}</div><div class="tp-imp">宵の書架</div></div>`;
   case"colophon":return FRAME+`<div class="pg"><div class="colophon"><div class="ct">${B.title}</div><dl><dt>発行</dt><dd>${kanjiNum(Y)}年</dd><dt>編</dt><dd>宵の書架編集室</dd><dt>占術</dt><dd>${B.art}</dd></dl><p class="fine">本書は娯楽と自己理解のための読み物です。医療・法律・金銭上の判断の根拠にはしないでください。</p></div></div>`;
   default:{let h=it.html;{const g=gateIndex();if(g>=0&&i===g+1&&cur!=="tsuki")h=`<div class="pg veil">${illus(cur+"-intro","",{cls:"tall"})}<div class="nm">まだ、白紙の頁</div><p class="fine" style="text-align:center">前の頁で書き入れて、印を押すと<br>ここに文字が浮かびあがります。</p></div>`}if(i>=3&&i<c){if(!it.blank)h+=`<div class="rh">${B.title}<i>・</i>${it.rh}</div>`;h+=`<span class="folio">${kj(i-2)}</span>`}return FRAME+h}
  }}
const CORNER=`<svg viewBox="0 0 120 120" aria-hidden="true" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
<path d="M8 112V22C8 14 14 8 22 8H112" stroke-width="1.1"/>
<path d="M16 96V30C16 22 22 16 30 16H96" stroke-width=".6" opacity=".7"/>
<path d="M8 22c10 0 14 4 14 14M22 8c0 10 4 14 14 14" stroke-width=".9"/>
<path d="M30 30c6-8 18-6 18 3 0 6-7 8-10 4-2-3 0-6 3-6M30 30c-8 6-6 18 3 18 6 0 8-7 4-10-3-2-6 0-6 3" stroke-width=".9"/>
<circle cx="30" cy="30" r="2.6" fill="currentColor" stroke="none"/>
<path d="M48 22c8-6 18-6 26 0M22 48c-6 8-6 18 0 26" stroke-width=".8"/>
<path d="M58 16c4 3 9 3 13 0M16 58c3 4 3 9 0 13" stroke-width=".7"/>
<path d="M78 8l4-4 4 4-4 4zM8 78l-4 4 4 4 4-4z" fill="currentColor" stroke="none"/>
<circle cx="96" cy="16" r="1.4" fill="currentColor" stroke="none"/><circle cx="16" cy="96" r="1.4" fill="currentColor" stroke="none"/>
<path d="M40 40c4 0 6 2 6 6" stroke-width=".7"/></svg>`;
const FRAME=`<span class="cn tl">${CORNER}</span><span class="cn tr">${CORNER}</span><span class="cn bl">${CORNER}</span><span class="cn br">${CORNER}</span>`;
const faceCls=i=>{const t=F[i].type;return t==="cover"?"board cover img":t==="back"?"board backcover img":t==="endpaper"?"board endpaper":"page"};
function foxStyle(i){seed=i*97+11+cur.length*13;const n=Math.floor(rnd()*3);let s=[];for(let j=0;j<n;j++)s.push(`radial-gradient(circle at ${(rnd()*90+5).toFixed(0)}% ${(rnd()*90+5).toFixed(0)}%,rgba(150,98,38,.13),rgba(150,98,38,0) ${(8+rnd()*26).toFixed(0)}px)`);return s.length?`--fox:${s.join(",")}`:""}

/* ================= desk: book ================= */
const stage=document.getElementById("stage"),drop=document.getElementById("drop"),tilt=document.getElementById("tilt"),book=document.getElementById("book"),cast=document.getElementById("cast");
const prev=document.getElementById("prev"),next=document.getElementById("next"),pager=document.getElementById("pager"),stackL=document.getElementById("stackL"),stackR=document.getElementById("stackR");
const isMob=()=>matchMedia("(max-width:760px)").matches;
function build(){
  F=compose();SHEETS=F.length/2;const B=BOOKS[cur];
  book.style.setProperty("--cloth",B.cloth);book.setAttribute("style",(book.getAttribute("style")||"").replace(/--emb[^;]*;?/g,"")+";"+embStyle(cur)+";--cloth:"+B.cloth+";--endc:"+B.endc);book.style.setProperty("--endc",B.endc);book.style.setProperty("--rubric",ACC[cur]);book.style.setProperty("--cvurl",`url(assets/${cur}-cover.jpg)`);book.style.setProperty("--pat",patURL(cur));book.classList.toggle("silver",B.metal==="silver");book.dataset.book=cur;
  book.querySelectorAll(".sheet").forEach(s=>s.remove());
  for(let s=0;s<SHEETS;s++){const el=document.createElement("div");el.className="sheet";const f=2*s,b=2*s+1;
    el.innerHTML=`<div class="face front ${faceCls(f)}" data-f="${f}" style="${foxStyle(f)}"></div><div class="face back ${faceCls(b)}" data-f="${b}" style="${foxStyle(b)}"></div>`;book.appendChild(el)}
  render(true);layout()}
function render(all){F=compose();book.querySelectorAll(".face").forEach(el=>{const i=+el.dataset.f;if(!all&&F[i].input)return;el.innerHTML=faceHTML(i)});
  (document.fonts?document.fonts.ready:Promise.resolve()).then(drawCanvases)}

function drawCanvases(){book.querySelectorAll("canvas[data-draw]").forEach(c=>{const s=c.clientWidth,h=c.clientHeight;if(!s||!h)return;const dpr=Math.min(2,devicePixelRatio||1);c.width=s*dpr;c.height=h*dpr;const g=c.getContext("2d");g.scale(dpr,dpr);
  ({wheel:drawWheel,moon:drawMoon,phases:drawPhases})[c.dataset.draw](g,s,h,c)})}
function wobble(g,x,y,rr,col,sd){g.strokeStyle=col;g.lineWidth=1.5;g.lineCap="round";g.beginPath();
  for(let t=0;t<=6.28*1.18;t+=.08){const r=rr*(1+.07*Math.sin(t*3+sd)+.04*Math.sin(t*7+sd*2))+t*.35;const px=x+r*Math.cos(t-1.2+sd),py=y+r*.92*Math.sin(t-1.2+sd);t?g.lineTo(px,py):g.moveTo(px,py)}g.stroke()}
function drawWheel(g,s,h,c){const marks=JSON.parse(c.dataset.marks);const cx=s/2,cy=h/2,R=s*.33;const P=i=>{const a=(-90+(i%9)*40)*Math.PI/180;return[cx+R*Math.cos(a),cy+R*Math.sin(a)]};
  g.strokeStyle="rgba(43,34,28,.55)";g.lineWidth=.9;g.beginPath();g.arc(cx,cy,R,0,6.28);g.stroke();g.beginPath();g.arc(cx,cy,R*1.42,0,6.28);g.strokeStyle="rgba(43,34,28,.25)";g.stroke();
  const poly=a=>{g.beginPath();a.forEach((i,j)=>{const[x,y]=P(i);j?g.lineTo(x,y):g.moveTo(x,y)});g.closePath();g.stroke()};g.strokeStyle="rgba(43,34,28,.42)";poly([1,4,2,8,5,7]);poly([3,6,9]);
  g.fillStyle="rgba(43,34,28,.8)";g.font=`${s*.085}px "IM Fell English", serif`;g.textAlign="center";g.textBaseline="middle";
  for(let i=1;i<=9;i++){const a=(-90+(i%9)*40)*Math.PI/180;const[x,y]=P(i);g.beginPath();g.arc(x,y,1.8,0,6.28);g.fill();g.fillText(i,cx+R*1.22*Math.cos(a),cy+R*1.22*Math.sin(a))}
  marks.forEach((m,j)=>{const a=(-90+(m.n%9)*40)*Math.PI/180;const col=m.c==="r"?"rgba(147,49,31,.85)":"rgba(43,34,28,.75)";wobble(g,cx+R*1.22*Math.cos(a),cy+R*1.22*Math.sin(a),s*(.075+j*.022),col,j*2.1);
    const[px,py]=P(m.n);g.fillStyle=col;g.beginPath();g.arc(px,py,3,0,6.28);g.fill()})}
function moonDisc(g,x,y,r,f){g.fillStyle="rgba(43,34,28,.86)";g.beginPath();g.arc(x,y,r,0,6.28);g.fill();
  const p=new Path2D(moonLit(x,y,r,f));const gr=g.createRadialGradient(x-r*.3,y-r*.3,0,x,y,r);gr.addColorStop(0,"#f6eedb");gr.addColorStop(1,"#d9cba8");g.fillStyle=gr;g.fill(p);
  g.strokeStyle="rgba(43,34,28,.7)";g.lineWidth=1;g.beginPath();g.arc(x,y,r,0,6.28);g.stroke()}
function drawMoon(g,s,h,c){const f=+c.dataset.f,x=s/2,y=h/2,r=Math.min(s,h)*.4;
  g.strokeStyle="rgba(43,34,28,.22)";g.lineWidth=.8;g.beginPath();g.arc(x,y,r*1.2,0,6.28);g.stroke();
  for(let i=0;i<24;i++){const a=i*Math.PI/12;g.beginPath();g.moveTo(x+r*1.13*Math.cos(a),y+r*1.13*Math.sin(a));g.lineTo(x+r*1.2*Math.cos(a),y+r*1.2*Math.sin(a));g.stroke()}
  moonDisc(g,x,y,r,f);seed=11;g.fillStyle="rgba(120,100,70,.12)";for(let i=0;i<9;i++){const a=rnd()*6.28,d=rnd()*r*.7;g.beginPath();g.arc(x+d*Math.cos(a),y+d*Math.sin(a),r*(.04+rnd()*.08),0,6.28);g.fill()}}
function drawPhases(g,s,h,c){const sel=+c.dataset.sel;const cw=s/4,rh=h/2,r=Math.min(cw*.26,rh*.3);g.font=`${Math.max(10,Math.min(13,cw*.13))}px "Klee One", sans-serif`;g.textAlign="center";g.textBaseline="top";
  for(let i=0;i<8;i++){const col=i%4,row=Math.floor(i/4),x=cw*col+cw/2,y=rh*row+rh*.4;moonDisc(g,x,y,r,(i+.5)/8);g.fillStyle="rgba(43,34,28,.8)";g.fillText(MOON[i].name,x,y+r+6);
    if(i===sel)wobble(g,x,y,r*1.32,"rgba(147,49,31,.85)",1)}}

function layout(){
  const sheets=[...book.querySelectorAll(".sheet")];const mob=isMob();
  if(mob){book.querySelectorAll(".face").forEach(f=>f.classList.toggle("show",+f.dataset.f===k));book.classList.remove("closed","ended");cast.classList.remove("closed","ended");prev.disabled=k===0;next.disabled=k===2*SHEETS-1}
  else{book.querySelectorAll(".face").forEach(f=>{const n=+f.dataset.f;f.style.pointerEvents=(n===2*k-1||n===2*k)?"":"none"});
    sheets.forEach((s,i)=>{s.classList.toggle("flipped",i<k);if(!s.classList.contains("turning"))s.style.zIndex=i<k?i+2:SHEETS-i+1});
    book.classList.toggle("closed",k===0);book.classList.toggle("ended",k===SHEETS);cast.classList.toggle("closed",k===0);cast.classList.toggle("ended",k===SHEETS);
    prev.disabled=k===0;next.disabled=k===SHEETS;const tR=Math.max(0,SHEETS-1-k),tL=Math.max(0,k-1);
    const sh=(n,dir)=>{let a=[];const m=Math.min(4+n*1.2,13);for(let j=1;j<=m;j++)a.push(`${dir*j*.8}px ${j*.75}px 0 ${j%3===0?"#bfae88":j%2?"#efe6cf":"#dccfae"}`);a.push(`${dir*(m*.8+1)}px ${m*.75+1.5}px 3px rgba(0,0,0,.45)`);return a.join(",")||"none"};
    stackR.style.boxShadow=sh(tR,1);stackL.style.boxShadow=sh(tL,-1);stackL.style.visibility=tL>0?"visible":"hidden";stackR.style.visibility=tR>0&&k>0?"visible":"hidden"}
  pager.className="";if(k===0&&landed){pager.textContent="表紙に触れて、ひらく";pager.className="hint"}else if(k===1&&!isMob()){pager.textContent="右の頁でめくる・左の頁でもどる";pager.className="hint"}else if(k===1&&isMob()){pager.textContent="右側をタップで、めくる";pager.className="hint"}else pager.textContent=label();flipVisible()}
function flipVisible(){if(cur!=="tsuki"||!S.tarot.revealed)return;(isMob()?[k]:[2*k-1,2*k]).forEach(i=>{const f=book.querySelector(`.face[data-f="${i}"]`);if(!f)return;
  f.querySelectorAll(".reveal:not(.go)").forEach(r=>requestAnimationFrame(()=>requestAnimationFrame(()=>r.classList.add("go"))))})}
function label(){const c=F.length-3;
  if(isMob()){const m={0:"表紙",1:"見返し",2:"扉",[c]:"奥付",[c+1]:"見返し",[c+2]:"裏表紙"};return m[k]??`${k-2}`}
  if(k===0)return"表紙";if(k===SHEETS)return"裏表紙";if(k===1)return"扉";if(2*k-1===c)return"奥付";return`${2*k-3} — ${2*k-2}`}
let lock=false;
let opened={};
function gateIndex(){if(cur==="tsuki")return S.tarot.revealed?-1:F.findIndex(f=>f.gate);if(opened[cur])return -1;const gi=F.findIndex(f=>f.gate);return gi>=0?gi:F.findIndex(f=>f.input&&/id="go"/.test(f.html||""))}
function blocked(nk){const g=gateIndex();if(g<0)return false;const firstShown=isMob()?nk:2*nk-1;return firstShown>g}
function nudge(){const g=gateIndex();const f=book.querySelector(`.face[data-f="${g}"]`);const t=f&&f.querySelector(cur==="tsuki"?"#tstate":".sealnote");
  pager.className="hint";pager.textContent=cur==="tsuki"?"札を三枚選んで、印を押してください":"印を押すと、先へ進めます";
  if(t){t.classList.remove("shake");void t.offsetWidth;t.classList.add("shake")}const s2=f&&f.querySelector(".seal");if(s2){s2.classList.remove("pulse");void s2.offsetWidth;s2.classList.add("pulse")}}
function step(dir){if(lock||!landed)return;const max=isMob()?2*SHEETS-1:SHEETS;const nk=Math.min(max,Math.max(0,k+dir));if(nk===k)return;if(dir>0&&blocked(nk)){nudge();return}lock=true;
  if(!isMob()){const idx=dir>0?k:k-1;const s=book.querySelectorAll(".sheet")[idx];s.classList.add("turning",dir>0?"turn-f":"turn-b");s.style.zIndex=50;
    setTimeout(()=>{s.classList.remove("turning","turn-f","turn-b");layout()},1000)}
  k=nk;layout();setTimeout(()=>lock=false,isMob()?420:820)}
prev.onclick=()=>step(-1);next.onclick=()=>step(1);
addEventListener("keydown",e=>{if(e.target.tagName==="SELECT"||e.target.tagName==="INPUT")return;if(desk.classList.contains("off"))return;if(e.key==="ArrowRight")step(1);if(e.key==="ArrowLeft")step(-1);if(e.key==="Escape")toShelf()});
let wt=0;addEventListener("wheel",e=>{if(desk.classList.contains("off"))return;if(Math.abs(e.deltaY)<24||Date.now()-wt<1000)return;wt=Date.now();step(e.deltaY>0?1:-1)},{passive:true});
let tx=null;stage.addEventListener("touchstart",e=>tx=e.touches[0].clientX,{passive:true});
stage.addEventListener("touchend",e=>{if(tx===null)return;const dx=e.changedTouches[0].clientX-tx;tx=null;if(Math.abs(dx)>50)step(dx<0?1:-1)});

function readDate(pre,obj){const y=book.querySelector(`#${pre}-y`),m=book.querySelector(`#${pre}-m`),d=book.querySelector(`#${pre}-d`);if(!y)return;
  obj.y=+y.value||obj.y;obj.m=+m.value;const dn=new Date(obj.y,obj.m,0).getDate();if(d.options.length!==dn){const cv=Math.min(+d.value,dn);d.innerHTML="";for(let i=1;i<=dn;i++)d.add(new Option(i,i));d.value=cv}obj.d=+d.value}
const readFields=()=>{readDate("b",S.birth);readDate("p",S.partner);const na=book.querySelector("#na"),nb=book.querySelector("#nb");if(na)S.nameA=na.value.trim();if(nb)S.nameB=nb.value.trim();const t=book.querySelector("#t-theme");if(t)S.theme=t.value;const h=book.querySelector("#t-hour");if(h)S.btime=+h.value;save()};
book.addEventListener("change",e=>{if(e.target.tagName==="SELECT"){readFields();render(false)}});
book.addEventListener("input",e=>{if(e.target.classList.contains("nfield")){readFields();const er=book.querySelector("#nerr");if(er)er.textContent=""}});
book.addEventListener("click",e=>{const t=e.target;
  const sw=t.closest(".sw9");if(sw){const c=sw.dataset.c,i=S.colors.indexOf(c);if(i>=0)S.colors.splice(i,1);else if(S.colors.length<3)S.colors.push(c);save();render(true);return}
  if(t.closest("#go")){const b=t.closest("#go");readFields();
    {const v=BOOKS[cur].validate&&BOOKS[cur].validate();if(v){const er=book.querySelector("#nerr");if(er)er.textContent=v;return}}
    if(cur==="en"){const er=book.querySelector("#nerr");const a=nameNumber(S.nameA),c=nameNumber(S.nameB);
      if(!S.nameA.trim()||!S.nameB.trim()){if(er)er.textContent="二人の名前を書き入れてください。";return}
      if(!a||!c){if(er)er.textContent="漢字は読めません。ひらがなで書いてください。";return}if(er)er.textContent=""}
    b.classList.remove("press");void b.offsetWidth;b.classList.add("press");opened[cur]=true;render(false);setTimeout(()=>step(1),420);return}
  if(t.closest("#copy")){const b=t.closest("#copy"),txt=decodeURIComponent(b.dataset.copy)+`\n— ${BOOKS[cur].title}（宵の書架）`;
    try{navigator.clipboard.writeText(txt).then(()=>b.textContent="写しとりました").catch(()=>b.textContent="写しとれませんでした")}catch(err){b.textContent="写しとれませんでした"}return}
  if(t.closest("#again")){if(lock)return;if(shared){exitShared(true);return}opened={};if(cur==="tsuki"){newDraw();render(true)}const idx=F.findIndex(f=>f.input);k=isMob()?idx:Math.floor((idx+1)/2);layout();return}
  const ch=t.closest(".choice");if(ch){readFields();const key=ch.parentNode.dataset.key;S[key]=ch.dataset.v;save();render(true);return}
  const tc=t.closest(".tcard");if(tc){const P=S.tarot.picks,ci=+tc.dataset.i;if(P.length>=3||P.includes(ci))return;P.push(ci);tc.classList.add("picked");
    const sl=book.querySelectorAll(".tslot")[P.length-1];if(sl){sl.classList.add("full");sl.insertAdjacentHTML("afterbegin",tback())}
    const ts=book.querySelector("#tstate");if(ts)ts.textContent=P.length<3?`扇から、あと${3-P.length}枚選んでください`:"この印を押して、札をひらく";
    if(P.length===3){const rv=book.querySelector("#reveal");if(rv){rv.disabled=false;rv.classList.add("ready")}}return}
  if(t.closest("#reshuffle")){newDraw();render(true);return}
  if(t.closest("#reveal")){const b=t.closest("#reveal");if(b.disabled)return;b.classList.remove("press");void b.offsetWidth;b.classList.add("press");S.tarot.revealed=true;render(false);
    setTimeout(()=>{const ri=F.findIndex(f=>f.rh==="ひらいた札");const vis=isMob()?[k]:[2*k-1,2*k];if(vis.includes(ri))flipVisible();else step(1)},380);return}
});
stage.addEventListener("click",e=>{if(!landed||desk.classList.contains("off"))return;
  if(e.target.closest("button,a,select,input,label,.choice,.tcard,.nerr,.sw9"))return;
  const r=drop.getBoundingClientRect();if(e.clientX<r.left-24||e.clientX>r.right+24||e.clientY<r.top-24||e.clientY>r.bottom+24)return;
  if(k===0){step(1);return}if(!isMob()&&k===SHEETS){step(-1);return}
  step(e.clientX>r.left+r.width/2?1:-1)});
stage.addEventListener("pointermove",e=>{return;const r=stage.getBoundingClientRect();
  const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;tilt.style.transform=`rotateX(${(-y*5).toFixed(2)}deg) rotateY(${(x*6).toFixed(2)}deg)`});
stage.addEventListener("pointerleave",()=>tilt.style.transform="");
function sizeBook(){const r=stage.getBoundingClientRect();const sw=r.width,sh=r.height-20;let w,h;
  const a=META[cur]?META[cur].aspect:.66;if(isMob()){w=Math.min(sw,sh*a,470);h=w/a}else{w=Math.min(1080,sw*.94,sh*2*a*.96);h=w/(2*a)}
  for(const el of[drop,cast]){el.style.width=w+"px";el.style.height=h+"px"}}
function fall(){drop.style.transition="";drop.style.transform="none";const rest=drop.getBoundingClientRect();const startY=rest.bottom+80;
  cast.style.opacity="";if(reduced){land();return}
  const T=3800;let t0=null;
  const frame=now=>{if(t0===null)t0=now;const p=Math.min(1,(now-t0)/T);const e=1-Math.pow(1-p,2.35);const h=1-e;const ph=p*Math.PI*2*1.7;
    const x=Math.sin(ph)*90*h,y=-startY*h,rz=Math.cos(ph)*13*h,rx=34*h*h+Math.sin(ph*2)*7*h,ry=Math.sin(ph)*12*h;
    drop.style.transform=`translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) rotateZ(${rz.toFixed(2)}deg)`;
    cast.style.setProperty("--h",Math.min(1,h*1.6).toFixed(3));if(p<1)requestAnimationFrame(frame);else land()};
  cast.style.setProperty("--h",1);drop.style.transform=`translate3d(0,${-startY}px,0)`;requestAnimationFrame(frame)}
function land(){drop.style.transform="none";cast.style.setProperty("--h",0);landed=true;
  if(!isMob()){book.classList.add("landing","shine");setTimeout(()=>book.classList.remove("landing"),400)}
  const c=book.querySelector(".face.cover");if(c&&!reduced)puff(c.getBoundingClientRect());layout();
  if(pendingJump){pendingJump=false;setTimeout(()=>{const ri=resultIndex();k=isMob()?ri:Math.ceil(ri/2);layout()},600)}}

/* ================= shelf (photo + 3D books) ================= */
const META={"kazu": {"aspect": 0.6575, "circle": [0.505, 0.474, 0.415, 0.273]}, "en": {"aspect": 0.749, "circle": [0.506, 0.46, 0.525, 0.395]}, "meguri": {"aspect": 0.6654, "circle": [0.51, 0.479, 0.475, 0.317]}, "tsuki": {"aspect": 0.6654, "circle": [0.512, 0.491, 0.508, 0.338]}, "hoshi": {"aspect": 0.623, "circle": [0.5133, 0.4854, 0.4703, 0.293]}, "yume": {"aspect": 0.62, "circle": [0.5215, 0.4831, 0.477, 0.2957]}, "ishi": {"aspect": 0.665, "circle": [0.503, 0.471, 0.6, 0.399]}, "ki": {"aspect": 0.665, "circle": [0.5, 0.462, 0.58, 0.386]}, "iro": {"aspect": 0.665, "circle": [0.505, 0.465, 0.5, 0.333]}, "tama": {"aspect": 0.665, "circle": [0.498, 0.476, 0.56, 0.372]}};
const shelf=document.getElementById("shelf"),desk=document.getElementById("desk"),room=document.getElementById("room"),rowEl=document.getElementById("row"),guide=document.getElementById("guide");
const IMG={w:1448,h:1086,candle:[138,440],floor:788};
const ACC={ishi:"#2f6b67",ki:"#9a5b2a",iro:"#8a3f6e",tama:"#3a4579",kazu:"#8b6a2f",en:"#a3474e",meguri:"#4a6741",tsuki:"#5d4f8c",hoshi:"#3f5f8a",yume:"#a65f45"};
const star4=(x,y,r)=>`M${x} ${y-r}L${x+r*.24} ${y-r*.24}L${x+r} ${y}L${x+r*.24} ${y+r*.24}L${x} ${y+r}L${x-r*.24} ${y+r*.24}L${x-r} ${y}L${x-r*.24} ${y-r*.24}Z`;
const PAT={ishi:`<g fill="#2f6b67" fill-opacity=".28"><path d="M14 6l6 5-6 12-6-12z"/><circle cx="42" cy="42" r="1.4"/></g>`,
 ki:`<g fill="#7a5a22" fill-opacity=".3"><rect x="9" y="9" width="4" height="4"/><rect x="15" y="9" width="4" height="4"/><rect x="9" y="15" width="4" height="4"/><rect x="15" y="15" width="4" height="4"/><circle cx="42" cy="42" r="1.4"/></g>`,
 iro:`<g fill-opacity=".45"><circle cx="12" cy="12" r="3" fill="#e59ab3"/><circle cx="18" cy="16" r="2.4" fill="#9a6fc0"/><circle cx="42" cy="42" r="2" fill="#5b8fc7"/></g>`,
 tama:`<g fill="#ffffff" fill-opacity=".45"><path d="M14 20c-5-3-5-9-1-12 1 3 3 4 4 3 0 4 1 6-3 9z"/><circle cx="42" cy="42" r="1"/><circle cx="48" cy="36" r=".8"/></g>`,hoshi:`<g fill="#ffffff" fill-opacity=".6"><path d="${star4(14,14,4.4)}"/><circle cx="42" cy="40" r="1.3"/><circle cx="34" cy="48" r=".9"/><circle cx="48" cy="46" r=".9"/></g>`,
 yume:`<g fill="#a65f45" fill-opacity=".22"><path d="M6 20c0-5 5-8 9-6 2-5 11-6 14 0 5-1 9 2 8 6 4 1 3 7-1 7H8c-4 0-5-5-2-7z"/><circle cx="44" cy="44" r="1.6"/></g>`,kazu:`<g fill="#9a7a3c" fill-opacity=".42"><path d="${star4(14,14,5)}"/><path d="${star4(42,42,3.4)}"/></g>`,
 en:`<g fill="#9c4950" fill-opacity=".32">${[0,72,144,216,288].map(a=>`<circle cx="${(14+3.2*Math.cos(a*Math.PI/180)).toFixed(2)}" cy="${(14+3.2*Math.sin(a*Math.PI/180)).toFixed(2)}" r="2.1"/>`).join("")}<circle cx="42" cy="42" r="1.6"/></g>`,
 meguri:`<g fill="#3f5a3a" fill-opacity=".34"><path d="M14 21C8 15 10 9 14 6c4 3 6 9 0 15z"/><path d="M42 35c6 6 4 12 0 15-4-3-6-9 0-15z"/></g>`,
 tsuki:`<g fill="#ffffff" fill-opacity=".55"><path d="M17 8a7 7 0 1 0 0 12a5.4 5.4 0 1 1 0-12z"/><path d="${star4(42,42,3.2)}"/><circle cx="44" cy="14" r=".9"/><circle cx="12" cy="44" r=".9"/></g>`};
const patURL=id=>`url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56">${PAT[id]}</svg>`)}")`;
const LABC={ishi:"#15373b",ki:"#9b6b2d",iro:"#563343",tama:"#19273d",hoshi:"#566275",yume:"#a96a57",kazu:"#d9cdb4",en:"#b57d72",meguri:"#62714f",tsuki:"#827a98"};
const EMB={ishi:["#f2e3b6","0 1px 1px rgba(20,50,48,.55)"],ki:["#fff1cf","0 1px 1px rgba(90,60,20,.5)"],iro:["#f6e6c4","0 1px 1px rgba(60,30,50,.55)"],tama:["#e9d79c","0 1px 1px rgba(10,14,30,.6)"],hoshi:["#f7ebc4","0 1px 1px rgba(30,45,70,.55)"],yume:["#fff3df","0 1px 1px rgba(110,60,40,.5)"],kazu:["#7a5822","0 1px 0 rgba(255,250,235,.55),0 -1px 0 rgba(80,55,15,.2)"],en:["#f3dcc0","0 1px 1px rgba(90,40,30,.45)"],meguri:["#f0dca8","0 1px 1px rgba(30,45,20,.55)"],tsuki:["#f4f2f8","0 1px 1px rgba(50,40,80,.5)"]};
const embStyle=id=>`--emb:${EMB[id][0]};--embs:${EMB[id][1]}`;

const hoverable=matchMedia("(hover:hover) and (pointer:fine)");
let view={s:1,tx:0,ty:0},pulled=null,pushT=null,zTop=40;
const SEED=(Math.random()*2**31)|0;
const mulberry=a=>()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
function fitRoom(){const vw=innerWidth,vh=innerHeight,mob=vw<760;let s,tx,ty;
  const ib=document.querySelector(".intro").getBoundingClientRect().bottom||120,gt=guide.getBoundingClientRect().top||(vh-200);
  const top=ib+(mob?6:10),bot=gt-(mob?30:34),R0=255,R1=830;
  s=(bot-top)/(R1-R0);if(mob)s=Math.min(s,vw/730);else s=Math.min(s,vw/1200);
  tx=mob?-20*s:(vw-IMG.w*s)/2;ty=(top+bot)/2-(R0+R1)/2*s;
  view={s,tx,ty};room.style.transform=`translate(${tx}px,${ty}px) scale(${s})`}
const toScreen=(x,y)=>[view.tx+x*view.s,view.ty+y*view.s];
const litAt=(x,y)=>Math.max(.5,1.1-Math.hypot(x-IMG.candle[0],y-IMG.candle[1])/1500);

function buildShelfRow(){
  const r=mulberry(SEED),mob=innerWidth<760;
  const vx0=-view.tx/view.s,vx1=(innerWidth-view.tx)/view.s;
  const L=Math.max(mob?228:258,vx0+20),R=Math.min(1396,vx1-(mob?10:30)),span=R-L;
  const order=[...ORDER].sort(()=>r()-.5);
  const SH=mob?474:490;const specs=order.map(id=>{const H=SH+r()*22;return{id,H,T:H*.142,D:H*META[id].aspect*.96}});
  {const sumT=specs.reduce((a2,s2)=>a2+s2.T,0),f=Math.min(1,span*(mob?.97:.66)/sumT);if(f<1)specs.forEach(s2=>{s2.H*=f;s2.T*=f;s2.D*=f})}
  let html="";const placed=[];
  const FILL={"spines": [[120, 705], [124, 559], [91, 607], [134, 663], [109, 550], [125, 615], [160, 659], [102, 615], [163, 707], [94, 583], [128, 618], [128, 685]], "stack": [699, 438], "props": {"ball": [288, 393], "vase": [286, 582], "glass": [237, 496]}};
  // filler spines from the photographed set: shuffle once so the same spine does not sit next to itself
  const bag=[];const nextSrc=()=>{if(!bag.length){const o=[...Array(12).keys()].sort(()=>r()-.5);bag.push(...o)}return bag.pop()};
  const filler=(x,it,extra="")=>{const b=(.62+r()*.22)*litAt(x,IMG.floor-it.h/2);
    return`<div class="fb" style="left:${x.toFixed(1)}px;top:${(IMG.floor-it.h).toFixed(1)}px;width:${it.w.toFixed(1)}px;height:${it.h.toFixed(1)}px;background-image:url(assets/s${it.src}.webp);--b:${b.toFixed(2)};${extra}"></div>`};
  const mkF=()=>{const src=nextSrc(),[iw,ih]=FILL.spines[src],h=Math.min(SH-14,345+r()*125);return{t:"f",src,h,w:iw*h/ih*(mob?.62:.8)}};
  const gapOf=()=>.4+r()*1.2;
  const seq=[];let W=0;while(W<span+60){const f=mkF();seq.push(f);W+=f.w+1}
  // a pile of lying books and one or two small objects in the gaps
  const extras=mob?[]:[["stack",.36+r()*.3]];const pr=["ball","vase","glass"].sort(()=>r()-.5);
  if(!mob){extras.push(["prop:"+pr[0],.08+r()*.18]);if(r()<.6)extras.push(["prop:"+pr[1],.72+r()*.2])}else if(r()<.7)extras.push(["prop:"+pr[0],.86])
  const PH={ball:mob?150:180,vase:mob?230:270,glass:mob?190:225};
  extras.sort((a2,b2)=>b2[1]-a2[1]).forEach(([kind,at])=>{let w,item;
    if(kind==="stack"){const[iw,ih]=FILL.stack;w=200;item={t:"stack",w,h:w*ih/iw}}else{const nm=kind.slice(5),[iw,ih]=FILL.props[nm],h=PH[nm];w=iw*h/ih;item={t:"prop",nm,w:w+14,h}}
    const ix=Math.floor(seq.length*at);let fw=0,k2=0;while(fw<item.w&&ix+k2<seq.length){fw+=seq[ix+k2].w+1;k2++}seq.splice(ix,k2,item)});
  const n=seq.length;const NB=specs.length;const idx=specs.map((_,i)=>Math.min(n,Math.max(0,Math.floor(n*((i+.5)/NB+(r()-.5)*.5/NB)))));
  idx.map((v,i)=>[v,i]).sort((a2,b2)=>b2[0]-a2[0]).forEach(([v,i])=>seq.splice(v,0,{t:"s",sp:specs[i],w:specs[i].T}));
  const total=()=>seq.reduce((s2,it)=>s2+it.w+1.2,0);
  while(total()>span-(mob?4:50)){let j=seq.length-1;while(j>=0&&seq[j].t!=="f")j--;if(j<0)break;seq.splice(j,1)}
  let x=L;
  for(const it of seq){
    if(it.t==="s"){placed.push({...it.sp,x});x+=it.w+gapOf();continue}
    if(it.t==="stack"){html+=`<div class="fobj" style="left:${x.toFixed(1)}px;top:${(IMG.floor-it.h).toFixed(1)}px;width:${it.w.toFixed(1)}px;height:${it.h.toFixed(1)}px;background-image:url(assets/stack.webp);--b:${(.75*litAt(x,IMG.floor-60)).toFixed(2)}"></div>`;x+=it.w+gapOf();continue}
    if(it.t==="prop"){html+=`<div class="fobj prop" style="left:${(x+7).toFixed(1)}px;top:${(IMG.floor-it.h+3).toFixed(1)}px;width:${(it.w-14).toFixed(1)}px;height:${it.h.toFixed(1)}px;background-image:url(assets/${it.nm}.webp);--b:${(.95*litAt(x,IMG.floor-it.h/2)).toFixed(2)}"></div>`;x+=it.w+gapOf();continue}
    html+=filler(x,it);x+=it.w+gapOf()}
  if(R-x>30){const f=mkF();f.h=Math.min(f.h,420);f.w=Math.min(f.w,R-x+20);html+=filler(x+f.h*.12-2,f,"transform:rotate(-7deg)")}
  // the four titled books
  placed.forEach(p=>{const B=BOOKS[p.id],c=META[p.id].circle,top=IMG.floor-p.H,cx=p.x+p.T/2;const shade=(1-litAt(cx,IMG.floor-p.H/2)).toFixed(2);
    const half=(p.T*.2+p.D*.98)/2*1.18*1.18;const dx=Math.min(Math.max(cx,vx0+half+10),vx1-half-10)-cx;
    html+=`<div class="slot" data-id="${p.id}" style="left:${p.x.toFixed(1)}px;top:${top.toFixed(1)}px;width:${p.T.toFixed(1)}px;height:${p.H.toFixed(1)}px"></div>
    <div class="pv" style="left:${p.x.toFixed(1)}px;top:${top.toFixed(1)}px;width:${p.T.toFixed(1)}px;height:${p.H.toFixed(1)}px"><div class="bk3${B.metal==="silver"?" silver":""}" data-book="${p.id}" style="--T:${p.T.toFixed(1)};--labc:${LABC[p.id]};${embStyle(p.id)};--shade:${shade};--z1:${(p.D*.5).toFixed(0)}px;--z2:${(p.D*(mob?1.15:.75)).toFixed(0)}px;--ly:${mob?-24:-6}px;--ps:${mob?1:.94};--dx:${dx.toFixed(0)}px;transform-origin:50% 50% ${(-p.D/2).toFixed(0)}px">
      <div class="bc" style="width:${p.D.toFixed(1)}px;height:${p.H.toFixed(1)}px;transform:rotateY(90deg)"></div>
      <div class="tp" style="width:${p.T.toFixed(1)}px;height:${p.D.toFixed(1)}px;transform:rotateX(-90deg)"></div>
      <div class="cv" style="width:${p.D.toFixed(1)}px;height:${p.H.toFixed(1)}px;background-image:url(assets/${p.id}-cover.jpg);transform:translateX(${p.T.toFixed(1)}px) rotateY(90deg)"><div class="cvt3" style="left:${(c[0]-c[2]/2)*100}%;top:${(c[1]-c[3]/2)*100}%;width:${c[2]*100}%;height:${c[3]*100}%"><div class="emb title">${B.title}</div><div class="mrule e"></div><div class="emb sc">${B.en}</div></div><i class="lit"></i></div>
      <div class="sp" style="background-image:url(assets/${p.id}-spine.jpg)"><div class="lab t"><span>${B.title}</span></div><div class="lab g"><span>${B.tag}</span></div><i class="lit"></i></div>
    </div></div>`});
  rowEl.innerHTML=html;pulled=null;buildGuide([...placed].sort((a2,b2)=>a2.x-b2.x).map(p=>p.id));
  if(cur&&!desk.classList.contains("off")){const b=bk(cur);if(b){b.classList.add("out1","out2","fly");b.parentNode.style.zIndex=40}}
}
const _bk=0;
const GUIDE={kazu:{q:"自分の本質",w:"生年月日の数で読む",need:"生年月日"},
 en:{q:"あの人との相性",w:"二人の状況と名前で読む",need:"状況＋二人の名前"},
 meguri:{q:"これからの運気",w:"九年の巡りと月ごとの暦",need:"生年月日＋気になること"},
 tsuki:{q:"今夜のメッセージ",w:"三枚のタロットで読む",need:"札を三枚引く"},
 hoshi:{q:"星座と相性",w:"誕生日の星座で読む",need:"誕生日"},
 yume:{q:"夢と直感のしるし",w:"夢か、直感で選ぶ絵で読む",need:"絵をひとつ選ぶ"},
 ishi:{q:"わたしを守る石",w:"願いと心の状態で選ぶ",need:"二つの問いに答える"},
 ki:{q:"九星と今年の方位",w:"生まれ年の星と方位盤",need:"生年月日"},
 iro:{q:"わたしのオーラの色",w:"直感で選ぶ三つの色",need:"色を三つ選ぶ"},
 tama:{q:"前世の物語",w:"惹かれる情景で読む",need:"三つの問いに答える"}};
function buildGuide(order){guide.innerHTML='<div class="step">いま、知りたいことは？</div>'+order.map(id=>{const G=GUIDE[id],B=BOOKS[id];
  return`<button class="gcard" type="button" role="listitem" data-id="${id}"><span class="sw" style="background-image:url(assets/${id}-spine.jpg)"></span><span class="q">${G.q}</span><span class="w"><b>${B.title}</b><i>${G.w}</i></span><span class="m"><span>必要なもの　${G.need}</span><span class="go">ひらく ›</span></span></button>`}).join("")}
const bk=id=>rowEl.querySelector(`.bk3[data-book="${id}"]`);
function setCaption(id){guide.classList.toggle("picked",!!id);guide.querySelectorAll(".gcard").forEach(c=>{const on=c.dataset.id===id;c.classList.toggle("on",on);if(on&&guide.scrollWidth>guide.clientWidth+4){const x=c.offsetLeft;guide.scrollTo({left:Math.max(0,x),behavior:reduced?"auto":"smooth"})}const g=c.querySelector(".go");if(g)g.textContent=hoverable.matches?"ひらく ›":"もう一度で ひらく ›"})}
function pull(id){if(busy)return;clearTimeout(pushT);if(pulled===id)return;if(pulled)push(pulled);pulled=id;const el=bk(id);if(!el)return;
  rowEl.querySelectorAll(".pv").forEach(v=>{if(v.style.zIndex)v.style.zIndex=20});el.parentNode.style.zIndex=++zTop;el.classList.add("out1");setTimeout(()=>{if(pulled===id)el.classList.add("out2")},reduced?0:190);setCaption(id)}
function push(id){const el=bk(id);if(pulled===id){pulled=null;setCaption(null)}if(!el)return;el.classList.remove("out2");if(pulled)el.parentNode.style.zIndex=20;
  setTimeout(()=>{if(pulled!==id){el.classList.remove("out1");setTimeout(()=>{if(pulled!==id)el.parentNode.style.zIndex=""},500)}},reduced?0:260)}
// 引き出した本の表紙・背の上なら、後ろにある隣の本より優先する（余白4px）
const inPulled=e=>{if(!pulled)return false;const el=bk(pulled);if(!el)return false;return[el,...el.querySelectorAll(".cv,.sp")].some(f=>{const r=f.getBoundingClientRect();return r.width>0&&e.clientX>=r.left-4&&e.clientX<=r.right+4&&e.clientY>=r.top-4&&e.clientY<=r.bottom+4})};
const hitId=e=>{const g=e.target.closest&&e.target.closest(".gcard");if(g)return g.dataset.id;if(inPulled(e))return pulled;
  const t=e.target.closest&&e.target.closest(".slot,.bk3");return t?t.dataset.id||t.dataset.book:null};
shelf.addEventListener("pointermove",e=>{if(!hoverable.matches||busy)return;const id=hitId(e);if(id)pull(id);else if(pulled){clearTimeout(pushT);const p=pulled;pushT=setTimeout(()=>push(p),180)}});
shelf.addEventListener("pointerleave",()=>{if(pulled&&hoverable.matches){const p=pulled;pushT=setTimeout(()=>push(p),180)}});
shelf.addEventListener("click",e=>{if(busy)return;const id=hitId(e);if(!id){if(pulled)push(pulled);return}
  if(hoverable.matches||pulled===id)choose(id);else pull(id)});
addEventListener("keydown",e=>{if(shelf.classList.contains("off")||busy)return;
  if(e.key==="ArrowRight"||e.key==="ArrowLeft"){const ids=[...rowEl.querySelectorAll(".bk3")].map(b=>b.dataset.book);const i=ids.indexOf(pulled);const n=i<0?0:(i+(e.key==="ArrowRight"?1:-1)+ids.length)%ids.length;pull(ids[n])}
  if(e.key==="Enter"&&pulled)choose(pulled);if(e.key==="Escape"&&pulled)push(pulled)});
function shelfLight(){const[x,y]=toScreen(...IMG.candle);if(!shelf.classList.contains("off"))setLight(x/innerWidth,y/innerHeight)}

function resultIndex(){let g=F.findIndex(f=>f.gate);if(g<0)g=F.findIndex(f=>f.input&&/id="go"/.test(f.html||""));return g+1}
function readHash(){const m=/^#r-([a-z]+)-([a-z0-9-]+)$/.exec(location.hash||"");if(!m||!BOOKS[m[1]]||!BOOKS[m[1]].untok)return null;return{id:m[1],parts:m[2].split("-")}}
const sharedbar=document.getElementById("sharedbar");
function openShared(h){if(busy)return false;const B=BOOKS[h.id];const keep=S;S=JSON.parse(JSON.stringify(S));SHR=null;
  if(!B.untok(h.parts)){S=keep;SHR=null;return false}S0=keep;shared=true;sharedParts=h.parts;pendingJump=true;sharedbar.hidden=false;
  if(!desk.classList.contains("off")){cur=h.id;opened={[cur]:true};document.getElementById("bookname").textContent=B.title;build();const ri=resultIndex();k=isMob()?ri:Math.ceil(ri/2);pendingJump=false;layout();return true}
  choose(h.id);return true}
function exitShared(own){if(!shared)return;S=S0;S0=null;SHR=null;shared=false;sharedParts=null;sharedbar.hidden=true;try{if(location.hash)history.replaceState(null,"",location.pathname+location.search)}catch(err){}
  if(own){opened={};if(cur==="tsuki")newDraw();build();const ii=F.findIndex(f=>f.input);k=isMob()?ii:Math.ceil(ii/2);layout()}}
document.getElementById("mine").onclick=()=>exitShared(true);
function readBookHash(){const m=/^#b-([a-z]+)$/.exec(location.hash||"");return m&&BOOKS[m[1]]?m[1]:null}
function openFromHash(){const id=readBookHash();if(!id)return false;try{history.replaceState(null,"",location.pathname+location.search)}catch(err){}
  if(!desk.classList.contains("off")){if(cur===id)return true;toShelf();setTimeout(()=>choose(id),1900);return true}choose(id);return true}
addEventListener("hashchange",()=>{const h=readHash();if(h&&!busy){openShared(h);return}if(!busy)openFromHash()});
function choose(id){if(busy)return;busy=true;cur=id;opened={};if(shared)opened[id]=true;if(id==="tsuki"&&!shared)newDraw();clearTimeout(pushT);const el=bk(id);
  document.getElementById("bookname").textContent=BOOKS[id].title;
  if(el){el.classList.add("out1","out2");requestAnimationFrame(()=>el.classList.add("fly"))}
  setTimeout(()=>{shelf.classList.add("off");desk.classList.remove("off");const[lx,ly]=deskLight();setLight(lx,ly);
    k=0;landed=false;tilt.style.transform="";sizeBook();build();setTimeout(()=>{fall();busy=false;pulled=null;setCaption(null)},300)},reduced?10:720)}
function toShelf(){if(busy||!landed)return;busy=true;landed=false;tilt.style.transform="";layout();
  const r=drop.getBoundingClientRect();drop.style.transition=reduced?"none":"transform .8s cubic-bezier(.55,0,.8,.25)";
  drop.style.transform=`translate3d(0,${-(r.bottom+100)}px,0) rotateX(18deg) rotateZ(-4deg)`;cast.style.opacity="0";
  setTimeout(()=>{desk.classList.add("off");shelf.classList.remove("off");shelfLight();drop.style.transition="";if(shared)exitShared(false);
    const el=bk(cur);if(el){el.classList.add("out1","out2");el.parentNode.style.zIndex=40;el.classList.remove("fly");pulled=cur;setCaption(cur);
      setTimeout(()=>{busy=false;if(!hoverable.matches)push(cur)},900)}else busy=false},reduced?10:760)}
document.getElementById("backbtn").onclick=toShelf;

/* ================= boot ================= */
let mode=isMob()?"m":"d";
makeTextures();drawTable();sizeDust();if(!reduced)requestAnimationFrame(dustLoop);else dustLoop(0);
buildGuide(ORDER);fitRoom();buildShelfRow();fitRoom();buildShelfRow();shelfLight();
{const h=readHash();if(h)setTimeout(()=>openShared(h),900);else if(readBookHash())setTimeout(openFromHash,900)}
let rt;addEventListener("resize",()=>{clearTimeout(rt);rt=setTimeout(()=>{drawTable();sizeDust();fitRoom();buildShelfRow();shelfLight();sizeBook();
  if(!desk.classList.contains("off")){const[lx,ly]=deskLight();setLight(lx,ly);const nm=isMob()?"m":"d";
    if(nm!==mode){k=nm==="m"?(k===0?0:Math.min(2*k,2*SHEETS-1)):Math.ceil(k/2);mode=nm;build()}else{layout();drawCanvases()}}
  else mode=isMob()?"m":"d"},150)});
