<script lang="ts">
  import { chatbotStore } from '../../../../lib/stores/chatbot';
</script>

<svelte:head>
  <title>Chatbots</title>
</svelte:head>

<h1 class="h3">Chatbots</h1>

{#await chatbotStore.fetch()}
  <p>Waiting...</p>
{:then}
  <div class="grid grid-cols-1 md:grid-cols-3">
    {#each $chatbotStore.chatbots as chatbot}
      <div>
        <pre>{JSON.stringify(chatbot, null, 2)}</pre>

        <div class="flex items-center mt-4 space-x-2">
          <a href="/channels/whatsapp" class="btn btn-blue" on:click={() => chatbotStore.select(chatbot)}> Edit </a>

          <button class="btn btn-secondary" disabled>Delete</button>
        </div>
      </div>
    {/each}
  </div>
{:catch error}
  <p>Error: {error.message}</p>
{/await}
