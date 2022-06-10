import type { ResponseMessage } from '$lib/models/app/response-message';
import type { ReplyToken } from '$lib/models/reply-token';
import { variables } from '$lib/variables';
import { http } from './http';

const BASE_URL = variables.kibotCoreApiUrl;

const getResponseMessage = async (chatbotId: number) =>
  await http.get<ResponseMessage[]>(`${BASE_URL}/chatbots/${chatbotId}/response_messages`);

const detectIntention = async <T>(chatbotId: number, intention: ReplyToken<T>) =>
  await http.get<ResponseMessage>(`${BASE_URL}/chatbots/${chatbotId}/response_messages/${intention}`);

const createResponseMessage = async (chatbotId: number, body: ResponseMessage) =>
  await http.post<ResponseMessage>(`${BASE_URL}/chatbots/${chatbotId}/response_messages`, body);

const updateResponseMessage = async (chatbotId: number, responseMessageId: number, body: ResponseMessage) =>
  await http.put<ResponseMessage>(
    `${BASE_URL}/chatbots/${chatbotId}/response_messages/${responseMessageId}`,
    body
  );

const deleteResponseMessage = async (chatbotId: number, responseMessageId: number) =>
  await http.del<ResponseMessage>(`${BASE_URL}/chatbots/${chatbotId}/response_messages/${responseMessageId}`);

export const responseMessagesService = {
  getResponseMessage,
  detectIntention,
  createResponseMessage,
  updateResponseMessage,
  deleteResponseMessage
};
