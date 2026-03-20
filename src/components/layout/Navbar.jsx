import React, { useState } from 'react';
import { Search, Bell, MessageSquare, User, Settings, LogOut, Moon, Menu, Users } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const Navbar = ({ setIsLeftSidebarOpen, setIsRightSidebarOpen }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { theme, toggleTheme } = useTheme(); // Get theme for button text

    return (
        <header className="bg-bg-surface shadow-sm rounded-xl p-4 flex justify-between items-center border border-border-ui">
            {/* Left Section: Left Toggle (Mobile/Tablet), Logo, Search (Desktop) */}
            <div className="flex items-center gap-4">
                {/* Left Sidebar Toggle Button (Mobile/Tablet) */}
                <button 
                    className="lg:hidden text-text-sec hover:text-action-blue flex-shrink-0"
                    onClick={() => setIsLeftSidebarOpen(prev => !prev)}
                >
                    <Menu size={24} />
                </button>

                <img src="/logo.png" alt="Meetmax" className="h-8 flex-shrink-0" />
                
                {/* Search Input (Hidden on Mobile/Tablet, visible on Desktop) */}
                <div className="relative hidden lg:block flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-sec" size={20} />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full bg-bg-page text-text-main p-2 rounded-full outline-none pl-10 text-sm border border-border-ui"
                    />
                </div>
            </div>

            {/* Right Section: Icons (Desktop), User Dropdown, Right Toggle (Mobile/Tablet) */}
            <div className="flex items-center gap-4 sm:gap-6"> {/* Adjusted gap for smaller screens */}
                {/* Notification and Message Icons (Hidden on Mobile/Tablet, visible on Desktop) */}
                <div className="hidden lg:flex items-center gap-4">
                    <button className="relative text-text-sec hover:text-action-blue">
                        <Bell size={24} />
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">3</span>
                    </button>
                    <button className="text-text-sec hover:text-action-blue">
                        <MessageSquare size={24} />
                    </button>
                </div>

                {/* User Dropdown */}
                <div className="relative flex-shrink-0">
                    <div
                        className="flex items-center gap-3 cursor-pointer"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <img
                            src="https://i.pravatar.cc/40?u=saleh"
                            alt="Saleh Ahmed"
                            className="w-10 h-10 rounded-full flex-shrink-0"
                        />
                        <div className="hidden sm:block"> {/* Hide name/handle on very small screens */}
                            <p className="font-semibold text-text-main text-sm">Saleh Ahmed</p>
                            <p className="text-xs text-text-sec">@salehahmed</p>
                        </div>
                    </div>
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-bg-surface rounded-lg shadow-xl z-20 border border-border-ui">
                            <a href="#" className="flex items-center gap-3 px-4 py-2 text-text-main hover:bg-bg-page">
                                <User size={20} />
                                <span>Profile</span>
                            </a>
                            <a href="#" className="flex items-center gap-3 px-4 py-2 text-text-main hover:bg-bg-page">
                                <Settings size={20} />
                                <span>Settings</span>
                            </a>
                            <button onClick={toggleTheme} className="w-full flex items-center gap-3 px-4 py-2 text-text-main hover:bg-bg-page">
                                <Moon size={20} />
                                <span>Switch to {theme === 'light' ? 'Dark' : 'Light'}</span>
                            </button>
                            <hr className="border-border-ui"/>
                            <a href="#" className="flex items-center gap-3 px-4 py-2 text-red-500 hover:bg-bg-page">
                                <LogOut size={20} />
                                <span>Logout</span>
                            </a>
                        </div>
                    )}
                </div>

                {/* Right Sidebar Toggle Button (Mobile/Tablet) */}
                <button 
                    className="lg:hidden text-text-sec hover:text-action-blue flex-shrink-0"
                    onClick={() => setIsRightSidebarOpen(prev => !prev)}
                >
                    <Users size={24} />
                </button>
            </div>
        </header>
    );
};

export default Navbar;