import Link from "next/link";
import { TOOLS } from "@/lib/tools";

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-5">
      {/* Hero */}
      <section className="pt-14 pb-12 sm:pt-20 sm:pb-16">
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
              className="group relative block rounded-xl border border-line bg-paper p-5 shadow-card overflow-hidden hover:-translate-y-0.5 transition-all"
            >
              <span className="absolute inset-x-0 top-0 h-1" style={{ backgroundColor: t.accent }} />
              <span
                className="grid place-items-center w-11 h-11 rounded-lg font-mincho text-xl transition-transform group-hover:scale-105"
                style={{ backgroundColor: t.accentSoft, color: t.accent }}
              >
                {t.mark}
              </span>
              <h3 className="mt-4 font-bold text-ink text-lg">{t.title}</h3>
              <p className="mt-1.5 text-sm text-ink-soft leading-relaxed">{t.description}</p>
              <span className="mt-4 inline-block text-sm font-medium" style={{ color: t.accent }}>
                開く →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust row */}
      <section className="py-12 border-t border-line grid gap-6 sm:grid-cols-3 text-sm">
        {[
          { c: "#c8402c", t: "送信しない", d: "処理はすべてブラウザ内。原稿や下書きを安心して貼り付けられます。" },
          { c: "#2f6a93", t: "速い・軽い", d: "入力と同時に結果が更新。ログイン不要、無料で使えます。" },
          { c: "#3f7256", t: "そのまま使える", d: "結果はワンクリックでコピー。執筆・校正・SNS投稿の前に。" },
        ].map((x) => (
          <div key={x.t}>
            <span className="block w-8 h-1 rounded mb-3" style={{ backgroundColor: x.c }} />
            <div className="font-mincho text-lg font-bold text-ink">{x.t}</div>
            <p className="mt-1 text-ink-soft leading-relaxed">{x.d}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
