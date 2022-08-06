import type { Chatbot } from '$lib/models/app/chatbot';
import { variables } from '$lib/variables';
import { http } from './http';

const BASE_URL = variables.kibotCoreApiUrl;

const getChatbots = async (applicationId: number) =>
  await http.get<Chatbot[]>(`${BASE_URL}/client_applications/${applicationId}/chatbots`);

const createChatbot = async (applicationId: number, chatbot: Chatbot) =>
  await http.post<Chatbot>(`${BASE_URL}/client_applications/${applicationId}/chatbots`, chatbot);

const deleteChatbot = async (applicationId: number, chatbotId: number) =>
  await http.del<Chatbot>(`${BASE_URL}/client_applications/${applicationId}/chatbots/${chatbotId}`);

export const chatbotsService = { getChatbots, createChatbot, deleteChatbot };
