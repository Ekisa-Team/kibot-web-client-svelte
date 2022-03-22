<script lang="ts">
  import Logo from '$lib/components/Logo.svelte';
  import { sidebarState } from '$lib/stores/sidebar';
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
  <!-- wrapper -->
  <div class="content-wrapper">
    <!-- left -->
    <div class="flex items-center">
      <button type="button" class="btn btn-secondary" on:click={toggleSidebar}>
        <div class="i-heroicons-outline:menu-alt-1 text-xl" />
      </button>

      <Logo />
    </div>

    <!-- right -->
    <div class="flex items-center">
      <ThemeToggle />
    </div>
  </div>
</nav>

<style lang="postcss">
  nav {
    @apply bg-navbar;
    @apply border-b border-accent;
    @apply fixed top-0 left-0 right-0;
    @apply px-2.5 py-3;
    @apply rounded;
    @apply w-full;
    @apply z-30;
    @apply bg-opacity-75;
  }

  .content-wrapper {
    @apply flex flex-wrap items-center justify-between;
    @apply mx-auto;
  }
</style>
