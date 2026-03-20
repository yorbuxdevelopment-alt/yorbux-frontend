import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Feed from '../../pages/Feed';
import RightBar from './RightBar';
import FriendsList from '../widgets/FriendsList';
import { X } from 'lucide-react'; // Import X icon for close button

function MainLayout() {
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

  return (
    <div className="bg-bg-page min-h-screen">
      {/* Fixed Navbar with Surface Background */}
      <div className="fixed top-0 left-0 right-0 z-10 px-6 pt-6 bg-bg-page">
        <Navbar 
          setIsLeftSidebarOpen={setIsLeftSidebarOpen} 
          setIsRightSidebarOpen={setIsRightSidebarOpen} 
        />
      </div>

      <div className="max-w-full mx-auto grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-1 pt-28 px-6">
        {/* Left Sidebar - Desktop (md and lg) */}
        <aside className="hidden md:col-span-2 md:block sticky top-28 h-fit">
          <Sidebar />
        </aside>

        {/* Left Sidebar Drawer (Mobile) */}
        <div 
          className={`fixed top-0 left-0 h-full w-64 bg-bg-surface z-50 transform transition-transform duration-300 ease-in-out 
            ${isLeftSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            md:hidden border-r border-border-ui
          `}
        >
          <Sidebar />
          {/* Close button for Left Sidebar */}
          <button 
            onClick={() => setIsLeftSidebarOpen(false)} 
            className="absolute top-4 right-4 text-text-sec"
          >
            <X size={24} />
          </button>
        </div>

        {/* Overlay for Left Sidebar */}
        {isLeftSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" 
            onClick={() => setIsLeftSidebarOpen(false)}
          ></div>
        )}

        {/* Main Feed Content */}
        <main className="col-span-full md:col-span-10 lg:col-span-5 h-[calc(100vh-8rem)] overflow-y-auto no-scrollbar pb-6">
          <Feed />
        </main>

        {/* Right Bar - Desktop (lg only) */}
        <aside className="hidden lg:col-span-3 lg:block sticky top-28 h-fit space-y-6">
          <RightBar />
        </aside>

        {/* Friends List - Desktop (lg only) */}
        <aside className="hidden lg:col-span-2 lg:block sticky top-28 h-[calc(100vh-8rem)] overflow-y-auto no-scrollbar bg-bg-surface rounded-2xl border border-border-ui">
          <FriendsList />
        </aside>

        {/* Right Sidebar Drawer (Mobile/Tablet) */}
        <div 
          className={`fixed top-0 right-0 h-full w-3/4 sm:w-1/2 md:w-1/3 bg-bg-surface z-50 transform transition-transform duration-300 ease-in-out 
            ${isRightSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
            md:hidden border-l border-border-ui
          `}
        >
          <div className="p-2 sm:p-4 space-y-2 sm:space-y-4">
            {/* Close button for Right Sidebar */}
            <button 
              onClick={() => setIsRightSidebarOpen(false)} 
              className="absolute top-4 left-4 text-text-sec"
            >
              <X size={24} />
            </button>
            <RightBar />
            <FriendsList />
          </div>
        </div>

        {/* Overlay for Right Sidebar */}
        {isRightSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsRightSidebarOpen(false)}
          ></div>
        )}
      </div>
    </div>
  );
}

export default MainLayout;