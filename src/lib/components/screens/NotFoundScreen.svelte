<script>
  import { browser } from '$app/env';
</script>

<span ui-text-xl>404</span>
<h1 ui-text-4xl ui-mb-6>Page not found...</h1>

<p>The page you are looking for doesn't exist or has been moved.</p>

<div class="actions mt-8">
  <button ui-btn ui-btn-blue disabled={browser && history.length === 1} on:click={() => history.back()}>
    <icon-carbon:arrow-left ui-mr-2 />
    Regresar
  </button>
</div>
