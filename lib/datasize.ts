// データサイズ変換。すべてブラウザ内で処理。
// 2進接頭辞(KiB=1024^n) と 10進接頭辞(KB=1000^n) を正しく区別。

export interface SizeUnitDef {
  key: string;
  bytes: number; // 1単位あたりのバイト数
  family: "binary" | "decimal" | "base";
}

export const UNITS: SizeUnitDef[] = [
  { key: "bit", bytes: 1 / 8, family: "base" },
  { key: "B", bytes: 1, family: "base" },
  { key: "KB", bytes: 1e3, family: "decimal" },
  { key: "MB", bytes: 1e6, family: "decimal" },
  { key: "GB", bytes: 1e9, family: "decimal" },
  { key: "TB", bytes: 1e12, family: "decimal" },
  { key: "PB", bytes: 1e15, family: "decimal" },
  { key: "KiB", bytes: 2 ** 10, family: "binary" },
  { key: "MiB", bytes: 2 ** 20, family: "binary" },
  { key: "GiB", bytes: 2 ** 30, family: "binary" },
  { key: "TiB", bytes: 2 ** 40, family: "binary" },
  { key: "PiB", bytes: 2 ** 50, family: "binary" },
];

export const UNIT_KEYS = UNITS.map((u) => u.key);

const byKey = (k: string) => UNITS.find((u) => u.key === k)!;

export function toBytes(value: number, unitKey: string): number {
  return value * byKey(unitKey).bytes;
}

export function fromBytes(bytes: number, unitKey: string): number {
  return bytes / byKey(unitKey).bytes;
}

export function convertAll(value: number, unitKey: string): Record<string, number> {
  const bytes = toBytes(value, unitKey);
  const out: Record<string, number> = {};
  for (const u of UNITS) out[u.key] = bytes / u.bytes;
  return out;
}

export function formatNum(n: number): string {
  if (!isFinite(n)) return "-";
  if (n === 0) return "0";
  const abs = Math.abs(n);
  if (abs < 1e-4 || abs >= 1e18) return n.toExponential(4);
  return n.toLocaleString("en-US", { maximumFractionDigits: 6 });
}
