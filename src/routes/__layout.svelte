<script context="module" lang="ts">
  import Breadcrumb from '$lib/components/breadcrumb/Breadcrumb.svelte';
  import type { BreadcrumbItems } from '$lib/components/breadcrumb/types';
  import Breakpoints from '$lib/components/Breakpoints.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import Navbar from '$lib/components/Navbar.svelte';
  import Sidebar from '$lib/components/sidebar/Sidebar.svelte';
  import { setupTheming } from '$lib/services/theme';
  import { setupTranslations } from '$lib/services/translate';
  import { SvelteToast } from '@zerodevx/svelte-toast';

  import 'uno.css';
  // prettier-ignore
  import '$lib/theme/styles.css';

  // i18n
  export const load: import('@sveltejs/kit').Load = async ({ url }) => {
    return setupTranslations(url.pathname);
  };

  // Application theme
  setupTheming();

  const breadcrumbItems: BreadcrumbItems = [
    { icon: 'icon-fa-solid:terminal', text: 'Applications', path: '/applications' },
    { text: 'Chatbots', path: '/chatbots' },
    { text: 'Messages' }
  ];
</script>

<SvelteToast
  options={{
    duration: 6000,
    pausable: true,
    dismissable: true
  }} />

<div class="layout">
  <Navbar />
  <Sidebar />
  <main class="container mx-auto w-full">
    <Breadcrumb items={breadcrumbItems} />
    <slot />
  </main>
  <Footer />
</div>

<Breakpoints />

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

  @media only screen and (min-width: 768px) {
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
    @apply p-4;
  }
</style>
