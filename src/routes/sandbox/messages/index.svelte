<script lang="ts">
  import PageHeader from '$lib/components/PageHeader.svelte';
  import ValidatorContainer from '$lib/components/ValidatorContainer.svelte';
  import type { MessagePayload } from '$lib/models/message-payload';
  import { failure } from '$lib/services/toasts';
  import { chatbotsStore } from '$lib/stores/chatbots';
  import { nameof } from '$lib/utils/nameof';
  import { toast } from '@zerodevx/svelte-toast';
  import * as sf from 'svelte-forms';
  import { max, required } from 'svelte-forms/validators';
  import { messagesStore } from './store';

  $: chatbotId = $chatbotsStore.selectedChatbot?.id || 0;

  const to = sf.field(nameof<MessagePayload>('to'), '', [required()]);
  const message = sf.field(nameof<MessagePayload>('message'), '', [required(), max(200)]);
  const formData = sf.form(to, message);

  let canSend: boolean;
  $: canSend = $formData.valid;

  const handleSubmit = async () => {
    await formData.validate();

    if (!$formData.valid) {
      return;
    }

    messagesStore
      .sendMessage(chatbotId, $formData.summary as MessagePayload)
      .then(() => {
        toast.push(`Message was sent to ${$to.value}`);
      })
      .catch((error: Error) => {
        failure(error.message);
      });
  };
</script>

<svelte:head>
  <title>Sandbox :: => Messages</title>
</svelte:head>

<PageHeader>
  <h1 class="h3">Sandbox => <badge class="badge-blue align-middle">Messages</badge></h1>
</PageHeader>

<form class="form" on:submit|preventDefault={handleSubmit}>
  <div class="form-group">
    <div class="form-item">
      <label for="to">To</label>
      <input type="text" id="to" bind:value={$to.value} class="field" />
      <ValidatorContainer field={$to} />
    </div>

    <div class="form-item">
      <label for="message">Message</label>
      <textarea id="message" bind:value={$message.value} class="field max-h-[250px]" />
      <div class="flex py-2 text-sm">
        <span class:text-red-400={$message.value.length > 200}>{$message.value.length}</span>
        <span>/200</span>
      </div>
      <ValidatorContainer field={$message} />
    </div>
  </div>

  <div class="actions-group">
    <button type="button" ui-btn ui-btn-secondary on:click={() => formData.clear()}>
      <icon-fluent:broom-16-regular ui-text-2xl ui-mr-2 />
      Clear
    </button>
    <button type="submit" ui-btn ui-btn-blue disabled={!canSend}>
      <icon-carbon:send-alt ui-text-2xl ui-mr-2 />
      Send
    </button>
  </div>
</form>
