import type { Channel } from '$lib/models/app/channel';
import { writable } from 'svelte/store';
import { channelsService } from './service';

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
      const response = await channelsService.getChannel(chatbotId);
      set({ data: response?.data || null, loading: false });
      return response;
    },
    createChannel: async (chatbotId: number, channel: Channel) => {
      update((state) => ({ ...state, loading: true }));
      const response = await channelsService.createChannel(chatbotId, channel);
      set({ data: response?.data || null, loading: false });
      return response;
    },
    updateChannel: async (chatbotId: number, channelId: number, channel: Channel) => {
      update((state) => ({ ...state, loading: true }));
      const response = await channelsService.updateChannel(chatbotId, channelId, channel);
      update((state) => ({ ...state, loading: false }));
      return response;
    },
    deleteChannel: async (chatbotId: number, channelId: number) => {
      update((state) => ({ ...state, loading: true }));
      const response = await channelsService.deleteChannel(chatbotId, channelId);
      set({ data: null, loading: false });
      return response;
    }
  };
}

export const channelsStore = createChannelsStore();
