import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "運営者情報",
  description:
    "美容医療の比較・情報サイト「美容すすめ」の運営者情報・編集方針についてご案内しています。当サイトは個人が運営しており、医師による監修は受けていません。",
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
            「美容すすめ」は、個人が運営する美容医療の比較・情報サイトです。医師による監修は受けていません。
            掲載内容は、各クリニックの公式情報や公的機関などの公開されている情報をもとに作成しています。
          </p>
          <p>
            医療ダイエット・脱毛・美容クリニックといった美容医療の情報を、効果・副作用・費用の観点から
            できるだけ中立的に、良い点も気になる点も整理してお伝えすることを目的としています。
            これから美容医療を検討する方が、納得して一歩を踏み出せるようサポートできればと考えています。
          </p>
        </Section>

        {/* 監修・編集方針について */}
        <Section title="編集方針">
          <p>
            「美容すすめ」は、医療情報の正確性を最重視し、すべてのクリニックを公平に評価することを編集方針の柱としています。
            各クリニックの公式発表や一般に公開されている情報・口コミ・カウンセリング内容をもとに、
            編集部が事実関係を確認しながら記事を作成しています。
          </p>
          <ul>
            <li>医療情報の正確性を重視し、誇大表現や誤解を招く比較を避ける</li>
            <li>全クリニックを公平な基準（料金・技術・口コミ・通いやすさ・保証制度）で評価する</li>
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
            およびアフィリエイトプログラム（ASP）を利用しています。各ページには
            「PR・アフィリエイト広告」が含まれ、掲載される広告やリンク（「無料カウンセリングを予約」「公式サイトへ」等）を経由して
            サービスの申込み・契約が行われた場合、当サイトが広告主から紹介料を受け取ることがあります。
          </p>
          <p>
            ただし、紹介料の有無や金額が記事の内容・評価・ランキングの順位に影響を与えないよう努めています。
            ランキングや評価は、料金・使用機器・口コミ・通いやすさ・保証制度などの編集部独自の基準に基づくものであり、
            広告掲載の有無によって順位を操作することはありません。良い点だけでなく、気になる点や「向かない人」も併せて記載しています。
          </p>
          <p>
            広告・アフィリエイトの詳細な取り扱いについては
            <Link href="/privacy" className="text-brand-deep hover:underline">
              プライバシーポリシー
            </Link>
            の「アフィリエイトプログラムについて」もあわせてご確認ください。
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
