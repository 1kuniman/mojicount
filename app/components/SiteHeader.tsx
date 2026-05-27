"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "ホーム" },
  { href: "/category/medical-diet", label: "医療ダイエット" },
  { href: "/category/datsumo", label: "脱毛" },
  { href: "/category/clinic", label: "美容クリニック" },
  { href: "/compare", label: "料金比較" },
  { href: "/ranking", label: "ランキング" },
  { href: "/articles", label: "記事一覧" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-cream/90 backdrop-blur border-b border-brand-light/40">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* ロゴ */}
          <Link href="/" className="flex items-center gap-2.5 group" onClick={() => setOpen(false)}>
            <span className="bg-gradient-to-br from-brand to-brand-light text-white w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-sm">
              🌸
            </span>
            <span className="leading-tight">
              <span className="block text-xl font-serif font-bold text-brand-deep group-hover:text-brand transition-colors">
                美容すすめ
              </span>
              <span className="block text-[10px] text-gray-400 tracking-widest">
                BEAUTY MEDIA
              </span>
            </span>
          </Link>

          {/* PC ナビ */}
          <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-gray-600">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative hover:text-brand-deep transition-colors after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-brand after:transition-all hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* モバイルメニューボタン */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="メニューを開く"
            aria-expanded={open}
            className="md:hidden p-2 -mr-2 text-brand-deep"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? (
                <>
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="6" y1="18" x2="18" y2="6" />
                </>
              ) : (
                <>
                  <line x1="3" y1="7" x2="21" y2="7" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="17" x2="21" y2="17" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* モバイルナビ */}
      {open && (
        <nav className="md:hidden border-t border-brand-light/40 bg-white">
          <div className="max-w-5xl mx-auto px-4 py-2 flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-3 text-sm font-medium text-gray-700 border-b border-brand-light/20 last:border-0 hover:text-brand-deep transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
