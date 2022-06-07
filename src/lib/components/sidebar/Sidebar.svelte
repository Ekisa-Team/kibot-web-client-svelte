<script lang="ts">
  import { browser } from '$app/env';
  import { t } from '$lib/translations';
  import type { Menu } from '$lib/types/menu';
  import SidebarBottom from './SidebarBottom.svelte';
  import SidebarMenu from './SidebarMenu.svelte';
  import { sidebarStore } from './store';

  const menus: Array<Menu> = [
    [
      {
        type: 'group',
        name: $t('layout.sidebar.channels'),
        icon: 'icon-ph:line-segments-thin',
        isDisclosed: false,
        children: [
          {
            type: 'link',
            path: '/channels/whatsapp',
            name: 'WhatsApp',
            icon: 'icon-ph:whatsapp-logo-duotone'
          },
          {
            type: 'link',
            path: '/channels/messenger',
            name: 'Messenger',
            icon: 'icon-ph:messenger-logo-duotone',
            badge: { color: 'yellow', text: 'WIP' }
          },
          {
            type: 'link',
            path: '/channels/instagram',
            name: 'Instagram',
            icon: 'icon-ph:instagram-logo-duotone',
            badge: { color: 'yellow', text: 'WIP' }
          }
        ]
      },
      {
        type: 'group',
        name: 'Sandbox',
        icon: 'icon-ph:codepen-logo-thin',
        badge: { color: 'yellow', text: 'Beta' },
        children: [
          {
            type: 'link',
            path: '/sandbox/messages',
            name: 'Messages',
            icon: 'icon-ph:chat-circle-dots-duotone'
          },
          {
            type: 'link',
            path: '/sandbox/templates',
            name: $t('layout.sidebar.templates'),
            icon: 'icon-ph:stack-duotone'
          }
        ]
      },
      {
        type: 'group',
        name: 'Integrations',
        icon: 'icon-ph:plugs-connected-thin',
        badge: { color: 'yellow', text: 'Alpha' },
        isDisclosed: false,
        children: [
          {
            type: 'link',
            path: '/integrations/quiron',
            name: 'Quiron',
            icon: 'icon-ph:fire-duotone'
          },
          {
            type: 'link',
            path: '/integrations/tempus',
            name: 'Tempus',
            icon: 'icon-ph:fire-duotone',
            badge: { color: 'yellow', text: 'WIP' }
          }
        ]
      }
    ],
    [
      {
        type: 'link',
        path: '/documentation',
        name: $t('layout.sidebar.documentation'),
        icon: 'icon-ph:scroll-thin'
      },
      {
        type: 'link',
        path: '/help',
        name: $t('layout.sidebar.help'),
        icon: 'icon-ph:lifebuoy-thin'
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

<aside aria-label="Sidebar" class="ui-sidebar">
  <!-- overlay -->
  {#if $sidebarStore.isOpen}
    <button class="ui-overlay md:hidden" on:click={handleOverlayClick} />
  {/if}

  <!-- wrapper -->
  <div class="wrapper">
    <!-- menu -->
    <nav>
      {#each $sidebarStore.menus as menu, index}
        <SidebarMenu menu={menu} hasSeparator={index > 0} />
      {/each}
    </nav>

    <!-- bottom options -->
    <SidebarBottom />
  </div>
</aside>

<style lang="postcss">
  :global(html.sidebar-collapsed) aside {
    --size-sidebar-width: 0;
    transition: width 300ms ease;
  }

  :global(html.sidebar-opened) aside {
    --size-sidebar-width: 17rem;
    transition: width 300ms ease;
  }

  aside {
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

  .ui-overlay {
    left: var(--size-sidebar-width);
  }
</style>
