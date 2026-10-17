/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: "#0f0f0f",
          elevated: "#1a1a1a",
          muted: "#242424",
        },
        border: "#2e2e2e",
        text: {
          primary: "#f5f5f5",
          secondary: "#c4c4c4",
          muted: "#8a8a8a",
        },
        accent: {
          DEFAULT: "#f5c518",
          hover: "#ffd84d",
        },
        ink: "#111111",
        tabdeal: {
          DEFAULT: "#f5c518",
          dark: "#0f0f0f",
        },
      },
      fontFamily: {
        sans: ["var(--font-vazirmatn)", "Tahoma", "sans-serif"],
      },
      fontSize: {
        "page-title": ["1.5rem", { lineHeight: "2.25rem" }],
        "section-title": ["1.125rem", { lineHeight: "1.75rem" }],
        "video-title": ["0.9375rem", { lineHeight: "1.5rem" }],
        body: ["0.875rem", { lineHeight: "1.5rem" }],
        caption: ["0.75rem", { lineHeight: "1.25rem" }],
      },
      maxWidth: {
        content: "1180px",
      },
      boxShadow: {
        player: "0 12px 40px rgba(0, 0, 0, 0.45)",
        header: "0 8px 32px rgba(245, 197, 24, 0.08)",
      },
      backgroundImage: {
        "header-gradient":
          "linear-gradient(180deg, rgba(245, 197, 24, 0.18) 0%, rgba(245, 197, 24, 0.05) 45%, rgba(15, 15, 15, 0) 100%)",
        "page-glow":
          "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(245, 197, 24, 0.22), transparent 70%)",
      },
    },
  },
  plugins: [],
};

export default config;
