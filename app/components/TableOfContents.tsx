import type { TocItem } from "@/lib/articles";

export default function TableOfContents({ items }: { items: TocItem[] }) {
  if (items.length === 0) return null;

  return (
    <nav
      aria-label="目次"
      className="rounded-2xl border border-brand-light/40 bg-brand-light/10 p-5 my-6"
    >
      <p className="flex items-center gap-2 font-bold text-brand-deep mb-3">
        <span>📑</span> 目次
      </p>
      <ol className="space-y-2 text-sm">
        {items.map((item, i) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="flex gap-2 text-gray-600 hover:text-brand-deep transition-colors"
            >
              <span className="text-brand font-semibold flex-shrink-0">{i + 1}.</span>
              <span className="underline-offset-2 hover:underline">{item.text}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
