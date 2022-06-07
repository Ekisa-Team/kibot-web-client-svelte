<script lang="ts">
  import { t } from '$lib/translations';
  import { clientApplicationsStore } from '../../lib/stores/client-applications';
</script>

<svelte:head>
  <title>Applications</title>
</svelte:head>

<h1 class="h3">{$t('layout.sidebar.applications')}</h1>

{#await clientApplicationsStore.fetchApplications()}
  <p>Waiting...</p>
{:then}
  <div class="grid grid-cols-1 md:grid-cols-3">
    {#each $clientApplicationsStore.clients as client}
      <div>
        <pre>{JSON.stringify(client, null, 2)}</pre>

        <div class="flex items-center mt-4 space-x-2">
          <a
            href="applications/{client.id}/chatbots"
            class="btn btn-blue truncate"
            on:click={() => clientApplicationsStore.selectApplication(client)}>
            Edit
          </a>

          <button class="btn btn-secondary" disabled>Delete</button>
        </div>
      </div>
    {/each}
  </div>
{:catch error}
  <p>Error: {error}</p>
{/await}
