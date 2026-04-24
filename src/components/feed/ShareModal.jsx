import React, { useMemo, useState } from 'react';
import { X, Facebook, Twitter, Linkedin, Mail } from 'lucide-react';

const ShareModal = ({ isOpen, onClose, post }) => {
  if (!isOpen) return null;

  const [copied, setCopied] = useState(false);
  const postId = post?.id || post?._id || '';
  const baseUrl = import.meta.env.VITE_APP_URL || window.location.origin;
  const shareUrl = useMemo(
    () => `${baseUrl.replace(/\/$/, '')}/post/${postId || 'feed'}`,
    [baseUrl, postId]
  );

  const socialButtons = [
    { icon: <Facebook size={24} />, name: 'Facebook' },
    { icon: <Twitter size={24} />, name: 'Twitter' },
    { icon: <Linkedin size={24} />, name: 'LinkedIn' },
    { icon: <Mail size={24} />, name: 'Email' },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-bg-surface rounded-xl shadow-2xl w-full max-w-md border border-border-ui p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg text-text-main">Share Post</h3>
          <button onClick={onClose} className="text-text-sec hover:text-red-500 p-1 rounded-full hover:bg-bg-page">
            <X size={22} />
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4 text-center mb-6">
          {socialButtons.map(btn => (
            <button key={btn.name} className="flex flex-col items-center gap-2 text-text-sec hover:text-action-blue transition-colors">
              <div className="w-14 h-14 bg-bg-page rounded-full flex items-center justify-center">
                {btn.icon}
              </div>
              <span className="text-xs font-medium">{btn.name}</span>
            </button>
          ))}
        </div>

        <div className="relative">
          <input 
            type="text"
            readOnly
            value={shareUrl}
            className="w-full bg-bg-page border border-border-ui rounded-lg p-3 pr-24 text-sm text-text-sec"
          />
          <button
            type="button"
            onClick={handleCopy}
            className="absolute right-1 top-1 bottom-1 bg-action-blue text-white px-4 rounded-md text-sm font-bold hover:opacity-90"
          >
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
