import { useTheme } from '../context/ThemeContext';

export default function Dashboard() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-main-bg text-main-text transition-all duration-300">
      
      {/* Navbar Example */}
      <nav className="flex items-center justify-between px-6 py-3 bg-main-card shadow-sm">
        <div className="flex items-center gap-4">
          <div className="bg-blue-600 p-2 rounded-lg text-white">M</div>
          <input 
            type="text" 
            placeholder="Search for something here..." 
            className="bg-gray-100 dark:bg-[#3a3b3c] text-main-text p-2 rounded-full outline-none w-64"
          />
        </div>

        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </nav>

      <div className="flex p-6 gap-6">
        {/* Sidebar */}
        <aside className="w-1/5 space-y-2">
          <div className="p-3 bg-blue-600/10 dark:bg-blue-600/20 text-blue-600 rounded-xl font-medium">
             Feed
          </div>
          {['My community', 'Messages', 'Notification', 'Explore'].map(item => (
            <div key={item} className="p-3 hover:bg-gray-200 dark:hover:bg-[#3a3b3c] rounded-xl cursor-pointer">
              {item}
            </div>
          ))}
        </aside>

        {/* Main Feed Card */}
        <main className="flex-1">
          <div className="bg-main-card p-5 rounded-2xl shadow-sm">
             <div className="flex gap-3 items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-400" />
                <input 
                  className="bg-gray-100 dark:bg-[#3a3b3c] flex-1 p-3 rounded-xl outline-none text-main-text"
                  placeholder="What's happening?"
                />
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold">Post</button>
             </div>
          </div>
        </main>
      </div>
    </div>
  );
}