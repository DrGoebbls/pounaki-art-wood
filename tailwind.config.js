/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#1976D2', dark: '#125a9c', light: '#e8f1fc' },
        bg: '#F8F9FB',
        wood: { DEFAULT: '#8B5E3C', dark: '#5c3a21', light: '#c79b6f' },
        gold: { DEFAULT: '#C89B3C', light: '#e6cf94' },
        ink: '#1F2937',
      },
      fontFamily: {
        vazir: ['var(--font-vazir)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
