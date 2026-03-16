import React from 'react';
import { Image, Video, Smile } from 'lucide-react';
import PostCard from '../components/feed/PostCard';

const postsData = [
    {
        id: 1,
    },
    {
        id: 2,
    },
];

const CreatePost = () => {
    return (
        <div className="bg-main-card p-4 rounded-xl shadow-sm">
            <div className="flex items-start gap-4">
                <img
                    src="https://i.pravatar.cc/48?u=saleh"
                    alt="User"
                    className="w-12 h-12 rounded-full"
                />
                <div className="w-full">
                    <textarea
                        className="w-full p-3 bg-gray-100 dark:bg-[#3a3b3c] rounded-lg focus:outline-none resize-none text-main-text"
                        rows="2"
                        placeholder="What's happening?"
                    ></textarea>
                    <div className="flex justify-between items-center mt-3">
                        <div className="flex gap-6">
                            <button className="flex items-center gap-2 text-sec-text hover:text-blue-500">
                                <Video size={20} className="text-red-500" />
                                <span className="font-medium">Live</span>
                            </button>
                            <button className="flex items-center gap-2 text-sec-text hover:text-blue-500">
                                <Image size={20} className="text-green-500" />
                                <span className="font-medium">Photo</span>
                            </button>
                            <button className="flex items-center gap-2 text-sec-text hover:text-blue-500">
                                <Smile size={20} className="text-yellow-500" />
                                <span className="font-medium">Feeling</span>
                            </button>
                        </div>
                        <button className="bg-blue-600 text-white px-8 py-2 rounded-lg font-semibold hover:bg-blue-700">
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