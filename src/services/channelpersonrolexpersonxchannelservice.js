import { get } from '../api/agent';
const getPersonsByRoleInChannel = async (channelId, roleId) => {
    return await get(`ChannelPersonRoleXPersonXChannel/channels/${channelId}/roles/${roleId}/persons`);
  };

  export {getPersonsByRoleInChannel};