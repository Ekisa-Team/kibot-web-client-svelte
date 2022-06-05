<script lang="ts">
  import { browser } from '$app/env';
  import { t } from '$lib/translations';
  import type { Menu } from '$lib/types/menu';
  import SidebarMenu from './SidebarMenu.svelte';
  import { sidebarStore } from './store';

  const menus: Array<Menu> = [
    [
      {
        name: $t('layout.sidebar.channels'),
        icon: 'i-ph:line-segments-thin',
        isDisclosed: false,
        children: [
          {
            path: 'whatsapp',
            name: 'WhatsApp',
            icon: 'i-ph:whatsapp-logo-thin'
          },
          {
            path: 'messenger',
            name: 'Messenger',
            icon: 'i-ph:messenger-logo-thin'
          },
          {
            path: 'instagram',
            name: 'Instagram',
            icon: 'i-ph:instagram-logo-thin'
          }
        ]
      },
      {
        path: 'sandbox',
        name: 'Sandbox',
        icon: 'i-ph:cube-thin'
      },
      {
        path: 'templates',
        name: $t('layout.sidebar.templates'),
        icon: 'i-ph:stack-thin'
      },
      {
        name: 'Integrations',
        icon: 'i-ph:plugs-connected-thin',
        isDisclosed: false,
        children: [
          {
            path: 'quiron',
            name: 'Quiron',
            icon: 'i-ph:fire-duotone'
          },
          {
            path: 'tempus',
            name: 'Tempus',
            icon: 'i-ph:fire-duotone'
          }
        ]
      }
    ],
    [
      {
        path: 'documentation',
        name: $t('layout.sidebar.documentation'),
        icon: 'i-ph:scroll-thin'
      },
      {
        path: 'help',
        name: $t('layout.sidebar.help'),
        icon: 'i-ph:lifebuoy-thin'
      }
    ]
  ];

  sidebarStore.update((state) => ({ ...state, menus }));

  sidebarStore.subscribe((state) => {
    if (!browser) return;

    const root = document.documentElement;

    root.classList.remove('sidebar-collapsed');
    root.classList.remove('sidebar-opened');

    if (state.isOpen) {
      root.classList.add('sidebar-opened');
    } else {
      root.classList.add('sidebar-collapsed');
    }
  });

  const handleOverlayClick = () => {
    sidebarStore.update((state) => ({ ...state, isOpen: false }));
  };
</script>

<aside aria-label="Sidebar">
  <!-- overlay -->
  {#if $sidebarStore.isOpen}
    <button class="overlay" on:click={handleOverlayClick} />
  {/if}

  <!-- wrapper -->
  <div class="wrapper">
    <!-- nav -->
    <nav>
      <!-- menus -->
      {#each $sidebarStore.menus as menu, index}
        <SidebarMenu menu={menu} showSeparator={index > 0} />
      {/each}
    </nav>

    <!-- bottom options -->
    <div class="bottom-options" />
  </div>
</aside>

<style lang="postcss">
  :global(html.sidebar-collapsed) aside {
    --size-sidebar-width: 0;
    transition: width 100ms ease;
  }

  :global(html.sidebar-opened) aside {
    --size-sidebar-width: 16rem;
    transition: width 100ms ease;
  }

  aside {
    @apply bg-sidebar;
    @apply border-r border-accent;
    @apply fixed md:relative;
    @apply h-full;
    @apply top-0 left-0;
    @apply z-10;
    grid-area: sidebar;
    width: var(--size-sidebar-width);
    will-change: width;
  }

  .wrapper {
    @apply overflow-y-auto overflow-x-hidden;
    @apply rounded;
    @apply py-4 px-3;
    @apply sticky;
    @apply flex flex-col;
    top: var(--size-navbar-height);
    height: calc(100vh - var(--size-navbar-height));
  }

  nav {
    @apply overflow-x-hidden;
  }

  .overlay {
    @apply bg-black/30 backdrop-blur-sm dark:bg-black/80;
    @apply cursor-default;
    @apply fixed md:hidden;
    @apply h-full w-screen;
    @apply z-50;
    left: var(--size-sidebar-width);
  }

  .bottom-options {
    @apply flex items-center justify-center;
    @apply mt-auto;
    @apply w-full;
  }
</style>
