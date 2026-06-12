import api from '../../api';

export const getSellerProfile = async () => {
  const response = await api.get('/seller/profile');
  return response.data || {};
};

export const updateSellerProfile = async (payload) => {
  const response = await api.post('/seller/profile', payload, payload instanceof FormData ? {
    headers: undefined
  } : undefined);
  return response.data || {};
};

export const getSellerDashboard = async () => {
  const response = await api.get('/seller/dashboard');
  return response.data || {};
};

export const createSellerPost = async (payload) => {
  const response = await api.post('/seller/posts', payload);
  return response.data || {};
};

export const getSellerLeads = async (params = {}) => {
  const response = await api.get('/seller/leads', { params });
  return response.data || {};
};
