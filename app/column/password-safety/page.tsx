import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import ArticleMeta from "@/components/ArticleMeta";

export const metadata: Metadata = {
  title: "安全なパスワードの作り方——長さ・文字種・パスフレーズ",
  description:
    "推測されにくいパスワードの条件（長さ・文字種・使い回し回避）と、覚えやすさを両立するパスフレーズの考え方を解説します。",
};

export default function Page() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-12">
      <p className="text-xs text-ink-faint font-mono tracking-widest">COLUMN</p>
      <Breadcrumb items={[{ name: "コラム", href: "/column/" }, { name: "安全なパスワードの作り方" }]} />
      <ArticleMeta
        title="安全なパスワードの作り方——長さ・文字種・パスフレーズ"
        description="推測されにくいパスワードの条件（長さ・文字種・使い回し回避）と、覚えやすさを両立するパスフレーズの考え方を解説します。"
        path="/column/password-safety/"
        publishedDate="2026-07-30"
      />
      <h1 className="mt-2 font-mincho text-2xl sm:text-3xl font-bold text-ink leading-snug">
        安全なパスワードの作り方——長さ・文字種・パスフレーズ
      </h1>

      <div className="mt-8 space-y-8 text-[15px] leading-loose text-ink-soft">
        <p>
          パスワードの強さを決める要素は、突き詰めると「攻撃者が試さなければならない組み合わせの数」です。この記事では、その組み合わせ数を効率よく増やす方法と、現実的な運用のコツを解説します。
        </p>

        <section>
          <h2 className="font-mincho text-xl font-bold text-ink rule-shu">長さは正義</h2>
          <p className="mt-3">
            組み合わせの数は「使える文字の種類 × 長さ」で決まりますが、効き方は長さの方が圧倒的です。英小文字だけでも1文字増えるごとに組み合わせは26倍になります。記号を足して文字種を増やすより、4文字長くする方が強くなることも珍しくありません。重要なアカウントでは16文字以上を目安にし、短くて複雑なものより、長くて単純寄りのものを選ぶ方が実は堅牢です。
          </p>
        </section>

        <section>
          <h2 className="font-mincho text-xl font-bold text-ink rule-shu">使い回しが最大の弱点</h2>
          <p className="mt-3">
            どれだけ強いパスワードでも、複数のサービスで使い回していると、1か所の漏えいがすべてのアカウントの漏えいに直結します（漏れたIDとパスワードの組を他サービスで試す攻撃は、実際に最も多い侵入経路のひとつです）。サービスごとに別のパスワードを作り、パスワード管理アプリに保存する運用が現実解です。
          </p>
        </section>

        <section>
          <h2 className="font-mincho text-xl font-bold text-ink rule-shu">覚える必要があるならパスフレーズ</h2>
          <p className="mt-3">
            管理アプリのマスターパスワードやPCのログインなど、どうしても手で入力するものは、ランダム文字列より「無関係な単語をつないだパスフレーズ」が向いています。たとえば Hammer-Cherry-Jasper-Rabbit のような形式です。人間には覚えやすく、単語数を増やせば組み合わせの数はきちんと増えるため、覚えやすさと強度を両立できます。
          </p>
          <p className="mt-3">
            当サイトの<Link href="/password/" className="text-shu underline underline-offset-2">パスワード生成</Link>は、ランダム文字列とパスフレーズの両方式に対応しており、推定強度もバーで表示します。生成はブラウザ内の暗号学的乱数で行われ、できたパスワードが外部へ送信されることはありません。
          </p>
        </section>

        <section>
          <h2 className="font-mincho text-xl font-bold text-ink rule-shu">まとめ</h2>
          <p className="mt-3">
            強いパスワードの条件は、十分に長いこと、サービスごとに違うこと、そして推測の手がかり（名前や誕生日）を含まないことです。コピペで使うものは長いランダム文字列を、覚えるものはパスフレーズを。この使い分けができれば、パスワード運用はかなり安全になります。
          </p>
        </section>
      </div>

      <p className="mt-10 text-sm">
        <Link href="/column/" className="text-shu underline underline-offset-2">← コラム一覧へ</Link>
      </p>
    </article>
  );
}
