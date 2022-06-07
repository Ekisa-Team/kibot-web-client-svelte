const layer = 'components';

/** @type {import('unocss').UserShortcuts} */
export const componentsShortcuts = [
  // button
  [
    'btn',
    `
    w-full md:w-auto
    border border-transparent rounded-lg outline-none               
    h-10 min-w-[80px] py-2 px-3
    relative inline-flex items-center justify-center               
    text-sm text-center font-medium leading-none    
    select-none cursor-pointer 
    disabled:(opacity-80 cursor-not-allowed)
    hover:(bg-opacity-80):not(:disabled)
    focus:(ring-2 ring-gray-400 ring-offset-2 dark:ring-zinc-700):not(:disabled)
    `,
    { layer }
  ],
  ['btn-lg', 'h-12 text-base', { layer }],
  ['btn-xl', 'h-12 text-base', { layer }],
  ['btn-fit', 'min-w-fit', { layer }],
  ['btn-secondary', 'bg-zinc-200 text-zinc-900 dark:(bg-zinc-700 text-white)', { layer }],
  [/^btn-(.*)$/, ([, c]) => `bg-${c}-500 text-white`, { layer }],

  // form
  ['form', 'bg-white dark:bg-zinc-800 py-8 px-4 shadow rounded-xl', { layer }],
  ['form-group', 'grid gap-x-12 gap-y-4', { layer }],
  [/^form-cols-(.*)$/, ([, c]) => `grid-cols-1 md:grid-cols-${c}`, { layer }],

  // field
  [
    'field',
    `
    w-full block h-9 py-2 px-3
    bg-zinc-100 dark:bg-zinc-700
    leading-tight            
    border-transparent rounded shadow outline-none
    focus:(ring-2 ring-blue-500)
    `,
    { layer }
  ],

  // dropdown
  [
    'dropdown',
    `
    absolute
    bg-white dark:bg-zinc-800
    overflow-hidden
    py-1.5
    ring-1 ring-black dark:ring-zinc-700 ring-opacity-5
    rounded-xl shadow-2xl
    z-10
    focus:outline-none              
    `,
    { layer }
  ],
  ['dropdown-item', 'w-full flex items-center px-3 py-2 cursor-pointer', { layer }],
  ['dropdown-item-active', 'bg-zinc-100 dark:bg-zinc-700', { layer }],
  ['dropdown-item-selected', 'text-blue-500', { layer }],

  // switch
  ['switch', 'relative flex items-center rounded-full h-7 w-12', { layer }],
  ['switch-checked', 'bg-blue-500', { layer }],
  ['switch-unchecked', 'bg-zinc-300 dark:bg-zinc-500', { layer }],
  [
    'toggle',
    'absolute inline-block h-5 w-5 border border-zinc-200 shadow-md bg-white rounded-full transition-transform duration-200 ease-in-out',
    { layer }
  ],
  ['toggle-off', 'transform translate-x-[20%] shadow-zinc-400 dark:shadow-zinc-900', { layer }],
  ['toggle-on', 'transform translate-x-[120%] shadow-blue-900', { layer }],

  // badge
  ['badge', 'px-2 py-[0.15rem] text-xs font-semibold rounded', { layer }],
  [/^badge-(.*)$/, ([, c]) => `bg-${c}-100 text-${c}-800 dark:(bg-${c}-200 text-${c}-900)`, { layer }]
];
