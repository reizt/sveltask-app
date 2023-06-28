export const prefersDark = () => {
  return typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)').matches : false;
};
