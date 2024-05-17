// src/api/agent.js
import axios from 'axios';
import { handleError } from '../utils/errorHandler'; 

const API_URL = 'https://localhost:7019/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor pour les réponses
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    handleError(error);
    return Promise.reject(error);
  }
);

const request = async (url, options) => {
  try {
    const response = await axiosInstance({
      url,
      ...options,
    });
    return response.data; 
  } catch (error) {
    throw error;
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
