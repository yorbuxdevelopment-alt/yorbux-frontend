import React, { useEffect, useState } from 'react';
import { Globe, Facebook, Twitter, Instagram, Search } from 'lucide-react';
import { disconnectMember, getMembers, ignoreMember, sendConnectionRequest } from '../services/members';

const PAGE_SIZE = 9;

const ConnectionCard = ({ member, onIgnore, onStatusChange }) => {
  const [actionLoading, setActionLoading] = useState(false);
  const isConnected = member.relationStatus === 'active';
  const isPending = member.relationStatus === 'pending_sent' || member.relationStatus === 'pending_received';

  const handleConnect = async () => {
    setActionLoading(true);

    try {
      await sendConnectionRequest(member.id);
      onStatusChange(member.id, 'pending_sent');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDisconnect = async () => {
    setActionLoading(true);

    try {
      await disconnectMember(member.id);
      onStatusChange(member.id, 'none');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="bg-bg-surface rounded-[14px] p-5 flex flex-col gap-5 border border-transparent hover:border-border-ui/50 transition-all shadow-sm">
      <div className="flex items-start gap-4">
        <div className="w-[62px] h-[62px] rounded-full overflow-hidden shrink-0 shadow-inner">
          <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col gap-2.5 overflow-hidden">
          <div className="leading-tight">
            <h4 className="text-text-main font-bold text-[15px] truncate tracking-wide">{member.name}</h4>
            <p className="text-text-sec text-[12px] mt-0.5 truncate font-medium">{member.role}</p>
            {member.location ? (
              <p className="text-text-sec/80 text-[11px] mt-1 truncate">{member.location}</p>
            ) : null}
          </div>
          <div className="flex gap-3 text-text-sec">
            <Globe size={15} className="cursor-pointer hover:text-text-main transition-colors" />
            <Facebook size={15} className="cursor-pointer hover:text-text-main transition-colors" />
            <Twitter size={15} className="cursor-pointer hover:text-text-main transition-colors" />
            <Instagram size={15} className="cursor-pointer hover:text-text-main transition-colors" />
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <button
          onClick={() => onIgnore(member.id)}
          className="flex-1 bg-bg-page/50 border border-border-ui hover:bg-bg-page text-text-sec hover:text-text-main py-2.5 rounded-xl text-[13px] font-semibold transition-all"
        >
          Ignore
        </button>
        {isConnected ? (
          <button
            onClick={handleDisconnect}
            disabled={actionLoading}
            className="flex-1 bg-transparent border border-border-ui hover:bg-bg-page text-text-main py-2.5 rounded-xl text-[13px] font-semibold transition-all disabled:opacity-60"
          >
            {actionLoading ? 'Updating...' : 'Disconnect'}
          </button>
        ) : (
          <button
            onClick={handleConnect}
            disabled={actionLoading || isPending}
            className="flex-1 bg-action-blue hover:opacity-90 text-white py-2.5 rounded-xl text-[13px] font-semibold transition-all shadow-md shadow-action-blue/10 disabled:opacity-60"
          >
            {actionLoading ? 'Sending...' : isPending ? 'Requested' : 'Connect'}
          </button>
        )}
      </div>
    </div>
  );
};

const CommunityPage = () => {
  const [members, setMembers] = useState([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(1);
      setVisibleCount(PAGE_SIZE);
    }, 300);

    return () => window.clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    let active = true;

    const loadMembers = async () => {
      if (page === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      setError('');

      try {
        const data = await getMembers({
          page,
          limit: PAGE_SIZE,
          search
        });

        if (!active) return;

        setMembers((current) => (page === 1 ? data.members : [...current, ...data.members]));
        setHasMore(Boolean(data.pagination?.hasMore));
      } catch (requestError) {
        if (!active) return;
        setError(requestError.response?.data?.message || 'Members load nahi ho paaye');
      } finally {
        if (!active) return;
        setLoading(false);
        setLoadingMore(false);
      }
    };

    loadMembers();

    return () => {
      active = false;
    };
  }, [page, search]);

  const handleLoadMore = () => {
    if (loadingMore || !hasMore) return;
    setPage((current) => current + 1);
    setVisibleCount((current) => current + PAGE_SIZE);
  };

  const handleIgnore = async (memberId) => {
    try {
      await ignoreMember(memberId);
      setMembers((current) => current.filter((member) => member.id !== memberId));
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Member ignore nahi ho paaya');
    }
  };

  const handleStatusChange = (memberId, relationStatus) => {
    setMembers((current) =>
      current.map((member) =>
        member.id === memberId
          ? {
              ...member,
              relationStatus
            }
          : member
      )
    );
  };

  return (
    <div className="space-y-6 pt-4 pb-8">
      <div className="bg-bg-surface rounded-[20px] border border-border-ui p-4 sm:p-5 shadow-sm">
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-sec" />
          <input
            type="text"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Search members by name, role, or location"
            className="w-full bg-bg-page border border-border-ui rounded-xl py-3 pl-11 pr-4 text-sm text-text-main placeholder-text-sec outline-none focus:border-action-blue"
          />
        </div>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-border-ui bg-bg-surface px-5 py-10 text-center text-sm text-text-sec">
          Members loading...
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600">
          {error}
        </div>
      ) : members.length === 0 ? (
        <div className="rounded-2xl border border-border-ui bg-bg-surface px-5 py-10 text-center">
          <p className="text-sm font-semibold text-text-main">No members found</p>
          <p className="text-xs text-text-sec mt-1">Try a different search term.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {members.slice(0, visibleCount).map((member) => (
              <ConnectionCard
                key={member.id}
                member={member}
                onIgnore={handleIgnore}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center mt-8">
              <button
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="bg-bg-surface border border-border-ui text-text-main font-bold text-sm px-10 py-3.5 rounded-xl hover:bg-bg-page transition-colors shadow-sm disabled:opacity-60"
              >
                {loadingMore ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CommunityPage;
