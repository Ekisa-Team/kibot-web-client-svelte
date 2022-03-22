<script context="module" lang="ts">
  import Footer from '$lib/components/Footer.svelte';
  import Navbar from '$lib/components/Navbar.svelte';
  import Sidebar from '$lib/components/sidebar/Sidebar.svelte';
  import { setupTheming } from '$lib/services/theme';
  import { setupTranslations } from '$lib/services/translate';
  import '$theme/styles.css';
  import 'uno.css';

  // i18n
  export const load: import('@sveltejs/kit').Load = async ({ url }) => {
    return setupTranslations(url.pathname);
  };

  // Application theme
  setupTheming();
</script>

<div class="layout">
  <Navbar />
  <Sidebar />
  <main class="container mx-auto">
    <slot />
  </main>
  <Footer />
</div>

<style lang="postcss">
  .layout {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: var(--size-navbar-height) 1fr var(--size-footer-height);
    gap: 0;
    grid-template-areas:
      'navbar'
      'main'
      'footer';
    height: 100vh;
  }

  @media only screen and (min-width: theme('screens.md')) {
    .layout {
      grid-template-columns: min-content 1fr;
      grid-template-areas:
        'navbar navbar'
        'sidebar main'
        'sidebar footer';
    }
  }

  main {
    grid-area: main;
    @apply p-4 md:p-6;
  }
</style>
