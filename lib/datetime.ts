// 日付・時間計算（すべてローカルタイムで処理）

export interface DateDiff {
  totalDays: number;
  years: number;
  months: number;
  days: number;
  totalWeeks: number;
  remDays: number;
  totalHours: number;
}

export function parseYmd(s: string): Date | null {
  const m = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return null;
  const d = new Date(+m[1], +m[2] - 1, +m[3]);
  return isNaN(d.getTime()) ? null : d;
}

export function diffDays(a: Date, b: Date): number {
  const da = new Date(a.getFullYear(), a.getMonth(), a.getDate());
  const db = new Date(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.round((db.getTime() - da.getTime()) / 86400000);
}

// a <= b を前提に 年・月・日 の内訳を出す
function calendarDiff(a: Date, b: Date): { years: number; months: number; days: number } {
  let y = b.getFullYear() - a.getFullYear();
  let m = b.getMonth() - a.getMonth();
  let d = b.getDate() - a.getDate();
  if (d < 0) {
    m--;
    const prevMonthDays = new Date(b.getFullYear(), b.getMonth(), 0).getDate();
    d += prevMonthDays;
  }
  if (m < 0) {
    y--;
    m += 12;
  }
  return { years: y, months: m, days: d };
}

export function fullDiff(a: Date, b: Date): DateDiff {
  const lo = b < a ? b : a;
  const hi = b < a ? a : b;
  const totalDays = Math.abs(diffDays(a, b));
  const cd = calendarDiff(lo, hi);
  return {
    totalDays,
    years: cd.years,
    months: cd.months,
    days: cd.days,
    totalWeeks: Math.floor(totalDays / 7),
    remDays: totalDays % 7,
    totalHours: totalDays * 24,
  };
}

export function shiftDays(base: Date, n: number): Date {
  return new Date(base.getFullYear(), base.getMonth(), base.getDate() + n);
}

const WD = ["日", "月", "火", "水", "木", "金", "土"];
export function weekdayJa(d: Date): string {
  return WD[d.getDay()];
}

export function formatJa(d: Date): string {
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日（${weekdayJa(d)}）`;
}

const pad = (n: number) => String(n).padStart(2, "0");

export function toYmd(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function toUnix(d: Date): number {
  return Math.floor(d.getTime() / 1000);
}

export function fromUnix(sec: number): Date {
  return new Date(sec * 1000);
}

export function formatDateTime(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(
    d.getMinutes()
  )}:${pad(d.getSeconds())}（${weekdayJa(d)}）`;
}
