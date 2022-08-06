<script lang="ts">
  import { page } from '$app/stores';
  import Clipboard from '$lib/components/Clipboard.svelte';
  import CodeBox from '$lib/components/CodeBox.svelte';
  import Modal from '$lib/components/Modal.svelte';
  import PageHeader from '$lib/components/PageHeader.svelte';
  import ValidatorContainer from '$lib/components/ValidatorContainer.svelte';
  import type { Chatbot } from '$lib/models/app/chatbot';
  import { failure, info, success } from '$lib/services/toasts';
  import { nameof } from '$lib/utils/nameof';
  import * as sf from 'svelte-forms';
  import { required } from 'svelte-forms/validators';
  import Highlight from 'svelte-highlight';
  import jsonLang from 'svelte-highlight/languages/json';
  import 'svelte-highlight/styles/synth-midnight-terminal-dark.css';
  import { chatbotsStore } from '../../../../lib/stores/chatbots';

  // clean up modules selection
  chatbotsStore.selectChatbot(null);

  let isModalVisible = false;

  const clientId = Number($page.params['slug']);
  const name = sf.field(nameof<Chatbot>('name'), '', [required()]);
  const formData = sf.form(name);

  const handleDelete = (chatbotId: number) => {
    if (confirm('Are you sure?')) {
      chatbotsStore
        .deleteChatbot(clientId, chatbotId)
        .then(() => {
          success('Chatbot was deleted successfully');
          chatbotsStore.fetchChatbots(clientId);
        })
        .catch((error: Error) => failure(error.message));
    }
  };

  const handleSubmit = () => {
    formData.validate();

    if (!$name.value) {
      return;
    }

    chatbotsStore
      .createChatbot(clientId, $formData.summary as Chatbot)
      .then(() => {
        isModalVisible = false;
        success('Chatbot was created successfully');
        chatbotsStore.fetchChatbots(clientId);
      })
      .catch((error: Error) => failure(error.message));
  };
</script>

<svelte:head>
  <title>Chatbots</title>
</svelte:head>

<PageHeader>
  <h1 class="h3">Chatbots</h1>

  <div slot="actions">
    <button
      type="button"
      ui-btn
      ui-btn-blue
      on:click={() => {
        formData.reset();
        isModalVisible = true;
      }}>
      <icon-material-symbols:add-circle-outline-rounded ui-text-xl ui-mr-2 />
      New chatbot
    </button>
  </div>
</PageHeader>

{#await chatbotsStore.fetchChatbots(clientId)}
  <p>Cargando...</p>
{:then}
  {#if $chatbotsStore.chatbots.length}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
      {#each $chatbotsStore.chatbots as chatbot}
        {@const code = JSON.stringify(chatbot, null, 2)}

        <div>
          <!-- codebox -->
          <CodeBox>
            <!-- highlight -->
            <Highlight language={jsonLang} code={code} />

            <!-- actions -->
            <div slot="actions">
              <Clipboard text={code} let:copy on:copy={() => info('Copied!', { duration: 800 })}>
                <button type="button" ui-btn ui-btn-secondary on:click={copy}>
                  <icon-carbon:copy ui-text-xl ui-mr-2 />
                  Copiar
                </button>
              </Clipboard>
            </div>
          </CodeBox>

          <!-- actions -->
          <div ui-actions-group ui-mt-4>
            <button type="button" ui-btn ui-btn-red on:click={() => handleDelete(chatbot.id)}>
              <icon-carbon:trash-can ui-text-xl ui-mr-2 />
              Delete
            </button>
            <a href="/channels/whatsapp" ui-btn ui-btn-blue on:click={() => chatbotsStore.selectChatbot(chatbot)}>
              <icon-carbon:settings ui-text-xl ui-mr-2 />
              Configure
            </a>
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <div class="flex flex-col items-center gap-4 mt-36">
      <icon-material-symbols:inbox-outline-sharp ui-text-4xl ui-mr-2 />
      <p>No chatbots were found for client {clientId}</p>
    </div>
  {/if}
{:catch error}
  <p>Error: {error.message}</p>
{/await}

<Modal bind:isOpen={isModalVisible} size="xl">
  <span slot="title">Create chatbot</span>
  <div slot="content">
    <form class="form p-0 shadow-none" on:submit|preventDefault={handleSubmit}>
      <div class="form-item">
        <label for="name">Name</label>
        <input type="text" id="name" bind:value={$name.value} class="field" />
        <ValidatorContainer field={$name} />
      </div>

      <div class="actions-group mt-12">
        <button type="button" class="btn btn-secondary" on:click={() => (isModalVisible = false)}>
          <icon-carbon:close ui-text-xl ui-mr-2 />
          Close
        </button>

        <button type="submit" class="btn btn-green">
          <icon-ic:twotone-save ui-text-xl ui-mr-2 />
          Save
        </button>
      </div>
    </form>
  </div>
</Modal>
