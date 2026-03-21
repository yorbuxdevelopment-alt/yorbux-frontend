import React, { useState } from 'react';
import { X, Plus, Minus } from 'lucide-react';

const EditProfilePhotoModal = ({ isOpen, onClose, profileImage }) => {
  if (!isOpen) return null;

  const [zoom, setZoom] = useState(50);

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-bg-surface rounded-xl shadow-2xl w-full max-w-lg border border-border-ui"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border-ui">
          <h3 className="font-bold text-lg text-text-main">Edit Photo</h3>
          <button onClick={onClose} className="text-text-sec hover:text-red-500 bg-bg-page p-1.5 rounded-full">
            <X size={20} />
          </button>
        </div>

        {/* Image Preview */}
        <div className="p-8 bg-bg-page flex justify-center">
          <div className="w-64 h-64 rounded-full overflow-hidden">
            <img 
              src={profileImage} 
              alt="Profile Preview" 
              className="w-full h-full object-cover" 
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-border-ui">
          {/* Zoom Controls */}
          <div className="flex items-center gap-3 w-1/2">
            <Minus size={20} className="text-text-sec" />
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={zoom}
              onChange={(e) => setZoom(e.target.value)}
              className="w-full h-1.5 bg-border-ui rounded-full appearance-none cursor-pointer"
            />
            <Plus size={20} className="text-text-sec" />
          </div>

          {/* Save Button */}
          <button 
            onClick={onClose}
            className="bg-action-blue text-white px-8 py-2.5 rounded-lg font-bold hover:opacity-90 shadow-lg shadow-action-blue/20"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePhotoModal;