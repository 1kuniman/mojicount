"use client";

interface AdSpaceProps {
  slot?: string;
  className?: string;
  label?: string;
}

export default function AdSpace({
  slot = "xxxxxxxxxx",
  className = "",
  label = "広告",
}: AdSpaceProps) {
  return (
    <div className={`w-full ${className}`}>
      <div className="text-xs text-gray-400 text-center mb-1">{label}</div>
      {/* Google AdSense: 本番環境では以下のコメントアウトを解除し、data-ad-client と data-ad-slot を設定してください */}
      {/*
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      */}
      {/* 開発用プレースホルダー */}
      <div className="w-full bg-gray-100 border border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-sm py-6 min-h-[90px]">
        広告スペース (728×90 / レスポンシブ)
      </div>
    </div>
  );
}
