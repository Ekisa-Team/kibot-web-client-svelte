<script lang="ts">
  import type { BreadcrumbItems } from './types';

  export let items: BreadcrumbItems = [];
</script>

<nav aria-label="Breadcrumb" class="bg-gradient-to-r from-yellow-200 px-2 dark:from-yellow-800/90">
  <ol>
    {#each items as { path, icon, text }, i}
      <li>
        {#if i < items.length - 1}
          <a href={path} class="font-semibold">
            {#if i > 0}
              <div class="i-mdi:slash-forward" />
            {/if}

            {#if icon}
              <div class={icon} />
            {/if}

            {#if text}
              <span>{text}</span>
            {/if}
          </a>
        {:else}
          <span>
            <div class="i-mdi:slash-forward" />

            {#if icon}
              <div class={icon} />
            {/if}

            {#if text}
              <span class="font-thin">{text}</span>
            {/if}
          </span>
        {/if}
      </li>
    {/each}
  </ol>
</nav>

<style lang="postcss">
  nav {
    @apply flex;
    @apply mb-6;
  }

  ol {
    @apply inline-flex items-center;
    @apply space-x-1;
  }

  li {
    @apply inline-flex items-center;
  }

  a,
  span {
    @apply inline-flex items-center;
    @apply text-sm;
    @apply space-x-1;
  }

  a:hover {
    @apply underline;
  }
</style>
