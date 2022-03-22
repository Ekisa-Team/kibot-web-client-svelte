<script lang="ts">
  import type { TableColumns } from './types';

  export let columns: TableColumns = [];
</script>

<thead class="bg-zinc-200 dark:bg-zinc-700">
  <tr>
    {#each columns as col}
      <th
        scope="col"
        class="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider text-zinc-700 dark:text-zinc-400">
        {#if col.icon}
          <div class={col.icon} />
        {/if}
        {#if col.text}
          <span>{col.text}</span>
        {/if}
      </th>
    {/each}

    <slot />
  </tr>
</thead>
