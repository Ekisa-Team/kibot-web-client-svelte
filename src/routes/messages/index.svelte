<script lang="ts">
  import Breadcrumb from '$lib/components/breadcrumb/Breadcrumb.svelte';
  import type { BreadcrumbItems } from '$lib/components/breadcrumb/types';

  const breadcrumbItems: BreadcrumbItems = [
    { icon: 'i-fa-solid:terminal', text: 'Home', path: '/' },
    { text: 'Public', path: '/' },
    { text: 'Applications', path: '/' }
  ];
</script>

<svelte:head>
  <title>Mensajes</title>
</svelte:head>

<Breadcrumb items={breadcrumbItems} />

<h1 class="h3">Mensajes</h1>
