"use client";
import { useMemo, useState } from "react";
import { SIZE_UNITS, convertSize, formatNumber, type SizeUnit } from "@/lib/text";

export default function DataSizeTool() {
  const [value, setValue] = useState("1");
  const [unit, setUnit] = useState<SizeUnit>("MB");
  const [base, setBase] = useState<1000 | 1024>(1024);

  const results = useMemo(() => {
    const v = parseFloat(value);
    if (isNaN(v)) return null;
    return convertSize(v, unit, base);
  }, [value, unit, base]);

  return (
    <div className="max-w-2xl">
      <div className="rounded-xl border border-line bg-paper p-5">
        <div className="flex flex-wrap items-end gap-3">
          <div className="flex-1 min-w-[140px]">
            <label className="text-sm font-medium text-ink-soft mb-1.5 block">数値</label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full rounded-lg border border-line bg-paper px-3 py-2.5 text-lg font-mono text-ink outline-none focus:border-shu/60 focus:ring-2 focus:ring-shu/15"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-ink-soft mb-1.5 block">単位</label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value as SizeUnit)}
              className="rounded-lg border border-line bg-paper px-3 py-2.5 text-ink outline-none focus:border-shu/60"
            >
              {SIZE_UNITS.map((u) => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-line flex items-center gap-3 text-sm">
          <span className="text-ink-soft">換算方式</span>
          {([1024, 1000] as const).map((b) => (
            <button
              key={b}
              onClick={() => setBase(b)}
              className={`px-3 py-1.5 rounded-md border transition-colors ${
                base === b
                  ? "border-shu text-shu bg-shu/5 font-medium"
                  : "border-line text-ink-soft hover:border-shu/40"
              }`}
            >
              {b === 1024 ? "1KB = 1024 B（2進）" : "1KB = 1000 B（10進）"}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {results &&
          SIZE_UNITS.map((u) => (
            <div
              key={u}
              className={`rounded-lg border p-4 flex items-baseline justify-between ${
                u === unit ? "border-shu/50 bg-shu/[0.04]" : "border-line bg-paper"
              }`}
            >
              <span className="text-ink-soft font-medium">{u}</span>
              <span className="font-mono text-lg text-ink tnum break-all text-right">
                {formatNumber(results[u])}
              </span>
            </div>
          ))}
        {!results && (
          <p className="text-ink-faint text-sm">数値を入力してください。</p>
        )}
      </div>
    </div>
  );
}
