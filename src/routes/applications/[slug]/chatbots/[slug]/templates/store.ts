import type { Template } from '$lib/models/app/template';
import { http } from '$lib/services/http';
import { writable } from 'svelte/store';

function createTemplatesStore() {
  const { subscribe, set } = writable<Template[]>([]);

  return {
    subscribe,

    fetch: async (chatbotId: number) => {
      const API_URL = `https://localhost:5001/api/v1/chatbots/${chatbotId}/templates`;
      const response = await http.get<Template[]>(API_URL);
      set(response.data);
    }
  };
}

export const templatesStore = createTemplatesStore();
