<script lang="ts">
  import type { MenuItem } from '$lib/types/menu';
  import SidebarItem from './SidebarItem.svelte';
  import SidebarMenu from './SidebarMenu.svelte';

  export let item: MenuItem;
</script>

<details bind:open={item.isDisclosed}>
  <summary class="cursor-pointer list-none">
    <SidebarItem item={item} isParent={true} isParentOpen={item.isDisclosed} />
  </summary>

  <div
    class="overflow-hidden rounded border-l-2 border-dashed border-yellow-500 bg-zinc-200 dark:border-yellow-700 dark:bg-zinc-800">
    <SidebarMenu menu={item.children || []} isNested={true} />
  </div>
</details>

<style>
  details[open] summary + div {
    animation-name: sweep;
    animation-duration: 200ms;
    animation-timing-function: ease;
    animation-fill-mode: forwards;
  }

  @keyframes sweep {
    0% {
      opacity: 0;
      transform: translateY(-20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
