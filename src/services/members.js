import api from '../../api';

const pickFirst = (...values) => values.find((value) => value !== undefined && value !== null && value !== '');

const normalizeMember = (member = {}) => ({
  id: pickFirst(member.id, member._id),
  name: pickFirst(member.name, member.fullname, 'YorBux User'),
  role: pickFirst(member.role, 'Professional on YorBux'),
  avatar: pickFirst(member.avatar, member.profilePic, 'https://i.pravatar.cc/150?u=yorbux-member'),
  location: pickFirst(member.location, ''),
  relationStatus: pickFirst(member.relationStatus, 'none')
});

export const getMembers = async (params = {}) => {
  const response = await api.get('/user/members', { params });
  const payload = response.data || {};

  return {
    members: Array.isArray(payload.members) ? payload.members.map(normalizeMember) : [],
    pagination: payload.pagination || {
      page: 1,
      limit: params.limit || 9,
      total: 0,
      hasMore: false
    }
  };
};

export const sendConnectionRequest = async (followingId) => {
  const response = await api.post('/connections/request', { followingId });
  return response.data || {};
};

export const disconnectMember = async (otherUserId) => {
  const response = await api.post('/connections/disconnect', { otherUserId });
  return response.data || {};
};

export const ignoreMember = async (ignoredUserId) => {
  const response = await api.post('/user/ignore', { ignoredUserId });
  return response.data || {};
};
