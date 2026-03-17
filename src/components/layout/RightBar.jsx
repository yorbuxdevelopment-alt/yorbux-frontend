import { Gift, Calendar, MapPin } from 'lucide-react';

const SuggestedFollows = () => {
    const suggestions = [
        { name: 'John Doe', handle: '@johndoe', avatar: 'https://i.pravatar.cc/40?u=john' },
        { name: 'Jane Smith', handle: '@janesmith', avatar: 'https://i.pravatar.cc/40?u=jane' },
    ];

    return (
        <div className="bg-bg-surface p-6 rounded-xl shadow-sm border border-border-ui">
            <h3 className="font-bold text-h3 mb-4 text-text-main">You Might Like</h3>
            <div className="space-y-4">
                {suggestions.map((user) => (
                    <div key={user.handle} className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full border border-border-ui/10" />
                            <div>
                                <p className="font-bold text-sm text-text-main">{user.name}</p>
                                <p className="text-xs text-text-sec">{user.handle}</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="text-text-sec hover:text-action-blue text-xs font-bold transition-colors">Ignore</button>
                            <button className="bg-action-blue text-white px-4 py-1.5 rounded-lg text-xs font-sans font-bold hover:opacity-90 shadow-md shadow-action-blue/20 border border-border-ui">
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
        <div className="bg-bg-surface p-6 rounded-xl shadow-sm border border-border-ui">
            <h3 className="font-bold text-h3 mb-4 text-text-main">Recent Events</h3>
            {events.map((event, index) => (
                <div key={index} className="flex items-start gap-4">
                    <div className="bg-action-blue/10 p-3 rounded-lg border border-action-blue/20">{event.icon}</div>
                    <div>
                        <p className="font-bold text-sm text-text-main">{event.title}</p>
                        <div className="flex items-center text-xs text-text-sec gap-1 mt-1">
                            <MapPin size={12} />
                            <span>{event.location}</span>
                        </div>
                        <div className="flex mt-3">
                            {event.attendees.map((avatar, i) => (
                                <img
                                    key={i}
                                    src={avatar}
                                    alt="attendee"
                                    className={`w-8 h-8 rounded-full border-2 border-bg-surface ${i > 0 ? '-ml-3' : ''}`}
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
        <div className="bg-bg-surface p-6 rounded-xl shadow-sm text-center border border-border-ui">
            <Gift size={40} className="mx-auto text-pink-500 mb-2" />
            <p className="text-sm text-text-sec">
                <span className="font-bold text-text-main">Jane Doe</span> and <span className="font-bold text-text-main">2 others</span> have birthdays today.
            </p>
            <input
                type="text"
                placeholder="Write a wish..."
                className="mt-4 w-full bg-bg-page border border-border-ui/20 rounded-lg py-2.5 px-4 focus:outline-none text-sm text-text-main placeholder-text-sec"
            />
        </div>
    );
};


const RightBar = () => {
  return (
    <div className="space-y-6">
      <SuggestedFollows />
      <RecentEvents />
      <Birthdays />
    </div>
  );
};

export default RightBar;