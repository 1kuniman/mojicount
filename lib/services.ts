import type { CategorySlug, Service } from "./types";

/**
 * ランキングに掲載するサービスデータ。
 * 掲載名・価格・評価はすべて「編集部の比較基準に基づく構成例」であり、
 * 実在の特定クリニックの公式情報ではありません。実際の運用時は提携先の
 * 正式な情報・アフィリエイトリンクに差し替えてご利用ください。
 */
export const services: Service[] = [
  // ── 医療ダイエット ──────────────────────────────
  {
    id: "md-1",
    name: "リズム メディカルダイエット",
    category: "medical-diet",
    rank: 1,
    catchphrase: "オンライン診療対応・GLP-1の定番プラン",
    rating: 4.7,
    priceFrom: "月々 9,800円〜",
    features: ["オンライン診療OK", "全国配送", "管理栄養士サポート"],
    pros: [
      "スマホ完結で通院不要、薬は自宅へ配送",
      "初回カウンセリングが無料",
      "医師による定期的なフォローがある",
    ],
    cons: ["対面診察を希望する人には不向き", "人気のため予約が取りにくい時期がある"],
    recommendedFor: "忙しくて通院時間が取れない、まず手軽に始めたい方",
  },
  {
    id: "md-2",
    name: "スリムライン クリニック",
    category: "medical-diet",
    rank: 2,
    catchphrase: "対面診療で薬剤を細かく調整したい人に",
    rating: 4.5,
    priceFrom: "月々 12,000円〜",
    features: ["対面診療", "複数薬剤を比較", "血液検査つき"],
    pros: [
      "医師と対面で副作用を相談しやすい",
      "マンジャロ等の複数薬剤から選べる",
      "定期的な血液検査で安全管理",
    ],
    cons: ["通院の手間がかかる", "オンラインより費用はやや高め"],
    recommendedFor: "副作用が心配で、対面でしっかり相談したい方",
  },
  {
    id: "md-3",
    name: "ファイン ダイエット外来",
    category: "medical-diet",
    rank: 3,
    catchphrase: "費用重視・続けやすい料金設定",
    rating: 4.2,
    priceFrom: "月々 7,900円〜",
    features: ["低価格スタート", "縛りなし", "都度購入OK"],
    pros: ["業界でも始めやすい価格帯", "解約金・契約縛りがない"],
    cons: ["サポート体制はシンプル", "店舗数が限られる"],
    recommendedFor: "とにかく費用を抑えて続けたい方",
  },

  // ── 脱毛 ────────────────────────────────────────
  {
    id: "dt-1",
    name: "シエル 医療脱毛クリニック",
    category: "datsumo",
    rank: 1,
    catchphrase: "全身＋VIO＋顔がそろう医療脱毛",
    rating: 4.8,
    priceFrom: "全身5回 98,000円〜",
    features: ["医療脱毛", "全身+VIO+顔", "麻酔クリーム対応"],
    pros: [
      "出力の高い医療レーザーで少ない回数を狙える",
      "痛みに配慮した麻酔オプションあり",
      "全身・VIO・顔のセットプランが充実",
    ],
    cons: ["サロンより1回あたりの料金は高め", "肌状態によっては施術不可の場合あり"],
    recommendedFor: "回数を抑えてしっかり脱毛効果を得たい方",
  },
  {
    id: "dt-2",
    name: "ピュアラ 脱毛サロン",
    category: "datsumo",
    rank: 2,
    catchphrase: "痛みが少なく通いやすい光脱毛",
    rating: 4.4,
    priceFrom: "全身12回 132,000円〜",
    features: ["光（IPL）脱毛", "痛みが少ない", "予約が取りやすい"],
    pros: ["医療脱毛より痛みが穏やか", "1回あたりの料金が手頃", "店舗数が多く通いやすい"],
    cons: ["効果実感まで回数が必要", "医療行為ではないため脱毛完了の保証はない"],
    recommendedFor: "痛みが苦手で、まず気軽に始めたい方",
  },
  {
    id: "dt-3",
    name: "ルミエ VIO脱毛",
    category: "datsumo",
    rank: 3,
    catchphrase: "デリケートゾーン特化・女性スタッフ対応",
    rating: 4.3,
    priceFrom: "VIO5回 48,000円〜",
    features: ["VIO特化", "女性スタッフ", "プライバシー配慮"],
    pros: ["VIOの形・量を細かく相談できる", "完全個室・女性スタッフ対応"],
    cons: ["VIO以外のプランは選択肢が少ない"],
    recommendedFor: "VIOだけを重点的にケアしたい方",
  },

  // ── 美容クリニック ──────────────────────────────
  {
    id: "cl-1",
    name: "サクラ 美容クリニック",
    category: "clinic",
    rank: 1,
    catchphrase: "二重・鼻・輪郭まで総合対応の大手系",
    rating: 4.6,
    priceFrom: "二重埋没 29,000円〜",
    features: ["症例数が豊富", "保証制度あり", "カウンセリング無料"],
    pros: [
      "二重・鼻・輪郭など幅広いメニュー",
      "施術後の保証・アフターケアが手厚い",
      "症例写真が豊富で仕上がりを確認しやすい",
    ],
    cons: ["人気院は予約が混み合う", "オプションで費用が上がりやすい"],
    recommendedFor: "まず総合的に相談して比較検討したい方",
  },
  {
    id: "cl-2",
    name: "アネモネ 美容外科",
    category: "clinic",
    rank: 2,
    catchphrase: "鼻・輪郭などの整形を得意とする",
    rating: 4.4,
    priceFrom: "鼻ヒアルロン酸 19,800円〜",
    features: ["デザイン重視", "症例カウンセリング", "切らない施術も豊富"],
    pros: ["プチ整形から本格施術まで対応", "シミュレーションで仕上がりを共有"],
    cons: ["難度の高い施術は費用が高額", "院数は都市部中心"],
    recommendedFor: "鼻や輪郭のデザインにこだわりたい方",
  },
  {
    id: "cl-3",
    name: "ルクシア 美容皮膚科",
    category: "clinic",
    rank: 3,
    catchphrase: "シミ・ニキビ・毛穴の肌悩みに",
    rating: 4.5,
    priceFrom: "シミ取りレーザー 5,500円〜",
    features: ["美容皮膚科", "肌診断つき", "ダウンタイム短め"],
    pros: ["シミ・ニキビ・毛穴を肌診断から提案", "切らない施術が中心で続けやすい"],
    cons: ["肌質改善は継続が前提", "保険適用外の自由診療"],
    recommendedFor: "メスを使わず肌悩みをケアしたい方",
  },
];

export function getServicesByCategory(category: CategorySlug): Service[] {
  return services
    .filter((s) => s.category === category)
    .sort((a, b) => a.rank - b.rank);
}

/** トップページ用の注目サービス TOP3（各カテゴリ1位を1つずつ） */
export const featuredTop3: Service[] = [
  services.find((s) => s.id === "cl-1")!,
  services.find((s) => s.id === "dt-1")!,
  services.find((s) => s.id === "md-1")!,
];
