import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "../components/PageLayout";

export const metadata: Metadata = {
  title: "運営者情報 | 文字数カウンター",
  description:
    "文字数カウンターの運営者情報ページです。サイトの運営者・目的・連絡先についてご案内しています。",
};

export default function AboutPage() {
  return (
    <PageLayout>
      <article>
        <h1 className="text-2xl font-bold text-gray-900 mb-8">運営者情報</h1>

        {/* 運営者情報テーブル */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-10">
          <table className="w-full text-sm sm:text-base">
            <tbody>
              {[
                { label: "サイト名", value: "文字数カウンター - 無料テキスト解析ツール" },
                { label: "サイトURL", value: "https://mojicount.vercel.app" },
                { label: "運営者名", value: "Kunimoto Ikkei" },
                {
                  label: "メールアドレス",
                  value: (
                    <a href="mailto:dora06290@gmail.com" className="text-blue-600 hover:underline">
                      dora06290@gmail.com
                    </a>
                  ),
                },
                { label: "開設年", value: "2025年" },
              ].map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <th className="text-left px-5 py-4 font-medium text-gray-600 w-36 sm:w-44 border-b border-gray-100 align-top">
                    {row.label}
                  </th>
                  <td className="px-5 py-4 text-gray-800 border-b border-gray-100">
                    {row.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* サイト概要 */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-3 pb-2 border-b border-gray-200">
            サイトについて
          </h2>
          <div className="text-gray-700 leading-relaxed space-y-3 text-sm sm:text-base">
            <p>
              「文字数カウンター」は、テキストの文字数・単語数・行数をリアルタイムで計測できる
              無料のオンラインツールです。
            </p>
            <p>
              ブログ記事・SNS投稿・レポート・メールなど、さまざまな場面での文字数確認にご活用いただけます。
              入力されたテキストはサーバーへ送信されず、すべてブラウザ上で処理されるため、
              機密性の高い文章でも安心してご利用いただけます。
            </p>
            <p>
              スマートフォン・タブレット・PCなど、あらゆるデバイスに対応したレスポンシブデザインを採用しています。
            </p>
          </div>
        </section>

        {/* 主な機能 */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-3 pb-2 border-b border-gray-200">
            主な機能
          </h2>
          <ul className="space-y-2 text-sm sm:text-base text-gray-700">
            {[
              "文字数のリアルタイム計測（スペース込み・スペース除く）",
              "単語数のリアルタイム計測",
              "行数のリアルタイム計測",
              "UTF-8バイト数の表示",
              "テキストのコピー機能",
              "スマートフォン対応のレスポンシブデザイン",
              "完全無料・会員登録不要",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-blue-500 mt-0.5 flex-shrink-0">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 免責事項 */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-3 pb-2 border-b border-gray-200">
            免責事項
          </h2>
          <div className="text-gray-700 leading-relaxed space-y-3 text-sm sm:text-base">
            <p>
              当サイトの情報は可能な限り正確を期していますが、その正確性・完全性を保証するものではありません。
              当サイトの利用によって生じたいかなる損害についても、運営者は責任を負いかねます。
            </p>
            <p>
              当サイトは予告なく内容の変更・追加・削除、またはサービスの停止・終了をする場合があります。
              あらかじめご了承ください。
            </p>
          </div>
        </section>

        {/* お問い合わせリンク */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 text-center">
          <p className="text-gray-700 text-sm mb-3">
            サイトに関するご意見・ご要望・ご質問はお気軽にどうぞ。
          </p>
          <Link
            href="/contact"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-colors"
          >
            お問い合わせはこちら
          </Link>
        </div>
      </article>
    </PageLayout>
  );
}
