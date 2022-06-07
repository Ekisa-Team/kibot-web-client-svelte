import { browser } from '$app/env';
import { http } from '$lib/core/services/http';
import type { ClientApplication } from '$lib/models/app/client-application';
import { getItem, LocalStorageItem, setItem } from '$lib/utils/local-storage';
import { writable } from 'svelte/store';

type ClientApplicationsState = {
  clients: ClientApplication[];
  selectedClient: ClientApplication | null;
  loading: boolean;
};

function createApplicationsStore() {
  const { subscribe, set, update } = writable<ClientApplicationsState>({
    clients: [],
    selectedClient: (browser && getItem(LocalStorageItem.SelectedClientApp)) || null,
    loading: false
  });

  return {
    subscribe,
    set,
    update,

    fetchApplications: async () => {
      update((state) => ({ ...state, loading: true }));
      const API_URL = 'https://kibot.azurewebsites.net/api/v1/client_applications';
      const response = await http.get<ClientApplication[]>(API_URL);
      update((state) => ({ ...state, loading: false, clients: response?.data || [] }));
    },
    selectApplication(client: ClientApplication) {
      if (browser) {
        update((state) => ({ ...state, selectedClient: client }));
        setItem(LocalStorageItem.SelectedClientApp, client);
      }
    }
  };
}

export const clientApplicationsStore = createApplicationsStore();
