import axios from 'axios';

let url = window.location.href.includes('localhost') ? 'http://localhost:3001/' : 'https://server.easzoologic.xyz/'

const api = axios.create({
  baseURL: url,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor to include the token in the headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('user_token'); // You can choose to store the token in a secure storage
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;