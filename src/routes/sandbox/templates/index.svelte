<script lang="ts">
  import Clipboard from '$lib/components/Clipboard.svelte';
  import CodeBox from '$lib/components/CodeBox.svelte';
  import Loader from '$lib/components/Loader.svelte';
  import Modal from '$lib/components/Modal.svelte';
  import PageHeader from '$lib/components/PageHeader.svelte';
  import { info } from '$lib/core/services/toasts';
  import type { Template } from '$lib/models/app/template';
  import { chatbotStore } from '$lib/stores/chatbot';
  import { Highlight } from 'svelte-highlight';
  import jsonLang from 'svelte-highlight/languages/json';
  import 'svelte-highlight/styles/synth-midnight-terminal-dark.css';
  import { templatesStore } from './store';

  $: chatbotId = $chatbotStore.selectedChatbot?.id || 0;

  let isPreparingTemplate = false;
  let selectedTemplate: Partial<Template> & { messageClone: string } = { message: '', messageClone: '' };

  let parameters: { key: string; value: string }[] = [];

  const handlePrepare = (template: Template) => {
    selectedTemplate = { ...template, messageClone: template.message };
    parameters = selectedTemplate.message?.match(/{{.}}/g)?.map((p) => ({ key: p.at(2)!, value: '' })) || [];
    isPreparingTemplate = true;
  };

  const handleParameterChange = ({ key, value }: { key: string; value: string }) => {
    const search = new RegExp(
      `({{(${key})}}-%${value}%)|({{(${key})}}-%%)|({{(${key})}}-)|({{(${key})}})`,
      'g'
    );

    const replaceValue = value ? `{{${key}}}-%${value}%` : `{{${key}}}`;
    console.log(selectedTemplate.messageClone, search, replaceValue);
    selectedTemplate.message = selectedTemplate.message?.replace(search, replaceValue);
  };
</script>

<svelte:head>
  <title>Sandbox => Templates</title>
</svelte:head>

<PageHeader>
  <h1 class="h3">Sandbox => <span class="badge badge-blue align-middle">Templates</span></h1>
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
              <button class="btn btn-secondary" on:click={copy}>
                <div class="i-carbon:copy mr-2 text-lg" />
                Copy
              </button>
            </Clipboard>
          </div>
        </CodeBox>

        <!-- actions -->
        <div class="flex items-center mt-4 space-x-2">
          <button type="submit" class="btn btn-blue" on:click={() => handlePrepare(template)}>
            <div class="i-mdi:progress-upload mr-2 text-2xl" />
            Prepare
          </button>
        </div>
      </div>
    {/each}
  </div>

  {#if selectedTemplate}
    <Modal bind:isOpen={isPreparingTemplate} size="5xl">
      <span slot="title">{selectedTemplate?.name}</span>

      <div slot="content">
        <p>{@html selectedTemplate.message}</p>

        {#each parameters as parameter}
          <div class="mb-2">
            <input
              type="text"
              placeholder={parameter.key}
              class="field"
              bind:value={parameter.value}
              on:change={() => handleParameterChange(parameter)} />
          </div>
        {/each}

        <div class="actions-group mt-12">
          <button class="btn btn-secondary" on:click={() => (isPreparingTemplate = false)}>
            <div class="i-carbon:close mr-2 lg" />
            Close
          </button>
          <button class="btn btn-blue" on:click={() => null}>
            <div class="i-carbon:send-alt mr-2 text-2xl" />
            Send
          </button>
        </div>
      </div>
    </Modal>
  {/if}
{:catch error}
  <p>Error: {error}</p>
{/await}
