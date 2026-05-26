"use client";

import { useState } from "react";
import type { CategorySlug, Service } from "@/lib/types";
import RankingCard from "./RankingCard";

const tabs: { key: "all" | CategorySlug; label: string; emoji: string }[] = [
  { key: "all", label: "全体", emoji: "🌸" },
  { key: "medical-diet", label: "ダイエット", emoji: "💉" },
  { key: "datsumo", label: "脱毛", emoji: "✨" },
  { key: "clinic", label: "美容クリニック", emoji: "🌷" },
];

const groupMeta: Record<CategorySlug, string> = {
  "medical-diet": "医療ダイエット",
  datsumo: "脱毛",
  clinic: "美容クリニック",
  guide: "ガイド",
};

export default function RankingTabs({ services }: { services: Service[] }) {
  const [active, setActive] = useState<"all" | CategorySlug>("all");

  const groups: CategorySlug[] =
    active === "all" ? ["medical-diet", "datsumo", "clinic"] : [active];

  const byCategory = (cat: CategorySlug) =>
    services.filter((s) => s.category === cat).sort((a, b) => a.rank - b.rank);

  return (
    <div>
      {/* タブ */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setActive(t.key)}
            className={`text-sm font-medium rounded-full px-4 py-2 transition-colors border ${
              active === t.key
                ? "bg-gradient-to-r from-brand to-brand-deep text-white border-transparent shadow-sm"
                : "bg-white text-brand-deep border-brand-light hover:bg-cream"
            }`}
          >
            {t.emoji} {t.label}
          </button>
        ))}
      </div>

      <div className="space-y-12">
        {groups.map((cat) => (
          <section key={cat} id={cat} className="scroll-mt-20">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-gray-800 mb-5">
              {groupMeta[cat]}ランキング
            </h2>
            <div className="space-y-5">
              {byCategory(cat).map((s) => (
                <RankingCard key={s.id} service={s} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
