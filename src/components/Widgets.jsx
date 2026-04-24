import React, { useEffect, useState } from 'react';
import { Camera, GraduationCap } from 'lucide-react';
import { getUserSuggestions, ignoreSuggestedUser, sendConnectionRequest } from '../services/suggestions';

const YouMightLike = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionUserId, setActionUserId] = useState('');

  useEffect(() => {
    let active = true;

    const loadSuggestions = async () => {
      setLoading(true);
      setError('');

      try {
        const data = await getUserSuggestions({ limit: 1 });
        if (!active) return;
        setSuggestions(data);
      } catch (requestError) {
        if (!active) return;
        setError(requestError.response?.data?.message || 'Suggestions load nahi ho paayi');
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadSuggestions();

    return () => {
      active = false;
    };
  }, []);

  const suggestion = suggestions[0];

  const handleIgnore = async () => {
    if (!suggestion) return;

    setActionUserId(suggestion.id);

    try {
      await ignoreSuggestedUser(suggestion.id);
      setSuggestions([]);
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Suggestion ignore nahi ho paayi');
    } finally {
      setActionUserId('');
    }
  };

  const handleFollow = async () => {
    if (!suggestion) return;

    setActionUserId(suggestion.id);

    try {
      await sendConnectionRequest(suggestion.id);
      setSuggestions([]);
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Follow request send nahi ho paayi');
    } finally {
      setActionUserId('');
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-gray-800">You Might Like</h3>
        <a href="/community" className="text-blue-500 text-sm font-medium">See All</a>
      </div>

      {loading ? (
        <p className="text-sm text-gray-500">Suggestions loading...</p>
      ) : error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : !suggestion ? (
        <p className="text-sm text-gray-500">No new suggestions right now.</p>
      ) : (
        <>
          <div className="flex items-center space-x-4 mb-6">
            <img src={suggestion.avatar} alt={suggestion.name} className="w-12 h-12 rounded-full object-cover" />
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-sm line-clamp-1">{suggestion.name}</h4>
              <p className="text-xs text-gray-400 line-clamp-1">{suggestion.role}</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={handleIgnore}
              disabled={actionUserId === suggestion.id}
              className="flex-1 py-2 border rounded-xl text-sm font-semibold text-gray-500 disabled:opacity-60"
            >
              {actionUserId === suggestion.id ? 'Saving...' : 'Ignore'}
            </button>
            <button
              onClick={handleFollow}
              disabled={actionUserId === suggestion.id}
              className="flex-1 py-2 bg-blue-600 rounded-xl text-sm font-semibold text-white disabled:opacity-60"
            >
              {actionUserId === suggestion.id ? 'Sending...' : 'Follow'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const recentEvents = [
  {
    id: 'graduation',
    title: 'Graduation Ceremony',
    description: 'The graduation ceremony is also sometimes called...',
    icon: <GraduationCap size={18} />
  },
  {
    id: 'photography',
    title: 'Photography Ideas',
    description: 'Reflections. Reflections work because they can create...',
    icon: <Camera size={18} />
  }
];

const RecentEvent = () => (
  <div className="bg-white p-6 rounded-2xl shadow-sm">
    <h3 className="font-bold text-gray-800 mb-6">Recent Event</h3>
    {recentEvents.map((event) => (
      <div key={event.id} className="flex space-x-4 items-start p-3 bg-slate-50 rounded-xl mb-4 last:mb-0">
        <div className="p-3 bg-white rounded-lg text-blue-500">{event.icon}</div>
        <div>
          <h4 className="font-bold text-sm">{event.title}</h4>
          <p className="text-[10px] text-gray-400">{event.description}</p>
        </div>
      </div>
    ))}
  </div>
);

const Widgets = () => {
  return (
    <div className="w-full xl:flex-1 space-y-6">
      <YouMightLike />
      <RecentEvent />
    </div>
  );
};

export default Widgets;
