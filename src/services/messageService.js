// src/services/messageService.js
import { post } from '../api/agent';

const sendMessage = async (messageDto) => {
  return await post('/Message', messageDto);
};

export { sendMessage };
