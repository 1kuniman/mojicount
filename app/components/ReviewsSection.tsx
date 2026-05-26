import type { Review } from "@/lib/types";

function Stars({ rating }: { rating: number }) {
  const full = Math.round(rating);
  return (
    <span className="text-brand" aria-label={`5点満点中 ${rating} 点`}>
      {"★".repeat(full)}
      <span className="text-brand-light/50">{"★".repeat(5 - full)}</span>
    </span>
  );
}

export default function ReviewsSection({ reviews }: { reviews: Review[] }) {
  if (!reviews || reviews.length === 0) return null;

  return (
    <section className="mt-10">
      <h2 className="font-serif text-xl font-bold text-gray-800 flex items-center gap-2 mb-1">
        <span>💬</span> 読者の声
      </h2>
      <p className="text-[11px] text-gray-400 mb-4">
        ※ 以下は一般的に見られる声をまとめたイメージ例です。実在の個人の感想ではなく、効果・満足度を保証するものではありません。
      </p>
      <div className="grid sm:grid-cols-3 gap-3">
        {reviews.map((r, i) => (
          <figure key={i} className="rounded-2xl border border-brand-light/40 bg-white p-4">
            <div className="flex items-center justify-between mb-2">
              <figcaption className="text-sm font-bold text-gray-700">
                {r.nickname}
                <span className="text-xs font-normal text-gray-400 ml-1">{r.age}</span>
              </figcaption>
              <Stars rating={r.rating} />
            </div>
            <blockquote className="text-xs text-gray-600 leading-relaxed">{r.text}</blockquote>
          </figure>
        ))}
      </div>
    </section>
  );
}
