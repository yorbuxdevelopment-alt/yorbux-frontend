import api from '../../api';

const pickFirst = (...values) => values.find((value) => value !== undefined && value !== null && value !== '');

const normalizeProfileResponse = (payload = {}) => {
  const rawUser = payload.user || {};
  const rawProfessional = payload.professionalDetail || payload.professional || {};

  return {
    ...payload,
    user: {
      ...rawUser,
      id: pickFirst(rawUser.id, rawUser._id),
      mobile: pickFirst(rawUser.mobile, rawUser.phone),
      phone: pickFirst(rawUser.phone, rawUser.mobile),
      profileImage: pickFirst(rawUser.profileImage, rawUser.profilePic),
      referral_code: pickFirst(rawUser.referral_code, rawUser.referralCode),
      wallet_balance: pickFirst(rawUser.wallet_balance, rawUser.rewardPoints, 0),
      organisation: pickFirst(rawUser.organisation, rawUser.company),
      designation: pickFirst(rawUser.designation, rawUser.job_title)
    },
    professionalDetail: {
      organisation: pickFirst(rawProfessional.organisation, rawProfessional.company),
      totalExperience: pickFirst(rawProfessional.totalExperience, rawProfessional.experience),
      designation: pickFirst(rawProfessional.designation, rawProfessional.job_title),
      previousOrganisation: pickFirst(rawProfessional.previousOrganisation, rawProfessional.previousCompany),
      previousDesignation: pickFirst(rawProfessional.previousDesignation, rawProfessional.previousJobTitle),
      aboutUser: pickFirst(rawProfessional.aboutUser, rawProfessional.about)
    }
  };
};

export const getMyProfile = async () => {
  const response = await api.get('/user/profile');
  return normalizeProfileResponse(response.data);
};

export const updateMyProfile = async (payload, options = {}) => {
  const hasFile = payload instanceof FormData;
  const response = await api.post('/user/profile', payload, {
    ...options,
    headers: hasFile ? undefined : { 'Content-Type': 'application/json' }
  });
  return normalizeProfileResponse(response.data);
};

export const updateMyProfessionalProfile = async (payload) => {
  const response = await api.post('/user/professional-profile', payload);
  return normalizeProfileResponse(response.data);
};
