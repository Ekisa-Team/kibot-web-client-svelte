<script lang="ts">
  import LangToggle from '$lib/components/LangToggle.svelte';
  import { sidebarState, type SidbarState } from '$lib/components/sidebar/store';
  import { t } from '$lib/translations';
  import type { Menu } from '../../types/menu';
  import SidebarItem from './SidebarItem.svelte';

  const itemsLists: Menu = [
    [
      {
        key: 1,
        path: 'channels',
        name: $t('layout.sidebar.channels'),
        icon: 'i-ph:line-segments-thin'
      },
      {
        key: 2,
        path: 'messages',
        name: $t('layout.sidebar.messages'),
        icon: 'i-ph:chat-centered-dots-thin'
      },
      {
        key: 3,
        path: 'templates',
        name: $t('layout.sidebar.templates'),
        icon: 'i-ph:stack-thin'
      }
    ],
    [
      {
        key: 4,
        path: 'documentation',
        name: $t('layout.sidebar.documentation'),
        icon: 'i-ph:scroll-thin'
      },
      {
        key: 5,
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

  const handleOverlayClick = () => {
    sidebarState.update(() => ({
      lastEventType: 'click',
      isOpen: false
    }));
  };
</script>

<aside
  aria-label="Sidebar"
  class:click-mode={currentState.lastEventType === 'click'}
  class:hover-mode={currentState.lastEventType === 'hover'}
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}>
  <!-- overlay -->
  {#if currentState.isOpen}
    <button class="overlay" on:click={handleOverlayClick} />
  {/if}

  <!-- wrapper -->
  <div class="wrapper">
    <!-- nav -->
    <nav class="overflow-y-auto overflow-x-hidden rounded py-4 px-3">
      <!-- list -->
      {#each itemsLists as list, i}
        <ul class:with-separator={i > 0} class="space-y-1">
          <!-- option -->
          {#each list as item}
            <SidebarItem item={item} showName={true} />
          {/each}
        </ul>
      {/each}
    </nav>

    <!-- bottom options -->
    <div class="bottom-options">
      <LangToggle showLanguage={currentState.isOpen} />
    </div>
  </div>
</aside>

<style lang="postcss">
  :global(html.sidebar-collapsed) {
    --size-sidebar-width: 16rem;
  }

  :global(html.sidebar-opened) {
    --size-sidebar-width: 16rem;
  }

  aside {
    grid-area: sidebar;
    transition: width 100ms ease-out, transform 100ms ease-in;
    @apply fixed;
    @apply bg-sidebar;
    @apply border-r border-accent;
    @apply z-10;
    @apply left-0;
    @apply top-0;
    @apply h-full;
  }

  :global(.sidebar-collapsed) aside {
    transform: translateX(calc(var(--size-sidebar-width) * -1 - 7px));
  }

  :global(.sidebar-opened) aside {
    transform: translateX(0);
  }

  @media only screen and (min-width: theme('screens.md')) {
    :global(html.sidebar-collapsed) {
      --size-sidebar-width: 4rem;
    }

    aside {
      width: var(--size-sidebar-width);
      @apply relative;
      transform: translateX(0) !important;
    }
  }

  aside.click-mode {
    transition-delay: 0ms;
  }

  aside.hover-mode {
    transition-delay: 300ms;
  }

  .overlay {
    @apply bg-black bg-opacity-20 backdrop-blur-sm;
    @apply cursor-default;
    @apply fixed;
    @apply h-full w-screen;
    @apply z-50;
    left: calc(var(--size-sidebar-width) + 7px);
  }

  @media only screen and (min-width: theme('screens.md')) {
    .overlay {
      @apply hidden;
    }
  }

  .wrapper {
    @apply sticky;
    top: var(--size-navbar-height);
    height: calc(100vh - var(--size-navbar-height));
  }

  ul.with-separator {
    @apply mt-4 pt-4;
    @apply border-t border-accent;
  }

  .bottom-options {
    @apply absolute bottom-0;
    @apply flex w-full items-center justify-center;
    @apply py-4;
  }
</style>
