// src/services/personXchannelService.js
import { get } from '../api/agent';

export const getChannelsByPersonId = async (personId) => {
  return await get(`/PersonXchannel/persons/${personId}/channels`);
};
