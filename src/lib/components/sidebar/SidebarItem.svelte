<script lang="ts">
  import { page } from '$app/stores';
  import { getCurrentBreakpoint } from '$lib/core/services/screen';
  import type { MenuItem } from '$lib/types/menu';
  import { sidebarStore } from './store';

  export let item: MenuItem;
  export let isParent = false;
  export let isParentOpen = false;

  $: isActive = item.path && $page.url.pathname.includes(item.path);

  /**
   * Close sidebar if the current resolution is mobile & all the nested menus.
   */
  const handleItemClick = (event: MouseEvent) => {
    event.stopPropagation();

    const shouldCloseSidebar = getCurrentBreakpoint() === 'xs' && item.type === 'link';

    setTimeout(() => {
      const menus = $sidebarStore.menus.map((menu) =>
        menu.map((menuItem) => {
          // Close other groups
          if (menuItem.name !== item.name) {
            return { ...menuItem, isDisclosed: false };
          }

          return menuItem;
        })
      );

      sidebarStore.update((state) => ({
        ...state,
        isOpen: shouldCloseSidebar === false,
        menus
      }));
    });
  };
</script>

<svelte:element
  this={isParent ? 'div' : 'a'}
  href={isParent ? null : item.path}
  class:bg-zinc-300={isActive}
  class:dark:bg-zinc-700={isActive}
  class="ui-menu-item group w-full"
  on:click={handleItemClick}>
  <div class="flex items-center">
    <!-- icon -->
    <div
      class:invisible={false}
      class:text-red-600={isActive || isParentOpen}
      class:dark:text-red-300={isActive || isParentOpen}
      class="{item.icon} min-w-[25px] text-2xl text-zinc-700 dark:text-zinc-400 transform transition-transform duration-200 ease group-hover:(text-red-600 rotate-20 scale-110) dark:group-hover:(text-red-300)" />

    <!-- text -->
    <span class="ml-[1.1rem] text-sm" class:font-semibold={isParentOpen}>{item.name}</span>

    <!-- badge -->
    {#if item.badge}
      <span class="badge badge-{item.badge.color} ml-3">{item.badge.text}</span>
    {/if}
  </div>

  <!-- arrow -->
  {#if isParent}
    <div
      class="i-ic:round-keyboard-arrow-right transition-transform duration-100 ease-in-out"
      class:rotate-90={isParentOpen} />
  {/if}
</svelte:element>
