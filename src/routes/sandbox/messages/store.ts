import type { MessagePayload } from '$lib/models/message-payload';
import { writable } from 'svelte/store';
import { messagesService } from './service';

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
      return messagesService.sendMessage(chatbotId, payload);
    }
  };
}

export const messagesStore = createMessagesStore();
