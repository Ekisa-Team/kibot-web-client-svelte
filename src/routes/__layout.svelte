<script context="module" lang="ts">
  import { browser } from '$app/env';
  import Footer from '$components/footer/Footer.svelte';
  import Navbar from '$components/navbar/Navbar.svelte';
  import Sidebar from '$components/sidebar/Sidebar.svelte';
  import { loadTranslations, locale } from '$lib/translations';
  import { getItem, LocalStorageItem } from '$lib/utils/local-storage';
  import '$theme/styles.css';
  import 'flowbite/dist/flowbite.css';
  import 'uno.css';

  export const load: import('@sveltejs/kit').Load = async ({ url }) => {
    const { pathname } = url;

    const lang = browser && getItem<string>(LocalStorageItem.Language);

    const defaultLocale = lang || 'en';
    const initLocale = locale.get() || defaultLocale;
    await loadTranslations(initLocale, pathname);

    return {};
  };
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
