import type { MessagingProvider } from '$lib/models/app/messaging-provider';
import { http } from '$lib/services/http';
import { writable } from 'svelte/store';

function createMessagingProvidersStore() {
  const { subscribe, set } = writable<MessagingProvider[]>([]);

  return {
    subscribe,

    fetch: async () => {
      const API_URL = 'https://localhost:5001/api/v1/messaging_providers';
      const response = await http.get<MessagingProvider[]>(API_URL);
      set(response.data);
    }
  };
}

export const messagingProvidersStore = createMessagingProvidersStore();
