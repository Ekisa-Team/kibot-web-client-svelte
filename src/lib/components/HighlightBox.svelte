<script lang="ts">
  export let isActive: Boolean;
  export let color: 'blue' | 'green' | 'red' | 'pink' | 'yellow' = 'blue';
</script>

<div class="highlighted-box {isActive ? 'highlighted-box-' + color : ''}">
  <slot />
</div>

<style>
  .highlighted-box {
    @apply relative;
    @apply block;
    @apply p-1;
    @apply rounded-2xl;
  }

  .highlighted-box.highlighted-box-blue {
    @apply shadow-2xl;
    @apply bg-gradient-to-br from-blue-700 to-blue-50;
    @apply shadow-blue-900;
  }

  .highlighted-box.highlighted-box-green {
    @apply shadow-2xl;
    @apply bg-gradient-to-br from-green-700 to-green-50;
    @apply shadow-green-900;
  }

  .highlighted-box.highlighted-box-red {
    @apply shadow-2xl;
    @apply bg-gradient-to-br from-red-700 to-red-50;
    @apply shadow-red-900;
  }

  .highlighted-box.highlighted-box-pink {
    @apply shadow-2xl;
    @apply bg-gradient-to-br from-pink-700 to-pink-50;
    @apply shadow-pink-900;
  }

  .highlighted-box.highlighted-box-yellow {
    @apply shadow-2xl;
    @apply bg-gradient-to-br from-yellow-700 to-yellow-50;
    @apply shadow-yellow-900;
  }
</style>
