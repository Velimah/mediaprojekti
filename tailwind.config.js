/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ai-primary': '#92DA36', // green
        'ai-secondary': '#FFE66B', // yellow
        'ai-tertiary': '#e26262', // red
        'ai-black': '#161616',
        'ai-black-100': '#1e1e1e',
      },
      fontFamily: {
        'robot': 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;',
      },
      backgroundSize: {
        '20': '20px 20px',
      },
      backgroundImage: {
        'gridBg': 'linear-gradient(to right, rgba(201, 201, 201, 0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(201, 201, 201, 0.5) 1px, transparent 1px);',
      },
      keyframes: {
        opacity: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOutopacity: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        heightIn: {
          '0%': {height: '0px'},
          '100%': {height: '100%'},
        },
        heightOut: {
          'from': {height: '100%', opacity : '1'},
          'to': {height: '0%', opacity : '0'},
        },
      },
      animation: {
        'fade-in': 'opacity 0.5s ease-in-out',
        'fade-out': 'fadeOutopacity 0.5s ease-in-out',
        'slide-up': 'slide-up 2s ease-in-out',
        'height-in': 'heightIn 1s ease-in-out',
        'height-out': 'heightOut 1s ease-in-out',
      },
    },
  },
  plugins: [],
}