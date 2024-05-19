import { get,post } from '../api/agent';
const getPersonsByRoleInChannel = async (channelId, roleId) => {
    return await get(`ChannelPersonRoleXPersonXChannel/channels/${channelId}/roles/${roleId}/persons`);
  };

  const createRoleAssociation = (data) => post('/ChannelPersonRoleXPersonXChannel', data);

  export {getPersonsByRoleInChannel, createRoleAssociation};