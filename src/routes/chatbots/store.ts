import type { ClientApplication } from '$lib/models/app/client-application';
import { http } from '$lib/services/http';
import { writable } from 'svelte/store';

function createChatbotsStore() {
  const { subscribe, set } = writable<ClientApplication[]>([]);

  return {
    subscribe,

    fetch: async () => {
      const API_URL = 'https://localhost:5001/api/v1/client_applications/1/chatbots';
      const response = await http.get<ClientApplication[]>(API_URL);
      set(response.data);
    }
  };
}

export const chatbotStore = createChatbotsStore();
