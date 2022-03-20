<script lang="ts">
  import { t } from '$lib/translations';
  import { sidebarState, type SidbarState } from '$stores/sidebar';
  import SidebarBottom from './SidebarBottom.svelte';
  import SidebarOption from './SidebarOption.svelte';

  type SidebarItem = {
    key: number;
    path: string;
    name: string;
    icon: string;
  };

  const itemsLists: SidebarItem[][] = [
    [
      {
        key: 1,
        path: 'messaging-providers',
        name: $t('layout.sidebar.messagingProviders'),
        icon: 'i-ph:plugs-connected-thin'
      },
      {
        key: 2,
        path: 'applications',
        name: $t('layout.sidebar.applications'),
        icon: 'i-ph:terminal-window-thin'
      },
      {
        key: 3,
        path: 'chatbots',
        name: $t('layout.sidebar.chatbots'),
        icon: 'i-ph:robot-thin'
      },
      {
        key: 4,
        path: 'messages',
        name: $t('layout.sidebar.messages'),
        icon: 'i-ph:chat-centered-dots-thin'
      },
      {
        key: 5,
        path: 'templates',
        name: $t('layout.sidebar.templates'),
        icon: 'i-ph:stack-thin'
      },
      {
        key: 6,
        path: 'channels',
        name: $t('layout.sidebar.channels'),
        icon: 'i-ph:line-segments-thin'
      },
      {
        key: 7,
        path: 'webhooks',
        name: $t('layout.sidebar.webhooks'),
        icon: 'i-ph:anchor-thin'
      }
    ],
    [
      {
        key: 8,
        path: 'documentation',
        name: $t('layout.sidebar.documentation'),
        icon: 'i-ph:scroll-thin'
      },
      {
        key: 9,
        path: 'help',
        name: $t('layout.sidebar.help'),
        icon: 'i-ph:lifebuoy-thin'
      }
    ]
  ];

  let currentState: SidbarState;

  sidebarState.subscribe((state) => {
    currentState = state;
  });

  const handleMouseEnter = () => {
    if (currentState.isOpen) return;

    sidebarState.update(() => ({
      lastEventType: 'hover',
      isOpen: true
    }));
  };

  const handleMouseLeave = () => {
    if (currentState.lastEventType === 'click') return;

    sidebarState.update(() => ({
      lastEventType: 'hover',
      isOpen: false
    }));
  };
</script>

<aside
  class:open={currentState.isOpen}
  class:click-mode={currentState.lastEventType === 'click'}
  class:hover-mode={currentState.lastEventType === 'hover'}
  aria-label="Sidebar"
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}>
  <!-- wrapper -->
  <nav class="overflow-y-auto overflow-x-hidden rounded py-4 px-3">
    <!-- list -->
    {#each itemsLists as list, i}
      <ul class:with-separator={i > 0}>
        <!-- option -->
        {#each list as item}
          <SidebarOption item={item} showName={currentState.isOpen} />
        {/each}
      </ul>
    {/each}
  </nav>

  <SidebarBottom />
</aside>

<style lang="postcss">
  aside {
    @apply bg-white;
    @apply border-r border-gray-200;
    @apply fixed top-0 left-0;
    @apply pt-16;
    @apply h-full w-full;
    @apply z-20;
    @apply max-w-[4.1rem];
    transition: max-width 50ms ease-in;
  }

  aside.click-mode {
    transition-delay: 0ms;
  }

  aside.hover-mode {
    transition-delay: 0ms;
  }

  aside.open {
    @apply max-w-[16rem];
    transition: max-width 300ms ease-out;
  }

  ul.with-separator {
    @apply mt-4 pt-4;
    @apply border-t border-gray-200;
  }
</style>
