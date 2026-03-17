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
    const [showRightArrow, setShowRightArrow] = useState(true);

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
            checkScroll();
        }
        return () => {
            if (currentRef) {
                currentRef.removeEventListener('scroll', checkScroll);
            }
        };
    }, []);

    const scroll = (direction) => {
        if (storiesRef.current) {
            const scrollAmount = storiesRef.current.clientWidth / 2;
            storiesRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    return (
        <div className="bg-card-bg rounded-xl p-4 shadow-sm h-full flex flex-col">
            <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-sec" size={20} />
                <input
                    type="text"
                    placeholder="Search Friends"
                    className="bg-bg-page text-text-main p-2 rounded-full outline-none pl-10 w-full text-sm border border-border-ui/10"
                />
            </div>

            <h3 className="font-bold text-h3 mb-2 text-text-main">Stories</h3>
            <div className="relative flex items-center mb-4">
                {showLeftArrow && (
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-0 z-10 p-1 bg-bg-surface rounded-full shadow-md text-text-main hover:bg-bg-page"
                    >
                        <ChevronLeft size={20} />
                    </button>
                )}
                <div ref={storiesRef} className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                    {stories.map((story) => (
                        <div key={story.name} className="flex flex-col items-center gap-1 flex-shrink-0">
                            <div className="relative">
                                <img src={story.avatar} alt={story.name} className="w-14 h-14 rounded-full border-2 border-brand-blue p-0.5" />
                                {story.isYou && (
                                    <button className="absolute bottom-0 right-0 bg-brand-blue text-white rounded-full w-5 h-5 flex items-center justify-center text-lg">+</button>
                                )}
                            </div>
                            <p className="text-[10px] text-text-sec">{story.name}</p>
                        </div>
                    ))}
                </div>
                {showRightArrow && (
                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-0 z-10 p-1 bg-bg-surface rounded-full shadow-md text-text-main hover:bg-bg-page"
                    >
                        <ChevronRight size={20} />
                    </button>
                )}
            </div>

            <h3 className="font-bold text-h3 mb-2 text-text-main">Friends</h3>
            <ul className="space-y-3 overflow-y-auto no-scrollbar flex-1">
                {friends.map((friend) => (
                    <li key={friend.name} className="flex items-center gap-3 cursor-pointer hover:bg-bg-page p-2 rounded-lg transition-colors">
                        <div className="relative">
                            <img src={friend.avatar} alt={friend.name} className="w-10 h-10 rounded-full border border-border-ui/20" />
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-bg-surface"></span>
                        </div>
                        <span className="font-bold text-xs text-text-main">{friend.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FriendsList;