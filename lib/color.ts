// カラーコード変換（HEX / RGB / HSL）。すべてブラウザ内で処理。

export interface RGB { r: number; g: number; b: number; }

export function parseHex(input: string): RGB | null {
  let s = input.trim().replace(/^#/, "");
  if (/^[0-9a-fA-F]{3}$/.test(s)) {
    s = s.split("").map((c) => c + c).join("");
  }
  if (!/^[0-9a-fA-F]{6}$/.test(s)) return null;
  return {
    r: parseInt(s.slice(0, 2), 16),
    g: parseInt(s.slice(2, 4), 16),
    b: parseInt(s.slice(4, 6), 16),
  };
}

export function rgbToHex({ r, g, b }: RGB): string {
  const h = (n: number) => n.toString(16).padStart(2, "0");
  return `#${h(r)}${h(g)}${h(b)}`;
}

export function rgbToHsl({ r, g, b }: RGB): { h: number; s: number; l: number } {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  let h = 0;
  const l = (max + min) / 2;
  const d = max - min;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  if (d !== 0) {
    if (max === rn) h = ((gn - bn) / d) % 6;
    else if (max === gn) h = (bn - rn) / d + 2;
    else h = (rn - gn) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
}

export function rgbString({ r, g, b }: RGB): string {
  return `rgb(${r}, ${g}, ${b})`;
}

export function hslString(rgb: RGB): string {
  const { h, s, l } = rgbToHsl(rgb);
  return `hsl(${h}, ${s}%, ${l}%)`;
}

// 文字色が読みやすいよう、背景に対して黒/白を選ぶ（相対輝度）
export function readableText({ r, g, b }: RGB): string {
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.6 ? "#1c1814" : "#ffffff";
}

export function hslToRgb(h: number, s: number, l: number): RGB {
  const sn = s / 100, ln = l / 100;
  const c = (1 - Math.abs(2 * ln - 1)) * sn;
  const hp = ((h % 360) + 360) % 360 / 60;
  const x = c * (1 - Math.abs((hp % 2) - 1));
  let r1 = 0, g1 = 0, b1 = 0;
  if (hp < 1) [r1, g1, b1] = [c, x, 0];
  else if (hp < 2) [r1, g1, b1] = [x, c, 0];
  else if (hp < 3) [r1, g1, b1] = [0, c, x];
  else if (hp < 4) [r1, g1, b1] = [0, x, c];
  else if (hp < 5) [r1, g1, b1] = [x, 0, c];
  else [r1, g1, b1] = [c, 0, x];
  const m = ln - c / 2;
  return {
    r: Math.round((r1 + m) * 255),
    g: Math.round((g1 + m) * 255),
    b: Math.round((b1 + m) * 255),
  };
}

// ベース色から配色を生成（hueシフト/明度バリエーション）
export function palette(rgb: RGB): { name: string; colors: string[] }[] {
  const { h, s, l } = rgbToHsl(rgb);
  const hx = (hh: number, ss: number, ll: number) => rgbToHex(hslToRgb(hh, ss, ll));
  return [
    { name: "補色", colors: [hx(h, s, l), hx(h + 180, s, l)] },
    { name: "類似色", colors: [hx(h - 30, s, l), hx(h, s, l), hx(h + 30, s, l)] },
    { name: "トライアド", colors: [hx(h, s, l), hx(h + 120, s, l), hx(h + 240, s, l)] },
    {
      name: "明度バリエーション",
      colors: [
        hx(h, s, Math.min(92, l + 30)),
        hx(h, s, Math.min(80, l + 15)),
        hx(h, s, l),
        hx(h, s, Math.max(20, l - 15)),
        hx(h, s, Math.max(8, l - 30)),
      ],
    },
  ];
}
