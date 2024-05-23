import axios from 'axios';
import { post } from '../api/agent';

const API_URL = 'https://localhost:7019/api';

export const createNotification = async (notification) => {
  const response = await axios.post(`${API_URL}/notification`, notification);
  console.log(response);
  return response.data;
};

export const addPersonXNotification = async (personId, notificationId) => {
  const response = await post(`/personxnotification`, { personId: personId, notificationId: notificationId });
  return response.data;
};
export const getNotificationsByPersonId = async (personId) => {
  const response = await axios.get(`${API_URL}/personxnotification/person/${personId}/notification`);
  return response.data;
};

export const deletePersonXNotification = async (personId, notificationId) => {
  const response = await axios.delete(`${API_URL}/personxnotification/${personId}/${notificationId}`);
  return response.data;
};
