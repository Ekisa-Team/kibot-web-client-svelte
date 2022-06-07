<script context="module" lang="ts">
  export const load: import('@sveltejs/kit').Load = async ({ error, status }) => {
    return {
      props: {
        status,
        message: error?.message
      }
    };
  };
</script>

<script lang="ts">
  import ErrorScreen from '$lib/components/screens/ErrorScreen.svelte';
  import NotFoundScreen from '$lib/components/screens/NotFoundScreen.svelte';

  export let status: number;
  export let message: string;
</script>

<svelte:head>
  <title>{status}: {message}</title>
</svelte:head>

{#if status == 404}
  <NotFoundScreen />
{:else}
  <ErrorScreen status={status} message={message} />
{/if}
