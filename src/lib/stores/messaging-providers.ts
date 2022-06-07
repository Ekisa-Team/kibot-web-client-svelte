import { http } from '$lib/core/services/http';
import type { MessagingProvider } from '$lib/models/app/messaging-provider';
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
      const API_URL = 'https://kibot.azurewebsites.net/api/v1/messaging_providers';
      const response = await http.get<MessagingProvider[]>(API_URL);
      update((state) => ({ ...state, loading: false, data: response?.data || [] }));
    }
  };
}

export const messagingProvidersStore = createMessagingProvidersStore();
