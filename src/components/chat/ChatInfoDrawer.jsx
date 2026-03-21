import React, { useState } from 'react';
import { X, Check, Volume2, Ban, Trash2, FileText, Image as ImageIcon, Video, MoreHorizontal, ChevronRight, Globe, Facebook, Twitter, Instagram } from 'lucide-react';
import MuteConversationModal from './MuteConversationModal';

const ProfileSection = ({ user }) => (
  <div className="bg-bg-page w-full rounded-[24px] p-10 flex flex-col items-center text-center shadow-sm">
    <div className="w-[100px] h-[100px] rounded-full overflow-hidden mb-6">
      <img 
        src={user?.avatar || "https://i.pravatar.cc/150?u=lakshitha"} 
        alt="Profile" 
        className="w-full h-full object-cover"
      />
    </div>
    <h3 className="text-text-main font-bold text-[20px] tracking-tight mb-1">
      {user?.name || "Lakshitha Jayasinghe"}
    </h3>
    <p className="text-text-sec text-[14px] font-medium mb-5">
      UI designer
    </p>
    <div className="flex items-center gap-2 text-text-main text-[14px] font-bold">
      <span>Active now</span>
      <span className="w-2.5 h-2.5 bg-green-500 rounded-full shadow-sm" />
    </div>
  </div>
);

const PrivacySupport = ({ onMuteClick }) => {
  const menuItems = [
    { name: 'Mark as Unread', icon: <Check size={20} strokeWidth={2.5} />, action: () => {} },
    { name: 'Mute Conversation', icon: <Volume2 size={20} strokeWidth={2.5} />, action: onMuteClick },
    { name: 'Block', icon: <Ban size={20} strokeWidth={2.5} />, action: () => {} },
    { name: 'Delete Chat', icon: <Trash2 size={20} strokeWidth={2.5} />, action: () => {} },
  ];

  return (
    <div className="bg-bg-page w-full rounded-[24px] p-6 shadow-sm">
      <h4 className="text-text-main font-bold text-[18px] mb-5 px-1 tracking-tight">
        Privacy & Support
      </h4>
      <hr className="border-border-ui/50 mb-6" />
      <div className="space-y-6">
        {menuItems.map((item, index) => (
          <div key={index} onClick={item.action} className="flex items-center gap-4 cursor-pointer group px-1">
            <div className="text-text-sec opacity-80 group-hover:opacity-100 transition-opacity">
              {item.icon}
            </div>
            <span className={`font-bold text-[16px] tracking-tight group-hover:text-action-blue transition-colors ${index === 3 ? 'text-red-500' : 'text-text-sec'}`}>
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const SharedFiles = () => {
  const fileTypes = [
    { name: 'Documents', count: 85, size: '195MB', icon: <FileText size={20} className="text-text-sec" /> },
    { name: 'Photo', count: 78, size: '43MB', icon: <ImageIcon size={20} className="text-text-sec" /> },
    { name: 'Video', count: 6, size: '92MB', icon: <Video size={20} className="text-text-sec" /> },
    { name: 'Other', count: 62, size: '136MB', icon: <MoreHorizontal size={20} className="text-text-sec" /> },
  ];

  return (
    <div className="bg-bg-page w-full rounded-[24px] p-6 shadow-sm">
      <h4 className="text-text-main font-bold text-[18px] mb-5 px-1">Shared Files</h4>
      <div className="space-y-4">
        {fileTypes.map((file, index) => (
          <div key={index} className="flex items-center justify-between group cursor-pointer hover:bg-bg-surface/50 p-2 rounded-xl transition-all">
            <div className="flex items-center gap-4">
              <div className="w-[54px] h-[54px] bg-bg-surface rounded-[16px] flex items-center justify-center shadow-sm border border-border-ui/50">
                {file.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-text-main font-bold text-[15px]">{file.name}</span>
                <span className="text-text-sec text-[13px] font-medium">
                  {file.count} files, {file.size}
                </span>
              </div>
            </div>
            <ChevronRight size={22} className="text-text-sec opacity-80 group-hover:translate-x-1 transition-transform" />
          </div>
        ))}
      </div>
    </div>
  );
};

const ChatInfoDrawer = ({ user, isOpen, onClose }) => {
  const [isMuteModalOpen, setIsMuteModalOpen] = useState(false);

  if (!isOpen || !user) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-[999]" onClick={onClose}>
        <div 
          className={`fixed top-0 right-0 h-full bg-bg-surface border-l border-border-ui shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} w-80 z-[1000]`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 flex flex-col items-center h-full overflow-y-auto no-scrollbar">
            <button onClick={onClose} className="absolute top-4 right-4 text-text-sec hover:text-red-500"><X size={24} /></button>
            <div className="mt-8 w-full">
              <ProfileSection user={user} />
            </div>
            <div className="mt-6 w-full">
              <PrivacySupport onMuteClick={() => setIsMuteModalOpen(true)} />
            </div>
            <div className="mt-4 w-full">
              <SharedFiles />
            </div>
          </div>
        </div>
      </div>
      <MuteConversationModal isOpen={isMuteModalOpen} onClose={() => setIsMuteModalOpen(false)} />
    </>
  );
};

export default ChatInfoDrawer;