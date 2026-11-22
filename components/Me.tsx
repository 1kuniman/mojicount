"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { meOf, validBirth, type Birth, type MeResult } from "@/lib/me";
import type { MeData, MeItem } from "@/lib/meData";

/* 誕生日の「しおり」。この端末の中（localStorage）だけに保存し、サーバーには送らない */
const KEY = "yoi-me";
const READ = "yoi-read";
const EVT = "yoi-me-change";
const YEAR = 2027;

const load = (): Birth | null => {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || "null");
    return validBirth(v) ? { y: v.y, m: v.m, d: v.d } : null;
  } catch {
    return null;
  }
};
const save = (b: Birth | null) => {
  try {
    if (b) localStorage.setItem(KEY, JSON.stringify(b));
    else localStorage.removeItem(KEY);
  } catch {}
  try {
    window.dispatchEvent(new Event(EVT));
  } catch {}
};
const readSet = (): string[] => {
  try {
    const v = JSON.parse(localStorage.getItem(READ) || "[]");
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
};
const ev = (name: string, params: Record<string, string>) => {
  try {
    const g = (window as any).gtag;
    if (typeof g === "function") g("event", name, params);
  } catch {}
};

/** 保存してある誕生日。null=未入力、undefined=読み込み前（読み込み前は未入力と同じ見た目を出す＝HTMLに入口と見出しが入る） */
function useBirth() {
  const [b, setB] = useState<Birth | null | undefined>(undefined);
  useEffect(() => {
    const sync = () => setB(load());
    sync();
    window.addEventListener(EVT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return b;
}

const NOW_YEAR = () => new Date().getFullYear();
const YEARS = Array.from({ length: 2026 - 1930 + 1 }, (_, i) => 2026 - i);

function BirthForm({ initial, cta, where }: { initial: Birth | null; cta: string; where: string }) {
  const [y, setY] = useState(initial?.y ? String(initial.y) : "");
  const [m, setM] = useState(initial?.m ? String(initial.m) : "");
  const [d, setD] = useState(initial?.d ? String(initial.d) : "");
  const [err, setErr] = useState("");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const b = { y: +y, m: +m, d: +d };
    if (!validBirth(b)) {
      setErr("生まれた年・月・日を選んでください（存在しない日付は選べません）。");
      return;
    }
    setErr("");
    save(b);
    ev("me_calc", { where });
  };
  return (
    <form className="meform" onSubmit={submit}>
      <div className="mefields">
        <label>
          <span>年</span>
          <select value={y} onChange={(e) => setY(e.target.value)} aria-label="生まれた年">
            <option value="">----</option>
            {YEARS.map((v) => <option key={v} value={v}>{v}</option>)}
          </select>
        </label>
        <label>
          <span>月</span>
          <select value={m} onChange={(e) => setM(e.target.value)} aria-label="生まれた月">
            <option value="">--</option>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((v) => <option key={v} value={v}>{v}</option>)}
          </select>
        </label>
        <label>
          <span>日</span>
          <select value={d} onChange={(e) => setD(e.target.value)} aria-label="生まれた日">
            <option value="">--</option>
            {Array.from({ length: 31 }, (_, i) => i + 1).map((v) => <option key={v} value={v}>{v}</option>)}
          </select>
        </label>
      </div>
      <button type="submit">{cta}</button>
      {err && <p className="meerr" role="alert">{err}</p>}
      <small>誕生日はこの端末の中にだけ保存され、どこにも送信されません。</small>
    </form>
  );
}

/** 境目の日に生まれた人への注意書き */
function Caveats({ r, kinds }: { r: MeResult; kinds: ("star" | "sign" | "eto")[] }) {
  const notes: string[] = [];
  if ((kinds.includes("star") || kinds.includes("eto")) && r.nearRisshun)
    notes.push("九星と干支は立春で年が切り替わります。この頁では2月4日を境にしていますが、立春は年によって2月3日〜5日に動きます。この前後に生まれた人は、前後の年の結果も読んでみてください。");
  else if (kinds.includes("eto") && r.beforeRisshun)
    notes.push("干支占いでは立春（2月4日ごろ）より前の生まれを前の年として読みます。年賀状などで使う干支（1月1日区切り）とは違う場合があります。");
  if (kinds.includes("sign") && r.signEdge) notes.push("星座の境目の日は、生まれた年や時刻によって1日ずれることがあります。隣の星座の頁も読んでみてください。");
  if (!notes.length) return null;
  return <div className="menote">{notes.map((n, i) => <p key={i}>{n}</p>)}</div>;
}

function Card({ kind, it, read, title, sub }: { kind: string; it: MeItem; read: boolean; title?: string; sub?: string }) {
  return (
    <li>
      <Link href={it.href} onClick={() => ev("me_card", { kind })}>
        <small className="k">{kind}{read && <i> ・読んだ</i>}</small>
        <b>{title ?? it.label}</b>
        <span>{sub ?? it.sub}</span>
        <em>2027年を読む ›</em>
      </Link>
    </li>
  );
}

/** /2027/ の「わたしの2027年」：誕生日から4つの占いの結果をまとめて出す */
export function MyYear({ data, children }: { data: MeData; children?: ReactNode }) {
  const b = useBirth();
  const [read, setRead] = useState<string[]>([]);
  const [edit, setEdit] = useState(false);
  useEffect(() => setRead(readSet()), [b]);
  useEffect(() => {
    if (b) setEdit(false);
  }, [b]);
  const r = b ? meOf(b, YEAR, NOW_YEAR()) : null;
  const star = r ? data.star[String(r.star)] : null;
  const sign = r ? data.sign[r.sign] : null;
  const eto = r ? data.eto[r.eto] : null;
  const py = r ? data.py[String(r.py)] : null;
  const done = r && star && sign && eto && py ? [star.href, sign.href, eto.href, py.href].filter((h) => read.includes(h)).length : 0;
  const text = r && star && sign && eto && py ? `わたしの2027年は「${star.label}・${sign.label}・${eto.label.replace(/・.*/, "")}・${py.label}（${py.sub}）」でした。` : "";
  const url = "https://www.mojimojicount.com/2027/";
  return (
    <section className="me" id="me">
      <p className="chap">わたしの2027年</p>
      <h2>誕生日から、四つの占いをまとめて読む</h2>
      {(!r || edit) && (
        <>
          <p className="melead">生まれた日を入れると、九星気学・星座・干支・数秘術、それぞれのあなたの2027年が一度に出ます。</p>
          <BirthForm initial={b ?? null} cta="わたしの2027年を出す" where="2027-top" />
        </>
      )}
      {r && star && sign && eto && py && !edit && (
        <>
          <p className="melead">
            {b!.y}年{b!.m}月{b!.d}日生まれのあなたの2027年です。
            <button type="button" className="melink" onClick={() => setEdit(true)}>誕生日を変える</button>
          </p>
          <ol className="mecards">
            <Card kind="九星気学" it={star} read={read.includes(star.href)} />
            <Card kind="星占い" it={sign} read={read.includes(sign.href)} />
            <Card kind="干支占い" it={eto} read={read.includes(eto.href)} />
            <Card kind="数秘術" it={py} read={read.includes(py.href)} title={`${r.py}・${py.sub}`} sub={py.label} />
          </ol>
          <p className="meprog">四つのうち <b>{done}</b> つを読みました。{done === 4 ? "四つを重ねて、共通していた言葉を手帳に書き留めてみてください。" : "違う占いが同じことを言っていたら、そこが今年の要です。"}</p>
          <Caveats r={r} kinds={["star", "sign", "eto"]} />
          <p className="meshare">
            <span>結果を残す・伝える</span>
            <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(text + " #宵の書架")}&url=${encodeURIComponent(url)}`} target="_blank" rel="noopener" onClick={() => ev("share_click", { to: "x" })}>Xに書く</a>
            <a href={`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`} target="_blank" rel="noopener" onClick={() => ev("share_click", { to: "line" })}>LINEで送る</a>
            <button type="button" onClick={() => { try { navigator.clipboard.writeText(`${text} ${url}`); ev("share_click", { to: "copy" }); } catch {} }}>コピー</button>
          </p>
          {children}
        </>
      )}
    </section>
  );
}

type Kind = "star" | "sign" | "eto" | "py";
const KIND_TITLE: Record<Kind, [string, string, string]> = {
  star: ["本命星の計算", "生年月日から、本命星を出す", "本命星を出す"],
  sign: ["星座を調べる", "誕生日から、あなたの星座を出す", "星座を出す"],
  eto: ["干支を調べる", "生年月日から、あなたの干支を出す", "干支を出す"],
  py: ["パーソナルイヤーの計算", "誕生日から、パーソナルイヤーを出す", "パーソナルイヤーを出す"],
};

/** 一覧ページに置く計算機：その占いの結果だけを出す */
export function BirthCalc({ data, kind }: { data: MeData; kind: Kind }) {
  const b = useBirth();
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    if (b) setEdit(false);
  }, [b]);
  const [chap, h2, cta] = KIND_TITLE[kind];
  const now = NOW_YEAR();
  const r = b ? meOf(b, YEAR, now) : null;
  const it = r ? (kind === "star" ? data.star[String(r.star)] : kind === "sign" ? data.sign[r.sign] : kind === "eto" ? data.eto[r.eto] : data.py[String(r.py)]) : null;
  const itNow = r && kind === "py" ? data.py[String(r.pyNow)] : null;
  return (
    <section className="me calc">
      <p className="chap">{chap}</p>
      <h2>{h2}</h2>
      {(!r || edit) && <BirthForm initial={b ?? null} cta={cta} where={`calc-${kind}`} />}
      {r && it && !edit && (
        <>
          <p className="melead">
            {b!.y}年{b!.m}月{b!.d}日生まれのあなたは
            <button type="button" className="melink" onClick={() => setEdit(true)}>誕生日を変える</button>
          </p>
          {kind === "py" && itNow ? (
            <ol className="mecards two">
              <li>
                <Link href={itNow.href} onClick={() => ev("me_card", { kind: "py-now" })}>
                  <small className="k">{now}年</small>
                  <b>{itNow.label}</b>
                  <span>{itNow.sub}</span>
                  <em>くわしく読む ›</em>
                </Link>
              </li>
              <li>
                <Link href={it.href} onClick={() => ev("me_card", { kind: "py-2027" })}>
                  <small className="k">2027年</small>
                  <b>{it.label}</b>
                  <span>{it.sub}</span>
                  <em>くわしく読む ›</em>
                </Link>
              </li>
            </ol>
          ) : (
            <ol className="mecards two">
              <li>
                <Link href={it.href} onClick={() => ev("me_card", { kind: `${kind}-2027` })}>
                  <small className="k">2027年の運勢</small>
                  <b>{it.label}</b>
                  <span>{it.sub}</span>
                  <em>2027年を読む ›</em>
                </Link>
              </li>
              {it.base && (
                <li>
                  <Link href={it.base} onClick={() => ev("me_card", { kind: `${kind}-base` })}>
                    <small className="k">性格・恋愛・仕事</small>
                    <b>{it.label}</b>
                    <span>生まれ持った傾向を読む</span>
                    <em>解説を読む ›</em>
                  </Link>
                </li>
              )}
            </ol>
          )}
          <Caveats r={r} kinds={kind === "py" ? [] : [kind]} />
          <p className="memore"><Link href="/2027/#me">四つの占いをまとめて読む「わたしの2027年」›</Link></p>
        </>
      )}
    </section>
  );
}

/** 全ページの上に出す細い帯：しおりがあれば自分の頁への近道、なければ入口 */
export function MyBar({ data }: { data: MeData }) {
  const b = useBirth();
  const path = usePathname();
  useEffect(() => {
    // 読んだ頁を覚えておく（「四つのうちいくつ読んだか」に使う）
    try {
      const p = path.endsWith("/") ? path : path + "/";
      const s = readSet();
      if (!s.includes(p)) localStorage.setItem(READ, JSON.stringify([...s, p].slice(-200)));
    } catch {}
  }, [path]);
  if (!b)
    return (
      <div className="mybar">
        <Link href="/2027/#me" onClick={() => ev("mybar_click", { state: "empty" })}>誕生日を入れて「わたしの2027年」を読む ›</Link>
      </div>
    );
  const r = meOf(b, YEAR, NOW_YEAR());
  const items: MeItem[] = [data.star[String(r.star)], data.sign[r.sign], data.eto[r.eto], data.py[String(r.py)]].filter(Boolean);
  return (
    <div className="mybar on">
      <Link className="t" href="/2027/#me" onClick={() => ev("mybar_click", { state: "home" })}>わたしの2027年</Link>
      {items.map((it) => (
        <Link key={it.href} href={it.href} onClick={() => ev("mybar_click", { state: "item" })}>{it.label.replace(/・.*/, "")}</Link>
      ))}
    </div>
  );
}

/** 自分の星・星座・干支・数の頁にだけ出る印 */
export function Mine({ kind, k }: { kind: Kind; k: string }) {
  const b = useBirth();
  if (!b) return null;
  const r = meOf(b, YEAR, NOW_YEAR());
  const hit = kind === "star" ? String(r.star) === k : kind === "sign" ? String(r.sign) === k : kind === "eto" ? String(r.eto) === k : String(r.py) === k || String(r.pyNow) === k;
  if (!hit) return null;
  const word = kind === "star" ? "あなたの本命星" : kind === "sign" ? "あなたの星座" : kind === "eto" ? "あなたの干支" : String(r.py) === k ? "あなたの2027年の数" : `あなたの${NOW_YEAR()}年の数`;
  return <p className="mine"><span>{word}です</span></p>;
}
