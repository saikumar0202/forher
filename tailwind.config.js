/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['ui-rounded', 'Nunito', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: '#090611',
        panel: '#130e21',
        lavender: '#bba5ff',
        pink: '#fb7ecb',
      },
      boxShadow: {
        glow: '0 0 42px rgba(180, 126, 255, .18)',
      },
    },
  },
  plugins: [],
}
