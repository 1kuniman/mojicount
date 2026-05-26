import Link from "next/link";
import { primaryCategories } from "@/lib/categories";
import MedicalDisclaimer from "./MedicalDisclaimer";

const siteLinks = [
  { href: "/about", label: "運営者情報" },
  { href: "/privacy", label: "プライバシーポリシー" },
  { href: "/disclaimer", label: "免責事項" },
  { href: "/contact", label: "お問い合わせ" },
];

export default function SiteFooter() {
  return (
    <footer className="mt-auto">
      {/* 全ページ共通の医療免責 */}
      <MedicalDisclaimer variant="bar" />

      <div className="bg-white border-t border-pink-100">
        <div className="max-w-5xl mx-auto px-4 py-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2 sm:col-span-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">🌸</span>
                <span className="font-bold text-pink-600">美容すすめ</span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                医療ダイエット・脱毛・美容クリニックを本音で比較する美容医療メディアです。
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">カテゴリ</h3>
              <ul className="space-y-2 text-sm text-gray-500">
                {primaryCategories.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/category/${c.slug}`} className="hover:text-pink-500 transition-colors">
                      {c.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/ranking" className="hover:text-pink-500 transition-colors">
                    ランキング
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">サイト情報</h3>
              <ul className="space-y-2 text-sm text-gray-500">
                {siteLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="hover:text-pink-500 transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">コンテンツ</h3>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>
                  <Link href="/articles" className="hover:text-pink-500 transition-colors">
                    記事一覧
                  </Link>
                </li>
                <li>
                  <Link href="/category/guide" className="hover:text-pink-500 transition-colors">
                    初心者ガイド
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <p className="text-center text-xs text-gray-400 border-t border-pink-50 pt-6">
            &copy; {new Date().getFullYear()} 美容すすめ｜美容医療比較メディア
          </p>
        </div>
      </div>
    </footer>
  );
}
