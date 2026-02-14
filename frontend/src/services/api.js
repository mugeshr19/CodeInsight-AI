import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
};

export const analysisAPI = {
  analyzeCode: (data) => api.post('/analyze', data),
};

export const userAPI = {
  getProfile: () => api.get('/user/profile'),
  getSubmissions: (userId) => api.get(`/submissions/user/${userId}`),
};

export default api;
