<script lang="ts">
  import { page } from '$app/stores';
  import Alert from '$lib/components/Alert.svelte';
  import ValidatorContainer from '$lib/components/ValidatorContainer.svelte';
  import type { MessagePayload } from '$lib/models/message-payload';
  import { nameof } from '$lib/utils/nameof';
  import * as sf from 'svelte-forms';
  import { max, required } from 'svelte-forms/validators';
  import { messagesStore } from './store';

  const chatbotId = Number($page.params['slug']);

  const to = sf.field(nameof<MessagePayload>('to'), '', [required()]);
  const message = sf.field(nameof<MessagePayload>('message'), '', [required(), max(200)]);
  const formData = sf.form(to, message);

  let canSend: boolean;
  $: canSend = $formData.valid;

  let isShowingAlert = false;
  let errorMessage = '';

  const handleSubmit = () => {
    messagesStore
      .sendMessage(chatbotId, $formData.summary as MessagePayload)
      .then(() => (isShowingAlert = true))
      .catch((error) => (errorMessage = error));
  };
</script>

<svelte:head>
  <title>Mensajes</title>
</svelte:head>

<h1 class="h3">Mensajes</h1>

<form class="form" on:submit|preventDefault={handleSubmit}>
  {#if isShowingAlert}
    <div class="mb-6">
      {#if errorMessage}
        <Alert type="danger">
          <div class="flex items-center justify-between">
            <span>
              Ocurrió un problema al intentar el mensaje: {errorMessage}
            </span>
            <button class="btn btn-secondary" on:click={() => (isShowingAlert = false)}>
              <div class="i-carbon:close mr-2 text-2xl" />
              Close
            </button>
          </div>
        </Alert>
      {:else}
        <Alert type="success">
          <div class="flex items-center justify-between">
            <span>
              El mensaje fue enviado correctamente al número <strong>{$to.value}</strong>
            </span>
            <button class="btn btn-secondary" on:click={() => (isShowingAlert = false)}>
              <div class="i-carbon:close mr-2 text-2xl" />
              Close
            </button>
          </div>
        </Alert>
      {/if}
    </div>
  {/if}

  <div class="form-group">
    <div class="form-item">
      <label for="to">To</label>
      <input type="text" id="to" bind:value={$to.value} class="field" />
      <ValidatorContainer field={$to} />
    </div>

    <div class="form-item">
      <label for="message">Message</label>
      <textarea id="message" bind:value={$message.value} class="field max-h-[200px]" />
      <div class="flex py-2 text-sm">
        <span class:text-red-400={$message.value.length > 200}>{$message.value.length}</span>
        <span>/200</span>
      </div>
      <ValidatorContainer field={$message} />
    </div>
  </div>

  <div class="form-actions form-actions-end">
    <button class="btn btn-secondary" on:click={() => formData.clear()}>
      <div class="i-fluent:broom-16-regular mr-2 text-2xl" />
      Clear
    </button>
    <button type="submit" class="btn btn-success" disabled={!canSend}>
      <div class="i-carbon:send-alt mr-2 text-2xl" />
      Send
    </button>
  </div>
</form>
