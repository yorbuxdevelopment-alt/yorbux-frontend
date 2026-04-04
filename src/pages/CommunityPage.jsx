import React, { useState } from 'react';
import { Globe, Facebook, Twitter, Instagram } from 'lucide-react';

// --- Enhanced Dummy Data ---
const membersData = [
  { id: 1, name: "Radovan SkillArena", role: "Founder & CEO at Trophy", isConnected: true },
  { id: 2, name: "Jess Phillips MP", role: "Video Editor", isConnected: false },
  { id: 3, name: "Lakshitha Jayasin", role: "Digital Marketer", isConnected: true },
  { id: 7, name: "Harvey Specter", role: "Senior Partner", isConnected: false },
  { id: 8, name: "Donna Paulsen", role: "COO", isConnected: true },
  { id: 10, name: "Rachel Zane", role: "Paralegal", isConnected: false },
  { id: 11, name: "Katrina Bennett", role: "Associate", isConnected: false },
  { id: 12, name: "Mike Ross", role: "Junior Partner", isConnected: true },
  { id: 13, name: "Louis Litt", role: "Senior Partner", isConnected: false },
  { id: 14, name: "Jessica Pearson", role: "Managing Partner", isConnected: true },
  { id: 15, name: "Robert Zane", role: "Managing Partner", isConnected: false },
  { id: 16, name: "Samantha Wheeler", role: "Senior Partner", isConnected: false },
  { id: 17, name: "Alex Williams", role: "Senior Partner", isConnected: true },
  { id: 18, name: "Brian Altman", role: "Senior Partner", isConnected: false },
  { id: 19, name: "Sheila Sazs", role: "Harvard Administrator", isConnected: true },
];

// --- Connection Card Component ---
const ConnectionCard = ({ member }) => {
    const [isConnected, setIsConnected] = useState(member.isConnected);

    return (
        <div className="bg-bg-surface rounded-[14px] p-5 flex flex-col gap-5 border border-transparent hover:border-border-ui/50 transition-all shadow-sm">
            <div className="flex items-start gap-4">
                <div className="w-[62px] h-[62px] rounded-full overflow-hidden shrink-0 shadow-inner">
                    <img src={`https://i.pravatar.cc/150?u=${member.id}`} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col gap-2.5 overflow-hidden">
                    <div className="leading-tight">
                        <h4 className="text-text-main font-bold text-[15px] truncate tracking-wide">{member.name}</h4>
                        <p className="text-text-sec text-[12px] mt-0.5 truncate font-medium">{member.role}</p>
                    </div>
                    <div className="flex gap-3 text-text-sec">
                        <Globe size={15} className="cursor-pointer hover:text-text-main transition-colors" />
                        <Facebook size={15} className="cursor-pointer hover:text-text-main transition-colors" />
                        <Twitter size={15} className="cursor-pointer hover:text-text-main transition-colors" />
                        <Instagram size={15} className="cursor-pointer hover:text-text-main transition-colors" />
                    </div>
                </div>
            </div>
            <div className="flex gap-3">
                <button className="flex-1 bg-bg-page/50 border border-border-ui hover:bg-bg-page text-text-sec hover:text-text-main py-2.5 rounded-xl text-[13px] font-semibold transition-all">
                    Ignore
                </button>
                {isConnected ? (
                    <button onClick={() => setIsConnected(false)} className="flex-1 bg-transparent border border-border-ui hover:bg-bg-page text-text-main py-2.5 rounded-xl text-[13px] font-semibold transition-all">
                        Disconnect
                    </button>
                ) : (
                    <button onClick={() => setIsConnected(true)} className="flex-1 bg-action-blue hover:opacity-90 text-white py-2.5 rounded-xl text-[13px] font-semibold transition-all shadow-md shadow-action-blue/10">
                        Connect
                    </button>
                )}
            </div>
        </div>
    );
};

const CommunityPage = () => {
  const [visibleCount, setVisibleCount] = useState(9);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  return (
    <div className="space-y-6 pt-4 pb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {membersData.slice(0, visibleCount).map((member) => (
          <ConnectionCard key={member.id} member={member} />
        ))}
      </div>
      
      {visibleCount < membersData.length && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={handleLoadMore}
            className="bg-bg-surface border border-border-ui text-text-main font-bold text-sm px-10 py-3.5 rounded-xl hover:bg-bg-page transition-colors shadow-sm"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default CommunityPage;