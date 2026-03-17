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
        <nav className="bg-card-bg rounded-xl p-4 shadow-sm border border-border-color">
            <ul className="space-y-2">
                {menuItems.map((item) => (
                    <Link to={item.path} key={item.name}>
                        <li
                            className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all ${
                                location.pathname === item.path ? 'bg-blue-600/10 dark:bg-blue-600/20 text-blue-600' : 'text-sec-text hover:bg-gray-100 dark:hover:bg-gray-800'
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <span>{item.icon}</span>
                                <span className="font-medium">{item.name}</span>
                            </div>
                            {item.count && (
                                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                                    {item.count}
                                </span>
                            )}
                        </li>
                    </Link>
                ))}
                <li className="flex items-center gap-3 p-3 text-sec-text hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg mt-10">
                    <span>🚪</span> <span>Logout</span>
                </li>
            </ul>
        </nav>
    );
};

export default Sidebar;