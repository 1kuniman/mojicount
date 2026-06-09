"use client";
import { useState } from "react";
import { generateMany, strength, type PwOptions } from "@/lib/password";
import CopyButton from "@/components/CopyButton";

const ACCENT = "#a23e5c";

export default function PasswordTool() {
  const [opt, setOpt] = useState<PwOptions>({
    length: 16,
    lower: true,
    upper: true,
    digits: true,
    symbols: true,
    excludeAmbiguous: false,
  });
  const [count, setCount] = useState(5);
  const [list, setList] = useState<string[]>([]);

  const st = strength(opt);
  const noType = !opt.lower && !opt.upper && !opt.digits && !opt.symbols;

  const gen = () => setList(generateMany(opt, count));

  const checks: { key: keyof Omit<PwOptions, "length">; label: string }[] = [
    { key: "lower", label: "小文字 a-z" },
    { key: "upper", label: "大文字 A-Z" },
    { key: "digits", label: "数字 0-9" },
    { key: "symbols", label: "記号 !@#…" },
    { key: "excludeAmbiguous", label: "紛らわしい文字を除く (l/I/1/O/0/o)" },
  ];

  return (
    <div className="max-w-2xl">
      <div className="rounded-xl border border-line bg-paper p-5">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-ink-soft">文字数</label>
          <span className="font-mono text-lg text-ink tnum">{opt.length}</span>
        </div>
        <input
          type="range"
          min={4}
          max={64}
          value={opt.length}
          onChange={(e) => setOpt({ ...opt, length: parseInt(e.target.value, 10) })}
          className="w-full mt-2 accent-[#a23e5c]"
        />

        <div className="mt-4 grid sm:grid-cols-2 gap-x-8 gap-y-2.5">
          {checks.map((c) => (
            <label key={c.key} className="flex items-center gap-2.5 text-sm text-ink cursor-pointer">
              <input
                type="checkbox"
                checked={opt[c.key] as boolean}
                onChange={(e) => setOpt({ ...opt, [c.key]: e.target.checked })}
                className="w-4 h-4"
                style={{ accentColor: ACCENT }}
              />
              {c.label}
            </label>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-line flex flex-wrap items-center gap-4">
          <label className="flex items-center gap-2 text-sm text-ink-soft">
            生成数
            <select
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value, 10))}
              className="rounded-md border border-line bg-paper px-2 py-1.5 text-ink outline-none"
            >
              {[1, 3, 5, 10].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </label>
          <span className="text-sm text-ink-soft">
            強度: <span style={{ color: ACCENT }} className="font-medium">{st.label}</span>
          </span>
          <button
            onClick={gen}
            disabled={noType}
            className="ml-auto px-5 py-2.5 rounded-lg font-medium text-white disabled:opacity-40 transition-opacity"
            style={{ backgroundColor: ACCENT }}
          >
            生成する
          </button>
        </div>
        {noType && <p className="mt-2 text-sm text-shu">文字種を1つ以上選んでください。</p>}
      </div>

      {list.length > 0 && (
        <div className="mt-5 space-y-2">
          {list.map((pw, i) => (
            <div key={i} className="flex items-center gap-3 rounded-lg border border-line bg-paper p-3">
              <code className="flex-1 font-mono text-ink break-all">{pw}</code>
              <CopyButton text={pw} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
