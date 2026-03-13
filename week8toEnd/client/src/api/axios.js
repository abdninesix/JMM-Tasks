import axios from 'axios';

const API = axios.create({
  baseURL: 'https://jmm-tasks.onrender.com/api',
});

// Automatically include token in requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
