<script lang="ts">
  import { page } from '$app/stores';
  import type { Channel } from '$lib/models/app/channel';
  import { messagingProvidersStore } from '$lib/stores/store';
  import { Switch } from '@rgossiaux/svelte-headlessui';
  import Form from './Form.svelte';
  import { channelsStore } from './store';

  const chatbotId = Number($page.params['slug']);
  const data = Promise.all([channelsStore.fetch(chatbotId), messagingProvidersStore.fetch()]);

  let isDevModeEnabled = false;

  const handleSave = (event: CustomEvent<Channel>) => {
    console.log(event.detail);
  };
</script>

<svelte:head>
  <title>Channels</title>
</svelte:head>

<div class="flex items-start justify-between">
  <h1 class="h3">Channels</h1>

  <div class="flex items-center space-x-3">
    <label for="isDevModeEnabled">
      Enable dev mode
      <div class="i-ph:question-duotone" />
    </label>

    <Switch
      id="isDevModeEnabled"
      checked={isDevModeEnabled}
      on:change={(e) => (isDevModeEnabled = e.detail)}
      class={isDevModeEnabled ? 'switch switch-enabled' : 'switch switch-disabled'}>
      <span class="sr-only">Enable dev mode</span>
      <span class="toggle" class:toggle-on={isDevModeEnabled} class:toggle-off={!isDevModeEnabled} />
    </Switch>
  </div>
</div>

{#await data}
  <p>Waiting...</p>
{:then}
  <Form
    channel={$channelsStore}
    messagingProviders={$messagingProvidersStore}
    devModeEnabled={isDevModeEnabled}
    on:save={handleSave} />
{:catch error}
  <p>Error: {error}</p>
{/await}
