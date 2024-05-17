// src/services/personxchannelservice.js
import { get } from '../api/agent';

const getChannelsByPersonId = async (personId) => {
  return await get(`/PersonXchannel/persons/${personId}/channels`);
};

const getPersonsByChannelId = async (channelId) => {
  return await get(`/PersonXchannel/channels/${channelId}/persons`);
};


export { getChannelsByPersonId, getPersonsByChannelId};
