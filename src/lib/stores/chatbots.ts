import { browser } from '$app/env';
import type { Chatbot } from '$lib/models/app/chatbot';
import { chatbotsService } from '$lib/services/chatbots';
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

    fetchChatbots: async (applicationId: number) => {
      update((state) => ({ ...state, loading: true }));
      const response = await chatbotsService.getChatbots(applicationId);
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
