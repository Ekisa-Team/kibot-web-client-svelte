<script lang="ts">
  import type { Menu } from '$lib/types/menu';
  import SidebarItem from './SidebarItem.svelte';
  import SidebarItemMenu from './SidebarItemMenu.svelte';

  export let menu: Menu;
  export let showSeparator = false;
  export let isNested = false;
</script>

<ul class:separator={showSeparator} class="space-y-1">
  {#each menu as item}
    <li>
      {#if item.children}
        <SidebarItemMenu item={item} />
      {:else}
        <SidebarItem item={item} showIcon={!isNested} />
      {/if}
    </li>
  {/each}
</ul>

<style lang="postcss">
  ul.separator {
    @apply border-t ui-border-base;
    @apply mt-4 pt-4;
  }
</style>
