import React from 'react';
import { X } from 'lucide-react';

const ReportConfirmationModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    // Backdrop
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Modal Card */}
      <div 
        className="bg-bg-surface rounded-2xl shadow-2xl w-full max-w-sm border border-border-ui text-center p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end">
            <button onClick={onClose} className="text-text-sec hover:text-red-500 bg-bg-page p-1.5 rounded-full">
                <X size={20} />
            </button>
        </div>
        
        <h3 className="font-bold text-xl text-text-main mt-4">
          Thanks for Reporting This Post
        </h3>
        
        <p className="text-text-sec text-base mt-2 mb-8">
          You reported this post to the support team.
        </p>

        <button 
          onClick={onClose}
          className="w-full bg-action-blue text-white py-3 rounded-xl font-bold text-base hover:opacity-90 shadow-lg shadow-action-blue/20 transition-opacity"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default ReportConfirmationModal;