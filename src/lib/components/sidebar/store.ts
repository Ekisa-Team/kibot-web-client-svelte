import { browser } from '$app/env';
import { getItem, LocalStorageItem, setItem } from '$lib/utils/local-storage';
import { writable } from 'svelte/store';

export type SidbarState = {
  lastEventType: 'click' | 'hover';
  isOpen: boolean;
};

const defaultValue: SidbarState = {
  lastEventType: 'click',
  isOpen: true
};

const initialValue: SidbarState = browser
  ? getItem<SidbarState>(LocalStorageItem.SidebarStatus) ?? defaultValue
  : defaultValue;

export const sidebarState = writable<SidbarState>(initialValue);

sidebarState.subscribe((state) => {
  if (!browser) return;

  const element = document.documentElement;

  element.classList.remove('sidebar-collapsed');
  element.classList.remove('sidebar-opened');

  if (state.isOpen) {
    element.classList.add('sidebar-opened');
  } else {
    element.classList.add('sidebar-collapsed');
  }

  if (state.lastEventType === 'click') {
    setItem(LocalStorageItem.SidebarStatus, state);
  }
});
