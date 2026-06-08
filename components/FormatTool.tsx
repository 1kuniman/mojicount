"use client";
import { useMemo, useState } from "react";
import { formatText, type FormatOptions } from "@/lib/text";
import CopyButton from "@/components/CopyButton";

const CHECKS: { key: keyof Omit<FormatOptions, "sort">; label: string }[] = [
  { key: "trimLines", label: "各行の前後の空白を削除" },
  { key: "collapseSpaces", label: "連続する空白を1つにまとめる" },
  { key: "removeEmptyLines", label: "空行を削除" },
  { key: "dedupeLines", label: "重複した行を削除" },
];

export default function FormatTool() {
  const [input, setInput] = useState("");
  const [opt, setOpt] = useState<FormatOptions>({
    trimLines: true,
    collapseSpaces: false,
    removeEmptyLines: true,
    dedupeLines: false,
    sort: "none",
  });

  const output = useMemo(() => formatText(input, opt), [input, opt]);
  const inLines = input === "" ? 0 : input.split(/\r\n|\r|\n/).length;
  const outLines = output === "" ? 0 : output.split(/\n/).length;

  return (
    <div>
      <div className="rounded-xl border border-line bg-paper p-5 mb-5">
        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2.5">
          {CHECKS.map((c) => (
            <label key={c.key} className="flex items-center gap-2.5 text-sm text-ink cursor-pointer">
              <input
                type="checkbox"
                checked={opt[c.key]}
                onChange={(e) => setOpt({ ...opt, [c.key]: e.target.checked })}
                className="w-4 h-4 accent-shu"
              />
              {c.label}
            </label>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-line flex items-center gap-3 text-sm">
          <span className="text-ink-soft">行の並び替え</span>
          {(["none", "asc", "desc"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setOpt({ ...opt, sort: s })}
              className={`px-3 py-1.5 rounded-md border transition-colors ${
                opt.sort === s
                  ? "border-shu text-shu bg-shu/5 font-medium"
                  : "border-line text-ink-soft hover:border-shu/40"
              }`}
            >
              {s === "none" ? "なし" : s === "asc" ? "昇順" : "降順"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-ink-soft mb-2 block">
            入力 <span className="text-ink-faint font-mono">{inLines}行</span>
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="整形したいテキストを貼り付け…"
            className="w-full h-64 rounded-xl border border-line bg-paper p-4 text-[15px] leading-relaxed text-ink resize-y outline-none focus:border-shu/60 focus:ring-2 focus:ring-shu/15"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-ink-soft">
              結果 <span className="text-ink-faint font-mono">{outLines}行</span>
            </label>
            <CopyButton text={output} />
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="ここに整形後のテキストが表示されます"
            className="w-full h-64 rounded-xl border border-line bg-paper-deep/40 p-4 text-[15px] leading-relaxed text-ink resize-y outline-none"
          />
        </div>
      </div>
    </div>
  );
}
