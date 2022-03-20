import { browser } from '$app/env';
import { getItem, LocalStorageItem, setItem } from '$utils/local-storage';
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
  if (browser && state.lastEventType === 'click') {
    setItem(LocalStorageItem.SidebarStatus, state);
  }
});
