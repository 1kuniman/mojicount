// すべてブラウザ内で完結する純粋関数。サーバには一切送信しない。

/* ============================ カウント ============================ */

export interface CountResult {
  withSpaces: number;        // 空白込み（全文字 / コードポイント）
  noSpaces: number;          // 空白抜き
  noNewlines: number;        // 改行抜き
  noSpacesNoNewlines: number;// 空白・改行抜き
  lines: number;             // 行数
  nonEmptyLines: number;     // 空行を除いた行数
  paragraphs: number;        // 段落数（空行区切り）
  manuscriptPages: number;   // 原稿用紙（400字）換算
  bytesUtf8: number;
  bytesUtf16: number;
  bytesSjis: number;         // Shift-JIS 概算
  hiragana: number;
  katakana: number;
  kanji: number;
  alphabet: number;
  digit: number;
  symbolOther: number;
  space: number;
  kanjiRatio: number;        // 漢字比率（空白抜き本文に対する%）
  readingSeconds: number;    // 読了時間の目安（秒）
}

const toChars = (s: string): string[] => Array.from(s); // コードポイント単位（絵文字・サロゲート対応）

export function countText(input: string): CountResult {
  const chars = toChars(input);
  const withSpaces = chars.length;

  const noSpaces = toChars(input.replace(/[\s\u3000]/g, "")).length;
  const noNewlines = toChars(input.replace(/[\r\n]/g, "")).length;
  const noSpacesNoNewlines = toChars(input.replace(/[\s\u3000]/g, "")).length;

  const rawLines = input.length === 0 ? [] : input.split(/\r\n|\r|\n/);
  const lines = rawLines.length;
  const nonEmptyLines = rawLines.filter((l) => l.trim() !== "").length;
  const paragraphs = input.trim() === ""
    ? 0
    : input.trim().split(/(?:\r\n|\r|\n)\s*(?:\r\n|\r|\n)+/).filter((p) => p.trim() !== "").length;

  const manuscriptPages = Math.ceil(noSpacesNoNewlines / 400 * 10) / 10;

  // バイト数
  const bytesUtf8 = new TextEncoder().encode(input).length;
  const bytesUtf16 = input.length * 2; // UTF-16コードユニット * 2
  const bytesSjis = estimateSjisBytes(input);

  // 文字種
  let hiragana = 0, katakana = 0, kanji = 0, alphabet = 0, digit = 0, symbolOther = 0, space = 0;
  for (const ch of chars) {
    if (/\s|\u3000/u.test(ch)) space++;
    else if (/\p{Script=Hiragana}/u.test(ch)) hiragana++;
    else if (/\p{Script=Katakana}|[\uFF66-\uFF9D]/u.test(ch)) katakana++;
    else if (/\p{Script=Han}/u.test(ch)) kanji++;
    else if (/\p{L}/u.test(ch)) alphabet++;
    else if (/\p{Nd}/u.test(ch)) digit++;
    else symbolOther++;
  }

  const body = noSpacesNoNewlines;
  const kanjiRatio = body === 0 ? 0 : Math.round((kanji / body) * 1000) / 10;
  // 日本語の黙読 約500字/分 を目安
  const readingSeconds = Math.round((body / 500) * 60);

  return {
    withSpaces, noSpaces, noNewlines, noSpacesNoNewlines,
    lines, nonEmptyLines, paragraphs, manuscriptPages,
    bytesUtf8, bytesUtf16, bytesSjis,
    hiragana, katakana, kanji, alphabet, digit, symbolOther, space,
    kanjiRatio, readingSeconds,
  };
}

// Shift-JIS のバイト数概算: 半角(ASCII/半角カナ)=1、それ以外=2
function estimateSjisBytes(input: string): number {
  let bytes = 0;
  for (const ch of input) {
    const code = ch.codePointAt(0) ?? 0;
    if (code <= 0x7f) bytes += 1;            // ASCII
    else if (code >= 0xff61 && code <= 0xff9f) bytes += 1; // 半角カナ
    else bytes += 2;
  }
  return bytes;
}

export function formatReadingTime(seconds: number): string {
  if (seconds <= 0) return "0秒";
  if (seconds < 60) return `${seconds}秒`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return s === 0 ? `${m}分` : `${m}分${s}秒`;
}

/* ====================== SNS 文字数制限チェック ====================== */
// X は全角・CJKを2としてカウントする加重方式に近似（半角=1, 全角=2）。

export interface SnsLimit {
  name: string;
  limit: number;
  weighted: boolean; // trueなら全角=2換算
}

export const SNS_LIMITS: SnsLimit[] = [
  { name: "X（旧Twitter）", limit: 280, weighted: true },
  { name: "Instagram キャプション", limit: 2200, weighted: false },
  { name: "Threads", limit: 500, weighted: false },
  { name: "Facebook 投稿", limit: 63206, weighted: false },
  { name: "LINE 公式メッセージ", limit: 500, weighted: false },
  { name: "YouTube 概要欄", limit: 5000, weighted: false },
  { name: "メタディスクリプション目安", limit: 120, weighted: false },
];

export function weightedLength(input: string): number {
  // 半角=1, それ以外=2（Xの加重に近い概算）
  let n = 0;
  for (const ch of input) {
    const code = ch.codePointAt(0) ?? 0;
    n += code <= 0x7f || (code >= 0xff61 && code <= 0xff9f) ? 1 : 2;
  }
  return n;
}

/* ============================ 変換 ============================ */

export function fullToHalf(s: string): string {
  return s
    .replace(/[Ａ-Ｚａ-ｚ０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0))
    .replace(/　/g, " ")
    .replace(/[！-～]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0));
}

export function halfToFull(s: string): string {
  return s
    .replace(/[A-Za-z0-9]/g, (c) => String.fromCharCode(c.charCodeAt(0) + 0xfee0))
    .replace(/ /g, "　")
    .replace(/[!-~]/g, (c) => String.fromCharCode(c.charCodeAt(0) + 0xfee0));
}

export function hiraToKata(s: string): string {
  return s.replace(/[\u3041-\u3096]/g, (c) => String.fromCharCode(c.charCodeAt(0) + 0x60));
}

export function kataToHira(s: string): string {
  return s.replace(/[\u30a1-\u30f6]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0x60));
}

export function toUpper(s: string): string { return s.toUpperCase(); }
export function toLower(s: string): string { return s.toLowerCase(); }

/* ============================ 整形 ============================ */

export interface FormatOptions {
  trimLines: boolean;        // 各行の前後空白を削除
  removeEmptyLines: boolean; // 空行を削除
  dedupeLines: boolean;      // 重複行を削除
  collapseSpaces: boolean;   // 連続する空白を1つに
  sort: "none" | "asc" | "desc";
}

export function formatText(input: string, opt: FormatOptions): string {
  let lines = input.split(/\r\n|\r|\n/);

  if (opt.trimLines) lines = lines.map((l) => l.trim());
  if (opt.collapseSpaces) lines = lines.map((l) => l.replace(/[ \u3000]{2,}/g, " "));
  if (opt.removeEmptyLines) lines = lines.filter((l) => l.trim() !== "");
  if (opt.dedupeLines) {
    const seen = new Set<string>();
    lines = lines.filter((l) => (seen.has(l) ? false : (seen.add(l), true)));
  }
  if (opt.sort === "asc") lines = [...lines].sort((a, b) => a.localeCompare(b, "ja"));
  if (opt.sort === "desc") lines = [...lines].sort((a, b) => b.localeCompare(a, "ja"));

  return lines.join("\n");
}

/* ===================== エンコード / デコード ===================== */

export function encodeBase64(s: string): string {
  const bytes = new TextEncoder().encode(s);
  let bin = "";
  bytes.forEach((b) => (bin += String.fromCharCode(b)));
  return btoa(bin);
}

export function decodeBase64(s: string): string {
  const bin = atob(s.trim());
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export function encodeUrl(s: string): string {
  return encodeURIComponent(s);
}

export function decodeUrl(s: string): string {
  return decodeURIComponent(s);
}

/* ===================== データサイズ変換 ===================== */

export const SIZE_UNITS = ["B", "KB", "MB", "GB", "TB", "PB"] as const;
export type SizeUnit = (typeof SIZE_UNITS)[number];

export function toBytes(value: number, unit: SizeUnit, base: 1000 | 1024): number {
  const i = SIZE_UNITS.indexOf(unit);
  return value * Math.pow(base, i);
}

export function convertSize(
  value: number,
  unit: SizeUnit,
  base: 1000 | 1024
): Record<SizeUnit, number> {
  const bytes = toBytes(value, unit, base);
  const out = {} as Record<SizeUnit, number>;
  SIZE_UNITS.forEach((u, i) => {
    out[u] = bytes / Math.pow(base, i);
  });
  return out;
}

export function formatNumber(n: number): string {
  if (!isFinite(n)) return "-";
  if (n === 0) return "0";
  // 大きすぎ/小さすぎる桁は指数、それ以外は最大6桁の小数で整える
  if (Math.abs(n) >= 1e15 || (Math.abs(n) < 1e-6 && n !== 0)) {
    return n.toExponential(4);
  }
  const rounded = Math.round(n * 1e6) / 1e6;
  return rounded.toLocaleString("en-US", { maximumFractionDigits: 6 });
}
