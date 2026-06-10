"use client";
import { useMemo, useState } from "react";
import { FANCY_STYLES } from "@/lib/fancy";
import CopyButton from "@/components/CopyButton";

export default function FancyTool() {
  const [text, setText] = useState("");
  const results = useMemo(
    () => FANCY_STYLES.map((s) => ({ ...s, out: text ? s.transform(text) : "" })),
    [text]
  );

  return (
    <div>
      <div className="mb-5">
        <label className="text-sm font-medium text-ink-soft mb-2 block">テキストを入力（英数字が変換されます）</label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="例: Ikkei / もじもじ123"
          className="w-full rounded-xl border border-line bg-paper px-4 py-3.5 text-[17px] text-ink outline-none focus:border-shu/60 focus:ring-2 focus:ring-shu/15"
        />
      </div>

      <div className="space-y-2.5">
        {results.map((s) => (
          <div
            key={s.key}
            className="flex items-center gap-3 rounded-xl border border-line bg-paper p-3.5"
          >
            <div className="min-w-0 flex-1">
              <div className="text-[11px] text-ink-faint mb-0.5">{s.name}</div>
              <div className="text-lg text-ink break-all leading-snug min-h-[1.6em]">
                {s.out || <span className="text-ink-faint text-sm">ここに変換結果が出ます</span>}
              </div>
            </div>
            <CopyButton text={s.out} />
          </div>
        ))}
      </div>
    </div>
  );
}
