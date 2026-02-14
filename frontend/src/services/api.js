import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const analysisAPI = {
  analyzeCode: (data) => api.post('/analyze', data),
};

export const userAPI = {
  getProfile: () => api.get('/user/profile'),
  getSubmissions: (userId) => api.get(`/submissions/user/${userId}`),
};

export default api;
