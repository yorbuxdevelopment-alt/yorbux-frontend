import React, { useEffect, useState } from 'react';
import { Plus, X } from 'lucide-react';
import { getUserSuggestions, ignoreSuggestedUser, sendConnectionRequest } from '../../services/suggestions';

const SuggestionWidget = () => {
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
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <h3 className="font-bold text-gray-800 text-md mb-4">You Might Like</h3>

      {loading ? (
        <p className="text-sm text-gray-500">Suggestions loading...</p>
      ) : error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : !suggestion ? (
        <p className="text-sm text-gray-500">No new suggestions right now.</p>
      ) : (
        <div className="flex items-center space-x-4">
          <img src={suggestion.avatar} className="w-12 h-12 rounded-full object-cover" alt={suggestion.name} />
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-gray-900 text-sm line-clamp-1">{suggestion.name}</h4>
            <p className="text-gray-500 text-xs line-clamp-1">{suggestion.role}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleIgnore}
              disabled={actionUserId === suggestion.id}
              className="p-2 bg-gray-100 text-gray-500 rounded-full hover:bg-gray-200 transition disabled:opacity-60"
              title="Ignore"
            >
              <X size={16} />
            </button>
            <button
              onClick={handleFollow}
              disabled={actionUserId === suggestion.id}
              className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition disabled:opacity-60"
            >
              <Plus size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuggestionWidget;
