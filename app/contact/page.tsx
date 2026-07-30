import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description: "もじもじツールへのお問い合わせ方法。",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <h1 className="font-mincho text-3xl font-bold text-ink">お問い合わせ</h1>

      <div className="mt-8 space-y-10 text-[15px] leading-relaxed text-ink-soft">
        <section>
          <p>
            当サイトへのご意見・ご要望・不具合のご報告は、以下の方法で受け付けています。個人運営のため返信にお時間をいただく場合がありますが、いただいた内容はすべて確認しています。
          </p>
        </section>

        <section>
          <h2 className="font-mincho text-xl font-bold text-ink rule-shu">X（旧Twitter）</h2>
          <p className="mt-3">
            運営者アカウント <a href="https://x.com/ikkun_dev" target="_blank" rel="noopener noreferrer" className="text-shu underline underline-offset-2">@ikkun_dev</a> への返信またはダイレクトメッセージでご連絡ください。ツールの改善要望は特に歓迎です。実際にユーザーの声から機能を追加した例もあります。
          </p>
        </section>

        <section>
          <h2 className="font-mincho text-xl font-bold text-ink rule-shu">お問い合わせの例</h2>
          <p className="mt-3">
            「このツールでこんな機能がほしい」「計算結果がおかしい気がする」「表示が崩れている」など、どんな内容でも構いません。広告掲載や取材等のご連絡も同アカウントで受け付けています。
          </p>
        </section>
      </div>
    </div>
  );
}
