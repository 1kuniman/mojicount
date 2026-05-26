import Link from "next/link";

/**
 * 医療情報の免責事項。全ページのフッター上に表示する。
 * variant="bar" はコンパクトな帯、variant="block" は記事末尾などの枠。
 */
export default function MedicalDisclaimer({
  variant = "bar",
}: {
  variant?: "bar" | "block";
}) {
  if (variant === "block") {
    return (
      <aside className="rounded-xl border border-pink-200 bg-pink-50 p-4 sm:p-5 text-sm text-gray-600 leading-relaxed">
        <p className="font-semibold text-pink-700 mb-1.5">⚠ 医療情報に関する免責事項</p>
        <p>
          当サイトの情報は一般的な参考情報であり、診断・治療・特定の医療機関や施術を推奨するものではありません。
          効果・副作用・ダウンタイムには個人差があります。施術や薬の使用にあたっては、必ず医師の診察を受け、
          ご自身の判断と責任のもとでご検討ください。詳しくは
          <Link href="/disclaimer" className="text-pink-600 underline underline-offset-2 mx-0.5">
            免責事項
          </Link>
          をご覧ください。
        </p>
      </aside>
    );
  }

  return (
    <div className="bg-pink-50 border-t border-pink-100">
      <div className="max-w-5xl mx-auto px-4 py-3">
        <p className="text-xs text-gray-500 leading-relaxed text-center">
          ※ 当サイトの医療・美容に関する情報は一般的な参考情報です。効果には個人差があり、施術・薬の使用は必ず医師にご相談ください。詳細は
          <Link href="/disclaimer" className="text-pink-600 underline underline-offset-2 mx-0.5">
            免責事項
          </Link>
          をご確認ください。
        </p>
      </div>
    </div>
  );
}
