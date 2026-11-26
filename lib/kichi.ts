import doc from "@/content/y2027-kichijitsu.json";
import koyomi from "@/content/koyomi-2027.json";
import type { Doc } from "@/lib/books";
import type { Lucky } from "@/lib/lucky";

/* 2027年の吉日（/2027/kichijitsu/ 以下）。本文は scripts/gen-kichijitsu.py、暦は scripts/gen-koyomi.py で作る */
export const K_PATH = "/2027/kichijitsu/";
export const K_PUBLISHED = "2026-11-26";
export type KDay = { d: string; w: string; ks: string; t: string[] };
export const K_DAYS = (koyomi as { days: KDay[] }).days;
export const K_TAGS: { id: string; name: string }[] = [
  { id: "tensha", name: "天赦日" },
  { id: "manbai", name: "一粒万倍日" },
  { id: "tora", name: "寅の日" },
  { id: "mi", name: "巳の日" },
  { id: "tsuchinotomi", name: "己巳の日" },
  { id: "kinoene", name: "甲子の日" },
];
export type KItem = { slug: string; label: string; sub: string; mark: string; lucky: Lucky[]; affHead: string; affNote: string };
const WALLET: Lucky[] = [
  { n: "本革の長財布", kw: "長財布 本革", why: "お札を折らずにしまえる形。吉日に使い始める一本に。" },
  { n: "がま口の財布", kw: "がま口 財布 本革", why: "口が大きく開いて、中身がひと目で見える。" },
  { n: "2027年の手帳", kw: "手帳 2027 1月始まり", why: "この頁の吉日を、先に書きこんでおくために。" },
];
const START: Lucky[] = [
  { n: "2027年の手帳", kw: "手帳 2027 1月始まり", why: "この頁の吉日を、先に書きこんでおくために。" },
  { n: "本革の長財布", kw: "長財布 本革", why: "吉日に新調するものとして、いちばん選ばれる持ちもの。" },
  { n: "家計簿ノート", kw: "家計簿 2027", why: "始めごとの日に、お金の記録も始めてみる。" },
];
const AFF_DAY = "入籍や開業、引っ越しの日取りは、生年月日もあわせて占い師にじかにみてもらう方法もあります。";
export const K_ITEMS: KItem[] = [
  { slug: "tenshabi", label: "天赦日", sub: "最上の吉日・全6日", mark: "赦", lucky: START, affHead: "大切な日取りを、ひとりで決めきれないときは", affNote: AFF_DAY },
  { slug: "ichiryumanbaibi", label: "一粒万倍日", sub: "始めごとの日・全60日", mark: "粒", lucky: START, affHead: "何を始めるか、迷っているなら", affNote: "転職や開業、結婚など、始めどきに迷うことは、占い師に生年月日からじかにみてもらう方法もあります。" },
  { slug: "tora-no-hi", label: "寅の日", sub: "お金が戻る日・全30日", mark: "寅", lucky: WALLET, affHead: "お金や仕事の流れを、じかにみてもらうなら", affNote: "金運や仕事運の流れは、占い師に生年月日からじかにみてもらう方法もあります。" },
  { slug: "mi-no-hi", label: "巳の日・己巳の日", sub: "弁財天の縁日・全31日", mark: "巳", lucky: WALLET, affHead: "お金や仕事の流れを、じかにみてもらうなら", affNote: "金運や仕事運の流れは、占い師に生年月日からじかにみてもらう方法もあります。" },
  { slug: "saifu", label: "財布を買う日・使い始める日", sub: "春財布・吉日の重なり", mark: "財", lucky: [WALLET[0], WALLET[1], { n: "二つ折りの財布", kw: "二つ折り財布 本革", why: "小さなかばんにも収まる、ふだん使いの形。" }], affHead: "2027年の金運を、じかにみてもらうなら", affNote: "金運の流れや、仕事の変えどきは、占い師に生年月日からじかにみてもらう方法もあります。" },
  { slug: "takarakuji", label: "宝くじを買う日", sub: "吉日の重なり一覧", mark: "籤", lucky: [{ n: "宝くじ入れ", kw: "宝くじ入れ 黄色", why: "買ったくじを、抽せんの日までなくさずしまっておく。" }, WALLET[0], START[0]], affHead: "2027年の金運を、じかにみてもらうなら", affNote: "金運の流れは、占い師に生年月日からじかにみてもらう方法もあります。" },
];
const C = doc as unknown as { hub: Doc; items: Record<string, Doc> };
export const kHub = () => C.hub;
export const kDoc = (slug: string) => C.items[slug];
export const kPath = (it: KItem) => `${K_PATH}${it.slug}/`;
/** 何かの吉日にあたる日だけ（画面に渡す用） */
export const kTagged = () => K_DAYS.filter((x) => x.t.length).map((x) => ({ d: x.d, w: x.w, t: x.t }));
