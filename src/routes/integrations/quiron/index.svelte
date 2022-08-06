<script lang="ts">
  import Alert from '$lib/components/Alert.svelte';
  import Loader from '$lib/components/Loader.svelte';
  import Modal from '$lib/components/Modal.svelte';
  import PageHeader from '$lib/components/PageHeader.svelte';
  import Tooltip from '$lib/components/Tooltip.svelte';
  import ValidatorContainer from '$lib/components/ValidatorContainer.svelte';
  import type { ResponseMessage } from '$lib/models/app/response-message';
  import type { QuironReplyToken } from '$lib/models/reply-token';
  import { failure, success } from '$lib/services/toasts';
  import { chatbotsStore } from '$lib/stores/chatbots';
  import { responseMessagesStore } from '$lib/stores/response-messages';
  import { nameof } from '$lib/utils/nameof';
  import * as sf from 'svelte-forms';
  import { max, required } from 'svelte-forms/validators';
  import { getReplyTokenSuggestions } from './suggestions';

  $: chatbotId = $chatbotsStore.selectedChatbot?.id || 0;

  const replyTokens: Record<QuironReplyToken, { hint: string; suggestions: string[] }> = {
    'Transaction.Assigned': {
      hint: '☝️ Respuesta al usuario cuando asigna su cita correctamente',
      suggestions: getReplyTokenSuggestions('Transaction.Assigned')
    },
    'Transaction.Confirmed': {
      hint: '☝️ Respuesta al usuario cuando confirma una cita',
      suggestions: getReplyTokenSuggestions('Transaction.Confirmed')
    },
    'Transaction.Canceled': {
      hint: '☝️ Respuesta al usuario cuando cancela una cita',
      suggestions: getReplyTokenSuggestions('Transaction.Canceled')
    },
    'Transaction.Reassigned': {
      hint: '☝️ Respuesta al usuario cuando reasigna una cita',
      suggestions: getReplyTokenSuggestions('Transaction.Reassigned')
    },
    'Transaction.Unknown': {
      hint: '☝️ Respuesta al usuario cuando el bot no reconoce su respuesta',
      suggestions: getReplyTokenSuggestions('Transaction.Unknown')
    },
    'Rule.AlreadyConfirmed': {
      hint: '☝️ Respuesta al usuario cuando intenta confirmar una cita que ya se encuentra confirmada',
      suggestions: getReplyTokenSuggestions('Rule.AlreadyConfirmed')
    },
    'Rule.AlreadyCanceled': {
      hint: '☝️ Respuesta al usuario cuando intenta cancelar una cita que ya se encuentra cancelada',
      suggestions: getReplyTokenSuggestions('Rule.AlreadyCanceled')
    },
    'Rule.AlreadyReassigned': {
      hint: '☝️ Respuesta al usuario cuando intenta reasignar una cita que ya se encuentra reasignada',
      suggestions: getReplyTokenSuggestions('Rule.AlreadyReassigned')
    },
    'Rule.TimeOverflow': {
      hint: '☝️ Respuesta al usuario cuando responde a una cita cuya fecha y hora se ha superado',
      suggestions: getReplyTokenSuggestions('Rule.TimeOverflow')
    },
    'Rule.CancelationTimeFrame': {
      hint: '☝️ Respuesta al usuario cuando intenta cancelar una cita después de superar el umbral de cancelación',
      suggestions: getReplyTokenSuggestions('Rule.CancelationTimeFrame')
    }
  };

  let selection: {
    responseMessageId: number | undefined;
    token: string;
    hint: string;
    suggestions: string[];
  };
  let isConfiguring = false;

  const message = sf.field(nameof<ResponseMessage>('message'), '', [required(), max(500)]);
  const formData = sf.form(message);

  const handleConfiguration = (
    token: string,
    hint: string,
    suggestions: string[],
    responseMessageId: number | undefined,
    fieldMessage: string
  ) => {
    formData.reset();

    message.set(fieldMessage);
    selection = { responseMessageId, token, hint, suggestions };
    isConfiguring = true;
  };

  const handleTestAll = () => {
    $responseMessagesStore.responseMessages.forEach((response) => handleTest(response.intention));
  };

  const handleTest = (token: string) => {
    responseMessagesStore
      .detectIntention(chatbotId, token)
      .then(() => {
        // TODO: i18n
        success(`${token}: integrity was verified`, { duration: 10000 });
      })
      .catch((error: Error) => failure(error.message));
  };

  const handleRemove = (responseMessageId: number) => {
    if (confirm('Are you sure?')) {
      responseMessagesStore
        .deleteResponseMessage(chatbotId, responseMessageId)
        .then(() => {
          // TODO: i18n
          success('Response message was removed successfully');
          responseMessagesStore.fetchResponseMessages(chatbotId);
        })
        .catch((error: Error) => failure(error.message));
    }
  };

  const handleSave = () => {
    formData.validate();

    if (!$formData.valid) {
      return;
    }

    const body: Partial<ResponseMessage> = {
      intention: selection.token,
      message: $message.value
    };

    if (selection.responseMessageId) {
      responseMessagesStore
        .updateResponseMessage(chatbotId, selection.responseMessageId, body as ResponseMessage)
        .then(() => {
          // TODO: i18n
          success('Response message was updated successfully');
          responseMessagesStore.fetchResponseMessages(chatbotId);
        })
        .catch((error: Error) => failure(error.message))
        .finally(() => (isConfiguring = false));
    } else {
      responseMessagesStore
        .createResponseMessage(chatbotId, body as ResponseMessage)
        .then(() => {
          // TODO: i18n
          success('Response message was configured successfully');
          responseMessagesStore.fetchResponseMessages(chatbotId);
        })
        .catch((error: Error) => failure(error.message))
        .finally(() => (isConfiguring = false));
    }
  };
</script>

<svelte:head>
  <title>Quiron</title>
</svelte:head>

<PageHeader>
  <h1 class="h3">Quiron</h1>
</PageHeader>

{#await responseMessagesStore.fetchResponseMessages(chatbotId)}
  <Loader />
{:then}
  <div class="form">
    <PageHeader>
      <h3 class="h5 mb-0">Reply tokens</h3>

      <div slot="actions">
        <button ui-btn ui-btn-secondary on:click={handleTestAll}>
          <icon-file-icons:test-generic ui-text-xl ui-mr-2 />
          Run all tests
        </button>
      </div>
    </PageHeader>

    {#each Object.entries(replyTokens) as [token, { hint, suggestions }]}
      {@const current = $responseMessagesStore.responseMessages.find((r) => r.intention === token)}

      <!-- reply token -->
      <div
        ui-mb-2
        ui-py-2
        ui-px="2 md:4"
        ui-rounded-xl
        ui-flex-between
        ui-flex-wrap
        ui-gap-6
        ui-border-2
        ui-border="2 zinc-300 dark:zinc-700"
        class={current ? 'bg-zinc-100 dark:bg-zinc-900' : 'bg-red-50 dark:bg-red-900/10 border-dashed'}>
        <!-- left -->
        <div ui-flex ui-items-center>
          {#if current}
            <Tooltip tip="Configured">
              <icon-ic:twotone-check-circle ui-text="xl green-500" ui-mr-3 slot="target" />
            </Tooltip>
          {:else}
            <Tooltip tip="Not configured">
              <icon-uim:times-circle ui-text="xl red-500" ui-mr-3 slot="target" />
            </Tooltip>
          {/if}

          <!-- badge -->
          <badge class="badge-orange mr-2">
            <code>&lt;{token}&gt;</code>
          </badge>

          <!-- tooltip -->
          <Tooltip>
            <icon-ph:question-duotone ui-text-xl slot="target" />
            <div slot="content" ui-max-w="300px">
              {@html hint}
            </div>
          </Tooltip>
        </div>

        <!-- right -->
        <div ui-actions-group ui-w="full md:auto">
          {#if current}
            <button ui-btn ui-btn-secondary on:click={() => handleTest(current.intention)}>
              <icon-file-icons:test-generic ui-text-xl ui-mr-2 />
              Test
            </button>
            <button ui-btn ui-btn-secondary on:click={() => handleRemove(current.id)}>
              <icon-ic:twotone-delete ui-text-xl ui-mr-2 />
              Remove
            </button>
          {/if}

          <button
            ui-btn
            ui-btn-blue
            on:click={() => handleConfiguration(token, hint, suggestions, current?.id, current?.message || '')}>
            <icon-ic:twotone-generating-tokens ui-text-xl ui-mr-2 />
            Configure
          </button>
        </div>
      </div>
    {/each}
  </div>

  <Modal bind:isOpen={isConfiguring} size="5xl">
    <!-- title -->
    <span slot="title">
      <code>Reply token :: &lt;{selection?.token}&gt;</code>
    </span>

    <!-- content -->
    <div slot="content">
      <!-- alert -->
      <Alert>{@html selection.hint}</Alert>

      <!-- field -->
      <div class="form-item mt-6">
        <label for="message">Mensaje</label>
        <textarea id="message" bind:value={$message.value} class="field max-h-[250px]" />
        <div class="flex py-2 text-sm">
          <span class:text-red-400={$message.value.length > 500}>{$message.value.length}</span>
          <span>/500</span>
        </div>
        <ValidatorContainer field={$message} />
      </div>

      <h5 class="h6 mt-6">Sugerencias</h5>
      <div ui-flex ui-flex-wrap ui-gap-2>
        {#each selection.suggestions as suggestion}
          <button ui-btn ui-btn-secondary on:click={() => message.set(suggestion)}>
            <span ui-truncate title={suggestion}>
              {suggestion}
            </span>
          </button>
        {/each}
      </div>

      <!-- actions -->
      <div class="actions-group mt-12">
        <button type="button" class="btn btn-secondary" on:click={() => (isConfiguring = false)}>
          <icon-carbon:close ui-text-xl ui-mr-2 />
          Close
        </button>
        <button type="submit" class="btn btn-green" on:click={handleSave}>
          <icon-ic:twotone-save ui-text-xl ui-mr-2 />
          Save
        </button>
      </div>
    </div>
  </Modal>
{:catch error}
  <p>Error: {error}</p>
{/await}
