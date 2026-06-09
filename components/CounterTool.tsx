"use client";
import { useMemo, useState } from "react";
import {
  countText,
  formatReadingTime,
  SNS_LIMITS,
  weightedLength,
} from "@/lib/text";

function Stat({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="rounded-lg border border-line bg-paper p-4">
      <div className="text-xs text-ink-faint">{label}</div>
      <div className="mt-1 font-mono text-2xl font-semibold text-ink tnum">{value}</div>
      {sub && <div className="text-[11px] text-ink-faint mt-0.5">{sub}</div>}
    </div>
  );
}

const SAMPLE =
  "ここに文章を貼り付けると、文字数や行数、原稿用紙の枚数などが自動で表示されます。\n\nすべてブラウザの中だけで処理するので、下書きや原稿を安心して入力できます。";

export default function CounterTool() {
  const [text, setText] = useState("");
  const r = useMemo(() => countText(text), [text]);
  const wlen = useMemo(() => weightedLength(text), [text]);

  return (
    <div>
      <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
        {/* Input */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-ink-soft">テキストを入力</label>
            <div className="flex gap-2">
              <button
                onClick={() => setText(SAMPLE)}
                className="text-xs text-ink-faint hover:text-shu transition-colors"
              >
                サンプル
              </button>
              <button
                onClick={() => setText("")}
                className="text-xs text-ink-faint hover:text-shu transition-colors"
              >
                クリア
              </button>
            </div>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="ここに文章を貼り付け / 入力してください…"
            className="w-full h-[340px] rounded-xl border border-line bg-paper p-4 text-[15px] leading-relaxed text-ink resize-y outline-none focus:border-shu/60 focus:ring-2 focus:ring-shu/15"
          />
        </div>

        {/* Primary stats */}
        <div className="grid grid-cols-2 gap-3 content-start">
          <div className="col-span-2 rounded-xl border-2 border-panel-strong bg-panel-strong text-on-strong p-5">
            <div className="text-xs text-on-strong/70">文字数（空白込み）</div>
            <div className="font-mono text-5xl font-bold tnum mt-1">{r.withSpaces.toLocaleString()}</div>
          </div>
          <Stat label="空白抜き" value={r.noSpaces.toLocaleString()} />
          <Stat label="改行抜き" value={r.noNewlines.toLocaleString()} />
          <Stat label="行数" value={r.lines.toLocaleString()} sub={`空行除く ${r.nonEmptyLines}`} />
          <Stat label="段落数" value={r.paragraphs.toLocaleString()} />
          <Stat label="原稿用紙" value={r.manuscriptPages} sub="枚（400字）" />
          <Stat label="読了時間" value={formatReadingTime(r.readingSeconds)} sub="約500字/分" />
        </div>
      </div>

      {/* Secondary detail */}
      <div className="grid gap-5 md:grid-cols-3 mt-5">
        {/* 文字種 */}
        <div className="rounded-xl border border-line bg-paper p-5">
          <h3 className="font-medium text-ink mb-3 text-sm">文字種別</h3>
          <ul className="space-y-1.5 text-sm">
            {[
              ["ひらがな", r.hiragana],
              ["カタカナ", r.katakana],
              ["漢字", r.kanji],
              ["英字", r.alphabet],
              ["数字", r.digit],
              ["記号・その他", r.symbolOther],
              ["空白", r.space],
            ].map(([k, v]) => (
              <li key={k as string} className="flex justify-between">
                <span className="text-ink-soft">{k}</span>
                <span className="font-mono tnum text-ink">{(v as number).toLocaleString()}</span>
              </li>
            ))}
            <li className="flex justify-between pt-2 mt-1 border-t border-line">
              <span className="text-ink-soft">漢字比率</span>
              <span className="font-mono tnum text-shu">{r.kanjiRatio}%</span>
            </li>
          </ul>
        </div>

        {/* バイト数 */}
        <div className="rounded-xl border border-line bg-paper p-5">
          <h3 className="font-medium text-ink mb-3 text-sm">バイト数</h3>
          <ul className="space-y-1.5 text-sm">
            <li className="flex justify-between">
              <span className="text-ink-soft">UTF-8</span>
              <span className="font-mono tnum text-ink">{r.bytesUtf8.toLocaleString()}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-ink-soft">UTF-16</span>
              <span className="font-mono tnum text-ink">{r.bytesUtf16.toLocaleString()}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-ink-soft">Shift-JIS（概算）</span>
              <span className="font-mono tnum text-ink">{r.bytesSjis.toLocaleString()}</span>
            </li>
          </ul>
          <p className="text-[11px] text-ink-faint mt-3 leading-relaxed">
            Shift-JIS は半角=1・全角=2 による概算値です。
          </p>
        </div>

        {/* SNS */}
        <div className="rounded-xl border border-line bg-paper p-5">
          <h3 className="font-medium text-ink mb-3 text-sm">SNS文字数チェック</h3>
          <ul className="space-y-1.5 text-sm">
            {SNS_LIMITS.map((s) => {
              const used = s.weighted ? wlen : r.withSpaces;
              const remain = s.limit - used;
              return (
                <li key={s.name} className="flex justify-between gap-2">
                  <span className="text-ink-soft truncate">{s.name}</span>
                  <span className={`font-mono tnum ${remain < 0 ? "text-shu font-semibold" : "text-ink"}`}>
                    {remain >= 0 ? `残り${remain.toLocaleString()}` : `${Math.abs(remain).toLocaleString()}超過`}
                  </span>
                </li>
              );
            })}
          </ul>
          <p className="text-[11px] text-ink-faint mt-3 leading-relaxed">
            X は全角=2・半角=1 の加重で概算。各上限は目安です。
          </p>
        </div>
      </div>
    </div>
  );
}
