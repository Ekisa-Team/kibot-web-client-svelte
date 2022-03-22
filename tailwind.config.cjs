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
      },
      colors: {
        blue: {
          100: '#ccebff',
          200: '#99d6ff',
          300: '#66c2ff',
          400: '#33adff',
          500: '#0099ff',
          600: '#007acc',
          700: '#005c99',
          800: '#003d66',
          900: '#001f33'
        },
        green: {
          100: '#e5f4f3',
          200: '#cce9e7',
          300: '#b2dfda',
          400: '#99d4ce',
          500: '#7fc9c2',
          600: '#66a19b',
          700: '#4c7974',
          800: '#33504e',
          900: '#192827'
        }
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
