import { get } from '../api/agent';

const API_URL = '/PersonJobTitle'; 

const getJobTitles = () => get(`${API_URL}/`);
  
export {
    getJobTitles,
};
