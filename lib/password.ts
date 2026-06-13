// パスワード生成（ブラウザ内・crypto.getRandomValues を使用）

export interface PwOptions {
  length: number;
  lower: boolean;
  upper: boolean;
  digits: boolean;
  symbols: boolean;
  excludeAmbiguous: boolean;
}

const SETS = {
  lower: "abcdefghijklmnopqrstuvwxyz",
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  digits: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{};:,.?",
};

function buildPool(o: PwOptions): string {
  let lower = SETS.lower;
  let upper = SETS.upper;
  let digits = SETS.digits;
  let symbols = SETS.symbols;
  if (o.excludeAmbiguous) {
    const amb = /[lI1O0o]/g;
    lower = lower.replace(amb, "");
    upper = upper.replace(amb, "");
    digits = digits.replace(amb, "");
  }
  let pool = "";
  if (o.lower) pool += lower;
  if (o.upper) pool += upper;
  if (o.digits) pool += digits;
  if (o.symbols) pool += symbols;
  return pool;
}

export function generatePassword(o: PwOptions): string {
  const pool = buildPool(o);
  if (!pool || o.length <= 0) return "";
  const arr = new Uint32Array(o.length);
  crypto.getRandomValues(arr);
  let out = "";
  for (let i = 0; i < o.length; i++) {
    out += pool[arr[i] % pool.length];
  }
  return out;
}

export function generateMany(o: PwOptions, count: number): string[] {
  return Array.from({ length: count }, () => generatePassword(o));
}

export function strength(o: PwOptions): { label: string; level: number } {
  const pool = buildPool(o).length;
  if (!pool) return { label: "—", level: 0 };
  const bits = o.length * Math.log2(pool);
  if (bits < 40) return { label: "弱い", level: 1 };
  if (bits < 60) return { label: "普通", level: 2 };
  if (bits < 80) return { label: "強い", level: 3 };
  return { label: "非常に強い", level: 4 };
}

// ===== パスフレーズ（覚えやすい単語つなぎ） =====
export interface PassphraseOptions {
  words: number;
  separator: string;
  capitalize: boolean;
  addNumber: boolean;
}

// 覚えやすい短めの英単語（紛らわしさの少ない約120語）
const WORDS = (
  "apple river stone tiger cloud maple ocean amber pencil garden " +
  "rocket silver forest candle lemon planet bridge meadow falcon copper " +
  "violet harbor pepper sunset willow marble ginger pillow turtle cactus " +
  "anchor basket cherry dragon ember feather galaxy hammer island jacket " +
  "kettle ladder magnet needle orange parrot quartz ribbon saddle tunnel " +
  "umbrella valley walnut yellow zephyr almond bamboo coffee desert engine " +
  "flower guitar honey indigo jungle koala lantern mango noodle olive " +
  "pumpkin quiver rabbit sailor toffee velvet wagon yogurt acorn badger " +
  "cobra dolphin eagle ferret grape hazel ivory jasper kiwi lotus " +
  "mocha nectar otter peach raven sage thyme urban vanilla whale " +
  "xenon yarrow zebra breeze clover dahlia fennel hazelnut juniper lilac"
).split(/\s+/).filter(Boolean);

function randInt(max: number): number {
  const a = new Uint32Array(1);
  crypto.getRandomValues(a);
  return a[0] % max;
}

export function generatePassphrase(o: PassphraseOptions): string {
  const n = Math.max(2, Math.min(o.words, 10));
  const parts: string[] = [];
  for (let i = 0; i < n; i++) {
    let w = WORDS[randInt(WORDS.length)];
    if (o.capitalize) w = w.charAt(0).toUpperCase() + w.slice(1);
    parts.push(w);
  }
  let out = parts.join(o.separator);
  if (o.addNumber) out += o.separator + randInt(100);
  return out;
}

export function generateManyPassphrase(o: PassphraseOptions, count: number): string[] {
  return Array.from({ length: count }, () => generatePassphrase(o));
}

export function bitsRandom(o: PwOptions): number {
  const pool = buildPool(o).length;
  return pool ? o.length * Math.log2(pool) : 0;
}

export function bitsPassphrase(o: PassphraseOptions): number {
  const n = Math.max(2, Math.min(o.words, 10));
  return n * Math.log2(WORDS.length) + (o.addNumber ? Math.log2(100) : 0);
}

export function strengthFromBits(bits: number): { label: string; level: number } {
  if (bits <= 0) return { label: "—", level: 0 };
  if (bits < 40) return { label: "弱い", level: 1 };
  if (bits < 60) return { label: "普通", level: 2 };
  if (bits < 80) return { label: "強い", level: 3 };
  return { label: "非常に強い", level: 4 };
}

export const WORDLIST_SIZE = WORDS.length;
