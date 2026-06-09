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
