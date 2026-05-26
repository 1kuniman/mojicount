import type { Metadata } from "next";
import ContactForm from "../components/ContactForm";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description:
    "美容すすめへのお問い合わせページです。ご意見・ご要望・掲載に関するお問い合わせなどはこちらからご連絡ください。",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main className="flex-1">
      <article className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-2">お問い合わせ</h1>
        <p className="text-gray-500 text-sm mb-8 leading-relaxed">
          ご意見・ご要望・掲載に関するご相談などは、下記フォームまたはメールにてご連絡ください。
          内容を確認のうえ、順次ご返信いたします。
        </p>

        <div className="bg-pink-50 border border-pink-100 rounded-2xl p-4 mb-8 flex items-center gap-3 text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span className="text-gray-700">
            メールでのお問い合わせ：
            <a href="mailto:dora06290@gmail.com" className="text-pink-600 hover:underline font-medium ml-1">
              dora06290@gmail.com
            </a>
          </span>
        </div>

        <ContactForm />

        <div className="mt-8 bg-pink-50/60 border border-pink-100 rounded-2xl p-5 text-sm text-gray-600 space-y-2">
          <h2 className="font-semibold text-gray-700">お問い合わせの前にご確認ください</h2>
          <ul className="space-y-1.5 list-disc pl-5">
            <li>医療・症状に関する個別のご相談にはお答えできません。医療機関へご相談ください。</li>
            <li>返信にお時間をいただく場合がございます。あらかじめご了承ください。</li>
            <li>いただいた個人情報は、お問い合わせへの返答のみに使用します。</li>
          </ul>
        </div>
      </article>
    </main>
  );
}
