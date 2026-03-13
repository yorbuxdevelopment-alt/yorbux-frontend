import React from 'react';
import { Search, Gift, Send } from 'lucide-react';

// Mock Data
const friendsData = [
  { name: "Kayleigh Bysouth", avatarUrl: "https://i.pravatar.cc/150?u=1", status: "online" },
  { name: "Levizja Vetvendos", avatarUrl: "https://i.pravatar.cc/150?u=2", status: "offline", time: "2 min" },
  { name: "Radovan SkillArena", avatarUrl: "https://i.pravatar.cc/150?u=radovan", status: "online" },
  { name: "Alia Bhatt", avatarUrl: "https://i.pravatar.cc/150?u=alia", status: "offline", time: "8 min" },
  { name: "Steve Jobs", avatarUrl: "https://i.pravatar.cc/150?u=steve", status: "online" },
];

// FriendItem Component
const FriendItem = ({ friend }) => (
  <div className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-all">
    <div className="relative">
      <img src={friend.avatarUrl} alt={friend.name} className="w-10 h-10 rounded-full object-cover" />
      {friend.status === 'online' && (
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
      )}
    </div>
    <div className="flex-1 min-w-0">
      <span className="text-sm font-semibold text-gray-800 block truncate">{friend.name}</span>
      {friend.status !== 'online' && <span className="text-xs text-gray-500">{friend.time}</span>}
    </div>
  </div>
);

// BirthdayWidget Component
const BirthdayWidget = () => (
  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
    <div className="flex items-center space-x-4 mb-3">
      <div className="p-2 bg-blue-100 text-[#377DFF] rounded-lg">
        <Gift size={24} />
      </div>
      <p className="text-sm text-gray-700">
        <span className="font-semibold">Edilson De Carvalho</span>'s birthday is today.
      </p>
    </div>
    <div className="relative">
      <input
        type="text"
        placeholder="Write on his inbox..."
        className="w-full bg-gray-100 border-transparent rounded-lg py-2 pl-3 pr-10 text-xs outline-none focus:ring-2 focus:ring-[#377DFF]/50 transition-all"
      />
      <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#377DFF]">
        <Send size={16} />
      </button>
    </div>
  </div>
);

// FriendList Component
const FriendList = () => (
  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
    <h3 className="font-bold text-gray-800 text-md mb-4">Contacts</h3>
    <div className="relative mb-4">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
      <input
        type="text"
        placeholder="Search Friends"
        className="w-full bg-gray-100 border-transparent rounded-full py-2 pl-9 pr-4 text-xs outline-none focus:ring-2 focus:ring-[#377DFF]/50"
      />
    </div>
    <div className="space-y-2 max-h-[calc(100vh-450px)] overflow-y-auto custom-scrollbar pr-1">
      {friendsData.map((friend) => (
        <FriendItem key={friend.name} friend={friend} />
      ))}
    </div>
  </div>
);

// RightAside Component
const RightAside = () => {
  return (
    <div className="sticky top-20 h-[calc(100vh-100px)] space-y-6">
      <BirthdayWidget />
      <FriendList />
    </div>
  );
};

export default RightAside;
