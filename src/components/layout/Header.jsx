import React from 'react';
import { Search, Bell, Menu } from 'lucide-react';

const Header = ({ setSidebarOpen }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b h-16 flex items-center justify-center px-4 shadow-sm">
      <div className="max-w-[1440px] w-full flex items-center justify-between">
        {/* Left Side: Logo & Search */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#377DFF] rounded-lg flex items-center justify-center text-white font-bold text-lg">
              Y
            </div>
            <span className="text-xl font-bold text-gray-800 hidden sm:block">YorBux</span>
          </div>

          {/* Search Bar */}
          <div className="relative hidden lg:block w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full bg-[#F0F2F5] border-none rounded-full py-2.5 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-[#377DFF]/50 transition-all" 
              />
          </div>
        </div>

        {/* Right Side: Profile & Notifications */}
        <div className="flex items-center gap-4">
          <button className="text-gray-500 hover:text-[#377DFF] transition p-2 hover:bg-gray-100 rounded-full relative">
            <Bell className="w-6 h-6" />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          
          <div className="flex items-center gap-3 cursor-pointer">
            <img 
              src="https://i.pravatar.cc/150?u=lokesh" 
              alt="User Avatar" 
              className="w-10 h-10 rounded-full border-2 border-gray-200 object-cover" 
            />
            <div className="hidden md:block">
              <span className="text-sm font-semibold text-gray-800">Lokesh</span>
              <p className="text-xs text-gray-500">Developer</p>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setSidebarOpen && setSidebarOpen(true)} className="lg:hidden text-gray-600 hover:text-[#377DFF] transition-colors">
              <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
