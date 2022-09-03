<script lang="ts">
  import { page } from '$app/stores';
  import { getCurrentBreakpoint } from '$lib/services/screen';
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
          console.log(item.name, menuItem.name);
          // Close other groups
          if (menuItem.name !== item.name) {
            return { ...menuItem, isDisclosed: false };
          }

          return { ...menuItem, isDisclosed: true };
        })
      );

      console.log(menus);

      sidebarStore.update((state) => ({
        ...state,
        isOpen: !shouldCloseSidebar,
        menus
      }));
    });
  };
</script>

<svelte:element
  this={isParent ? 'div' : 'a'}
  href={isParent ? null : item.path}
  class="ui-menu-item group w-full {isActive ? 'bg-zinc-300 dark:bg-zinc-700' : ''}"
  on:click={handleItemClick}>
  <div class="flex items-center">
    <!-- icon -->
    <div
      ui-min-w="25px"
      ui-text="2xl zinc-700 dark:zinc-400"
      ui-transition-transform
      ui-duration-200
      ui-ease
      ui-group-hover="text-red-600 rotate-20 scale-110 dark:text-red-300"
      class:invisible={false}
      class:text-red-600={isActive || isParentOpen}
      class:dark:text-red-300={isActive || isParentOpen}
      class={item.icon} />

    <!-- text -->
    <span class="ml-[1.1rem] text-sm" class:font-semibold={isParentOpen}>{item.name}</span>

    <!-- badge -->
    {#if item.badge}
      <badge class="badge-{item.badge.color}" ui-ml-3>{item.badge.text}</badge>
    {/if}
  </div>

  <!-- arrow -->
  {#if isParent}
    <icon-ic:round-keyboard-arrow-right
      ui-transition-transform
      ui-duration-100
      ui-ease-in-out
      class:rotate-90={isParentOpen} />
  {/if}
</svelte:element>
