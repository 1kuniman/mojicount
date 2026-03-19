import Link from "next/link";

interface PageLayoutProps {
  children: React.ReactNode;
}

const navLinks = [
  { href: "/", label: "ホーム" },
  { href: "/about", label: "運営者情報" },
  { href: "/privacy", label: "プライバシーポリシー" },
  { href: "/contact", label: "お問い合わせ" },
];

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* ヘッダー */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="bg-blue-500 text-white w-9 h-9 rounded-lg flex items-center justify-center text-lg font-bold flex-shrink-0">
                文
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                  文字数カウンター
                </div>
                <div className="text-xs text-gray-500">無料テキスト解析ツール</div>
              </div>
            </Link>
            <nav className="flex gap-4 text-sm text-gray-600 flex-wrap">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-blue-600 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-8 sm:py-12">
        {children}
      </main>

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
            &copy; {new Date().getFullYear()} 文字数カウンター
          </p>
        </div>
      </footer>
    </div>
  );
}
