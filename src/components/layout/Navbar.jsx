import React, { useEffect, useRef, useState } from 'react';
import { Search, Plus, User, Settings, LogOut, Moon, Sun, Menu, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import CreatePostModal from '../feed/CreatePostModal';
import { getMyProfile } from '../../services/profile';

const Navbar = ({ setIsLeftSidebarOpen, setIsRightSidebarOpen, handleLogout, isSidebarCollapsed, toggleCollapse }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);
    const [postModalAction, setPostModalAction] = useState('default');
    const [profile, setProfile] = useState(null);
    const { theme, toggleTheme } = useTheme();
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    const logoSrc = theme === 'dark' ? '/logo/yor-bux-dark-logo.png' : '/logo/yor-bux-primary-logo.png';
    const displayName = profile?.user?.fullname || profile?.user?.name || 'YorBux User';
    const avatar = profile?.user?.profileImage || 'https://i.pravatar.cc/40?u=yorbux-user';

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const data = await getMyProfile();
                setProfile(data);
            } catch {
                setProfile(null);
            }
        };

        loadProfile();
    }, [location.pathname]);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, []);

    useEffect(() => {
        setIsDropdownOpen(false);
    }, [location.pathname]);

    const handleNavigate = (path) => {
        setIsDropdownOpen(false);
        navigate(path);
    };

    const handleThemeToggle = () => {
        toggleTheme();
        setIsDropdownOpen(false);
    };

    const handleMenuLogout = () => {
        setIsDropdownOpen(false);
        handleLogout();
    };

    return (
        <>
            <header className="bg-bg-surface p-4 flex items-center justify-between gap-4">
                {/* Left Side: Mobile Menu, Logo & Search */}
                <div className="flex items-center gap-4 sm:gap-6 flex-1">
                    <button onClick={() => setIsLeftSidebarOpen(prev => !prev)} className="md:hidden text-text-sec hover:text-action-blue flex-shrink-0">
                        <Users size={24} />
                    </button>
                    
                    {/* Logo & Collapsible Arrow */}
                    <div className="hidden sm:flex items-center gap-4 flex-shrink-0">
                        <img src={logoSrc} alt="Yorbux" className="h-8" />
                        <button onClick={toggleCollapse} className="hidden md:flex items-center justify-center bg-bg-page border border-border-ui rounded-full p-1.5 text-text-sec hover:text-action-blue hover:shadow-sm transition-all">
                            {isSidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                        </button>
                    </div>

                    {/* Search Bar - Next to Logo */}
                    <div className="relative hidden lg:block w-full max-w-sm ml-8 lg:ml-16">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-sec" size={18} />
                        <input type="text" placeholder="Search..." className="w-full bg-bg-page text-text-main py-2.5 pl-11 pr-4 rounded-xl outline-none text-sm border border-border-ui focus:ring-1 focus:ring-action-blue transition-all" />
                    </div>
                </div>

                {/* Right Side: Actions & Profile */}
                <div className="flex items-center justify-end gap-3 sm:gap-5 flex-shrink-0">
                    <button onClick={() => { setPostModalAction('default'); setIsPostModalOpen(true); }} className="bg-action-blue text-white p-2.5 rounded-full hover:opacity-90 shadow-md shadow-action-blue/20 transition-all">
                        <Plus size={20} />
                    </button>
                    <div ref={dropdownRef} className="relative flex-shrink-0">
                        <div onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center gap-3 cursor-pointer">
                            <div className="hidden sm:block">
                                <p className="font-semibold text-text-main text-sm">{displayName}</p>
                            </div>
                            <img src={avatar} alt={displayName} className="w-10 h-10 rounded-full flex-shrink-0 border border-border-ui object-cover" />
                        </div>
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-3 w-48 bg-bg-surface rounded-xl shadow-xl z-20 border border-border-ui py-2 overflow-hidden">
                                <button onClick={() => handleNavigate('/view-profile')} className="w-full flex items-center gap-3 px-4 py-2.5 text-text-main hover:bg-bg-page text-sm font-medium transition-colors">
                                    <User size={18} />
                                    <span>Profile</span>
                                </button>
                                <button onClick={() => handleNavigate('/settings')} className="w-full flex items-center gap-3 px-4 py-2.5 text-text-main hover:bg-bg-page text-sm font-medium transition-colors">
                                    <Settings size={18} />
                                    <span>Settings</span>
                                </button>
                                <button onClick={handleThemeToggle} className="w-full flex items-center gap-3 px-4 py-2.5 text-text-main hover:bg-bg-page text-sm font-medium transition-colors">
                                    {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                                    <span>Switch to {theme === 'light' ? 'Dark' : 'Light'}</span>
                                </button>
                                <div className="h-px bg-border-ui my-1"></div>
                                <button onClick={handleMenuLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-red-500 hover:bg-red-50 hover:text-red-600 text-sm font-medium transition-colors">
                                    <LogOut size={18} />
                                    <span>Logout</span>
                                </button>
                            </div>
                        )}
                    </div>
                    <button onClick={() => setIsRightSidebarOpen(prev => !prev)} className="lg:hidden text-text-sec hover:text-action-blue flex-shrink-0 p-1.5 sm:p-2 bg-bg-page rounded-full border border-border-ui transition-colors">
                        <Menu size={20} />
                    </button>
                </div>
            </header>
            <CreatePostModal
                isOpen={isPostModalOpen}
                onClose={() => setIsPostModalOpen(false)}
                currentUserProfile={profile}
                initialAction={postModalAction}
            />
        </>
    );
};

export default Navbar;
