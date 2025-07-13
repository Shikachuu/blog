/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0066FF",
          dark: "#0052CC",
        },
        secondary: {
          DEFAULT: "#00FF88",
          dark: "#00CC6A",
        },
        accent: {
          DEFAULT: "#FF0066",
          dark: "#CC0052",
        },
        orange: {
          DEFAULT: "#FF6600",
          dark: "#CC5200",
        },
        neutral: {
          50: "#FAFAFA",
          100: "#F5F5F5",
          200: "#E5E5E5",
          300: "#D4D4D4",
          400: "#A3A3A3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
          950: "#0A0A0A",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "Consolas", "monospace"],
      },
      boxShadow: {
        brutal: "6px 6px 0px 0px rgba(0, 0, 0, 1)",
        "brutal-sm": "3px 3px 0px 0px rgba(0, 0, 0, 1)",
        "brutal-lg": "8px 8px 0px 0px rgba(0, 0, 0, 1)",
        "brutal-primary": "6px 6px 0px 0px #0066FF",
        "brutal-secondary": "6px 6px 0px 0px #00FF88",
        "brutal-accent": "6px 6px 0px 0px #FF0066",
        "brutal-orange": "6px 6px 0px 0px #FF6600",
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        "pulse-slow": "pulse 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      minHeight: {
        touch: "44px",
      },
      minWidth: {
        touch: "44px",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    ({ addUtilities }) => {
      const newUtilities = {
        ".touch-target": {
          "min-height": "44px",
          "min-width": "44px",
        },
        ".focus-ring": {
          outline: "3px solid transparent",
          "outline-offset": "2px",
          "&:focus": {
            "outline-color": "#0066FF",
          },
          "&:focus-visible": {
            "outline-color": "#0066FF",
          },
        },
        ".focus-ring-dark": {
          ".dark &:focus": {
            "outline-color": "#00FF88",
          },
          ".dark &:focus-visible": {
            "outline-color": "#00FF88",
          },
        },
      }
      addUtilities(newUtilities)
    },
  ],
}
