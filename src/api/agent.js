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
    if (error.response) {
      throw new Error(error.response.data || 'Error occurred');
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
