<script context="module" lang="ts">
  // i18n
  export const load: import('@sveltejs/kit').Load = async ({ url }) => {
    return setupTranslations(url.pathname);
  };
</script>

<script lang="ts">
  import Breakpoints from '$lib/components/Breakpoints.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import Navbar from '$lib/components/Navbar.svelte';
  import { setupTheming } from '$lib/services/theme';
  import { setupTranslations } from '$lib/services/translate';
  import { SvelteToast } from '@zerodevx/svelte-toast';
  import 'uno.css';
  // prettier-ignore
  import '$lib/theme/styles.css';

  // Application theme
  setupTheming();
</script>

<SvelteToast
  options={{
    duration: 6000,
    intro: { y: -64 }
  }} />

<div class="layout">
  <Navbar />
  <main class="container mx-auto w-full">
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

  main {
    grid-area: main;
    @apply p-4;
  }
</style>
