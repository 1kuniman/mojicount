import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Base64とは何か——なぜ画像を「文字」にできるのか",
  description:
    "Base64エンコードの仕組みを図解なしでも分かるように解説。なぜデータが1.33倍になるのか、暗号化と何が違うのかも説明します。",
};

export default function Page() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-12">
      <p className="text-xs text-ink-faint font-mono tracking-widest">COLUMN</p>
      <Breadcrumb items={[{ name: "コラム", href: "/column/" }, { name: "Base64とは何か" }]} />
      <h1 className="mt-2 font-mincho text-2xl sm:text-3xl font-bold text-ink leading-snug">
        Base64とは何か——なぜ画像を「文字」にできるのか
      </h1>

      <div className="mt-8 space-y-8 text-[15px] leading-loose text-ink-soft">
        <p>
          メールの添付ファイル、Webページに埋め込まれた画像、APIでやり取りされる認証情報。その裏側では、Base64という仕組みが当たり前のように使われています。「SGVsbG8=」のような謎の英数字を見たことがある人も多いはずです。この記事では、Base64が何をしていて、何をしていないのかを解説します。
        </p>

        <section>
          <h2 className="font-mincho text-xl font-bold text-ink rule-shu">Base64は「翻訳」であって「圧縮」でも「暗号」でもない</h2>
          <p className="mt-3">
            コンピュータのデータは、突き詰めればすべて0と1の並び（バイナリ）です。ところが、メールやテキスト形式の設定ファイルなど、世の中には「文字しか安全に運べない」経路がたくさんあります。バイナリをそのまま流すと、経路の途中で壊れたり、制御文字として誤解釈されたりするからです。
          </p>
          <p className="mt-3">
            Base64は、この問題を解決するための「翻訳」です。データを6ビットずつに区切り、それぞれを64種類の文字（A〜Z、a〜z、0〜9、+、/）のどれかに置き換えます。64種類なのは、6ビットで表せるパターンがちょうど64通り（2の6乗）だからです。こうして、どんなバイナリデータでも「どこでも運べる無難な文字の列」に変換できます。画像を文字にできるのは、画像もただの0と1の並びだからです。
          </p>
        </section>

        <section>
          <h2 className="font-mincho text-xl font-bold text-ink rule-shu">なぜサイズが約1.33倍になるのか</h2>
          <p className="mt-3">
            元のデータは8ビットで1バイトですが、Base64は6ビットごとに1文字（=8ビット）を使います。つまり6ビットの情報を運ぶのに8ビット分の文字を消費するため、サイズは8÷6で約1.33倍に膨らみます。Base64は圧縮ではなく、むしろ少し太る変換です。末尾に付く「=」は、データの長さを3バイト単位に揃えるための詰め物（パディング）で、飾りではなくデコードに必要な情報です。
          </p>
        </section>

        <section>
          <h2 className="font-mincho text-xl font-bold text-ink rule-shu">「Base64にすれば安全」は誤解</h2>
          <p className="mt-3">
            見た目が読めない文字列になるため暗号化と混同されがちですが、Base64は誰でも一瞬で元に戻せる可逆変換です。変換表は世界共通で、鍵もパスワードもありません。パスワードや秘密情報をBase64にして「隠したつもり」になるのは危険です。秘匿が目的なら、暗号化という別の仕組みを使う必要があります。Base64の役割はあくまで「壊れずに運ぶこと」です。
          </p>
        </section>

        <section>
          <h2 className="font-mincho text-xl font-bold text-ink rule-shu">実際に変換してみる</h2>
          <p className="mt-3">
            当サイトの<Link href="/encode/" className="text-shu underline underline-offset-2">エンコード・デコード</Link>では、テキストのBase64変換と復元、URLエンコードをブラウザ内で試せます。「こんにちは」がどんな文字列になるか、一度変換してみると仕組みが体感できるはずです。入力した内容はサーバーへ送信されないため、業務のデータでも安心して確認できます。
          </p>
        </section>
      </div>

      <p className="mt-10 text-sm">
        <Link href="/column/" className="text-shu underline underline-offset-2">← コラム一覧へ</Link>
      </p>
    </article>
  );
}
