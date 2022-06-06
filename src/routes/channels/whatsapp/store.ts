import { http } from '$lib/core/services/http';
import type { Channel } from '$lib/models/app/channel';
import { writable } from 'svelte/store';

function createChannelsStore() {
  const { subscribe, set, update } = writable<Channel | null>(null);

  return {
    subscribe,
    set,
    update,

    fetchChannel: async (chatbotId: number) => {
      const API_URL = `https://localhost:5001/api/v1/chatbots/${chatbotId}/channels`;
      const response = await http.get<Channel>(API_URL);
      set(response?.data || null);
    },
    createChannel: async (chatbotId: number, channel: Channel) => {
      const API_URL = `https://localhost:5001/api/v1/chatbots/${chatbotId}/channels`;
      const response = await http.post<Channel>(API_URL, channel);
      set(response?.data || null);
      return response;
    },
    updateChannel: async (chatbotId: number, channelId: number, channel: Channel) => {
      const API_URL = `https://localhost:5001/api/v1/chatbots/${chatbotId}/channels/${channelId}`;
      return await http.put<Channel>(API_URL, channel);
    },
    deleteChannel: async (chatbotId: number, channelId: number) => {
      const API_URL = `https://localhost:5001/api/v1/chatbots/${chatbotId}/channels/${channelId}`;
      const response = await http.del<Channel>(API_URL);
      set(null);
      return response;
    }
  };
}

export const channelsStore = createChannelsStore();
