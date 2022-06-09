<script lang="ts">
  import { loadTranslations, locale } from '$lib/translations';
  import type { Datalist, DataListItem } from '$lib/types/datalist';
  import type { SupportedLanguage } from '$lib/types/supported-language';
  import { LocalStorageItem, setItem } from '$lib/utils/local-storage';
  import {
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
    Transition
  } from '@rgossiaux/svelte-headlessui';

  export let showCountryFlag = true;
  export let showLanguage = true;

  const languages: Datalist<SupportedLanguage> = [
    {
      value: 'en',
      text: 'English',
      icon: 'icon-emojione:flag-for-united-kingdom text-xl'
    },
    {
      value: 'es',
      text: 'Español',
      icon: 'icon-emojione:flag-for-colombia text-xl'
    }
  ];

  let selectedLanguage: DataListItem<SupportedLanguage> =
    languages.find((l) => l.value === locale.get()) || languages[0];

  async function handleLanguageChange({ detail }: CustomEvent<DataListItem<SupportedLanguage>>) {
    selectedLanguage = detail;
    await loadTranslations(detail.value);
    setItem(LocalStorageItem.Language, detail.value);
    // TODO: find way to change language without reloading page
    window.location.reload();
  }
</script>

<Listbox value={selectedLanguage} on:change={handleLanguageChange} let:open class="relative">
  <!-- menu button -->
  <ListboxButton class="btn btn-secondary btn-fit space-x-2">
    {#if showCountryFlag}
      <div class={selectedLanguage.icon} />
    {/if}

    {#if showLanguage}
      <span class="hidden md:inline">{selectedLanguage.text}</span>
    {/if}
  </ListboxButton>

  <!-- menu items -->
  <Transition
    show={open}
    enter="transition duration-100 ease-out"
    enterFrom="transform scale-95 opacity-0"
    enterTo="transform scale-100 opacity-100"
    leave="transition duration-75 ease-out"
    leaveFrom="transform scale-100 opacity-100"
    leaveTo="transform scale-95 opacity-0">
    <ListboxOptions class="dropdown dropdown-bottom-left border-yellow-400">
      {#each languages as lang (lang.value)}
        <ListboxOption value={lang} let:active let:selected>
          <div
            class="dropdown-item whitespace-nowrap"
            class:dropdown-item-active={active}
            class:dropdown-item-selected={selected}>
            <div class={lang.icon} />
            <span class="ml-3 text-sm font-semibold">{lang.text}</span>
          </div>
        </ListboxOption>
      {/each}
    </ListboxOptions>
  </Transition>
</Listbox>
