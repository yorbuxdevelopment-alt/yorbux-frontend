import { Video, Image, Smile } from 'lucide-react';

const CreatePost = () => {
    return (
        <div className="bg-white p-4 rounded-xl shadow-sm">
            <div className="flex items-start gap-4">
                <img
                    src="https://i.pravatar.cc/40?u=saleh"
                    alt="User"
                    className="w-12 h-12 rounded-full"
                />
                <div className="w-full">
          <textarea
              className="w-full p-2 bg-gray-100 rounded-lg focus:outline-none"
              rows="2"
              placeholder="What's happening?"
          ></textarea>
                    <div className="flex justify-between items-center mt-2">
                        <div className="flex gap-4">
                            <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500">
                                <Video size={20} className="text-red-500" />
                                <span>Live</span>
                            </button>
                            <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500">
                                <Image size={20} className="text-green-500" />
                                <span>Photo</span>
                            </button>
                            <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500">
                                <Smile size={20} className="text-yellow-500" />
                                <span>Feeling</span>
                            </button>
                        </div>
                        <button className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600">
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;