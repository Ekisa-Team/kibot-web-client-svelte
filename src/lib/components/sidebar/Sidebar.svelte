<script lang="ts">
  import { browser } from '$app/env';
  import { chatbotStore } from '$lib/stores/chatbot';
  import { clientApplicationStore } from '$lib/stores/client-application';
  import { t } from '$lib/translations';
  import type { Menu } from '$lib/types/menu';
  import Alert from '../Alert.svelte';
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
            path: '/channels/whatsapp',
            name: 'WhatsApp',
            icon: 'i-ph:whatsapp-logo-thin'
          },
          {
            path: '/channels/messenger',
            name: 'Messenger',
            icon: 'i-ph:messenger-logo-thin'
          },
          {
            path: '/channels/instagram',
            name: 'Instagram',
            icon: 'i-ph:instagram-logo-thin'
          }
        ]
      },
      {
        path: '/sandbox',
        name: 'Sandbox',
        icon: 'i-ph:codepen-logo-thin'
      },
      {
        path: '/templates',
        name: $t('layout.sidebar.templates'),
        icon: 'i-ph:stack-thin'
      },
      {
        name: 'Integrations',
        icon: 'i-ph:plugs-connected-thin',
        badge: { color: 'yellow', text: 'Alpha' },
        isDisclosed: false,
        children: [
          {
            path: '/integrations/quiron',
            name: 'Quiron',
            icon: 'i-ph:fire-duotone'
          },
          {
            path: '/integrations/tempus',
            name: 'Tempus',
            icon: 'i-ph:fire-duotone'
          }
        ]
      }
    ],
    [
      {
        path: '/documentation',
        name: $t('layout.sidebar.documentation'),
        icon: 'i-ph:scroll-thin'
      },
      {
        path: '/help',
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

<aside aria-label="Sidebar" class="ui-sidebar">
  <!-- overlay -->
  {#if $sidebarStore.isOpen}
    <button class="ui-overlay md:hidden" on:click={handleOverlayClick} />
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
    <div class="bottom-options">
      <span class="badge badge-yellow mb-6 inline-block whitespace-nowrap">
        Referencias
        <div class="i-ph:arrow-elbow-right-down" />
      </span>

      <div class="flex flex-col space-y-2">
        <Alert type="success">
          <div slot="icon" class="i-ph:terminal-window-duotone" />
          <span class="block max-w-[150px] truncate">{$clientApplicationStore.selectedClient?.name}</span>
        </Alert>
        <Alert type="warning">
          <div slot="icon" class="i-ph:robot-fill" />
          <span class="block max-w-[150px] truncate">{$chatbotStore?.selectedChatbot?.accessKey}</span>
        </Alert>
      </div>
    </div>
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

  .bottom-options {
    @apply mt-auto;
    @apply w-full;
    @apply relative;
    @apply overflow-hidden;
  }
</style>
