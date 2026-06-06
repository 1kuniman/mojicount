import type { ReactNode } from "react";

/**
 * 料金比較表（横スクロール対応）。
 *
 * - 掲載している料金は 2026年5月時点の公開情報をもとにした目安です。
 *   プラン・キャンペーンにより変動するため、最新かつ正確な料金は各公式サイトでご確認ください。
 * - 「公式サイトへ」ボタンは現状は各クリニック公式サイトへのリンクです。
 *   アフィリエイト提携の承認後に各ASPの広告リンクへ差し替えてください（rel="nofollow" で出力）。
 */

export type PriceTableType = "datsumo" | "manjaro";

interface PriceRow {
  /** クリニック名 */
  clinic: string;
  /** 料金セル（headers の料金列に対応） */
  prices: string[];
  /** 特徴 */
  feature: string;
  /** 公式サイトURL（参考値の行など、リンク不要なら省略） */
  url?: string;
  /** 業界中央値などの参考行（淡色で表示） */
  reference?: boolean;
}

interface PriceTableData {
  /** 見出し */
  title: string;
  /** 料金列の見出し（クリニック列・特徴列・操作列は固定で付与） */
  priceColumns: string[];
  rows: PriceRow[];
}

const TABLES: Record<PriceTableType, PriceTableData> = {
  datsumo: {
    title: "医療脱毛 クリニック一覧",
    priceColumns: ["全身5回", "全身+VIO5回", "全身+VIO+顔5回"],
    rows: [
      {
        clinic: "レジーナクリニック",
        prices: ["公式で確認", "公式で確認", "公式で確認"],
        feature: "女性専用・全国展開",
        url: "https://www.reginaclinic.jp/",
      },
      {
        clinic: "フレイアクリニック",
        prices: ["公式で確認", "公式で確認", "公式で確認"],
        feature: "痛みが少ない",
        url: "https://frey-a.jp/",
      },
      {
        clinic: "リゼクリニック",
        prices: ["公式で確認", "公式で確認", "公式で確認"],
        feature: "追加照射保証あり",
        url: "https://lize-clinic.jp/",
      },
      {
        clinic: "湘南美容クリニック",
        prices: ["公式で確認", "公式で確認", "公式で確認"],
        feature: "全国展開",
        url: "https://www.s-b-c.net/",
      },
    ],
  },
  manjaro: {
    title: "マンジャロ クリニック一覧",
    priceColumns: ["0.5mg", "1mg", "2.5mg"],
    rows: [
      {
        clinic: "Actually,（アクチュアリー）",
        prices: ["公式で確認", "公式で確認", "公式で確認"],
        feature: "オンライン診療",
        url: "https://actually-clinic.com/",
      },
      {
        clinic: "レバクリ",
        prices: ["公式で確認", "公式で確認", "公式で確認"],
        feature: "待ち時間なし",
        url: "https://leva.clinic/",
      },
      {
        clinic: "Mona Clinic（モナクリニック）",
        prices: ["公式で確認", "公式で確認", "公式で確認"],
        feature: "即日発送",
        url: "https://mona-clinic.jp/",
      },
    ],
  },
};

export default function PriceCompareTable({
  type,
  heading,
}: {
  type: PriceTableType;
  /** 見出しを上書きしたい場合に指定（省略時はテーブル既定の title） */
  heading?: ReactNode;
}) {
  const data = TABLES[type];

  return (
    <section className="my-2">
      <h3 className="font-serif text-lg sm:text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
        <span aria-hidden>💰</span>
        {heading ?? data.title}
      </h3>

      <div className="overflow-x-auto rounded-2xl border border-brand-light/40 shadow-sm">
        <table className="w-full text-sm border-collapse min-w-[640px]">
          <thead>
            <tr className="bg-brand-light/30 text-brand-deep">
              <th className="text-left font-semibold px-3 py-3 whitespace-nowrap border-b border-brand-light/40 sticky left-0 bg-brand-light/30 z-10">
                クリニック
              </th>
              {data.priceColumns.map((c) => (
                <th
                  key={c}
                  className="text-left font-semibold px-3 py-3 whitespace-nowrap border-b border-brand-light/40"
                >
                  {c}
                </th>
              ))}
              <th className="text-left font-semibold px-3 py-3 whitespace-nowrap border-b border-brand-light/40">
                特徴
              </th>
              <th className="font-semibold px-3 py-3 whitespace-nowrap border-b border-brand-light/40 text-center">
                公式
              </th>
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, r) => (
              <tr
                key={row.clinic}
                className={
                  row.reference
                    ? "bg-brand-light/10"
                    : r % 2
                      ? "bg-cream"
                      : "bg-white"
                }
              >
                <th
                  scope="row"
                  className={`text-left px-3 py-3 align-middle border-b border-brand-light/20 whitespace-nowrap sticky left-0 z-10 ${
                    row.reference
                      ? "bg-brand-light/10 text-gray-500 font-medium"
                      : `font-bold text-gray-800 ${r % 2 ? "bg-cream" : "bg-white"}`
                  }`}
                >
                  {row.clinic}
                </th>
                {row.prices.map((p, i) => (
                  <td
                    key={i}
                    className={`px-3 py-3 align-middle border-b border-brand-light/20 whitespace-nowrap ${
                      row.reference
                        ? "text-gray-500"
                        : "font-semibold text-brand-deep"
                    }`}
                  >
                    {p}
                  </td>
                ))}
                <td className="px-3 py-3 align-middle border-b border-brand-light/20 text-gray-600 whitespace-nowrap text-xs">
                  {row.feature}
                </td>
                <td className="px-3 py-3 align-middle border-b border-brand-light/20 text-center">
                  {row.url ? (
                    <a
                      href={row.url}
                      target="_blank"
                      rel="nofollow noopener"
                      className="inline-block bg-gradient-to-r from-brand to-brand-deep text-white text-xs font-bold px-3.5 py-2 rounded-full shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all whitespace-nowrap"
                    >
                      公式サイトへ
                    </a>
                  ) : (
                    <span className="text-gray-300 text-xs">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-400 mt-2 leading-relaxed">
        ※料金はプラン・キャンペーンにより変動します。最新かつ正確な料金は必ず各公式サイトでご確認ください。「公式サイトへ」は各クリニック公式サイトへのリンク（PR）です。
      </p>
    </section>
  );
}
