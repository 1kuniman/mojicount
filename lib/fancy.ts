// おしゃれ文字（Unicode装飾フォント）変換。すべてブラウザ内で処理。
// 英数字を各種Unicodeブロックへマッピング。対応外の文字（日本語など）はそのまま通す。

const A = "A".charCodeAt(0);
const Z = "Z".charCodeAt(0);
const a = "a".charCodeAt(0);
const z = "z".charCodeAt(0);
const D0 = "0".charCodeAt(0);
const D9 = "9".charCodeAt(0);

const isUpper = (c: number) => c >= A && c <= Z;
const isLower = (c: number) => c >= a && c <= z;
const isDigit = (c: number) => c >= D0 && c <= D9;

interface MathStyle {
  upper: number;
  lower: number;
  digit?: number;
  ex?: Record<string, number>; // 既存BMP文字で埋める例外
}

function mathMap(ch: string, s: MathStyle): string {
  if (s.ex && s.ex[ch] !== undefined) return String.fromCodePoint(s.ex[ch]);
  const c = ch.charCodeAt(0);
  if (isUpper(c)) return String.fromCodePoint(s.upper + (c - A));
  if (isLower(c)) return String.fromCodePoint(s.lower + (c - a));
  if (s.digit !== undefined && isDigit(c)) return String.fromCodePoint(s.digit + (c - D0));
  return ch;
}

const SCRIPT_EX = { B:0x212C,E:0x2130,F:0x2131,H:0x210B,I:0x2110,L:0x2112,M:0x2133,R:0x211B,e:0x212F,g:0x210A,o:0x2134 };
const FRAKTUR_EX = { C:0x212D,H:0x210C,I:0x2111,R:0x211C,Z:0x2128 };
const DOUBLE_EX = { C:0x2102,H:0x210D,N:0x2115,P:0x2119,Q:0x211A,R:0x211D,Z:0x2124 };

const SMALLCAPS: Record<string, string> = {
  a:"ᴀ",b:"ʙ",c:"ᴄ",d:"ᴅ",e:"ᴇ",f:"ꜰ",g:"ɢ",h:"ʜ",i:"ɪ",j:"ᴊ",k:"ᴋ",l:"ʟ",m:"ᴍ",
  n:"ɴ",o:"ᴏ",p:"ᴘ",q:"ꞯ",r:"ʀ",s:"ꜱ",t:"ᴛ",u:"ᴜ",v:"ᴠ",w:"ᴡ",x:"x",y:"ʏ",z:"ᴢ",
};

const FLIP: Record<string, string> = {
  a:"ɐ",b:"q",c:"ɔ",d:"p",e:"ǝ",f:"ɟ",g:"ƃ",h:"ɥ",i:"ᴉ",j:"ɾ",k:"ʞ",l:"l",m:"ɯ",
  n:"u",o:"o",p:"d",q:"b",r:"ɹ",s:"s",t:"ʇ",u:"n",v:"ʌ",w:"ʍ",x:"x",y:"ʎ",z:"z",
  A:"∀",B:"𐐒",C:"Ɔ",D:"◖",E:"Ǝ",F:"Ⅎ",G:"⅁",H:"H",I:"I",J:"ſ",K:"ʞ",L:"˥",M:"W",
  N:"N",O:"O",P:"Ԁ",Q:"Ò",R:"ᴚ",S:"S",T:"⊥",U:"∩",V:"Λ",W:"M",X:"X",Y:"⅄",Z:"Z",
  "0":"0","1":"Ɩ","2":"ᄅ","3":"Ɛ","4":"ㄣ","5":"ϛ","6":"9","7":"ㄥ","8":"8","9":"6",
  ".":"˙",",":"'","?":"¿","!":"¡","'":",",'"':",,","(":")",")":"(","[":"]","]":"[","{":"}","}":"{","<":">",">":"<","_":"‾","&":"⅋",
};

function circled(ch: string): string {
  const c = ch.charCodeAt(0);
  if (isUpper(c)) return String.fromCodePoint(0x24B6 + (c - A));
  if (isLower(c)) return String.fromCodePoint(0x24D0 + (c - a));
  if (ch === "0") return "⓪";
  if (isDigit(c)) return String.fromCodePoint(0x2460 + (c - D0 - 1));
  return ch;
}

function negSquared(ch: string): string {
  const up = ch.toUpperCase();
  const c = up.charCodeAt(0);
  if (isUpper(c)) return String.fromCodePoint(0x1F170 + (c - A));
  return ch;
}

function fullwidth(ch: string): string {
  if (ch === " ") return "\u3000";
  const c = ch.charCodeAt(0);
  if (c >= 0x21 && c <= 0x7e) return String.fromCodePoint(c - 0x21 + 0xFF01);
  return ch;
}

function combiner(mark: string) {
  return (text: string) => Array.from(text).map((ch) => (ch === " " || ch === "\n" ? ch : ch + mark)).join("");
}

function perChar(fn: (ch: string) => string) {
  return (text: string) => Array.from(text).map(fn).join("");
}

const MATH = (s: MathStyle) => perChar((ch) => mathMap(ch, s));

export interface FancyStyle {
  key: string;
  name: string;
  transform: (text: string) => string;
}

export const FANCY_STYLES: FancyStyle[] = [
  { key: "bold", name: "ボールド", transform: MATH({ upper: 0x1D5D4, lower: 0x1D5EE, digit: 0x1D7EC }) },
  { key: "italic", name: "イタリック", transform: MATH({ upper: 0x1D608, lower: 0x1D622 }) },
  { key: "double", name: "袋文字（Double）", transform: MATH({ upper: 0x1D538, lower: 0x1D552, digit: 0x1D7D8, ex: DOUBLE_EX }) },
  { key: "script", name: "筆記体（Script）", transform: MATH({ upper: 0x1D49C, lower: 0x1D4B6, ex: SCRIPT_EX }) },
  { key: "fraktur", name: "ひげ文字（Fraktur）", transform: MATH({ upper: 0x1D504, lower: 0x1D51E, ex: FRAKTUR_EX }) },
  { key: "mono", name: "等幅（Mono）", transform: MATH({ upper: 0x1D670, lower: 0x1D68A, digit: 0x1D7F6 }) },
  { key: "fullwidth", name: "全角", transform: perChar(fullwidth) },
  { key: "smallcaps", name: "スモールキャップス", transform: perChar((ch) => SMALLCAPS[ch.toLowerCase()] ?? ch) },
  { key: "circled", name: "丸囲み", transform: perChar(circled) },
  { key: "squared", name: "四角囲み（反転）", transform: perChar(negSquared) },
  { key: "strike", name: "取り消し線", transform: combiner("\u0336") },
  { key: "underline", name: "下線", transform: combiner("\u0332") },
  { key: "flip", name: "上下反転", transform: (t) => Array.from(t).map((ch) => FLIP[ch] ?? ch).reverse().join("") },
];
