import type { ClientApplication } from '$lib/models/app/client-application';
import { variables } from '$lib/variables';
import { http } from './http';

const BASE_URL = variables.kibotCoreApiUrl;

const getApplications = async () => await http.get<ClientApplication[]>(`${BASE_URL}/client_applications`);

export const applicationsService = { getApplications };
