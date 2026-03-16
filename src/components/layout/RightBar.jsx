import { Gift, Calendar, MapPin } from 'lucide-react';

const SuggestedFollows = () => {
    const suggestions = [
        { name: 'John Doe', handle: '@johndoe', avatar: 'https://i.pravatar.cc/40?u=john' },
        { name: 'Jane Smith', handle: '@janesmith', avatar: 'https://i.pravatar.cc/40?u=jane' },
    ];

    return (
        <div className="bg-main-card p-4 rounded-xl shadow-sm">
            <h3 className="font-semibold text-lg mb-4 text-main-text">You Might Like</h3>
            <div className="space-y-4">
                {suggestions.map((user) => (
                    <div key={user.handle} className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                            <div>
                                <p className="font-semibold text-main-text">{user.name}</p>
                                <p className="text-sm text-sec-text">{user.handle}</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="text-sec-text hover:text-gray-700 text-sm font-medium">Ignore</button>
                            <button className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold hover:bg-blue-700">
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
            icon: <Calendar className="text-blue-500" />,
            attendees: ['https://i.pravatar.cc/30?u=a', 'https://i.pravatar.cc/30?u=b', 'https://i.pravatar.cc/30?u=c'],
        },
    ];

    return (
        <div className="bg-main-card p-4 rounded-xl shadow-sm">
            <h3 className="font-semibold text-lg mb-4 text-main-text">Recent Events</h3>
            {events.map((event, index) => (
                <div key={index} className="flex items-start gap-4">
                    <div className="bg-blue-100 dark:bg-blue-600/20 p-3 rounded-lg">{event.icon}</div>
                    <div>
                        <p className="font-semibold text-main-text">{event.title}</p>
                        <div className="flex items-center text-sm text-sec-text gap-1">
                            <MapPin size={14} />
                            <span>{event.location}</span>
                        </div>
                        <div className="flex mt-2">
                            {event.attendees.map((avatar, i) => (
                                <img
                                    key={i}
                                    src={avatar}
                                    alt="attendee"
                                    className={`w-8 h-8 rounded-full border-2 border-main-card ${i > 0 ? '-ml-3' : ''}`}
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
        <div className="bg-main-card p-4 rounded-xl shadow-sm text-center">
            <Gift size={40} className="mx-auto text-pink-500" />
            <p className="mt-2 text-sec-text">
                <span className="font-semibold text-main-text">Jane Doe</span> and <span className="font-semibold text-main-text">2 others</span> have birthdays today.
            </p>
            <input
                type="text"
                placeholder="Write a wish..."
                className="mt-4 w-full bg-gray-100 dark:bg-[#3a3b3c] rounded-full py-2 px-4 focus:outline-none text-main-text"
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