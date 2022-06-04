<script lang="ts">
  export let title = '';
  export let offset: [number, number] = [5, 5];

  let isHovered = false;
  let x: number;
  let y: number;

  const handleMouseOver = (event: MouseEvent) => {
    isHovered = true;
    y = event.pageY + offset[0];
    x = event.pageX + offset[1];
  };

  const handleMouseMove = (event: MouseEvent) => {
    y = event.pageY + offset[0];
    x = event.pageX + offset[1];
  };

  const handleMouseLeave = () => {
    isHovered = false;
  };
</script>

<div on:focus={void 0} on:mouseover={handleMouseOver} on:mouseleave={handleMouseLeave} on:mousemove={handleMouseMove}>
  <slot name="target" />
</div>

{#if isHovered}
  <div style="top: {y}px; left: {x}px;" class="tooltip">
    <slot name="content">
      {title}
    </slot>
  </div>
{/if}

<style>
  .tooltip {
    @apply absolute;
    @apply p-2 py-1;
    @apply bg-accent;
    @apply border border-zinc-500;
    @apply rounded-lg;
    @apply shadow-2xl;
    @apply z-10;
  }
</style>
