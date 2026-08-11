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

// ===== 強度チェック（既存パスワードの解析） =====
export interface PwCheckResult {
  length: number;
  hasLower: boolean;
  hasUpper: boolean;
  hasDigit: boolean;
  hasSymbol: boolean;
  bits: number;
  crackTime: string;
  warnings: string[];
}

// ごく一般的な弱いパスワード（代表例のみ・小文字化して比較）
const COMMON_PASSWORDS = [
  "password", "123456", "12345678", "123456789", "qwerty", "abc123",
  "111111", "1234567", "iloveyou", "admin", "letmein", "welcome",
  "monkey", "dragon", "password1", "qwertyuiop", "1q2w3e4r",
  "sunshine", "princess", "football", "baseball", "trustno1",
  "000000", "121212", "654321", "123123", "qazwsx", "zaq12wsx",
  "passw0rd", "master", "login", "starwars", "freedom", "whatever",
];

function hasSequential(pw: string, len = 3): boolean {
  const lower = pw.toLowerCase();
  for (let i = 0; i <= lower.length - len; i++) {
    let asc = true, desc = true;
    for (let j = 1; j < len; j++) {
      const a = lower.charCodeAt(i + j) - lower.charCodeAt(i + j - 1);
      if (a !== 1) asc = false;
      if (a !== -1) desc = false;
    }
    if (asc || desc) return true;
  }
  return false;
}

function hasRepeated(pw: string, len = 3): boolean {
  for (let i = 0; i <= pw.length - len; i++) {
    if (new Set(pw.slice(i, i + len)).size === 1) return true;
  }
  return false;
}

// 推定：オフライン高速解析（1秒間に約100億回試行）を仮定した粗い目安
function crackTimeFromBits(bits: number): string {
  if (bits <= 0) return "—";
  const guesses = Math.pow(2, bits) / 2; // 平均で半分試せば当たる
  const perSecond = 1e10;
  const seconds = guesses / perSecond;
  if (seconds < 1) return "1秒未満";
  const units: [number, string][] = [
    [60, "秒"], [60, "分"], [24, "時間"], [365, "日"], [100, "年"], [Infinity, "100年以上"],
  ];
  let v = seconds;
  for (const [div, label] of units) {
    if (label === "100年以上") return "100年以上";
    if (v < div) return `約${Math.max(1, Math.round(v))}${label}`;
    v /= div;
  }
  return "100年以上";
}

export function checkPasswordStrength(pw: string): PwCheckResult {
  const hasLower = /[a-z]/.test(pw);
  const hasUpper = /[A-Z]/.test(pw);
  const hasDigit = /[0-9]/.test(pw);
  const hasSymbol = /[^a-zA-Z0-9]/.test(pw);

  let poolSize = 0;
  if (hasLower) poolSize += 26;
  if (hasUpper) poolSize += 26;
  if (hasDigit) poolSize += 10;
  if (hasSymbol) poolSize += 33;

  const bits = pw.length > 0 && poolSize > 0 ? pw.length * Math.log2(poolSize) : 0;

  const warnings: string[] = [];
  if (pw.length > 0 && pw.length < 8) warnings.push("8文字未満は短すぎます");
  if (COMMON_PASSWORDS.includes(pw.toLowerCase())) warnings.push("非常によく使われているパスワードです");
  if (hasSequential(pw)) warnings.push("連続した文字列が含まれています（abc・123など）");
  if (hasRepeated(pw)) warnings.push("同じ文字の3連続以上が含まれています");
  if (pw.length > 0 && !hasSymbol && !hasDigit) warnings.push("文字種が英字のみです");

  return {
    length: pw.length,
    hasLower, hasUpper, hasDigit, hasSymbol,
    bits,
    crackTime: crackTimeFromBits(bits),
    warnings,
  };
}
