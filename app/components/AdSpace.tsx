/**
 * アフィリエイト／広告バナー枠のプレースホルダー。
 * 実運用では中身を提携広告のリンク・バナー、または Google AdSense の
 * <ins class="adsbygoogle"> ユニットに差し替えてください。
 */
export default function AdSpace({
  label = "スポンサーリンク",
  variant = "banner",
}: {
  label?: string;
  variant?: "banner" | "rect";
}) {
  const minH = variant === "rect" ? "min-h-[250px]" : "min-h-[90px]";
  return (
    <div className="w-full">
      <div className="text-[10px] text-gray-400 text-center mb-1 tracking-wide">{label}</div>
      <div
        className={`w-full ${minH} rounded-xl border border-dashed border-pink-300 bg-gradient-to-br from-pink-50 to-rose-50 flex flex-col items-center justify-center text-center px-4 py-6`}
      >
        <span className="text-pink-400 text-sm font-medium">広告・アフィリエイトバナー枠</span>
        <span className="text-[11px] text-gray-400 mt-1">
          ここに提携サービスのバナーを掲載できます
        </span>
      </div>
    </div>
  );
}
