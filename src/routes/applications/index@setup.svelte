<script lang="ts">
  import Clipboard from '$lib/components/Clipboard.svelte';
  import CodeBox from '$lib/components/CodeBox.svelte';
  import Modal from '$lib/components/Modal.svelte';
  import PageHeader from '$lib/components/PageHeader.svelte';
  import ValidatorContainer from '$lib/components/ValidatorContainer.svelte';
  import type { ClientApplication } from '$lib/models/app/client-application';
  import { failure, info, success } from '$lib/services/toasts';
  import { chatbotsStore } from '$lib/stores/chatbots';
  import { nameof } from '$lib/utils/nameof';
  import { variables } from '$lib/variables';
  import * as sf from 'svelte-forms';
  import { required } from 'svelte-forms/validators';
  import Highlight from 'svelte-highlight';
  import jsonLang from 'svelte-highlight/languages/json';
  import 'svelte-highlight/styles/synth-midnight-terminal-dark.css';
  import { clientApplicationsStore } from '../../lib/stores/applications';

  console.log(variables.kibotCoreApiUrl, variables.kibotMiddlewareQuironApiUrl);

  // clean up modules selection
  clientApplicationsStore.selectApplication(null);
  chatbotsStore.selectChatbot(null);

  let isModalVisible = false;

  const name = sf.field(nameof<ClientApplication>('name'), '', [required()]);
  const formData = sf.form(name);

  const handleSubmit = () => {
    formData.validate();

    if (!$name.value) {
      return;
    }

    clientApplicationsStore
      .createApplication($formData.summary as ClientApplication)
      .then(() => {
        isModalVisible = false;
        success('Client was created successfully');
      })
      .catch((error: Error) => failure(error.message));
  };
</script>

<svelte:head>
  <title>Client applications</title>
</svelte:head>

<PageHeader>
  <h1 class="h3">Client applications</h1>

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
      New client
    </button>
  </div>
</PageHeader>

{#await clientApplicationsStore.fetchApplications()}
  <p>Loading...</p>
{:then}
  <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
    {#each $clientApplicationsStore.clients as client}
      {@const code = JSON.stringify(client, null, 2)}

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
                Copy
              </button>
            </Clipboard>
          </div>
        </CodeBox>

        <!-- actions -->
        <div ui-actions-group ui-mt-4>
          <a
            href="applications/{client.id}/chatbots"
            ui-btn
            ui-btn-blue
            on:click={() => clientApplicationsStore.selectApplication(client)}>
            <icon-carbon:settings ui-text-xl ui-mr-2 />
            Configure
          </a>
        </div>
      </div>
    {/each}
  </div>
{:catch error}
  <p>Error: {error}</p>
{/await}

<Modal bind:isOpen={isModalVisible} size="xl">
  <span slot="title">Create client</span>
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
