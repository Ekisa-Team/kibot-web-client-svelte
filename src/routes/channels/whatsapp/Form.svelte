<script lang="ts" context="module">
  const elements = new Set<any>();

  export function clearForm() {
    elements.forEach((element) => element.clear());
  }
</script>

<script lang="ts">
  import Alert from '$lib/components/Alert.svelte';
  import Clipboard from '$lib/components/Clipboard.svelte';
  import HighlightBox from '$lib/components/HighlightBox.svelte';
  import Modal from '$lib/components/Modal.svelte';
  import ValidatorContainer from '$lib/components/ValidatorContainer.svelte';
  import { info } from '$lib/core/services/toasts';
  import type { Channel } from '$lib/models/app/channel';
  import type { MessagingProvider } from '$lib/models/app/messaging-provider';
  import type { Datalist } from '$lib/types/datalist';
  import { nameof } from '$lib/utils/nameof';
  import { createEventDispatcher, onMount } from 'svelte';
  import * as sf from 'svelte-forms';
  import { pattern, required, url } from 'svelte-forms/validators';

  export let channel: Channel | null;
  export let messagingProviders: MessagingProvider[];
  export let isChannelConnected: boolean;
  export let devModeEnabled: boolean;

  const dispatch = createEventDispatcher<Channel>();

  const httpMethods: Datalist<number> = [
    { value: 0, text: 'POST' },
    { value: 1, text: 'PUT' }
  ];

  const platformPhoneNumber = sf.field(nameof<Channel>('platformPhoneNumber'), channel?.platformPhoneNumber, [
    required(),
    pattern(/^([0-9]{1,2})([0-9]{10,12})$/g)
  ]);
  const platformAccountSid = sf.field(nameof<Channel>('platformAccountSid'), channel?.platformAccountSid, [
    required()
  ]);
  const platformAuthToken = sf.field(nameof<Channel>('platformAuthToken'), channel?.platformAuthToken, [
    required()
  ]);
  const httpMethodCode = sf.field(nameof<Channel>('httpMethodCode'), channel?.httpMethodCode, [required()]);
  const callbackUrl = sf.field(nameof<Channel>('callbackUrl'), channel?.callbackUrl, [required(), url()], {
    checkOnInit: false
  });
  const messagingProviderId = sf.field(nameof<Channel>('messagingProviderId'), channel?.messagingProviderId, [
    required()
  ]);
  const formData = sf.form(
    platformPhoneNumber,
    platformAccountSid,
    platformAuthToken,
    httpMethodCode,
    callbackUrl,
    messagingProviderId
  );

  let canSave: boolean;
  $: canSave = $formData.valid;

  let isViewSourceOpen = false;

  onMount(() => {
    elements.add(formData);
    return () => elements.delete(formData);
  });

  const handleDisconnect = async () => {
    dispatch('disconnect' as any, channel?.id);
  };

  const handleSubmit = async () => {
    if (canSave) {
      dispatch('save' as any, { ...channel, ...$formData.summary });
    }
  };
</script>

<HighlightBox isActive={devModeEnabled} color="yellow">
  <form class="form" class:highlighted-box={devModeEnabled} on:submit|preventDefault={handleSubmit}>
    <div class="form-group form-cols-2 mb-8">
      <div class="form-item">
        <label for="platformPhoneNumber">Platform phone number</label>
        <input
          type="text"
          id="platformPhoneNumber"
          placeholder={`^([0-9]{1,2})([0-9]{10,12})$/g`}
          bind:value={$platformPhoneNumber.value}
          class="field" />
        <ValidatorContainer field={$platformPhoneNumber} />
      </div>

      <div class="form-item">
        <label for="platformAccountSid">Platform account SID</label>
        <input type="text" id="platformAccountSid" bind:value={$platformAccountSid.value} class="field" />
        <ValidatorContainer field={$platformAccountSid} />
      </div>

      <div class="form-item">
        <label for="platformAuthToken">Platform auth token</label>
        <input type="text" id="platformAuthToken" bind:value={$platformAuthToken.value} class="field" />
        <ValidatorContainer field={$platformAuthToken} />
      </div>
    </div>

    <Alert>
      La siguiente configuración le permitirá establecer un Endpoint para realizar una petición HTTP <strong
        class="font-semibold">POST</strong>
      o <strong class="font-semibold">PUT</strong> y recibir las respuestas del usuario.
    </Alert>
    <div class="form-group mt-4 mb-8">
      <div class="form-item">
        <label for="httpMethodCode">HTTP method</label>
        <select id="httpMethodCode" class="field" bind:value={$httpMethodCode.value}>
          {#each httpMethods as method}
            <option value={method.value}>{method.text}</option>
          {/each}
        </select>
        <ValidatorContainer field={$httpMethodCode} />
      </div>

      <div class="form-item">
        <label for="callbackUrl">Callback URL</label>
        <input type="text" id="callbackUrl" bind:value={$callbackUrl.value} class="field" />
        <ValidatorContainer field={$callbackUrl} />
      </div>
    </div>

    <div class="form-group mt-4">
      <div class="form-item">
        <label for="messagingProviderId">Messaging provider</label>
        <select id="messagingProviderId" class="field" bind:value={$messagingProviderId.value}>
          {#each messagingProviders as provider}
            <option value={provider.id}>{provider.name}</option>
          {/each}
        </select>
        <ValidatorContainer field={$messagingProviderId} />
      </div>
    </div>

    <div class="mt-12 actions-group">
      <button type="button" class="btn btn-secondary" on:click={() => (isViewSourceOpen = true)}>
        <div class="i-ph:code mr-2 text-2xl" />
        View source
      </button>
      <button type="button" class="btn btn-secondary" on:click={() => formData.clear()}>
        <div class="i-fluent:broom-16-regular mr-2 text-2xl" />
        Clear
      </button>
      <button type="button" class="btn btn-secondary" on:click={() => formData.reset()}>
        <div class="i-ion:arrow-undo-outline mr-2 text-2xl" />
        Reset
      </button>
      {#if isChannelConnected}
        <button type="button" class="btn btn-red" on:click={handleDisconnect}>
          <div class="i-codicon:debug-disconnect mr-2 text-2xl" />
          Disconnect
        </button>
      {/if}
      <button type="submit" class="btn btn-green" disabled={!canSave}>
        <div class="i-iconoir:save-floppy-disk mr-2 text-2xl" />
        Save
      </button>
    </div>
  </form>
</HighlightBox>

<Modal bind:isOpen={isViewSourceOpen} size="md">
  <span slot="title">Source</span>
  <div slot="content">
    <span class="break-all">
      {window.btoa(JSON.stringify($formData.summary))}
    </span>

    <div class="actions-group mt-12">
      <button class="btn btn-secondary" on:click={() => (isViewSourceOpen = false)}>
        <div class="i-carbon:close mr-2 lg" />
        Close
      </button>

      <Clipboard
        text={JSON.stringify($formData.summary, null, 2)}
        let:copy
        on:copy={() => info('Copied!', { duration: 800 })}>
        <button class="btn btn-blue" on:click={copy}>
          <div class="i-carbon:copy mr-2 text-lg" />
          Copy
        </button>
      </Clipboard>
    </div>
  </div>
</Modal>
