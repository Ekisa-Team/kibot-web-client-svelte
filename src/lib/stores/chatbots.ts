import { browser } from '$app/env';
import { http } from '$lib/core/services/http';
import type { Chatbot } from '$lib/models/app/chatbot';
import { getItem, LocalStorageItem, setItem } from '$lib/utils/local-storage';
import { writable } from 'svelte/store';

type ChatbotsState = {
  chatbots: Chatbot[];
  selectedChatbot: Chatbot | null;
  loading: boolean;
};

function createChatbotsStore() {
  const { subscribe, set, update } = writable<ChatbotsState>({
    chatbots: [],
    selectedChatbot: (browser && getItem(LocalStorageItem.SelectedChatbot)) || null,
    loading: false
  });

  return {
    subscribe,
    set,
    update,

    fetchChatbots: async () => {
      update((state) => ({ ...state, loading: true }));
      const API_URL = 'https://kibot.azurewebsites.net/api/v1/client_applications/1/chatbots';
      const response = await http.get<Chatbot[]>(API_URL);
      update((state) => ({
        ...state,
        loading: false,
        chatbots: response?.data || []
      }));
    },
    selectChatbot(chatbot: Chatbot) {
      if (browser) {
        update((state) => ({ ...state, selectedChatbot: chatbot }));
        setItem(LocalStorageItem.SelectedChatbot, chatbot);
      }
    }
  };
}

export const chatbotsStore = createChatbotsStore();
