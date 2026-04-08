import axios from 'axios';
import { clearAuthStorage } from './auth';

// In local dev, use Vite proxy (`/api -> http://localhost:8000`).
// For deployments where frontend and backend are on different origins, set `VITE_API_BASE_URL`.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export const persistSession = (payload = {}) => {
  if (payload.access) {
    localStorage.setItem('schemeMatch_token', payload.access);
  }

  if (payload.refresh) {
    localStorage.setItem('schemeMatch_refresh', payload.refresh);
  }

  if (payload.user) {
    localStorage.setItem('schemeMatch_user', JSON.stringify(payload.user));
  }
};

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include JWT token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('schemeMatch_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refresh = localStorage.getItem('schemeMatch_refresh');
        if (!refresh) {
          clearAuthStorage();
          window.location.href = '/login';
          return Promise.reject(error);
        }

        const response = await apiClient.post('/auth/refresh/', { refresh });
        persistSession({ access: response.data.access, refresh });
        apiClient.defaults.headers.Authorization = `Bearer ${response.data.access}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        clearAuthStorage();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const authAPI = {
  login: (email, password) =>
    apiClient.post('/auth/login/', { email, password }),
  register: (userData) =>
    apiClient.post('/auth/register/', userData),
  refresh: (refreshToken) =>
    apiClient.post('/auth/refresh/', { refresh: refreshToken }),
};

// Policy endpoints
export const policyAPI = {
  getAll: () => apiClient.get('/policies/'),
  getById: (id) => apiClient.get(`/policies/${id}/`),
  create: (data) => apiClient.post('/policies/', data),
  update: (id, data) => apiClient.put(`/policies/${id}/`, data),
  delete: (id) => apiClient.delete(`/policies/${id}/`),
};

// User Profile endpoints
export const userProfileAPI = {
  getAll: () => apiClient.get('/user-profiles/'),
  getById: (id) => apiClient.get(`/user-profiles/${id}/`),
  create: (data) => apiClient.post('/user-profiles/', data),
  update: (id, data) => apiClient.put(`/user-profiles/${id}/`, data),
  delete: (id) => apiClient.delete(`/user-profiles/${id}/`),
};

export default apiClient;
