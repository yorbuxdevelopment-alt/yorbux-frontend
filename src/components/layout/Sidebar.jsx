import { Link, useLocation } from 'react-router-dom';
import { Home, Users, MessageSquareMore, Bell, Compass, User, Settings, LogOut } from 'lucide-react';

const Sidebar = ({ handleLogout }) => {
    const location = useLocation();
    const menuItems = [
        { name: 'Feed', icon: <Home size={20} />, path: '/' },
        { name: 'My community', icon: <Users size={20} />, path: '/community' },
        { name: 'Messages', icon: <MessageSquareMore size={20} />, path: '/messages' },
        { name: 'Notification', icon: <Bell size={20} />, count: 2, path: '/notifications' },
        // { name: 'Explore', icon: <Compass size={20} />, path: '/explore' },
        { name: 'Profile', icon: <User size={20} />, path: '/profile' },
        { name: 'Settings', icon: <Settings size={20} />, path: '/settings' },
    ];

    return (
        <nav className="bg-bg-surface p-6 shadow-sm h-full flex flex-col">
            <ul className="space-y-4">
                {menuItems.map((item) => (
                    <Link to={item.path} key={item.name}>
                        <li
                            className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-all text-base ${
                                location.pathname === item.path 
                                ? 'bg-sidebar-active-bg text-sidebar-active-text-color font-bold' 
                                : 'text-text-sec hover:bg-bg-page'
                            }`}
                        >
                            <div className="flex items-center gap-4">
                                {item.icon}
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
            </ul>
            <ul className="mt-auto">
                <li 
                    onClick={handleLogout}
                    className="flex items-center gap-4 p-4 text-text-sec hover:bg-bg-page rounded-lg mt-6 cursor-pointer text-base"
                >
                    <LogOut size={20} />
                    <span className="font-medium">Logout</span>
                </li>
            </ul>
        </nav>
    );
};

export default Sidebar;