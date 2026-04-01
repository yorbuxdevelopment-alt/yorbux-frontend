import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import RightBar from './RightBar';
import FriendsList from '../widgets/FriendsList';
import { X } from 'lucide-react';

function MainLayout({ handleLogout }) {
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const location = useLocation();

  const showRightBar = location.pathname === '/';
  const showFriendsList = !['/profile', '/settings', '/messages'].includes(location.pathname);

  return (
    <div className="bg-bg-page h-screen flex flex-col">
      <div className="flex-shrink-0 z-20">
        <Navbar 
          setIsLeftSidebarOpen={setIsLeftSidebarOpen} 
          setIsRightSidebarOpen={setIsRightSidebarOpen} 
          handleLogout={handleLogout} // Pass it to Navbar
        />
      </div>

      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden md:block w-72 flex-shrink-0">
          <div className="h-full">
            <Sidebar handleLogout={handleLogout} />
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto no-scrollbar p-8">
          <Outlet />
        </main>

        {showRightBar && (
          <aside className="hidden lg:block w-[360px] flex-shrink-0 p-2 overflow-y-auto no-scrollbar">
            <RightBar />
          </aside>
        )}
        
        {showFriendsList && (
          <aside className="hidden xl:block w-80 flex-shrink-0">
            <div className="h-full bg-bg-surface overflow-y-auto no-scrollbar">
              <FriendsList />
            </div>
          </aside>
        )}

        <div 
          className={`fixed top-0 left-0 h-full w-64 bg-bg-surface z-50 transform transition-transform duration-300 ease-in-out 
            ${isLeftSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            md:hidden border-r border-border-ui
          `}
        >
          <Sidebar handleLogout={handleLogout} />
          <button onClick={() => setIsLeftSidebarOpen(false)} className="absolute top-4 right-4 text-text-sec">
            <X size={24} />
          </button>
        </div>
        {isLeftSidebarOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setIsLeftSidebarOpen(false)}></div>
        )}

        {showFriendsList && (
          <>
            <div 
              className={`fixed top-0 right-0 h-full w-80 bg-bg-surface z-50 transform transition-transform duration-300 ease-in-out 
                ${isRightSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
                lg:hidden border-l border-border-ui p-4 space-y-4 overflow-y-auto no-scrollbar
              `}
            >
              <button onClick={() => setIsRightSidebarOpen(false)} className="absolute top-4 left-4 text-text-sec">
                <X size={24} />
              </button>
              <div className="mt-10">
                {showRightBar && <RightBar />}
                <div className="mt-4 h-96 bg-bg-surface rounded-2xl border border-border-ui overflow-y-auto no-scrollbar">
                  <FriendsList />
                </div>
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