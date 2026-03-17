import React from 'react';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';

const ProfilePage = () => {
  return (
    <div className="bg-bg-page min-h-screen">
      {/* Top Navbar */}
      <div className="fixed top-0 left-0 right-0 z-10 px-6 pt-6 bg-bg-page">
        <Navbar />
      </div>

      <div className="max-w-full mx-auto grid grid-cols-12 gap-6 pt-28 px-6">
        {/* Left Sidebar - 2 Columns */}
        <aside className="col-span-2 sticky top-28 h-fit">
          <Sidebar />
        </aside>

        {/* Main Profile Content Area - 10 Columns */}
        <div className="col-span-10 space-y-6 pb-6 h-[calc(100vh-8rem)] overflow-y-auto no-scrollbar">
          
          {/* 1. Profile Header Section */}
          <div className="bg-bg-card rounded-3xl overflow-hidden border border-border-ui shadow-2xl">
            {/* Cover Image */}
            <div className="h-64 md:h-80 bg-gradient-to-r from-brand-navy to-gray-800 relative">
              <img 
                src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80" 
                className="w-full h-full object-cover opacity-80" 
                alt="cover" 
              />
            </div>

            {/* Profile Info Area */}
            <div className="px-8 pb-8 relative">
              {/* Avatar - Negative margin to overlap cover */}
              <div className="relative -mt-20 mb-4 inline-block">
                <div className="w-40 h-40 rounded-full border-4 border-bg-card overflow-hidden shadow-2xl bg-bg-page">
                  <img src="https://i.pravatar.cc/160?u=saleh" alt="profile" className="w-full h-full object-cover" />
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                  <h2 className="text-h1 font-bold text-text-main">Saleh Ahmed</h2>
                  <p className="text-text-sec text-sm">UI Designer</p>
                </div>
                
                {/* Action Button - Guidelines Action Blue */}
                <button className="bg-action-blue hover:opacity-90 text-white px-10 py-3 rounded-xl font-bold shadow-lg shadow-action-blue/20 transition-all text-sm border border-border-ui">
                  Follow
                </button>
              </div>
            </div>
          </div>

          {/* 2. Content Grid: Intro Sidebar + Posts + Suggestions */}
          <div className="grid grid-cols-12 gap-6">
            
            {/* Intro Sidebar (Left) */}
            <aside className="col-span-12 md:col-span-4 space-y-6">
              <div className="bg-bg-card p-6 rounded-2xl border border-border-ui shadow-sm">
                <h3 className="text-xs font-bold text-text-main uppercase tracking-widest mb-6">Intro</h3>
                <ul className="space-y-4">
                  {[
                    { icon: '🌐', text: 'uihut.com' },
                    { icon: '👤', text: 'Male' },
                    { icon: '🎂', text: 'Born June 18, 2001' },
                    { icon: '📍', text: 'Sylhet, Bangladesh' },
                    { icon: '📱', text: 'Facebook salehahmed' },
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-text-sec">
                      <span>{item.icon}</span>
                      <span className="truncate">{item.text}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-border-ui space-y-2">
                  <p className="text-sm font-bold text-text-main">52,844 <span className="text-text-sec font-normal">Followers</span></p>
                  <p className="text-sm font-bold text-text-main">2,564 <span className="text-text-sec font-normal">Following</span></p>
                </div>
              </div>
            </aside>

            {/* Profile Posts (Middle) */}
            <main className="col-span-12 md:col-span-8 space-y-6">
              <div className="bg-bg-card p-6 rounded-2xl border border-border-ui shadow-sm">
                 {/* Simple Post Example */}
                 <div className="flex items-center gap-3 mb-4">
                   <div className="w-10 h-10 rounded-full bg-bg-page" />
                   <div className="flex-1">
                     <h4 className="text-sm font-bold text-text-main">Saleh Ahmed</h4>
                     <p className="text-[10px] text-text-sec">Just Now . Friend</p>
                   </div>
                   <button className="text-text-sec text-h3">...</button>
                 </div>
                 <p className="text-sm text-text-main leading-relaxed mb-4">
                   After 7 1/2 years at Samsung Australia, I am fortunate to have been a part of an amazing company...
                 </p>
                 <div className="bg-bg-page h-64 rounded-xl mb-4" />
              </div>
            </main>

            {/* Right Sidebar Suggestions (Optional, can be removed if FriendsList is used globally) */}
            {/* <aside className="col-span-12 md:col-span-3 space-y-6">
              <div className="bg-bg-card p-5 rounded-2xl border border-border-ui">
                 <div className="flex justify-between items-center mb-4">
                   <h3 className="font-bold text-sm">You Might Like</h3>
                   <span className="text-xs text-action-blue cursor-pointer">See All</span>
                 </div>
                 <div className="flex items-center gap-3 mb-4">
                   <div className="w-10 h-10 rounded-full bg-gray-600" />
                   <div className="flex-1 min-w-0">
                     <p className="text-xs font-bold truncate">Radovan SkillArena</p>
                     <p className="text-[10px] text-text-sec truncate">Founder & CEO</p>
                   </div>
                 </div>
                 <div className="flex gap-2">
                   <button className="flex-1 bg-bg-page py-2 rounded-lg text-[10px] font-bold">Ignore</button>
                   <button className="flex-1 bg-action-blue text-white py-2 rounded-lg text-[10px] font-bold">Follow</button>
                 </div>
              </div>
            </aside> */}

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;