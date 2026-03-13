import React from 'react';

const stories = [
    { id: 1, name: 'Add Story', img: 'https://i.pravatar.cc/150?u=me', isUser: true },
    { id: 2, name: 'John Doe', img: 'https://i.pravatar.cc/150?u=john' },
    { id: 3, name: 'Jane Smith', img: 'https://i.pravatar.cc/150?u=jane' },
    { id: 4, name: 'Mike Ross', img: 'https://i.pravatar.cc/150?u=mike' },
    { id: 5, name: 'Rachel Zane', img: 'https://i.pravatar.cc/150?u=rachel' },
];

const StoryBar = () => {
    return (
        <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar mb-6">
            {stories.map((story) => (
                <div key={story.id} className="flex-shrink-0 flex flex-col items-center space-y-2 cursor-pointer group">
                    <div className={`relative w-16 h-16 rounded-full p-[2px] ${story.isUser ? 'border-2 border-dashed border-blue-500' : 'bg-gradient-to-tr from-yellow-400 to-red-500'}`}>
                        <div className="bg-white p-[2px] rounded-full h-full w-full">
                             <img src={story.img} alt={story.name} className="w-full h-full rounded-full object-cover group-hover:scale-105 transition-transform duration-200" />
                        </div>
                        {story.isUser && (
                            <div className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center border-2 border-white text-xs">
                                <i className="fa-solid fa-plus"></i>
                            </div>
                        )}
                    </div>
                    <span className="text-xs font-medium text-gray-600 truncate w-16 text-center">{story.name}</span>
                </div>
            ))}
        </div>
    );
};

export default StoryBar;
