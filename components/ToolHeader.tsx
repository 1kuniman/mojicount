import { TOOLS } from "@/lib/tools";

export default function ToolHeader({ slug, lead }: { slug: string; lead: string }) {
  const t = TOOLS.find((x) => x.slug === slug);
  if (!t) return null;
  return (
    <header className="mb-8">
      <span
        className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full mb-3"
        style={{ backgroundColor: t.accentSoft, color: t.accent }}
      >
        <span className="font-mincho">{t.mark}</span>
        ツール
      </span>
      <h1 className="font-mincho text-3xl sm:text-4xl font-bold text-ink">{t.title}</h1>
      <div className="h-1 w-16 rounded mt-3" style={{ backgroundColor: t.accent }} />
      <p className="mt-5 text-ink-soft leading-relaxed max-w-2xl">{lead}</p>
    </header>
  );
}
