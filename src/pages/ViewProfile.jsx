import React from 'react';
import { MapPin, CheckCircle, Copy, Share2, Send, UserPlus, LogOut, Trash2 } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

const ViewProfile = () => {
//   const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-slate-50 via-blue-50/30 to-teal-50/20 -m-4 sm:-m-6 p-4 md:p-6 lg:p-8 overflow-hidden relative rounded-xl">
      {/* --- GEOMETRIC PATTERN OVERLAY --- */}
      <div 
        className="absolute inset-0 opacity-[0.25] pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '32px 32px' }}
      ></div>

      {/* --- FULL WIDTH CONTAINER --- */}
      <div className="w-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 relative z-10">
        
        {/* --- LEFT SIDEBAR (3 COLS) --- */}
        <div className="col-span-1 lg:col-span-3 space-y-6">
          
          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 overflow-hidden">
            <div className="h-24 bg-gradient-to-r from-blue-600 to-indigo-500 relative overflow-hidden">
               <div className="absolute inset-0 bg-black/10"></div>
            </div>
            <div className="px-5 pb-6 relative">
              <div className="w-24 h-24 rounded-full border-4 border-white bg-gray-200 mx-auto -mt-12 overflow-hidden shadow-md relative z-10">
                <img src="https://i.pravatar.cc/150?u=parmanand" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div className="text-center mt-4 mb-6">
                <h2 className="text-gray-900 font-extrabold text-[17px] leading-tight">Mr. Parmanand Parihar</h2>
                <div className="flex items-center justify-center gap-1.5 text-gray-500 text-[13px] mt-1.5 font-medium">
                  <MapPin size={14} className="text-blue-500" />
                  <span>Indore, Madhya Pradesh</span>
                </div>
              </div>
              <div className="flex justify-around text-center border-t border-gray-100 py-4 mb-4">
                <div>
                  <p className="text-[18px] font-black text-blue-600">3</p>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">Connections</p>
                </div>
                <div className="w-px bg-gray-100 h-10"></div>
                <div>
                  <p className="text-[18px] font-black text-blue-600">0</p>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">Approval</p>
                </div>
              </div>
              
              <div className="flex flex-col gap-3">
                <button className="w-full py-2.5 text-white bg-blue-600 rounded-xl text-[14px] font-bold hover:bg-blue-700 active:scale-95 transition-all shadow-md shadow-blue-600/25 flex items-center justify-center gap-2">
                  <LogOut size={16} /> Log Out
                </button>
                <button className="w-full py-2.5 text-red-500 border-2 border-red-100 bg-red-50/50 rounded-xl text-[14px] font-bold hover:bg-red-50 hover:border-red-200 active:scale-95 transition-all flex items-center justify-center gap-2">
                  <Trash2 size={16} /> Delete Account
                </button>
              </div>
            </div>
          </div>

          {/* Referral Code Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center hover:shadow-md transition-shadow">
            <h3 className="text-gray-900 font-extrabold text-[15px]">Referral Code</h3>
            <p className="text-[12px] font-bold text-blue-500 mt-1 mb-4">( Invite Friends to Join )</p>
            
            <div className="bg-blue-50/50 border-2 border-blue-100 border-dashed rounded-xl py-3 px-4 flex items-center justify-center mb-5">
              <span className="text-[18px] font-black text-gray-800 tracking-wider">pNtt4d</span>
            </div>
            
            <div className="flex items-center justify-center gap-4">
              <button className="p-2.5 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 hover:scale-105 active:scale-95 transition-all" title="Copy">
                <Copy size={16} />
              </button>
              <button className="p-2.5 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 hover:scale-105 active:scale-95 transition-all" title="Share">
                <Share2 size={16} />
              </button>
              <button className="p-2.5 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 hover:scale-105 active:scale-95 transition-all" title="Telegram">
                <Send size={16} />
              </button>
            </div>
          </div>

          {/* Profiling Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center gap-3 text-gray-800 font-bold text-[14px] mb-4">
              <div className="p-2 bg-blue-50 rounded-lg">
                <CheckCircle size={18} className="text-blue-500" />
              </div>
              Profiling
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 mb-2 overflow-hidden shadow-inner">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-400 h-2 rounded-full relative" style={{ width: '0%' }}></div>
            </div>
            <div className="text-right text-[12px] text-gray-500 font-bold">0% Completed</div>
          </div>
        </div>

        {/* --- MAIN CONTENT (6 COLS) --- */}
        <div className="col-span-1 lg:col-span-6 space-y-6">
          
          {/* About You Card */}
          <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 p-6 min-h-[140px]">
            <h3 className="text-[16px] font-extrabold text-gray-900 mb-4">About You</h3>
            <p className="text-[14px] text-gray-400 italic">No description added yet.</p>
          </div>

          {/* Professional Details Card */}
          <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 p-6">
            <div className="border-b border-gray-200 mb-2">
              <h3 className="text-[15px] font-extrabold text-blue-600 border-b-2 border-blue-600 pb-3 inline-block -mb-[1px]">Professional</h3>
            </div>
            
            <div className="flex flex-col">
              {['Organisation', 'Total Experience', 'Designation', 'Previous Organisation', 'Previous Designation'].map((label, index) => (
                <div key={index} className="grid grid-cols-1 sm:grid-cols-3 py-4 border-b border-gray-100 last:border-0 items-center gap-2">
                  <div className="text-[13px] font-bold text-gray-500 col-span-1">{label}</div>
                  <div className="text-[14px] font-bold text-gray-900 col-span-2">-</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- RIGHT SIDEBAR (3 COLS) --- */}
        <div className="col-span-1 lg:col-span-3 space-y-6">
          
          {/* User Suggestions Card */}
          <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 p-6">
            <h3 className="text-gray-900 font-extrabold text-[15px] mb-5 border-b border-gray-100 pb-4">User Suggestions</h3>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <img src={`https://i.pravatar.cc/150?img=${i + 10}`} alt="User" className="w-10 h-10 rounded-full object-cover border border-gray-100 group-hover:border-blue-200 transition-colors" />
                    <div>
                      <h4 className="text-[13px] font-bold text-blue-600 group-hover:text-blue-700 transition-colors line-clamp-1">User Name {i}</h4>
                      <p className="text-[11px] text-gray-500 font-medium mt-0.5">Location, City</p>
                    </div>
                  </div>
                  <button className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors" title="Add User">
                    <UserPlus size={16} />
                  </button>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2.5 text-blue-600 bg-white border-2 border-blue-100 rounded-xl text-[13px] font-bold hover:bg-blue-50 active:scale-95 transition-all">
              Show all
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ViewProfile;