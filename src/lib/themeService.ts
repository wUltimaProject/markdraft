export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'md_viewer_theme';

function getSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export const themeService = {
  getCurrentTheme(): Theme {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
    return getSystemTheme();
  },

  applyTheme(theme: Theme): void {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
  },

  toggle(): Theme {
    const current = this.getCurrentTheme();
    const next: Theme = current === 'dark' ? 'light' : 'dark';
    this.applyTheme(next);
    return next;
  },

  init(): void {
    this.applyTheme(this.getCurrentTheme());
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        this.applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  },
};
