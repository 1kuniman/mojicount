import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#f7f3ea",
        "paper-deep": "#efe8d8",
        ink: "#1c1814",
        "ink-soft": "#4a443c",
        "ink-faint": "#8a8275",
        shu: "#c8402c",       // 朱色（校正の赤）
        "shu-deep": "#a8311f",
        line: "#ddd3c0",
      },
      fontFamily: {
        mincho: ['"Shippori Mincho"', "serif"],
        gothic: ['"Zen Kaku Gothic New"', "sans-serif"],
        mono: ['"IBM Plex Mono"', "monospace"],
      },
      boxShadow: {
        card: "0 1px 0 #ddd3c0, 0 10px 30px -18px rgba(28,24,20,0.35)",
      },
    },
  },
  plugins: [],
};
export default config;
