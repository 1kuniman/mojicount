"use client";
import { useState } from "react";
import { encodeBase64, decodeBase64, encodeUrl, decodeUrl } from "@/lib/text";
import CopyButton from "@/components/CopyButton";

const OPS: { label: string; fn: (s: string) => string }[] = [
  { label: "Base64 エンコード", fn: encodeBase64 },
  { label: "Base64 デコード", fn: decodeBase64 },
  { label: "URL エンコード", fn: encodeUrl },
  { label: "URL デコード", fn: decodeUrl },
];

export default function EncodeTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const run = (fn: (s: string) => string) => {
    setError("");
    try {
      setOutput(fn(input));
    } catch {
      setOutput("");
      setError("変換できませんでした。入力が正しいBase64 / URL文字列か確認してください。");
    }
  };

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <div>
        <label className="text-sm font-medium text-ink-soft mb-2 block">入力</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="エンコード / デコードしたい文字列を入力…"
          className="w-full h-56 rounded-xl border border-line bg-paper p-4 text-[15px] leading-relaxed text-ink resize-y outline-none focus:border-shu/60 focus:ring-2 focus:ring-shu/15 break-all"
        />
        <div className="mt-3 flex flex-wrap gap-2">
          {OPS.map((op) => (
            <button
              key={op.label}
              onClick={() => run(op.fn)}
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
          <label className="text-sm font-medium text-ink-soft">結果</label>
          <CopyButton text={output} />
        </div>
        <textarea
          value={output}
          readOnly
          placeholder="ここに結果が表示されます"
          className="w-full h-56 rounded-xl border border-line bg-paper-deep/40 p-4 text-[15px] leading-relaxed text-ink resize-y outline-none break-all"
        />
        {error && <p className="mt-2 text-sm text-shu">{error}</p>}
        <button
          onClick={() => { setInput(output); setOutput(""); setError(""); }}
          disabled={!output}
          className="mt-3 text-sm text-ink-faint hover:text-shu disabled:opacity-40 transition-colors"
        >
          ↑ 結果を入力欄に送って続けて変換
        </button>
      </div>
    </div>
  );
}
