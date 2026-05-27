import type { Service } from "@/lib/types";

function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <span className="inline-flex items-center gap-1" aria-label={`5点満点中 ${rating} 点`}>
      <span className="text-brand tracking-tight">
        {"★".repeat(full)}
        {half ? "☆" : ""}
        <span className="text-brand-light/50">
          {"☆".repeat(5 - full - (half ? 1 : 0))}
        </span>
      </span>
      <span className="text-sm font-bold text-brand-deep">{rating.toFixed(1)}</span>
    </span>
  );
}

const rankBadge: Record<number, string> = {
  1: "bg-gradient-to-br from-amber-400 to-yellow-500",
  2: "bg-gradient-to-br from-slate-300 to-slate-400",
  3: "bg-gradient-to-br from-amber-600 to-orange-700",
};

export default function RankingCard({ service }: { service: Service }) {
  return (
    <article className="relative rounded-2xl border border-brand-light/40 bg-white shadow-sm overflow-hidden">
      {/* PR表示（目立つ位置） */}
      <span className="absolute top-2 right-2 z-10 text-[10px] font-bold text-brand-deep bg-white/90 border border-brand-light/60 rounded-full px-2 py-0.5 shadow-sm">
        PR
      </span>

      <div className="flex items-center gap-3 border-b border-brand-light/20 bg-gradient-to-r from-brand-light/20 to-cream px-4 py-3">
        <span
          className={`${rankBadge[service.rank] ?? "bg-brand"} text-white font-extrabold w-10 h-10 rounded-full flex items-center justify-center shadow-sm flex-shrink-0`}
        >
          {service.rank}
        </span>
        <div className="min-w-0 pr-8">
          <h3 className="font-bold text-gray-800 truncate">{service.name}</h3>
          <p className="text-xs text-gray-500 truncate">{service.catchphrase}</p>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Stars rating={service.rating} />
          <span className="text-sm">
            <span className="text-gray-500">料金目安 </span>
            <span className="font-bold text-brand-deep">{service.priceFrom}</span>
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {service.features.map((f) => (
            <span
              key={f}
              className="text-[11px] bg-brand-light/15 text-brand-deep border border-brand-light/40 rounded-full px-2.5 py-0.5"
            >
              {f}
            </span>
          ))}
        </div>

        {/* 編集部による詳しい紹介 */}
        <p className="text-[13px] leading-7 text-gray-600">{service.description}</p>

        {/* おすすめポイント3つ */}
        <div>
          <p className="text-xs font-semibold text-brand-deep mb-2">おすすめポイント</p>
          <ul className="space-y-1.5">
            {service.pros.map((p) => (
              <li key={p} className="flex gap-2 text-sm text-gray-700 leading-6">
                <span className="text-brand flex-shrink-0">✓</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg bg-cream p-3 text-xs">
          <span className="font-semibold text-gray-600">こんな人におすすめ：</span>
          <span className="text-gray-600">{service.recommendedFor}</span>
        </div>

        {/* こんな人には向かない（正直な注意点） */}
        <div className="rounded-lg border border-amber-200 bg-amber-50/60 p-3 text-xs">
          <p className="font-semibold text-amber-700 mb-1 flex items-center gap-1">
            <span aria-hidden>⚠️</span> こんな人には向かない
          </p>
          <p className="text-gray-600 leading-6">{service.notRecommendedFor}</p>
        </div>

        {service.cons.length > 0 && (
          <p className="text-[11px] text-gray-400">
            気になる点：{service.cons.join(" / ")}
          </p>
        )}

        {/* CTA：公式サイトへのリンク（アフィリエイト承認後に広告リンクへ差し替え） */}
        <a
          href={service.url}
          target="_blank"
          rel="nofollow noopener"
          className="block w-full text-center bg-gradient-to-r from-brand to-brand-deep text-white font-bold py-3 rounded-full shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
        >
          無料カウンセリングを予約 ＋
          <span className="block text-[10px] font-normal opacity-90">
            公式サイトへ（PR）
          </span>
        </a>
      </div>
    </article>
  );
}
