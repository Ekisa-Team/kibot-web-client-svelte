<script context="module" lang="ts">
  import Breadcrumb from '$lib/components/breadcrumb/Breadcrumb.svelte';
  import type { BreadcrumbItems } from '$lib/components/breadcrumb/types';
  import Footer from '$lib/components/Footer.svelte';
  import Navbar from '$lib/components/Navbar.svelte';
  import { setupTheming } from '$lib/services/theme';
  import { setupTranslations } from '$lib/services/translate';
  import '$lib/theme/styles.css';
  import 'uno.css';

  // i18n
  export const load: import('@sveltejs/kit').Load = async ({ url }) => {
    return setupTranslations(url.pathname);
  };

  // Application theme
  setupTheming();

  const breadcrumbItems: BreadcrumbItems = [
    { icon: 'i-fa-solid:terminal', text: 'Applications', path: '/applications' },
    { text: 'Chatbots', path: '/chatbots' }
  ];
</script>

<div class="layout">
  <Navbar />
  <main class="container mx-auto">
    <Breadcrumb items={breadcrumbItems} />
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

  main {
    grid-area: main;
    @apply p-4 md:p-6;
  }
</style>
