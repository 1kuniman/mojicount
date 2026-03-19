import type { Metadata } from "next";
import Link from "next/link";
import CharacterCounter from "./components/CharacterCounter";
import AdSpace from "./components/AdSpace";

export const metadata: Metadata = {
  title: "文字数カウンター - 無料テキスト解析ツール",
  description:
    "テキストの文字数・単語数・行数を瞬時に計測できる無料のオンラインツールです。コピー機能付きでスマホにも対応。ブログ・SNS・レポートなどの文字数確認にご活用ください。",
};

const navLinks = [
  { href: "/about", label: "運営者情報" },
  { href: "/privacy", label: "プライバシーポリシー" },
  { href: "/contact", label: "お問い合わせ" },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* ヘッダー */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="bg-blue-500 text-white w-9 h-9 rounded-lg flex items-center justify-center text-lg font-bold flex-shrink-0">
                文
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">
                  文字数カウンター
                </h1>
                <p className="text-xs text-gray-500">無料テキスト解析ツール</p>
              </div>
            </div>
            <nav className="flex gap-4 text-sm text-gray-600 flex-wrap">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-blue-600 transition-colors">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* ヘッダー下 広告スペース */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <AdSpace label="スポンサー" />
        </div>
      </div>

      {/* メインコンテンツ */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6 sm:py-8">
        <div className="mb-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-700 mb-1">
            テキストを入力して文字数を確認
          </h2>
          <p className="text-sm text-gray-500">
            文字数・単語数・行数・バイト数をリアルタイムで計測します。ブログ、SNS投稿、レポート作成などにご活用ください。
          </p>
        </div>

        <CharacterCounter />

        {/* 使い方ガイド */}
        <section className="mt-10 bg-white border border-gray-200 rounded-xl p-5 sm:p-6">
          <h3 className="text-base font-semibold text-gray-800 mb-4">使い方</h3>
          <ol className="space-y-3 text-sm text-gray-600">
            <li className="flex gap-3">
              <span className="bg-blue-100 text-blue-700 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</span>
              <span>上のテキストエリアに文章を入力またはペーストします。</span>
            </li>
            <li className="flex gap-3">
              <span className="bg-blue-100 text-blue-700 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</span>
              <span>文字数・単語数・行数・バイト数がリアルタイムで表示されます。</span>
            </li>
            <li className="flex gap-3">
              <span className="bg-blue-100 text-blue-700 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</span>
              <span>「テキストをコピー」ボタンでクリップボードにコピーできます。</span>
            </li>
          </ol>
        </section>

        {/* よくある用途 */}
        <section className="mt-6 bg-white border border-gray-200 rounded-xl p-5 sm:p-6">
          <h3 className="text-base font-semibold text-gray-800 mb-4">よくある使用シーン</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: "📝", label: "ブログ記事" },
              { icon: "📱", label: "SNS投稿" },
              { icon: "📄", label: "レポート" },
              { icon: "✉️", label: "メール作成" },
            ].map((item) => (
              <div key={item.label} className="bg-gray-50 rounded-lg p-3 text-center text-sm text-gray-600">
                <div className="text-2xl mb-1">{item.icon}</div>
                {item.label}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* コンテンツ下 広告スペース */}
      <div className="bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <AdSpace label="スポンサー" />
        </div>
      </div>

      {/* フッター */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-4xl mx-auto px-4 py-5">
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 mb-3">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-blue-600 transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} 文字数カウンター - 無料テキスト解析ツール
          </p>
        </div>
      </footer>
    </div>
  );
}
