import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        kdm: {
          bg: "#0A0A0B",
          bg2: "#111114",
          graphite: "#1C1D21",
          chrome: "#C9CDD3",
          "chrome-dim": "#8B8E96",
          "chrome-faint": "#54565C",
          orange: "#FF5A1F",
          magenta: "#E4007C",
          cyan: "#00C2D1",
          yellow: "#FFC400",
        },
      },
      backgroundImage: {
        "kdm-gradient": "linear-gradient(115deg, #FF5A1F 0%, #FF2E6D 52%, #E4007C 100%)",
      },
      fontFamily: {
        display: ["var(--font-sora)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
