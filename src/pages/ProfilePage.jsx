import React, { useEffect, useMemo, useState } from 'react';
import { MapPin, Building2, ChevronDown, Image as ImageIcon, Briefcase, UserCheck, CheckCircle, RefreshCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getMyProfile } from '../services/profile';
import { getMyPosts } from '../services/posts';
import PostCard from '../components/feed/PostCard';

const buildLocation = (user) => [user?.city, user?.state, user?.country].filter(Boolean).join(', ') || 'Location not added';

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
  return Math.round((completedFields / fields.length) * 100);
};

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('Connections');
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [postsError, setPostsError] = useState('');
  const navigate = useNavigate();

  const loadProfile = async ({ silent = false } = {}) => {
    if (silent) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    setError('');

    try {
      const data = await getMyProfile();
      setProfile(data);
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Profile load nahi ho paaya');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  useEffect(() => {
    let active = true;

    const loadPosts = async () => {
      setPostsLoading(true);
      setPostsError('');

      try {
        const data = await getMyPosts({
          page: 1,
          limit: 20,
          publishType: activeTab === 'Connections' ? 'MY_CONNECTIONS' : 'PUBLIC'
        });

        if (!active) return;
        setPosts(data.posts || []);
      } catch (requestError) {
        if (!active) return;
        setPostsError(requestError.response?.data?.message || 'Posts load nahi ho paaye');
      } finally {
        if (active) {
          setPostsLoading(false);
        }
      }
    };

    loadPosts();

    return () => {
      active = false;
    };
  }, [activeTab]);

  const completion = useMemo(() => getProfileCompletion(profile), [profile]);
  const user = profile?.user;
  const professional = profile?.professionalDetail;
  const displayName = user?.fullname || user?.name || 'Your Profile';
  const location = buildLocation(user);
  const avatar = user?.profileImage || 'https://i.pravatar.cc/150?u=yorbux-profile';
  const currentRole = [professional?.designation || user?.designation, professional?.organisation || user?.organisation].filter(Boolean).join(' at ');

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
                {currentRole ? (
                  <p className="mt-2 text-[13px] font-medium text-blue-600">{currentRole}</p>
                ) : null}
              </div>
              <div className="flex justify-around text-center border-t border-gray-100 py-4 mb-2">
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
                <button onClick={() => navigate('/view-profile')} className="w-full py-2.5 text-blue-600 border-2 border-blue-100 bg-blue-50/50 rounded-xl text-sm font-bold hover:bg-blue-50 hover:border-blue-200 active:scale-95 transition-all">
                  View profile
                </button>
                <button onClick={() => navigate('/edit-profile')} className="w-full py-2.5 text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl text-sm font-bold hover:from-blue-700 hover:to-blue-600 active:scale-95 transition-all shadow-md shadow-blue-600/25">
                  Edit profile
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 p-4.5 flex items-center justify-between group">
            <div className="flex items-center gap-3 text-gray-800 font-bold text-[14px]">
              <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                <UserCheck size={18} className="text-blue-600" />
              </div>
              Current Designation
            </div>
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-[12px] font-black shadow-sm">
              {professional?.designation || user?.designation || 'N/A'}
            </span>
          </div>

          <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 p-5">
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3 text-gray-800 font-bold text-[14px]">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <CheckCircle size={18} className="text-blue-500" />
                </div>
                Profiling
              </div>
              <button onClick={() => loadProfile({ silent: true })} className="text-gray-400 hover:text-blue-600" aria-label="Refresh profile">
                <RefreshCcw size={16} className={refreshing ? 'animate-spin' : ''} />
              </button>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 mb-2 overflow-hidden shadow-inner">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-400 h-2 rounded-full relative" style={{ width: `${completion}%` }}></div>
            </div>
            <div className="text-right text-[12px] text-gray-500 font-bold">{completion}% Completed</div>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-6 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 p-6">
            {loading ? (
              <p className="text-gray-500 text-sm">Profile loading...</p>
            ) : error ? (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
            ) : (
              <>
                <div className="flex items-start gap-4 mb-3">
                  <img src={avatar} alt="Profile" className="w-11 h-11 rounded-full object-cover border-2 border-gray-50 shadow-sm" />
                  <div className="flex-1">
                    <h3 className="text-gray-800 font-extrabold text-[15px] mb-2">About your profile</h3>
                    <textarea
                      className="w-full bg-slate-50 border border-gray-200 rounded-xl p-4 text-[14px] text-gray-700 resize-none transition-all shadow-inner placeholder-gray-400"
                      rows="3"
                      value={professional?.aboutUser || 'No profile summary added yet.'}
                      readOnly
                    ></textarea>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-2 gap-4 pl-15">
                  <button className="flex items-center gap-2 text-gray-500 bg-blue-50 px-3 py-2 rounded-lg text-sm font-bold w-fit">
                    <ImageIcon size={18} />
                    Profile is live
                  </button>
                  <div className="flex items-center gap-3 ml-auto">
                    <div className="relative">
                      <select value={activeTab} onChange={(event) => setActiveTab(event.target.value)} className="appearance-none bg-gray-50 border border-gray-200 text-gray-700 text-[13px] font-bold rounded-xl pl-4 pr-9 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer hover:bg-gray-100 transition-colors">
                        <option value="Connections">Connections</option>
                        <option value="Public">Public</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                    </div>
                    <button onClick={() => navigate('/edit-profile')} className="bg-blue-600 text-white px-8 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 active:scale-95 transition-all shadow-md shadow-blue-600/20">
                      Update
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 overflow-hidden flex flex-col">
            <div className="flex items-center gap-4 px-6 pt-5 pb-4 border-b border-gray-100 bg-white sticky top-0 z-20">
              <button onClick={() => setActiveTab('Connections')} className={`px-6 py-2.5 rounded-full text-[13px] font-bold whitespace-nowrap active:scale-95 transition-all ${activeTab === 'Connections' ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:text-gray-900 shadow-sm'}`}>
                My Connections
              </button>
              <button onClick={() => setActiveTab('Public')} className={`px-6 py-2.5 rounded-full text-[13px] font-bold whitespace-nowrap active:scale-95 transition-all ${activeTab === 'Public' ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:text-gray-900 shadow-sm'}`}>
                Public
              </button>
            </div>

            <div className="p-6 space-y-6 overflow-y-auto max-h-[600px] no-scrollbar">
              {postsLoading ? (
                <p className="text-sm text-gray-500">Posts loading...</p>
              ) : postsError ? (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{postsError}</div>
              ) : !posts.length ? (
                <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50/70 px-5 py-10 text-center">
                  <p className="text-sm font-semibold text-gray-800">No posts in this tab yet</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {activeTab === 'Connections'
                      ? 'Create a My Connections post to see it here.'
                      : 'Create a Public post to see it here.'}
                  </p>
                </div>
              ) : (
                posts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    currentUser={user ? {
                      id: user.id,
                      name: displayName,
                      avatar
                    } : null}
                    onPostUpdate={(updatedPost) =>
                      setPosts((currentPosts) =>
                        currentPosts.map((currentPost) =>
                          currentPost.id === updatedPost.id ? { ...currentPost, ...updatedPost } : currentPost
                        )
                      )
                    }
                  />
                ))
              )}
            </div>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-3 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 p-6">
            <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-5">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Briefcase size={18} className="text-blue-600" />
              </div>
              <h3 className="text-gray-900 font-extrabold text-[15px]">Professional Snapshot</h3>
            </div>

            <div className="space-y-4">
              <div className="group border border-gray-50 bg-gray-50/50 p-3.5 rounded-xl transition-all duration-300">
                <div className="flex justify-between items-start mb-1.5">
                  <h4 className="text-[14px] font-bold text-gray-800 line-clamp-1">{professional?.designation || user?.designation || 'Designation missing'}</h4>
                  <span className="bg-white text-blue-600 text-[10px] font-extrabold px-2 py-0.5 rounded shadow-sm border border-blue-50">Live</span>
                </div>
                <div className="flex items-center gap-2 text-[12px] text-gray-500 mt-2 font-medium">
                  <Building2 size={14} className="text-gray-400" />
                  <span>{professional?.organisation || user?.organisation || 'Organisation missing'}</span>
                </div>
                <div className="flex items-center gap-2 text-[12px] text-gray-500 mt-1.5 font-medium">
                  <MapPin size={14} className="text-gray-400" />
                  <span>{location}</span>
                </div>
              </div>

              <div className="group border border-gray-50 bg-gray-50/50 p-3.5 rounded-xl transition-all duration-300">
                <div className="flex justify-between items-start mb-1.5">
                  <h4 className="text-[14px] font-bold text-gray-800 line-clamp-1">Experience</h4>
                </div>
                <div className="flex items-center gap-2 text-[12px] text-gray-500 mt-2 font-medium">
                  <Briefcase size={14} className="text-gray-400" />
                  <span>{professional?.totalExperience || 'Not added yet'}</span>
                </div>
              </div>
            </div>

            <button onClick={() => navigate('/jobs')} className="w-full mt-5 py-2.5 text-blue-600 bg-blue-50/50 border-2 border-blue-100 rounded-xl text-sm font-bold hover:bg-blue-100 hover:border-blue-200 active:scale-95 transition-all">
              View all jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
