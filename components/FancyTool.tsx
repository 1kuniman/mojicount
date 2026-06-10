"use client";
import { useMemo, useState } from "react";
import { FANCY_STYLES } from "@/lib/fancy";
import CopyButton from "@/components/CopyButton";

export default function FancyTool() {
  const [text, setText] = useState("Ikkei");
  const results = useMemo(
    () => FANCY_STYLES.map((s) => ({ ...s, out: text ? s.transform(text) : "" })),
    [text]
  );

  // 英数字が1文字も無い／日本語などが含まれるときに注意を出す
  const hasAlnum = /[A-Za-z0-9]/.test(text);
  const hasNonAlnum = /[^\sA-Za-z0-9]/.test(text);
  const showHint = text.length > 0 && (!hasAlnum || hasNonAlnum);

  return (
    <div>
      <div className="mb-3">
        <label className="text-sm font-medium text-ink-soft mb-2 block">
          テキストを入力（<span className="text-shu font-semibold">英数字</span>が変換されます）
        </label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="例: Ikkei / mojimoji123"
          className="w-full rounded-xl border border-line bg-paper px-4 py-3.5 text-[17px] text-ink outline-none focus:border-shu/60 focus:ring-2 focus:ring-shu/15"
        />
      </div>

      {showHint && (
        <div className="mb-5 flex items-start gap-2 rounded-lg border border-shu/30 bg-shu/5 px-3.5 py-2.5 text-sm text-ink-soft">
          <span className="text-shu font-semibold shrink-0">※</span>
          <span>装飾できるのは英数字です。ひらがな・漢字などはそのまま表示されます（各スタイルが同じに見えるのはこのためです）。</span>
        </div>
      )}

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
