import { post, get, del} from '../api/agent';


const createChannel = async (data) => {
  return await post('/Channel', data);
};

const getAllChannels = async (data) => {
  return await get('/Channel');
};

const getMessagesByChannelId = async (channelId) => {
  return await get(`/Channel/${channelId}/messages`);
};

const getChannelById = async (channelId) => {
  return await get(`/Channel/${channelId}`);
};

const deleteChannel = async (channelId, personId) => {
  try {
    await del(`/Channel`, { channel_Id: channelId, person_Id: personId });
  } catch (error) {
    throw new Error(`Error deleting channel: ${error.response ? error.response.statusText : error.message}`);
  }
};


export { createChannel, getMessagesByChannelId, getAllChannels, deleteChannel, getChannelById};
