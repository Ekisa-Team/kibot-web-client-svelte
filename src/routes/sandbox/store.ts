import { http } from '$lib/core/services/http';
import type { MessagePayload } from '$lib/models/message-payload';
import type { ResponseWrapper } from '$lib/models/response-wrapper';
import { writable } from 'svelte/store';

function createMessageStore() {
  const { subscribe, set, update } = writable<MessagePayload>();

  return {
    subscribe,
    set,
    update,

    async sendMessage(chatbotId: number, payload: MessagePayload): Promise<ResponseWrapper<MessagePayload>> {
      const API_URL = `https://localhost:5001/api/v1/chatbots/${chatbotId}/messages`;
      return http.post(API_URL, payload);
    }
  };
}

export const messageStore = createMessageStore();
