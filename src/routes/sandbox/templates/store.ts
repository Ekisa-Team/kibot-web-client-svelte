import type { Template, TemplatePayload } from '$lib/models/app/template';
import { writable } from 'svelte/store';
import { templatesService } from './service';

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
      const response = await templatesService.fetchTemplates(chatbotId);
      set({ data: response?.data || [], loading: false });
      return response;
    },
    sendTemplate: async (chatbotId: number, templateId: number, payload: TemplatePayload) => {
      update((state) => ({ ...state, loading: true }));
      const response = await templatesService.sendTemplate(chatbotId, templateId, payload);
      update((state) => ({ ...state, loading: false }));
      return response;
    }
  };
}

export const templatesStore = createTemplatesStore();
