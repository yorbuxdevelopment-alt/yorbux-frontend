import { Gift, Calendar, MapPin } from 'lucide-react';

const SuggestedFollows = () => {
    const suggestions = [
        { name: 'John Doe', handle: '@johndoe', avatar: 'https://i.pravatar.cc/40?u=john' },
        { name: 'Jane Smith', handle: '@janesmith', avatar: 'https://i.pravatar.cc/40?u=jane' },
    ];

    return (
        <div className="bg-bg-surface p-4 sm:p-6 rounded-xl shadow-sm border border-border-ui"> {/* Adjusted padding */}
            <h3 className="font-bold text-h3 sm:text-h2 mb-3 sm:mb-4 text-text-main">You Might Like</h3> {/* Adjusted text size and margin */}
            <div className="space-y-3 sm:space-y-4"> {/* Adjusted space-y */}
                {suggestions.map((user) => (
                    <div key={user.handle} className="flex justify-between items-center">
                        <div className="flex items-center gap-2 sm:gap-3"> {/* Adjusted gap */}
                            <img src={user.avatar} alt={user.name} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-border-ui/10" /> {/* Adjusted avatar size */}
                            <div>
                                <p className="font-bold text-xs sm:text-sm text-text-main">{user.name}</p> {/* Adjusted text size */}
                                <p className="text-2xs sm:text-xs text-text-sec">{user.handle}</p> {/* Adjusted text size */}
                            </div>
                        </div>
                        <div className="flex gap-1 sm:gap-2"> {/* Adjusted gap */}
                            <button className="text-text-sec hover:text-action-blue text-2xs sm:text-xs font-bold transition-colors">Ignore</button> {/* Adjusted text size */}
                            <button className="bg-action-blue text-white px-3 py-1 sm:px-4 sm:py-1.5 rounded-lg text-2xs sm:text-xs font-sans font-bold hover:opacity-90 shadow-md shadow-action-blue/20 border border-border-ui"> {/* Adjusted padding and text size */}
                                Follow
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const RecentEvents = () => {
    const events = [
        {
            title: 'Web Development Meetup',
            location: 'San Francisco, CA',
            icon: <Calendar className="text-action-blue" />,
            attendees: ['https://i.pravatar.cc/30?u=a', 'https://i.pravatar.cc/30?u=b', 'https://i.pravatar.cc/30?u=c'],
        },
    ];

    return (
        <div className="bg-bg-surface p-4 sm:p-6 rounded-xl shadow-sm border border-border-ui"> {/* Adjusted padding */}
            <h3 className="font-bold text-h3 sm:text-h2 mb-3 sm:mb-4 text-text-main">Recent Events</h3> {/* Adjusted text size and margin */}
            {events.map((event, index) => (
                <div key={index} className="flex items-start gap-3 sm:gap-4"> {/* Adjusted gap */}
                    <div className="bg-action-blue/10 p-2 sm:p-3 rounded-lg border border-action-blue/20">{event.icon}</div> {/* Adjusted padding */}
                    <div>
                        <p className="font-bold text-xs sm:text-sm text-text-main">{event.title}</p> {/* Adjusted text size */}
                        <div className="flex items-center text-2xs sm:text-xs text-text-sec gap-0.5 sm:gap-1 mt-0.5 sm:mt-1"> {/* Adjusted text size and gap */}
                            <MapPin size={10} sm:size={12} /> {/* Adjusted icon size */}
                            <span>{event.location}</span>
                        </div>
                        <div className="flex mt-2 sm:mt-3"> {/* Adjusted margin */}
                            {event.attendees.map((avatar, i) => (
                                <img
                                    key={i}
                                    src={avatar}
                                    alt="attendee"
                                    className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-bg-card ${i > 0 ? '-ml-2 sm:-ml-3' : ''}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

const Birthdays = () => {
    return (
        <div className="bg-bg-surface p-4 sm:p-6 rounded-xl shadow-sm text-center border border-border-ui"> {/* Adjusted padding */}
            <Gift size={32} sm:size={40} className="mx-auto text-pink-500 mb-1 sm:mb-2" /> {/* Adjusted icon size and margin */}
            <p className="text-xs sm:text-sm text-text-sec"> {/* Adjusted text size */}
                <span className="font-bold text-text-main">Jane Doe</span> and <span className="font-bold text-text-main">2 others</span> have birthdays today.
            </p>
            <input
                type="text"
                placeholder="Write a wish..."
                className="mt-3 sm:mt-4 w-full bg-bg-page border border-border-ui/20 rounded-lg py-2 px-3 sm:py-2.5 sm:px-4 focus:outline-none text-xs sm:text-sm text-text-main placeholder-text-sec"/>
        </div>
    );
};


const RightBar = () => {
  return (
    <div className="space-y-4 sm:space-y-6"> {/* Adjusted space-y */}
      <SuggestedFollows />
      <RecentEvents />
      <Birthdays />
    </div>
  );
};

export default RightBar;