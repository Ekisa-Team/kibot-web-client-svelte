<script lang="ts">
  import Tooltip from '$lib/components/Tooltip.svelte';
  import { failure, success } from '$lib/core/services/toasts';
  import type { Channel } from '$lib/models/app/channel';
  import { chatbotStore } from '$lib/stores/chatbot';
  import { messagingProviderStore } from '$lib/stores/messaging-provider';
  import { Switch } from '@rgossiaux/svelte-headlessui';
  import Form from './Form.svelte';
  import { channelsStore } from './store';

  $: chatbotId = $chatbotStore.selectedChatbot?.id || 0;

  let isDevModeEnabled = false;

  const fetchData = (chatbotId: number) => {
    return Promise.all([channelsStore.fetch(chatbotId), messagingProviderStore.fetch()]);
  };

  const handleDisconnect = (event: CustomEvent<Channel['id']>) => {
    console.log(event.detail);

    channelsStore
      .delete(chatbotId, event.detail)
      .then(() => {
        success('Channel was disconnected successfully');
      })
      .catch((error: Error) => failure(error.message));
  };

  const handleSave = (event: CustomEvent<Channel>) => {
    console.log(event.detail);
    if (event.detail.id) {
      channelsStore
        .update(chatbotId, event.detail.id, event.detail)
        .then(() => {
          success('Channel was updated successfully');
        })
        .catch((error: Error) => failure(error.message));
    }
  };
</script>

<svelte:head>
  <title>WhatsApp Channel</title>
</svelte:head>

<div class="mb-6 flex flex-col items-start justify-between md:flex-row">
  <h1 class="h3">WhatsApp Channel</h1>

  <div class="flex items-center space-x-3">
    <Tooltip offset={[20, -200]}>
      <label slot="target" for="isDevModeEnabled">
        Enable dev mode
        <div class="i-ph:question-duotone" />
      </label>

      <div slot="content" class="w-64">
        <span>
          El modo desarrollo se saltará las validaciones de URL y le permitirá configurar el <strong
            class="font-semibold">localhost</strong> como URL de retorno.
        </span>
      </div>
    </Tooltip>

    <Switch
      id="isDevModeEnabled"
      checked={isDevModeEnabled}
      on:change={(e) => (isDevModeEnabled = e.detail)}
      class={isDevModeEnabled ? 'switch switch-checked' : 'switch switch-unchecked'}>
      <span class="sr-only">Enable dev mode</span>
      <span class="toggle" class:toggle-on={isDevModeEnabled} class:toggle-off={!isDevModeEnabled} />
    </Switch>
  </div>
</div>

{#await fetchData(chatbotId)}
  <p>Waiting...</p>
{:then}
  <Form
    channel={$channelsStore}
    messagingProviders={$messagingProviderStore}
    devModeEnabled={isDevModeEnabled}
    on:disconnect={handleDisconnect}
    on:save={handleSave} />
{:catch error}
  <p>Error: {error}</p>
{/await}
