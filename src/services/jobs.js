import api from '../../api';

export const getJobs = async (params = {}) => {
  const response = await api.get('/jobs', { params });
  return response.data;
};

export const createJob = async (payload) => {
  const response = await api.post('/jobs', payload);
  return response.data;
};
