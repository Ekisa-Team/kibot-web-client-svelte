import { http } from '$lib/core/services/http';
import type { Template } from '$lib/models/app/template';
import { writable } from 'svelte/store';

type TemplatesState = {
  data: Template[];
  loading: boolean;
};

function createTemplatesStore() {
  const { subscribe, set, update } = writable<TemplatesState>({ data: [], loading: false });

  return {
    subscribe,
    set,
    update,

    fetchTemplates: async (chatbotId: number) => {
      update((state) => ({ ...state, loading: true }));
      const API_URL = `https://kibot.azurewebsites.net/api/v1/chatbots/${chatbotId}/templates`;
      const response = await http.get<Template[]>(API_URL);
      set({ data: response?.data || [], loading: false });
      return response;
    }
  };
}

export const templatesStore = createTemplatesStore();
