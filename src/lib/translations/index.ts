import i18n from 'sveltekit-i18n';
import lang from './lang.json';

const config: import('sveltekit-i18n').Config = {
  fallbackLocale: 'en',
  translations: {
    en: { lang },
    es: { lang },
    ja: { lang }
  },
  loaders: [
    {
      locale: 'en',
      key: 'layout',
      loader: async () => (await import('./en/layout.json')).default
    },
    {
      locale: 'es',
      key: 'layout',
      loader: async () => (await import('./es/layout.json')).default
    },
    {
      locale: 'ja',
      key: 'layout',
      loader: async () => (await import('./ja/layout.json')).default
    }
  ]
};

export const { t, locale, locales, loading, loadTranslations } = new i18n(config);
console.log(locales.get());
loading.subscribe(($loading) => $loading && console.log('Loading translations...'));
