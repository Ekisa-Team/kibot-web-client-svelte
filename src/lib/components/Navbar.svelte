<script lang="ts">
  import Logo from '$lib/components/Logo.svelte';
  import { sidebarState } from '$lib/components/sidebar/store';
  import ThemeToggle from './ThemeToggle.svelte';

  const toggleSidebar = () => {
    sidebarState.update((state) => {
      return {
        lastEventType: 'click',
        isOpen: !state.isOpen
      };
    });
  };
</script>

<nav>
  <!-- left -->
  <div class="flex items-center space-x-3">
    <button type="button" class="btn btn-secondary btn-fit" on:click={toggleSidebar}>
      {#if $sidebarState.isOpen && $sidebarState.lastEventType === 'hover'}
        <div class="i-fxemoji:ballottscriptx animate-ping text-xl" />
      {:else}
        <div class="i-fxemoji:hamburger text-xl" />
      {/if}
    </button>

    <Logo />
  </div>

  <!-- right -->
  <div class="flex items-center">
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
    @apply z-10;
    @apply bg-opacity-75;
    @apply flex flex-wrap items-center justify-between;
    height: var(--size-navbar-height);
  }
</style>
