import i18n from 'sveltekit-i18n';
import lang from './lang.json';

const config: import('sveltekit-i18n').Config = {
  fallbackLocale: 'en',
  translations: {
    en: { lang },
    es: { lang }
  },
  loaders: [
    {
      locale: 'en',
      key: 'layout',
      loader: async () => await import('./en/layout.json')
    },
    {
      locale: 'es',
      key: 'layout',
      loader: async () => await import('./es/layout.json')
    }
  ]
};

export const { t, locale, locales, loading, loadTranslations } = new i18n(config);
