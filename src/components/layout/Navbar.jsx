import React, { useState } from 'react';
import { Search, Plus, User, Settings, LogOut, Moon, Menu, Users } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import CreatePostModal from '../feed/CreatePostModal';

const Navbar = ({ setIsLeftSidebarOpen, setIsRightSidebarOpen, handleLogout }) => { // Accept handleLogout
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    const logoSrc = theme === 'dark' ? '/logo/yor-bux-dark-logo.png' : '/logo/yor-bux-primary-logo.png';

    return (
        <>
            <header className="bg-bg-surface rounded-lg p-4 grid grid-cols-12 items-center gap-4">
                <div className="col-span-3 flex items-center gap-4">
                    <button onClick={() => setIsLeftSidebarOpen(prev => !prev)} className="lg:hidden text-text-sec hover:text-action-blue flex-shrink-0">
                        <Menu size={24} />
                    </button>
                    <img src={logoSrc} alt="Yorbux" className="h-8 flex-shrink-0 hidden sm:block" />
                </div>
                <div className="col-span-3 relative hidden lg:block">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-sec" size={20} />
                    <input type="text" placeholder="Search..." className="w-full bg-bg-page text-text-main p-3 rounded-lg outline-none pl-12 text-sm border border-border-ui" />
                </div>
                <div className="col-span-6 flex items-center justify-end gap-4 sm:gap-6">
                    <button onClick={() => setIsPostModalOpen(true)} className="bg-action-blue text-white p-2 rounded-full hover:opacity-90 shadow-lg shadow-action-blue/20">
                        <Plus size={20} />
                    </button>
                    <div className="relative flex-shrink-0">
                        <div onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center gap-3 cursor-pointer">
                            <div className="hidden sm:block">
                                <p className="font-semibold text-text-main text-md">Saleh Ahmed</p>
                            </div>
                            <img src="https://i.pravatar.cc/40?u=saleh" alt="Saleh Ahmed" className="w-10 h-10 rounded-full flex-shrink-0" />
                        </div>
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-bg-surface rounded-lg shadow-xl z-20 border border-border-ui">
                                <a href="#" className="flex items-center gap-3 px-4 py-2 text-text-main hover:bg-bg-page"><User size={20} /><span>Profile</span></a>
                                <a href="#" className="flex items-center gap-3 px-4 py-2 text-text-main hover:bg-bg-page"><Settings size={20} /><span>Settings</span></a>
                                <button onClick={toggleTheme} className="w-full flex items-center gap-3 px-4 py-2 text-text-main hover:bg-bg-page"><Moon size={20} /><span>Switch to {theme === 'light' ? 'Dark' : 'Light'}</span></button>
                                <hr className="border-border-ui"/>
                                <a href="#" onClick={handleLogout} className="flex items-center gap-3 px-4 py-2 text-red-500 hover:bg-bg-page">
                                    <LogOut size={20} />
                                    <span>Logout</span>
                                </a>
                            </div>
                        )}
                    </div>
                    <button onClick={() => setIsRightSidebarOpen(prev => !prev)} className="lg:hidden text-text-sec hover:text-action-blue flex-shrink-0">
                        <Users size={24} />
                    </button>
                </div>
            </header>
            <CreatePostModal isOpen={isPostModalOpen} onClose={() => setIsPostModalOpen(false)} />
        </>
    );
};

export default Navbar;