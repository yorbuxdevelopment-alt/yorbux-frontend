import React, { useEffect, useMemo, useState } from 'react';
import { getMyProfile } from '../../services/profile';

const getProfileCompletion = (profile) => {
  if (!profile) return 0;

  const fields = [
    profile.user?.firstName,
    profile.user?.lastName,
    profile.user?.email,
    profile.user?.mobile,
    profile.user?.country,
    profile.user?.state,
    profile.user?.city,
    profile.professionalDetail?.organisation,
    profile.professionalDetail?.designation,
    profile.professionalDetail?.aboutUser
  ];

  const completedFields = fields.filter(Boolean).length;
  return Number(((completedFields / fields.length) * 100).toFixed(2));
};

const ProfileCard = () => {
  const [profile, setProfile] = useState(null);
  const [percentage, setPercentage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    const loadProfile = async () => {
      setLoading(true);
      setError('');

      try {
        const data = await getMyProfile();
        if (!active) return;
        setProfile(data);
      } catch (requestError) {
        if (!active) return;
        setError(requestError.response?.data?.message || 'Profile load nahi ho paaya');
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadProfile();

    return () => {
      active = false;
    };
  }, []);

  const targetPercentage = useMemo(() => getProfileCompletion(profile), [profile]);

  useEffect(() => {
    const timer = window.setTimeout(() => setPercentage(targetPercentage), 300);
    return () => window.clearTimeout(timer);
  }, [targetPercentage]);

  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  const displayName = profile?.user?.fullname || profile?.user?.name || 'Your Profile';
  const designation =
    profile?.professionalDetail?.designation ||
    profile?.user?.designation ||
    'Add your professional title';
  const avatar = profile?.user?.profileImage || 'https://i.pravatar.cc/150?u=yorbux-profile-card';

  return (
    <div className="bg-bg-surface p-6 rounded-2xl shadow-sm border border-border-ui text-center">
      <div className="relative inline-block mb-4">
        <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={radius} className="stroke-border-ui" strokeWidth="6" fill="transparent" />
          <circle
            cx="50"
            cy="50"
            r={radius}
            className="stroke-action-blue drop-shadow-md"
            strokeWidth="6"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1.5s ease-in-out' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <img src={avatar} alt={displayName} className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm" />
        </div>
      </div>

      <h2 className="text-xl font-extrabold text-text-main mb-1">{displayName}</h2>
      <p className="text-sm font-medium text-text-sec mb-4">{designation}</p>

      <div className="bg-action-blue/10 py-3 px-4 rounded-xl inline-block min-w-[180px]">
        <p className="text-action-blue font-bold text-sm">Profile Completion</p>
        <p className="text-action-blue text-lg font-extrabold">
          {loading ? '...' : `${targetPercentage}%`}
        </p>
      </div>

      <p className="text-xs text-text-sec mt-4">
        {error ? error : 'Complete your profile to attract more views.'}
      </p>
    </div>
  );
};

export default ProfileCard;
