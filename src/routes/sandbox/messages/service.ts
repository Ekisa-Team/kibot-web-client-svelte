import type { MessagePayload } from '$lib/models/message-payload';
import { http } from '$lib/services/http';
import { variables } from '$lib/variables';

const BASE_URL = variables.kibotCoreApiUrl;

const sendMessage = async (chatbotId: number, payload: MessagePayload) =>
  await http.post<MessagePayload>(`${BASE_URL}/chatbots/${chatbotId}/messages`, payload);

export const messagesService = { sendMessage };
