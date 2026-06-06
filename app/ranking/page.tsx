import type { Metadata } from "next";
import { services } from "@/lib/services";
import RankingTabs from "../components/RankingTabs";
import AdSpace from "../components/AdSpace";
import MedicalDisclaimer from "../components/MedicalDisclaimer";

export const metadata: Metadata = {
  title: "医療脱毛ぶっちゃけどこがいい？【2026年最新】本音で比較",
  description:
    "医療脱毛・医療ダイエット・美容クリニックは、ぶっちゃけどこがいい？各クリニックの公式情報や公開されている情報をもとに、使用機器・編集部の本音（良い点／気になる点）・こんな人には向かないまで、良い面も気になる面も正直に整理した比較ランキングです。料金は変動するため各公式サイトでご確認ください。",
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
          医療脱毛ぶっちゃけどこがいい？
          <span className="block text-lg sm:text-xl mt-1 text-brand-deep">【2026年最新】本音で比較</span>
        </h1>
        <p className="mt-3 text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed">
          医療脱毛・医療ダイエット・美容クリニックを、使用機器・編集部の本音など
          独自の比較基準で整理。良い点も気になる点も正直にまとめました。
        </p>
      </section>

      <div className="max-w-3xl mx-auto px-4 pb-16 space-y-10">
        {/* PR表示（目立つ位置） */}
        <p className="text-xs text-gray-500 bg-brand-light/15 border border-brand-light/40 rounded-full px-4 py-2 text-center">
          ＜PR・アフィリエイト広告を含みます＞本ページにはアフィリエイト広告（プロモーション）が含まれます。「無料カウンセリングを予約」「公式サイトへ」は各クリニック公式サイトへのリンクです。
        </p>

        {/* 編集部の本音コメント */}
        <section className="rounded-2xl border-2 border-brand/40 bg-gradient-to-br from-brand-light/15 to-cream p-5 sm:p-6">
          <p className="text-sm font-bold text-brand-deep mb-2 flex items-center gap-2">
            <span aria-hidden>💬</span> 編集部の本音コメント
          </p>
          <p className="text-sm text-gray-700 leading-7">
            正直に言います。医療脱毛クリニックはどこも「うちが一番」と言います。
            だから当サイトでは各クリニックの公式情報や公開されている情報をもとに、良い点も気になる点も
            できるだけ正直に整理しました。機器や特徴だけでなく「こんな人には向かない」まで載せています。
            自分に合うかどうかの判断材料にしてください。
          </p>
        </section>

        {/* 編集部の選定基準 */}
        <section className="rounded-2xl border-2 border-brand/30 bg-white p-5 sm:p-6">
          <h2 className="font-serif text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
            <span aria-hidden>🔍</span> 編集部の選定基準
          </h2>
          <p className="text-sm text-gray-700 leading-7">
            当サイトでは各クリニックの公式サイトや公開されている情報をもとに、料金・特徴・通いやすさ・保証制度などを整理しています。
            メリットだけでなく、注意点や「向かない人」もできるだけ正直に記載することを心がけています。
          </p>
          <dl className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-cream border border-brand-light/30 px-4 py-3">
              <dt className="text-xs font-semibold text-brand-deep">情報参照時点</dt>
              <dd className="text-sm text-gray-700 mt-0.5">2026年5月時点</dd>
            </div>
            <div className="rounded-xl bg-cream border border-brand-light/30 px-4 py-3">
              <dt className="text-xs font-semibold text-brand-deep">参照情報</dt>
              <dd className="text-sm text-gray-700 mt-0.5">各クリニックの公式サイト・公開情報</dd>
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
          ※ 本ランキングの★評価は編集部独自の評価であり、第三者の集計レビューや公的統計ではありません。料金はプラン・キャンペーンにより変動します。
          最新かつ正確な料金は各公式サイトでご確認ください。「無料カウンセリングを予約」は各クリニック公式サイトへのリンク（PR）です。
        </p>

        <AdSpace label="スポンサーリンク" />

        <MedicalDisclaimer variant="block" />
      </div>
    </main>
  );
}
