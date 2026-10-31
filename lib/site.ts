export const SITE_URL = "https://www.mojimojicount.com";
export const SITE_NAME = "宵の書架";
export const SITE_DESC =
  "本棚から直感で一冊を選んで占う、無料・登録なしの占いの本。数秘術・タロット・星座・夢占い・九星気学・守護石・オーラ・前世まで、十冊の本をめくって読み解きます。";

/**
 * アフィリエイト（A8.net・ココナラ）。url が空なら案内枠は出ない。
 * pixel は A8 の計測用 1×1 画像（素材コードの <img> の src）。
 */
export const AFF = {
  note: "本の読み解きをもっと深めたい夜は、占い師にじかに話を聞いてもらう方法もあります。",
  // 電話占い【ココナラ】（素材ID 031）
  url: "https://px.a8.net/svt/ejp?a8mat=4BESUD+2HWHWA+2PEO+C3BAQ",
  pixel: "https://www13.a8.net/0.gif?a8mat=4BESUD+2HWHWA+2PEO+C3BAQ",
  label: "ココナラの電話占いで相談する",
  // ココナラ占い（メール相談、素材ID 011）
  sub: {
    url: "https://px.a8.net/svt/ejp?a8mat=4BESUD+2IHXI2+2PEO+1BP19U",
    pixel: "https://www15.a8.net/0.gif?a8mat=4BESUD+2IHXI2+2PEO+1BP19U",
    label: "電話が苦手なら、メールで相談（ココナラ占い）",
  },
};

export const abs = (p: string) => SITE_URL + p;
