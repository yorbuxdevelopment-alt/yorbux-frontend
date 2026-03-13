import React from 'react';

const Friend = ({ name, avatarUrl, status, time }) => (
    <div className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-all">
        <div className="relative">
            <img src={avatarUrl} alt={name} className="w-10 h-10 rounded-full object-cover" />
            {status === 'online' && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            )}
        </div>
        <div className="flex-1 min-w-0">
             <span className="text-sm font-semibold text-gray-800 block truncate">{name}</span>
             {status !== 'online' && <span className="text-xs text-gray-500">{time}</span>}
        </div>
    </div>
);

const FriendList = () => (
    <div className="space-y-2">
        <h3 className="text-md font-semibold text-gray-600 px-2 mb-2">Friends</h3>
        <Friend name="Kayleigh Bysouth" avatarUrl="https://i.pravatar.cc/150?u=1" status="online" />
        <Friend name="Levizja Vetvendos" avatarUrl="https://i.pravatar.cc/150?u=2" status="offline" time="2 min" />
        <Friend name="Radovan SkillArena" avatarUrl="https://i.pravatar.cc/150?u=radovan" status="online" />
        <Friend name="Alia Bhatt" avatarUrl="https://i.pravatar.cc/150?u=alia" status="offline" time="8 min" />
        <Friend name="Steve Jobs" avatarUrl="https://i.pravatar.cc/150?u=steve" status="online" />
    </div>
);

export default FriendList;
