import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

// Configure axios with auth token interceptor
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token in requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Authentication endpoints
export const authApi = {
  register: (userData) => apiClient.post('/register/', userData),
  login: (credentials) => apiClient.post('/login/', credentials),
  logout: (refreshToken) => apiClient.post('/logout/', { refresh: refreshToken }),
};

// Post endpoints
export const postApi = {
  getAll: () => apiClient.get('/posts/'),
  getById: (id) => apiClient.get(`/posts/${id}/`),
  create: (data) => apiClient.post('/posts/', data),
  update: (id, data) => apiClient.put(`/posts/${id}/`, data),
  delete: (id) => apiClient.delete(`/posts/${id}/`),
};

export default {
  auth: authApi,
  posts: postApi,
};