import { browser } from '$app/env';
import { Theme } from '$lib/enums/theme';
import { appTheme } from '$lib/stores/app-theme';
import { getItem, LocalStorageItem, setItem } from '$lib/utils/local-storage';

const mediaQuery = browser && window.matchMedia('(prefers-color-scheme: dark)');

/**
 * Get theme based on user's preference
 *
 */
const getSystemTheme = (): Theme.Light | Theme.Dark =>
  mediaQuery && mediaQuery.matches ? Theme.Dark : Theme.Light;

/**
 * Listen for theme changes on user's system
 *
 */
const listenForMediaChanges = () => {
  browser &&
    mediaQuery &&
    mediaQuery.addEventListener('change', () => {
      // Only applies changes if the current theme is "system"
      if (getTheme() === Theme.System) {
        setTheme(Theme.System);
      }
    });
};

/**
 * Clear all previous themes from the HTML element
 *
 */
const clearThemes = () => {
  for (const theme in Theme) {
    const key: Theme = Theme[theme as keyof typeof Theme];
    document.documentElement.classList.remove(key);
  }
};

/**
 * Get current theme
 *
 */
function getTheme(): Theme | null {
  if (!browser) return null;
  return getItem<Theme>(LocalStorageItem.Theme);
}

/**
 * Manually changes theme in LocalStorage & HTML body
 *
 * @param theme new theme
 */
function setTheme(theme: Theme) {
  if (!browser) return;

  clearThemes();
  setItem(LocalStorageItem.Theme, theme);

  let themeClass = theme;

  if (theme === Theme.System) {
    themeClass = getSystemTheme();
  }

  document.documentElement.classList.add(themeClass);
}

/**
 * Listen for theme changes
 *
 */
function setupTheming() {
  appTheme.subscribe((theme) => {
    if (!browser) return;

    listenForMediaChanges();
    setTheme(theme);
  });
}

export { setupTheming, getTheme, setTheme };
