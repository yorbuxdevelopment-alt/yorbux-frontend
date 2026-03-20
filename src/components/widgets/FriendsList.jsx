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
        <div className="bg-bg-surface rounded-xl p-4 sm:p-6 shadow-sm h-full flex flex-col"> {/* Adjusted padding */}
            <div className="relative mb-3 sm:mb-4"> {/* Adjusted margin */}
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-sec" size={16} /> {/* Fixed: removed sm:size */}
                <input
                    type="text"
                    placeholder="Search Friends"
                    className="bg-bg-page text-text-main p-2 rounded-full outline-none pl-9 sm:pl-10 w-full text-xs sm:text-sm border border-border-ui/10"/>
            </div>

            <h3 className="font-bold text-h3 sm:text-h2 mb-2 sm:mb-3 text-text-main">Stories</h3> {/* Adjusted text size and margin */}
            <div className="relative flex items-center mb-3 sm:mb-4"> {/* Adjusted margin */}
                {showLeftArrow && (
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-0 z-10 p-0.5 sm:p-1 bg-bg-surface rounded-full shadow-md text-text-main hover:bg-bg-page"
                    >
                        <ChevronLeft size={16} /> {/* Fixed: removed sm:size */}
                    </button>
                )}
                <div ref={storiesRef} className="flex gap-2 sm:gap-3 overflow-x-auto no-scrollbar pb-2"> {/* Adjusted gap */}
                    {stories.map((story) => (
                        <div key={story.name} className="flex flex-col items-center gap-0.5 sm:gap-1 flex-shrink-0"> {/* Adjusted gap */}
                            <div className="relative">
                                <img src={story.avatar} alt={story.name} className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border-2 border-brand-blue p-0.5" /> {/* Adjusted avatar size */}
                                {story.isYou && (
                                    <button className="absolute bottom-0 right-0 bg-brand-blue text-white rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-xs sm:text-lg">+</button>
                                )}
                            </div>
                            <p className="text-2xs sm:text-[10px] text-text-sec">{story.name}</p> {/* Adjusted text size */}
                        </div>
                    ))}
                </div>
                {showRightArrow && (
                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-0 z-10 p-0.5 sm:p-1 bg-bg-surface rounded-full shadow-md text-text-main hover:bg-bg-page">
                        <ChevronRight size={16} /> {/* Fixed: removed sm:size */}
                    </button>
                )}
            </div>

            <h3 className="font-bold text-h3 sm:text-h2 mb-2 sm:mb-3 text-text-main">Friends</h3> {/* Adjusted text size and margin */}
            <ul className="space-y-2 sm:space-y-3 overflow-y-auto no-scrollbar flex-1"> {/* Adjusted space-y */}
                {friends.map((friend) => (
                    <li key={friend.name} className="flex items-center gap-2 sm:gap-3 cursor-pointer hover:bg-bg-page p-1.5 sm:p-2 rounded-lg transition-colors"> {/* Adjusted padding and gap */}
                        <div className="relative">
                            <img src={friend.avatar} alt={friend.name} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-border-ui/20" /> {/* Adjusted avatar size */}
                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full border-2 border-bg-surface"></span> {/* Adjusted size */}
                        </div>
                        <span className="font-bold text-xs sm:text-sm text-text-main">{friend.name}</span> {/* Adjusted text size */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FriendsList;