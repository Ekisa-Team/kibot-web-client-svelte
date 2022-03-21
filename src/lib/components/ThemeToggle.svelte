<script lang="ts">
  import { Theme } from '$lib/enums/theme';
  import { appTheme } from '$lib/stores/app-theme';
  import { t } from '$lib/translations';
  import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@rgossiaux/svelte-headlessui';

  const handleThemeChange = (theme: import('$lib/enums/theme').Theme) => {
    appTheme.update(() => theme);
  };
</script>

<Menu let:open class="relative">
  <!-- menu button -->
  <MenuButton class="btn btn-default">
    <div class="i-carbon:screen text-xl" />
  </MenuButton>

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
    <MenuItems class="dropdown dropdown-bottom-left w-40">
      <MenuItem let:active>
        <button
          href="/account-settings"
          class="dropdown-item whitespace-nowrap"
          class:dropdown-item-active={active}
          on:click={() => handleThemeChange(Theme.Light)}>
          <div class="i-carbon:light text-xl" />
          <span class="ml-3 text-sm font-semibold">{$t('layout.navbar.themePicker.light')}</span>
        </button>
      </MenuItem>
      <MenuItem let:active>
        <button
          href="/account-settings"
          class="dropdown-item whitespace-nowrap"
          class:dropdown-item-active={active}
          on:click={() => handleThemeChange(Theme.Dark)}>
          <div class="i-carbon:moon text-xl" />
          <span class="ml-3 text-sm font-semibold">{$t('layout.navbar.themePicker.dark')}</span>
        </button>
      </MenuItem>
      <MenuItem let:active>
        <button
          href="/account-settings"
          class="dropdown-item whitespace-nowrap"
          class:dropdown-item-active={active}
          on:click={() => handleThemeChange(Theme.System)}>
          <div class="i-carbon:screen text-xl" />
          <span class="ml-3 text-sm font-semibold">{$t('layout.navbar.themePicker.system')}</span>
        </button>
      </MenuItem>
    </MenuItems>
  </Transition>
</Menu>
