"use client";

import { useEffect, useRef } from "react";

/**
 * Google AdSense 表示枠。
 * AdSense のスクリプトは layout.tsx で読み込み済み。
 * 自動広告 + display 広告ユニットを両方サポート。
 */
const ADSENSE_CLIENT = "ca-pub-8297663476934392";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export default function AdSpace({
  label = "スポンサーリンク",
  variant = "banner",
  slot,
}: {
  label?: string;
  variant?: "banner" | "rect";
  slot?: string;
}) {
  const pushedRef = useRef(false);
  const minH = variant === "rect" ? "min-h-[250px]" : "min-h-[90px]";

  useEffect(() => {
    if (pushedRef.current) return;
    pushedRef.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // noop: AdSense未ロードでも描画は壊さない
    }
  }, []);

  return (
    <div className="w-full">
      <div className="text-[10px] text-gray-400 text-center mb-1 tracking-wide">{label}</div>
      <div className={`w-full ${minH} overflow-hidden`}>
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "100%", minHeight: variant === "rect" ? 250 : 90 }}
          data-ad-client={ADSENSE_CLIENT}
          {...(slot ? { "data-ad-slot": slot } : { "data-ad-format": "auto", "data-full-width-responsive": "true" })}
        />
      </div>
    </div>
  );
}
