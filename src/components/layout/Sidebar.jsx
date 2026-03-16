const Sidebar = () => {
    const menuItems = [
        { name: 'Feed', icon: '🏠', active: true },
        { name: 'My community', icon: '👥' },
        { name: 'Messages', icon: '💬' },
        { name: 'Notification', icon: '🔔', count: 2 },
        { name: 'Explore', icon: '🌍' },
        { name: 'Profile', icon: '👤' },
        { name: 'Settings', icon: '⚙️' },
    ];

    return (
        <nav className="bg-main-card rounded-xl p-4 shadow-sm">
            <ul className="space-y-2">
                {menuItems.map((item) => (
                    <li
                        key={item.name}
                        className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all ${
                            item.active ? 'bg-blue-600/10 dark:bg-blue-600/20 text-blue-600' : 'text-sec-text hover:bg-gray-100 dark:hover:bg-gray-800'
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
                ))}
                <li className="flex items-center gap-3 p-3 text-sec-text hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg mt-10">
                    <span>🚪</span> <span>Logout</span>
                </li>
            </ul>
        </nav>
    );
};

export default Sidebar;