import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "免責事項",
  description:
    "美容すすめの免責事項です。当サイトに掲載する医療・美容情報の取り扱い、広告・アフィリエイト、外部リンクについての方針を記載しています。",
  alternates: { canonical: "/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <main className="flex-1">
      <article className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-2">免責事項</h1>
        <p className="text-sm text-gray-400 mb-8">最終更新日：2026年5月27日</p>

        <div className="rounded-2xl border-2 border-pink-200 bg-pink-50 p-5 mb-10">
          <p className="font-bold text-pink-700 mb-2">⚠ 医療情報に関する重要なお知らせ</p>
          <p className="text-sm text-gray-700 leading-7">
            当サイトは医療機関ではなく、医療行為・診断・治療を行うものではありません。
            掲載している医療・美容に関する情報は一般的な参考情報であり、特定の症状に対する
            診断や、特定の治療・施術・医薬品の使用を推奨・保証するものではありません。
            治療や施術、医薬品の使用にあたっては、必ず医師など専門家の診察・指導を受け、
            ご自身の判断と責任のもとでご検討ください。
          </p>
        </div>

        <Section title="情報の正確性について">
          <p>
            当サイトのコンテンツは、可能な限り正確な情報の掲載に努めていますが、
            その正確性・完全性・最新性・有用性を保証するものではありません。
            医療・美容に関する情報や料金・サービス内容は変更されることがあります。
            必ず各クリニック・サービスの公式情報をご確認ください。
          </p>
        </Section>

        <Section title="効果・副作用の個人差について">
          <p>
            美容医療・脱毛・医療ダイエットなどの効果、副作用、ダウンタイム、リスクには
            大きな個人差があります。当サイトで紹介する内容は一例であり、すべての方に
            同様の結果を保証するものではありません。
          </p>
        </Section>

        <Section title="ランキング・比較について">
          <p>
            当サイトに掲載するランキングや比較は、編集部独自の基準に基づいて構成したものです。
            掲載しているサービス名・料金・評価は、実在する特定クリニックの公式情報そのものではなく、
            比較の構成例を含みます。特定のサービスの優劣を断定・保証するものではありません。
          </p>
        </Section>

        <Section title="広告・アフィリエイトについて">
          <p>
            当サイトは、Google AdSense などの第三者配信広告およびアフィリエイトプログラムを
            利用しています。これらの広告・リンクを通じて商品やサービスの申込みが行われた場合、
            当サイトが報酬を受け取ることがあります。
          </p>
        </Section>

        <Section title="外部リンクについて">
          <p>
            当サイトからリンクする外部サイトの内容、およびそこで提供されるサービスについて、
            当サイトは一切の責任を負いません。各リンク先の利用規約・プライバシーポリシーを
            ご確認のうえご利用ください。
          </p>
        </Section>

        <Section title="損害等の責任について">
          <p>
            当サイトの情報を利用することによって生じたいかなる損害についても、
            運営者は責任を負いかねます。あらかじめご了承ください。
          </p>
        </Section>

        <Section title="お問い合わせ">
          <p>
            本免責事項に関するお問い合わせは、
            <Link href="/contact" className="text-pink-600 hover:underline">
              お問い合わせページ
            </Link>
            よりご連絡ください。
          </p>
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
      <div className="text-gray-700 leading-7 space-y-3 text-sm sm:text-base">{children}</div>
    </section>
  );
}
