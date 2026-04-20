import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import RightBar from './RightBar';
// import FriendsList from '../widgets/FriendsList';
import { X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

function MainLayout({ handleLogout }) {
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const location = useLocation();
  const { theme } = useTheme();

  const showRightBar = location.pathname === '/';
  const logoSrc = theme === 'dark' ? '/logo/yor-bux-dark-logo.png' : '/logo/yor-bux-primary-logo.png';
  // const showFriendsList = !['/profile', '/settings', '/messages'].includes(location.pathname);

  return (
    <div className="bg-bg-page h-screen flex flex-col">
      <div className="flex-shrink-0 z-20">
        <Navbar 
          setIsLeftSidebarOpen={setIsLeftSidebarOpen} 
          setIsRightSidebarOpen={setIsRightSidebarOpen} 
          handleLogout={handleLogout} // Pass it to Navbar
          isSidebarCollapsed={isSidebarCollapsed}
          toggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* LEFT SIDEBAR - Holds Navigation */}
        <aside 
          className={`hidden md:block flex-shrink-0 bg-bg-surface border-r border-border-ui overflow-y-auto no-scrollbar transition-all duration-300 ease-in-out ${
            isSidebarCollapsed ? 'w-[88px] p-2' : 'w-[240px]'
          }`}
        >
          <Sidebar handleLogout={handleLogout} isCollapsed={isSidebarCollapsed} />
        </aside>

        <main className="flex-1 overflow-y-auto no-scrollbar p-4 md:p-6">
          <Outlet />
        </main>

        {/* RIGHT SIDEBAR - Holds RightBar and Widgets */}
        {showRightBar && (
          <aside className="hidden lg:block w-[320px] xl:w-[360px] flex-shrink-0 p-4 overflow-y-auto no-scrollbar">
            <div className="h-full space-y-6">
              <RightBar />
              {/* <FriendsList /> */}
            </div>
          </aside>
        )}

        {/* LEFT SIDE DRAWER FOR SIDEBAR */}
        <div 
          className={`fixed top-0 left-0 h-full w-[240px] bg-bg-surface z-50 transform transition-transform duration-300 ease-in-out shadow-2xl flex flex-col
            ${isLeftSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            md:hidden border-r border-border-ui overflow-hidden
          `}
        >
          <div className="flex items-center justify-between p-4 border-b border-border-ui shrink-0">
            <img src={logoSrc} alt="Yorbux" className="h-8" />
            <button onClick={() => setIsLeftSidebarOpen(false)} className="text-text-sec hover:text-action-blue z-50 bg-bg-page p-1.5 rounded-lg transition-colors">
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 h-full overflow-y-auto no-scrollbar">
            <Sidebar handleLogout={handleLogout} isCollapsed={false} />
          </div>
        </div>
        {isLeftSidebarOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setIsLeftSidebarOpen(false)}></div>
        )}

        {/* RIGHT SIDE DRAWER FOR RIGHTBAR */}
        {showRightBar && (
          <>
            <div 
              className={`fixed top-0 right-0 h-full w-[320px] bg-bg-surface z-50 transform transition-transform duration-300 ease-in-out 
                ${isRightSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
                lg:hidden border-l border-border-ui p-4 overflow-y-auto no-scrollbar
              `}
            >
              <button onClick={() => setIsRightSidebarOpen(false)} className="absolute top-4 left-4 text-text-sec z-10">
                <X size={24} />
              </button>
              <div className="mt-10 space-y-6">
                <RightBar />
                {/* <FriendsList /> */}
              </div>
            </div>
            {isRightSidebarOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setIsRightSidebarOpen(false)}></div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default MainLayout;