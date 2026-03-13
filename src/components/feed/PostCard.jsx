import { ThumbsUp, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';

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

            <p className="mt-4">{post.content}</p>

            {post.image && <img src={post.image} alt="Post" className="mt-4 rounded-lg w-full" />}

            <div className="mt-4 flex justify-between text-gray-500">
                <div className="flex gap-1 items-center">
                    <ThumbsUp size={16} />
                    <span>{post.likes} Likes</span>
                </div>
                <div className="flex gap-4">
                    <span>{post.comments} Comments</span>
                    <span>{post.shares} Shares</span>
                </div>
            </div>

            <div className="border-t my-4"></div>

            <div className="flex justify-around">
                <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500 font-semibold">
                    <ThumbsUp size={20} />
                    <span>Like</span>
                </button>
                <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500 font-semibold">
                    <MessageCircle size={20} />
                    <span>Comment</span>
                </button>
                <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500 font-semibold">
                    <Share2 size={20} />
                    <span>Share</span>
                </button>
            </div>

            <div className="border-t my-4"></div>

            <div className="flex items-start gap-3 mt-4">
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

export default PostCard;