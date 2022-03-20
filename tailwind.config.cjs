module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    extend: {}
  },
  plugins: [require('prettier-plugin-tailwindcss')]
};
