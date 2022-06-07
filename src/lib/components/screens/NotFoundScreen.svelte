<span ui-text-xl>404</span>
<h1 ui-text-4xl ui-mb-6>Page not found...</h1>

<p>The page you are looking for doesn't exist or has been moved.</p>

<div class="actions mt-8">
  <button ui-btn ui-btn-blue on:click={() => window.history.back()}>
    <icon-carbon:arrow-left />
    Go back
  </button>
</div>
