import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { Crumbs, Orn } from "@/components/Parts";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: "宵の書架のプライバシーポリシー。入力した生年月日や名前の扱い、広告とアクセス解析について。",
  alternates: { canonical: SITE_URL + "/privacy/" },
};

export default function Privacy() {
  return (
    <main className="sheet prose">
      <Crumbs trail={[{ name: "宵の書架", href: "/" }, { name: "プライバシーポリシー" }]} />
      <h1>プライバシーポリシー</h1>
      <Orn />
      <section>
        <h2>入力した内容の扱い</h2>
        <p>本の中で入力する生年月日・名前・選んだ答えは、お使いのブラウザの中だけで計算に使われます。運営者のサーバーへ送信・保存されることはありません。次に本をひらいたときのために、入力内容をブラウザのローカルストレージに保存することがあります。ブラウザの設定から、いつでも消去できます。</p>
        <p>結果を共有するリンクには、占いの結果（数や札、色などの記号）だけが含まれます。生年月日や名前は含まれません。</p>
      </section>
      <section>
        <h2>アクセス解析</h2>
        <p>サイトの改善のため、Vercel Analytics を使ってページの閲覧数などを計測しています。個人を特定する情報は収集していません。</p>
      </section>
      <section>
        <h2>広告について</h2>
        <p>当サイトは、第三者配信の広告サービス（Google AdSense）や、アフィリエイトプログラムを利用することがあります。広告配信事業者は、ユーザーの興味に応じた広告を表示するために Cookie を使用することがあります。Cookie を無効にする方法や Google AdSense については、Google の広告設定（https://adssettings.google.com/）や、Google のポリシーと規約（https://policies.google.com/technologies/ads?hl=ja）をご覧ください。広告やアフィリエイトのリンクには「広告・PR」と表示します。</p>
      </section>
      <section>
        <h2>免責事項</h2>
        <p>当サイトの占いの内容は、伝統的な占いの考え方にもとづく読みものです。内容の正確さには注意を払っていますが、結果によって生じたいかなる損害についても責任を負いかねます。健康・お金・法律などの大切な判断は、専門家にご相談ください。</p>
      </section>
      <section>
        <h2>改定</h2>
        <p>このポリシーは、必要に応じて改定することがあります。最終更新日：2026年10月31日</p>
      </section>
    </main>
  );
}
