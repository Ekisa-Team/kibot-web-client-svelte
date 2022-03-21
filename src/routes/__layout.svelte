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

<Navbar />

<Sidebar />

<div class="content-wrapper">
  <main class="flex-1 p-4 md:p-6">
    <slot />
  </main>
  <Footer />
</div>

<style lang="postcss">
  .content-wrapper {
    @apply flex flex-col;
    @apply mx-auto max-w-screen-2xl pl-64;
    @apply pt-16;
    @apply relative;
    @apply h-full w-full;
  }
</style>
