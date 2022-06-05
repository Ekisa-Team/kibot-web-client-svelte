<script lang="ts">
  import Logo from '$lib/components/Logo.svelte';
  import LangToggle from './LangToggle.svelte';
  import { sidebarStore } from './sidebar/store';
  import ThemeToggle from './ThemeToggle.svelte';

  const toggleSidebar = () => {
    sidebarStore.update((state) => ({ ...state, isOpen: !state.isOpen }));
  };
</script>

<nav>
  <!-- left -->
  <div class="flex items-center space-x-5">
    <button type="button" class="btn btn-secondary btn-fit" on:click={toggleSidebar}>
      {#if $sidebarStore.isOpen}
        <div class="i-fxemoji:ballottscriptx text-xl" />
      {:else}
        <div class="i-fxemoji:hamburger text-xl" />
      {/if}
    </button>

    <Logo />
  </div>

  <!-- right -->
  <div class="flex items-center space-x-3">
    <a href="/applications" class="btn btn-secondary btn-inline btn-fit space-x-2">
      <div class="i-ph:arrow-circle-left-duotone text-xl text-blue-400" />
      <span class="hidden md:inline">Regresar</span>
    </a>
    <LangToggle showLanguage={false} />
    <ThemeToggle />
  </div>
</nav>

<style lang="postcss">
  nav {
    grid-area: navbar;
    @apply bg-white/20 backdrop-blur-lg dark:bg-zinc-900/80;
    @apply fixed inset-x-auto top-0;
    @apply border-b border-zinc-200 dark:border-zinc-800;
    @apply px-2.5;
    @apply rounded;
    @apply w-full;
    @apply z-20;
    @apply bg-opacity-75;
    @apply flex flex-wrap items-center justify-between;
    height: var(--size-navbar-height);
  }
</style>
