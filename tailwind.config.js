const keysToMap = (keys, toValue) => {
  const map = {};
  keys.forEach((key) => {
    map[key] = toValue(key);
  });
  return map;
};

const pxsToRemsMap = (pxs) => keysToMap(pxs, (px) => `${px / 10}rem`);
const sameMap = (keys) => keysToMap(keys, (k) => k);

const remsMap = pxsToRemsMap(
  new Set(
    [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,

      11, 12, 14, 16, 18, 20,

      22, 24, 26, 28, 30,

      32, 34, 36, 38, 40,

      50, 60, 70, 80, 90, 100,

      120, 140, 160, 180, 200,

      220, 240, 260, 280, 300,

      320, 340, 360, 380, 400,

      420, 440, 460, 480, 500,
    ].sort((x, y) => x - y), // asc order
  ),
);

const nonNumericals = { 'screen-x': '100vw', 'screen-y': '100vh', auto: 'auto', full: '100%' };

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,svelte}'],
  theme: {
    colors: {
      transparent: 'transparent',
      white: '#ffffff',
      black: '#000000',
      gray: {
        32: '#323435',
        50: '#505050',
        60: '#606060',
        97: '#97999b',
        b9: '#b9b9b9',
        dd: '#dddddd',
        e0: '#e0e0e0',
        f0: '#f0f0f0',
        f9: '#f9f9f9',
      },
      // primary: {
      //   DEFAULT: '#4063e3',
      //   light: '#8c9fec',
      // },
    },
    spacing: { ...remsMap, ...nonNumericals },
    fontSize: remsMap,
    borderRadius: { ...remsMap, full: '100%' },
    borderWidth: pxsToRemsMap([0, 1, 2, 3, 4, 5]),
    boxShadow: {
      land: '0 0 0.8rem 0 rgba(0, 0, 0, 0.1)',
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      bold: 700,
    },
    fontFamily: {
      'lexend-peta': ['Lexend Peta', 'sans-serif'],
    },
    extend: {
      maxWidth: remsMap,
      maxHeight: remsMap,
      minWidth: remsMap,
      minHeight: remsMap,
    },
  },
};
