import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "二段階認証とは——パスワードだけに頼らない理由",
  description:
    "二段階認証（2FA）の仕組みと、SMS認証・認証アプリ・セキュリティキーの違いを解説。パスワード管理と合わせて設定したい理由も紹介します。",
  alternates: { canonical: "https://www.mojimojicount.com/column/two-factor-auth/" },
};

export default function Page() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-12">
      <p className="text-xs text-ink-faint font-mono tracking-widest">COLUMN</p>
      <h1 className="mt-2 font-mincho text-2xl sm:text-3xl font-bold text-ink leading-snug">
        二段階認証とは——パスワードだけに頼らない理由
      </h1>

      <div className="mt-8 space-y-8 text-[15px] leading-loose text-ink-soft">
        <p>
          どれだけ強いパスワードを設定しても、それが漏れてしまえば意味がありません。二段階認証（2FA / 多要素認証）は、この「パスワードが漏れた後」の被害を防ぐための、もう一段の壁です。
        </p>

        <section>
          <h2 className="font-mincho text-xl font-bold text-ink rule-shu">「知っているもの」と「持っているもの」</h2>
          <p className="mt-3">
            認証の要素は大きく3種類に分けられます。パスワードのような「本人だけが知っている情報」、スマートフォンやセキュリティキーのような「本人だけが持っているもの」、指紋や顔のような「本人自身の特徴」です。二段階認証は、このうち異なる種類を2つ組み合わせる仕組みです。パスワード（知っているもの）に加えて、スマホに届く確認コード（持っているもの）を要求すれば、パスワードだけが漏れても、攻撃者はログインできません。
          </p>
        </section>

        <section>
          <h2 className="font-mincho text-xl font-bold text-ink rule-shu">方式による強さの違い</h2>
          <p className="mt-3">
            もっとも手軽なのはSMSに届くコードを入力する方式ですが、電話番号を乗っ取る「SIMスワップ」という手口があるため、強度としては中程度です。より安全なのは、Google AuthenticatorやMicrosoft Authenticatorのような認証アプリで、端末内でコードを生成するため通信を横取りされる心配がありません。さらに強固なのが、物理的なセキュリティキー（USBやNFCで認証するデバイス）で、フィッシングサイトへの入力自体を技術的に防げる方式です。すべてのサービスがすべての方式に対応しているわけではないため、対応状況に応じて選ぶことになります。
          </p>
        </section>

        <section>
          <h2 className="font-mincho text-xl font-bold text-ink rule-shu">どこから設定すべきか</h2>
          <p className="mt-3">
            全部のサービスに一度に設定するのは大変なので、優先順位をつけるのが現実的です。まず、他のサービスの復旧に使われるメールアカウント。次に、決済情報が紐づくサービス（ネットバンキング、通販サイト）。そして、SNSアカウント。この順で設定していくと、被害が連鎖するリスクを効率よく減らせます。
          </p>
          <p className="mt-3">
            なお、二段階認証は<Link href="/column/password-reuse/" className="text-shu underline underline-offset-2">パスワードの使い回し</Link>を許容する理由にはなりません。あくまで最後の砦であって、最初の壁であるパスワード自体を強く保つ重要性は変わりません。当サイトの<Link href="/password/" className="text-shu underline underline-offset-2">パスワード生成</Link>では、強いパスワードの生成に加えて、今使っているパスワードの強度チェックもできます。
          </p>
        </section>
      </div>

      <p className="mt-10 text-sm">
        <Link href="/column/" className="text-shu underline underline-offset-2">← コラム一覧へ</Link>
      </p>
    </article>
  );
}
