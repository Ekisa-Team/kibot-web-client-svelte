import i18n from 'sveltekit-i18n';

const config: import('sveltekit-i18n').Config = {
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
    }
  ]
};

export const { t, locale, locales, loading, loadTranslations } = new i18n(config);
