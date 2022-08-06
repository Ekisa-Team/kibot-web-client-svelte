<script lang="ts">
  import Logo from '$lib/components/Logo.svelte';
  import { clientApplicationsStore } from '$lib/stores/applications';
  import { chatbotsStore } from '$lib/stores/chatbots';
  import { sidebarStore } from './sidebar/store';
  import ThemeToggle from './ThemeToggle.svelte';

  let areModulesSelected = false;
  $: areModulesSelected = !!$clientApplicationsStore.selectedClient && !!$chatbotsStore.selectedChatbot;

  const toggleSidebar = () => {
    sidebarStore.update((state) => ({ ...state, isOpen: !state.isOpen }));
  };
</script>

<nav class="ui-navbar">
  <!-- left -->
  <div class="flex items-center space-x-5">
    {#if areModulesSelected}
      <button type="button" class="btn btn-secondary btn-fit" on:click={toggleSidebar}>
        {#if $sidebarStore.isOpen}
          <icon-ph:caret-double-left-duotone ui-text-xl />
        {:else}
          <icon-icon-park-twotone:hamburger ui-text-xl />
        {/if}
      </button>
    {/if}

    <Logo />
  </div>

  <!-- right -->
  <div class="flex items-center space-x-3">
    <a href="/applications" class="btn btn-secondary btn-fit space-x-2">
      <icon-ph:arrow-circle-left-duotone ui-text-xl ui-text-blue-400 />
      <span class="hidden md:inline">Modules</span>
    </a>
    <!-- <LangToggle /> -->
    <ThemeToggle />
  </div>
</nav>

<style lang="postcss">
  nav {
    grid-area: navbar;
    height: var(--size-navbar-height);
  }
</style>
