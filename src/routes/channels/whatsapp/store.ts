import { http } from '$lib/core/services/http';
import type { Channel } from '$lib/models/app/channel';
import { writable } from 'svelte/store';

type ChannelState = {
  data: Channel | null;
  loading: boolean;
};

function createChannelsStore() {
  const { subscribe, set, update } = writable<ChannelState>({ data: null, loading: false });

  return {
    subscribe,
    set,
    update,

    fetchChannel: async (chatbotId: number) => {
      update((state) => ({ ...state, loading: true }));
      const API_URL = `https://localhost:5001/api/v1/chatbots/${chatbotId}/channels`;
      const response = await http.get<Channel>(API_URL);
      console.log(response);
      set({ data: response?.data || null, loading: false });
      return response;
    },
    createChannel: async (chatbotId: number, channel: Channel) => {
      update((state) => ({ ...state, loading: true }));
      const API_URL = `https://localhost:5001/api/v1/chatbots/${chatbotId}/channels`;
      const response = await http.post<Channel>(API_URL, channel);
      set({ data: response?.data || null, loading: false });
      return response;
    },
    updateChannel: async (chatbotId: number, channelId: number, channel: Channel) => {
      update((state) => ({ ...state, loading: true }));
      const API_URL = `https://localhost:5001/api/v1/chatbots/${chatbotId}/channels/${channelId}`;
      const response = await http.put<Channel>(API_URL, channel);
      update((state) => ({ ...state, loading: false }));
      return response;
    },
    deleteChannel: async (chatbotId: number, channelId: number) => {
      update((state) => ({ ...state, loading: true }));
      const API_URL = `https://localhost:5001/api/v1/chatbots/${chatbotId}/channels/${channelId}`;
      const response = await http.del<Channel>(API_URL);
      set({ data: null, loading: false });
      return response;
    }
  };
}

export const channelsStore = createChannelsStore();
