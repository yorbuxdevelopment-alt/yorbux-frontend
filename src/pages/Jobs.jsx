import React, { useState } from 'react';
import { Search, Heart, MessageSquare, Bookmark, Clock3, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// --- DUMMY JOBS DATA ---
const dummyJobs = [
  { id: 1, title: 'Account Executive', company: 'A N N CAPITAL FINANCE ...', type: 'Yearly', time: '31 March 2026 01:44 AM', likes: 0, comments: 1, saves: 0, isMine: false, bgImage: 'bg-gray-200' },
  { id: 2, title: 'Senior React Developer', company: 'TechNova Solutions', type: 'Monthly', time: '12 April 2026 10:30 AM', likes: 12, comments: 4, saves: 5, isMine: true, bgImage: 'bg-blue-100' },
  { id: 3, title: 'UI/UX Designer', company: 'Creative Studio Inc.', type: 'Hourly', time: '05 May 2026 04:15 PM', likes: 8, comments: 2, saves: 1, isMine: false, bgImage: 'bg-pink-100' },
  { id: 4, title: 'Backend Engineer (Node)', company: 'Serverless Tech', type: 'Yearly', time: '18 June 2026 09:00 AM', likes: 25, comments: 8, saves: 10, isMine: true, bgImage: 'bg-green-100' },
  { id: 5, title: 'Product Manager', company: 'InnovateX', type: 'Yearly', time: '22 July 2026 11:20 AM', likes: 5, comments: 0, saves: 2, isMine: false, bgImage: 'bg-purple-100' },
  { id: 6, title: 'Full Stack Developer', company: 'WebWeavers', type: 'Monthly', time: '01 August 2026 02:45 PM', likes: 45, comments: 12, saves: 20, isMine: true, bgImage: 'bg-yellow-100' },
];

// --- TABS COMPONENT ---
const JobTabs = ({ activeTab, setActiveTab, navigate }) => {
  const filterTabs = ['All', 'By Me', 'By Others'];
  
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200 mb-6">
      <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto no-scrollbar">
        {filterTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 text-sm font-semibold transition-colors rounded-t-md whitespace-nowrap ${
              activeTab === tab
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="pb-3 w-full sm:w-auto">
        <button 
          onClick={() => navigate('/post-job')}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-md shadow-blue-500/20"
        >
          <Plus size={18} /> Post A Job
        </button>
      </div>
    </div>
  );
};

// --- SINGLE JOB CARD COMPONENT ---
const JobCard = ({ job }) => (
  <div className="border border-gray-200 rounded-lg bg-white hover:shadow-md transition-all flex flex-col h-full group">
    <div className="p-5 flex justify-between items-start">
      <div className="flex-1 pr-4">
        <h3 className="text-[17px] font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">{job.title}</h3>
        <p className="text-blue-500 font-semibold text-sm mt-1.5 truncate">{job.company}</p>
        <p className="text-gray-500 text-[13px] font-medium mt-1">{job.type}</p>
      </div>
      {/* Image Placeholder */}
      <div className={`w-16 h-16 ${job.bgImage} rounded-lg flex-shrink-0 border border-gray-100 shadow-inner`}></div>
    </div>

    {/* Job Card Details (Interaction Row) */}
    <div className="px-5 py-3 border-t border-gray-100 flex items-center gap-6 mt-auto">
      <div className="flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity">
        <Heart className="h-4 w-4 text-gray-500" />
        <span className="text-gray-500 text-sm font-medium">{job.likes}</span>
      </div>
      <div className="flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity">
        <MessageSquare className="h-4 w-4 text-gray-500" />
        <span className="text-gray-500 text-sm font-medium">{job.comments}</span>
      </div>
      <div className="flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity">
        <Bookmark className="h-4 w-4 text-gray-500" />
        <span className="text-gray-500 text-sm font-medium">{job.saves}</span>
      </div>
    </div>

    {/* Timestamp & Button Row */}
    <div className="px-5 py-3.5 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50/50 rounded-b-lg">
      <div className="flex items-center gap-2">
        <Clock3 className="h-4 w-4 text-gray-400" />
        <span className="text-xs text-gray-500 font-medium">{job.time}</span>
      </div>
      <div className="flex justify-start sm:justify-end">
        <button className="border border-teal-500 text-teal-600 hover:bg-teal-50 rounded-full px-6 py-1.5 text-[13px] font-bold transition-colors">
          Read more
        </button>
      </div>
    </div>
  </div>
);

const Jobs = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Filter Logic
  const filteredJobs = dummyJobs.filter(job => {
    const matchesTab = activeTab === 'All' ? true : activeTab === 'By Me' ? job.isMine : !job.isMine;
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || job.company.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="min-h-full bg-blue-50/40 p-4 sm:p-6 font-sans">
      {/* Main Container */}
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 w-full border border-gray-200">
        
        {/* Search Section (Top) */}
        <div className="flex w-full mb-8">
          <input
            type="text"
            placeholder="Search jobs by title or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 border border-gray-300 border-r-0 rounded-l-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
          <button className="bg-gray-50 border border-gray-300 rounded-r-lg px-5 py-3 hover:bg-gray-100 transition-colors flex items-center justify-center cursor-pointer">
            <Search className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        {/* Component for Tabs and Post Button */}
        <JobTabs activeTab={activeTab} setActiveTab={setActiveTab} navigate={navigate} />

        {/* Job Cards Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map(job => <JobCard key={job.id} job={job} />)
          ) : (
            <div className="col-span-full py-12 text-center text-gray-500 font-medium">
              No jobs found for this category.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
