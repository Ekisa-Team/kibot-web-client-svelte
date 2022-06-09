import type { MessagingProvider } from '$lib/models/app/messaging-provider';
import { messagingProvidersService } from '$lib/services/messaging-providers';
import { writable } from 'svelte/store';

type MessagingProvidersState = {
  data: MessagingProvider[];
  loading: boolean;
};

function createMessagingProvidersStore() {
  const { subscribe, set, update } = writable<MessagingProvidersState>({ data: [], loading: false });

  return {
    subscribe,
    set,
    update,

    fetchMessagingProviders: async () => {
      update((state) => ({ ...state, loading: true }));
      const response = await messagingProvidersService.getMessagingProviders();
      update((state) => ({ ...state, loading: false, data: response?.data || [] }));
    }
  };
}

export const messagingProvidersStore = createMessagingProvidersStore();
