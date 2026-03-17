import { useState } from 'react';
import { Search, Bell, MessageSquare, User, Settings, LogOut, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { toggleTheme } = useTheme();

    return (
        <header className="bg-card-bg shadow-sm rounded-xl p-4 flex justify-between items-center border border-border-color">
            <div className="flex items-center gap-4">
                <img src="/logo.png" alt="Meetmax" className="h-8" />
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-sec-text" size={20} />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-gray-100 dark:bg-[#3a3b3c] text-main-text p-2 rounded-full outline-none pl-10"
                    />
                </div>
            </div>
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-4">
                    <button className="relative text-sec-text hover:text-blue-500">
                        <Bell size={24} />
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">3</span>
                    </button>
                    <button className="text-sec-text hover:text-blue-500">
                        <MessageSquare size={24} />
                    </button>
                </div>
                <div className="relative">
                    <div
                        className="flex items-center gap-3 cursor-pointer"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <img
                            src="https://i.pravatar.cc/40?u=saleh"
                            alt="Saleh Ahmed"
                            className="w-10 h-10 rounded-full"
                        />
                        <div>
                            <p className="font-semibold text-main-text">Saleh Ahmed</p>
                            <p className="text-sm text-sec-text">@salehahmed</p>
                        </div>
                    </div>
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-card-bg rounded-lg shadow-xl z-20 border border-border-color">
                            <a href="#" className="flex items-center gap-3 px-4 py-2 text-main-text hover:bg-gray-100 dark:hover:bg-gray-800">
                                <User size={20} />
                                <span>Profile</span>
                            </a>
                            <a href="#" className="flex items-center gap-3 px-4 py-2 text-main-text hover:bg-gray-100 dark:hover:bg-gray-800">
                                <Settings size={20} />
                                <span>Settings</span>
                            </a>
                            <button onClick={toggleTheme} className="w-full flex items-center gap-3 px-4 py-2 text-main-text hover:bg-gray-100 dark:hover:bg-gray-800">
                                <Moon size={20} />
                                <span>Switch Theme</span>
                            </button>
                            <hr className="border-border-color"/>
                            <a href="#" className="flex items-center gap-3 px-4 py-2 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800">
                                <LogOut size={20} />
                                <span>Logout</span>
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;