<script lang="ts">
  import { page } from '$app/stores';
  import { templatesStore } from './store';

  const chatbotId = Number($page.params['slug']);
</script>

<svelte:head>
  <title>Templates</title>
</svelte:head>

<h1 class="h3">Templates</h1>

{#await templatesStore.fetch(chatbotId)}
  <p>Waiting...</p>
{:then}
  <div class="grid grid-cols-1 gap-y-12">
    {#each $templatesStore as template}
      <div>
        <pre>{JSON.stringify(template, null, 2)}</pre>

        <div class="flex items-center mt-4 space-x-2">
          <button class="btn btn-secondary" disabled>Delete</button>
        </div>
      </div>
    {/each}
  </div>
{:catch error}
  <p>Error: {error}</p>
{/await}
