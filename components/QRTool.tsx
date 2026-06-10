"use client";
import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";

type ECL = "L" | "M" | "Q" | "H";

export default function QRTool() {
  const [text, setText] = useState("https://mojimojicount.com");
  const [size, setSize] = useState(320);
  const [ecl, setEcl] = useState<ECL>("M");
  const [fg, setFg] = useState("#1c1814");
  const [bg, setBg] = useState("#ffffff");
  const [error, setError] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!text) {
      const ctx = canvas.getContext("2d");
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }
    QRCode.toCanvas(
      canvas,
      text,
      { width: size, margin: 2, errorCorrectionLevel: ecl, color: { dark: fg, light: bg } },
      (err) => setError(err ? "生成できませんでした（文字数が多すぎる可能性があります）" : "")
    );
  }, [text, size, ecl, fg, bg]);

  const downloadPng = () => {
    const canvas = canvasRef.current;
    if (!canvas || !text) return;
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = "qrcode.png";
    a.click();
  };

  const downloadSvg = async () => {
    if (!text) return;
    const svg = await QRCode.toString(text, {
      type: "svg",
      margin: 2,
      errorCorrectionLevel: ecl,
      color: { dark: fg, light: bg },
    });
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "qrcode.svg";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const inputCls =
    "rounded-lg border border-line bg-paper px-3 py-2.5 text-ink outline-none focus:border-shu/60 focus:ring-2 focus:ring-shu/15";

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
      <div>
        <label className="text-sm font-medium text-ink-soft mb-2 block">
          URL または テキスト
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="https://example.com / 任意のテキスト"
          className={`${inputCls} w-full h-28 resize-y`}
        />

        <div className="mt-4 grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-ink-soft block mb-1.5">
              サイズ <span className="font-mono text-ink-faint">{size}px</span>
            </label>
            <input
              type="range"
              min={128}
              max={640}
              step={16}
              value={size}
              onChange={(e) => setSize(parseInt(e.target.value, 10))}
              className="w-full accent-shu"
            />
          </div>
          <div>
            <label className="text-sm text-ink-soft block mb-1.5">誤り訂正レベル</label>
            <div className="flex gap-1.5">
              {(["L", "M", "Q", "H"] as ECL[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setEcl(l)}
                  className={`px-3 py-1.5 rounded-md border text-sm transition-colors ${
                    ecl === l
                      ? "border-shu text-shu bg-shu/5 font-medium"
                      : "border-line text-ink-soft hover:border-shu/40"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
          <label className="text-sm text-ink-soft flex items-center gap-2">
            前景色
            <input type="color" value={fg} onChange={(e) => setFg(e.target.value)} className="w-9 h-9 rounded border border-line bg-paper" />
            <span className="font-mono text-xs text-ink-faint">{fg}</span>
          </label>
          <label className="text-sm text-ink-soft flex items-center gap-2">
            背景色
            <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="w-9 h-9 rounded border border-line bg-paper" />
            <span className="font-mono text-xs text-ink-faint">{bg}</span>
          </label>
        </div>
        {error && <p className="mt-3 text-sm text-shu">{error}</p>}
      </div>

      <div className="flex flex-col items-center">
        <div className="rounded-xl border border-line bg-paper p-4">
          <canvas ref={canvasRef} className="block max-w-full h-auto rounded" />
        </div>
        <div className="mt-4 flex gap-2">
          <button onClick={downloadPng} disabled={!text} className="px-4 py-2.5 rounded-lg bg-panel-strong text-on-strong font-medium text-sm hover:bg-shu-deep disabled:opacity-40 transition-colors">
            PNGで保存
          </button>
          <button onClick={downloadSvg} disabled={!text} className="px-4 py-2.5 rounded-lg border border-line text-ink-soft font-medium text-sm hover:border-shu hover:text-shu disabled:opacity-40 transition-colors">
            SVGで保存
          </button>
        </div>
      </div>
    </div>
  );
}
