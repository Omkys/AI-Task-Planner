import axios from 'axios';

const api = axios.create({
  baseURL: '/api'
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const auth = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data)
};

export const goals = {
  create: (data) => api.post('/goals', data),
  getAll: () => api.get('/goals'),
  getOne: (id) => api.get(`/goals/${id}`),
  update: (id, data) => api.put(`/goals/${id}`, data),
  delete: (id) => api.delete(`/goals/${id}`)
};

export const milestones = {
  create: (goalId, data) => api.post(`/goals/${goalId}/milestones`, data),
  getAll: (goalId) => api.get(`/goals/${goalId}/milestones`)
};

export const tasks = {
  create: (data) => api.post('/tasks', data),
  getAll: (goalId) => api.get(`/tasks?goalId=${goalId}`),
  getToday: () => api.get('/tasks/today'),
  updateStatus: (taskId, status) => api.put(`/tasks/${taskId}/status`, { status }),
  reschedule: (data) => api.post('/tasks/reschedule', data)
};

export const progress = {
  get: (goalId) => api.get(`/progress/${goalId}`)
};

export const reviews = {
  create: (data) => api.post('/reviews', data),
  getAll: (goalId) => api.get(`/reviews/${goalId}`)
};

export const ai = {
  generatePlan: (data) => api.post('/ai/generate-plan', data),
  getMotivation: (goalId) => api.post('/ai/motivation', { goalId }),
  getInsights: (goalId) => api.post('/ai/review-insights', { goalId })
};

export default api;
