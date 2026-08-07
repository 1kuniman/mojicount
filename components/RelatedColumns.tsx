import Link from "next/link";

interface ColumnDef {
  slug: string;
  href: string;
  title: string;
  desc: string;
}

const COLUMNS: ColumnDef[] = [
  {
    slug: "genkoyoshi",
    href: "/column/genkoyoshi/",
    title: "原稿用紙の文字数の数え方",
    desc: "句読点や小さい「っ」はどう数える？",
  },
  {
    slug: "gib-vs-gb",
    href: "/column/gib-vs-gb/",
    title: "GiBとGBは別物",
    desc: "500GBのSSDが465にしか見えない理由",
  },
  {
    slug: "password-safety",
    href: "/column/password-safety/",
    title: "安全なパスワードの作り方",
    desc: "長さ・文字種・パスフレーズの考え方",
  },
  {
    slug: "qr-mechanism",
    href: "/column/qr-mechanism/",
    title: "QRコードはなぜ欠けても読めるのか",
    desc: "誤り訂正レベルL/M/Q/Hの意味",
  },
  {
    slug: "base64",
    href: "/column/base64/",
    title: "Base64とは何か",
    desc: "なぜ画像を「文字」にできるのか",
  },
  {
    slug: "zenkaku-hankaku",
    href: "/column/zenkaku-hankaku/",
    title: "全角と半角は何が違う？",
    desc: "「１２３」と「123」が別物な理由",
  },
  {
    slug: "url-encode",
    href: "/column/url-encode/",
    title: "URLエンコードとは",
    desc: "「%20」の正体と日本語URLが長くなる理由",
  },
  {
    slug: "mojibake",
    href: "/column/mojibake/",
    title: "文字化けはなぜ起きるのか",
    desc: "「縺薙」や「?????」の正体",
  },
  {
    slug: "password-reuse",
    href: "/column/password-reuse/",
    title: "パスワードの使い回しはなぜ危険か",
    desc: "リスト型攻撃の仕組みと対策",
  },
];

// ツールslug → 関連コラムslug
const MAP: Record<string, string[]> = {
  count: ["genkoyoshi", "zenkaku-hankaku"],
  convert: ["zenkaku-hankaku", "mojibake"],
  format: ["mojibake", "genkoyoshi"],
  encode: ["base64", "url-encode"],
  datasize: ["gib-vs-gb", "base64"],
  date: ["gib-vs-gb", "mojibake"],
  password: ["password-safety", "password-reuse"],
  fancy: ["zenkaku-hankaku", "mojibake"],
  qr: ["qr-mechanism", "url-encode"],
  color: ["base64", "zenkaku-hankaku"],
};

export default function RelatedColumns({ currentSlug }: { currentSlug: string }) {
  const slugs = MAP[currentSlug] ?? [];
  const items = slugs
    .map((s) => COLUMNS.find((c) => c.slug === s))
    .filter((c): c is ColumnDef => Boolean(c));

  if (items.length === 0) return null;

  return (
    <section className="mt-14 max-w-2xl">
      <h2 className="font-mincho text-xl font-bold text-ink rule-shu">関連コラム</h2>
      <p className="mt-3 text-sm text-ink-soft">このツールにまつわる仕組みを解説しています。</p>
      <div className="mt-4 space-y-3">
        {items.map((c) => (
          <Link
            key={c.slug}
            href={c.href}
            className="block rounded-xl border border-line bg-paper p-4 hover:border-shu/50 transition-colors"
          >
            <div className="font-medium text-ink">{c.title}</div>
            <div className="mt-1 text-sm text-ink-soft">{c.desc}</div>
          </Link>
        ))}
      </div>
      <p className="mt-4 text-sm">
        <Link href="/column/" className="text-shu underline underline-offset-2">
          コラム一覧を見る →
        </Link>
      </p>
    </section>
  );
}
