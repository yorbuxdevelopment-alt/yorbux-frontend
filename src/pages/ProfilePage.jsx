import React, { useState } from 'react';
import { Camera, Eye, Globe, User, Cake, MapPin, Facebook, Twitter, Instagram, Video, Image as ImageIcon, Smile, MoreHorizontal } from 'lucide-react';
import EditCoverPhotoModal from '../components/profile/EditCoverPhotoModal';
import EditProfilePhotoModal from '../components/profile/EditProfilePhotoModal';
import RightBar from '../components/layout/RightBar';

const ProfilePage = () => {
  const [isCoverModalOpen, setIsCoverModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  
  const coverImage = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80";
  const profileImage = "https://i.pravatar.cc/160?u=saleh";

  return (
    <>
      <div className="space-y-6">
        {/* --- HEADER SECTION --- */}
        <div className="bg-bg-surface rounded-[24px] overflow-hidden shadow-sm border border-border-ui">
          <div className="h-[300px] relative group">
            <img src={coverImage} className="w-full h-full object-cover" alt="cover" />
            <button onClick={() => setIsCoverModalOpen(true)} className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm text-text-sec px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 shadow-sm border border-border-ui hover:bg-white transition-all">
              <Camera size={18} /> Edit Cover Photo
            </button>
          </div>
          <div className="px-10 pb-8 relative flex flex-col md:flex-row items-end justify-between">
            <div className="flex items-end gap-6 -mt-16">
              <div className="relative group">
                <div className="w-[150px] h-[150px] rounded-full border-[6px] border-bg-surface overflow-hidden shadow-md bg-bg-surface">
                  <img src={profileImage} alt="profile" className="w-full h-full object-cover" />
                </div>
                <button onClick={() => setIsProfileModalOpen(true)} className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md border border-border-ui text-text-sec">
                  <Camera size={16} />
                </button>
              </div>
              <div className="mb-2">
                <h2 className="text-text-main text-[28px] font-bold tracking-tight leading-tight">Saleh Ahmed</h2>
                <p className="text-text-sec text-[15px] font-medium">UI Designer</p>
              </div>
            </div>
            <div className="flex items-center gap-3 mb-2">
              <button className="p-3 bg-bg-page text-text-sec rounded-xl hover:bg-border-ui/50 transition-all">
                <Eye size={20} />
              </button>
              <button className="bg-bg-page text-text-main px-6 py-3 rounded-xl font-bold text-sm border border-border-ui hover:bg-border-ui/50 transition-all">
                Edit basic info
              </button>
            </div>
          </div>
        </div>

        {/* --- CONTENT GRID --- */}
        <div className="grid grid-cols-12 gap-6">
          <aside className="col-span-12 lg:col-span-4 space-y-6">
            <div className="bg-bg-surface p-6 rounded-[24px] shadow-sm border border-border-ui">
              <h3 className="text-text-main font-bold text-[14px] uppercase tracking-widest mb-6">Intro</h3>
              <ul className="space-y-4">
                {[
                  { icon: <Globe size={18} />, text: 'uihut.com' },
                  { icon: <User size={18} />, text: 'Male' },
                  { icon: <Cake size={18} />, text: 'Born June 18, 2001' },
                  { icon: <MapPin size={18} />, text: 'Sylhet, Bangladesh' },
                  { icon: <Facebook size={18} />, text: 'Facebook salehahmed' },
                  { icon: <Twitter size={18} />, text: 'Twitter salehahmed' },
                  { icon: <Instagram size={18} />, text: 'Instagram Saleh_ahmed' },
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-[14px] text-text-main font-medium">
                    <span className="text-text-sec">{item.icon}</span>
                    {item.text}
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-6 border-t border-border-ui space-y-3">
                <p className="text-[14px] font-bold text-text-main">52,844 <span className="text-text-sec font-normal">Followers</span></p>
                <p className="text-[14px] font-bold text-text-main">2,564 <span className="text-text-sec font-normal">Following</span></p>
              </div>
              <button className="w-full mt-6 py-3 bg-bg-page text-text-main rounded-xl font-bold text-sm hover:bg-border-ui/50 transition-all">
                Edit Details
              </button>
            </div>
          </aside>
          <main className="col-span-12 lg:col-span-8">
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 xl:col-span-8 space-y-6">
                    <div className="bg-bg-surface p-6 rounded-[24px] shadow-sm border border-border-ui">
                      <div className="flex gap-4 items-center">
                        <img src="https://i.pravatar.cc/100?u=saleh" className="w-11 h-11 rounded-xl" alt="" />
                        <input type="text" placeholder="What's happening?" className="flex-1 bg-bg-page border-none rounded-xl py-3 px-5 text-sm focus:ring-1 focus:ring-action-blue" />
                      </div>
                      <div className="flex justify-between items-center mt-6">
                        <div className="flex gap-6">
                          <button className="flex items-center gap-2 text-text-sec text-sm font-bold hover:text-text-main"><Video size={18} /> Live Video</button>
                          <button className="flex items-center gap-2 text-text-sec text-sm font-bold hover:text-text-main"><ImageIcon size={18} /> Photo/Video</button>
                          <button className="flex items-center gap-2 text-text-sec text-sm font-bold hover:text-text-main"><Smile size={18} /> Feeling</button>
                        </div>
                        <button className="bg-action-blue text-white px-10 py-2.5 rounded-xl font-bold text-sm shadow-md shadow-action-blue/20">Post</button>
                      </div>
                    </div>
                    <div className="bg-bg-surface p-6 rounded-[24px] shadow-sm border border-border-ui">
                       <div className="flex items-center justify-between mb-5">
                         <div className="flex items-center gap-3">
                           <img src="https://i.pravatar.cc/100?u=saleh" className="w-11 h-11 rounded-xl" alt="" />
                           <div>
                             <h4 className="text-[14px] font-bold text-text-main">Saleh ahmed</h4>
                             <p className="text-[11px] text-text-sec font-medium">Just Now . Friend</p>
                           </div>
                         </div>
                         <button className="text-text-sec hover:text-text-main"><MoreHorizontal size={20} /></button>
                       </div>
                       <p className="text-[14px] text-text-main leading-relaxed mb-4">
                         After 7 1/2 years at Samsung Australia, I am fortunate to have been a part of an amazing company and have done some amazing things.
                       </p>
                       <div className="bg-bg-page h-[300px] rounded-[20px] overflow-hidden">
                          <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80" className="w-full h-full object-cover opacity-90" alt="" />
                       </div>
                    </div>
                </div>
                <aside className="col-span-12 xl:col-span-4 space-y-6">
                    <RightBar />
                </aside>
            </div>
          </main>
        </div>
      </div>
      <EditCoverPhotoModal isOpen={isCoverModalOpen} onClose={() => setIsCoverModalOpen(false)} coverImage={coverImage} />
      <EditProfilePhotoModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} profileImage={profileImage} />
    </>
  );
};

export default ProfilePage;