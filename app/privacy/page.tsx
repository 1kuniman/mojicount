import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description:
    "美容すすめのプライバシーポリシーです。個人情報の取り扱い、Cookieの使用、Google AdSense・Google Analyticsについて説明しています。",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="flex-1">
      <article className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-2">
          プライバシーポリシー
        </h1>
        <p className="text-sm text-gray-400 mb-8">最終更新日：2026年5月27日</p>

        <Section title="はじめに">
          <p>
            美容すすめ（以下「当サイト」）は、ユーザーのプライバシーを尊重し、個人情報の保護に努めます。
            本ポリシーでは、当サイトにおける情報の収集・利用方針について説明します。
          </p>
        </Section>

        <Section title="収集する情報">
          <p>当サイトでは、以下の情報を収集することがあります。</p>
          <ul>
            <li>アクセスログ（IPアドレス、ブラウザの種類、参照元URL、アクセス日時など）</li>
            <li>Cookieおよびこれに類する技術を通じて収集される情報</li>
            <li>お問い合わせ時にご入力いただいた情報（氏名・メールアドレス・お問い合わせ内容）</li>
          </ul>
        </Section>

        <Section title="情報の利用目的">
          <ul>
            <li>サービスの提供・維持・改善のため</li>
            <li>お問い合わせへの対応のため</li>
            <li>アクセス解析によるコンテンツ改善のため</li>
            <li>不正アクセス・規約違反の防止のため</li>
          </ul>
        </Section>

        <Section title="Google AdSenseについて">
          <p>
            当サイトでは、第三者配信の広告サービス「Google AdSense」を利用しています。
            Googleなどの第三者配信事業者はCookieを使用して、ユーザーの過去のアクセス情報に基づいた広告を表示します。
            Cookieを無効にする設定や、パーソナライズ広告の無効化については、
            <a
              href="https://policies.google.com/technologies/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-600 hover:underline"
            >
              Googleの広告ポリシー
            </a>
            をご確認ください。
          </p>
        </Section>

        <Section title="アフィリエイトプログラムについて">
          <p>
            当サイトは、各種アフィリエイトプログラム（ASP）および広告主のアフィリエイト広告に参加しています。
            記事内の「無料カウンセリングを予約」「公式サイトへ」などのボタン・リンクや、ランキング・比較表に掲載している
            クリニック・サービスへのリンクには、アフィリエイト広告（プロモーション）が含まれます。
          </p>
          <p>
            ユーザーが当サイトのリンクを経由して各サービスの申込み・契約・購入等を行った場合、
            当サイトは広告主または広告配信事業者から成果報酬（紹介料）を受け取ることがあります。
            この紹介料は、サイトの運営・コンテンツの維持改善のために利用されます。
          </p>
          <p>
            なお、紹介料の有無・金額が記事の内容、評価、ランキングの順位に影響することはありません。
            当サイトのランキング・評価は、料金・使用機器・口コミ・通いやすさ・保証制度などの編集部独自の基準に基づき、
            良い点だけでなく気になる点も正直に記載することを編集方針としています。
          </p>
          <p>
            各ページには「PR・アフィリエイト広告を含みます」と表示しています。掲載している料金・サービス内容は
            変更されることがあるため、最新かつ正確な情報は必ず各公式サイトでご確認ください。
          </p>
        </Section>

        <Section title="Google Analyticsについて">
          <p>
            当サイトでは、アクセス解析のため「Google Analytics」を利用することがあります。
            Cookieを使用してアクセス情報を収集しますが、個人を特定する情報は含まれません。
            収集データはGoogleのプライバシーポリシーに基づいて管理されます。
          </p>
        </Section>

        <Section title="Cookieの無効化">
          <p>
            ブラウザの設定によりCookieを無効にすることができます。ただし、一部の機能が
            正常に動作しなくなる場合があります。
          </p>
        </Section>

        <Section title="第三者への提供">
          <p>当サイトは、以下の場合を除き、個人情報を第三者へ提供しません。</p>
          <ul>
            <li>ご本人の同意がある場合</li>
            <li>法令に基づく場合</li>
            <li>人の生命・身体・財産の保護のために必要な場合</li>
          </ul>
        </Section>

        <Section title="プライバシーポリシーの変更">
          <p>
            本ポリシーは、必要に応じて変更されることがあります。変更後の内容は、
            本ページに掲載した時点から効力を生じるものとします。
          </p>
        </Section>

        <Section title="お問い合わせ先">
          <ul>
            <li>運営者：Kunimoto Ikkei</li>
            <li>
              メール：
              <a href="mailto:dora06290@gmail.com" className="text-pink-600 hover:underline">
                dora06290@gmail.com
              </a>
            </li>
          </ul>
        </Section>
      </article>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="text-lg font-bold text-gray-800 mb-3 pb-2 border-b-2 border-pink-200">
        {title}
      </h2>
      <div className="text-gray-700 leading-7 space-y-3 text-sm sm:text-base [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1.5 [&_a]:break-words">
        {children}
      </div>
    </section>
  );
}
