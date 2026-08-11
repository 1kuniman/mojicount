"use client";
import { useMemo, useState } from "react";
import { checkPasswordStrength } from "@/lib/password";

const LEVEL_COLOR = ["#cbb6ad", "#e0653b", "#d99a2b", "#3f8a5c", "#2f7d72"];

function levelFromBits(bits: number): number {
  if (bits <= 0) return 0;
  if (bits < 40) return 1;
  if (bits < 60) return 2;
  if (bits < 80) return 3;
  return 4;
}
const LABELS = ["—", "弱い", "普通", "強い", "非常に強い"];

export default function PasswordChecker() {
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const r = useMemo(() => checkPasswordStrength(pw), [pw]);
  const level = levelFromBits(r.bits);

  const chip = (label: string, ok: boolean) => (
    <span
      className={`px-2.5 py-1 rounded-md text-xs font-medium border ${
        ok ? "border-shu/40 text-shu bg-shu/5" : "border-line text-ink-faint"
      }`}
    >
      {label}
    </span>
  );

  return (
    <div className="rounded-xl border border-line bg-paper p-5">
      <label className="text-sm font-medium text-ink-soft mb-2 block">
        今使っているパスワードを確認
      </label>
      <div className="flex gap-2">
        <input
          type={show ? "text" : "password"}
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          placeholder="ここに貼り付け／入力"
          autoComplete="off"
          className="flex-1 rounded-lg border border-line bg-paper px-3 py-2.5 font-mono text-ink outline-none focus:border-shu/60 focus:ring-2 focus:ring-shu/15"
        />
        <button
          onClick={() => setShow((s) => !s)}
          className="px-3 py-2 rounded-lg border border-line text-sm text-ink-soft hover:border-shu hover:text-shu transition-colors shrink-0"
        >
          {show ? "隠す" : "表示"}
        </button>
      </div>
      <p className="mt-2 text-xs text-ink-faint">
        入力内容はブラウザ内だけで判定され、送信・保存は一切されません。
      </p>

      {pw.length > 0 && (
        <div className="mt-5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm text-ink-soft">
              強度: <span className="font-medium" style={{ color: LEVEL_COLOR[level] }}>{LABELS[level]}</span>
            </span>
            <span className="text-xs text-ink-faint font-mono">約{Math.round(r.bits)} bit</span>
          </div>
          <div className="h-2 rounded-full bg-paper-deep overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{ width: `${(level / 4) * 100}%`, backgroundColor: LEVEL_COLOR[level] }}
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {chip(`${r.length}文字`, true)}
            {chip("小文字", r.hasLower)}
            {chip("大文字", r.hasUpper)}
            {chip("数字", r.hasDigit)}
            {chip("記号", r.hasSymbol)}
          </div>

          <div className="mt-4 rounded-lg border border-line bg-paper-deep/40 p-3.5">
            <div className="text-xs text-ink-faint">オフライン解析での突破目安（あくまで概算）</div>
            <div className="mt-1 font-mono text-lg text-ink">{r.crackTime}</div>
          </div>

          {r.warnings.length > 0 ? (
            <ul className="mt-4 space-y-1.5">
              {r.warnings.map((w) => (
                <li key={w} className="flex items-start gap-2 text-sm text-shu">
                  <span className="shrink-0">・</span>
                  {w}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm text-ink-soft">分かりやすい弱点は見つかりませんでした。</p>
          )}
        </div>
      )}
    </div>
  );
}
