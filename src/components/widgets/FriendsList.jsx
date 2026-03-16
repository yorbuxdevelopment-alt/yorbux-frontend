import React, { useRef, useState, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

const FriendsList = () => {
    const stories = [
        { name: 'You', avatar: 'https://i.pravatar.cc/50?u=saleh', isYou: true },
        { name: 'John', avatar: 'https://i.pravatar.cc/50?u=john' },
        { name: 'Jane', avatar: 'https://i.pravatar.cc/50?u=jane' },
        { name: 'Mike', avatar: 'https://i.pravatar.cc/50?u=mike' },
        { name: 'Emily', avatar: 'https://i.pravatar.cc/50?u=emily' },
        { name: 'Alice', avatar: 'https://i.pravatar.cc/50?u=alice' },
        { name: 'Bob', avatar: 'https://i.pravatar.cc/50?u=bob' },
        { name: 'Charlie', avatar: 'https://i.pravatar.cc/50?u=charlie' },
    ];

    const friends = [
        { name: 'Alice', avatar: 'https://i.pravatar.cc/40?u=alice' },
        { name: 'Bob', avatar: 'https://i.pravatar.cc/40?u=bob' },
        { name: 'Charlie', avatar: 'https://i.pravatar.cc/40?u=charlie' },
        { name: 'David', avatar: 'https://i.pravatar.cc/40?u=david' },
        { name: 'Eve', avatar: 'https://i.pravatar.cc/40?u=eve' },
    ];

    const storiesRef = useRef(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true); // Assume right arrow is visible initially

    const checkScroll = () => {
        if (storiesRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = storiesRef.current;
            setShowLeftArrow(scrollLeft > 0);
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth);
        }
    };

    useEffect(() => {
        const currentRef = storiesRef.current;
        if (currentRef) {
            currentRef.addEventListener('scroll', checkScroll);
            checkScroll(); // Initial check
        }
        return () => {
            if (currentRef) {
                currentRef.removeEventListener('scroll', checkScroll);
            }
        };
    }, []);

    const scroll = (direction) => {
        if (storiesRef.current) {
            const scrollAmount = storiesRef.current.clientWidth / 2; // Scroll half the visible width
            storiesRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    return (
        <div className="bg-main-card rounded-xl p-4 shadow-sm sticky top-0">
            <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-sec-text" size={20} />
                <input
                    type="text"
                    placeholder="Search Friends"
                    className="bg-gray-100 dark:bg-[#3a3b3c] text-main-text p-2 rounded-full outline-none pl-10 w-full"
                />
            </div>

            <h3 className="font-semibold text-lg mb-2 text-main-text">Stories</h3>
            <div className="relative flex items-center">
                {showLeftArrow && (
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-0 z-10 p-1 bg-main-card rounded-full shadow-md text-main-text hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                        <ChevronLeft size={20} />
                    </button>
                )}
                <div ref={storiesRef} className="flex gap-3 mb-4 overflow-x-auto no-scrollbar pb-2">
                    {stories.map((story) => (
                        <div key={story.name} className="flex flex-col items-center gap-1 flex-shrink-0">
                            <div className="relative">
                                <img src={story.avatar} alt={story.name} className="w-14 h-14 rounded-full border-2 border-blue-500 p-0.5" />
                                {story.isYou && (
                                    <button className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-lg">+</button>
                                )}
                            </div>
                            <p className="text-xs text-sec-text">{story.name}</p>
                        </div>
                    ))}
                </div>
                {showRightArrow && (
                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-0 z-10 p-1 bg-main-card rounded-full shadow-md text-main-text hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                        <ChevronRight size={20} />
                    </button>
                )}
            </div>

            <h3 className="font-semibold text-lg mb-2 text-main-text">Friends</h3>
            <ul className="space-y-3 overflow-y-auto no-scrollbar" style={{ height: 'calc(100vh - 220px)' }}>
                {friends.map((friend) => (
                    <li key={friend.name} className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-lg">
                        <div className="relative">
                            <img src={friend.avatar} alt={friend.name} className="w-10 h-10 rounded-full" />
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-main-card"></span>
                        </div>
                        <span className="font-semibold text-main-text">{friend.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FriendsList;