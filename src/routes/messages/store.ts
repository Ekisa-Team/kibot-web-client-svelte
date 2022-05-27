import type { ClientApplication } from '$lib/models/app/client-application';
import { writable } from 'svelte/store';

function createMessagesStore() {
  const { subscribe, set } = writable<ClientApplication[]>([]);

  return {
    subscribe
  };
}

export const messagesStore = createMessagesStore();
