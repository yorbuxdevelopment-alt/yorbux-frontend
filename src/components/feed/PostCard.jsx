import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal, Gift, Image as ImageIcon, Smile, Send } from 'lucide-react';
import ImagePreviewModal from './ImagePreviewModal';
import ShareModal from './ShareModal';

// Helper component for the image grid - THIS IS NOW CORRECTLY INCLUDED
const ImageGrid = ({ images, onImageClick }) => {
  if (!images || images.length === 0) return null;
  if (images.length === 1) {
    return (
      <div className="max-h-[500px] overflow-hidden cursor-pointer" onClick={() => onImageClick(0)}>
        <img src={images[0]} alt="Post content" className="w-full h-full object-cover" />
      </div>
    );
  }
  if (images.length === 2) {
    return (
      <div className="grid grid-cols-2 gap-1">
        <div className="cursor-pointer" onClick={() => onImageClick(0)}><img src={images[0]} alt="Post content 1" className="w-full h-full object-cover" /></div>
        <div className="cursor-pointer" onClick={() => onImageClick(1)}><img src={images[1]} alt="Post content 2" className="w-full h-full object-cover" /></div>
      </div>
    );
  }
  if (images.length === 3) {
    return (
      <div className="grid grid-cols-2 gap-1">
        <div className="col-span-1 row-span-2 cursor-pointer" onClick={() => onImageClick(0)}><img src={images[0]} alt="Post content 1" className="w-full h-full object-cover" /></div>
        <div className="cursor-pointer" onClick={() => onImageClick(1)}><img src={images[1]} alt="Post content 2" className="w-full h-full object-cover" /></div>
        <div className="cursor-pointer" onClick={() => onImageClick(2)}><img src={images[2]} alt="Post content 3" className="w-full h-full object-cover" /></div>
      </div>
    );
  }
  if (images.length >= 4) {
    const remainingImages = images.length - 4;
    return (
      <div className="grid grid-cols-2 grid-rows-2 gap-1">
        {images.slice(0, 3).map((img, index) => (
          <div key={index} className="cursor-pointer" onClick={() => onImageClick(index)}><img src={img} alt={`Post content ${index + 1}`} className="w-full h-full object-cover" /></div>
        ))}
        <div className="relative w-full h-full cursor-pointer" onClick={() => onImageClick(3)}>
          <img src={images[3]} alt="Post content 4" className="w-full h-full object-cover" />
          {remainingImages > 0 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white text-4xl font-bold">+{remainingImages}</span>
            </div>
          )}
        </div>
      </div>
    );
  }
  return null;
};

export default function PostCard({ post }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  const data = {
    author: { name: 'Theresa Webb', avatar: 'https://i.pravatar.cc/48?u=theresa' },
    timestamp: '5 mins ago',
    content: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.',
    images: post?.images || [],
    likes: { count: Math.floor(Math.random() * 100) + 5, users: [`https://i.pravatar.cc/30?u=user${post?.id}a`, `https://i.pravatar.cc/30?u=user${post?.id}b`, `https://i.pravatar.cc/30?u=user${post?.id}c`] },
    comments: Math.floor(Math.random() * 20) + 1,
    shares: Math.floor(Math.random() * 15) + 1,
    ...post,
  };

  const handleImageClick = (index) => {
    setStartIndex(index);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="bg-bg-surface rounded-xl shadow-sm mb-6 border border-border-ui transition-all duration-300">
        <div className="flex justify-between items-start p-6 pb-4">
          <div className="flex items-center gap-3">
            <img src={data.author.avatar} className="w-12 h-12 rounded-full border border-border-ui/20" alt={data.author.name} />
            <div>
              <h4 className="font-bold text-text-main text-sm">{data.author.name}</h4>
              <p className="text-xs text-text-sec">{data.timestamp}</p>
            </div>
          </div>
          <button className="text-text-sec hover:text-text-main transition-colors"><MoreHorizontal size={20} /></button>
        </div>

        <p className="text-text-main mb-4 text-sm leading-relaxed px-6">{data.content}</p>

        <div className="mb-4">
          <ImageGrid images={data.images} onImageClick={handleImageClick} />
        </div>

        <div className="flex items-center justify-between px-6 pb-4">
          <div className="flex items-center">
            <div className="flex -space-x-2">
              {data.likes.users.map((avatar, i) => <img key={i} src={avatar} alt="liker" className="w-7 h-7 rounded-full border-2 border-bg-surface object-cover" />)}
            </div>
            <span className="text-xs text-text-sec ml-2">Liked by <span className="font-bold text-text-main">{data.likes.users[0].split('u=')[1]}</span> and <span className="font-bold text-text-main">{data.likes.count} others</span></span>
          </div>
          <div className="text-xs text-text-sec flex gap-4">
            <span>{data.comments} Comments</span>
            <span>{data.shares} Shares</span>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-border-ui/10 p-2 mx-4">
          <button onClick={() => setIsLiked(!isLiked)} className={`flex items-center gap-2 font-bold text-xs transition-colors p-2 rounded-lg w-1/3 justify-center ${isLiked ? 'text-red-500' : 'text-text-sec hover:bg-bg-page/50'}`}>
            <Heart fill={isLiked ? 'currentColor' : 'none'} size={18} />
            <span>Like</span>
          </button>
          <button onClick={() => setIsCommentOpen(!isCommentOpen)} className="flex items-center gap-2 text-text-sec hover:bg-bg-page/50 font-bold text-xs transition-colors p-2 rounded-lg w-1/3 justify-center">
            <MessageCircle size={18} />
            <span>Comment</span>
          </button>
          <button onClick={() => setIsShareOpen(true)} className="flex items-center gap-2 text-text-sec hover:bg-bg-page/50 font-bold text-xs transition-colors p-2 rounded-lg w-1/3 justify-center">
            <Share2 size={18} />
            <span>Share</span>
          </button>
        </div>

        {isCommentOpen && (
          <div className="p-4 border-t border-border-ui/10 mx-4">
            <div className="flex items-center gap-3">
              <img src="https://i.pravatar.cc/40?u=saleh" alt="Your avatar" className="w-8 h-8 rounded-full" />
              <div className="relative flex-1">
                <input type="text" placeholder="Write a comment..." className="w-full bg-bg-page border border-border-ui rounded-full py-2 px-4 text-sm focus:outline-none" />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                  <button className="p-1 hover:bg-bg-surface rounded-full text-text-sec"><Gift size={16} /></button>
                  <button className="p-1 hover:bg-bg-surface rounded-full text-text-sec"><ImageIcon size={16} /></button>
                  <button className="p-1 hover:bg-bg-surface rounded-full text-text-sec"><Smile size={16} /></button>
                  <button className="p-1 text-action-blue"><Send size={16} /></button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {isModalOpen && <ImagePreviewModal images={data.images} startIndex={startIndex} onClose={() => setIsModalOpen(false)} />}
      <ShareModal isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} />
    </>
  );
}