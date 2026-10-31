import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { Crumbs, Orn } from "@/components/Parts";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description: "宵の書架へのお問い合わせ方法。",
  alternates: { canonical: SITE_URL + "/contact/" },
};

export default function Contact() {
  return (
    <main className="sheet prose">
      <Crumbs trail={[{ name: "宵の書架", href: "/" }, { name: "お問い合わせ" }]} />
      <h1>お問い合わせ</h1>
      <Orn />
      <p>ご意見・ご感想、表示の不具合、文章の誤りのご指摘などは、運営者のXアカウント <a href="https://x.com/ikkun_dev" target="_blank" rel="noopener noreferrer">@ikkun_dev</a> へのダイレクトメッセージでお送りください。個人で運営しているため、お返事に時間をいただくことがあります。</p>
      <p>個別の鑑定や、占いの結果についてのご相談にはお応えしていません。</p>
    </main>
  );
}
