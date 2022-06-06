<script lang="ts">
  import { chatbotStore } from '$lib/stores/chatbot';
  import { clientApplicationStore } from '$lib/stores/client-application';
  import Alert from '../Alert.svelte';
</script>

<div class="mt-auto w-full relative overflow-hidden">
  <!-- badge  -->
  <span class="badge badge-yellow mb-6 inline-block whitespace-nowrap">
    Referencias
    <div class="i-ph:arrow-elbow-right-down" />
  </span>

  <!-- alerts -->
  <div class="flex flex-col space-y-2">
    <Alert type="success">
      <div slot="icon" class="i-ph:terminal-window-duotone" />
      <span class="block max-w-[150px] truncate">{$clientApplicationStore.selectedClient?.name}</span>
    </Alert>
    <Alert type="warning">
      <div slot="icon" class="i-ph:robot-fill" />
      <span class="block max-w-[150px] truncate">{$chatbotStore?.selectedChatbot?.accessKey}</span>
    </Alert>
  </div>
</div>
