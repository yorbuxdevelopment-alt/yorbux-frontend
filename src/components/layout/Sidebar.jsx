import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();
    const menuItems = [
        { name: 'Feed', icon: '🏠', path: '/' },
        { name: 'My community', icon: '👥', path: '/community' },
        { name: 'Messages', icon: '💬', path: '/messages' },
        { name: 'Notification', icon: '🔔', count: 2, path: '/notifications' },
        { name: 'Explore', icon: '🌍', path: '/explore' },
        { name: 'Profile', icon: '👤', path: '/profile' },
        { name: 'Settings', icon: '⚙️', path: '/settings' },
    ];

    return (
        <nav className="bg-bg-surface rounded-xl p-4 sm:p-6 shadow-sm border border-border-ui h-full"> {/* Adjusted padding */}
            <ul className="space-y-2 sm:space-y-3"> {/* Adjusted space-y */}
                {menuItems.map((item) => (
                    <Link to={item.path} key={item.name}>
                        <li
                            className={`flex items-center justify-between p-2 sm:p-3 rounded-lg cursor-pointer transition-all text-sm sm:text-base ${ // Adjusted padding and text size
                                location.pathname === item.path ? 'bg-action-blue/10 text-action-blue font-bold' : 'text-text-sec hover:bg-bg-page'
                            }`}
                        >
                            <div className="flex items-center gap-2 sm:gap-3"> {/* Adjusted gap */}
                                <span className="text-lg">{item.icon}</span>
                                <span className="font-medium">{item.name}</span>
                            </div>
                            {item.count && (
                                <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                                    {item.count}
                                </span>
                            )}
                        </li>
                    </Link>
                ))}
                <li className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 text-text-sec hover:bg-bg-page rounded-lg mt-4 sm:mt-6 cursor-pointer text-sm sm:text-base"> {/* Adjusted padding, gap, and text size */}
                    <span>🚪</span> <span>Logout</span>
                </li>
            </ul>
        </nav>
    );
};

export default Sidebar;