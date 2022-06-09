<script lang="ts">
  import { clientApplicationsStore } from '$lib/stores/applications';
  import { chatbotsStore } from '$lib/stores/chatbots';
  import Alert from '../Alert.svelte';
</script>

<div class="mt-auto w-full relative overflow-hidden">
  <!-- badge  -->
  <badge class="badge-yellow mb-6 inline-block whitespace-nowrap">
    Referencias
    <icon-ph:arrow-elbow-right-down />
  </badge>

  <!-- alerts -->
  <div class="flex flex-col space-y-2">
    <Alert type="success">
      <icon-ph:terminal-window-duotone slot="icon" />
      <span class="block max-w-[150px] truncate">{$clientApplicationsStore.selectedClient?.name}</span>
    </Alert>
    <Alert type="warning">
      <icon-ph:robot-fill slot="icon" />
      <span class="block max-w-[150px] truncate">{$chatbotsStore?.selectedChatbot?.accessKey}</span>
    </Alert>
  </div>
</div>
