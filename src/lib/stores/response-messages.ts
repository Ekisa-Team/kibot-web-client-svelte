import type { ResponseMessage } from '$lib/models/app/response-message';
import type { ReplyToken } from '$lib/models/reply-token';
import { responseMessagesService } from '$lib/services/response-messages';
import { writable } from 'svelte/store';

type ResponseMessagesState = {
  responseMessages: ResponseMessage[];
  detectedIntention: ResponseMessage | undefined;
  loading: boolean;
};

function createResponseMessagesStore() {
  const { subscribe, set, update } = writable<ResponseMessagesState>({
    responseMessages: [],
    detectedIntention: undefined,
    loading: false
  });

  return {
    subscribe,
    set,
    update,

    fetchResponseMessages: async (chatbotId: number) => {
      update((state) => ({ ...state, loading: true }));
      const response = await responseMessagesService.getResponseMessage(chatbotId);
      update((state) => ({ ...state, loading: false, responseMessages: response?.data || [] }));
    },
    detectIntention: async <T>(chatbotId: number, intention: ReplyToken<T>) => {
      update((state) => ({ ...state, loading: true }));
      const response = await responseMessagesService.detectIntention(chatbotId, intention);
      update((state) => ({ ...state, loading: false, detectedIntention: response?.data }));
    },
    createResponseMessage: async (chatbotId: number, body: ResponseMessage) => {
      update((state) => ({ ...state, loading: true }));
      const response = await responseMessagesService.createResponseMessage(chatbotId, body);
      update((state) => ({ ...state, loading: false }));
      return response;
    },
    updateResponseMessage: async (chatbotId: number, responseMessageId: number, body: ResponseMessage) => {
      update((state) => ({ ...state, loading: true }));
      const response = await responseMessagesService.updateResponseMessage(chatbotId, responseMessageId, body);
      update((state) => ({ ...state, loading: false }));
      return response;
    },
    deleteResponseMessage: async (chatbotId: number, responseMessageId: number) => {
      update((state) => ({ ...state, loading: true }));
      const response = await responseMessagesService.deleteResponseMessage(chatbotId, responseMessageId);
      update((state) => ({ ...state, loading: false }));
      return response;
    }
  };
}

export const responseMessagesStore = createResponseMessagesStore();
