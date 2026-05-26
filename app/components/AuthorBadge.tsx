import { getAuthor } from "@/lib/authors";

/** 記事のメタ情報に表示する著者バッジ */
export function AuthorBadge({ id }: { id?: string }) {
  const a = getAuthor(id);
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="w-6 h-6 rounded-full bg-brand-light/40 flex items-center justify-center text-xs">
        {a.emoji}
      </span>
      <span className="text-gray-600">
        {a.name}
        <span className="text-gray-400 ml-1">／{a.role}</span>
      </span>
    </span>
  );
}

/** 記事末尾や運営者ページに表示する著者カード */
export function AuthorCard({ id }: { id?: string }) {
  const a = getAuthor(id);
  return (
    <div className="flex gap-4 rounded-2xl border border-brand-light/40 bg-white p-5">
      <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-brand to-brand-light flex items-center justify-center text-2xl shadow-sm">
        {a.emoji}
      </div>
      <div className="min-w-0">
        <div className="flex items-baseline gap-2">
          <p className="font-bold text-gray-800">{a.name}</p>
          <span className="text-xs text-brand-deep bg-brand-light/30 rounded-full px-2 py-0.5">
            {a.role}
          </span>
        </div>
        <p className="mt-1.5 text-xs text-gray-600 leading-relaxed">{a.bio}</p>
      </div>
    </div>
  );
}
