import React from 'react';

const Story = ({ name, avatarUrl, isOnline }) => (
    <div className="flex flex-col items-center space-y-1 text-center cursor-pointer group">
        <div className="relative">
            <img 
                src={avatarUrl} 
                alt={name} 
                className="w-14 h-14 rounded-full object-cover border-2 border-blue-500 group-hover:scale-105 transition-transform duration-200"
            />
            {isOnline && (
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
            )}
        </div>
        <span className="text-xs text-gray-600 w-16 truncate">{name}</span>
    </div>
);

const Stories = () => {
    const storyData = [
        { name: "John Doe", avatarUrl: "https://i.pravatar.cc/150?u=a", isOnline: true },
        { name: "Jane Smith", avatarUrl: "https://i.pravatar.cc/150?u=b", isOnline: false },
        { name: "Peter Jones", avatarUrl: "https://i.pravatar.cc/150?u=c", isOnline: true },
        { name: "Sara Williams", avatarUrl: "https://i.pravatar.cc/150?u=d", isOnline: false },
        { name: "David Brown", avatarUrl: "https://i.pravatar.cc/150?u=e", isOnline: true },
    ];

    return (
        <div>
            <h3 className="text-md font-semibold text-gray-600 px-2 mb-3">Stories</h3>
            <div className="flex space-x-4 overflow-x-auto custom-scrollbar pb-2">
                {storyData.map(story => (
                    <Story key={story.name} {...story} />
                ))}
            </div>
        </div>
    );
};

export default Stories;
