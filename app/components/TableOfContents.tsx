import type { TocItem } from "@/lib/articles";

export default function TableOfContents({ items }: { items: TocItem[] }) {
  if (items.length === 0) return null;

  return (
    <nav
      aria-label="目次"
      className="rounded-2xl border border-pink-100 bg-pink-50/50 p-5 my-6"
    >
      <p className="flex items-center gap-2 font-bold text-pink-700 mb-3">
        <span>📑</span> 目次
      </p>
      <ol className="space-y-2 text-sm">
        {items.map((item, i) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="flex gap-2 text-gray-600 hover:text-pink-600 transition-colors"
            >
              <span className="text-pink-400 font-semibold flex-shrink-0">{i + 1}.</span>
              <span className="underline-offset-2 hover:underline">{item.text}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
