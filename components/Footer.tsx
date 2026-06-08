import Link from "next/link";
import { TOOLS } from "@/lib/tools";

export default function Footer() {
  return (
    <footer className="border-t border-line mt-20 bg-paper-deep/40">
      <div className="mx-auto max-w-5xl px-5 py-10 grid gap-8 sm:grid-cols-2">
        <div>
          <div className="font-mincho text-lg font-bold text-ink">もじもじツール</div>
          <p className="mt-2 text-sm text-ink-soft leading-relaxed max-w-sm">
            文章まわりの作業を速くする無料ツール集です。入力したテキストはすべてお使いのブラウザ内だけで処理され、サーバーには送信されません。
          </p>
        </div>
        <div className="sm:justify-self-end">
          <div className="text-xs uppercase tracking-wider text-ink-faint mb-3">ツール</div>
          <ul className="space-y-2 text-sm">
            {TOOLS.map((t) => (
              <li key={t.slug}>
                <Link href={t.href} className="text-ink-soft hover:text-shu transition-colors">
                  {t.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto max-w-5xl px-5 py-4 text-xs text-ink-faint">
          © {new Date().getFullYear()} もじもじツール
        </div>
      </div>
    </footer>
  );
}
