import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { Crumbs, Orn } from "@/components/Parts";

export const metadata: Metadata = {
  title: "この書架について",
  description: "宵の書架の運営者と、占いの本の作り方・方針について。",
  alternates: { canonical: SITE_URL + "/about/" },
};

export default function About() {
  return (
    <main className="sheet prose">
      <Crumbs trail={[{ name: "宵の書架", href: "/" }, { name: "この書架について" }]} />
      <h1>この書架について</h1>
      <Orn />
      <section>
        <h2>宵の書架とは</h2>
        <p>宵の書架は、本棚から直感で一冊を選び、本をめくりながら占う読みものの場所です。数秘術、名前の数による相性、パーソナルイヤー、タロット、12星座、夢占い、守護石、九星気学、オーラ、前世。十冊の本は、それぞれ違う占い方で「いまのあなた」を読み解きます。</p>
        <p>すべての本は無料で、会員登録はいりません。生年月日や名前は、あなたのブラウザの中だけで計算に使われ、私たちのサーバーへ送られることはありません。</p>
      </section>
      <section>
        <h2>占いの本の作り方</h2>
        <p>本の中身は、数秘術や九星気学の計算方法、タロットや星座の伝統的な解釈など、広く知られている占いの考え方をもとに書いています。結果は言い伝えや象徴の読み方であり、未来を約束したり、医療・お金・法律に関する判断の代わりになったりするものではありません。</p>
        <p>統計や体験談のような、確かめられない根拠を文章に書き足すことはしていません。誤りや気になる表現を見つけたときは、<Link href="/contact/">お問い合わせ</Link>から教えてください。</p>
      </section>
      <section>
        <h2>運営者</h2>
        <p>個人で運営しています。運営者はいっくん（<a href="https://x.com/ikkun_dev" target="_blank" rel="noopener noreferrer">@ikkun_dev</a>）です。</p>
      </section>
    </main>
  );
}
