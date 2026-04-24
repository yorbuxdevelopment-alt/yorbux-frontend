import React, { useEffect, useState } from 'react';
import { Globe, Facebook, Twitter, Instagram } from 'lucide-react';
import ConfirmationModal from './ConfirmationModal';
import ReportConfirmationModal from './ReportConfirmationModal';
import { getUserSuggestions, ignoreSuggestedUser, sendConnectionRequest } from '../../services/suggestions';

const SuggestionCard = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [isFollowModalOpen, setIsFollowModalOpen] = useState(false);
  const [isIgnoreModalOpen, setIsIgnoreModalOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

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
    if (!selectedSuggestion) return;

    setActionLoading(true);

    try {
      await ignoreSuggestedUser(selectedSuggestion.id);
      setSuggestions((current) => current.filter((item) => item.id !== selectedSuggestion.id));
      setIsIgnoreModalOpen(false);
      setSelectedSuggestion(null);
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Suggestion ignore nahi ho paayi');
    } finally {
      setActionLoading(false);
    }
  };

  const handleFollow = async () => {
    if (!selectedSuggestion) return;

    setActionLoading(true);

    try {
      await sendConnectionRequest(selectedSuggestion.id);
      setSuggestions((current) => current.filter((item) => item.id !== selectedSuggestion.id));
      setIsFollowModalOpen(false);
      setSelectedSuggestion(null);
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Follow request send nahi ho paayi');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <>
      <div className="bg-bg-surface rounded-[24px] shadow-sm border border-border-ui overflow-hidden w-full">
        <div className="flex justify-between items-center px-6 py-4 border-b border-border-ui/50">
          <h3 className="font-bold text-text-main text-lg">You Might Like</h3>
          <button className="text-action-blue font-semibold text-sm hover:underline">
            See All
          </button>
        </div>

        <div className="p-6">
          {loading ? (
            <p className="text-sm text-text-sec">Suggestions loading...</p>
          ) : error ? (
            <p className="text-sm text-red-500">{error}</p>
          ) : !suggestion ? (
            <p className="text-sm text-text-sec">No new suggestions right now.</p>
          ) : (
            <>
              <div className="flex items-start w-full gap-4 mb-4">
                <img
                  src={suggestion.avatar}
                  alt={suggestion.name}
                  className="w-10 h-10 rounded-full object-cover bg-gray-100"
                />
                <div className="flex flex-col gap-1">
                  <h4 className="font-bold text-text-main text-lg leading-tight">
                    {suggestion.name}
                  </h4>
                  <p className="text-text-sec text-xs font-medium mb-2">
                    {suggestion.role}
                  </p>
                  <div className="flex gap-4 text-text-sec/70">
                    <Globe size={18} className="cursor-pointer hover:text-action-blue transition-colors" />
                    <Facebook size={18} className="cursor-pointer hover:text-action-blue transition-colors" />
                    <Twitter size={18} className="cursor-pointer hover:text-action-blue transition-colors" />
                    <Instagram size={18} className="cursor-pointer hover:text-action-blue transition-colors" />
                  </div>
                </div>
              </div>
              <div className="flex gap-3 w-full mt-4">
                <button
                  onClick={() => {
                    setSelectedSuggestion(suggestion);
                    setIsIgnoreModalOpen(true);
                  }}
                  className="flex-1 py-2 px-4 rounded-lg border border-border-ui text-text-sec font-bold text-sm hover:bg-bg-page transition-all"
                >
                  Ignore
                </button>
                <button
                  onClick={() => {
                    setSelectedSuggestion(suggestion);
                    setIsFollowModalOpen(true);
                  }}
                  className="flex-1 py-2 px-4 rounded-lg bg-action-blue text-white font-bold text-sm hover:opacity-90 shadow-lg shadow-action-blue/20 transition-all"
                >
                  Follow
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <ConfirmationModal
        isOpen={isFollowModalOpen}
        onClose={() => {
          setIsFollowModalOpen(false);
          setSelectedSuggestion(null);
        }}
        onConfirm={handleFollow}
        username={selectedSuggestion?.username || 'yorbuxuser'}
        confirmLabel={actionLoading ? 'Sending...' : 'Follow'}
        title={`Follow @${selectedSuggestion?.username || 'yorbuxuser'}`}
        description="A connection request will be sent to this user."
      />
      <ReportConfirmationModal
        isOpen={isIgnoreModalOpen}
        onClose={() => {
          setIsIgnoreModalOpen(false);
          setSelectedSuggestion(null);
        }}
        title="Suggestion ignored"
        description="We will show a different profile next time."
        confirmLabel={actionLoading ? 'Saving...' : 'Done'}
        onDone={handleIgnore}
      />
    </>
  );
};

export default SuggestionCard;
