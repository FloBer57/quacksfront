import axios from 'axios';
import { handleError } from '../utils/errorHandler'; 
import { getToken } from '../services/authService';

const API_URL = 'https://localhost:7019/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Interceptor to add Authorization header
axiosInstance.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) {
      console.log("Attaching token to header:", token);
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Interceptor for handling responses
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 404 && error.config.url.includes('/message/')) {
      console.warn(`404 error ignored for URL: ${error.config.url}`);
      return Promise.resolve({ data: [] }); 
    }
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

const post = (url, data, config = {}) => request(url, {
  method: 'POST',
  data,
  ...config,
});

const put = (url, data) => request(url, {
  method: 'PUT',
  data,
});

const del = (url, data) => request(url, {
  method: 'DELETE',
  data,
  headers: {
    'Content-Type': 'application/json',
  },
});

export { get, post, put, del };
