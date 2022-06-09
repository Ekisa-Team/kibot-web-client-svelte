<script lang="ts">
  import Clipboard from '$lib/components/Clipboard.svelte';
  import CodeBox from '$lib/components/CodeBox.svelte';
  import Loader from '$lib/components/Loader.svelte';
  import Modal from '$lib/components/Modal.svelte';
  import PageHeader from '$lib/components/PageHeader.svelte';
  import type { Template, TemplatePayload } from '$lib/models/app/template';
  import { failure, info, success, warning } from '$lib/services/toasts';
  import { chatbotsStore } from '$lib/stores/chatbots';
  import { Highlight } from 'svelte-highlight';
  import jsonLang from 'svelte-highlight/languages/json';
  import 'svelte-highlight/styles/synth-midnight-terminal-dark.css';
  import { templatesService } from './service';
  import { templatesStore } from './store';

  $: chatbotId = $chatbotsStore.selectedChatbot?.id || 0;

  let isLoaded = false;

  let selectedTemplate: Template;
  let templateRecipient: string;
  let templateParameters: string[] = [];
  let templateParametersValues: Record<string, string> = {};

  /**
   * Load selected template & extract parameters into a dynamic text
   * @param template selected template to be loaded
   */
  const handleLoading = (template: Template) => {
    // Clean up old entries
    templateParameters = [];
    templateParametersValues = {};

    // Clone template to be loaded
    selectedTemplate = structuredClone(template);

    // Extract parameters from template text & return text with HTML elements
    const { parameters, dynamicText } = templatesService.extractParameters(selectedTemplate.message);
    templateParameters = parameters;
    selectedTemplate.message = dynamicText;

    isLoaded = true;
  };

  /**
   * Replace parameter placeholders with the user input value
   * @param parameter parameter being edited at runtime
   */
  const handleParameterChange = (parameter: string) => {
    // Get parameter tag to be processed
    const paramID = templatesService.extractParameterAsID(parameter, 'p');
    const paramElement = document.getElementById(paramID);
    if (!paramElement) {
      return;
    }

    paramElement.textContent = templateParametersValues[parameter] || parameter;
  };

  const handleSending = () => {
    const entries = Object.values(templateParametersValues);

    if (entries.length < templateParameters.length) {
      warning('You must fill in all parameters before sending it.'); // TODO: i18n
      return;
    }

    const payload: TemplatePayload = { to: templateRecipient, parameters: entries };
    templatesStore
      .sendTemplate(chatbotId, selectedTemplate.id, payload)
      .then(() => {
        success(`Template message was sent to ${templateRecipient}`);
        isLoaded = false;
      })
      .catch((error: Error) => {
        failure(error.message);
      });
  };
</script>

<svelte:head>
  <title>Sandbox => Templates</title>
</svelte:head>

<PageHeader>
  <h1 class="h3">Sandbox => <badge class="badge-blue align-middle">Templates</badge></h1>
</PageHeader>

{#await templatesStore.fetchTemplates(chatbotId)}
  <Loader />
{:then}
  <div class="grid grid-cols-1 gap-y-12">
    {#each $templatesStore.data as template}
      {@const code = JSON.stringify(template, null, 2)}

      <div>
        <!-- codebox -->
        <CodeBox>
          <!-- highlight -->
          <Highlight language={jsonLang} code={code} />

          <!-- actions -->
          <div slot="actions">
            <Clipboard text={code} let:copy on:copy={() => info('Copied!', { duration: 800 })}>
              <button type="button" ui-btn ui-btn-secondary on:click={copy}>
                <icon-carbon:copy ui-mr-2 ui-text-lg />
                Copy
              </button>
            </Clipboard>
          </div>
        </CodeBox>

        <!-- actions -->
        <div class="flex items-center mt-4 space-x-2">
          <button type="button" ui-btn ui-btn-blue on:click={() => handleLoading(template)}>
            <icon-mdi:progress-upload ui-mr-2 ui-text-2xl />
            Load
          </button>
        </div>
      </div>
    {/each}
  </div>

  {#if selectedTemplate}
    <Modal bind:isOpen={isLoaded} size="5xl">
      <span slot="title">{selectedTemplate?.name}</span>

      <div slot="content">
        <!-- template message -->
        <div ui-max-h="250px" ui-overflow-auto ui-bg="zinc-200 dark:zinc-900" ui-p2 ui-mb-8 ui-rounded-xl>
          <pre><p class="template-message whitespace-pre-wrap">{@html selectedTemplate.message}</p></pre>
        </div>

        <!-- recipient -->
        <div class="mb-2">
          <label for="to">To</label>
          <input type="text" bind:value={templateRecipient} class="field" />
        </div>

        <!-- parameters -->
        <div class="mb-2">
          <label for="to">Parameters</label>
          {#each templateParameters as parameter}
            <input
              type="text"
              placeholder={parameter}
              class="field mb-2"
              bind:value={templateParametersValues[parameter]}
              on:keyup={() => handleParameterChange(parameter)} />
          {/each}
        </div>

        <!-- actions -->
        <div class="actions-group mt-12">
          <button class="btn btn-secondary" on:click={() => (isLoaded = false)}>
            <icon-carbon:close ui-text-lg ui-mr-2 />
            Close
          </button>
          <button class="btn btn-blue" on:click={handleSending}>
            <icon-carbon:send-alt ui-text-2xl ui-mr-2 />
            Send
          </button>
        </div>
      </div>
    </Modal>
  {/if}
{:catch error}
  <p>Error: {error}</p>
{/await}

<style>
  .template-message :global(span) {
    color: #7f8100;
  }

  :global(.dark) .template-message :global(span) {
    color: #b8d802;
  }
</style>
