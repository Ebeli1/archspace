/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#1A1A2E',
          dark: '#0F0F1E',
          light: '#2D2D4E',
        },
        accent: {
          DEFAULT: '#C8A96E',
          light: '#F5EDD8',
          dark: '#8B6A2E',
        },
      },
    },
  },
  plugins: [],
}
