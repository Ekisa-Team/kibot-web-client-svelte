<script lang="ts">
  export let type: 'info' | 'success' | 'warning' | 'danger' = 'info';

  const iconMap = new Map([
    ['info', 'i-mdi:robot-happy'],
    ['success', 'i-mdi:robot-happy'],
    ['warning', 'i-mdi:robot-happy'],
    ['danger', 'i-mdi:robot-happy']
  ]);

  const bgMap = new Map([
    ['info', 'from-indigo-100 dark:from-indigo-800'],
    ['success', 'from-green-100 dark:from-green-800'],
    ['warning', 'from-yellow-100 dark:from-yellow-800'],
    ['danger', 'from-red-100 dark:from-red-800']
  ]);

  const bgAccentMap = new Map([
    ['info', 'bg-indigo-500'],
    ['success', 'bg-green-500'],
    ['warning', 'bg-yellow-500'],
    ['danger', 'bg-red-500']
  ]);

  const textMap = new Map([
    ['info', 'text-indigo-800 dark:text-indigo-100'],
    ['success', 'text-green-800 dark:text-green-100'],
    ['warning', 'text-yellow-800 dark:text-yellow-100'],
    ['danger', 'text-red-800 dark:text-red-100']
  ]);

  const icon = iconMap.get(type);
  const bg = bgMap.get(type);
  const bgAccent = bgAccentMap.get(type);
  const text = textMap.get(type);
</script>

<div
  role="alert"
  class="flex w-full items-center rounded-full  bg-gradient-to-r p-2 leading-none {bg}">
  <!-- icon -->
  <span class="mr-3 flex rounded-full px-2 py-1 text-3xl font-bold uppercase text-white {bgAccent}">
    <div class={icon} />
  </span>

  <!-- text -->
  <span class="mr-2 flex-auto text-left text-sm {text}">
    <slot />
  </span>
</div>
