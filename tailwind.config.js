/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1D4ED8", // Blue tone for primary accents
        secondary: "#1E293B", // Dark grayish-black for background
        accent: "#3B82F6", // Lighter blue for highlights
        textPrimary: "#E2E8F0", // Light text color
      },
    },
  },
  plugins: [],
}
