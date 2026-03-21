import React, { useState } from 'react';
import { Globe, Facebook, Twitter, Instagram } from 'lucide-react';
import ConfirmationModal from './ConfirmationModal';
import ReportConfirmationModal from './ReportConfirmationModal';

const SuggestionCard = () => {
  const [isUnfollowModalOpen, setIsUnfollowModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const user = {
    name: "Radovan SkillArena",
    username: "Whitechapel",
    role: "Founder & CEO at Trophy",
    avatar: "https://i.pravatar.cc/150?u=radovan",
  };

  const handleUnfollowConfirm = () => {
    console.log(`Unfollowed ${user.username}`);
    setIsUnfollowModalOpen(false);
  };

  return (
    <>
      <div className="bg-bg-surface rounded-[24px] shadow-sm border border-border-ui overflow-hidden w-full">
        <div className="flex justify-between items-center px-6 py-4 border-b border-border-ui/50">
          <h3 className="font-bold text-text-main text-lg">You Might Like</h3>
          <button className="text-action-blue font-semibold text-sm hover:underline">
            See All
          </button>
        </div>
        <div className="p-6 flex flex-col items-center">
          <div className="flex items-start w-full gap-4 mb-4">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-10 h-10 rounded-full object-cover bg-gray-100"
            />
            <div className="flex flex-col gap-1">
              <h4 className="font-bold text-text-main text-lg leading-tight">
                {user.name}
              </h4>
              <p className="text-text-sec text-xs font-medium mb-2">
                {user.role}
              </p>
              <div className="flex gap-4 text-text-sec/70">
                <Globe size={18} className="cursor-pointer hover:text-action-blue transition-colors" />
                <Facebook size={18} className="cursor-pointer hover:text-action-blue transition-colors" />
                <Twitter size={18} className="cursor-pointer hover:text-action-blue transition-colors" />
                <Instagram size={18} className="cursor-pointer hover:text-action-blue transition-colors" />
              </div>
            </div>
          </div>
          <div className="flex gap-3 w-full mt-4">
            <button 
              onClick={() => setIsReportModalOpen(true)}
              className="flex-1 py-2 px-4 rounded-lg border border-border-ui text-text-sec font-bold text-sm hover:bg-bg-page transition-all"
            >
              Ignore
            </button>
            <button 
              onClick={() => setIsUnfollowModalOpen(true)}
              className="flex-1 py-2 px-4 rounded-lg bg-action-blue text-white font-bold text-sm hover:opacity-90 shadow-lg shadow-action-blue/20 transition-all"
            >
              Follow
            </button>
          </div>
        </div>
      </div>
      
      <ConfirmationModal 
        isOpen={isUnfollowModalOpen} 
        onClose={() => setIsUnfollowModalOpen(false)}
        onConfirm={handleUnfollowConfirm}
        username={user.username}
      />
      <ReportConfirmationModal 
        isOpen={isReportModalOpen} 
        onClose={() => setIsReportModalOpen(false)}
      />
    </>
  );
};

export default SuggestionCard;