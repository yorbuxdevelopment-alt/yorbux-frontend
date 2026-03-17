import React from 'react';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import FriendsList from '../components/widgets/FriendsList';

const members = [
  { id: 1, name: "Radovan SkillArena", role: "Founder & CEO at Trophy" },
  { id: 2, name: "Jess Phillips MP", role: "Video Editor" },
  { id: 3, name: "Lakshitha Jayasin", role: "Digital Marketer" },
  { id: 4, name: "John Doe", role: "Financial Analyst" },
  { id: 5, name: "Jane Smith", role: "Investment Banker" },
  { id: 6, name: "Mike Ross", role: "Portfolio Manager" },
  { id: 7, name: "Harvey Specter", role: "Senior Partner" },
  { id: 8, name: "Donna Paulsen", role: "COO" },
  { id: 9, name: "Louis Litt", role: "Managing Partner" },
];

const MyCommunity = () => {
  return (
    <div className="space-y-6">
      {/* 1. Community Header Stats Card */}
      <div className="bg-card-bg rounded-2xl p-6 border border-border-ui flex items-center justify-between shadow-lg">
        <div className="flex gap-12">
          <div className="text-center">
            <h3 className="text-h2 font-bold text-text-main">52,844</h3>
            <p className="text-xs text-text-sec">Followers</p>
          </div>
          <div className="text-center">
            <h3 className="text-h2 font-bold text-text-main">2,564</h3>
            <p className="text-xs text-text-sec">Following</p>
          </div>
        </div>
        <button className="bg-action-blue hover:opacity-90 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-action-blue/20 text-sm border border-border-ui">
          People You Might Like
        </button>
      </div>

      {/* 2. Members Grid - Forced 3 columns */}
      <div className="grid grid-cols-3 gap-4">
        {members.map((member) => (
          <div 
            key={member.id} 
            className="bg-card-bg rounded-2xl p-4 border border-border-ui hover:border-action-blue/50 transition-all group shadow-sm"
          >
            {/* Member Info */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-bg-page overflow-hidden ring-2 ring-border-ui group-hover:ring-action-blue/30 transition-all shrink-0">
                <img src={`https://i.pravatar.cc/150?u=${member.id}`} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-text-main leading-tight truncate text-xs">{member.name}</h4>
                <p className="text-[10px] text-text-sec mt-1 truncate">{member.role}</p>
              </div>
            </div>

            {/* Social Icons Placeholder */}
            <div className="flex gap-3 mb-4 opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all text-[10px]">
              {['🌐', '📷', '🐦', '🔗'].map((icon, i) => (
                <span key={i} className="cursor-pointer hover:scale-110 transition-transform">{icon}</span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button className="flex-1 bg-bg-page hover:bg-bg-page/80 text-text-sec py-2 rounded-lg text-[9px] font-bold border border-border-ui transition-colors">
                Ignore
              </button>
              <button className="flex-1 bg-action-blue hover:opacity-90 text-white py-2 rounded-lg text-[9px] font-bold shadow-md shadow-action-blue/20 transition-opacity border border-border-ui">
                Follow
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CommunityPage = () => {
  return (
    <div className="bg-bg-page min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-10 px-6 pt-6 bg-bg-page">
        <Navbar />
      </div>

      <div className="max-w-full mx-auto grid grid-cols-12 gap-6 pt-28 px-6">
        <aside className="col-span-2 sticky top-28 h-fit">
          <Sidebar />
        </aside>

        {/* Community Grid takes more space for 3 columns */}
        <main className="col-span-8 h-[calc(100vh-8rem)] overflow-y-auto no-scrollbar pb-6">
          <MyCommunity />
        </main>

        <aside className="col-span-2 sticky top-28 h-[calc(100vh-8rem)] overflow-y-auto no-scrollbar bg-bg-surface rounded-2xl border border-border-ui">
          <FriendsList />
        </aside>
      </div>
    </div>
  );
};

export default CommunityPage;