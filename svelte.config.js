import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import { presetIcons } from 'unocss';
import unocss from 'unocss/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess({
    defaults: {
      style: 'postcss'
    },
    postcss: true
  }),
  kit: {
    adapter: adapter(),
    vite: {
      plugins: [
        unocss({
          presets: [
            presetIcons({
              prefix: 'i-',
              extraProperties: {
                display: 'inline-block',
                'vertical-align': 'middle'
              },
              scale: 1.2
            })
          ]
        })
      ]
    }
  }
};

export default config;
