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
      <div className="flex items-center gap-3 border-b border-brand-light/20 bg-gradient-to-r from-brand-light/20 to-cream px-4 py-3">
        <span
          className={`${rankBadge[service.rank] ?? "bg-brand"} text-white font-extrabold w-10 h-10 rounded-full flex items-center justify-center shadow-sm flex-shrink-0`}
        >
          {service.rank}
        </span>
        <div className="min-w-0">
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

        {service.cons.length > 0 && (
          <p className="text-[11px] text-gray-400">
            気になる点：{service.cons.join(" / ")}
          </p>
        )}

        {/* アフィリエイトCTA枠（実運用では提携先リンクに差し替え） */}
        <div
          className="block w-full text-center bg-gradient-to-r from-brand to-brand-deep text-white font-bold py-3 rounded-full shadow-sm select-none"
          role="note"
        >
          無料カウンセリングを予約 ＋
          <span className="block text-[10px] font-normal opacity-90">
            ※ ここに提携サービスのリンクを設定します
          </span>
        </div>
      </div>
    </article>
  );
}
