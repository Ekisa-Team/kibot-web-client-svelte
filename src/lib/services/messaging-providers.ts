import type { MessagingProvider } from '$lib/models/app/messaging-provider';
import { variables } from '$lib/variables';
import { http } from './http';

const BASE_URL = variables.kibotCoreApiUrl;

const getMessagingProviders = async () =>
  await http.get<MessagingProvider[]>(`${BASE_URL}/messaging_providers`);

export const messagingProvidersService = { getMessagingProviders };
