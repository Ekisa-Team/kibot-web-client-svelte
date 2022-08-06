import { browser } from '$app/env';
import type { Chatbot } from '$lib/models/app/chatbot';
import { chatbotsService } from '$lib/services/chatbots';
import { getItem, LocalStorageItem, removeItem, setItem } from '$lib/utils/local-storage';
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

    createChatbot: async (applicationId: number, chatbot: Chatbot) => {
      update((state) => ({ ...state, loading: true }));
      await chatbotsService.createChatbot(applicationId, chatbot);
      update((state) => ({ ...state, loading: false }));
    },
    deleteChatbot: async (applicationId: number, chatbotId: number) => {
      update((state) => ({ ...state, loading: true }));
      await chatbotsService.deleteChatbot(applicationId, chatbotId);
      update((state) => ({ ...state, loading: false }));
    },
    fetchChatbots: async (applicationId: number) => {
      update((state) => ({ ...state, loading: true }));
      const response = await chatbotsService.getChatbots(applicationId);
      update((state) => ({
        ...state,
        loading: false,
        chatbots: response?.data || []
      }));
    },
    selectChatbot(chatbot: Chatbot | null) {
      if (browser) {
        update((state) => ({ ...state, selectedChatbot: chatbot }));
        chatbot ? setItem(LocalStorageItem.SelectedChatbot, chatbot) : removeItem(LocalStorageItem.SelectedChatbot);
      }
    }
  };
}

export const chatbotsStore = createChatbotsStore();
