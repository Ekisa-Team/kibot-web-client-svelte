<script lang="ts">
  import { t } from '$lib/translations';
  import { clientApplicationsStore } from './store';
</script>

<svelte:head>
  <title>Applications</title>
</svelte:head>

<h1 class="h3">{$t('layout.sidebar.applications')}</h1>

{#await clientApplicationsStore.fetch()}
  <p>Waiting...</p>
{:then}
  <div class="grid grid-cols-1 md:grid-cols-3">
    {#each $clientApplicationsStore as app}
      <div>
        <pre>{JSON.stringify(app, null, 2)}</pre>

        <div class="flex items-center mt-4 space-x-2">
          <a href="applications/{app.id}/chatbots" class="btn btn-primary">Edit</a>
          <button class="btn btn-secondary" disabled>Delete</button>
        </div>
      </div>
    {/each}
  </div>
{:catch error}
  <p>Error: {error}</p>
{/await}