import type { Metadata } from "next";
import PageLayout from "../components/PageLayout";

export const metadata: Metadata = {
  title: "プライバシーポリシー | 文字数カウンター",
  description:
    "文字数カウンターのプライバシーポリシーページです。個人情報の取り扱い、Cookieの使用、Google AdSenseについて説明しています。",
};

export default function PrivacyPage() {
  return (
    <PageLayout>
      <article className="prose-custom">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">プライバシーポリシー</h1>
        <p className="text-sm text-gray-500 mb-8">最終更新日：2025年3月19日</p>

        <Section title="はじめに">
          <p>
            文字数カウンター（以下「当サイト」）は、ユーザーのプライバシーを尊重し、個人情報の保護に努めています。
            本プライバシーポリシーでは、当サイトにおける情報の収集・利用方針についてご説明します。
          </p>
        </Section>

        <Section title="収集する情報">
          <p>当サイトでは、以下の情報を収集することがあります。</p>
          <ul>
            <li>アクセスログ（IPアドレス、ブラウザの種類、参照元URL、アクセス日時など）</li>
            <li>Cookieおよびこれに類する技術を通じて収集される情報</li>
            <li>お問い合わせフォームを通じてご入力いただいた情報（氏名・メールアドレス・お問い合わせ内容）</li>
          </ul>
          <p>
            なお、当サイトのテキスト入力エリアに入力されたテキストは、サーバーへ送信・保存されることはなく、
            お使いのブラウザ上のみで処理されます。
          </p>
        </Section>

        <Section title="情報の利用目的">
          <p>収集した情報は、以下の目的で利用します。</p>
          <ul>
            <li>当サイトのサービス提供・維持・改善のため</li>
            <li>ユーザーからのお問い合わせへの対応のため</li>
            <li>不正アクセスや利用規約違反の防止・対応のため</li>
            <li>アクセス解析によるサービス改善のため</li>
          </ul>
        </Section>

        <Section title="Cookieについて">
          <p>
            当サイトでは、Cookie（クッキー）を使用しています。Cookieとは、ウェブサイトがお使いのブラウザに
            保存する小さなデータファイルです。当サイトはCookieを以下の目的で使用しています。
          </p>
          <ul>
            <li>アクセス解析（Google Analytics）</li>
            <li>広告配信（Google AdSense）</li>
          </ul>
          <p>
            ブラウザの設定によりCookieを無効にすることができますが、一部のサービスが正常に動作しない
            場合があります。
          </p>
        </Section>

        <Section title="Google AdSenseについて">
          <p>
            当サイトでは、Google合同会社が提供する広告配信サービス「Google AdSense」を利用しています。
            Google AdSenseは、ユーザーの興味に基づいた広告を表示するためにCookieを使用しています。
          </p>
          <p>
            Google AdSenseにおける広告のカスタマイズはオプトアウトが可能です。詳細は
            <a
              href="https://policies.google.com/technologies/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Googleのポリシーと規約
            </a>
            をご確認ください。
          </p>
        </Section>

        <Section title="Google Analyticsについて">
          <p>
            当サイトでは、アクセス解析のためにGoogle LLCが提供する「Google Analytics」を利用することがあります。
            Google AnalyticsはCookieを使用してアクセス情報を収集しますが、個人を特定する情報は収集しません。
            収集されるデータはGoogleのプライバシーポリシーに基づいて管理されます。
          </p>
        </Section>

        <Section title="第三者への情報提供">
          <p>
            当サイトは、以下の場合を除き、収集した個人情報を第三者に提供・開示しません。
          </p>
          <ul>
            <li>ユーザー本人の同意がある場合</li>
            <li>法令に基づく開示が必要な場合</li>
            <li>人の生命・身体・財産の保護のために必要な場合</li>
          </ul>
        </Section>

        <Section title="個人情報の管理">
          <p>
            当サイトは、収集した個人情報を適切に管理し、不正アクセス・漏洩・改ざんなどの防止に努めます。
            お問い合わせフォームを通じていただいた個人情報は、お問い合わせへの返答のみに使用し、
            目的外には使用しません。
          </p>
        </Section>

        <Section title="リンク先のサイトについて">
          <p>
            当サイトに掲載されているリンク先の外部サイトにおける個人情報の取り扱いについては、
            当サイトは責任を負いません。各リンク先サイトのプライバシーポリシーをご確認ください。
          </p>
        </Section>

        <Section title="プライバシーポリシーの変更">
          <p>
            当サイトは、必要に応じて本プライバシーポリシーを変更することがあります。
            変更後のプライバシーポリシーは、本ページに掲載した時点から効力を生じるものとします。
            定期的にご確認いただくことをお勧めします。
          </p>
        </Section>

        <Section title="お問い合わせ">
          <p>
            本プライバシーポリシーに関するお問い合わせは、下記までご連絡ください。
          </p>
          <ul>
            <li>運営者：Kunimoto Ikkei</li>
            <li>
              メールアドレス：
              <a href="mailto:dora06290@gmail.com" className="text-blue-600 hover:underline">
                dora06290@gmail.com
              </a>
            </li>
          </ul>
        </Section>
      </article>
    </PageLayout>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="text-lg font-bold text-gray-800 mb-3 pb-2 border-b border-gray-200">
        {title}
      </h2>
      <div className="text-gray-700 leading-relaxed space-y-3 text-sm sm:text-base [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1 [&_a]:text-blue-600 [&_a]:hover:underline">
        {children}
      </div>
    </section>
  );
}
