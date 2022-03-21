import { browser } from '$app/env';
import { loadTranslations, locale } from '$lib/translations';
import { getItem, LocalStorageItem } from '$lib/utils/local-storage';

export async function setupTranslations(pathname: string) {
  const lang = browser && getItem<string>(LocalStorageItem.Language);

  const defaultLocale = lang || 'en';

  const initLocale = locale.get() || defaultLocale;

  await loadTranslations(initLocale, pathname);

  return {};
}
