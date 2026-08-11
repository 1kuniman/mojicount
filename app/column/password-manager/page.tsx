import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "パスワードマネージャーとは——なぜ「覚える」をやめるべきか",
  description:
    "パスワード管理アプリの仕組みと安全性、選び方の考え方を解説。すべてを覚えようとすることの限界と、使い回しをやめる現実的な方法を紹介します。",
};

export default function Page() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-12">
      <p className="text-xs text-ink-faint font-mono tracking-widest">COLUMN</p>
      <h1 className="mt-2 font-mincho text-2xl sm:text-3xl font-bold text-ink leading-snug">
        パスワードマネージャーとは——なぜ「覚える」をやめるべきか
      </h1>

      <div className="mt-8 space-y-8 text-[15px] leading-loose text-ink-soft">
        <p>
          「サービスごとに別のパスワードを」とよく言われますが、10も20もあるアカウントのパスワードを、すべて頭で覚えておくのは現実的ではありません。この矛盾を解決するのがパスワードマネージャー（パスワード管理アプリ）です。
        </p>

        <section>
          <h2 className="font-mincho text-xl font-bold text-ink rule-shu">やっていることはシンプル</h2>
          <p className="mt-3">
            パスワードマネージャーの役割は、大きく2つです。ひとつは、サービスごとの複雑なパスワードを生成すること。もうひとつは、それを暗号化した状態で保管し、必要なときだけ呼び出すことです。利用者が覚えておく必要があるのは、マネージャー自体を開くための「マスターパスワード」1つだけになります。20個のパスワードを覚える代わりに、1個の強いパスワードを覚えればよくなる、という発想です。
          </p>
        </section>

        <section>
          <h2 className="font-mincho text-xl font-bold text-ink rule-shu">安全性の根拠</h2>
          <p className="mt-3">
            まともなパスワードマネージャーは、保管されたデータをゼロ知識暗号化という方式で扱います。これは、サービス提供者自身もマスターパスワードを知らず、復号できないという設計です。つまり、マネージャーの運営会社がサーバーごと攻撃されても、暗号化されたデータの塊が漏れるだけで、中身までは読まれません。もちろんマスターパスワード自体が推測されれば意味がないため、これだけは長く・他で使っていない・記憶に頼れるものにする必要があります。
          </p>
        </section>

        <section>
          <h2 className="font-mincho text-xl font-bold text-ink rule-shu">ブラウザ内蔵の保存機能との違い</h2>
          <p className="mt-3">
            ChromeやSafariにもパスワード保存機能がありますが、専用のパスワードマネージャーとの違いは、対応環境の広さと機能の作り込みです。専用アプリは複数のブラウザ・OS・スマホをまたいで同期でき、パスワードの強度診断や、同じパスワードの使い回し検出、漏えいしたパスワードの警告といった機能を備えていることが多く、セキュリティ運用の中心に据えやすい設計になっています。どちらを使うにせよ、「何も保存せず頭で覚える」よりは大きく安全です。
          </p>
        </section>

        <section>
          <h2 className="font-mincho text-xl font-bold text-ink rule-shu">導入の始め方</h2>
          <p className="mt-3">
            いきなり全アカウントを移行する必要はありません。まずはメールアカウントなど、他のサービスの復旧に使われる重要なものから始め、ログインするたびに1つずつ専用パスワードへ切り替えていくのが現実的です。新しく作るパスワードは、当サイトの<Link href="/password/" className="text-shu underline underline-offset-2">パスワード生成</Link>で作成し、そのままマネージャーに保存する流れがスムーズです。今使っているパスワードが弱くないかは、同ツールの強度チェックで確認できます。あわせて、<Link href="/column/two-factor-auth/" className="text-shu underline underline-offset-2">二段階認証</Link>も設定できるサービスから有効にしておくと、さらに安心です。
          </p>
        </section>
      </div>

      <p className="mt-10 text-sm">
        <Link href="/column/" className="text-shu underline underline-offset-2">← コラム一覧へ</Link>
      </p>
    </article>
  );
}
