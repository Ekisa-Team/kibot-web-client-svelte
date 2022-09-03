<script lang="ts">
  import type { Menu } from '$lib/types/menu';
  import SidebarItem from './SidebarItem.svelte';

  export let menu: Menu;
  export let hasSeparator: boolean;
</script>

<ul class="{hasSeparator ? 'border-t ui-border-base mt-4 pt-4' : ''} space-y-1 select-none">
  {#each menu as item}
    <li>
      {#if item.type === 'link'}
        <SidebarItem item={item} />
      {:else}
        <details bind:open={item.isDisclosed}>
          <summary class="cursor-pointer list-none">
            <SidebarItem item={item} isParent={true} isParentOpen={item.isDisclosed} />
          </summary>

          <div
            class="overflow-hidden rounded border-l-2 border-dashed border-yellow-500 bg-zinc-200 dark:border-yellow-700 dark:bg-zinc-800">
            <svelte:self menu={item.children} hasSeparator={false} />
          </div>
        </details>
      {/if}
    </li>
  {/each}
</ul>
