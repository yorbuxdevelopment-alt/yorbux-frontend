import { Search, Bell, MessageSquare } from 'lucide-react';

const Navbar = () => {
    return (
        <header className="bg-white shadow-sm rounded-xl p-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
                <img src="/logo.png" alt="Meetmax" className="h-8" />
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-gray-100 rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-4">
                    <button className="relative text-gray-600 hover:text-blue-500">
                        <Bell size={24} />
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">3</span>
                    </button>
                    <button className="text-gray-600 hover:text-blue-500">
                        <MessageSquare size={24} />
                    </button>
                </div>
                <div className="flex items-center gap-3">
                    <img
                        src="https://i.pravatar.cc/40?u=saleh"
                        alt="Saleh Ahmed"
                        className="w-10 h-10 rounded-full"
                    />
                    <div>
                        <p className="font-semibold">Saleh Ahmed</p>
                        <p className="text-sm text-gray-500">@salehahmed</p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;