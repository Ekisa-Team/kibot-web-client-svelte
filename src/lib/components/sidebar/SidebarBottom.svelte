<script lang="ts">
  import { clientApplicationsStore } from '$lib/stores/applications';
  import { chatbotsStore } from '$lib/stores/chatbots';
  import Alert from '../Alert.svelte';
</script>

<div class="mt-auto w-full relative overflow-hidden">
  <!-- badge  -->
  <badge class="badge-yellow mb-6 inline-block whitespace-nowrap">
    Modules
    <icon-ph:arrow-elbow-right-down />
  </badge>

  <!-- alerts -->
  <div class="flex flex-col space-y-2">
    <Alert type="success">
      <icon-ph:terminal-window-duotone slot="icon" />
      <badge class="badge-green">Client [{$clientApplicationsStore.selectedClient?.id}]</badge>
      <span class="block max-w-[150px] truncate mt-1">{$clientApplicationsStore.selectedClient?.name}</span>
    </Alert>
    <Alert type="warning">
      <icon-ph:robot-fill slot="icon" />
      <badge class="badge-yellow">Chatbot [{$chatbotsStore?.selectedChatbot?.id}]</badge>
      <span class="block max-w-[150px] truncate mt-1">{$chatbotsStore?.selectedChatbot?.name}</span>
    </Alert>
  </div>
</div>
