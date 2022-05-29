<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let text: string;

  const dispatch = createEventDispatcher();

  async function copy() {
    navigator.clipboard.writeText(text).then(() => dispatch('copy'));
  }
</script>

<slot copy={copy} />
