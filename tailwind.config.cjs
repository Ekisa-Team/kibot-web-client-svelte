module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundColor: {
        primary: 'var(--color-bg-primary)',
        secondary: 'var(--color-bg-secondary)',
        accent: 'var(--color-bg-accent)',
        navbar: 'var(--color-bg-navbar)',
        sidebar: 'var(--color-bg-sidebar)',
        footer: 'var(--color-bg-footer)'
      },
      textColor: {
        primary: 'var(--color-text-primary)',
        heading: 'var(--color-text-heading)'
      },
      borderColor: {
        accent: 'var(--color-border-accent)'
      }
    }
  },
  variants: {
    extend: {
      backgroundOpacity: ['backgroundColor']
    }
  },
  plugins: [require('prettier-plugin-tailwindcss')]
};
