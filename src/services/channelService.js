import { post, get } from '../api/agent';

// Fonction pour créer un canal
const createChannel = async (data) => {
  return await post('/Channel', data);
};

// Fonction pour obtenir les messages d'un canal par son ID
const getMessagesByChannelId = async (channelId) => {
  return await get(`/Channel/${channelId}/messages`);
};

// Fonction pour obtenir un canal par son ID
export const getChannelById = async (channelId) => {
  return await get(`/Channel/${channelId}`);
};

export { createChannel, getMessagesByChannelId };
