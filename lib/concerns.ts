import type { Concern } from "./types";

/** トップページ「あなたの悩みから探す」セクション */
export const concerns: Concern[] = [
  {
    id: "diet",
    label: "ダイエット・痩身",
    emoji: "🏃‍♀️",
    description: "医療ダイエット・GLP-1・脂肪溶解",
    category: "medical-diet",
  },
  {
    id: "datsumo",
    label: "脱毛",
    emoji: "✨",
    description: "全身・顔・VIO の医療脱毛／サロン脱毛",
    category: "datsumo",
  },
  {
    id: "skin",
    label: "肌トラブル",
    emoji: "💧",
    description: "シミ・ニキビ・毛穴の美容皮膚科",
    category: "clinic",
  },
  {
    id: "seikei",
    label: "整形・リフトアップ",
    emoji: "🌷",
    description: "二重・鼻・たるみ・輪郭",
    category: "clinic",
  },
  {
    id: "oral",
    label: "歯・オーラルケア",
    emoji: "🦷",
    description: "ホワイトニング・歯列矯正など",
    category: "clinic",
  },
];
