import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "運営者情報",
  description:
    "美容医療比較メディア「美容すすめ」の運営者情報です。サイトの運営方針・編集方針・連絡先についてご案内しています。",
  alternates: { canonical: "/about" },
};

const rows: { label: string; value: React.ReactNode }[] = [
  { label: "サイト名", value: "美容すすめ" },
  { label: "サイトURL", value: "https://www.mojimojicount.com" },
  { label: "運営者", value: "Kunimoto Ikkei" },
  {
    label: "お問い合わせ",
    value: (
      <a href="mailto:dora06290@gmail.com" className="text-pink-600 hover:underline">
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
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-8">運営者情報</h1>

        <div className="rounded-2xl border border-pink-100 overflow-hidden mb-10">
          <table className="w-full text-sm sm:text-base">
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-pink-50/50" : "bg-white"}>
                  <th className="text-left px-5 py-4 font-medium text-gray-600 w-32 sm:w-44 border-b border-pink-50 align-top">
                    {row.label}
                  </th>
                  <td className="px-5 py-4 text-gray-800 border-b border-pink-50">{row.value}</td>
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

        <Section title="編集方針">
          <ul>
            <li>メリットだけでなく、リスク・副作用・費用も併せてお伝えします。</li>
            <li>医療に関する情報は、一般的に公開されている情報をもとに分かりやすく整理します。</li>
            <li>ランキングや比較は編集部の基準に基づくものであり、特定の医療機関の優劣を保証するものではありません。</li>
            <li>最終的な判断は必ず医師の診察を受けたうえで行っていただくようご案内します。</li>
          </ul>
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
            <Link href="/disclaimer" className="text-pink-600 hover:underline">
              免責事項
            </Link>
            をご覧ください。
          </p>
        </Section>

        <div className="bg-pink-50 border border-pink-100 rounded-2xl p-6 text-center">
          <p className="text-gray-700 text-sm mb-3">
            サイトに関するご意見・ご要望はお気軽にお寄せください。
          </p>
          <Link
            href="/contact"
            className="inline-block bg-gradient-to-r from-pink-400 to-rose-400 text-white text-sm font-bold px-6 py-2.5 rounded-full hover:shadow-md transition-all"
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
      <h2 className="text-lg font-bold text-gray-800 mb-3 pb-2 border-b-2 border-pink-200">
        {title}
      </h2>
      <div className="text-gray-700 leading-relaxed space-y-3 text-sm sm:text-base [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1.5">
        {children}
      </div>
    </section>
  );
}
