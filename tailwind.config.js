/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,md,njk}",
  ],
  plugins: [
    require("@tailwindcss/typography"),
  ],
  darkMode: false,
  theme: {
    extend: {},
  },
  safelist: [],
}
