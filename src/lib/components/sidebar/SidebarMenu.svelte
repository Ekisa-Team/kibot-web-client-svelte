<script lang="ts">
  import type { Menu } from '$lib/types/menu';
  import SidebarItem from './SidebarItem.svelte';
  import SidebarItemMenu from './SidebarItemMenu.svelte';

  export let menu: Menu;
  export let showSeparator = false;
  export let isNested = false;
</script>

<ul class:with-separator={showSeparator} class="space-y-1">
  {#each menu as item}
    <li>
      {#if item.children}
        <SidebarItemMenu item={item} />
      {:else}
        <SidebarItem item={item} showIcon={true} />
      {/if}
    </li>
  {/each}
</ul>

<style lang="postcss">
  ul.with-separator {
    @apply border-t border-zinc-200 dark:border-zinc-800;
    @apply mt-4 pt-4;
  }
</style>
