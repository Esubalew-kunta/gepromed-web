import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // GEPROMED brand blue. Exact anchor #0077bb pulled from the live site's
        // Bootstrap token (--bs-primary) plus its own tint/shade stops. This is
        // the wordmark colour; do not approximate by eye.
        brand: {
          50: "#f0f9ff",
          100: "#cce4f1",
          200: "#99c9e4",
          300: "#66add6",
          400: "#3392cc",
          500: "#0077bb", // ← real anchor
          600: "#006aa6",
          700: "#005a8c",
          800: "#004770", // real (--bs-primary-border-subtle dark)
          900: "#00304b", // real (--bs-primary-text-emphasis)
          950: "#001825", // real (--bs-primary-bg-subtle dark)
        },
        // Safety orange. Exact anchor #ed6d16 (live site --bs-secondary / --bs-orange),
        // the "FOR PATIENT SAFETY" colour in the logo. SEMANTIC ONLY: reserved for
        // genuine patient-safety / explant-analysis moments, never a generic accent.
        safety: {
          50: "#fdf3ec",
          100: "#fbe2d0", // real (--bs-secondary-bg-subtle)
          200: "#f8c5a2", // real (--bs-secondary-border-subtle)
          300: "#f4a773", // real (--bs-secondary-text-emphasis light)
          400: "#f18a44",
          500: "#ed6d16", // ← real anchor
          600: "#b05f0d", // real
          700: "#8e410d", // real (--bs-secondary-border-subtle dark)
        },
        // Original accent, restored for the original V2 hero CTA (per client request).
        accent: {
          DEFAULT: "#f59e42",
          soft: "#fde6c8",
        },
        // Cool "radiograph paper" neutral. Deliberately not warm cream, not flat
        // white, not pure black: a faint blue-cool undertone that harmonises with
        // the brand blue and reads as instrument housing / imaging film.
        paper: "#f4f7f9",
        mist: "#e9eef2",
        line: "#d7dfe5",
        ink: {
          DEFAULT: "#0e1a24", // blue-black, not #000
          soft: "#33485c",
          muted: "#6b7f8f",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        soft: "0 24px 60px -28px rgba(0, 48, 75, 0.38)",
        card: "0 1px 2px rgba(14, 26, 36, 0.04), 0 12px 30px -20px rgba(0, 48, 75, 0.28)",
      },
      borderRadius: {
        xl2: "1rem",
      },
      letterSpacing: {
        annotation: "0.16em",
      },
      keyframes: {
        "rise-in": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "sweep": {
          "0%": { strokeDashoffset: "1" },
          "100%": { strokeDashoffset: "0" },
        },
      },
      animation: {
        "rise-in": "rise-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
