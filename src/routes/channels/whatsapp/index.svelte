<script lang="ts">
  import Loader from '$lib/components/Loader.svelte';
  import PageHeader from '$lib/components/PageHeader.svelte';
  import Tooltip from '$lib/components/Tooltip.svelte';
  import type { Channel } from '$lib/models/app/channel';
  import { failure, success } from '$lib/services/toasts';
  import { chatbotsStore } from '$lib/stores/chatbots';
  import { messagingProvidersStore } from '$lib/stores/messaging-providers';
  import { Switch } from '@rgossiaux/svelte-headlessui';
  import Form, { clearForm } from './Form.svelte';
  import { channelsStore } from './store';

  $: chatbotId = $chatbotsStore.selectedChatbot?.id || 0;
  $: isChannelConnected = !!$channelsStore.data;

  let isDevModeEnabled = false;

  const fetchData = (chatbotId: number) => {
    return Promise.all([
      channelsStore.fetchChannel(chatbotId),
      messagingProvidersStore.fetchMessagingProviders()
    ]);
  };

  const handleDisconnect = (event: CustomEvent<Channel['id']>) => {
    channelsStore
      .deleteChannel(chatbotId, event.detail)
      .then(() => {
        // TODO: i18n
        success('Channel was disconnected successfully');
        clearForm();
      })
      .catch((error: Error) => failure(error.message));
  };

  const handleSave = (event: CustomEvent<Channel>) => {
    if (event.detail.id) {
      channelsStore
        .updateChannel(chatbotId, event.detail.id, event.detail)
        .then(() => {
          // TODO: i18n
          success('Channel was updated successfully');
        })
        .catch((error: Error) => failure(error.message));
    } else {
      channelsStore
        .createChannel(chatbotId, event.detail)
        .then(() => {
          // TODO: i18n
          success('Channel was created successfully');
        })
        .catch((error: Error) => failure(error.message));
    }
  };
</script>

<svelte:head>
  <title>WhatsApp Channel</title>
</svelte:head>

<PageHeader>
  <h1 class="h3">
    WhatsApp Channel

    {#if isChannelConnected}
      <badge class="badge-green ml-2 align-middle">
        <icon-mdi:checkbox-multiple-outline />
        Connected
      </badge>
    {:else}
      <badge class="badge-red ml-2 align-middle">
        <icon-fluent:plug-disconnected-28-regular />
        Disconnected
      </badge>
    {/if}
  </h1>

  <div slot="actions" class="flex items-center space-x-3">
    <Tooltip offset={[20, -200]}>
      <label slot="target" for="isDevModeEnabled">
        Enable dev mode
        <icon-ph:question-duotone />
      </label>

      <div slot="content" class="w-64">
        <span>
          El modo desarrollo omite las validaciones de URL y le permite configurar el <strong
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
</PageHeader>

{#await fetchData(chatbotId)}
  <Loader />
{:then}
  <Form
    channel={$channelsStore.data}
    messagingProviders={$messagingProvidersStore.data}
    devModeEnabled={isDevModeEnabled}
    isChannelConnected={isChannelConnected}
    on:disconnect={handleDisconnect}
    on:save={handleSave} />
{:catch error}
  {console.log(error)}
  <p>Error: {error}</p>
{/await}
