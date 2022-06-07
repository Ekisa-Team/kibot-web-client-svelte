import { http } from '$lib/core/services/http';
import type { MessagingProvider } from '$lib/models/app/messaging-provider';
import { writable } from 'svelte/store';

function createMessagingProviderStore() {
  const { subscribe, set } = writable<MessagingProvider[]>([]);

  return {
    subscribe,

    fetch: async () => {
      const API_URL = 'https://kibot.azurewebsites.net/api/v1/messaging_providers';
      const response = await http.get<MessagingProvider[]>(API_URL);
      set(response.data);
    }
  };
}

export const messagingProviderStore = createMessagingProviderStore();
