import React from 'react';
import { Image, Video, Smile } from 'lucide-react';
import PostCard from '../components/feed/PostCard';

const postsData = [
    { id: 1 },
    { id: 2 },
];

const CreatePost = () => {
    return (
        <div className="bg-card-bg p-6 rounded-xl shadow-sm border border-border-color">
            <div className="flex items-start gap-4">
                <img
                    src="https://i.pravatar.cc/48?u=saleh"
                    alt="User"
                    className="w-12 h-12 rounded-full border border-border-color/20"
                />
                <div className="w-full">
                    <textarea
                        className="w-full p-4 bg-main-bg/50 dark:bg-bg-body/50 rounded-xl focus:outline-none resize-none text-main-text placeholder-sec-text border border-border-color/20"
                        rows="2"
                        placeholder="What's happening?"
                    ></textarea>
                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-border-color/10">
                        <div className="flex gap-6">
                            <button className="flex items-center gap-2 text-sec-text hover:text-action-blue transition-colors">
                                <Video size={20} className="text-red-500" />
                                <span className="font-medium text-sm">Live</span>
                            </button>
                            <button className="flex items-center gap-2 text-sec-text hover:text-action-blue transition-colors">
                                <Image size={20} className="text-green-500" />
                                <span className="font-medium text-sm">Photo</span>
                            </button>
                            <button className="flex items-center gap-2 text-sec-text hover:text-action-blue transition-colors">
                                <Smile size={20} className="text-yellow-500" />
                                <span className="font-medium text-sm">Feeling</span>
                            </button>
                        </div>
                        <button className="bg-action-blue text-white px-8 py-2.5 rounded-lg font-bold hover:opacity-90 shadow-lg shadow-action-blue/20">
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