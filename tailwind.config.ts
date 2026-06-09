import type { Config } from "tailwindcss";

const v = (name: string) => `rgb(var(${name}) / <alpha-value>)`;

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: v("--c-paper"),
        "paper-deep": v("--c-paper-deep"),
        ink: v("--c-ink"),
        "ink-soft": v("--c-ink-soft"),
        "ink-faint": v("--c-ink-faint"),
        shu: v("--c-shu"),
        "shu-deep": v("--c-shu-deep"),
        line: v("--c-line"),
        "panel-strong": v("--c-panel-strong"),
        "on-strong": v("--c-on-strong"),
      },
      fontFamily: {
        mincho: ['"Shippori Mincho"', "serif"],
        gothic: ['"Zen Kaku Gothic New"', "sans-serif"],
        mono: ['"IBM Plex Mono"', "monospace"],
      },
      boxShadow: {
        card: "0 1px 0 rgb(var(--c-line)), 0 10px 30px -18px rgba(0,0,0,0.35)",
      },
    },
  },
  plugins: [],
};
export default config;
