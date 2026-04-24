import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/slice/authSlice';
import { useTheme } from '../context/ThemeContext';
import { getMyProfile } from '../services/profile';

const SettingsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { theme, toggleTheme } = useTheme();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeMenu, setActiveMenu] = useState('Password & Security');

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getMyProfile();
        setProfile(data);
      } catch {
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const user = profile?.user;
  const displayLocation = useMemo(() => {
    return [user?.city, user?.state, user?.country].filter(Boolean).join(', ') || 'Location not available';
  }, [user]);

  const settingsMenus = [
    { name: 'Edit Profile', icon: '👤', onClick: () => navigate('/edit-profile') },
    { name: 'Language', icon: '🌐', onClick: () => setActiveMenu('Language') },
    { name: 'Blocking', icon: '🚫', onClick: () => setActiveMenu('Blocking') },
    { name: 'Notification', icon: '🔔', onClick: () => setActiveMenu('Notification') },
    { name: 'Password & Security', icon: '🛡️', onClick: () => setActiveMenu('Password & Security') },
    { name: 'Activity Log', icon: '📄', onClick: () => setActiveMenu('Activity Log') },
    { name: 'Viewing & Sharing', icon: '👁️', onClick: () => setActiveMenu('Viewing & Sharing') },
  ];

  const loginSessions = [
    {
      device: user?.authType === 'google' ? 'Google Session' : 'Current Browser Session',
      location: displayLocation,
      status: 'Active Now',
      icon: '💻',
      color: 'text-blue-400'
    },
    {
      device: theme === 'dark' ? 'Dark Mode Preference' : 'Light Mode Preference',
      location: 'This device',
      status: `Theme: ${theme === 'dark' ? 'Dark' : 'Light'}`,
      icon: '🌓',
      color: 'text-violet-400'
    }
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate('/signin');
  };

  return (
    <div className="flex gap-4 h-full">
      <aside className="w-72 bg-bg-surface rounded-2xl border border-border-ui overflow-hidden shrink-0 h-fit">
        <nav className="flex flex-col">
          {settingsMenus.map((menu) => {
            const isActive = menu.name === activeMenu;

            return (
              <button
                key={menu.name}
                onClick={menu.onClick}
                className={`flex items-center gap-4 px-6 py-4 text-sm transition-all border-l-4 ${
                  isActive
                    ? 'bg-bg-card border-action-blue text-text-main font-bold'
                    : 'border-transparent text-text-sec hover:bg-bg-card/50'
                }`}
              >
                <span className="text-lg">{menu.icon}</span>
                {menu.name}
                {isActive && <span className="ml-auto">❯</span>}
              </button>
            );
          })}
        </nav>
      </aside>

      <main className="flex-1 bg-bg-card rounded-2xl border border-border-ui p-8 overflow-y-auto no-scrollbar">
        <section className="mb-10">
          <h3 className="text-h2 font-bold text-text-main mb-6">Where You're Logged In</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(loading ? [
              { device: 'Loading...', location: 'Please wait', status: 'Fetching account details', icon: '⏳', color: 'text-gray-400' }
            ] : loginSessions).map((login, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-border-ui/50 bg-bg-page/30">
                <span className={`text-3xl ${login.color}`}>{login.icon}</span>
                <div>
                  <h4 className="text-sm font-bold text-text-main">{login.device} · {login.location}</h4>
                  <p className="text-xs text-text-sec mt-1">{login.status}</p>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => navigate('/view-profile')} className="text-action-blue text-xs mt-4 hover:underline">See Profile</button>
        </section>

        <section className="mb-10 max-w-2xl">
          <h3 className="text-h2 font-bold text-text-main mb-6">Change Password</h3>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              navigate('/forgot-password');
            }}
            className="space-y-6"
          >
            {[
              { label: 'Current Password', placeholder: 'Use the secure reset flow' },
              { label: 'New Password', placeholder: 'Password updates happen on the reset screen' },
              { label: 'Re-type new', placeholder: 'Confirm there' },
            ].map((field) => (
              <div key={field.label}>
                <label className="block text-sm text-text-sec mb-2">{field.label}</label>
                <input
                  type="password"
                  placeholder={field.placeholder}
                  disabled
                  className="w-full bg-bg-page border border-border-ui rounded-xl p-3 outline-none text-text-main transition-all text-sm opacity-70 cursor-not-allowed"
                />
              </div>
            ))}
            <div className="flex justify-between items-center pt-2">
              <button type="button" onClick={() => navigate('/forgot-password')} className="text-action-blue text-xs hover:underline">Forgot Password?</button>
              <button className="bg-action-blue hover:opacity-90 text-white px-8 py-2.5 rounded-xl font-bold shadow-lg shadow-action-blue/20 text-sm border border-border-ui">
                Open Reset Flow
              </button>
            </div>
          </form>
        </section>

        <section className="mb-10 pt-6 border-t border-border-ui">
          <h3 className="text-h2 font-bold text-text-main mb-2">Appearance</h3>
          <p className="text-sm text-text-sec mb-6">Switch your app theme</p>
          <div className="flex items-center justify-between gap-4 p-4 bg-bg-page/30 rounded-xl border border-border-ui/50">
            <div className="flex items-start gap-4">
              <span className="text-2xl">🌙</span>
              <div>
                <p className="text-sm font-semibold text-text-main">Theme Mode</p>
                <p className="text-xs text-text-sec leading-relaxed">
                  Current mode: {theme === 'dark' ? 'Dark' : 'Light'}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={toggleTheme}
              className="bg-action-blue hover:opacity-90 text-white px-5 py-2 rounded-xl font-bold text-xs"
            >
              Switch to {theme === 'dark' ? 'Light' : 'Dark'}
            </button>
          </div>
        </section>

        <section className="pt-6 border-t border-border-ui">
          <h3 className="text-h2 font-bold text-text-main mb-2">Account Actions</h3>
          <p className="text-sm text-text-sec mb-6">Quick actions for your account</p>
          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => navigate('/edit-profile')}
              className="bg-bg-page/30 border border-border-ui/50 rounded-xl px-5 py-3 text-sm font-semibold text-text-main hover:bg-bg-page/50 transition-all"
            >
              Go to Edit Profile
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="bg-red-50 border border-red-100 rounded-xl px-5 py-3 text-sm font-semibold text-red-500 hover:bg-red-100 transition-all"
            >
              Logout
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SettingsPage;
