import type { Metadata } from "next";
import PasswordTool from "@/components/PasswordTool";
import ToolHeader from "@/components/ToolHeader";
import Faq from "@/components/Faq";
import RelatedTools from "@/components/RelatedTools";

export const metadata: Metadata = {
  title: "パスワード生成（強力・安全・ブラウザ内）",
  description:
    "文字数や文字種を指定して強力なパスワードを生成する無料ツール。すべて端末内で生成され、どこにも送信されません。",
};

export default function PasswordPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-10">
      <ToolHeader
        slug="password"
        lead="ランダムな文字列か、覚えやすい単語をつないだパスフレーズで、推測されにくいパスワードを生成します。文字種や単語数を指定でき、強度の目安も表示。生成はすべてお使いのブラウザ内（暗号学的乱数）で行われ、できたパスワードがネットワークに送られることはありません。"
      />

      <PasswordTool />

      <section className="mt-14 max-w-2xl">
        <h2 className="font-mincho text-xl font-bold text-ink rule-shu">使い方</h2>
        <ol className="mt-4 space-y-2 text-[15px] text-ink-soft leading-relaxed list-decimal pl-5">
          <li>文字数のスライダーと、使う文字種を選びます。</li>
          <li>必要なら「紛らわしい文字を除く」をオンにします。</li>
          <li>「生成する」を押し、使いたいものをコピーします。</li>
        </ol>

        <h2 className="font-mincho text-xl font-bold text-ink rule-shu mt-10">安全なパスワードのコツ</h2>
        <p className="mt-4 text-[15px] text-ink-soft leading-relaxed">
          長さは強度に直結します。重要なアカウントでは12文字以上、できれば16文字以上が目安です。文字種を増やすほど推測されにくくなります。そして最も大切なのは、同じパスワードを複数のサービスで使い回さないこと。サービスごとに別のパスワードを作り、パスワード管理アプリで保管するのがおすすめです。
        </p>
      </section>

      <div className="max-w-2xl">
        <Faq
          items={[
            {
              q: "生成したパスワードはどこかに保存・送信されますか？",
              a: "いいえ。生成はすべてブラウザ内で完結し、サーバーへの送信も保存も行いません。安心して利用できます。",
            },
            {
              q: "乱数は安全なものですか？",
              a: "ブラウザの暗号学的乱数（crypto.getRandomValues）を使用しています。単純なランダム関数より推測されにくく、パスワード生成に適しています。",
            },
            {
              q: "「紛らわしい文字を除く」とは？",
              a: "l（エル）とI（アイ）と1、O（オー）と0（ゼロ）など、見間違えやすい文字を候補から外します。手入力する場面で役立ちます。",
            },
            {
              q: "パスフレーズとランダム文字列、どちらがいい？",
              a: "覚えて手入力する必要があるならパスフレーズ、コピペで使い管理アプリに保存するならランダム文字列が向きます。どちらも語数・文字数を増やすほど強くなります。",
            },
            {
              q: "何文字にすればよいですか？",
              a: "用途によりますが、重要なアカウントは16文字以上を推奨します。文字種をすべて有効にすると、さらに強度が上がります。",
            },
          ]}
        />
      </div>

      <RelatedTools currentSlug="password" />
    </div>
  );
}
