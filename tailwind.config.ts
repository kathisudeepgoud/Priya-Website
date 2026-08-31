import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        wine: "var(--color-wine, #7A1B34)",
        "wine-deep": "var(--bg-section-alt, #1B1512)",
        charcoal: "var(--bg-card-surface, #0B0908)",
        cream: "var(--text-main, #EFE6D2)",
        silver: "var(--text-sub, #B7AFA0)",
        gold: "var(--text-accent, #C9A567)",
        champagne: "var(--text-accent, #E5B95C)",
        navy: "var(--bg-accent-section, #161210)"
      },
      fontFamily: {
        display: ["var(--font-anton)", "sans-serif"],
        label: ["var(--font-oswald)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"]
      },
      borderRadius: {
        xl2: "1.75rem"
      }
    }
  },
  plugins: []
};
export default config;
