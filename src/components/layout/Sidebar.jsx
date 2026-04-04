import { Link, useLocation } from 'react-router-dom';
import { Home, Users, MessageSquareMore, Bell, User, Settings, LogOut, ChevronLeft, ChevronRight, Briefcase } from 'lucide-react';

const Sidebar = ({ handleLogout, isCollapsed, toggleCollapse }) => {
    const location = useLocation();
    const menuItems = [
        { name: 'Feed', icon: <Home size={20} />, path: '/' },
        { name: 'Members', icon: <Users size={20} />, path: '/community' },
        { name: 'Jobs', icon: <Briefcase size={20} />, path: '/jobs' },
        { name: 'Messages', icon: <MessageSquareMore size={20} />, path: '/messages' },
        { name: 'Notification', icon: <Bell size={20} />, count: 2, path: '/notifications' },
        { name: 'Profile', icon: <User size={20} />, path: '/profile' },
        { name: 'Settings', icon: <Settings size={20} />, path: '/settings' },
    ];

    return (
        <nav className={`bg-bg-surface w-full h-full flex flex-col transition-all duration-300 ${isCollapsed ? 'px-2 py-4' : 'px-4 py-4'}`}>
            {toggleCollapse && (
                <div className={`hidden md:flex ${isCollapsed ? 'justify-center' : 'justify-end'} mb-6`}>
                    <button onClick={toggleCollapse} className="bg-bg-page border border-border-ui rounded-full p-1.5 text-text-sec hover:text-action-blue transition-colors shadow-sm hover:shadow">
                        {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                    </button>
                </div>
            )}
            <ul className="space-y-1.5 flex-1 overflow-y-auto no-scrollbar">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link to={item.path} key={item.name} title={isCollapsed ? item.name : ''} className="block">
                            <li
                                className={`flex items-center ${isCollapsed ? 'justify-center px-0' : 'justify-between px-3'} py-3 rounded-xl cursor-pointer transition-all duration-200 text-base group ${
                                    isActive 
                                    ? 'bg-sidebar-active-bg text-sidebar-active-text-color font-bold shadow-sm' 
                                    : 'text-text-sec hover:bg-bg-page hover:text-text-main'
                                }`}
                            >
                                <div className={`flex items-center ${isCollapsed ? 'gap-0' : 'gap-3'}`}>
                                    <div className={`${isActive ? 'text-sidebar-active-text-color' : 'text-text-sec group-hover:text-action-blue'} transition-colors`}>
                                        {item.icon}
                                    </div>
                                    {!isCollapsed && <span className="whitespace-nowrap">{item.name}</span>}
                                </div>
                                {!isCollapsed && item.count && (
                                    <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                                        {item.count}
                                    </span>
                                )}
                            </li>
                        </Link>
                    );
                })}
            </ul>
            <div className="mt-auto pt-4 border-t border-border-ui">
                <button 
                    onClick={handleLogout}
                    title={isCollapsed ? "Logout" : ""}
                    className={`w-full flex items-center ${isCollapsed ? 'justify-center px-0' : 'justify-start gap-3 px-3'} py-3 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-xl cursor-pointer transition-all duration-200 text-base font-medium`}
                >
                    <LogOut size={20} />
                    {!isCollapsed && <span>Logout</span>}
                </button>
            </div>
        </nav>
    );
};

export default Sidebar;