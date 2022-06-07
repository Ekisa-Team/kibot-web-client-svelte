<script lang="ts">
  let isHovered = false;
</script>

<div
  ui-relative
  ui-rounded-xl
  ui-overflow-hidden
  on:mouseenter={() => (isHovered = true)}
  on:mouseleave={() => (isHovered = false)}>
  <slot />

  <div ui-absolute ui-top-0 ui-right-0 ui-p-4>
    {#if isHovered}
      <slot name="actions" />
    {/if}
  </div>
</div>
