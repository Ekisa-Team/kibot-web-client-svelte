import { http } from '$lib/core/services/http';
import type { Channel } from '$lib/models/app/channel';
import { writable } from 'svelte/store';

function createChannelsStore() {
  const { subscribe, set } = writable<Channel>();

  return {
    subscribe,

    fetch: async (chatbotId: number) => {
      const API_URL = `https://localhost:5001/api/v1/chatbots/${chatbotId}/channels`;
      const response = await http.get<Channel>(API_URL);
      set(response.data);
    }
  };
}

export const channelsStore = createChannelsStore();
