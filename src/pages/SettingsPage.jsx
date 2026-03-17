import React from 'react';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';

const SettingsPage = () => {
  const settingsMenus = [
    { name: 'Edit Profile', icon: '👤', path: '/settings/edit-profile' },
    { name: 'Language', icon: '🌐', path: '/settings/language' },
    { name: 'Blocking', icon: '🚫', path: '/settings/blocking' },
    { name: 'Notification', icon: '🔔', path: '/settings/notification' },
    { name: 'Password & Security', icon: '🛡️', active: true, path: '/settings/security' },
    { name: 'Activity Log', icon: '📄', path: '/settings/activity' },
    { name: 'Viewing & Sharing', icon: '👁️', path: '/settings/viewing' },
  ];

  return (
    <div className="bg-bg-page min-h-screen">
      {/* Top Navbar */}
      <div className="fixed top-0 left-0 right-0 z-10 px-6 pt-6 bg-bg-page">
        <Navbar />
      </div>

      <div className="max-w-full mx-auto grid grid-cols-12 gap-6 pt-28 px-6">
        {/* Left Global Sidebar - 2 Columns */}
        <aside className="col-span-2 sticky top-28 h-fit">
          <Sidebar />
        </aside>

        {/* Settings Content Area - 10 Columns */}
        <div className="col-span-10 flex gap-6 h-[calc(100vh-8rem)] pb-6">
          
          {/* 1. Settings Internal Sidebar (Left) */}
          <aside className="w-72 bg-bg-surface rounded-2xl border border-border-ui overflow-hidden shrink-0 h-fit">
            <nav className="flex flex-col">
              {settingsMenus.map((menu) => (
                <button
                  key={menu.name}
                  className={`flex items-center gap-4 px-6 py-4 text-sm transition-all border-l-4 ${
                    menu.active 
                    ? 'bg-bg-card border-action-blue text-text-main font-bold' 
                    : 'border-transparent text-text-sec hover:bg-bg-card/50'
                  }`}
                >
                  <span className="text-lg">{menu.icon}</span>
                  {menu.name}
                  {menu.active && <span className="ml-auto">❯</span>}
                </button>
              ))}
            </nav>
          </aside>

          {/* 2. Settings Main Content (Right) */}
          <main className="flex-1 bg-bg-card rounded-2xl border border-border-ui p-8 overflow-y-auto no-scrollbar">
            
            {/* Where You're Logged In Section */}
            <section className="mb-10">
              <h3 className="text-h2 font-bold text-text-main mb-6">Where You're Logged In</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { device: 'Windows PC', location: 'Sylhet, Bangladesh', status: 'Active Now', icon: '💻', color: 'text-blue-400' },
                  { device: 'Windows Laptop', location: 'Sylhet, Bangladesh', status: '20 minutes ago', icon: '💻', color: 'text-gray-400' },
                  { device: 'Huawei GT3', location: 'Dhaka, Bangladesh', status: '53 minutes ago', icon: '📱', color: 'text-green-400' },
                  { device: 'Samsung Tab', location: 'Sylhet, Bangladesh', status: 'March 31 at 6:40 PM', icon: '📟', color: 'text-green-500' },
                ].map((login, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-border-ui/50 bg-bg-page/30">
                    <span className={`text-3xl ${login.color}`}>{login.icon}</span>
                    <div>
                      <h4 className="text-sm font-bold text-text-main">{login.device} · {login.location}</h4>
                      <p className="text-xs text-text-sec mt-1">{login.status}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="text-action-blue text-xs mt-4 hover:underline">See All</button>
            </section>

            {/* Change Password Form */}
            <section className="mb-10 max-w-2xl">
              <h3 className="text-h2 font-bold text-text-main mb-6">Change Password</h3>
              <form className="space-y-6">
                {[
                  { label: 'Current Password', placeholder: 'Enter current password' },
                  { label: 'New Password', placeholder: 'Enter new password' },
                  { label: 'Re-type new', placeholder: 'Re-type new password' },
                ].map((field) => (
                  <div key={field.label}>
                    <label className="block text-sm text-text-sec mb-2">{field.label}</label>
                    <input 
                      type="password" 
                      placeholder={field.placeholder}
                      className="w-full bg-bg-page border border-border-ui rounded-xl p-3 outline-none focus:border-action-blue text-text-main transition-all text-sm"
                    />
                  </div>
                ))}
                <div className="flex justify-between items-center pt-2">
                  <button type="button" className="text-action-blue text-xs hover:underline">Forgot Password?</button>
                  <button className="bg-action-blue hover:opacity-90 text-white px-8 py-2.5 rounded-xl font-bold shadow-lg shadow-action-blue/20 text-sm border border-border-ui">
                    Save
                  </button>
                </div>
              </form>
            </section>

            {/* 2FA Section */}
            <section className="pt-6 border-t border-border-ui">
              <h3 className="text-h2 font-bold text-text-main mb-2">Two-factor authentication</h3>
              <p className="text-sm text-text-sec mb-6">Text Message (SMS)</p>
              <div className="flex items-start gap-4 p-4 bg-bg-page/30 rounded-xl border border-border-ui/50">
                <span className="text-2xl">💬</span>
                <p className="text-xs text-text-sec leading-relaxed">
                  Use text message (SMS) to receive verification codes. For your protection, phone numbers used for two-factor authentication can't be used to reset your password when two-factor is on.
                </p>
              </div>
            </section>

          </main>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;