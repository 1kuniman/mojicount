import Link from "next/link";
import { TOOLS } from "@/lib/tools";

export default function Header() {
  return (
    <header className="border-b border-line bg-paper/80 backdrop-blur sticky top-0 z-20">
      <div className="mx-auto max-w-5xl px-5 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="grid place-items-center w-8 h-8 rounded-[7px] bg-ink text-paper font-mincho text-lg leading-none">
            字
          </span>
          <span className="font-mincho text-xl font-bold tracking-tight text-ink">
            もじもじツール
          </span>
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          {TOOLS.map((t) => (
            <Link
              key={t.slug}
              href={t.href}
              className="px-3 py-2 rounded-md text-ink-soft hover:text-shu hover:bg-paper-deep transition-colors font-medium"
            >
              {t.short}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
