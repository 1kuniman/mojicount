import type { CategorySlug, Service, ServiceGroup } from "./types";

/**
 * ランキングに掲載する実在クリニックのデータ。
 *
 * - クリニック名・特徴・公式URLは実在のものです。
 * - ★評価は「編集部の独自評価」であり、第三者の集計レビューではありません。
 * - 料金はあくまで目安です。プラン・キャンペーンにより変動するため、
 *   最新かつ正確な料金は各公式サイトでご確認ください。
 * - url は現状は公式サイトへのリンクです。アフィリエイト提携の承認後に
 *   各ASPの広告リンクへ差し替えてください。リンクは rel="nofollow" で出力します。
 */
export const services: Service[] = [
  // ── 医療脱毛（女性） ────────────────────────────
  {
    id: "regina",
    name: "レジーナクリニック",
    category: "datsumo",
    group: "datsumo-women",
    rank: 1,
    catchphrase: "全身脱毛に特化した女性専用の医療脱毛",
    rating: 4.7,
    priceFrom: "全身脱毛5回 約150,000円〜（目安）",
    features: ["医療脱毛", "全身特化", "女性専用"],
    pros: [
      "全身脱毛に特化したプラン構成で選びやすい",
      "女性専用クリニックで通いやすい",
      "医療レーザーでしっかり脱毛効果を狙える",
    ],
    cons: [],
    recommendedFor: "全身脱毛をしたい女性",
    url: "https://www.reginaclinic.jp/",
  },
  {
    id: "freya",
    name: "フレイアクリニック",
    category: "datsumo",
    group: "datsumo-women",
    rank: 2,
    catchphrase: "痛みに配慮した女性専用の医療脱毛",
    rating: 4.6,
    priceFrom: "全身脱毛5回 約128,000円〜（目安）",
    features: ["医療脱毛", "痛みに配慮", "女性専用"],
    pros: [
      "痛みに配慮した施術で続けやすい",
      "女性専用で安心して通える",
      "全身脱毛のプランが用意されている",
    ],
    cons: [],
    recommendedFor: "痛みが不安な方・全身脱毛をしたい女性",
    url: "https://frey-a.jp/",
  },
  {
    id: "rize",
    name: "リゼクリニック",
    category: "datsumo",
    group: "datsumo-women",
    rank: 3,
    catchphrase: "全国展開で通いやすい女性専用の医療脱毛",
    rating: 4.5,
    priceFrom: "全身脱毛5回 約138,000円〜（目安）",
    features: ["医療脱毛", "全国展開", "女性専用"],
    pros: [
      "全国に院があり通いやすい",
      "女性専用で相談しやすい",
      "全身脱毛のプランが選べる",
    ],
    cons: [],
    recommendedFor: "通いやすさを重視する女性",
    url: "https://lize-clinic.jp/",
  },
  {
    id: "sbc-datsumo",
    name: "湘南美容クリニック（脱毛）",
    category: "datsumo",
    group: "datsumo-women",
    rank: 4,
    catchphrase: "全国最大級・脱毛から美容整形まで対応",
    rating: 4.4,
    priceFrom: "全身脱毛5回 約99,000円〜（目安）",
    features: ["全国最大級", "脱毛＋美容", "幅広いメニュー"],
    pros: [
      "全国に院が多く通いやすい",
      "脱毛以外の美容施術も相談できる",
      "比較的始めやすい料金プランがある",
    ],
    cons: [],
    recommendedFor: "脱毛と他の美容施術もあわせて検討したい方",
    url: "https://www.s-b-c.net/",
  },

  // ── 男性脱毛 ────────────────────────────────────
  {
    id: "gorilla",
    name: "ゴリラクリニック",
    category: "datsumo",
    group: "datsumo-men",
    rank: 1,
    catchphrase: "ヒゲ脱毛に強い男性専用の医療脱毛",
    rating: 4.7,
    priceFrom: "ヒゲ脱毛5回 約50,000円〜（目安）",
    features: ["男性専用", "ヒゲ脱毛に強い", "医療脱毛"],
    pros: [
      "ヒゲ脱毛のメニュー・デザイン相談が充実",
      "男性専用で通いやすい",
      "全身脱毛にも対応している",
    ],
    cons: [],
    recommendedFor: "ヒゲ・全身脱毛をしたい男性",
    url: "https://gorilla-clinic.com/",
  },
  {
    id: "mens-rize",
    name: "メンズリゼ",
    category: "datsumo",
    group: "datsumo-men",
    rank: 2,
    catchphrase: "全国展開の男性専用医療脱毛",
    rating: 4.5,
    priceFrom: "全身脱毛5回 約150,000円〜（目安）",
    features: ["男性専用", "全国展開", "医療脱毛"],
    pros: [
      "全国に院があり通いやすい",
      "ヒゲ・全身など幅広いプランに対応",
      "男性専用で相談しやすい",
    ],
    cons: [],
    recommendedFor: "全身脱毛をしたい男性",
    url: "https://mens.lize-clinic.jp/",
  },
  {
    id: "regina-homme",
    name: "レジーナクリニックオム",
    category: "datsumo",
    group: "datsumo-men",
    rank: 3,
    catchphrase: "女性スタッフ対応の男性専用医療脱毛",
    rating: 4.4,
    priceFrom: "全身脱毛5回 約150,000円〜（目安）",
    features: ["男性専用", "女性スタッフ対応", "医療脱毛"],
    pros: [
      "女性スタッフによる施術に対応",
      "男性専用で落ち着いて通える",
      "全身脱毛のプランが用意されている",
    ],
    cons: [],
    recommendedFor: "女性スタッフに施術してほしい男性",
    url: "https://reginaclinic-homme.jp/",
  },

  // ── 医療ダイエット・マンジャロ ──────────────────
  {
    id: "actually",
    name: "Actually,（アクチュアリー）",
    category: "medical-diet",
    group: "diet",
    rank: 1,
    catchphrase: "国内最安値水準でマンジャロ処方・オンライン診療",
    rating: 4.6,
    priceFrom: "マンジャロ0.5mg 約8,000円〜（目安）",
    features: ["オンライン診療", "低価格水準", "マンジャロ処方"],
    pros: [
      "マンジャロを始めやすい価格帯で処方",
      "オンライン診療で通院不要",
      "費用を抑えて医療ダイエットを始められる",
    ],
    cons: [],
    recommendedFor: "マンジャロを安く始めたい方",
    url: "https://actually-clinic.com/",
  },
  {
    id: "leva",
    name: "レバクリ",
    category: "medical-diet",
    group: "diet",
    rank: 2,
    catchphrase: "待ち時間なしのオンライン医療ダイエット",
    rating: 4.4,
    priceFrom: "オンライン診療対応（料金は要確認）",
    features: ["オンライン診療", "待ち時間なし", "医療ダイエット"],
    pros: [
      "オンライン完結で待ち時間が少ない",
      "忙しくても自宅で受診できる",
      "通院の手間をかけずに続けやすい",
    ],
    cons: [],
    recommendedFor: "忙しくてクリニックに行けない方",
    url: "https://leva.clinic/",
  },
  {
    id: "mona",
    name: "Mona Clinic（モナクリニック）",
    category: "medical-diet",
    group: "diet",
    rank: 3,
    catchphrase: "マンジャロ即日発送・オンライン診療",
    rating: 4.3,
    priceFrom: "マンジャロ処方対応（料金は要確認）",
    features: ["オンライン診療", "即日発送", "マンジャロ処方"],
    pros: [
      "条件により即日発送に対応",
      "オンライン診療で手軽に始められる",
      "思い立ったときにすぐ相談できる",
    ],
    cons: [],
    recommendedFor: "できるだけ早く始めたい方",
    url: "https://mona-clinic.jp/",
  },
];

/** カテゴリページ・関連施術用（グループ順→ランク順で並べる） */
const groupOrder: Record<ServiceGroup, number> = {
  "datsumo-women": 0,
  "datsumo-men": 1,
  diet: 2,
};

export function getServicesByCategory(category: CategorySlug): Service[] {
  return services
    .filter((s) => s.category === category)
    .sort((a, b) => groupOrder[a.group] - groupOrder[b.group] || a.rank - b.rank);
}

export function getServicesByGroup(group: ServiceGroup): Service[] {
  return services
    .filter((s) => s.group === group)
    .sort((a, b) => a.rank - b.rank);
}

/** トップページ用の注目サービス TOP3（女性脱毛・男性脱毛・医療ダイエットから1つずつ） */
export const featuredTop3: Service[] = [
  services.find((s) => s.id === "regina")!,
  services.find((s) => s.id === "gorilla")!,
  services.find((s) => s.id === "actually")!,
];
