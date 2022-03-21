<script lang="ts">
  import type { TableDataSource } from './types';

  export let dataSource: TableDataSource = [];
</script>

<tbody>
  {#each dataSource as row}
    <tr class="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
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
