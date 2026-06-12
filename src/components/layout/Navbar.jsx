import React, { useEffect, useRef, useState } from 'react';
import { Search, Plus, User, Settings, LogOut, Moon, Sun, Users, ChevronLeft, ChevronRight, FileText, Store, X, Send, BriefcaseBusiness } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import CreatePostModal from '../feed/CreatePostModal';
import { getMyProfile } from '../../services/profile';
import { createSellerPost } from '../../services/seller';

const hasSellerRole = (profile) => {
    const roles = profile?.user?.roles || profile?.roles || [];
    return Array.isArray(roles) && roles.some((role) => String(role).toUpperCase() === 'SELLER');
};

const SellerPostModal = ({ isOpen, onClose, currentUserProfile }) => {
    const [form, setForm] = useState({
        serviceName: '',
        offer: '',
        targetAudience: '',
        contactNote: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (!isOpen) {
            setForm({ serviceName: '', offer: '', targetAudience: '', contactNote: '' });
            setError('');
            setSuccess('');
            setSubmitting(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleChange = (field, value) => {
        setForm((current) => ({ ...current, [field]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setSuccess('');

        if (!form.serviceName.trim() || !form.offer.trim()) {
            setError('Service name aur promotion details required hain.');
            return;
        }

        setSubmitting(true);

        try {
            await createSellerPost({
                serviceName: form.serviceName.trim(),
                offer: form.offer.trim(),
                targetAudience: form.targetAudience.trim(),
                contactNote: form.contactNote.trim()
            });
            setSuccess('Seller post published successfully.');
            window.setTimeout(onClose, 700);
        } catch (requestError) {
            setError(requestError.response?.data?.message || 'Seller post publish nahi ho paaya.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center p-0 sm:p-4">
            <div className="bg-bg-surface w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl border border-border-ui shadow-2xl">
                <div className="flex items-center justify-between p-5 border-b border-border-ui">
                    <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-full bg-action-blue/10 text-action-blue flex items-center justify-center shrink-0">
                            <BriefcaseBusiness size={20} />
                        </div>
                        <div className="min-w-0">
                            <h2 className="text-text-main font-black text-lg leading-tight">Seller Post</h2>
                            <p className="text-text-sec text-sm truncate">Promote your services in the feed</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-lg hover:bg-bg-page text-text-sec" aria-label="Close seller post modal">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-5 space-y-4">
                    {error ? <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div> : null}
                    {success ? <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{success}</div> : null}

                    <label className="block space-y-1.5">
                        <span className="text-sm font-bold text-text-main">Service name</span>
                        <input
                            value={form.serviceName}
                            onChange={(event) => handleChange('serviceName', event.target.value)}
                            placeholder="Loan consulting, insurance advisory, tax planning..."
                            className="w-full bg-bg-page border border-border-ui rounded-lg px-3 py-2.5 text-sm text-text-main outline-none focus:border-action-blue"
                        />
                    </label>

                    <label className="block space-y-1.5">
                        <span className="text-sm font-bold text-text-main">Promotion details</span>
                        <textarea
                            value={form.offer}
                            onChange={(event) => handleChange('offer', event.target.value)}
                            placeholder="Tell users what you offer and why they should contact you."
                            rows={4}
                            className="w-full bg-bg-page border border-border-ui rounded-lg px-3 py-2.5 text-sm text-text-main outline-none resize-none focus:border-action-blue"
                        />
                    </label>

                    <label className="block space-y-1.5">
                        <span className="text-sm font-bold text-text-main">Target audience</span>
                        <input
                            value={form.targetAudience}
                            onChange={(event) => handleChange('targetAudience', event.target.value)}
                            placeholder="Home buyers, salaried professionals, MSME owners..."
                            className="w-full bg-bg-page border border-border-ui rounded-lg px-3 py-2.5 text-sm text-text-main outline-none focus:border-action-blue"
                        />
                    </label>

                    <label className="block space-y-1.5">
                        <span className="text-sm font-bold text-text-main">Contact note</span>
                        <input
                            value={form.contactNote}
                            onChange={(event) => handleChange('contactNote', event.target.value)}
                            placeholder="DM me, call during business hours, book consultation..."
                            className="w-full bg-bg-page border border-border-ui rounded-lg px-3 py-2.5 text-sm text-text-main outline-none focus:border-action-blue"
                        />
                    </label>

                    <div className="flex justify-end gap-3 pt-2">
                        <button type="button" onClick={onClose} className="px-4 py-2.5 rounded-lg border border-border-ui text-text-main font-bold text-sm hover:bg-bg-page">
                            Cancel
                        </button>
                        <button disabled={submitting} type="submit" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-action-blue text-white font-bold text-sm hover:opacity-90 disabled:opacity-60">
                            <Send size={16} />
                            <span>{submitting ? 'Posting...' : 'Post Service'}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const Navbar = ({ setIsLeftSidebarOpen, setIsRightSidebarOpen, handleLogout, isSidebarCollapsed, toggleCollapse }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isCreateDropdownOpen, setIsCreateDropdownOpen] = useState(false);
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);
    const [isSellerPostModalOpen, setIsSellerPostModalOpen] = useState(false);
    const [postModalAction, setPostModalAction] = useState('default');
    const [profile, setProfile] = useState(null);
    const { theme, toggleTheme } = useTheme();
    const dropdownRef = useRef(null);
    const createDropdownRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    const logoSrc = theme === 'dark' ? '/logo/yor-bux-dark-logo.png' : '/logo/yor-bux-primary-logo.png';
    const displayName = profile?.user?.fullname || profile?.user?.name || 'YorBux User';
    const avatar = profile?.user?.profileImage || 'https://i.pravatar.cc/40?u=yorbux-user';
    const isSeller = hasSellerRole(profile);

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
            if (createDropdownRef.current && !createDropdownRef.current.contains(event.target)) {
                setIsCreateDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, []);

    useEffect(() => {
        setIsDropdownOpen(false);
        setIsCreateDropdownOpen(false);
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

    const handleNormalPost = () => {
        setIsCreateDropdownOpen(false);
        setPostModalAction('default');
        setIsPostModalOpen(true);
    };

    const handleSellerPost = () => {
        setIsCreateDropdownOpen(false);
        setIsSellerPostModalOpen(true);
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
                    <div ref={createDropdownRef} className="relative">
                        <button
                            onClick={() => setIsCreateDropdownOpen((current) => !current)}
                            className="bg-action-blue text-white p-2.5 rounded-full hover:opacity-90 shadow-md shadow-action-blue/20 transition-all"
                            aria-label="Create"
                            aria-expanded={isCreateDropdownOpen}
                        >
                            <Plus size={20} />
                        </button>
                        {isCreateDropdownOpen && (
                            <div className="absolute right-0 mt-3 w-52 bg-bg-surface rounded-xl shadow-xl z-30 border border-border-ui py-2 overflow-hidden">
                                <button
                                    onClick={handleNormalPost}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-text-main hover:bg-bg-page text-sm font-medium transition-colors text-left"
                                >
                                    <FileText size={18} />
                                    <span>Normal User Post</span>
                                </button>
                                {isSeller ? (
                                    <button
                                        onClick={handleSellerPost}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-text-main hover:bg-bg-page text-sm font-medium transition-colors text-left"
                                    >
                                        <Store size={18} />
                                        <span>Seller Post</span>
                                    </button>
                                ) : null}
                            </div>
                        )}
                    </div>
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
                </div>
            </header>
            <CreatePostModal
                isOpen={isPostModalOpen}
                onClose={() => setIsPostModalOpen(false)}
                currentUserProfile={profile}
                initialAction={postModalAction}
            />
            <SellerPostModal
                isOpen={isSellerPostModalOpen}
                onClose={() => setIsSellerPostModalOpen(false)}
                currentUserProfile={profile}
            />
        </>
    );
};

export default Navbar;
