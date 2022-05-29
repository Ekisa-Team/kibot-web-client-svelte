<script lang="ts">
  import { messagingProvidersStore } from '../../lib/stores/store';
</script>

<svelte:head>
  <title>Messaging providers</title>
</svelte:head>

<h1 class="h3">Messaging providers</h1>

{#await messagingProvidersStore.fetch()}
  <p>Waiting...</p>
{:then}
  <div class="grid grid-cols-1 md:grid-cols-3">
    {#each $messagingProvidersStore as provider}
      <div>
        <pre>{JSON.stringify(provider, null, 2)}</pre>

        <div class="flex items-center mt-4 space-x-2">
          <button class="btn btn-secondary" disabled>Delete</button>
        </div>
      </div>
    {/each}
  </div>
{:catch error}
  <p>Error: {error}</p>
{/await}
