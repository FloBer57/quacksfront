// src/services/messageService.js
import { post,get } from '../api/agent';

const sendMessage = async (messageDto) => {
  return await post('/Message', messageDto);
};

const getAttachmentByMessageId = async (messageId) => {
  try {
    const response = await get(`/message/${messageId}/attachments`);
    return response;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return []; 
    }
    console.error('Error fetching attachments:', error);
    throw error;
  }
};

export { sendMessage , getAttachmentByMessageId};
