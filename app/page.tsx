import Link from "next/link";
import { TOOLS } from "@/lib/tools";

const GROUPS: { title: string; slugs: string[] }[] = [
  { title: "書く・数える", slugs: ["count", "format"] },
  { title: "変換する", slugs: ["convert", "encode", "datasize", "color"] },
  { title: "つくる", slugs: ["qr", "password", "fancy"] },
  { title: "計算する", slugs: ["date"] },
];

export default function Home() {
  const bySlug = (s: string) => TOOLS.find((t) => t.slug === s);

  return (
    <div className="mx-auto max-w-5xl px-5">
      {/* Hero */}
      <section className="pt-14 pb-12 sm:pt-20 sm:pb-14">
        <p className="text-shu font-mono text-sm tracking-widest mb-4">BROWSER-ONLY TEXT TOOLS</p>
        <h1 className="font-mincho text-4xl sm:text-6xl font-bold leading-[1.1] tracking-tight text-ink">
          文章まわりの作業を、
          <br />
          ひと手間で終わらせる。
        </h1>
        <p className="mt-6 text-ink-soft leading-relaxed max-w-xl text-[15px]">
          文字数カウント、全角半角の変換、整形、QRコード、パスワード生成——。よく使う{TOOLS.length}個の道具を1か所に。すべてブラウザの中だけで動くので、入力した内容はどこにも送信されません。ログイン不要・無料です。
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/count/" className="px-5 py-3 rounded-lg bg-panel-strong text-on-strong font-medium hover:bg-shu-deep transition-colors">
            文字数を数える
          </Link>
          <Link href="/qr/" className="px-5 py-3 rounded-lg border border-line text-ink hover:border-shu hover:text-shu transition-colors font-medium">
            QRコードを作る
          </Link>
        </div>
      </section>

      {/* Tools by group */}
      <section className="pb-8">
        {GROUPS.map((g) => (
          <div key={g.title} className="mb-9">
            <h2 className="font-mincho text-xl font-bold text-ink rule-shu mb-5">{g.title}</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {g.slugs.map((slug) => {
                const t = bySlug(slug);
                if (!t) return null;
                return (
                  <Link
                    key={t.slug}
                    href={t.href}
                    className="group relative block rounded-xl border border-line bg-paper p-5 shadow-card overflow-hidden hover:-translate-y-0.5 transition-all"
                  >
                    <span className="absolute inset-x-0 top-0 h-1" style={{ backgroundColor: t.accent }} />
                    <div className="flex items-center gap-3">
                      <span
                        className="grid place-items-center w-10 h-10 rounded-lg font-mincho text-lg shrink-0 transition-transform group-hover:scale-105"
                        style={{ backgroundColor: t.accentSoft, color: t.accent }}
                      >
                        {t.mark}
                      </span>
                      <h3 className="font-bold text-ink">{t.title}</h3>
                    </div>
                    <p className="mt-3 text-sm text-ink-soft leading-relaxed">{t.subtitle}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
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
