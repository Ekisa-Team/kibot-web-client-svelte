<script lang="ts">
  import { Theme } from '$lib/enums/theme';
  import { getTheme } from '$lib/services/theme';
  import { appTheme } from '$lib/stores/app-theme';
  import { t } from '$lib/translations';
  import type { Datalist, DataListItem } from '$lib/types/datalist';
  import {
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
    Transition
  } from '@rgossiaux/svelte-headlessui';

  export let showThemeIcon = true;
  export let showThemeName = true;

  const themes: Datalist<Theme> = [
    {
      value: Theme.Light,
      text: $t('layout.navbar.themePicker.light'),
      icon: 'i-carbon:light text-xl'
    },
    {
      value: Theme.Dark,
      text: $t('layout.navbar.themePicker.dark'),
      icon: 'i-carbon:moon text-xl'
    },
    {
      value: Theme.System,
      text: $t('layout.navbar.themePicker.system'),
      icon: 'i-carbon:screen text-xl'
    }
  ];

  let selectedTheme: DataListItem<Theme> = themes.find((t) => t.value === getTheme()) || themes[0];

  const handleThemeChange = (event: CustomEvent<DataListItem<Theme>>) => {
    selectedTheme = event.detail;
    appTheme.update(() => selectedTheme.value);
  };
</script>

<Listbox value={selectedTheme} on:change={handleThemeChange} let:open class="relative">
  <!-- menu button -->
  <ListboxButton class="btn btn-secondary space-x-2">
    {#if showThemeIcon}
      <div class={selectedTheme.icon} />
    {/if}

    {#if showThemeName}
      <span>{selectedTheme.text}</span>
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
