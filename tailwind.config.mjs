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
        sans: ["var(--font-iransans)", "Tahoma", "sans-serif"],
        rubik: ["var(--font-rubik)", "Tahoma", "sans-serif"],
      },
      /**
       * Figma IRANSans type scale (px only).
       * line-height 100% → "1"; otherwise explicit px.
       */
      fontSize: {
        body: ["14px", { lineHeight: "21px", letterSpacing: "0" }],
        "body-tight": ["14px", { lineHeight: "1", letterSpacing: "0" }],
        "body-sm": ["14px", { lineHeight: "16px", letterSpacing: "0" }],
        "body-loose": ["14px", { lineHeight: "24px", letterSpacing: "0" }],
        title: ["16px", { lineHeight: "1", letterSpacing: "0" }],
        heading: ["18px", { lineHeight: "1", letterSpacing: "0" }],
        "heading-lg": ["20px", { lineHeight: "1", letterSpacing: "0" }],
        display: ["32px", { lineHeight: "1", letterSpacing: "0" }],
      },
      fontWeight: {
        normal: "400",
        medium: "500",
        bold: "700",
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
