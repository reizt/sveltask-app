import { prefersDark } from '#/utils/prefers-dark';

export type Theme = 'light' | 'dark';
export const getTheme = (): Theme => {
  const themeValue = localStorage.getItem('theme');
  if (themeValue === 'dark') return 'dark';
  if (themeValue === 'light') return 'light';
  if (prefersDark()) return 'dark';
  return 'light';
};

export const setTheme = (theme: Theme) => {
  document.documentElement.classList.add(theme);
  document.documentElement.classList.remove(theme === 'light' ? 'dark' : 'light');
  localStorage.setItem('theme', theme);
  if (theme === 'light') {
    document.documentElement.style.backgroundColor = 'rgb(255 255 255)';
    document.documentElement.style.color = 'rgb(15 23 42)';
  }
  if (theme === 'dark') {
    document.documentElement.style.backgroundColor = 'rgb(3 7 17)';
    document.documentElement.style.color = 'rgb(248 250 252)';
  }
};
