import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: "もじもじツールのプライバシーポリシー。入力データの扱い、Cookie、広告配信について説明します。",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <h1 className="font-mincho text-3xl font-bold text-ink">プライバシーポリシー</h1>

      <div className="mt-8 space-y-10 text-[15px] leading-relaxed text-ink-soft">
        <section>
          <h2 className="font-mincho text-xl font-bold text-ink rule-shu">入力データの取り扱い</h2>
          <p className="mt-3">
            当サイトの各ツール（文字数カウント、変換、整形、QRコード生成、パスワード生成など）は、すべてお使いのブラウザ内で処理を行います。入力されたテキストやファイル、生成されたパスワード等が当サイトのサーバーへ送信・保存されることはありません。
          </p>
        </section>

        <section>
          <h2 className="font-mincho text-xl font-bold text-ink rule-shu">Cookie・ローカルストレージ</h2>
          <p className="mt-3">
            当サイトは、表示テーマ（ライト／ダーク）の設定を保存するためにブラウザのローカルストレージを使用します。これは表示設定の記憶のみに用いられ、個人を特定する情報は含まれません。
          </p>
        </section>

        <section>
          <h2 className="font-mincho text-xl font-bold text-ink rule-shu">広告配信について</h2>
          <p className="mt-3">
            当サイトでは、第三者配信の広告サービス「Google AdSense」を利用する場合があります。Googleなどの第三者配信事業者はCookieを使用し、ユーザーの当サイトや他サイトへの過去のアクセス情報に基づいて広告を配信することがあります。パーソナライズ広告に用いられるCookieは、<a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer" className="text-shu underline underline-offset-2">Googleの広告設定</a>で無効にできます。詳しくは<a href="https://policies.google.com/technologies/ads?hl=ja" target="_blank" rel="noopener noreferrer" className="text-shu underline underline-offset-2">Googleのポリシーと規約</a>をご覧ください。
          </p>
        </section>

        <section>
          <h2 className="font-mincho text-xl font-bold text-ink rule-shu">アクセス解析について</h2>
          <p className="mt-3">
            当サイトは、検索エンジンからの表示状況を把握するために Google Search Console を利用しています。これにより個人が特定されることはありません。
          </p>
        </section>

        <section>
          <h2 className="font-mincho text-xl font-bold text-ink rule-shu">免責事項</h2>
          <p className="mt-3">
            各ツールの計算・変換結果については正確性の確保に努めていますが、その完全性・正確性を保証するものではありません。当サイトの利用によって生じたいかなる損害についても、運営者は責任を負いかねます。重要な用途では、結果を必ずご自身でご確認ください。
          </p>
        </section>

        <section>
          <h2 className="font-mincho text-xl font-bold text-ink rule-shu">ポリシーの変更</h2>
          <p className="mt-3">
            本ポリシーの内容は、法令の変更やサービス内容の変更に応じて、予告なく改定されることがあります。改定後の内容は本ページに掲載した時点で効力を生じるものとします。
          </p>
        </section>
      </div>
    </div>
  );
}
