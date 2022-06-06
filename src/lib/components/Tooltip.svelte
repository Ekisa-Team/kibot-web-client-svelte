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

<div
  on:focus={void 0}
  on:mouseover={handleMouseOver}
  on:mouseleave={handleMouseLeave}
  on:mousemove={handleMouseMove}>
  <slot name="target" />
</div>

{#if isHovered}
  <div
    style="top: {y}px; left: {x}px;"
    ui-absolute
    ui-rounded-xl
    ui-shadow-2xl
    ui-z10
    ui-p="y1 x2"
    ui-bg="white dark:zinc-800"
    ui-border="1 zinc-300 dark:zinc-500">
    <slot name="content">
      {title}
    </slot>
  </div>
{/if}
