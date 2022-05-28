<script lang="ts">
  import { page } from '$app/stores';
  import { channelsStore } from './store';

  const chatbotId = Number($page.params['slug']);
</script>

<svelte:head>
  <title>Channels</title>
</svelte:head>

<h1 class="h3">Channels</h1>

{#await channelsStore.fetch(chatbotId)}
  <p>Waiting...</p>
{:then}
  <div class="grid grid-cols-1 md:grid-cols-3">
    <div>
      <pre>{JSON.stringify($channelsStore, null, 2)}</pre>

      <div class="flex items-center mt-4 space-x-2">
        <button class="btn btn-secondary" disabled>Delete</button>
      </div>
    </div>
  </div>
{:catch error}
  <p>Error: {error}</p>
{/await}
