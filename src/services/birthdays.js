import api from '../../api';

const normalizeBirthdayUser = (user = {}) => ({
  id: user.id || user._id || '',
  name: user.name || user.fullname || 'YorBux User',
  avatar: user.avatar || user.profileImage || null,
  designation: user.designation || '',
  dateOfBirth: user.dateOfBirth || null,
  birthdayLabel: user.birthdayLabel || '',
  nextBirthdayAt: user.nextBirthdayAt || null,
  daysUntilBirthday: Number.isFinite(user.daysUntilBirthday) ? user.daysUntilBirthday : null
});

export const getBirthdayWidget = async () => {
  const response = await api.get('/user/birthdays/widget');
  const payload = response.data || {};

  return {
    status: Boolean(payload.status),
    todayBirthday: payload.todayBirthday ? normalizeBirthdayUser(payload.todayBirthday) : null,
    upcomingBirthdays: Array.isArray(payload.upcomingBirthdays)
      ? payload.upcomingBirthdays.map(normalizeBirthdayUser)
      : [],
    upcomingCount: Number(payload.upcomingCount || 0)
  };
};

export const sendBirthdayWish = async ({ receiverId, content }) => {
  const response = await api.post('/chat/send', {
    receiverId,
    content
  });

  return response.data;
};
