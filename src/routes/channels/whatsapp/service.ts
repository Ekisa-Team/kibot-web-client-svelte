import type { Channel } from '$lib/models/app/channel';
import { http } from '$lib/services/http';
import { variables } from '$lib/variables';

const BASE_URL = variables.kibotCoreApiUrl;

const getChannel = async (chatbotId: number) =>
  await http.get<Channel>(`${BASE_URL}/chatbots/${chatbotId}/channels`);

const createChannel = async (chatbotId: number, channel: Channel) =>
  await http.post<Channel>(`${BASE_URL}/chatbots/${chatbotId}/channels`, channel);

const updateChannel = async (chatbotId: number, channelId: number, channel: Channel) =>
  await http.put<Channel>(`${BASE_URL}/chatbots/${chatbotId}/channels/${channelId}`, channel);

const deleteChannel = async (chatbotId: number, channelId: number) =>
  await http.del<Channel>(`${BASE_URL}/chatbots/${chatbotId}/channels/${channelId}`);

export const channelsService = { getChannel, createChannel, updateChannel, deleteChannel };
