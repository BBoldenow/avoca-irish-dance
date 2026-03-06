/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'bg': '#0D0D0B',
        'surface': '#161612',
        'surface-2': '#1E1E19',
        'accent': '#C49A3C',
        'accent-light': '#D4AE5C',
        'accent-dark': '#9A7828',
        'text-main': '#EDE8DC',
        'text-muted': '#7A7568',
        'border-subtle': 'rgba(237,232,220,0.07)',
        'border': 'rgba(196,154,60,0.18)',
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
