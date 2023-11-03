/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundSize: {
        '50': '50px 50px',
      },
      backgroundImage: {
        'gridBg': 'linear-gradient(to right, #c9c9c9 1px, transparent 1px), linear-gradient(to bottom, #c9c9c9 1px, transparent 1px);',
      }
    },
  },
  plugins: [],
}