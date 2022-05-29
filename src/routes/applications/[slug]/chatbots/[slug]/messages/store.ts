import type { MessagePayload } from '$lib/models/message-payload';
import type { ResponseWrapper } from '$lib/models/response-wrapper';
import { http } from '$lib/services/http';
import { writable } from 'svelte/store';

function createMessagesStore() {
  const { subscribe, set } = writable<MessagePayload>();

  return {
    subscribe,

    async sendMessage(chatbotId: number, payload: MessagePayload): Promise<ResponseWrapper<MessagePayload>> {
      const API_URL = `https://localhost:5001/api/v1/chatbots/${chatbotId}/messages`;
      const response = await http.post(API_URL, payload);
      set(response.data);
      return response;
    }
  };
}

export const messagesStore = createMessagesStore();
