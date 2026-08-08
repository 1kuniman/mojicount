import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import ArticleMeta from "@/components/ArticleMeta";

export const metadata: Metadata = {
  title: "パスワードの使い回しはなぜ危険か——リスト型攻撃の仕組み",
  description:
    "パスワードを使い回すと、1か所の漏えいが全アカウントの乗っ取りにつながります。リスト型攻撃の仕組みと、現実的な対策を解説します。",
};

export default function Page() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-12">
      <p className="text-xs text-ink-faint font-mono tracking-widest">COLUMN</p>
      <Breadcrumb items={[{ name: "コラム", href: "/column/" }, { name: "パスワードの使い回しはなぜ危険か" }]} />
      <ArticleMeta
        title="パスワードの使い回しはなぜ危険か——リスト型攻撃の仕組み"
        description="パスワードを使い回すと、1か所の漏えいが全アカウントの乗っ取りにつながります。リスト型攻撃の仕組みと、現実的な対策を解説します。"
        path="/column/password-reuse/"
        publishedDate="2026-08-02"
      />
      <h1 className="mt-2 font-mincho text-2xl sm:text-3xl font-bold text-ink leading-snug">
        パスワードの使い回しはなぜ危険か——リスト型攻撃の仕組み
      </h1>

      <div className="mt-8 space-y-8 text-[15px] leading-loose text-ink-soft">
        <p>
          「複雑なパスワードにしているから大丈夫」と思っていても、同じものを複数のサービスで使っていると、その強さはほとんど意味を持ちません。攻撃者はパスワードを破るのではなく、どこかから漏れたものをそのまま試してくるからです。
        </p>

        <section>
          <h2 className="font-mincho text-xl font-bold text-ink rule-shu">リスト型攻撃とは</h2>
          <p className="mt-3">
            どこかのサービスから流出したIDとパスワードの組み合わせを一覧（リスト）として入手し、それを別のサービスのログイン画面で片っ端から試す手法です。総当たりのように無数のパターンを試すわけではなく、実在する正しい組み合わせを使うため、成功率が高く、しかも「正しいパスワードでのログイン」に見えるので検知されにくいという厄介さがあります。
          </p>
          <p className="mt-3">
            重要なのは、攻撃者が狙うのは「あなたのパスワードの複雑さ」ではないという点です。どれだけ長く複雑でも、使い回していれば、セキュリティの弱いサービス1つが破られた時点で、同じ組み合わせを使っている全てのアカウントが危険にさらされます。守りの強さは、一番弱いサービスに引きずられるということです。
          </p>
        </section>

        <section>
          <h2 className="font-mincho text-xl font-bold text-ink rule-shu">「少しだけ変える」も対策にならない</h2>
          <p className="mt-3">
            サービス名を末尾に足す（例：末尾を twitter / amazon に変える）、数字を1つ増やす、といった小さな変形も、規則性が読めれば簡単に推測されます。人間が考える変形パターンは想像以上に似通っているため、攻撃側は既知のパターンを機械的に試すだけで突破できてしまいます。
          </p>
        </section>

        <section>
          <h2 className="font-mincho text-xl font-bold text-ink rule-shu">現実的な対策</h2>
          <p className="mt-3">
            対策の柱は3つです。1つ目は、サービスごとに完全に別のパスワードを使うこと。2つ目は、それを記憶に頼らずパスワード管理アプリに保存すること。3つ目は、二段階認証を有効にすることです。特に二段階認証は、仮にパスワードが漏れても、それだけではログインさせない最後の砦になります。重要なアカウント（メール、決済、SNS）から順に設定していくのが効率的です。
          </p>
          <p className="mt-3">
            サービスごとに別のパスワードを用意するのは、手作業だと現実的ではありません。当サイトの<Link href="/password/" className="text-shu underline underline-offset-2">パスワード生成</Link>では、ランダム文字列と覚えやすいパスフレーズの両方を、まとめて複数生成できます。生成はすべてブラウザ内の暗号学的乱数で行われ、結果が外部へ送信されることはありません。
          </p>
        </section>

        <section>
          <h2 className="font-mincho text-xl font-bold text-ink rule-shu">まとめ</h2>
          <p className="mt-3">
            パスワードの安全性は「複雑さ」だけでは決まりません。使い回しをやめることは、複雑さを1段階上げるよりもはるかに効果の大きい対策です。まずはメールアカウントなど、他のサービスの復旧に使われる重要なものから、専用のパスワードに変えていきましょう。
          </p>
        </section>
      </div>

      <p className="mt-10 text-sm">
        <Link href="/column/" className="text-shu underline underline-offset-2">← コラム一覧へ</Link>
      </p>
    </article>
  );
}
