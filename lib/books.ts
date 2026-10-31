import fs from "node:fs";
import path from "node:path";
import data from "@/content/data.json";

/* ---------- 本文（content/*.json）の型 ---------- */
export type Section = { h2: string; paras: string[]; list?: string[] };
export type Faq = { q: string; a: string };
export type Doc = {
  title: string;
  description: string;
  h1: string;
  lead: string;
  sections: Section[];
  faq: Faq[];
};

export type Item = {
  key: string; // 本の中のキー
  slug: string; // URL
  label: string; // 一覧での名前
  sub?: string; // 一覧での補足
  ill: string; // 挿絵キー（public/assets/ill/<ill>.webp）
};

export type Book = {
  id: string; // 本の中のID（#b-<id> で開く）
  slug: string; // URL
  title: string; // 〇の書
  art: string; // 占術名
  need: string; // 必要なもの
  q: string; // 何がわかるか
  hubIll: string;
  itemsLabel: string; // 一覧の見出し
  items: Item[];
  contentFiles: string[];
};

const D = data as any;

const nums = (arr: (string | number)[]) => arr.map(String);

export const BOOKS: Book[] = [
  {
    id: "kazu", slug: "lifepath", title: "数の書", art: "数秘術・ライフパスナンバー",
    need: "生年月日", q: "自分の本質", hubIll: "kazu-intro", itemsLabel: "ライフパスナンバー",
    items: nums([1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33]).map((k) => ({
      key: k, slug: k, label: `ライフパスナンバー${k}`, sub: D.LP[k].name, ill: `kazu-${k}`,
    })),
    contentFiles: ["kazu"],
  },
  {
    id: "en", slug: "aisho", title: "縁の書", art: "名前の数秘術・相性",
    need: "二人の名前", q: "あの人との相性", hubIll: "en-intro", itemsLabel: "二人の関係数",
    items: nums([1, 2, 3, 4, 5, 6, 7, 8, 9]).map((k) => ({
      key: k, slug: k, label: `関係数${k}`, sub: D.REL[k].name, ill: `en-${k}`,
    })),
    contentFiles: ["en"],
  },
  {
    id: "meguri", slug: "personal-year", title: "巡りの書", art: "数秘術・パーソナルイヤー",
    need: "誕生日", q: "これからの運気", hubIll: "meguri-intro", itemsLabel: "パーソナルイヤー",
    items: nums([1, 2, 3, 4, 5, 6, 7, 8, 9]).map((k) => ({
      key: k, slug: k, label: `パーソナルイヤー${k}`, sub: D.PY[k][0], ill: `meguri-${k}`,
    })),
    contentFiles: ["meguri"],
  },
  {
    id: "tsuki", slug: "tarot", title: "月の書", art: "タロット・スリーカード",
    need: "札を三枚引く", q: "今夜のメッセージ", hubIll: "tsuki-intro", itemsLabel: "大アルカナ22枚",
    items: (D.TAROT as any[]).map((t, i) => ({
      key: String(i),
      slug: ["fool", "magician", "high-priestess", "empress", "emperor", "hierophant", "lovers", "chariot", "strength", "hermit", "wheel-of-fortune", "justice", "hanged-man", "death", "temperance", "devil", "tower", "star", "moon", "sun", "judgement", "world"][i],
      label: t.jp, sub: `${D.ROMAN[i]}・${t.en}`, ill: `tarot-${i}`,
    })),
    contentFiles: ["tsuki-a", "tsuki-b"],
  },
  {
    id: "hoshi", slug: "seiza", title: "星の書", art: "西洋占星術・12星座",
    need: "誕生日", q: "生まれ星座の性格", hubIll: "hoshi-intro", itemsLabel: "12星座",
    items: (D.ZOD as any[]).map((z, i) => {
      const nx = D.ZOD[(i + 1) % 12].from as number[];
      const end = new Date(2001, nx[0] - 1, nx[1] - 1);
      return { key: z.k, slug: z.k, label: z.jp, sub: `${z.from[0]}/${z.from[1]}〜${end.getMonth() + 1}/${end.getDate()}`, ill: `hoshi-${z.k}` };
    }),
    contentFiles: ["hoshi"],
  },
  {
    id: "yume", slug: "yume", title: "夢の書", art: "夢占い",
    need: "気になるモチーフ", q: "夢が伝えること", hubIll: "yume-intro", itemsLabel: "夢のモチーフ",
    items: Object.entries(D.DREAMS as Record<string, any>).map(([k, v]) => ({
      key: k, slug: k, label: `${v.name}の夢`, sub: v.sub, ill: `yume-${k}`,
    })),
    contentFiles: ["yume"],
  },
  {
    id: "ishi", slug: "stone", title: "石の書", art: "守護石・パワーストーン",
    need: "二つの問い", q: "いまのあなたを守る石", hubIll: "ishi-intro", itemsLabel: "九つの守護石",
    items: Object.values(D.STONES as Record<string, any>).map((v) => ({
      key: v.k,
      slug: ({ rose: "rose-quartz", moon: "moonstone", rhodo: "rhodochrosite", amethyst: "amethyst", labra: "labradorite", crystal: "crystal", carnelian: "carnelian", tiger: "tigers-eye", citrine: "citrine" } as Record<string, string>)[v.k],
      label: v.jp, sub: v.en, ill: `ishi-${v.k}`,
    })),
    contentFiles: ["ishi"],
  },
  {
    id: "ki", slug: "kyusei", title: "気の書", art: "九星気学",
    need: "生まれ年", q: "本命星と今年の運勢", hubIll: "ki-intro", itemsLabel: "九つの本命星",
    items: nums([1, 2, 3, 4, 5, 6, 7, 8, 9]).map((k) => ({
      key: k,
      slug: ["", "ippaku-suisei", "jikoku-dosei", "sanpeki-mokusei", "shiroku-mokusei", "goou-dosei", "roppaku-kinsei", "shichiseki-kinsei", "happaku-dosei", "kyushi-kasei"][+k],
      label: D.KISEI[k].jp, sub: D.KISEI[k].kw, ill: `ki-${k}`,
    })),
    contentFiles: ["ki"],
  },
  {
    id: "iro", slug: "aura", title: "色の書", art: "オーラ診断",
    need: "惹かれる三色", q: "あなたのオーラの色", hubIll: "iro-intro", itemsLabel: "九つのオーラ",
    items: Object.entries(D.AURA as Record<string, any>).map(([k, v]) => ({
      key: k, slug: k, label: `${v.jp}のオーラ`, sub: v.kw, ill: `iro-${k}`,
    })),
    contentFiles: ["iro"],
  },
  {
    id: "tama", slug: "zense", title: "魂の書", art: "前世診断",
    need: "三つの問い", q: "前世のあなた", hubIll: "tama-intro", itemsLabel: "九つの前世",
    items: Object.entries(D.LIVES as Record<string, any>).map(([k, v]) => ({
      key: k, slug: k, label: v.jp, sub: v.era, ill: `tama-${k}`,
    })),
    contentFiles: ["tama"],
  },
];

export const bookBySlug = (slug: string) => BOOKS.find((b) => b.slug === slug);

/* ---------- 本文の読み込み ---------- */
type ContentFile = { hub: Doc | null; items: Record<string, Doc> };
const cache = new Map<string, { hub: Doc | null; items: Record<string, Doc> }>();

export function bookContent(b: Book) {
  if (cache.has(b.id)) return cache.get(b.id)!;
  let hub: Doc | null = null;
  const items: Record<string, Doc> = {};
  for (const f of b.contentFiles) {
    const p = path.join(process.cwd(), "content", `${f}.json`);
    if (!fs.existsSync(p)) continue;
    const c = JSON.parse(fs.readFileSync(p, "utf8")) as ContentFile;
    if (c.hub && !hub) hub = c.hub;
    Object.assign(items, c.items || {});
  }
  const v = { hub, items };
  cache.set(b.id, v);
  return v;
}

/* ---------- 画像 ---------- */
const hasPublic = (p: string) => fs.existsSync(path.join(process.cwd(), "public", p));
export const illSrc = (key: string) => (hasPublic(`assets/ill/${key}.webp`) ? `/assets/ill/${key}.webp` : null);
export const coverSrc = (b: Book) => `/assets/${b.id}-cover.jpg`;
export const ogSrc = (b: Book, item?: Item) =>
  hasPublic(`og/${b.slug}/${item ? item.slug : "index"}.jpg`) ? `/og/${b.slug}/${item ? item.slug : "index"}.jpg` : "/og/default.jpg";

export const bookPath = (b: Book) => `/${b.slug}/`;
export const itemPath = (b: Book, it: Item) => `/${b.slug}/${it.slug}/`;
export const openHref = (b: Book) => `/#b-${b.id}`;
