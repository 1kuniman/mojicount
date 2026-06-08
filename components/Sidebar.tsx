"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TOOLS } from "@/lib/tools";

const norm = (p: string) => p.replace(/\/+$/, "") || "/";

export default function Sidebar() {
  const current = norm(usePathname() || "/");

  return (
    <aside className="bg-[#17130e] text-paper md:w-[260px] md:shrink-0 md:sticky md:top-0 md:h-screen">
      <div className="flex flex-col h-full">
        {/* ブランド */}
        <Link
          href="/"
          className="flex items-center gap-2.5 px-5 h-16 shrink-0 border-b border-white/10 hover:bg-white/[0.03] transition-colors"
        >
          <span className="grid place-items-center w-8 h-8 rounded-[7px] bg-shu text-white font-mincho text-lg leading-none">
            字
          </span>
          <span className="font-mincho text-lg font-bold tracking-tight">もじもじツール</span>
        </Link>

        {/* ナビ（モバイルは横スクロール / デスクトップは縦） */}
        <nav className="flex md:flex-col gap-1 p-3 overflow-x-auto md:overflow-visible">
          <span className="hidden md:block text-[11px] uppercase tracking-wider text-paper/35 px-3 pt-1 pb-1">
            ツール
          </span>
          {TOOLS.map((t) => {
            const active = current === norm(t.href);
            return (
              <Link
                key={t.slug}
                href={t.href}
                className="group relative shrink-0 rounded-lg px-3 py-2.5 flex items-center gap-3 transition-colors hover:bg-white/[0.05]"
                style={active ? { backgroundColor: "rgba(255,255,255,0.08)" } : undefined}
              >
                {active && (
                  <span
                    className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r"
                    style={{ backgroundColor: t.accent }}
                  />
                )}
                <span
                  className="grid place-items-center w-9 h-9 rounded-md font-mincho text-base shrink-0 transition-colors"
                  style={{
                    backgroundColor: active ? t.accent : "rgba(255,255,255,0.08)",
                    color: active ? "#fff" : "rgba(247,243,234,0.85)",
                  }}
                >
                  {t.mark}
                </span>
                <span className="min-w-0">
                  <span
                    className="block text-sm font-medium leading-tight whitespace-nowrap"
                    style={{ color: active ? "#fff" : "rgba(247,243,234,0.92)" }}
                  >
                    {t.title}
                  </span>
                  <span className="hidden md:block text-[11px] leading-tight mt-0.5 text-paper/45">
                    {t.subtitle}
                  </span>
                </span>
              </Link>
            );
          })}
        </nav>

        {/* 下部の注記（デスクトップのみ） */}
        <div className="hidden md:block mt-auto p-5 text-[11px] text-paper/40 leading-relaxed border-t border-white/10">
          入力した文章はすべてブラウザ内で処理され、サーバーに送信されません。
        </div>
      </div>
    </aside>
  );
}
