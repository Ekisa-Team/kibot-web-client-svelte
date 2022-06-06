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
  <div
    class:bg-zinc-300={isActive || isParentOpen}
    class:dark:bg-zinc-700={isActive || isParentOpen}
    class="ui-menu-item group"
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
  </div>
{:else}
  <a
    href={item.path}
    class:bg-zinc-300={isActive}
    class:dark:bg-zinc-700={isActive}
    class="ui-menu-item group"
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
  </a>
{/if}
