import React, { useEffect, useMemo, useState } from 'react';
import { MapPin, CheckCircle, Copy, Share2, Send, UserPlus, LogOut, Trash2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/slice/authSlice';
import { getMyProfile } from '../services/profile';

const buildLocation = (user) => [user?.city, user?.state, user?.country].filter(Boolean).join(', ') || 'Location not added';
const formatExperience = (value) => {
  if (value === undefined || value === null || value === '') return '-';

  const normalized = Number(value);
  if (Number.isNaN(normalized)) return String(value);

  if (normalized <= 1) return '0-1 Years';
  if (normalized <= 3) return '1-3 Years';
  if (normalized <= 5) return '3-5 Years';
  return '5+ Years';
};

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

  return Math.round((fields.filter(Boolean).length / fields.length) * 100);
};

const ViewProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getMyProfile();
        setProfile(data);
      } catch (requestError) {
        setError(requestError.response?.data?.message || 'Profile load nahi ho paaya');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const completion = useMemo(() => getProfileCompletion(profile), [profile]);
  const user = profile?.user;
  const professional = profile?.professionalDetail;
  const avatar = user?.profileImage || 'https://i.pravatar.cc/150?u=view-profile';
  const location = buildLocation(user);
  const displayName = user?.fullname || user?.name || 'Your Profile';

  const handleCopyReferral = async () => {
    if (!user?.referral_code) return;

    try {
      await navigator.clipboard.writeText(user.referral_code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  const handleShareReferral = async () => {
    if (!user?.referral_code) return;

    const shareText = `Join YorBux with my referral code: ${user.referral_code}`;

    if (navigator.share) {
      try {
        await navigator.share({ text: shareText });
      } catch {
        return;
      }
      return;
    }

    await handleCopyReferral();
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/signin');
  };

  if (loading) {
    return <div className="p-8 text-sm text-gray-500">Profile loading...</div>;
  }

  if (error) {
    return <div className="m-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>;
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-slate-50 via-blue-50/30 to-teal-50/20 -m-4 sm:-m-6 p-4 md:p-6 lg:p-8 overflow-hidden relative rounded-xl">
      <div className="absolute inset-0 opacity-[0.25] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

      <div className="w-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 relative z-10">
        <div className="col-span-1 lg:col-span-3 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 overflow-hidden">
            <div className="h-24 bg-gradient-to-r from-blue-600 to-indigo-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
            </div>
            <div className="px-5 pb-6 relative">
              <div className="w-24 h-24 rounded-full border-4 border-white bg-gray-200 mx-auto -mt-12 overflow-hidden shadow-md relative z-10">
                <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div className="text-center mt-4 mb-6">
                <h2 className="text-gray-900 font-extrabold text-[17px] leading-tight">{displayName}</h2>
                <div className="flex items-center justify-center gap-1.5 text-gray-500 text-[13px] mt-1.5 font-medium">
                  <MapPin size={14} className="text-blue-500" />
                  <span>{location}</span>
                </div>
              </div>
              <div className="flex justify-around text-center border-t border-gray-100 py-4 mb-4">
                <div>
                  <p className="text-[18px] font-black text-blue-600">{user?.wallet_balance ?? 0}</p>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">Wallet</p>
                </div>
                <div className="w-px bg-gray-100 h-10"></div>
                <div>
                  <p className="text-[18px] font-black text-blue-600">{completion}%</p>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">Profile</p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button onClick={handleLogout} className="w-full py-2.5 text-white bg-blue-600 rounded-xl text-[14px] font-bold hover:bg-blue-700 active:scale-95 transition-all shadow-md shadow-blue-600/25 flex items-center justify-center gap-2">
                  <LogOut size={16} /> Log Out
                </button>
                <button className="w-full py-2.5 text-red-500 border-2 border-red-100 bg-red-50/50 rounded-xl text-[14px] font-bold hover:bg-red-50 hover:border-red-200 active:scale-95 transition-all flex items-center justify-center gap-2">
                  <Trash2 size={16} /> Delete Account
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center hover:shadow-md transition-shadow">
            <h3 className="text-gray-900 font-extrabold text-[15px]">Referral Code</h3>
            <p className="text-[12px] font-bold text-blue-500 mt-1 mb-4">( Invite Friends to Join )</p>

            <div className="bg-blue-50/50 border-2 border-blue-100 border-dashed rounded-xl py-3 px-4 flex items-center justify-center mb-5">
              <span className="text-[18px] font-black text-gray-800 tracking-wider">{user?.referral_code || 'N/A'}</span>
            </div>

            <div className="flex items-center justify-center gap-4">
              <button onClick={handleCopyReferral} className="p-2.5 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 hover:scale-105 active:scale-95 transition-all" title="Copy">
                <Copy size={16} />
              </button>
              <button onClick={handleShareReferral} className="p-2.5 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 hover:scale-105 active:scale-95 transition-all" title="Share">
                <Share2 size={16} />
              </button>
              <button onClick={handleShareReferral} className="p-2.5 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 hover:scale-105 active:scale-95 transition-all" title="Telegram">
                <Send size={16} />
              </button>
            </div>
            {copied ? <p className="mt-3 text-xs font-bold text-emerald-600">Referral code copied</p> : null}
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center gap-3 text-gray-800 font-bold text-[14px] mb-4">
              <div className="p-2 bg-blue-50 rounded-lg">
                <CheckCircle size={18} className="text-blue-500" />
              </div>
              Profiling
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 mb-2 overflow-hidden shadow-inner">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-400 h-2 rounded-full relative" style={{ width: `${completion}%` }}></div>
            </div>
            <div className="text-right text-[12px] text-gray-500 font-bold">{completion}% Completed</div>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-6 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 p-6 min-h-[140px]">
            <h3 className="text-[16px] font-extrabold text-gray-900 mb-4">About You</h3>
            <p className={`text-[14px] ${professional?.aboutUser ? 'text-gray-700' : 'text-gray-400 italic'}`}>
              {professional?.aboutUser || 'No description added yet.'}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 p-6">
            <div className="border-b border-gray-200 mb-2">
              <h3 className="text-[15px] font-extrabold text-blue-600 border-b-2 border-blue-600 pb-3 inline-block -mb-[1px]">Professional</h3>
            </div>

            <div className="flex flex-col">
              {[
                ['Organisation', professional?.organisation || user?.organisation],
                ['Total Experience', formatExperience(professional?.totalExperience)],
                ['Designation', professional?.designation || user?.designation],
                ['Previous Organisation', professional?.previousOrganisation],
                ['Previous Designation', professional?.previousDesignation]
              ].map(([label, value]) => (
                <div key={label} className="grid grid-cols-1 sm:grid-cols-3 py-4 border-b border-gray-100 last:border-0 items-center gap-2">
                  <div className="text-[13px] font-bold text-gray-500 col-span-1">{label}</div>
                  <div className="text-[14px] font-bold text-gray-900 col-span-2">{value || '-'}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-3 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 p-6">
            <h3 className="text-gray-900 font-extrabold text-[15px] mb-5 border-b border-gray-100 pb-4">User Suggestions</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <img src={`https://i.pravatar.cc/150?img=${i + 10}`} alt="User" className="w-10 h-10 rounded-full object-cover border border-gray-100 group-hover:border-blue-200 transition-colors" />
                    <div>
                      <h4 className="text-[13px] font-bold text-blue-600 group-hover:text-blue-700 transition-colors line-clamp-1">Professional User {i}</h4>
                      <p className="text-[11px] text-gray-500 font-medium mt-0.5">Location, City</p>
                    </div>
                  </div>
                  <button className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors" title="Add User">
                    <UserPlus size={16} />
                  </button>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2.5 text-blue-600 bg-white border-2 border-blue-100 rounded-xl text-[13px] font-bold hover:bg-blue-50 active:scale-95 transition-all">
              Show all
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
