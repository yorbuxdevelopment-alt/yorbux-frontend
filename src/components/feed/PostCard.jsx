import React from 'react';
import { ThumbsUp, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';

export default function PostCard({ post }) {
  const data = post || {
    author: { name: 'Theresa Webb', avatar: 'https://i.pravatar.cc/48?u=theresa' },
    timestamp: '5 mins ago',
    content: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.',
  };

  return (
    <div className="bg-card-bg rounded-xl p-6 shadow-sm mb-6 border border-border-ui transition-all duration-300">
      {/* User Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <img 
            src={data.author.avatar} 
            className="w-12 h-12 rounded-full border border-border-ui/20" 
            alt={data.author.name} 
          />
          <div>
            <h4 className="font-bold text-text-main text-sm">{data.author.name}</h4>
            <p className="text-xs text-text-sec">{data.timestamp}</p>
          </div>
        </div>
        <button className="text-text-sec hover:text-text-main transition-colors">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Post Content */}
      <p className="text-text-main mb-4 text-sm leading-relaxed">
        {data.content}
      </p>

      {/* Post Actions (Like, Comment, Share) */}
      <div className="flex items-center justify-between border-t border-border-ui/10 pt-4 mt-2">
        <button className="flex items-center gap-2 text-text-sec hover:text-action-blue font-bold text-xs transition-colors p-2 rounded-lg hover:bg-bg-page/50">
          <ThumbsUp size={18} />
          <span>Like</span>
        </button>
        <button className="flex items-center gap-2 text-text-sec hover:text-action-blue font-bold text-xs transition-colors p-2 rounded-lg hover:bg-bg-page/50">
          <MessageCircle size={18} />
          <span>Comment</span>
        </button>
        <button className="flex items-center gap-2 text-text-sec hover:text-action-blue font-bold text-xs transition-colors p-2 rounded-lg hover:bg-bg-page/50">
          <Share2 size={18} />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
}