import React from 'react';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';

const ExplorePage = () => {
  const trendingTopics = [
    { id: 1, topic: '#BFSIFuture', posts: '1.2M posts' },
    { id: 2, topic: '#FinTechInnovations', posts: '870K posts' },
    { id: 3, topic: '#InvestmentStrategies', posts: '540K posts' },
    { id: 4, topic: '#DigitalBanking', posts: '320K posts' },
    { id: 5, topic: '#WealthManagement', posts: '210K posts' },
  ];

  const suggestedPeople = [
    { id: 1, name: 'Anjali Sharma', role: 'FinTech Analyst', avatar: 'https://i.pravatar.cc/150?u=anjali' },
    { id: 2, name: 'Rahul Verma', role: 'Investment Advisor', avatar: 'https://i.pravatar.cc/150?u=rahul' },
    { id: 3, name: 'Priya Singh', role: 'Banking Consultant', avatar: 'https://i.pravatar.cc/150?u=priya' },
  ];

  return (
    <div className="bg-bg-page min-h-screen">
      {/* Top Navbar */}
      <div className="fixed top-0 left-0 right-0 z-10 px-6 pt-6 bg-bg-page">
        <Navbar />
      </div>

      <div className="max-w-full mx-auto grid grid-cols-12 gap-6 pt-28 px-6">
        {/* Left Global Sidebar - 2 Columns */}
        <aside className="col-span-2 sticky top-28 h-fit">
          <Sidebar />
        </aside>

        {/* Explore Content Area - 10 Columns */}
        <div className="col-span-10 space-y-6 pb-6 h-[calc(100vh-8rem)] overflow-y-auto no-scrollbar">
          
          {/* Search Bar */}
          <div className="bg-card-bg p-6 rounded-2xl border border-border-ui shadow-sm">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search Yorbux..." 
                className="w-full bg-bg-page border border-border-ui rounded-xl p-3 outline-none focus:border-action-blue text-text-main transition-all text-sm pl-10"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-sec">🔍</span>
            </div>
          </div>

          {/* Trending Topics */}
          <div className="bg-card-bg p-6 rounded-2xl border border-border-ui shadow-sm">
            <h3 className="text-h2 font-bold text-text-main mb-6">Trending Topics</h3>
            <div className="space-y-4">
              {trendingTopics.map(item => (
                <div key={item.id} className="flex justify-between items-center text-text-main hover:text-action-blue cursor-pointer transition-colors">
                  <div>
                    <p className="font-bold text-sm">{item.topic}</p>
                    <p className="text-xs text-text-sec">{item.posts}</p>
                  </div>
                  <span className="text-text-sec">❯</span>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested People */}
          <div className="bg-card-bg p-6 rounded-2xl border border-border-ui shadow-sm">
            <h3 className="text-h2 font-bold text-text-main mb-6">Suggested People</h3>
            <div className="space-y-4">
              {suggestedPeople.map(person => (
                <div key={person.id} className="flex items-center gap-4">
                  <img src={person.avatar} alt={person.name} className="w-12 h-12 rounded-full border border-border-ui/20" />
                  <div className="flex-1">
                    <p className="font-bold text-sm text-text-main">{person.name}</p>
                    <p className="text-xs text-text-sec">{person.role}</p>
                  </div>
                  <button className="bg-action-blue hover:opacity-90 text-white px-4 py-2 rounded-xl font-bold text-xs shadow-lg shadow-action-blue/20 transition-all border border-border-ui">
                    Follow
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ExplorePage;