import React, { useState, useRef, useEffect } from 'react';
import { X, ChevronDown, Check, Globe, Users, User, Video, Image as ImageIcon, Smile, Send } from 'lucide-react';

const CreatePostModal = ({ isOpen, onClose }) => {
  const [visibility, setVisibility] = useState('Friends');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showImagePreview, setShowImagePreview] = useState(true);
  const dropdownRef = useRef(null);

  const visibilityOptions = {
    'Friends': { icon: <Users size={16} />, text: 'Friends' },
    'Public': { icon: <Globe size={16} />, text: 'Public' },
    'Only me': { icon: <User size={16} />, text: 'Only me' },
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-bg-surface rounded-xl shadow-2xl w-full max-w-lg border border-border-ui" onClick={(e) => e.stopPropagation()}>
        
        <div className="flex items-center justify-between p-4 border-b border-border-ui">
          <h3 className="font-bold text-lg text-text-main">Create a post</h3>
          <div className="flex items-center gap-2">
            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="bg-bg-page text-text-sec text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1">
                <span>Visible for: {visibility}</span>
                <ChevronDown size={16} />
              </button>
              {isDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-bg-card border border-border-ui rounded-lg shadow-xl z-10">
                  {Object.keys(visibilityOptions).map(key => (
                    <div key={key} onClick={() => { setVisibility(key); setIsDropdownOpen(false); }} className="flex items-center justify-between p-3 hover:bg-bg-page cursor-pointer">
                      <div className="flex items-center gap-2 text-text-main">
                        {visibilityOptions[key].icon}
                        <span className="text-sm font-medium">{visibilityOptions[key].text}</span>
                      </div>
                      {visibility === key && <Check size={18} className="text-action-blue" />}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button onClick={onClose} className="text-text-sec hover:text-red-500 bg-bg-page p-1.5 rounded-full"><X size={20} /></button>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-start gap-4">
            <img src="https://i.pravatar.cc/48?u=saleh" alt="User" className="w-12 h-12 rounded-full border border-border-ui/20" />
            <textarea
              className="w-full p-2 bg-transparent text-text-main placeholder-text-sec rounded-lg focus:outline-none resize-none text-lg"
              rows="3"
              defaultValue="After 7 1/2 years at Samsung Australia, I am fortunate to have been a part of an amazing company and have done some amazing things."
            ></textarea>
          </div>

          {showImagePreview && (
            <div className="mt-4 relative">
              <div className="h-64 rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80" 
                  alt="Preview" 
                  className="w-full h-full object-cover"
                />
              </div>
              <button 
                onClick={() => setShowImagePreview(false)}
                className="absolute top-2 right-2 bg-black/50 text-white p-1.5 rounded-full hover:bg-black/70"
              >
                <X size={18} />
              </button>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center p-4 border-t border-border-ui">
          <div className="flex gap-6">
            <button className="flex items-center gap-2 text-text-sec hover:text-action-blue"><Video size={20} /> <span className="font-medium text-sm">Live Video</span></button>
            <button className="flex items-center gap-2 text-text-sec hover:text-action-blue"><ImageIcon size={20} /> <span className="font-medium text-sm">Photo/Video</span></button>
            <button className="flex items-center gap-2 text-text-sec hover:text-action-blue"><Smile size={20} /> <span className="font-medium text-sm">Feeling</span></button>
          </div>
          <button className="bg-action-blue text-white px-8 py-2.5 rounded-lg font-bold hover:opacity-90 shadow-lg shadow-action-blue/20">Post</button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;