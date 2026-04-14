import axios from 'axios';

// Axios instance create kar rahe hain .env se base URL le kar
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Agar future me Authentication Tokens bhejne ho toh yahan interceptor laga sakte hain
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Assuming JWT token is stored in localStorage
  if (token) { config.headers.Authorization = `Bearer ${token}`; }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;