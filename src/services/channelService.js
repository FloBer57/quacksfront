import { get } from '../api/agent';

const getMessagesByChannelId = async (channelId) => {
  return await get(`/Channel/${channelId}/messages`);
};

export const getChannelById = async (channelId) => {
  return await get(`/Channel/${channelId}`);
};

export { getMessagesByChannelId };