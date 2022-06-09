import { browser } from '$app/env';
import { Theme } from '$lib/enums/theme';
import { getTheme } from '$lib/services/theme';
import { writable } from 'svelte/store';

type ThemeState = {
  theme: Theme;
};

function createThemeStore() {
  const { subscribe, set, update } = writable<ThemeState>({
    theme: (browser && getTheme()) || Theme.System
  });

  return {
    subscribe,
    set,
    update,

    change(theme: Theme) {
      set({ theme });
    }
  };
}

export const themeStore = createThemeStore();
