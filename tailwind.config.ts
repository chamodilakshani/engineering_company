import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#0B0C10",       // Deep Industrial Black
        slate: "#1F2833",      // Dark Slate
        gold: "#E5A93C",       // Mechanical Gold / Warning Orange
        hydra: "#66FCF1",      // Hydraulic Blue
        steel: "#C5C6C7",      // Muted steel text
      },
      fontFamily: {
        sans: ["var(--font-jakarta)"],
      },
      backgroundImage: {
        "stripe-diagonal":
          "repeating-linear-gradient(115deg, transparent 0px, transparent 18px, rgba(229,169,60,0.08) 18px, rgba(229,169,60,0.08) 26px)",
        "grid-fade":
          "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(102,252,241,0.12), transparent)",
      },
      boxShadow: {
        gold: "0 0 30px rgba(229,169,60,0.25)",
        hydra: "0 0 30px rgba(102,252,241,0.25)",
      },
      keyframes: {
        spinGear: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 0px rgba(229,169,60,0.0)" },
          "50%": { boxShadow: "0 0 24px rgba(229,169,60,0.55)" },
        },
      },
      animation: {
        gear: "spinGear 6s linear infinite",
        pulseGlow: "pulseGlow 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
