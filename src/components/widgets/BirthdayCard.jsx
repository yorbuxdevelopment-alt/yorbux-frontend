import React from 'react';
import { Send, Cake } from 'lucide-react';

const BirthdayCard = () => {
  return (
    <div className="bg-bg-surface rounded-[24px] shadow-sm border border-border-ui overflow-hidden w-full">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-border-ui/50">
        <h3 className="font-bold text-text-main text-lg">Birthdays</h3>
        <button className="text-action-blue font-semibold text-sm hover:underline">
          See All
        </button>
      </div>

      <div className="p-5 flex flex-col gap-4">
        {/* Current Birthday Info */}
        <div className="flex items-center gap-4">
          <img 
            src="https://i.pravatar.cc/150?u=edilson" 
            alt="Profile" 
            className="w-14 h-14 rounded-xl object-cover border border-border-ui/50" 
          />
          <div className="flex flex-col">
            <h4 className="font-bold text-text-main text-lg leading-tight">
              Edilson De Carvalho
            </h4>
            <p className="text-text-sec text-sm font-medium">
              Birthday today
            </p>
          </div>
        </div>

        {/* Wish Input Section */}
        <div className="flex gap-2 items-center">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Write on his inbox"
              className="w-full bg-bg-page border-none rounded-xl py-3 px-4 text-text-main text-sm placeholder-text-sec focus:ring-1 focus:ring-action-blue/20 outline-none"
            />
          </div>
          <button className="bg-action-blue/10 p-3 rounded-xl hover:bg-action-blue/20 transition-colors group">
            <Send size={20} className="text-action-blue transform rotate-[-20deg] group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* Upcoming Birthdays Section */}
        <div className="bg-bg-page rounded-[20px] p-4 flex items-center gap-4">
          <div className="bg-[#FFF7ED] w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
            <Cake size={22} className="text-[#F59E0B]" />
          </div>
          <div className="flex flex-col">
            <h5 className="font-bold text-text-main text-base">
              Upcoming birthdays
            </h5>
            <p className="text-text-sec text-xs font-medium">
              See 12 others have upcoming birthdays
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BirthdayCard;