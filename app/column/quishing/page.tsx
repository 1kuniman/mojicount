import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "QRコードを悪用したフィッシング詐欺「クイッシング」に注意",
  description:
    "QRコードを使ったフィッシング詐欺（クイッシング）の手口と見分け方を解説。読み取る前に確認すべきポイントも紹介します。",
};

export default function Page() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-12">
      <p className="text-xs text-ink-faint font-mono tracking-widest">COLUMN</p>
      <h1 className="mt-2 font-mincho text-2xl sm:text-3xl font-bold text-ink leading-snug">
        QRコードを悪用したフィッシング詐欺「クイッシング」に注意
      </h1>

      <div className="mt-8 space-y-8 text-[15px] leading-loose text-ink-soft">
        <p>
          駐輪場の料金QR、飲食店のメニューQR、宅配便の不在通知に貼られたQR。便利さの裏側で、QRコードを使ったフィッシング詐欺「クイッシング（Quishing = QR + Phishing）」が増えています。QRコードは中身を読めないからこそ、悪用されやすいという弱点があります。
        </p>

        <section>
          <h2 className="font-mincho text-xl font-bold text-ink rule-shu">なぜQRは騙されやすいのか</h2>
          <p className="mt-3">
            通常のフィッシングメールなら、リンクの文字列を見て「怪しいURLだ」と気づけることがあります。しかしQRコードは白黒の模様でしかなく、スキャンするまで飛び先が分かりません。しかも「公式のQRコードの上に、偽のQRコードのシールを貼る」という物理的な手口も報告されており、見た目だけでは本物と偽物の区別がつきません。
          </p>
          <p className="mt-3">
            さらに、スマートフォンのメールセキュリティやスパムフィルターは、テキストのURLは検査できてもQRコードの画像の中身までは通常検査しません。この検知網の隙間を突く手口として、対策が急がれている分野です。
          </p>
        </section>

        <section>
          <h2 className="font-mincho text-xl font-bold text-ink rule-shu">よくある手口</h2>
          <p className="mt-3">
            駐車場や自販機の支払いQRにシールで偽QRを重ねる、宅配便や税金の未納通知を装ったメール・SMSにQRを添付する、飲食店のメニューQRを偽物に差し替える、といった手口が典型例です。読み取った先で本物そっくりのログイン画面が表示され、IDやパスワード、クレジットカード情報の入力を促されます。
          </p>
        </section>

        <section>
          <h2 className="font-mincho text-xl font-bold text-ink rule-shu">読み取る前に確認すべきこと</h2>
          <p className="mt-3">
            多くのカメラアプリは、読み取り後にすぐ開かず、飛び先のURLをプレビュー表示します。ここで一呼吸置いて、ドメイン名が正規のものか確認する習慣をつけてください。特に、支払いや個人情報の入力を求める画面に飛んだ場合は要注意です。QRコードにシールが重ね貼りされたような不自然な跡がないか、物理的な見た目も意識すると気づけることがあります。心当たりのない郵便物やSMSに添付されたQRは、そもそも読み取らないのが最も確実な対策です。
          </p>
        </section>

        <section>
          <h2 className="font-mincho text-xl font-bold text-ink rule-shu">QRコードを作る側の心がけ</h2>
          <p className="mt-3">
            自分でQRコードを配布する立場のときは、印刷物として貼り出す場合に上から偽物を貼られる隙を作らないよう設置場所を工夫する、可能であれば読み取り後にワンクッション置けるURL（案内ページ経由など）にする、といった配慮が有効です。当サイトの<Link href="/qr/" className="text-shu underline underline-offset-2">QRコード生成</Link>は、URLやテキストに加えてWi-Fi接続用のQRコードも作成できます。生成はすべてブラウザ内で完結し、入力した内容がサーバーに送信されることはありません。
          </p>
        </section>
      </div>

      <p className="mt-10 text-sm">
        <Link href="/column/" className="text-shu underline underline-offset-2">← コラム一覧へ</Link>
      </p>
    </article>
  );
}
