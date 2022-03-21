<script lang="ts">
  import { page } from '$app/stores';
  import type { MenuItem } from '../../types/menu';

  export let item: MenuItem;
  export let showName = true;

  $: isActive = $page.url.pathname.includes(item.path);
</script>

<li>
  <!-- option -->
  <a href={item.path} class:active={isActive} class="group">
    <!-- icon -->
    <div
      class:text-red-600={isActive}
      class:dark:text-red-300={isActive}
      class="{item.icon} text-secondary min-w-[25px] text-2xl group-hover:text-red-600 dark:group-hover:text-red-300" />

    <!-- text -->
    {#if showName}
      <span class="ml-3 text-sm">{item.name}</span>
    {/if}
  </a>
</li>

<style lang="postcss">
  a {
    @apply flex items-center;
    @apply rounded-lg;
    @apply p-2;
    @apply whitespace-nowrap text-primary;
  }

  a:hover,
  a.active {
    @apply bg-secondary;
  }
</style>
