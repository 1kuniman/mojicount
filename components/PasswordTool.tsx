"use client";
import { useState } from "react";
import {
  generateMany,
  generateManyPassphrase,
  bitsRandom,
  bitsPassphrase,
  strengthFromBits,
  WORDLIST_SIZE,
  type PwOptions,
  type PassphraseOptions,
} from "@/lib/password";
import CopyButton from "@/components/CopyButton";

const ACCENT = "#a23e5c";
const LEVEL_COLOR = ["#cbb6ad", "#e0653b", "#d99a2b", "#3f8a5c", "#2f7d72"];

type Mode = "random" | "passphrase";

export default function PasswordTool() {
  const [mode, setMode] = useState<Mode>("random");
  const [count, setCount] = useState(5);
  const [list, setList] = useState<string[]>([]);

  const [opt, setOpt] = useState<PwOptions>({
    length: 16, lower: true, upper: true, digits: true, symbols: true, excludeAmbiguous: false,
  });
  const [pp, setPp] = useState<PassphraseOptions>({
    words: 6, separator: "-", capitalize: true, addNumber: true,
  });

  const noType = !opt.lower && !opt.upper && !opt.digits && !opt.symbols;
  const bits = mode === "random" ? bitsRandom(opt) : bitsPassphrase(pp);
  const st = strengthFromBits(bits);

  const gen = () => {
    if (mode === "random") {
      if (noType) return;
      setList(generateMany(opt, count));
    } else {
      setList(generateManyPassphrase(pp, count));
    }
  };

  const checks: { key: keyof Omit<PwOptions, "length">; label: string }[] = [
    { key: "lower", label: "小文字 a-z" },
    { key: "upper", label: "大文字 A-Z" },
    { key: "digits", label: "数字 0-9" },
    { key: "symbols", label: "記号 !@#…" },
    { key: "excludeAmbiguous", label: "紛らわしい文字を除く (l/I/1/O/0/o)" },
  ];
  const seps = [["-", "ハイフン"], ["_", "アンダー"], [".", "ドット"], ["", "なし"]] as const;
  const tab = (m: Mode, label: string) => (
    <button
      onClick={() => { setMode(m); setList([]); }}
      className="px-4 py-2 rounded-lg text-sm font-medium border transition-colors"
      style={mode === m ? { borderColor: ACCENT, color: ACCENT, backgroundColor: "rgba(162,62,92,0.06)" } : { borderColor: "#ddd3c0", color: "#4a443c" }}
    >
      {label}
    </button>
  );

  return (
    <div className="max-w-2xl">
      <div className="flex gap-2 mb-4">
        {tab("random", "ランダム文字列")}
        {tab("passphrase", "パスフレーズ")}
      </div>

      <div className="rounded-xl border border-line bg-paper p-5">
        {mode === "random" ? (
          <>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-ink-soft">文字数</label>
              <span className="font-mono text-lg text-ink tnum">{opt.length}</span>
            </div>
            <input type="range" min={4} max={64} value={opt.length} onChange={(e) => setOpt({ ...opt, length: parseInt(e.target.value, 10) })} className="w-full mt-2" style={{ accentColor: ACCENT }} />
            <div className="mt-4 grid sm:grid-cols-2 gap-x-8 gap-y-2.5">
              {checks.map((c) => (
                <label key={c.key} className="flex items-center gap-2.5 text-sm text-ink cursor-pointer">
                  <input type="checkbox" checked={opt[c.key] as boolean} onChange={(e) => setOpt({ ...opt, [c.key]: e.target.checked })} className="w-4 h-4" style={{ accentColor: ACCENT }} />
                  {c.label}
                </label>
              ))}
            </div>
            {noType && <p className="mt-2 text-sm text-shu">文字種を1つ以上選んでください。</p>}
          </>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-ink-soft">単語数</label>
              <span className="font-mono text-lg text-ink tnum">{pp.words}</span>
            </div>
            <input type="range" min={3} max={8} value={pp.words} onChange={(e) => setPp({ ...pp, words: parseInt(e.target.value, 10) })} className="w-full mt-2" style={{ accentColor: ACCENT }} />
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
              <div className="flex items-center gap-2 text-sm text-ink-soft">
                区切り
                {seps.map(([v, lbl]) => (
                  <button key={lbl} onClick={() => setPp({ ...pp, separator: v })}
                    className="px-2.5 py-1 rounded-md border text-xs transition-colors"
                    style={pp.separator === v ? { borderColor: ACCENT, color: ACCENT, backgroundColor: "rgba(162,62,92,0.06)" } : { borderColor: "#ddd3c0", color: "#8a8275" }}>
                    {lbl}
                  </button>
                ))}
              </div>
              <label className="flex items-center gap-2 text-sm text-ink cursor-pointer">
                <input type="checkbox" checked={pp.capitalize} onChange={(e) => setPp({ ...pp, capitalize: e.target.checked })} className="w-4 h-4" style={{ accentColor: ACCENT }} />
                各単語の先頭を大文字
              </label>
              <label className="flex items-center gap-2 text-sm text-ink cursor-pointer">
                <input type="checkbox" checked={pp.addNumber} onChange={(e) => setPp({ ...pp, addNumber: e.target.checked })} className="w-4 h-4" style={{ accentColor: ACCENT }} />
                数字を加える
              </label>
            </div>
            <p className="mt-3 text-xs text-ink-faint">約{WORDLIST_SIZE}語から選びます。語数を増やすほど強くなります。</p>
          </>
        )}

        {/* 強度バー */}
        <div className="mt-5 pt-4 border-t border-line">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm text-ink-soft">強度: <span className="font-medium" style={{ color: LEVEL_COLOR[st.level] }}>{st.label}</span></span>
            <span className="text-xs text-ink-faint font-mono">約{Math.round(bits)} bit</span>
          </div>
          <div className="h-2 rounded-full bg-paper-deep overflow-hidden">
            <div className="h-full rounded-full transition-all duration-300" style={{ width: `${(st.level / 4) * 100}%`, backgroundColor: LEVEL_COLOR[st.level] }} />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-4">
          <label className="flex items-center gap-2 text-sm text-ink-soft">
            生成数
            <select value={count} onChange={(e) => setCount(parseInt(e.target.value, 10))} className="rounded-md border border-line bg-paper px-2 py-1.5 text-ink outline-none">
              {[1, 3, 5, 10].map((n) => (<option key={n} value={n}>{n}</option>))}
            </select>
          </label>
          <button onClick={gen} disabled={mode === "random" && noType} className="ml-auto px-5 py-2.5 rounded-lg font-medium text-white disabled:opacity-40 transition-opacity" style={{ backgroundColor: ACCENT }}>
            生成する
          </button>
        </div>
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
