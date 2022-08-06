<script lang="ts">
  import { Theme } from '$lib/enums/theme';
  import { getTheme } from '$lib/services/theme';
  import { themeStore } from '$lib/stores/theme';
  import type { Datalist, DataListItem } from '$lib/types/datalist';
  import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@rgossiaux/svelte-headlessui';

  export let showThemeIcon = true;
  export let showThemeName = true;

  const themes: Datalist<Theme> = [
    {
      value: Theme.Light,
      text: 'Light',
      icon: 'icon-carbon:light text-xl'
    },
    {
      value: Theme.Dark,
      text: 'Dark',
      icon: 'icon-carbon:moon text-xl'
    },
    {
      value: Theme.System,
      text: 'OS',
      icon: 'icon-carbon:screen text-xl'
    }
  ];

  let selectedTheme: DataListItem<Theme> = themes.find((t) => t.value === getTheme()) || themes[0];

  const handleThemeChange = (event: CustomEvent<DataListItem<Theme>>) => {
    selectedTheme = event.detail;
    themeStore.change(selectedTheme.value);
  };
</script>

<Listbox value={selectedTheme} on:change={handleThemeChange} let:open class="relative">
  <!-- menu button -->
  <ListboxButton class="btn btn-secondary btn-fit space-x-2">
    {#if showThemeIcon}
      <div class={selectedTheme.icon} />
    {/if}

    {#if showThemeName}
      <span class="hidden md:inline">{selectedTheme.text}</span>
    {/if}
  </ListboxButton>

  <!-- transition -->
  <Transition
    show={open}
    enter="transition duration-100 ease-out"
    enterFrom="transform scale-95 opacity-0"
    enterTo="transform scale-100 opacity-100"
    leave="transition duration-75 ease-out"
    leaveFrom="transform scale-100 opacity-100"
    leaveTo="transform scale-95 opacity-0">
    <!-- menu items -->
    <ListboxOptions class="dropdown dropdown-bottom-left w-40">
      {#each themes as theme (theme.value)}
        <ListboxOption value={theme} let:active let:selected>
          <div
            class="dropdown-item whitespace-nowrap"
            class:dropdown-item-active={active}
            class:dropdown-item-selected={selected}>
            <div class={theme.icon} />
            <span class="ml-3 text-sm font-semibold">{theme.text}</span>
          </div>
        </ListboxOption>
      {/each}
    </ListboxOptions>
  </Transition>
</Listbox>
