import axios from 'axios';
import { getToken } from '../services/authService';

const API_URL = process.env.REACT_APP_API_URL 

const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Interceptor to add Authorization header
axiosInstance.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
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
