import { http } from '$lib/core/services/http';
import type { Channel } from '$lib/models/app/channel';
import type { ResponseWrapper } from '$lib/models/response-wrapper';
import { writable } from 'svelte/store';

function createChannelsStore() {
  const { subscribe, set } = writable<Channel>();

  return {
    subscribe,

    fetch: async (chatbotId: number) => {
      const API_URL = `https://localhost:5001/api/v1/chatbots/${chatbotId}/channels`;
      const response = await http.get<Channel>(API_URL);
      set(response.data);
    },
    create: async (chatbotId: number, channel: Channel): Promise<ResponseWrapper<Channel>> => {
      const API_URL = `https://localhost:5001/api/v1/chatbots/${chatbotId}/channels`;
      return await http.post<Channel>(API_URL, channel);
    },
    update: async (
      chatbotId: number,
      channelId: number,
      channel: Channel
    ): Promise<ResponseWrapper<Channel>> => {
      const API_URL = `https://localhost:5001/api/v1/chatbots/${chatbotId}/channels/${channelId}`;
      return await http.put<Channel>(API_URL, channel);
    },
    delete: async (chatbotId: number, channelId: number): Promise<ResponseWrapper<Channel>> => {
      const API_URL = `https://localhost:5001/api/v1/chatbots/${chatbotId}/channels/${channelId}`;
      return await http.del<Channel>(API_URL);
    }
  };
}

export const channelsStore = createChannelsStore();
