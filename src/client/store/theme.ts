import { prefersDark } from '%u/prefers-dark';

export type Theme = 'light' | 'dark';
export const getTheme = (): Theme => {
  const themeValue = typeof localStorage !== 'undefined' ? localStorage.getItem('theme') : undefined;
  if (themeValue === 'dark') return 'dark';
  if (themeValue === 'light') return 'light';
  if (prefersDark()) return 'dark';
  return 'light';
};

export const setTheme = (theme: Theme) => {
  const root = document.getElementById('root');
  if (root == null) return;
  root.classList.add(theme);
  root.classList.remove(theme === 'light' ? 'dark' : 'light');
  localStorage.setItem('theme', theme);
  syncThemeToDocument();
};

export const syncThemeToDocument = () => {
  const theme = localStorage.getItem('theme');
  const html = document.documentElement;
  if (theme === 'light') {
    html.style.backgroundColor = 'rgb(255 255 255)';
    html.style.color = 'rgb(15 23 42)';
  }
  if (theme === 'dark') {
    html.style.backgroundColor = 'rgb(3 7 17)';
    html.style.color = 'rgb(248 250 252)';
  }
};
