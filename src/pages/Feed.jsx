import React, { useEffect, useState } from 'react';
import { Image, Video, Smile, RefreshCcw } from 'lucide-react';
import PostCard from '../components/feed/PostCard';
import CreatePostModal from '../components/feed/CreatePostModal';
import { getFeedPosts } from '../services/posts';
import { getMyProfile } from '../services/profile';

const CreatePost = ({ profile, onPostClick, onRefresh, refreshing }) => {
  const displayName = profile?.user?.fullname || profile?.user?.name || 'YorBux User';
  const avatar = profile?.user?.profileImage || 'https://i.pravatar.cc/48?u=yorbux-user';

  return (
    <div className="bg-bg-surface p-4 sm:p-6 rounded-xl shadow-sm border border-border-ui w-full">
      <div className="flex items-start gap-3 sm:gap-4">
        <img
          src={avatar}
          alt={displayName}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-border-ui/20 object-cover flex-shrink-0"
        />
        <div className="w-full">
          <button
            type="button"
            onClick={onPostClick}
            className="w-full p-3 sm:p-4 bg-bg-page text-left text-text-sec rounded-xl text-sm border border-border-ui/20 hover:border-action-blue/30 transition-colors"
          >
            What&apos;s happening, {displayName.split(' ')[0]}?
          </button>

          <div className="flex flex-wrap justify-between items-center mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-border-ui/10 gap-2">
            <div className="flex gap-4 sm:gap-6">
              <button
                type="button"
                onClick={() => onPostClick('live')}
                className="flex items-center gap-1 sm:gap-2 text-text-sec hover:text-action-blue transition-colors text-xs sm:text-sm"
              >
                <Video size={16} />
                <span className="font-medium">Live</span>
              </button>
              <button
                type="button"
                onClick={() => onPostClick('photo')}
                className="flex items-center gap-1 sm:gap-2 text-text-sec hover:text-action-blue transition-colors text-xs sm:text-sm"
              >
                <Image size={16} />
                <span className="font-medium">Photo</span>
              </button>
              <button
                type="button"
                onClick={() => onPostClick('feeling')}
                className="flex items-center gap-1 sm:gap-2 text-text-sec hover:text-action-blue transition-colors text-xs sm:text-sm"
              >
                <Smile size={16} />
                <span className="font-medium">Feeling</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onRefresh}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-border-ui text-text-sec hover:text-action-blue hover:border-action-blue/30 transition-colors text-sm"
              >
                <RefreshCcw size={16} className={refreshing ? 'animate-spin' : ''} />
                Refresh
              </button>
              <button
                type="button"
                onClick={onPostClick}
                className="bg-action-blue text-white px-6 sm:px-8 py-2 sm:py-2.5 rounded-lg font-bold hover:opacity-90 shadow-lg shadow-action-blue/20 text-sm border border-border-ui"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Feed = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState('default');
  const [posts, setPosts] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const loadFeed = async ({ silent = false } = {}) => {
    if (silent) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    setError('');

    try {
      const [feedData, profileData] = await Promise.all([
        getFeedPosts({ page: 1, limit: 20 }),
        getMyProfile().catch(() => null)
      ]);

      setPosts(feedData.posts || []);
      setProfile(profileData);
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Feed load nahi ho paaya');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadFeed();
  }, []);

  useEffect(() => {
    const handleRefresh = () => {
      loadFeed({ silent: true });
    };

    window.addEventListener('feed:refresh', handleRefresh);
    return () => window.removeEventListener('feed:refresh', handleRefresh);
  }, []);

  const handlePostCreated = (createdPost) => {
    setPosts((currentPosts) => [createdPost, ...currentPosts]);
  };

  const handlePostUpdated = (updatedPost) => {
    setPosts((currentPosts) =>
      currentPosts.map((post) => (post.id === updatedPost.id ? { ...post, ...updatedPost } : post))
    );
  };

  const openComposer = (action = 'default') => {
    setModalAction(action);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <CreatePost
        profile={profile}
        onPostClick={openComposer}
        onRefresh={() => loadFeed({ silent: true })}
        refreshing={refreshing}
      />

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      ) : null}

      {loading ? (
        <div className="bg-bg-surface rounded-xl shadow-sm border border-border-ui p-6 text-sm text-text-sec">
          Feed loading...
        </div>
      ) : null}

      {!loading && !posts.length ? (
        <div className="bg-bg-surface rounded-xl shadow-sm border border-border-ui p-8 text-center">
          <h3 className="text-text-main font-bold text-lg">No posts yet</h3>
          <p className="text-text-sec text-sm mt-2">Apna first post create karke feed start karo.</p>
        </div>
      ) : null}

      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onPostUpdated={handlePostUpdated}
          currentUserProfile={profile}
        />
      ))}

      <CreatePostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPostCreated={handlePostCreated}
        currentUserProfile={profile}
        initialAction={modalAction}
      />
    </div>
  );
};

export default Feed;
