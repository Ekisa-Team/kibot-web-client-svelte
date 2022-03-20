<script lang="ts">
  import { browser } from '$app/env';
  import { loadTranslations } from '$lib/translations';
  import { getItem, LocalStorageItem, setItem } from '$lib/utils/local-storage';
  import { Menu, MenuButton, MenuItem, MenuItems } from '@rgossiaux/svelte-headlessui';

  const countryFlags: Record<'en' | 'es' | 'ja', string> = {
    en: 'i-emojione:flag-for-united-states',
    es: 'i-emojione:flag-for-colombia',
    ja: 'i-emojione:flag-for-japan'
  };

  let currentCountryFlag =
    countryFlags[(browser && getItem<'en' | 'es' | 'ja'>(LocalStorageItem.Language)) || 'en'];

  async function handleLangChange(lang: 'en' | 'es' | 'ja') {
    await loadTranslations(lang);
    setItem(LocalStorageItem.Language, lang);
    currentCountryFlag = countryFlags[lang];
    window.location.reload();
  }
</script>

<div class="flex h-full items-center justify-center">
  <Menu class="relative">
    <!-- menu button -->
    <MenuButton class="btn">
      <div class="{currentCountryFlag} text-xl" />
    </MenuButton>
    <!-- menu items -->
    <MenuItems class="dropdown dropdown-top-right">
      <MenuItem let:active>
        <button
          href="/account-settings"
          class="dropdown-item whitespace-nowrap"
          class:dropdown-item-active={active}
          on:click={() => handleLangChange('en')}>
          <div class="{countryFlags['en']} text-xl" />
          <span class="ml-1.5 text-sm">English (US)</span>
        </button>
      </MenuItem>
      <MenuItem let:active>
        <button
          href="/account-settings"
          class="dropdown-item whitespace-nowrap"
          class:dropdown-item-active={active}
          on:click={() => handleLangChange('es')}>
          <div class="{countryFlags['es']} text-xl" />
          <span class="ml-1.5 text-sm">Español</span>
        </button>
      </MenuItem>
      <MenuItem let:active>
        <button
          href="/account-settings"
          class="dropdown-item whitespace-nowrap"
          class:dropdown-item-active={active}
          on:click={() => handleLangChange('ja')}>
          <div class="{countryFlags['ja']} text-xl" />
          <span class="ml-1.5 text-sm">日本</span>
        </button>
      </MenuItem>
    </MenuItems>
  </Menu>
</div>
