import adapter from '@sveltejs/adapter-auto';
import presetIcons from '@unocss/preset-icons';
import path from 'path';
import preprocess from 'svelte-preprocess';
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
                display: 'inline-block'
              }
            })
          ]
        })
      ],
      resolve: {
        alias: {
          $lib: path.resolve('./src/lib')
        }
      }
    }
  }
};

export default config;
