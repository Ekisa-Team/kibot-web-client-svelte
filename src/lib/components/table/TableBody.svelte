<script lang="ts">
  import type { TableDataSource } from './types';

  export let dataSource: TableDataSource = [];
</script>

<tbody>
  {#each dataSource as row}
    <tr class="bg-white dark:border-zinc-700 dark:bg-zinc-800">
      {#each row as cell}
        <!-- content here -->
        <td class="whitespace-nowrap py-4 px-6 text-sm">
          <span class={cell.cssClass}>{cell.text}</span>
        </td>
      {/each}

      <slot />
    </tr>
  {/each}
</tbody>

<style lang="postcss">
  tr:not(:last-of-type) {
    @apply border-b;
  }
</style>
