/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        black: {
          DEFAULT: '#0d0d0b',
          soft: '#161612',
          mid: '#1e1e19',
          border: '#2a2a2a',
        },
        gold: {
          DEFAULT: '#c49a3c',
          light: '#d4ae5c',
          dark: '#9a7828',
          subtle: 'rgba(196,154,60,0.12)',
        },
        cream: {
          DEFAULT: '#ede8dc',
          dark: '#7a7568',
        },
        ink: {
          DEFAULT: '#0d0d0b',
          soft: '#161612',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['"Jost"', 'system-ui', 'sans-serif'],
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
