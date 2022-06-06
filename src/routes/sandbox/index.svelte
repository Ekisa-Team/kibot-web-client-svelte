<script lang="ts">
  import ValidatorContainer from '$lib/components/ValidatorContainer.svelte';
  import { failure } from '$lib/core/services/toasts';
  import type { MessagePayload } from '$lib/models/message-payload';
  import { chatbotStore } from '$lib/stores/chatbot';
  import { nameof } from '$lib/utils/nameof';
  import { toast } from '@zerodevx/svelte-toast';
  import * as sf from 'svelte-forms';
  import { max, required } from 'svelte-forms/validators';
  import { messageStore } from './store';

  $: chatbotId = $chatbotStore.selectedChatbot?.id || 0;

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

    messageStore
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
  <title>Sandbox</title>
</svelte:head>

<h1 class="h3">Sandbox</h1>

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
    <button type="button" class="btn btn-secondary" on:click={() => formData.clear()}>
      <div class="i-fluent:broom-16-regular mr-2 text-2xl" />
      Clear
    </button>
    <button type="submit" class="btn btn-blue" disabled={!canSend}>
      <div class="i-carbon:send-alt mr-2 text-2xl" />
      Send
    </button>
  </div>
</form>
