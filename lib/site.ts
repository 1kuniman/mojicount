export const SITE_URL = "https://www.mojimojicount.com";
export const SITE_NAME = "宵の書架";
export const SITE_DESC =
  "本棚から直感で一冊を選んで占う、無料・登録なしの占いの本。数秘術・タロット・星座・夢占い・九星気学・守護石・オーラ・前世まで、十冊の本をめくって読み解きます。";

/**
 * 電話占いなどのアフィリエイトリンク。空のままなら案内枠は表示されない。
 * 提携が取れたら URL と名前を入れる。
 */
export const AFF = {
  url: "",
  name: "",
  note: "本の読み解きをもっと深めたい夜は、占い師にじかに話を聞いてもらう方法もあります。",
};

export const abs = (p: string) => SITE_URL + p;
