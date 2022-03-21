<script lang="ts">
  import { loadTranslations, locale } from '$lib/translations';
  import type { Datalist } from '$lib/types/datalist';
  import type { SupportedLanguage } from '$lib/types/supported-language';
  import { LocalStorageItem, setItem } from '$lib/utils/local-storage';
  import {
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions
  } from '@rgossiaux/svelte-headlessui';

  const languages: Datalist<SupportedLanguage>[] = [
    {
      value: 'en',
      text: 'English (US)',
      icon: 'i-emojione:flag-for-united-states text-xl'
    },
    {
      value: 'es',
      text: 'Español (CO)',
      icon: 'i-emojione:flag-for-colombia text-xl'
    },
    {
      value: 'fr',
      text: 'Français',
      icon: 'i-emojione:flag-for-france text-xl'
    },
    {
      value: 'ja',
      text: '日本',
      icon: 'i-emojione:flag-for-japan text-xl'
    }
  ];

  let selectedLanguage: Datalist<SupportedLanguage> =
    languages.find((l) => l.value === locale.get()) || languages[0];

  async function handleLanguageChange({ detail }: CustomEvent<Datalist<SupportedLanguage>>) {
    selectedLanguage = detail;
    await loadTranslations(detail.value);
    setItem(LocalStorageItem.Language, detail.value);
    // TODO: find way to change language without reloading page
    window.location.reload();
  }
</script>

<Listbox value={selectedLanguage} on:change={handleLanguageChange} let:open class="relative">
  <!-- menu button -->
  <ListboxButton class="btn btn-default">
    <div class={selectedLanguage.icon} />
    <span class="ml-2">{selectedLanguage.text}</span>
  </ListboxButton>

  <!-- menu items -->
  <ListboxOptions class="dropdown dropdown-top-right">
    {#each languages as lang}
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
</Listbox>
