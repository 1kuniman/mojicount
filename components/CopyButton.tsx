"use client";
import { useState } from "react";

export default function CopyButton({ text, label = "コピー" }: { text: string; label?: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setDone(true);
          setTimeout(() => setDone(false), 1400);
        } catch {
          /* noop */
        }
      }}
      disabled={!text}
      className="px-3.5 py-2 rounded-md text-sm font-medium border border-line bg-paper hover:border-shu hover:text-shu disabled:opacity-40 disabled:hover:text-ink-soft disabled:hover:border-line transition-colors text-ink-soft"
    >
      {done ? "コピーしました" : label}
    </button>
  );
}
