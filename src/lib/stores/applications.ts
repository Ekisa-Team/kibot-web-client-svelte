import { browser } from '$app/env';
import type { ClientApplication } from '$lib/models/app/client-application';
import { applicationsService } from '$lib/services/applications';
import { getItem, LocalStorageItem, removeItem, setItem } from '$lib/utils/local-storage';
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

    createApplication: async (client: ClientApplication) => {
      update((state) => ({ ...state, loading: true }));
      const response = await applicationsService.createApplication(client);
      if (response?.data) {
        update((state) => ({ ...state, loading: false, clients: [...state.clients, response.data] }));
      } else {
        update((state) => ({ ...state, loading: false }));
      }
      return response;
    },
    fetchApplications: async () => {
      update((state) => ({ ...state, loading: true }));
      const response = await applicationsService.getApplications();
      update((state) => ({ ...state, loading: false, clients: response?.data || [] }));
    },
    selectApplication(client: ClientApplication | null) {
      if (browser) {
        update((state) => ({ ...state, selectedClient: client }));
        client ? setItem(LocalStorageItem.SelectedClientApp, client) : removeItem(LocalStorageItem.SelectedClientApp);
      }
    }
  };
}

export const clientApplicationsStore = createApplicationsStore();
