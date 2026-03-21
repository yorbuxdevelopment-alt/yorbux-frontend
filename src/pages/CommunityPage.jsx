import React, { useState } from 'react';
import { Globe, Facebook, Twitter, Instagram } from 'lucide-react';

// --- Data for Tabs ---
const followersData = [
  { id: 1, name: "Radovan SkillArena", role: "Founder & CEO at Trophy", isFollowing: true },
  { id: 2, name: "Jess Phillips MP", role: "Video Editor", isFollowing: false },
  { id: 3, name: "Lakshitha Jayasin", role: "Digital Marketer", isFollowing: true },
];
const followingData = [
  { id: 7, name: "Harvey Specter", role: "Senior Partner" },
  { id: 8, name: "Donna Paulsen", role: "COO" },
];
const suggestionsData = [
    { id: 10, name: "Rachel Zane", role: "Paralegal" },
    { id: 11, name: "Katrina Bennett", role: "Associate" },
];

// --- Card Components ---
const MemberCard = ({ member }) => (
    <div className="bg-bg-surface rounded-[20px] p-6 flex flex-col items-center text-center border border-transparent hover:border-action-blue/30 transition-all">
      <div className="w-16 h-16 rounded-full overflow-hidden mb-3 ring-4 ring-bg-page">
        <img src={`https://i.pravatar.cc/150?u=${member.id}`} alt={member.name} className="w-full h-full object-cover"/>
      </div>
      <div className="mb-4">
        <h4 className="text-text-main font-semibold text-[15px] mb-1">{member.name}</h4>
        <p className="text-text-sec text-[12px]">{member.role}</p>
      </div>
      <div className="flex gap-4 mb-6 text-text-sec">
        <Globe size={16} className="cursor-pointer hover:text-action-blue" />
        <Facebook size={16} className="cursor-pointer hover:text-action-blue" />
        <Twitter size={16} className="cursor-pointer hover:text-action-blue" />
        <Instagram size={16} className="cursor-pointer hover:text-action-blue" />
      </div>
      <div className="flex gap-3 w-full mt-auto">
        <button className="flex-1 bg-transparent border border-border-ui hover:bg-bg-page text-text-main py-2.5 rounded-xl text-[13px] font-medium transition-colors">Ignore</button>
        <button className="flex-1 bg-action-blue hover:opacity-90 text-white py-2.5 rounded-xl text-[13px] font-medium transition-colors shadow-lg shadow-action-blue/20">Follow</button>
      </div>
    </div>
);
const SuggestionMemberCard = ({ member }) => (
    <div className="bg-bg-surface rounded-[14px] p-5 flex flex-col gap-5 border border-transparent hover:border-border-ui/50 transition-all">
      <div className="flex gap-4">
        <div className="w-[60px] h-[60px] rounded-full overflow-hidden shrink-0">
          <img src={`https://i.pravatar.cc/150?u=${member.id}`} alt={member.name} className="w-full h-full object-cover"/>
        </div>
        <div className="flex flex-col gap-2 overflow-hidden">
          <div>
            <h4 className="text-text-main font-semibold text-[15px] truncate">{member.name}</h4>
            <p className="text-text-sec text-[12px] truncate">{member.role}</p>
          </div>
          <div className="flex gap-3 text-text-sec">
            <Globe size={14} className="cursor-pointer hover:text-text-main" />
            <Facebook size={14} className="cursor-pointer hover:text-text-main" />
            <Twitter size={14} className="cursor-pointer hover:text-text-main" />
            <Instagram size={14} className="cursor-pointer hover:text-text-main" />
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <button className="flex-1 bg-bg-page/50 border border-border-ui hover:bg-bg-page text-text-main py-2 rounded-lg text-[13px] font-medium transition-colors">Ignore</button>
        <button className="flex-1 bg-action-blue hover:opacity-90 text-white py-2 rounded-lg text-[13px] font-medium transition-colors shadow-lg shadow-action-blue/10">Follow</button>
      </div>
    </div>
);
const FollowerCard = ({ member }) => {
    const [isFollowing, setIsFollowing] = useState(member.isFollowing);
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
                {isFollowing ? (
                    <button onClick={() => setIsFollowing(false)} className="flex-1 bg-transparent border border-border-ui hover:bg-bg-page text-text-main py-2.5 rounded-xl text-[13px] font-semibold transition-all">
                        Unfollow
                    </button>
                ) : (
                    <button onClick={() => setIsFollowing(true)} className="flex-1 bg-action-blue hover:opacity-90 text-white py-2.5 rounded-xl text-[13px] font-semibold transition-all shadow-md shadow-action-blue/10">
                        Follow
                    </button>
                )}
            </div>
        </div>
    );
};

const CommunityPage = () => {
  const [activeTab, setActiveTab] = useState('followers');

  const renderGrid = () => {
    let data;
    let CardComponent;

    switch (activeTab) {
      case 'followers':
        data = followersData;
        CardComponent = FollowerCard;
        break;
      case 'following':
        data = followingData;
        CardComponent = MemberCard;
        break;
      case 'suggestions':
        data = suggestionsData;
        CardComponent = SuggestionMemberCard;
        break;
      default:
        data = followersData;
        CardComponent = FollowerCard;
    }
    return data.map((member) => <CardComponent key={member.id} member={member} />);
  };

  const TabButton = ({ tabName, count, label }) => {
    const isActive = activeTab === tabName;
    return (
      <button onClick={() => setActiveTab(tabName)} className={`px-8 py-3 rounded-xl text-sm font-medium transition-all ${isActive ? 'bg-action-blue text-white shadow-lg shadow-action-blue/20' : 'bg-bg-surface text-text-sec'}`}>
        {count ? `${count} ${label}` : label}
      </button>
    );
  };

  return (
    <div className="space-y-6">
      <div className="p-4 mt-4">
        <div className="flex justify-center gap-4">
          <TabButton tabName="followers" count={followersData.length} label="Followers" />
          <TabButton tabName="following" count={followingData.length} label="Following" />
          <TabButton tabName="suggestions" count={suggestionsData.length} label="People You Might Like" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {renderGrid()}
      </div>
    </div>
  );
};

export default CommunityPage;