import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import ArticleMeta from "@/components/ArticleMeta";

export const metadata: Metadata = {
  title: "原稿用紙の文字数の数え方——句読点・小さい「っ」はどう数える？",
  description:
    "400字詰め原稿用紙のルール（句読点・促音・拗音・改行の扱い）と、Webの文字数カウントとの違いを解説します。",
};

export default function Page() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-12">
      <p className="text-xs text-ink-faint font-mono tracking-widest">COLUMN</p>
      <Breadcrumb items={[{ name: "コラム", href: "/column/" }, { name: "原稿用紙の文字数の数え方" }]} />
      <ArticleMeta
        title="原稿用紙の文字数の数え方——句読点・小さい「っ」はどう数える？"
        description="400字詰め原稿用紙のルール（句読点・促音・拗音・改行の扱い）と、Webの文字数カウントとの違いを解説します。"
        path="/column/genkoyoshi/"
        publishedDate="2026-07-30"
      />
      <h1 className="mt-2 font-mincho text-2xl sm:text-3xl font-bold text-ink leading-snug">
        原稿用紙の文字数の数え方——句読点・小さい「っ」はどう数える？
      </h1>

      <div className="mt-8 space-y-8 text-[15px] leading-loose text-ink-soft">
        <p>
          「2000字以内でレポートを書く」と言われたとき、その2000字に句読点は含まれるのか。小さい「っ」や「ゃ」は1文字なのか。読書感想文や入試の作文、Webの応募フォームなど、場面によって数え方が微妙に違うため、意外と迷いやすいポイントです。この記事では、400字詰め原稿用紙の基本ルールと、Web上の文字数カウントとの違いを整理します。
        </p>

        <section>
          <h2 className="font-mincho text-xl font-bold text-ink rule-shu">原稿用紙では「マス」で数える</h2>
          <p className="mt-3">
            原稿用紙の世界では、文字数は「使ったマスの数」で数えるのが基本です。句読点（、。）やカギ括弧も1マスを使うので1文字として数えます。小さい「っ」「ゃ」「ゅ」「ょ」も、それぞれ1マスを使うため1文字です。「きょう」は3文字、「ラッパ」も3文字になります。
          </p>
          <p className="mt-3">
            一方で、行頭に句読点が来る場合は前の行の最後のマスに文字と一緒に詰める（いわゆる禁則処理）、段落の最初は1マス空ける、といった組み方のルールもあります。このため「原稿用紙◯枚分」という指定は、厳密な文字数というより「おおよその分量」を表していると考えるのが実態に合っています。
          </p>
        </section>

        <section>
          <h2 className="font-mincho text-xl font-bold text-ink rule-shu">Webの文字数カウントは「文字そのもの」を数える</h2>
          <p className="mt-3">
            対して、Webのフォームやワープロソフトの文字数カウントは、マスではなく文字そのものを数えます。句読点も促音も1文字として数える点は同じですが、改行や空白マスは数えないことが多く、原稿用紙の「使ったマス数」とは一致しません。同じ文章でも「原稿用紙だと3枚ちょうど、文字数カウントだと1,120字」のようにズレるのはこのためです。
          </p>
          <p className="mt-3">
            応募要項などで「2000字以内」とある場合、Webフォームでの提出ならフォームのカウント（＝文字そのもの）が基準になるのが普通です。紙の原稿用紙で「5枚以内」なら、マスの使い方も含めた分量が基準になります。どちらの基準で数えられるのかを先に確認しておくと安全です。
          </p>
        </section>

        <section>
          <h2 className="font-mincho text-xl font-bold text-ink rule-shu">実際に数えてみる</h2>
          <p className="mt-3">
            当サイトの<Link href="/count/" className="text-shu underline underline-offset-2">文字数カウント</Link>では、空白込み・空白抜きの文字数と、400字詰め原稿用紙に換算した枚数を同時に表示します。目標文字数を設定すると達成度がバーで見えるので、「あと何字書けばいいのか」を確かめながら書き進められます。入力した文章はブラウザの外に送信されないため、公開前の原稿でも安心して使えます。
          </p>
        </section>
      </div>

      <p className="mt-10 text-sm">
        <Link href="/column/" className="text-shu underline underline-offset-2">← コラム一覧へ</Link>
      </p>
    </article>
  );
}
