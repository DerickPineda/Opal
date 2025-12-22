/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        opal: {
          light: '#a5bfb6',
          DEFAULT: '#90aaa1',
          dark: '#6b8077',
          darker: '#29342e',
          darkest: '#171916',
        },
      },
    },
  },
  plugins: [],
};
