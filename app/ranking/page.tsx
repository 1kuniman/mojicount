import type { Metadata } from "next";
import { services } from "@/lib/services";
import RankingTabs from "../components/RankingTabs";
import AdSpace from "../components/AdSpace";
import MedicalDisclaimer from "../components/MedicalDisclaimer";

export const metadata: Metadata = {
  title: "美容医療おすすめランキング2026年",
  description:
    "医療ダイエット・脱毛・美容クリニックのおすすめランキングを編集部の比較基準でカテゴリ別に紹介。星評価・おすすめポイント・料金の目安・こんな人におすすめをまとめ、後悔しないサービス選びをサポートします。",
  alternates: { canonical: "/ranking" },
};

export default function RankingPage() {
  return (
    <main className="flex-1">
      {/* ヘッダー */}
      <section className="text-center px-4 pt-12 pb-10 bg-gradient-to-b from-brand-light/25 to-transparent">
        <p className="inline-block text-xs font-semibold text-brand-deep bg-white/80 rounded-full px-3 py-1 mb-4 shadow-sm">
          2026年 最新版
        </p>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-gray-800">
          美容医療 おすすめランキング
        </h1>
        <p className="mt-3 text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed">
          医療ダイエット・脱毛・美容クリニックを、星評価・料金・サポートなど編集部の比較基準でランキング。
          カテゴリタブから、目的に合ったサービスを探せます。
        </p>
      </section>

      <div className="max-w-3xl mx-auto px-4 pb-16 space-y-10">
        {/* PR表示（目立つ位置） */}
        <p className="text-xs text-gray-500 bg-brand-light/15 border border-brand-light/40 rounded-full px-4 py-2 text-center">
          ＜PR＞本ページにはアフィリエイト広告（プロモーション）が含まれます。「無料カウンセリングを予約」「公式サイトへ」は各クリニック公式サイトへのリンクです。
        </p>

        {/* 編集部の選定基準 */}
        <section className="rounded-2xl border-2 border-brand/30 bg-white p-5 sm:p-6">
          <h2 className="font-serif text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
            <span aria-hidden>🔍</span> 編集部の選定基準
          </h2>
          <p className="text-sm text-gray-700 leading-7">
            当サイトでは編集部が各クリニックの公式サイト・口コミサイト・カウンセリング内容を調査し、料金・実績・口コミ・アクセスのしやすさを基準に評価しています。
            メリットだけでなく、注意点や「向かない人」もできるだけ正直に記載することを心がけています。
          </p>
          <dl className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-cream border border-brand-light/30 px-4 py-3">
              <dt className="text-xs font-semibold text-brand-deep">調査期間</dt>
              <dd className="text-sm text-gray-700 mt-0.5">2025年1月〜2026年5月</dd>
            </div>
            <div className="rounded-xl bg-cream border border-brand-light/30 px-4 py-3">
              <dt className="text-xs font-semibold text-brand-deep">調査対象</dt>
              <dd className="text-sm text-gray-700 mt-0.5">公式サイト・口コミサイト・カウンセリング内容</dd>
            </div>
          </dl>
          <div className="mt-4">
            <p className="text-xs font-semibold text-brand-deep mb-2">評価基準（5項目）</p>
            <ol className="grid gap-2 sm:grid-cols-2">
              {[
                "① 料金（総額・わかりやすさ）",
                "② 脱毛機器・技術",
                "③ 口コミ評価",
                "④ 通いやすさ（院数・予約）",
                "⑤ 保証制度",
              ].map((c) => (
                <li
                  key={c}
                  className="flex items-center gap-2 text-sm text-gray-700 bg-brand-light/10 rounded-lg px-3 py-2"
                >
                  <span className="text-brand flex-shrink-0">✓</span>
                  <span>{c}</span>
                </li>
              ))}
            </ol>
          </div>
          <p className="text-[11px] text-gray-400 mt-4 leading-relaxed">
            ※ ★評価は編集部の独自評価であり、第三者の集計レビューではありません。医療監修を受けたものではなく、最終的な判断は必ず医師にご相談ください。
          </p>
        </section>

        {/* 目立つ位置のアフィリエイトバナー枠 */}
        <AdSpace label="注目のサービス（PR）" variant="rect" />

        <RankingTabs services={services} />

        <p className="text-xs text-gray-400 text-center leading-relaxed">
          ※ 本ランキングの★評価は編集部の独自評価であり、第三者の集計レビューではありません。料金は目安で、プラン・キャンペーンにより変動します。
          最新かつ正確な料金は各公式サイトでご確認ください。「無料カウンセリングを予約」は各クリニック公式サイトへのリンク（PR）です。
        </p>

        <AdSpace label="スポンサーリンク" />

        <MedicalDisclaimer variant="block" />
      </div>
    </main>
  );
}
