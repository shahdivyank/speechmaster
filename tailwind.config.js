/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sm: {
          red: "#FF505B",
          blue: "#5DA6C5",
          orange: "#FF6935",
          lightgrey: "#F3F3F3",
          grey: "#888888",
          beige: "#F4E7DD",
          white: "#FFFFFF",
          black: "#000000",
          lightbeige: "#F1EDEB",
        },
      },
      fontFamily: {
        poppins: ["var(--font-poppins)"],
      },
    },
  },
  plugins: [],
};
