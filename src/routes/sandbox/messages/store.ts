import { http } from '$lib/core/services/http';
import type { MessagePayload } from '$lib/models/message-payload';
import { writable } from 'svelte/store';

type MessagesState = {
  loading: boolean;
};

function createMessagesStore() {
  const { subscribe, set, update } = writable<MessagesState>({ loading: false });

  return {
    subscribe,
    set,
    update,

    async sendMessage(chatbotId: number, payload: MessagePayload) {
      const API_URL = `https://kibot.azurewebsites.net/api/v1/chatbots/${chatbotId}/messages`;
      return http.post(API_URL, payload);
    }
  };
}

export const messagesStore = createMessagesStore();
