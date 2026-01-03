/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // Your code relies on standard colors, so no custom colors needed here
      // unless you want to lock "red-600" to a specific brand hex code.
      colors: {
        brand: {
          red: '#DC2626', // Matching tailwind red-600
          dark: '#0F172A', // Matching tailwind slate-900
        }
      }
    },
  },
  plugins: [],
}