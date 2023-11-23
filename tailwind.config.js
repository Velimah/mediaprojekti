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
        'sans': ['Roboto'],
        'robot': ['RobotoMono', 'Courier New', 'monospace'],
      },
      backgroundSize: {
        '20': '20px 20px',
      },
      backgroundImage: {
        'gridBg': 'linear-gradient(to right, #292929 1px, transparent 1px), linear-gradient(to bottom, #292929 1px, transparent 1px)',
      },
      boxShadow: {
        '3xl': '0px 0px 50px 0px rgb(0 0 0 / 72%)',
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
        slideLeft: {
          '0%': {left: '-100%'},
          '100%': {left: '0'},
        },
        slideRight: {
          '0%': {right: '-100%'},
          '100%': {right: '0'},
        },
        slideDown: {
          '0%': {transform: 'translateY(100%)'},
          '100%': {transform: 'translateY(0%)'},
        },
        alertPopUp: {
          '0%': { 
            transform: 'translateX(-50%) translateY(-50%) scale(0)',
            opacity: 0,
          },
          '100%': { 
            transform: 'translateX(-50%) translateY(-50%) scale(1)',
            opacity: 1,
          },
        },
      },
      animation: {
        'fade-in': 'opacity 0.5s ease-in-out',
        'fade-in-slow': 'opacity 1s ease-in-out',
        'fade-out': 'fadeOutopacity 0.5s ease-in-out',
        'slide-up': 'slide-up 2s ease-in-out',
        'height-in': 'heightIn 1s ease-in-out',
        'height-out': 'heightOut 1s ease-in-out',
        'slide-left': 'slideLeft 1s ease',
        'slide-right': 'slideRight 1s ease',
        'slide-down': 'slideDown 1.5s ease',
        'alert-pop-up': 'alertPopUp 0.5s ease',
      },
      transitionProperty: {
        'push-right': 'right',
      }
    },
  },
  plugins: [],
}