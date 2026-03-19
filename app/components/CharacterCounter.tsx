"use client";

import { useState, useCallback } from "react";

interface Stats {
  charCount: number;
  charNoSpaceCount: number;
  wordCount: number;
  lineCount: number;
  byteCount: number;
}

function calcStats(text: string): Stats {
  const charCount = text.length;
  const charNoSpaceCount = text.replace(/\s/g, "").length;

  // 単語数: 日本語は文字単位、英語はスペース区切り
  const words = text.trim() === "" ? [] : text.trim().split(/[\s\u3000]+/).filter(Boolean);
  const wordCount = words.length;

  const lineCount = text === "" ? 0 : text.split("\n").length;

  // UTF-8バイト数
  const byteCount = new TextEncoder().encode(text).length;

  return { charCount, charNoSpaceCount, wordCount, lineCount, byteCount };
}

export default function CharacterCounter() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const stats = calcStats(text);

  const handleCopy = useCallback(async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // フォールバック
      const el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [text]);

  const handleClear = useCallback(() => {
    setText("");
  }, []);

  const statCards = [
    {
      label: "文字数",
      value: stats.charCount.toLocaleString(),
      sublabel: "(スペース込み)",
      color: "bg-blue-50 border-blue-200 text-blue-700",
      valueColor: "text-blue-600",
    },
    {
      label: "文字数",
      value: stats.charNoSpaceCount.toLocaleString(),
      sublabel: "(スペース除く)",
      color: "bg-indigo-50 border-indigo-200 text-indigo-700",
      valueColor: "text-indigo-600",
    },
    {
      label: "単語数",
      value: stats.wordCount.toLocaleString(),
      sublabel: "(スペース区切り)",
      color: "bg-purple-50 border-purple-200 text-purple-700",
      valueColor: "text-purple-600",
    },
    {
      label: "行数",
      value: stats.lineCount.toLocaleString(),
      sublabel: "",
      color: "bg-green-50 border-green-200 text-green-700",
      valueColor: "text-green-600",
    },
    {
      label: "バイト数",
      value: stats.byteCount.toLocaleString(),
      sublabel: "(UTF-8)",
      color: "bg-orange-50 border-orange-200 text-orange-700",
      valueColor: "text-orange-600",
    },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* テキストエリア */}
      <div className="relative mb-4">
        <textarea
          className="w-full h-56 sm:h-72 p-4 text-base leading-relaxed border border-gray-300 rounded-xl shadow-sm resize-y focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white placeholder-gray-400 transition"
          placeholder="ここにテキストを入力してください..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          aria-label="テキスト入力エリア"
        />
      </div>

      {/* ボタン群 */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={handleCopy}
          disabled={!text}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all shadow-sm border
            ${text
              ? "bg-blue-500 hover:bg-blue-600 text-white border-blue-500 active:scale-95"
              : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
            }`}
          aria-label="テキストをコピー"
        >
          {copied ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              コピーしました！
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              テキストをコピー
            </>
          )}
        </button>

        <button
          onClick={handleClear}
          disabled={!text}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all shadow-sm border
            ${text
              ? "bg-white hover:bg-red-50 text-gray-600 hover:text-red-600 border-gray-300 hover:border-red-300 active:scale-95"
              : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
            }`}
          aria-label="テキストをクリア"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          クリア
        </button>
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {statCards.map((card, i) => (
          <div
            key={i}
            className={`border rounded-xl p-4 text-center ${card.color} transition-all`}
          >
            <div className="text-xs font-medium mb-1">{card.label}</div>
            <div className={`text-2xl sm:text-3xl font-bold tabular-nums ${card.valueColor}`}>
              {card.value}
            </div>
            {card.sublabel && (
              <div className="text-xs mt-1 opacity-70">{card.sublabel}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
