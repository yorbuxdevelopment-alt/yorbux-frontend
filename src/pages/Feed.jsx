import React, { useState } from 'react';
import { ThumbsUp, MessageCircle, Share2, MoreHorizontal, Image, Video, Smile } from 'lucide-react';

const postsData = [
    {
        id: 1,
        author: {
            name: 'Theresa Webb',
            avatar: 'https://i.pravatar.cc/48?u=theresa',
        },
        timestamp: '5 mins ago',
        content: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
        image: 'https://images.unsplash.com/photo-1559163499-413818121462?q=80&w=2070&auto=format&fit=crop',
        likes: 23,
        comments: 5,
        shares: 2,
    },
    {
        id: 2,
        author: {
            name: 'Calvin Flores',
            avatar: 'https://i.pravatar.cc/48?u=calvin',
        },
        timestamp: '3 hours ago',
        content: 'Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
        likes: 10,
        comments: 1,
        shares: 0,
    },
];

const CreatePost = () => {
    return (
        <div className="bg-white p-4 rounded-xl shadow-sm">
            <div className="flex items-start gap-4">
                <img
                    src="https://i.pravatar.cc/48?u=saleh"
                    alt="User"
                    className="w-12 h-12 rounded-full"
                />
                <div className="w-full">
                    <textarea
                        className="w-full p-3 bg-gray-100 rounded-lg focus:outline-none resize-none"
                        rows="2"
                        placeholder="What's happening?"
                    ></textarea>
                    <div className="flex justify-between items-center mt-3">
                        <div className="flex gap-6">
                            <button className="flex items-center gap-2 text-gray-500 hover:text-[#1877F2]">
                                <Video size={20} className="text-red-500" />
                                <span className="font-medium">Live</span>
                            </button>
                            <button className="flex items-center gap-2 text-gray-500 hover:text-[#1877F2]">
                                <Image size={20} className="text-green-500" />
                                <span className="font-medium">Photo</span>
                            </button>
                            <button className="flex items-center gap-2 text-gray-500 hover:text-[#1877F2]">
                                <Smile size={20} className="text-yellow-500" />
                                <span className="font-medium">Feeling</span>
                            </button>
                        </div>
                        <button className="bg-[#1877F2] text-white px-8 py-2 rounded-lg font-semibold hover:bg-blue-700">
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const PostCard = ({ post }) => {
    return (
        <div className="bg-white p-4 rounded-xl shadow-sm">
            <div className="flex justify-between items-start">
                <div className="flex gap-3">
                    <img src={post.author.avatar} alt={post.author.name} className="w-12 h-12 rounded-full" />
                    <div>
                        <p className="font-semibold">{post.author.name}</p>
                        <p className="text-sm text-gray-500">{post.timestamp}</p>
                    </div>
                </div>
                <button className="text-gray-500 hover:text-gray-700">
                    <MoreHorizontal size={24} />
                </button>
            </div>

            <p className="mt-4 text-gray-800">{post.content}</p>

            {post.image && <img src={post.image} alt="Post" className="mt-4 rounded-lg w-full" />}

            <div className="mt-4 flex justify-between text-gray-500 text-sm">
                <div className="flex gap-1 items-center">
                    <ThumbsUp size={16} className="text-blue-500"/>
                    <span>{post.likes} Likes</span>
                </div>
                <div className="flex gap-4">
                    <span>{post.comments} Comments</span>
                    <span>{post.shares} Shares</span>
                </div>
            </div>

            <div className="border-t my-3"></div>

            <div className="flex justify-around text-gray-600 font-semibold">
                <button className="flex items-center gap-2 hover:text-[#1877F2] p-2 rounded-lg">
                    <ThumbsUp size={20} />
                    <span>Like</span>
                </button>
                <button className="flex items-center gap-2 hover:text-[#1877F2] p-2 rounded-lg">
                    <MessageCircle size={20} />
                    <span>Comment</span>
                </button>
                <button className="flex items-center gap-2 hover:text-[#1877F2] p-2 rounded-lg">
                    <Share2 size={20} />
                    <span>Share</span>
                </button>
            </div>

            <div className="border-t my-3"></div>

            <div className="flex items-start gap-3">
                <img src="https://i.pravatar.cc/40?u=saleh" alt="User" className="w-10 h-10 rounded-full" />
                <div className="w-full relative">
                    <input
                        type="text"
                        placeholder="Write a comment..."
                        className="w-full bg-gray-100 rounded-full py-2 px-4 focus:outline-none"
                    />
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
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Feed;