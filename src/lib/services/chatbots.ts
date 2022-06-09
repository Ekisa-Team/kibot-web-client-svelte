import type { Chatbot } from '$lib/models/app/chatbot';
import { variables } from '$lib/variables';
import { http } from './http';

const BASE_URL = variables.kibotCoreApiUrl;

const getChatbots = async (applicationId: number) =>
  await http.get<Chatbot[]>(`${BASE_URL}/client_applications/${applicationId}/chatbots`);

export const chatbotsService = { getChatbots };
