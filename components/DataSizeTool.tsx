"use client";
import { useMemo, useState } from "react";
import { UNITS, UNIT_KEYS, convertAll, formatNum } from "@/lib/datasize";
import CopyButton from "@/components/CopyButton";

export default function DataSizeTool() {
  const [value, setValue] = useState("1");
  const [unit, setUnit] = useState("GiB");

  const results = useMemo(() => {
    const v = parseFloat(value);
    if (isNaN(v)) return null;
    return convertAll(v, unit);
  }, [value, unit]);

  const decimal = UNITS.filter((u) => u.family === "decimal");
  const binary = UNITS.filter((u) => u.family === "binary");

  const Row = ({ k }: { k: string }) => (
    <div
      className={`flex items-center gap-2 rounded-lg border p-3 ${
        k === unit ? "border-shu/50 bg-shu/[0.04]" : "border-line bg-paper"
      }`}
    >
      <span className="text-ink-soft font-medium w-12 shrink-0">{k}</span>
      <span className="flex-1 font-mono text-ink tnum break-all text-right">
        {results ? formatNum(results[k]) : "-"}
      </span>
      <CopyButton text={results ? String(results[k]) : ""} label="コピー" />
    </div>
  );

  return (
    <div>
      <div className="rounded-xl border border-line bg-paper p-5 max-w-2xl">
        <div className="flex flex-wrap items-end gap-3">
          <div className="flex-1 min-w-[160px]">
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
              onChange={(e) => setUnit(e.target.value)}
              className="rounded-lg border border-line bg-paper px-3 py-2.5 text-ink outline-none focus:border-shu/60"
            >
              {UNIT_KEYS.map((u) => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>
        </div>
        <p className="mt-3 text-xs text-ink-faint">
          2進（KiB=1024B 系）と10進（KB=1000B 系）を正しく区別して同時換算します。
        </p>
      </div>

      {results && (
        <div className="mt-5 grid gap-5 lg:grid-cols-2 max-w-3xl">
          <div>
            <h2 className="font-mincho text-lg font-bold text-ink rule-shu mb-3">10進（KB・MB・GB…）</h2>
            <div className="space-y-2">
              <Row k="B" />
              {decimal.map((u) => <Row key={u.key} k={u.key} />)}
            </div>
          </div>
          <div>
            <h2 className="font-mincho text-lg font-bold text-ink rule-shu mb-3">2進（KiB・MiB・GiB…）</h2>
            <div className="space-y-2">
              <Row k="bit" />
              {binary.map((u) => <Row key={u.key} k={u.key} />)}
            </div>
          </div>
        </div>
      )}
      {!results && <p className="mt-5 text-ink-faint text-sm">数値を入力してください。</p>}
    </div>
  );
}
