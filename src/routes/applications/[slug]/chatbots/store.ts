import type { Chatbot } from '$lib/models/app/chatbot';
import { http } from '$lib/services/http';
import { writable } from 'svelte/store';

function createChatbotsStore() {
  const { subscribe, set } = writable<Chatbot[]>([]);

  return {
    subscribe,

    fetch: async () => {
      const API_URL = 'https://localhost:5001/api/v1/client_applications/1/chatbots';
      const response = await http.get<Chatbot[]>(API_URL);
      set(response.data);
    }
  };
}

export const chatbotsStore = createChatbotsStore();
