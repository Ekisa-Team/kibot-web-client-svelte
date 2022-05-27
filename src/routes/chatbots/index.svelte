<script lang="ts">
  import Breadcrumb from '$lib/components/breadcrumb/Breadcrumb.svelte';
  import type { BreadcrumbItems } from '$lib/components/breadcrumb/types';
  import { chatbotStore } from './store';

  const breadcrumbItems: BreadcrumbItems = [
    { icon: 'i-fa-solid:terminal', text: 'Home', path: '/' },
    { text: 'Public', path: '/' },
    { text: 'Applications', path: '/' }
  ];
</script>

<svelte:head>
  <title>Chatbots</title>
</svelte:head>

<Breadcrumb items={breadcrumbItems} />

<h1 class="h3">Chatbots</h1>

{#await chatbotStore.fetch()}
  <p>Waiting...</p>
{:then}
  {#each $chatbotStore as app}
    <pre>{JSON.stringify(app, null, 2)}</pre>
    <button class="btn btn-secondary mt-4" disabled>Delete</button>
  {/each}
  <!-- <Table columns={columns} dataSource={$clientApplicationStore} canEdit={true} /> -->
{:catch error}
  <p>Error: {error.message}</p>
{/await}
