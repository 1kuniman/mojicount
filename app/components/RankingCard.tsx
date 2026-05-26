import type { Service } from "@/lib/types";

function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <span className="inline-flex items-center gap-1" aria-label={`5点満点中 ${rating} 点`}>
      <span className="text-pink-400 tracking-tight">
        {"★".repeat(full)}
        {half ? "☆" : ""}
        <span className="text-pink-200">
          {"☆".repeat(5 - full - (half ? 1 : 0))}
        </span>
      </span>
      <span className="text-sm font-bold text-pink-600">{rating.toFixed(1)}</span>
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
    <article className="relative rounded-2xl border border-pink-100 bg-white shadow-sm overflow-hidden">
      <div className="flex items-center gap-3 border-b border-pink-50 bg-gradient-to-r from-pink-50 to-rose-50 px-4 py-3">
        <span
          className={`${rankBadge[service.rank] ?? "bg-pink-400"} text-white font-extrabold w-10 h-10 rounded-full flex items-center justify-center shadow-sm flex-shrink-0`}
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
            <span className="font-bold text-pink-600">{service.priceFrom}</span>
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {service.features.map((f) => (
            <span
              key={f}
              className="text-[11px] bg-pink-50 text-pink-600 border border-pink-100 rounded-full px-2.5 py-0.5"
            >
              {f}
            </span>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <div className="rounded-lg bg-pink-50/60 p-3">
            <p className="font-semibold text-pink-700 mb-1.5 text-xs">👍 ここが魅力</p>
            <ul className="space-y-1 text-gray-600 text-xs leading-relaxed">
              {service.pros.map((p) => (
                <li key={p} className="flex gap-1.5">
                  <span className="text-pink-400">・</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg bg-gray-50 p-3">
            <p className="font-semibold text-gray-600 mb-1.5 text-xs">🤔 注意したい点</p>
            <ul className="space-y-1 text-gray-600 text-xs leading-relaxed">
              {service.cons.map((c) => (
                <li key={c} className="flex gap-1.5">
                  <span className="text-gray-400">・</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-xs text-gray-500">
          <span className="font-semibold text-gray-600">こんな人におすすめ：</span>
          {service.recommendedFor}
        </p>

        {/* アフィリエイトCTA枠（実運用では提携先リンクに差し替え） */}
        <div
          className="block w-full text-center bg-gradient-to-r from-pink-400 to-rose-400 text-white font-bold py-3 rounded-xl shadow-sm select-none"
          role="note"
        >
          公式サイトで詳しく見る ＋
          <span className="block text-[10px] font-normal opacity-90">
            ※ ここに提携サービスのリンクを設定します
          </span>
        </div>
      </div>
    </article>
  );
}
