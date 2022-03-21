<script context="module" lang="ts">
  import { browser } from '$app/env';
  import Footer from '$lib/components/footer/Footer.svelte';
  import Navbar from '$lib/components/navbar/Navbar.svelte';
  import Sidebar from '$lib/components/sidebar/Sidebar.svelte';
  import { appTheme } from '$lib/stores/app-theme';
  import { loadTranslations, locale } from '$lib/translations';
  import { getItem, LocalStorageItem } from '$lib/utils/local-storage';
  import '$theme/styles.css';
  import 'uno.css';

  // i18n
  export const load: import('@sveltejs/kit').Load = async ({ url }) => {
    const { pathname } = url;

    const lang = browser && getItem<string>(LocalStorageItem.Language);

    const defaultLocale = lang || 'en';

    const initLocale = locale.get() || defaultLocale;

    await loadTranslations(initLocale, pathname);

    return {};
  };

  // Application theme
  appTheme.subscribe((v) => {
    console.log(v);
    if (document.documentElement) {
      document.documentElement.className = '';
      document.documentElement.classList.add(v);
    }
  });
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
