import { Search } from 'lucide-react';

const FriendsList = () => {
    const stories = [
        { name: 'You', avatar: 'https://i.pravatar.cc/50?u=saleh', isYou: true },
        { name: 'John', avatar: 'https://i.pravatar.cc/50?u=john' },
        { name: 'Jane', avatar: 'https://i.pravatar.cc/50?u=jane' },
        { name: 'Mike', avatar: 'https://i.pravatar.cc/50?u=mike' },
        { name: 'Emily', avatar: 'https://i.pravatar.cc/50?u=emily' },
    ];

    const friends = [
        { name: 'Alice', avatar: 'https://i.pravatar.cc/40?u=alice' },
        { name: 'Bob', avatar: 'https://i.pravatar.cc/40?u=bob' },
        { name: 'Charlie', avatar: 'https://i.pravatar.cc/40?u=charlie' },
        { name: 'David', avatar: 'https://i.pravatar.cc/40?u=david' },
        { name: 'Eve', avatar: 'https://i.pravatar.cc/40?u=eve' },
        { name: 'Frank', avatar: 'https://i.pravatar.cc/40?u=frank' },
        { name: 'Grace', avatar: 'https://i.pravatar.cc/40?u=grace' },
        { name: 'Henry', avatar: 'https://i.pravatar.cc/40?u=henry' },
    ];

    return (
        <div className="bg-white rounded-xl p-4 shadow-sm h-full">
            <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                    type="text"
                    placeholder="Search Friends"
                    className="bg-gray-100 rounded-full pl-10 pr-4 py-2 w-full focus:outline-none"
                />
            </div>

            <h3 className="font-semibold text-lg mb-2 text-gray-800">Stories</h3>
            <div className="flex gap-3 mb-4 overflow-x-auto pb-2 -mx-4 px-4">
                {stories.map((story) => (
                    <div key={story.name} className="flex flex-col items-center gap-1 flex-shrink-0">
                        <div className="relative">
                            <img src={story.avatar} alt={story.name} className="w-14 h-14 rounded-full border-4 border-blue-500 p-0.5" />
                            {story.isYou && (
                                <button className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-lg border-2 border-white">+</button>
                            )}
                        </div>
                        <p className="text-xs font-medium">{story.name}</p>
                    </div>
                ))}
            </div>

            <h3 className="font-semibold text-lg mb-2 text-gray-800">Friends</h3>
            <ul className="space-y-3 overflow-y-auto" style={{ height: 'calc(100vh - 250px)' }}>
                {friends.map((friend) => (
                    <li key={friend.name} className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded-lg">
                        <div className="relative">
                            <img src={friend.avatar} alt={friend.name} className="w-10 h-10 rounded-full" />
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                        </div>
                        <span className="font-semibold text-gray-700">{friend.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FriendsList;