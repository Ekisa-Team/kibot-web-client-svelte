import adapter from '@sveltejs/adapter-vercel';
import { extractorSvelte } from '@unocss/core';
import sveltePreprocess from 'svelte-preprocess';
import {
  presetAttributify,
  presetIcons,
  presetTagify,
  presetUno,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss';
import UnoCss from 'unocss/vite';
import { componentsShortcuts } from './src/lib/theme/unocss/shortcuts/components.js';
import { defaultShortcuts } from './src/lib/theme/unocss/shortcuts/default.js';
import { layoutShortcuts } from './src/lib/theme/unocss/shortcuts/layout.js';
import { utilitiesShortcuts } from './src/lib/theme/unocss/shortcuts/utilities.js';
import { theme } from './src/lib/theme/unocss/theme/theme.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: sveltePreprocess(),

  kit: {
    adapter: adapter(),

    vite: {
      define: {
        'process.env': process.env
      },
      plugins: [
        UnoCss({
          extractors: [extractorSvelte],
          transformers: [transformerDirectives(), transformerVariantGroup()],
          theme,
          shortcuts: [...defaultShortcuts, ...layoutShortcuts, ...componentsShortcuts, ...utilitiesShortcuts],
          presets: [
            presetIcons({
              prefix: 'icon-',
              extraProperties: {
                display: 'inline-block',
                'vertical-align': 'middle'
              },
              scale: 1.1
            }),
            presetUno(),
            presetAttributify({
              prefix: 'ui-',
              prefixedOnly: true,
              strict: true
            }),
            presetTagify()
          ]
        })
      ],
      optimizeDeps: {
        include: ['highlight.js', 'highlight.js/lib/core']
      }
    }
  }
};

export default config;
