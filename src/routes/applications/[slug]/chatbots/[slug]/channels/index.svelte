<script lang="ts">
  import { page } from '$app/stores';
  import type { Channel } from '$lib/models/app/channel';
  import { messagingProvidersStore } from '$lib/stores/store';
  import Form from './Form.svelte';
  import { channelsStore } from './store';

  const chatbotId = Number($page.params['slug']);

  const data = Promise.all([channelsStore.fetch(chatbotId), messagingProvidersStore.fetch()]);

  const handleSave = (event: CustomEvent<Channel>) => {
    console.log(event.detail);
  };
</script>

<svelte:head>
  <title>Channels</title>
</svelte:head>

<h1 class="h3">Channels</h1>

{#await data}
  <p>Waiting...</p>
{:then}
  <Form channel={$channelsStore || {}} messagingProviders={$messagingProvidersStore} on:save={handleSave} />
{:catch error}
  <p>Error: {error}</p>
{/await}
