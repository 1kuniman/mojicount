import Link from "next/link";
import { TOOLS } from "@/lib/tools";

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-5">
      {/* Hero */}
      <section className="pt-16 pb-12 sm:pt-24 sm:pb-16">
        <p className="text-shu font-mono text-sm tracking-widest mb-4">BROWSER-ONLY TEXT TOOLS</p>
        <h1 className="font-mincho text-4xl sm:text-6xl font-bold leading-[1.1] tracking-tight text-ink">
          文章の細かい作業を、
          <br />
          ひと手間で終わらせる。
        </h1>
        <p className="mt-6 text-ink-soft leading-relaxed max-w-xl text-[15px]">
          文字数のカウント、全角半角の変換、行の整形——。地味だけど何度もやる作業を、貼り付けた瞬間に片づけます。すべてブラウザの中だけで動くので、入力した文章がどこかへ送られることはありません。
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/count/"
            className="px-5 py-3 rounded-lg bg-ink text-paper font-medium hover:bg-shu-deep transition-colors"
          >
            文字数を数える
          </Link>
          <Link
            href="/convert/"
            className="px-5 py-3 rounded-lg border border-line text-ink hover:border-shu hover:text-shu transition-colors font-medium"
          >
            変換ツールを見る
          </Link>
        </div>
      </section>

      {/* Tool grid */}
      <section className="pb-10">
        <h2 className="font-mincho text-xl font-bold text-ink rule-shu mb-6">ツール一覧</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {TOOLS.map((t) => (
            <Link
              key={t.slug}
              href={t.href}
              className="group block rounded-xl border border-line bg-paper p-5 shadow-card hover:-translate-y-0.5 hover:border-shu/50 transition-all"
            >
              <span className="grid place-items-center w-10 h-10 rounded-lg bg-paper-deep text-ink font-mincho text-xl group-hover:bg-shu group-hover:text-paper transition-colors">
                {t.mark}
              </span>
              <h3 className="mt-4 font-bold text-ink text-lg">{t.title}</h3>
              <p className="mt-1.5 text-sm text-ink-soft leading-relaxed">{t.description}</p>
              <span className="mt-4 inline-block text-sm font-medium text-shu">
                開く →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust row */}
      <section className="py-12 border-t border-line grid gap-6 sm:grid-cols-3 text-sm">
        <div>
          <div className="font-mincho text-lg font-bold text-ink">送信しない</div>
          <p className="mt-1 text-ink-soft leading-relaxed">
            処理はすべてブラウザ内。原稿や下書きを安心して貼り付けられます。
          </p>
        </div>
        <div>
          <div className="font-mincho text-lg font-bold text-ink">速い・軽い</div>
          <p className="mt-1 text-ink-soft leading-relaxed">
            入力と同時に結果が更新。ログイン不要、無料で使えます。
          </p>
        </div>
        <div>
          <div className="font-mincho text-lg font-bold text-ink">そのまま使える</div>
          <p className="mt-1 text-ink-soft leading-relaxed">
            結果はワンクリックでコピー。執筆・校正・SNS投稿の前に。
          </p>
        </div>
      </section>
    </div>
  );
}
