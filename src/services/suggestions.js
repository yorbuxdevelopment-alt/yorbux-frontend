import api from '../../api';

const pickFirst = (...values) => values.find((value) => value !== undefined && value !== null && value !== '');

export const getUserSuggestions = async (params = {}) => {
  const response = await api.get('/user/suggestions', { params });
  const payload = response.data || {};

  return Array.isArray(payload.suggestions)
    ? payload.suggestions.map((suggestion) => ({
        id: pickFirst(suggestion.id, suggestion._id),
        name: pickFirst(suggestion.name, 'YorBux User'),
        username: pickFirst(suggestion.username, 'yorbuxuser'),
        role: pickFirst(suggestion.role, 'Professional on YorBux'),
        avatar: pickFirst(suggestion.avatar, suggestion.profilePic, 'https://i.pravatar.cc/150?u=yorbux-suggestion')
      }))
    : [];
};

export const sendConnectionRequest = async (followingId) => {
  const response = await api.post('/connections/request', { followingId });
  return response.data || {};
};

export const ignoreSuggestedUser = async (ignoredUserId) => {
  const response = await api.post('/user/ignore', { ignoredUserId });
  return response.data || {};
};
