import { get } from '../api/agent';

const API_URL = '/ChannelType';

const getAllChannelTypes = () => get(`${API_URL}/`);

export {
  getAllChannelTypes, 
};
