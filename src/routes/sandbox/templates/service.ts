import type { Template } from '$lib/models/app/template';
import { http } from '$lib/services/http';
import { variables } from '$lib/variables';

const BASE_URL = variables.kibotCoreApiUrl;

const fetchTemplates = async (chatbotId: number) =>
  await http.get<Template[]>(`${BASE_URL}/chatbots/${chatbotId}/templates`);

export const templatesService = { fetchTemplates };
