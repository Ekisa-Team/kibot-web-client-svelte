<script lang="ts">
  import Breadcrumb from '$lib/components/breadcrumb/Breadcrumb.svelte';
  import type { BreadcrumbItems } from '$lib/components/breadcrumb/types';
  import type { TableColumns, TableDataSource } from '$lib/components/table/types';
  import { t } from '$lib/translations';
  import { clientApplicationsStore } from './store';

  const breadcrumbItems: BreadcrumbItems = [
    { icon: 'i-fa-solid:terminal', text: 'Home', path: '/' },
    { text: 'Public', path: '/' },
    { text: 'Applications', path: '/' }
  ];

  const columns: TableColumns = [
    { text: 'Name' },
    { text: 'Status' },
    { text: 'Created at' },
    { text: 'Updated at' }
  ];

  let ds: TableDataSource = [
    [
      { text: 'Quirón Web' },
      { text: 'true' },
      { text: new Date().toISOString() },
      { text: new Date().toISOString() }
    ],
    [
      { text: 'Tempus 3' },
      { text: 'false' },
      { text: new Date().toISOString() },
      { text: new Date().toISOString() }
    ]
  ];

  // ds = ds.map((row) =>
  //   row.map((cell, i) => {
  //     if (i === 0) {
  //       cell.cssClass = 'font-bold';
  //     }

  //     if (i === 1) {
  //       if (cell.text === 'true') {
  //         cell.text = 'Active';
  //         cell.cssClass = 'badge-green';
  //       } else if (cell.text === 'false') {
  //         cell.text = 'Blocked';
  //         cell.cssClass = 'badge-red';
  //       }
  //     }

  //     return cell;
  //   })
  // ) as TableDataSource;
</script>

<svelte:head>
  <title>Applications</title>
</svelte:head>

<Breadcrumb items={breadcrumbItems} />

<h1 class="h3">{$t('layout.sidebar.applications')}</h1>

{#await clientApplicationsStore.fetch()}
  <p>Waiting...</p>
{:then}
  {#each $clientApplicationsStore as app}
    <pre>{JSON.stringify(app, null, 2)}</pre>
    <button class="btn btn-secondary mt-4" disabled>Delete</button>
  {/each}
  <!-- <Table columns={columns} dataSource={$clientApplicationStore} canEdit={true} /> -->
{:catch error}
  <p>Error: {error.message}</p>
{/await}
