<script lang="ts">
  import { page } from '$app/stores';
  import { getCurrentBreakpoint } from '$lib/core/services/screen';
  import type { MenuItem } from '$lib/types/menu';
  import { sidebarStore } from './store';

  export let item: MenuItem;
  export let showIcon = true;
  export let isParent = false;
  export let isParentOpen = false;

  $: isActive = item.path && $page.url.pathname.includes(item.path);

  /**
   * Close sidebar if the current resolution is mobile & all the nested menus.
   */
  const handleItemClick = () => {
    const isOpen = getCurrentBreakpoint() !== 'xs';
    const menus = $sidebarStore.menus.map((menu) =>
      menu.map((menuItem) =>
        menuItem.name !== item.name
          ? {
              ...menuItem,
              isDisclosed: false
            }
          : menuItem
      )
    );

    sidebarStore.update((state) => ({
      ...state,
      isOpen,
      menus
    }));
  };
</script>

{#if isParent}
  <div href={item.path} class:active={isActive} class="menu-item group" on:click={handleItemClick}>
    <div class="flex items-center">
      <!-- icon -->
      <div
        class:invisible={!showIcon}
        class:text-red-600={isActive}
        class:dark:text-red-300={isActive}
        class="{item.icon} min-w-[25px] text-2xl text-zinc-700 group-hover:text-red-600 dark:text-zinc-400 dark:group-hover:text-red-300" />

      <!-- text -->
      <span class="ml-[1.1rem] text-sm" class:font-semibold={isParentOpen}>{item.name}</span>
    </div>

    <!-- arrow -->
    {#if isParent}
      <div class="i-ic:round-keyboard-arrow-right transition-transform duration-100 ease-in-out" class:rotate-90={isParentOpen} />
    {/if}
  </div>
{:else}
  <a href={item.path} class:active={isActive} class="menu-item group" on:click={handleItemClick}>
    <div class="flex items-center">
      <!-- icon -->
      <div
        class:invisible={!showIcon}
        class:text-red-600={isActive}
        class:dark:text-red-300={isActive}
        class="{item.icon} min-w-[25px] text-2xl text-zinc-700 group-hover:text-red-600 dark:text-zinc-400 dark:group-hover:text-red-300" />

      <!-- text -->
      <span class="ml-[1.1rem] text-sm" class:font-semibold={isParentOpen}>{item.name}</span>
    </div>

    <!-- arrow -->
    {#if isParent}
      <div class="i-ic:round-keyboard-arrow-right transition-transform duration-100 ease-in-out" class:rotate-90={isParentOpen} />
    {/if}
  </a>
{/if}

<style lang="postcss">
  .menu-item {
    @apply flex items-center justify-between;
    @apply font-default font-thin;
    @apply text-left;
    @apply min-w-[50px];
    @apply rounded-lg;
    @apply px-2 py-[0.40rem] pl-[0.6rem];
    @apply whitespace-nowrap text-primary;
  }

  .menu-item:hover,
  .menu-item.active {
    @apply bg-secondary;
  }
</style>
