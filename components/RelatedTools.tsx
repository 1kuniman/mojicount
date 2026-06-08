import Link from "next/link";
import { TOOLS } from "@/lib/tools";

export default function RelatedTools({ currentSlug }: { currentSlug: string }) {
  const others = TOOLS.filter((t) => t.slug !== currentSlug);
  return (
    <section className="mt-16 max-w-2xl">
      <h2 className="font-mincho text-xl font-bold text-ink rule-shu mb-5">ほかのツール</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {others.map((t) => (
          <Link
            key={t.slug}
            href={t.href}
            className="group relative flex items-start gap-3 rounded-xl border border-line bg-paper p-4 overflow-hidden hover:-translate-y-0.5 transition-all"
          >
            <span className="absolute inset-y-0 left-0 w-1" style={{ backgroundColor: t.accent }} />
            <span
              className="grid place-items-center w-9 h-9 rounded-md font-mincho text-base shrink-0"
              style={{ backgroundColor: t.accentSoft, color: t.accent }}
            >
              {t.mark}
            </span>
            <span className="min-w-0">
              <span className="block font-bold text-ink text-sm">{t.title}</span>
              <span className="block text-xs text-ink-soft mt-0.5 leading-relaxed">{t.subtitle}</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
