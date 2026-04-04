import React from 'react';
import { MapPin, Heart, MessageCircle, Bookmark, Clock } from 'lucide-react';

const RecentJobs = () => {
  return (
    <div className="bg-white rounded-[20px] shadow-sm border border-gray-200 w-full overflow-hidden font-sans">
      {/* Header */}
      <div className="bg-gray-50/80 px-5 py-3.5 border-b border-gray-100">
        <h3 className="font-semibold text-gray-600 text-[15px]">Recent Open Jobs</h3>
      </div>

      {/* Inner Card */}
      <div className="m-4 border border-gray-200 rounded-2xl bg-white overflow-hidden">
        {/* Content Section */}
        <div className="p-4 flex justify-between items-start">
          <div className="flex-1 pr-4">
            <h4 className="font-bold text-[#1e293b] text-[17px] leading-tight">Account Executive</h4>
            <p className="text-blue-500 text-[13px] font-medium mt-1 truncate">A N N CAPITAL FINANC...</p>
            <div className="flex items-center gap-1.5 text-gray-500 text-[13px] mt-2.5">
              <MapPin size={14} className="text-gray-400" />
              <span>Raipur</span>
            </div>
          </div>
          {/* Image Placeholder */}
          <div className="w-[60px] h-[60px] bg-gray-100 rounded-xl flex-shrink-0 border border-gray-200"></div>
        </div>

        {/* Stats Row */}
        <div className="border-t border-gray-100 px-4 py-2.5 flex items-center gap-5 text-gray-500">
          <div className="flex items-center gap-1.5 cursor-pointer hover:text-gray-700">
            <Heart size={16} strokeWidth={2} />
            <span className="text-[13px] font-medium">0</span>
          </div>
          <div className="flex items-center gap-1.5 cursor-pointer hover:text-gray-700">
            <MessageCircle size={16} strokeWidth={2} />
            <span className="text-[13px] font-medium">1</span>
          </div>
          <div className="flex items-center gap-1.5 cursor-pointer hover:text-gray-700">
            <Bookmark size={16} strokeWidth={2} />
            <span className="text-[13px] font-medium">0</span>
          </div>
        </div>

        {/* Timestamp */}
        <div className="border-t border-gray-100 px-4 py-2.5 flex items-center gap-2 text-gray-400">
          <Clock size={14} />
          <span className="text-[12px] font-medium">31 March 2026 01:44:54 AM</span>
        </div>
      </div>

      {/* Action Button */}
      <div className="px-4 pb-5 flex justify-center">
        <button className="border border-[#06b6d4] text-[#06b6d4] hover:bg-[#06b6d4]/5 rounded-full px-6 py-1.5 text-[14px] font-semibold transition-colors">
          Read more....
        </button>
      </div>
    </div>
  );
};

export default RecentJobs;