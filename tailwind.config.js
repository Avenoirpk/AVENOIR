/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#fbf5ee",
        navy: "#12183f",
        navy2: "#1c2454",
        gold: "#c9a24b",
        goldlight: "#e8cd8a",
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        sans: ["Poppins", "ui-sans-serif", "system-ui"],
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        drawUnderline: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
      },
      animation: {
        shimmer: "shimmer 2.5s linear infinite",
        marquee: "marquee 22s linear infinite",
        drawUnderline: "drawUnderline 0.8s ease forwards",
      },
    },
  },
  plugins: [],
};
