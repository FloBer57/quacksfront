import { post, get, del} from '../api/agent';

// Fonction pour créer un canal
const createChannel = async (data) => {
  return await post('/Channel', data);
};

const getAllChannels = async (data) => {
  return await get('/Channel');
};
// Fonction pour obtenir les messages d'un canal par son ID
const getMessagesByChannelId = async (channelId) => {
  return await get(`/Channel/${channelId}/messages`);
};

// Fonction pour obtenir un canal par son ID
const getChannelById = async (channelId) => {
  return await get(`/Channel/${channelId}`);
};

const deleteChannel = async (channelId) => {
  return await del(`/Channel/${channelId}`);
};

export { createChannel, getMessagesByChannelId, getAllChannels, deleteChannel, getChannelById};
