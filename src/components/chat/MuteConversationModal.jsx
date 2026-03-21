import React, { useState } from 'react';
import { X } from 'lucide-react';

const MuteConversationModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [selectedOption, setSelectedOption] = useState('1hour');
  const options = [
    { id: '30min', label: 'For 30 minutes' },
    { id: '1hour', label: 'For 1 Hour' },
    { id: '10hours', label: 'For 10 Hours' },
    { id: '24hours', label: 'For 24 Hours' },
    { id: 'permanent', label: 'Until I will turn it back on' },
  ];

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-bg-surface rounded-xl shadow-2xl w-full max-w-md border border-border-ui p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border-ui">
          <h3 className="font-bold text-lg text-text-main">Mute Conversation</h3>
          <button onClick={onClose} className="text-text-sec hover:text-red-500 p-1 rounded-full hover:bg-bg-page">
            <X size={22} />
          </button>
        </div>

        {/* Radio Options */}
        <div className="py-6 space-y-4">
          {options.map(option => (
            <label key={option.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-bg-page cursor-pointer">
              <input 
                type="radio"
                name="mute-option"
                value={option.id}
                checked={selectedOption === option.id}
                onChange={() => setSelectedOption(option.id)}
                className="w-5 h-5 accent-action-blue"
              />
              <span className="text-text-main font-medium">{option.label}</span>
            </label>
          ))}
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-4 pt-4 border-t border-border-ui">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 rounded-lg text-sm font-bold text-text-sec hover:bg-bg-page"
          >
            Cancel
          </button>
          <button 
            onClick={onClose}
            className="bg-action-blue text-white px-8 py-2.5 rounded-lg text-sm font-bold hover:opacity-90"
          >
            Mute
          </button>
        </div>
      </div>
    </div>
  );
};

export default MuteConversationModal;