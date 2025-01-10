/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'sb-dark': '#1C1C1C',
        'sb-darker': '#121212',
        'sb-green': '#3ECF8E',
        'sb-lighter': '#2A2A2A',
      }
    },
  },
  plugins: [],
};