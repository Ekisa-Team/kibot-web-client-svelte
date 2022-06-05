import { browser } from '$app/env';
import { http } from '$lib/core/services/http';
import type { Chatbot } from '$lib/models/app/chatbot';
import { getItem, LocalStorageItem, setItem } from '$lib/utils/local-storage';
import { writable } from 'svelte/store';

type ChatbotState = {
  chatbots: Chatbot[];
  selectedChatbot: Chatbot | null;
};

function createChatbotStore() {
  const { subscribe, set, update } = writable<ChatbotState>({
    chatbots: [],
    selectedChatbot: (browser && getItem(LocalStorageItem.SelectedChatbot)) || null
  });

  return {
    subscribe,
    set,
    update,

    fetch: async () => {
      const API_URL = 'https://localhost:5001/api/v1/client_applications/1/chatbots';
      const response = await http.get<Chatbot[]>(API_URL);
      update((state) => ({ ...state, chatbots: response.data }));
    },
    select(chatbot: Chatbot) {
      update((state) => ({ ...state, selectedChatbot: chatbot }));
      browser && setItem(LocalStorageItem.SelectedChatbot, chatbot);
    }
  };
}

export const chatbotStore = createChatbotStore();
