/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: "#2C2E30",
          elevated: "#1a1a1a",
          light: "#3B3D3F",
          muted: "#3a3c3e",
          like: "#4F5154",
        },
        border: {
          DEFAULT: "#404244",
          muted: "#3a3c3e",
        },
        text: {
          primary: "#ffffff",
          secondary: "#c4c4c4",
          muted: "#8a8a8a",
        },
        accent: {
          DEFAULT: "#F0B90B",
          hover: "#ffd24a",
        },
        tag: "#2EC0FF",
        ink: "#111111",
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
        content: "1680px",
      },
      boxShadow: {
        player: "0 12px 40px rgba(0, 0, 0, 0.45)",
      },
      backgroundImage: {
        "header-gradient":
          "linear-gradient(90deg, #2C2E30 -0.76%, #0E0E0E 50%)",
      },
    },
  },
  plugins: [],
};

export default config;
