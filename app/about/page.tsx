import type { Metadata } from "next";
import Link from "next/link";
import { authors } from "@/lib/authors";
import { AuthorCard } from "../components/AuthorBadge";

export const metadata: Metadata = {
  title: "運営者情報",
  description:
    "美容医療比較メディア「美容すすめ」の運営者情報・編集部とライターの紹介・監修と編集方針についてご案内しています。",
  alternates: { canonical: "/about" },
};

const rows: { label: string; value: React.ReactNode }[] = [
  { label: "サイト名", value: "美容すすめ" },
  { label: "サイトURL", value: "https://www.mojimojicount.com" },
  { label: "運営者", value: "Kunimoto Ikkei" },
  {
    label: "お問い合わせ",
    value: (
      <a href="mailto:dora06290@gmail.com" className="text-brand-deep hover:underline">
        dora06290@gmail.com
      </a>
    ),
  },
  { label: "ジャンル", value: "美容医療（医療ダイエット・脱毛・美容クリニック）の比較情報" },
];

export default function AboutPage() {
  return (
    <main className="flex-1">
      <article className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-gray-800 mb-8">運営者情報</h1>

        <div className="rounded-2xl border border-brand-light/40 overflow-hidden mb-10">
          <table className="w-full text-sm sm:text-base">
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-cream" : "bg-white"}>
                  <th className="text-left px-5 py-4 font-medium text-gray-600 w-32 sm:w-44 border-b border-brand-light/20 align-top">
                    {row.label}
                  </th>
                  <td className="px-5 py-4 text-gray-800 border-b border-brand-light/20">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Section title="サイトについて">
          <p>
            「美容すすめ」は、医療ダイエット・脱毛・美容クリニックといった美容医療の情報を、
            効果・副作用・費用の観点からできるだけ中立的に比較・解説するメディアです。
            これから美容医療を検討する方が、納得して一歩を踏み出せるようサポートすることを目的としています。
          </p>
        </Section>

        {/* 編集部・ライター紹介 */}
        <Section title="編集部・ライター紹介">
          <p>当サイトの記事は、以下の編集部・ライターが執筆・編集しています。</p>
          <div className="not-prose space-y-4 mt-4">
            {authors.map((a) => (
              <AuthorCard key={a.id} id={a.id} />
            ))}
          </div>
        </Section>

        {/* 監修・編集方針について */}
        <Section title="当サイトの監修・編集方針について">
          <p>
            当サイトの記事は、各クリニックの公式発表や一般に公開されている情報をもとに、
            編集部が事実関係を確認しながら作成しています。美容医療は健康にかかわる分野であるため、
            次の方針を大切にしています。
          </p>
          <ul>
            <li>効果やメリットだけでなく、リスク・副作用・ダウンタイム・費用も併せて記載する</li>
            <li>料金や施術内容は変動するため「目安」として示し、最新情報は公式での確認を促す</li>
            <li>ランキングや比較は編集部独自の基準によるものであることを明記する</li>
            <li>診断・治療を行うものではなく、最終判断は必ず医師に相談いただくようご案内する</li>
          </ul>
          <p>
            なお、本サイトの記事は医師による医療監修を受けたものではありません。個別の症状や治療の適否については、
            必ず医療機関で医師の診察を受けてご判断ください。今後、専門家による監修体制の導入を検討しています。
          </p>
        </Section>

        <Section title="広告・アフィリエイトについて">
          <p>
            当サイトは、Google AdSense をはじめとする第三者配信の広告サービス、
            およびアフィリエイトプログラムを利用しています。掲載される広告やリンクを経由して
            サービスの申込みが行われた場合、当サイトが紹介料を受け取ることがあります。
            ただし、紹介料の有無が記事の内容や評価に影響を与えないよう努めています。
          </p>
        </Section>

        <Section title="免責事項">
          <p>
            当サイトは医療行為を行うものではなく、掲載情報は一般的な参考情報です。
            効果・副作用には個人差があり、内容の正確性・完全性を保証するものではありません。
            詳しくは
            <Link href="/disclaimer" className="text-brand-deep hover:underline">
              免責事項
            </Link>
            をご覧ください。
          </p>
        </Section>

        <div className="bg-brand-light/15 border border-brand-light/40 rounded-2xl p-6 text-center">
          <p className="text-gray-700 text-sm mb-3">
            サイトに関するご意見・ご要望はお気軽にお寄せください。
          </p>
          <Link
            href="/contact"
            className="inline-block bg-gradient-to-r from-brand to-brand-deep text-white text-sm font-bold px-6 py-2.5 rounded-full hover:shadow-md transition-all"
          >
            お問い合わせはこちら
          </Link>
        </div>
      </article>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="font-serif text-lg font-bold text-gray-800 mb-3 pb-2 border-b-2 border-brand-light/50">
        {title}
      </h2>
      <div className="text-gray-700 leading-relaxed space-y-3 text-sm sm:text-base [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1.5">
        {children}
      </div>
    </section>
  );
}
