<script lang="ts">
  import { chatbotsStore } from './store';
</script>

<svelte:head>
  <title>Chatbots</title>
</svelte:head>

<h1 class="h3">Chatbots</h1>

{#await chatbotsStore.fetch()}
  <p>Waiting...</p>
{:then}
  <div class="grid grid-cols-1 md:grid-cols-3">
    {#each $chatbotsStore as chatbot}
      <div>
        <pre>{JSON.stringify(chatbot, null, 2)}</pre>

        <div class="flex items-center mt-4 space-x-2">
          <a href="chatbots/{chatbot.id}/channels" class="btn btn-primary"> Edit </a>
          <button class="btn btn-secondary" disabled>Delete</button>
        </div>
      </div>
    {/each}
  </div>
{:catch error}
  <p>Error: {error.message}</p>
{/await}
