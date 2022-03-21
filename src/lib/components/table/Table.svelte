<script lang="ts">
  import TableBody from './TableBody.svelte';
  import TableHead from './TableHead.svelte';
  import TableWrapper from './TableWrapper.svelte';
  import type { TableColumns, TableDataSource } from './types';

  export let columns: TableColumns = [];
  export let dataSource: TableDataSource = [];

  export let canAdd = false;
  export let canEdit = false;
  export let canRemove = false;
</script>

<TableWrapper>
  <table class="min-w-full">
    <TableHead columns={columns}>
      {#if canEdit}
        <th scope="col" class="relative py-3 px-6">
          <span class="sr-only">Edit</span>
        </th>
      {/if}

      {#if canRemove}
        <th scope="col" class="relative py-3 px-6">
          <span class="sr-only">Remove</span>
        </th>
      {/if}
    </TableHead>

    <TableBody dataSource={dataSource}>
      {#if canEdit}
        <td class="whitespace-nowrap py-4 px-6 text-right text-sm font-medium">
          <a href="#" class="text-blue-600 hover:underline dark:text-blue-500">Edit</a>
        </td>
      {/if}

      {#if canRemove}
        <td class="whitespace-nowrap py-4 px-6 text-right text-sm font-medium">
          <a href="#" class="text-blue-600 hover:underline dark:text-blue-500">Remove</a>
        </td>
      {/if}
    </TableBody>
  </table>
</TableWrapper>
