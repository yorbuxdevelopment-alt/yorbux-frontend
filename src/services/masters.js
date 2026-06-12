import api from '../../api';

export const getServiceCategories = async (params = {}) => {
  const response = await api.get('/masters/service-categories', { params });
  const payload = response.data || {};

  return Array.isArray(payload.categories) ? payload.categories : [];
};
