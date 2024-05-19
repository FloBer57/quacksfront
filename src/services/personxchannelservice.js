// src/services/personxchannelservice.js
import { get, post, del } from '../api/agent';

const getChannelsByPersonId = async (personId) => {
  return await get(`/PersonXchannel/persons/${personId}/channels`);
};

const getPersonsByChannelId = async (channelId) => {
  return await get(`/PersonXchannel/channels/${channelId}/persons`);
};

const createAssociation = (createAssociationDTO) => post(`/PersonXchannel`, createAssociationDTO);
const deleteAssociation = (personId, channelId) => del(`/PersonXchannel/${personId}/${channelId}`);

export { getChannelsByPersonId, getPersonsByChannelId, createAssociation, deleteAssociation};
