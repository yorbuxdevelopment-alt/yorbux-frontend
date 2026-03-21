import React, { useRef, useState, useEffect } from 'react';
import { Search, MoreHorizontal, VolumeX, Phone, Power, ToggleLeft, ToggleRight } from 'lucide-react';

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
        { name: 'Frank', avatar: 'https://i.pravatar.cc/40?u=frank' },
        { name: 'Grace', avatar: 'https://i.pravatar.cc/40?u=grace' },
        { name: 'Heidi', avatar: 'https://i.pravatar.cc/40?u=heidi' },
        { name: 'Ivan', avatar: 'https://i.pravatar.cc/40?u=ivan' },
        { name: 'Judy', avatar: 'https://i.pravatar.cc/40?u=judy' },
        { name: 'Mallory', avatar: 'https://i.pravatar.cc/40?u=mallory' },
        { name: 'Oscar', avatar: 'https://i.pravatar.cc/40?u=oscar' },
    ];

    const storiesRef = useRef(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);
    const momentumID = useRef(null);

    const onMouseDown = (e) => {
        isDragging.current = true;
        startX.current = e.pageX - storiesRef.current.offsetLeft;
        scrollLeft.current = storiesRef.current.scrollLeft;
        storiesRef.current.style.cursor = 'grabbing';
        cancelMomentumTracking();
    };

    const onMouseLeaveOrUp = () => {
        if (isDragging.current) {
            beginMomentumTracking();
        }
        isDragging.current = false;
        storiesRef.current.style.cursor = 'grab';
    };

    const onMouseMove = (e) => {
        if (!isDragging.current) return;
        e.preventDefault();
        const x = e.pageX - storiesRef.current.offsetLeft;
        const walk = (x - startX.current) * 1.5;
        storiesRef.current.scrollLeft = scrollLeft.current - walk;
    };
    
    const momentumRef = useRef({ velocity: 0, lastPosition: 0, lastTime: 0 });
    const beginMomentumTracking = () => { /* ... */ };
    const cancelMomentumTracking = () => { /* ... */ };
    const momentumLoop = () => { /* ... */ };
    useEffect(() => { return () => cancelMomentumTracking(); }, []);

    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [toggles, setToggles] = useState({ messageSounds: true, callSounds: false, activeStatus: true });
    const settingsRef = useRef(null);

    const handleToggle = (key) => {
        setToggles(prev => ({ ...prev, [key]: !prev[key] }));
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (settingsRef.current && !settingsRef.current.contains(event.target)) {
                setIsSettingsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [settingsRef]);

    return (
        <div className="bg-bg-surface p-4 sm:p-6 shadow-sm h-full flex flex-col">
            <div className="relative mb-3 sm:mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-sec" size={16} />
                <input type="text" placeholder="Search Friends" className="bg-bg-page text-text-main p-2 rounded-full outline-none pl-9 sm:pl-10 w-full text-xs sm:text-sm border border-border-ui/10"/>
            </div>

            <h3 className="font-bold text-h3 sm:text-h2 mb-2 sm:mb-3 text-text-main">Stories</h3>
            <div 
                ref={storiesRef}
                className="flex gap-2 sm:gap-3 overflow-x-auto no-scrollbar pb-2 cursor-grab"
                onMouseDown={onMouseDown}
                onMouseLeave={onMouseLeaveOrUp}
                onMouseUp={onMouseLeaveOrUp}
                onMouseMove={onMouseMove}
            >
                {stories.map((story) => (
                    <div key={story.name} className="flex flex-col items-center gap-0.5 sm:gap-1 flex-shrink-0">
                        <div className="relative">
                            <img src={story.avatar} alt={story.name} className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border-2 border-brand-blue p-0.5 pointer-events-none" />
                            {story.isYou && (
                                <button className="absolute bottom-0 right-0 bg-brand-blue text-white rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-xs sm:text-lg">+</button>
                            )}
                        </div>
                        <p className="text-2xs sm:text-[10px] text-text-sec">{story.name}</p>
                    </div>
                ))}
            </div>

            <div className="flex justify-between items-center mt-4 mb-2 sm:mb-3 relative" ref={settingsRef}>
                <h3 className="font-bold text-h3 sm:text-h2 text-text-main">
                    Friends: <span className="text-green-500">{friends.length}</span>
                </h3>
                <button onClick={() => setIsSettingsOpen(prev => !prev)} className="text-text-sec hover:bg-bg-page p-1 rounded-full">
                    <MoreHorizontal size={20} />
                </button>

                {isSettingsOpen && (
                    <div className="absolute top-full right-0 mt-2 w-64 bg-bg-card border border-border-ui rounded-xl shadow-2xl z-10 p-2">
                        <div className="absolute -top-1 right-3 w-3 h-3 bg-bg-card border-t border-l border-border-ui transform rotate-45" />
                        <ul className="space-y-1">
                            <li className="flex justify-between items-center p-2 rounded-lg hover:bg-bg-page">
                                <div className="flex items-center gap-3 text-sm text-text-main">
                                    <VolumeX size={18} />
                                    <span>Message Sounds</span>
                                </div>
                                <button onClick={() => handleToggle('messageSounds')} className={toggles.messageSounds ? 'text-action-blue' : 'text-text-sec'}>
                                    {toggles.messageSounds ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
                                </button>
                            </li>
                            <li className="flex justify-between items-center p-2 rounded-lg hover:bg-bg-page">
                                <div className="flex items-center gap-3 text-sm text-text-main">
                                    <Phone size={18} />
                                    <span>Call Sounds</span>
                                </div>
                                <button onClick={() => handleToggle('callSounds')} className={toggles.callSounds ? 'text-action-blue' : 'text-text-sec'}>
                                    {toggles.callSounds ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
                                </button>
                            </li>
                            <li className="flex justify-between items-center p-2 rounded-lg hover:bg-bg-page">
                                <div className="flex items-center gap-3 text-sm text-text-main">
                                    <Power size={18} />
                                    <span>Turn Off Active Status</span>
                                </div>
                                <button onClick={() => handleToggle('activeStatus')} className={toggles.activeStatus ? 'text-action-blue' : 'text-text-sec'}>
                                    {toggles.activeStatus ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>

            <ul className="space-y-2 sm:space-y-3 overflow-y-auto no-scrollbar flex-1 scroll-smooth">
                {friends.map((friend) => (
                    <li key={friend.name} className="flex items-center gap-2 sm:gap-3 cursor-pointer hover:bg-bg-page p-1.5 sm:p-2 rounded-lg transition-colors">
                        <div className="relative">
                            <img src={friend.avatar} alt={friend.name} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-border-ui/20" />
                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full border-2 border-bg-surface"></span>
                        </div>
                        <span className="font-bold text-xs sm:text-sm text-text-main">{friend.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FriendsList;