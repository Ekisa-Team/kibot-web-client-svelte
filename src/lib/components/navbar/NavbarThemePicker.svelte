<script>
  import { t } from '$lib/translations';
  import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@rgossiaux/svelte-headlessui';

  const handleThemeChange = () => {};
</script>

<Menu let:open class="relative">
  <!-- menu button -->
  <MenuButton class="btn">
    <div class="i-ph:alien-duotone text-xl" />
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
    <MenuItems class="dropdown dropdown-bottom-left">
      <MenuItem let:active>
        <button
          href="/account-settings"
          class="dropdown-item whitespace-nowrap"
          class:dropdown-item-active={active}
          on:click={() => handleThemeChange()}>
          <div class="i-ph:alien-duotone text-xl" />
          <span class="ml-1.5 text-sm">{$t('layout.navbar.themePicker.system')}</span>
        </button>
      </MenuItem>
      <MenuItem let:active>
        <button
          href="/account-settings"
          class="dropdown-item whitespace-nowrap"
          class:dropdown-item-active={active}
          on:click={() => handleThemeChange()}>
          <div class="i-ph:sun-dim-duotone text-xl" />
          <span class="ml-1.5 text-sm">{$t('layout.navbar.themePicker.light')}</span>
        </button>
      </MenuItem>
      <MenuItem let:active>
        <button
          href="/account-settings"
          class="dropdown-item whitespace-nowrap"
          class:dropdown-item-active={active}
          on:click={() => handleThemeChange()}>
          <div class="i-ph:cloud-moon-duotone text-xl" />
          <span class="ml-1.5 text-sm">{$t('layout.navbar.themePicker.dark')}</span>
        </button>
      </MenuItem>
    </MenuItems>
  </Transition>
</Menu>
