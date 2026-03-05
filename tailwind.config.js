/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'bg': '#0a0a0a',
        'surface': '#141414',
        'surface-2': '#1e1e1e',
        'border-color': '#2a2a2a',
        'accent': '#c9a84c',
        'accent-light': '#e2c97e',
        'accent-dark': '#9a7b2c',
        'text-main': '#f5efe6',
        'text-muted': '#e8ddd0',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['"Outfit"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
