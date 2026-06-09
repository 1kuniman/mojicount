"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.getAttribute("data-theme") === "dark");
    setMounted(true);
  }, []);

  const toggle = () => {
    const next = dark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* ignore */
    }
    setDark(!dark);
  };

  return (
    <button
      onClick={toggle}
      aria-label="テーマを切り替え"
      title="テーマを切り替え"
      className="flex items-center gap-1.5 shrink-0 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/[0.1] px-3 py-1.5 text-xs font-medium text-white/80 transition-colors"
    >
      <span className="text-sm leading-none">{mounted && dark ? "☀️" : "🌙"}</span>
      <span className="hidden md:inline">{mounted && dark ? "ライト" : "ダーク"}</span>
    </button>
  );
}
