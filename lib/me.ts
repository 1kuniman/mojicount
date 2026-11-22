/* 誕生日から、九星・星座・干支・パーソナルイヤーを出す。
   本棚アプリ（shoka-src）と同じ計算にそろえてある。ブラウザでもサーバーでも使える純粋な関数だけを置く。 */

export type Birth = { y: number; m: number; d: number };

const digits = (n: number) => String(n).split("").reduce((a, b) => a + +b, 0);
const reduce = (n: number) => { while (n > 9) n = digits(n); return n; };

/** 九星・干支の年。立春（2月4日）より前の生まれは前の年として数える（本棚アプリの kiYear と同じ） */
export const kiYear = (y: number, m: number, d: number) => (m < 2 || (m === 2 && d < 4) ? y - 1 : y);

/** 本命星（1〜9）。本棚アプリの honmei と同じ */
export const honmei = (yy: number) => { let r = 11 - reduce(yy); if (r > 9) r -= 9; return r; };

/** 星座の番号（0=牡羊座 … 11=魚座）。from は data.json の ZOD[].from と同じ */
export const SIGN_FROM: [number, number][] = [[3, 21], [4, 20], [5, 21], [6, 22], [7, 23], [8, 23], [9, 23], [10, 24], [11, 23], [12, 22], [1, 20], [2, 19]];
export const signIndex = (m: number, d: number) => {
  const order = SIGN_FROM.map((f, i) => ({ i, v: f[0] * 100 + f[1] })).sort((a, b) => a.v - b.v);
  const x = m * 100 + d;
  let pick = order[order.length - 1].i;
  for (const o of order) if (x >= o.v) pick = o.i;
  return pick;
};

/** 十二支の番号（0=子 … 11=亥）。立春区切り */
export const etoIndex = (y: number, m: number, d: number) => (((kiYear(y, m, d) - 4) % 12) + 12) % 12;

/** パーソナルイヤー（1〜9）。本棚アプリの personalYear と同じ */
export const personalYear = (m: number, d: number, yr: number) => reduce(digits(m) + digits(d) + digits(yr));

export const validBirth = (b: Partial<Birth> | null | undefined): b is Birth => {
  if (!b || !b.y || !b.m || !b.d) return false;
  const t = new Date(b.y, b.m - 1, b.d);
  return b.y >= 1900 && b.y <= 2100 && t.getFullYear() === b.y && t.getMonth() === b.m - 1 && t.getDate() === b.d;
};

export type MeResult = { star: number; sign: number; eto: number; py: number; pyNow: number; nearRisshun: boolean; beforeRisshun: boolean; signEdge: boolean };

/** 誕生日から4つの結果をまとめて出す。year は読みたい年（2027）、nowYear は今年 */
export const meOf = (b: Birth, year: number, nowYear: number): MeResult => {
  const ky = kiYear(b.y, b.m, b.d);
  const md = b.m * 100 + b.d;
  // 星座の境目（切り替わる日と、その前日）
  const signEdge = SIGN_FROM.some(([fm, fd]) => {
    const prev = new Date(2001, fm - 1, fd - 1);
    return (b.m === fm && b.d === fd) || (b.m === prev.getMonth() + 1 && b.d === prev.getDate());
  });
  return {
    star: honmei(ky),
    sign: signIndex(b.m, b.d),
    eto: etoIndex(b.y, b.m, b.d),
    py: personalYear(b.m, b.d, year),
    pyNow: personalYear(b.m, b.d, nowYear),
    nearRisshun: md >= 203 && md <= 205,
    beforeRisshun: md < 204,
    signEdge,
  };
};
