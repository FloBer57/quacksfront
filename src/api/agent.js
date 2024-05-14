// src/api/agent.js
import axios from 'axios';

const API_URL = 'https://localhost:7019/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const request = async (url, options) => {
  try {
    const response = await axiosInstance({
      url,
      ...options,
    });
    return response.data;
  } catch (error) {
    console.error('Request failed:', error); 

    if (error.response) {
      console.error('Response data:', error.response.data); // Journal des données de réponse
      console.error('Response status:', error.response.status); // Journal du statut de la réponse
      console.error('Response headers:', error.response.headers); // Journal des en-têtes de la réponse

      const errorMessage = error.response.data?.message || error.response.data || 'Error occurred';
      throw new Error(errorMessage);
    } else {
      throw new Error('Network error');
    }
  }
};

const get = (url) => request(url, { method: 'GET' });

const post = (url, data) => request(url, {
  method: 'POST',
  data,
});

const put = (url, data) => request(url, {
  method: 'PUT',
  data,
});

const del = (url) => request(url, { method: 'DELETE' });

export { get, post, put, del };
