import { get } from '../api/agent';

const API_URL = '/PersonRole'; 

const getUserRoles = () => get(`${API_URL}/`);
  
export {
    getUserRoles,
};
