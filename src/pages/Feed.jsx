import React, { useState } from 'react';
import { Image, Video, Smile } from 'lucide-react';
import PostCard from '../components/feed/PostCard';
import CreatePostModal from '../components/feed/CreatePostModal';

// Updated data to ensure ALL posts have images
const postsData = [
    { id: 1, images: [`https://picsum.photos/seed/1/800/600`] },
    { id: 2, images: [`https://picsum.photos/seed/2/800/600`, `https://picsum.photos/seed/3/800/600`] },
    { id: 3, images: [`https://picsum.photos/seed/4/800/600`, `https://picsum.photos/seed/5/800/600`, `https://picsum.photos/seed/6/800/600`] },
    { id: 4, images: [`https://picsum.photos/seed/7/800/600`, `https://picsum.photos/seed/8/800/600`, `https://picsum.photos/seed/9/800/600`, `https://picsum.photos/seed/10/800/600`] },
    { id: 5, images: [`https://picsum.photos/seed/11/800/600`, `https://picsum.photos/seed/12/800/600`, `https://picsum.photos/seed/13/800/600`, `https://picsum.photos/seed/14/800/600`, `https://picsum.photos/seed/15/800/600`] },
    { id: 6, images: [`https://picsum.photos/seed/16/800/600`, `https://picsum.photos/seed/17/800/600`] },
    { id: 7, images: [`https://picsum.photos/seed/18/800/600`] },
    { id: 8, images: [`https://picsum.photos/seed/19/800/600`, `https://picsum.photos/seed/20/800/600`, `https://picsum.photos/seed/21/800/600`] },
];

const CreatePost = ({ onPostClick }) => {
    return (
        <div className="bg-bg-surface p-4 sm:p-6 rounded-xl shadow-sm border border-border-ui w-full">
            <div className="flex items-start gap-3 sm:gap-4">
                <img
                    src="https://i.pravatar.cc/48?u=saleh"
                    alt="User"
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-border-ui/20 flex-shrink-0"
                />
                <div className="w-full">
                    <textarea
                        className="w-full p-3 sm:p-4 bg-bg-page text-text-main placeholder-text-sec rounded-xl focus:outline-none resize-none text-sm border border-border-ui/20"
                        rows="2"
                        placeholder="What's happening?"
                    ></textarea>
                    <div className="flex flex-wrap justify-between items-center mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-border-ui/10 gap-2">
                        <div className="flex gap-4 sm:gap-6">
                            <button className="flex items-center gap-1 sm:gap-2 text-text-sec hover:text-action-blue transition-colors text-xs sm:text-sm">
                                <Video size={16} />
                                <span className="font-medium">Live</span>
                            </button>
                            <button className="flex items-center gap-1 sm:gap-2 text-text-sec hover:text-action-blue transition-colors text-xs sm:text-sm">
                                <Image size={16} />
                                <span className="font-medium">Photo</span>
                            </button>
                            <button className="flex items-center gap-1 sm:gap-2 text-text-sec hover:text-action-blue transition-colors text-xs sm:text-sm">
                                <Smile size={16} />
                                <span className="font-medium">Feeling</span>
                            </button>
                        </div>
                        <button 
                            onClick={onPostClick}
                            className="bg-action-blue text-white px-6 sm:px-8 py-2 sm:py-2.5 rounded-lg font-bold hover:opacity-90 shadow-lg shadow-action-blue/20 text-sm border border-border-ui"
                        >
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Feed = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <CreatePost onPostClick={() => setIsModalOpen(true)} />
      
      {postsData.map(post => (
        <PostCard key={post.id} post={post} />
      ))}

      <CreatePostModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Feed;