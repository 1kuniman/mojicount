"use client";

import { useState } from "react";
import type { Service, ServiceGroup } from "@/lib/types";
import RankingCard from "./RankingCard";

const tabs: { key: "all" | ServiceGroup; label: string; emoji: string }[] = [
  { key: "all", label: "全体", emoji: "🌸" },
  { key: "datsumo-women", label: "医療脱毛（女性）", emoji: "✨" },
  { key: "datsumo-men", label: "男性脱毛", emoji: "🧔" },
  { key: "diet", label: "医療ダイエット・マンジャロ", emoji: "💉" },
];

const groupMeta: Record<ServiceGroup, string> = {
  "datsumo-women": "医療脱毛（女性）",
  "datsumo-men": "男性脱毛",
  diet: "医療ダイエット・マンジャロ",
};

const allGroups: ServiceGroup[] = ["datsumo-women", "datsumo-men", "diet"];

export default function RankingTabs({ services }: { services: Service[] }) {
  const [active, setActive] = useState<"all" | ServiceGroup>("all");

  const groups: ServiceGroup[] = active === "all" ? allGroups : [active];

  const byGroup = (g: ServiceGroup) =>
    services.filter((s) => s.group === g).sort((a, b) => a.rank - b.rank);

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
        {groups.map((g) => (
          <section key={g} id={g} className="scroll-mt-20">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-gray-800 mb-5">
              {groupMeta[g]}ランキング
            </h2>
            <div className="space-y-5">
              {byGroup(g).map((s) => (
                <RankingCard key={s.id} service={s} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
