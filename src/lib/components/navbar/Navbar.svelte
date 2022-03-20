<script lang="ts">
  import Logo from '$components/logo/Logo.svelte';
  import { sidebarState } from '$stores/sidebar';
  import NavbarThemePicker from './NavbarThemePicker.svelte';

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
      <button type="button" class="btn btn-default" on:click={toggleSidebar}>
        <div class="i-heroicons-outline:menu-alt-1 text-xl" />
      </button>

      <Logo />
    </div>

    <!-- right -->
    <div class="flex items-center">
      <NavbarThemePicker />
    </div>
  </div>
</nav>

<style lang="postcss">
  nav {
    @apply bg-white;
    @apply border-b border-gray-200;
    @apply fixed top-0 left-0 right-0;
    @apply px-2 py-3 sm:px-4;
    @apply rounded;
    @apply w-full;
    @apply z-30;
  }

  .content-wrapper {
    @apply flex flex-wrap items-center justify-between;
    @apply mx-auto;
  }
</style>
