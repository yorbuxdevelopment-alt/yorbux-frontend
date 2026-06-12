import api from '../../api';

export const getServiceCategories = async (params = {}) => {
  const response = await api.get('/masters/service-categories', { params });
  const payload = response.data || {};

  return Array.isArray(payload.categories) ? payload.categories : [];
};

export const getCompanies = async (params = {}) => {
  const response = await api.get('/masters/companies', { params });
  const payload = response.data || {};

  return Array.isArray(payload.companies) ? payload.companies : [];
};
