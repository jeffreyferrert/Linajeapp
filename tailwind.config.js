/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      colors: {
        primary: '#184DC9',
        secondary: '#F1F4FA',
        inputgray: '#B9B4C4',
        skyblue: '#38B6FF',
      },
    },
  },
  plugins: [],
};
