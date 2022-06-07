import { browser } from '$app/env';
import { http } from '$lib/core/services/http';
import type { ClientApplication } from '$lib/models/app/client-application';
import { getItem, LocalStorageItem, setItem } from '$lib/utils/local-storage';
import { writable } from 'svelte/store';

type ClientApplicationState = {
  clients: ClientApplication[];
  selectedClient: ClientApplication | null;
};

function createApplicationStore() {
  const { subscribe, set, update } = writable<ClientApplicationState>({
    clients: [],
    selectedClient: (browser && getItem(LocalStorageItem.SelectedClientApp)) || null
  });

  return {
    subscribe,
    set,
    update,

    fetch: async () => {
      const API_URL = 'https://kibot.azurewebsites.net/api/v1/client_applications';
      const response = await http.get<ClientApplication[]>(API_URL);
      update((state) => ({ ...state, clients: response.data }));
    },
    select(client: ClientApplication) {
      update((state) => ({ ...state, selectedClient: client }));
      browser && setItem(LocalStorageItem.SelectedClientApp, client);
    }
  };
}

export const clientApplicationStore = createApplicationStore();
