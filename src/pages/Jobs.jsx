import React, { useEffect, useState } from 'react';
import { Search, Briefcase, MapPin, Clock3, Plus, RefreshCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getJobs } from '../services/jobs';

const formatDate = (value) => {
  if (!value) return 'Date unavailable';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return 'Date unavailable';
  }

  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(date);
};

const decodeTokenUserId = (token) => {
  if (!token) return '';

  try {
    const [, payload] = token.split('.');
    if (!payload) return '';

    const normalizedPayload = payload.replace(/-/g, '+').replace(/_/g, '/');
    const decodedPayload = window.atob(normalizedPayload);
    const parsedPayload = JSON.parse(decodedPayload);
    return parsedPayload?.user?._id || '';
  } catch {
    return '';
  }
};

const JobTabs = ({ activeTab, setActiveTab, navigate, onRefresh, isRefreshing }) => {
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
      <div className="pb-3 w-full sm:w-auto flex gap-3">
        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className="w-full sm:w-auto border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-60 text-gray-700 px-4 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-colors"
        >
          <RefreshCcw size={16} className={isRefreshing ? 'animate-spin' : ''} /> Refresh
        </button>
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

const JobCard = ({ job }) => (
  <div className="border border-gray-200 rounded-lg bg-white hover:shadow-md transition-all flex flex-col h-full group">
    <div className="p-5 flex justify-between items-start">
      <div className="flex-1 pr-4">
        <h3 className="text-[17px] font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">{job.title}</h3>
        <p className="text-blue-500 font-semibold text-sm mt-1.5 truncate">{job.company}</p>
        <div className="mt-2 space-y-1.5">
          <p className="text-gray-500 text-[13px] font-medium flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span>{[job.location, job.state, job.country].filter(Boolean).join(', ') || 'Location not specified'}</span>
          </p>
          <p className="text-gray-500 text-[13px] font-medium flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-gray-400" />
            <span>{job.salary || 'Salary not specified'}</span>
          </p>
        </div>
      </div>
      <div className="w-16 h-16 rounded-lg flex-shrink-0 border border-blue-100 bg-blue-50 shadow-inner flex items-center justify-center">
        <Briefcase className="h-7 w-7 text-blue-500" />
      </div>
    </div>

    <div className="px-5 py-3 border-t border-gray-100 flex items-center gap-6 mt-auto">
      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
        job.status === 'OPEN' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-700'
      }`}>
        {job.status || 'OPEN'}
      </span>
      <span className="text-sm font-medium text-gray-500">
        {job.education || 'Education not specified'}
      </span>
    </div>

    <div className="px-5 py-3.5 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50/50 rounded-b-lg">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Clock3 className="h-4 w-4 text-gray-400" />
          <span className="text-xs text-gray-500 font-medium">Posted {formatDate(job.createdAt)}</span>
        </div>
        <span className="text-xs text-gray-400 font-medium block">Valid till {formatDate(job.validDate)}</span>
      </div>
      <div className="flex justify-start sm:justify-end">
        <div className="text-right">
          <p className="text-sm font-bold text-gray-800">{job.postedBy?.name || 'YorBux recruiter'}</p>
          <p className="text-xs text-gray-500">Posted by</p>
        </div>
      </div>
    </div>
  </div>
);

const Jobs = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token) || localStorage.getItem('token') || '';
  const currentUserId = decodeTokenUserId(token);

  const loadJobs = async ({ silent = false } = {}) => {
    if (silent) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    setError('');

    try {
      const data = await getJobs({ page: 1, limit: 30 });
      setJobs(data.jobs || []);
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Jobs load nahi ho paaye');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const isMine = Boolean(currentUserId) && job.postedBy?._id === currentUserId;
    const matchesTab = activeTab === 'All' ? true : activeTab === 'By Me' ? isMine : !isMine;
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch = !query || [job.title, job.company, job.location, job.state, job.country]
      .filter(Boolean)
      .some((value) => value.toLowerCase().includes(query));

    return matchesTab && matchesSearch;
  });

  return (
    <div className="min-h-full bg-blue-50/40 p-4 sm:p-6 font-sans">
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 w-full border border-gray-200">
        <div className="flex w-full mb-8">
          <input
            type="text"
            placeholder="Search jobs by title, company or location..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="flex-1 border border-gray-300 border-r-0 rounded-l-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
          <button className="bg-gray-50 border border-gray-300 rounded-r-lg px-5 py-3 hover:bg-gray-100 transition-colors flex items-center justify-center cursor-pointer">
            <Search className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        <JobTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          navigate={navigate}
          onRefresh={() => loadJobs({ silent: true })}
          isRefreshing={refreshing}
        />

        {loading ? (
          <div className="py-16 text-center text-gray-500 font-medium">Jobs loading...</div>
        ) : error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700 flex items-center justify-between gap-4">
            <span>{error}</span>
            <button onClick={() => loadJobs()} className="rounded-lg bg-white px-4 py-2 font-bold text-red-700 border border-red-200">
              Retry
            </button>
          </div>
        ) : (
          <>
            <div className="mb-5 flex items-center justify-between text-sm text-gray-500">
              <p>{filteredJobs.length} jobs visible</p>
              <p>Total fetched: {jobs.length}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => <JobCard key={job._id} job={job} />)
              ) : (
                <div className="col-span-full py-12 text-center text-gray-500 font-medium">
                  No jobs found for this category.
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Jobs;
