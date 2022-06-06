const layer = 'layout';

/** @type {import('unocss').UserShortcuts} */
export const layoutShortcuts = [
  [
    'ui-navbar',
    `
    bg-white/20 dark:bg-zinc-900/90 backdrop-blur-lg
    fixed inset-x-auto top-0
    border-b ui-border-base
    w-full px-2.5
    z-20
    flex flex-wrap items-center justify-between
    `,
    { layer }
  ],

  [
    'ui-sidebar',
    `
    bg-white/40 dark:bg-zinc-900/90 backdrop-blur-md
    border-r ui-border-base
    fixed md:relative top-0 left-0
    h-full
    z-10
    `,
    { layer }
  ],

  ['ui-menu', ``, { layer }],

  [
    'ui-menu-item',
    `
    flex items-center justify-between
    text-left font-default font-thin              
    rounded-lg
    min-w-[50px] px-2 py-[0.4rem] pl-[0.6rem]
    whitespace-nowrap
    hover:(bg-zinc-300 dark:bg-zinc-700)
    `,
    { layer }
  ],

  ['ui-footer', 'w-full container mx-auto flex-shrink-0 px-4 py-8'],

  [
    'ui-overlay',
    `
    bg-black/30 dark:bg-black/80 backdrop-blur-sm
    fixed h-full w-screen
    cursor-default
    z-50
    `,
    { layer }
  ]
];
