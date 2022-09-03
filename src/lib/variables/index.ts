export const variables = {
  kibotCoreApiUrl: import.meta.env['VITE_KIBOT_CORE_API_URL'] || process.env['VITE_KIBOT_CORE_API_URL'],
  kibotMiddlewareQuironApiUrl:
    import.meta.env['VITE_KIBOT_MIDDLEWARE_QUIRON_API_URL'] || process.env['VITE_KIBOT_MIDDLEWARE_QUIRON_API_URL']
};
