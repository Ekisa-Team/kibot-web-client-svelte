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
    <LangToggle showLanguage={false} />
    <ThemeToggle />
  </div>
</nav>

<style lang="postcss">
  nav {
    grid-area: navbar;
    @apply bg-navbar;
    @apply fixed inset-x-auto top-0;
    @apply border-b border-accent;
    @apply px-2.5;
    @apply rounded;
    @apply w-full;
    @apply z-20;
    @apply bg-opacity-75;
    @apply flex flex-wrap items-center justify-between;
    height: var(--size-navbar-height);
  }
</style>
