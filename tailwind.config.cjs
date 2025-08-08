/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // if using Next.js App Router
  ],
  theme: {
    extend: {
      colors: {
        black: "#5d8076",
        greenLight: "#C4D4D0",
        yellow: "#f8a664",
        yellowLight: "#FAC79E",
        orangeLight: "#FBD2B1",
        orangeDark: "#d03337",
        greyLight: "#242426",
        greyLightest: "#636369",
        greyDark: "#141213",
        whiteCustom: "#FFFAFA",
      },
    },
  },
  plugins: [],
};
