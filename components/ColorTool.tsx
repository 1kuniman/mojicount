"use client";
import { useState } from "react";
import { parseHex, rgbToHex, rgbString, hslString, readableText, palette, type RGB } from "@/lib/color";
import CopyButton from "@/components/CopyButton";

export default function ColorTool() {
  const [hex, setHex] = useState("#c8402c");
  const rgb: RGB | null = parseHex(hex);
  const valid = rgb !== null;
  const normalizedHex = valid ? rgbToHex(rgb) : hex;

  const fromPicker = (v: string) => setHex(v);

  const rows = valid
    ? [
        { label: "HEX", value: normalizedHex.toUpperCase() },
        { label: "RGB", value: rgbString(rgb) },
        { label: "HSL", value: hslString(rgb) },
      ]
    : [];

  return (
    <div className="max-w-2xl">
      <div className="grid sm:grid-cols-[180px_1fr] gap-5 items-start">
        {/* プレビュー */}
        <div
          className="rounded-xl border border-line h-40 sm:h-full min-h-[140px] grid place-items-center font-mono text-sm"
          style={{ backgroundColor: valid ? normalizedHex : "transparent", color: valid ? readableText(rgb) : "inherit" }}
        >
          {valid ? normalizedHex.toUpperCase() : <span className="text-ink-faint">無効な色</span>}
        </div>

        {/* 入力 */}
        <div>
          <label className="text-sm font-medium text-ink-soft block mb-2">色を選ぶ / HEXを入力</label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={valid ? normalizedHex : "#000000"}
              onChange={(e) => fromPicker(e.target.value)}
              className="w-12 h-12 rounded-lg border border-line bg-paper shrink-0"
            />
            <input
              type="text"
              value={hex}
              onChange={(e) => setHex(e.target.value)}
              placeholder="#c8402c または c84"
              className="flex-1 rounded-lg border border-line bg-paper px-3 py-2.5 font-mono text-ink outline-none focus:border-shu/60 focus:ring-2 focus:ring-shu/15"
            />
          </div>

          <div className="mt-4 space-y-2">
            {valid ? (
              rows.map((r) => (
                <div key={r.label} className="flex items-center gap-3 rounded-lg border border-line bg-paper p-3">
                  <span className="text-xs font-medium text-ink-faint w-10">{r.label}</span>
                  <code className="flex-1 font-mono text-ink break-all">{r.value}</code>
                  <CopyButton text={r.value} />
                </div>
              ))
            ) : (
              <p className="text-sm text-ink-faint">HEX（#RRGGBB か #RGB）を入力してください。</p>
            )}
          </div>
        </div>
      </div>

      {valid && (
        <div className="mt-8">
          <h2 className="font-mincho text-lg font-bold text-ink rule-shu mb-4">この色から作る配色</h2>
          <div className="space-y-4">
            {palette(rgb).map((group) => (
              <div key={group.name}>
                <div className="text-xs text-ink-faint mb-1.5">{group.name}</div>
                <div className="flex flex-wrap gap-2">
                  {group.colors.map((hexColor, i) => (
                    <button
                      key={hexColor + i}
                      onClick={() => setHex(hexColor)}
                      title={`${hexColor}（クリックで選択）`}
                      className="group relative w-20 h-16 rounded-lg border border-line overflow-hidden"
                      style={{ backgroundColor: hexColor }}
                    >
                      <span
                        className="absolute inset-x-0 bottom-0 text-[10px] font-mono py-0.5 text-center"
                        style={{ backgroundColor: "rgba(0,0,0,0.25)", color: "#fff" }}
                      >
                        {hexColor.toUpperCase()}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-ink-faint">色をクリックすると、その色を選び直せます。</p>
        </div>
      )}
    </div>
  );
}
