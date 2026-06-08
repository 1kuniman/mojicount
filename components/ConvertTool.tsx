"use client";
import { useState } from "react";
import { fullToHalf, halfToFull, hiraToKata, kataToHira, toUpper, toLower } from "@/lib/text";
import CopyButton from "@/components/CopyButton";

const OPS: { label: string; fn: (s: string) => string }[] = [
  { label: "全角 → 半角", fn: fullToHalf },
  { label: "半角 → 全角", fn: halfToFull },
  { label: "ひらがな → カタカナ", fn: hiraToKata },
  { label: "カタカナ → ひらがな", fn: kataToHira },
  { label: "英字を大文字に", fn: toUpper },
  { label: "英字を小文字に", fn: toLower },
];

export default function ConvertTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <div>
        <label className="text-sm font-medium text-ink-soft mb-2 block">変換前</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="変換したい文章を入力…"
          className="w-full h-56 rounded-xl border border-line bg-paper p-4 text-[15px] leading-relaxed text-ink resize-y outline-none focus:border-shu/60 focus:ring-2 focus:ring-shu/15"
        />
        <div className="mt-3 flex flex-wrap gap-2">
          {OPS.map((op) => (
            <button
              key={op.label}
              onClick={() => setOutput(op.fn(input))}
              disabled={!input}
              className="px-3 py-2 rounded-md text-sm font-medium border border-line bg-paper text-ink-soft hover:border-shu hover:text-shu disabled:opacity-40 transition-colors"
            >
              {op.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-ink-soft">変換後</label>
          <CopyButton text={output} />
        </div>
        <textarea
          value={output}
          readOnly
          placeholder="ここに結果が表示されます"
          className="w-full h-56 rounded-xl border border-line bg-paper-deep/40 p-4 text-[15px] leading-relaxed text-ink resize-y outline-none"
        />
        <button
          onClick={() => { setInput(output); setOutput(""); }}
          disabled={!output}
          className="mt-3 text-sm text-ink-faint hover:text-shu disabled:opacity-40 transition-colors"
        >
          ↑ 結果を入力欄に送って続けて変換
        </button>
      </div>
    </div>
  );
}
