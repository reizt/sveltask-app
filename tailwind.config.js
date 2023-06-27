/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,svelte}'],
  theme: {
    colors: {
      white: '#ffffff',
      black: '#000000',
      gray: {
        32: '#323435',
        97: '#97999b',
        b9: '#b9b9b9',
        f9: '#f9f9f9',
      },
      primary: {
        DEFAULT: '#4063e3',
        light: '#8c9fec',
      },
    },
  },
};
