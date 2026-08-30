import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./context/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bone: "#F6F1E9",
        "bone-dim": "#EFE7DA",
        ink: "#16181A",
        "ink-soft": "#2A2C2E",
        emerald: {
          DEFAULT: "#1F3B32",
          light: "#2E5347",
          dim: "#173029",
        },
        brass: {
          DEFAULT: "#B68D4C",
          light: "#D2AF77",
          dim: "#8C6C39",
        },
        rose: "#C98A82",
        line: "#E3D9C8",
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-serif", "serif"],
        sans: ["var(--font-body)", "ui-sans-serif", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        tag: "0 6px 16px -6px rgba(22,24,26,0.35)",
        card: "0 1px 2px rgba(22,24,26,0.04), 0 8px 24px -12px rgba(22,24,26,0.12)",
        lift: "0 20px 45px -20px rgba(22,24,26,0.35)",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          from: { transform: "translateY(100%)" },
          to: { transform: "translateY(0)" },
        },
        slideInRight: {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        slideInLeft: {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
        reveal: {
          from: { opacity: "0", transform: "translateY(18px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        drift: {
          "0%, 100%": { transform: "translateY(0) rotate(-6deg)" },
          "50%": { transform: "translateY(-4px) rotate(-4deg)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.35s ease-out",
        slideUp: "slideUp 0.4s cubic-bezier(0.16,1,0.3,1)",
        slideInRight: "slideInRight 0.35s cubic-bezier(0.16,1,0.3,1)",
        slideInLeft: "slideInLeft 0.35s cubic-bezier(0.16,1,0.3,1)",
        reveal: "reveal 0.6s cubic-bezier(0.16,1,0.3,1) both",
        drift: "drift 4.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
