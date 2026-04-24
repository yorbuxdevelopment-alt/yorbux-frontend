import React from 'react';

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  username,
  title,
  description,
  confirmLabel = 'Confirm'
}) => {
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
        <h3 className="font-bold text-xl text-text-main">
          {title || `Unfollow @${username}`}
        </h3>
        
        <p className="text-text-sec text-base mt-2 mb-8">
          {description || 'Their Tweets will no longer show up in your home timeline.'}
        </p>

        <div className="flex gap-4">
          <button 
            onClick={onClose}
            className="flex-1 bg-bg-page border border-border-ui text-text-sec py-3 rounded-xl font-bold text-base hover:bg-border-ui/50 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            className="flex-1 bg-action-blue text-white py-3 rounded-xl font-bold text-base hover:opacity-90 shadow-lg shadow-action-blue/20 transition-opacity"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
