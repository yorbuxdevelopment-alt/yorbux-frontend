import React from 'react';
import { Image, Video, Smile } from 'lucide-react';
import PostCard from '../components/feed/PostCard';

const postsData = [
    { id: 1 },
    { id: 2 },
];

const CreatePost = () => {
    return (
        <div className="bg-bg-card p-4 sm:p-6 rounded-xl shadow-sm border border-border-ui w-full"> {/* Added w-full and adjusted padding */}
            <div className="flex items-start gap-3 sm:gap-4"> {/* Adjusted gap */}
                <img
                    src="https://i.pravatar.cc/48?u=saleh"
                    alt="User"
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-border-ui/20 flex-shrink-0" // Adjusted size and added flex-shrink-0
                />
                <div className="w-full">
                    <textarea
                        className="w-full p-3 sm:p-4 bg-bg-page text-text-main placeholder-text-sec rounded-xl focus:outline-none resize-none text-sm border border-border-ui/20" // Adjusted padding and text size
                        rows="2"
                        placeholder="What's happening?"
                    ></textarea>
                    <div className="flex flex-wrap justify-between items-center mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-border-ui/10 gap-2"> {/* Adjusted gap and padding */}
                        <div className="flex gap-4 sm:gap-6"> {/* Adjusted gap */}
                            <button className="flex items-center gap-1 sm:gap-2 text-text-sec hover:text-action-blue transition-colors text-xs sm:text-sm"> {/* Adjusted gap and text size */}
                                <Video size={16} className="text-red-500" /> {/* Adjusted icon size */}
                                <span className="font-medium">Live</span>
                            </button>
                            <button className="flex items-center gap-1 sm:gap-2 text-text-sec hover:text-action-blue transition-colors text-xs sm:text-sm"> {/* Adjusted gap and text size */}
                                <Image size={16} className="text-green-500" /> {/* Adjusted icon size */}
                                <span className="font-medium">Photo</span>
                            </button>
                            <button className="flex items-center gap-1 sm:gap-2 text-text-sec hover:text-action-blue transition-colors text-xs sm:text-sm"> {/* Adjusted gap and text size */}
                                <Smile size={16} className="text-yellow-500" /> {/* Adjusted icon size */}
                                <span className="font-medium">Feeling</span>
                            </button>
                        </div>
                        <button className="bg-action-blue text-white px-6 sm:px-8 py-2 sm:py-2.5 rounded-lg font-bold hover:opacity-90 shadow-lg shadow-action-blue/20 text-sm border border-border-ui"> {/* Adjusted padding and text size */}
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Feed = () => {
  return (
    <div className="space-y-6">
      <CreatePost />
      {postsData.map(post => (
        <PostCard key={post.id} />
      ))}
    </div>
  );
};

export default Feed;