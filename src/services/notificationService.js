import { post, get, del } from '../api/agent';

const API_URL = process.env.REACT_APP_API_URL 

export const createNotification = async (notification) => {
  try {
    const response = await post(`${API_URL}/notification`, notification);
    console.log(response);
    return response;
  } catch (error) {
    console.error('Error creating notification:', error);
    throw error;
  }
};

export const addPersonXNotification = async (personId, notificationId) => {
  try {
    const response = await post(`${API_URL}/personxnotification`, { personId, notificationId });
    return response;
  } catch (error) {
    console.error('Error adding person notification:', error);
    throw error;
  }
};

export const getNotificationsByPersonId = async (personId) => {
  try {
    const response = await get(`${API_URL}/personxnotification/person/${personId}/notification`);
    return response;
  } catch (error) {
    console.error('Error getting notifications by person ID:', error);
    throw error;
  }
};

export const deletePersonXNotification = async (personId, notificationId) => {
  try {
    const response = await del(`${API_URL}/personxnotification/${personId}/${notificationId}`);
    return response;
  } catch (error) {
    console.error('Error deleting person notification:', error);
    throw error;
  }
};
