import type { Menu } from '$lib/types/menu';
import { writable } from 'svelte/store';

export type SidbarState = {
  menus: Array<Menu>;
  isOpen: boolean;
};

function createSidebarStore() {
  const { subscribe, set, update } = writable<SidbarState>({
    isOpen: true,
    menus: []
  });

  return {
    subscribe,
    set,
    update
  };
}

export const sidebarStore = createSidebarStore();
