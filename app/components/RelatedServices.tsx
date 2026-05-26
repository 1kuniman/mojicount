import Link from "next/link";
import type { CategorySlug } from "@/lib/types";
import { getServicesByCategory, featuredTop3 } from "@/lib/services";

/** 記事末尾の「関連する施術・クリニック」枠。アフィリエイトの導線。 */
export default function RelatedServices({ category }: { category: CategorySlug }) {
  const services = getServicesByCategory(category);
  const list = (services.length ? services : featuredTop3).slice(0, 3);
  if (list.length === 0) return null;

  return (
    <section className="mt-10">
      <h2 className="font-serif text-xl font-bold text-gray-800 mb-1">関連する施術・クリニック</h2>
      <p className="text-[11px] text-gray-400 mb-4">
        ※ 編集部の比較構成例です。「無料カウンセリング予約」は提携サービスへのリンク枠（PR）として設置します。
      </p>
      <div className="space-y-3">
        {list.map((s) => (
          <div
            key={s.id}
            className="flex flex-wrap items-center gap-3 rounded-2xl border border-brand-light/40 bg-white p-4"
          >
            <div className="flex-1 min-w-[180px]">
              <p className="font-bold text-gray-800 text-sm">{s.name}</p>
              <p className="text-xs text-gray-500">{s.catchphrase}</p>
              <p className="text-xs mt-1">
                <span className="text-brand">{"★".repeat(Math.round(s.rating))}</span>
                <span className="text-gray-500 ml-1">{s.rating.toFixed(1)}</span>
                <span className="text-gray-400 ml-2">料金目安 {s.priceFrom}</span>
              </p>
            </div>
            <span
              role="note"
              className="bg-gradient-to-r from-brand to-brand-light text-white text-sm font-bold px-5 py-2.5 rounded-full shadow-sm select-none whitespace-nowrap"
            >
              無料カウンセリングを予約 ＋
            </span>
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <Link
          href="/ranking"
          className="text-sm font-medium text-brand-deep hover:text-brand"
        >
          ランキングをもっと見る →
        </Link>
      </div>
    </section>
  );
}
