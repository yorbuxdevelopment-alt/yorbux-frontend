import React, { useRef, useState } from 'react';
import {
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Image as ImageIcon,
  Smile,
  Send,
  Globe,
  Users,
  CheckCircle2,
  FileText,
  Radio
} from 'lucide-react';
import ImagePreviewModal from './ImagePreviewModal';
import ShareModal from './ShareModal';
import { addPostComment, getPostComments, togglePostLike } from '../../services/posts';

const visibilityIcons = {
  Public: Globe,
  Friends: Users,
  'Specific Connections': CheckCircle2
};

const COMMENT_EMOJIS = ['😀', '😍', '🔥', '👏', '🎉', '👍', '🙏', '💯'];

const ImageGrid = ({ images, onImageClick }) => {
  if (!images?.length) return null;

  if (images.length === 1) {
    return (
      <div className="max-h-[500px] overflow-hidden cursor-pointer" onClick={() => onImageClick(0)}>
        <img src={images[0]} alt="Post content" className="w-full h-full object-cover" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-1">
      {images.slice(0, 4).map((image, index) => (
        <div key={image} className="cursor-pointer" onClick={() => onImageClick(index)}>
          <img src={image} alt={`Post content ${index + 1}`} className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
  );
};

export default function PostCard({ post, onPostUpdated, onPostUpdate, currentUserProfile = null }) {
  const fileInputRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(Boolean(post?.isLiked));
  const [likesCount, setLikesCount] = useState(Number(post?.likesCount || 0));
  const [commentsCount, setCommentsCount] = useState(Number(post?.commentsCount || 0));
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [comments, setComments] = useState([]);
  const [commentsLoaded, setCommentsLoaded] = useState(false);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [commentError, setCommentError] = useState('');
  const [likeLoading, setLikeLoading] = useState(false);
  const [commentSubmitting, setCommentSubmitting] = useState(false);
  const [selectedCommentMedia, setSelectedCommentMedia] = useState(null);
  const [selectedCommentMediaPreview, setSelectedCommentMediaPreview] = useState('');
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);

  const data = {
    ...post,
    author: post?.author || { name: 'YorBux User', avatar: 'https://i.pravatar.cc/48?u=yorbux-user' },
    timestamp: post?.timestamp || 'Just now',
    content: post?.content || '',
    images: post?.images || [],
    visibilityLabel: post?.visibilityLabel || 'Public'
  };
  const currentUserAvatar =
    currentUserProfile?.user?.profileImage ||
    currentUserProfile?.avatar ||
    'https://i.pravatar.cc/40?u=yorbux-commenter';
  const handlePostUpdated = onPostUpdated || onPostUpdate;

  const VisibilityIcon = visibilityIcons[data.visibilityLabel] || Globe;

  const handleImageClick = (index) => {
    setStartIndex(index);
    setIsModalOpen(true);
  };

  const resetCommentComposer = () => {
    setCommentInput('');
    setSelectedCommentMedia(null);
    setSelectedCommentMediaPreview('');
    setIsEmojiOpen(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const loadComments = async () => {
    if (!post?.id) return;

    setCommentsLoading(true);
    setCommentError('');

    try {
      const response = await getPostComments(post.id, { page: 1, limit: 20 });
      setComments(response.comments || []);
      setCommentsLoaded(true);
      setCommentsCount(response.total ?? response.comments?.length ?? commentsCount);
    } catch (requestError) {
      setCommentError(requestError.response?.data?.message || 'Comments load nahi ho paaye');
    } finally {
      setCommentsLoading(false);
    }
  };

  const handleToggleComments = async () => {
    const nextOpen = !isCommentOpen;
    setIsCommentOpen(nextOpen);

    if (nextOpen && !commentsLoaded) {
      await loadComments();
    }
  };

  const handleLike = async () => {
    if (!post?.id || likeLoading) return;

    setLikeLoading(true);

    try {
      const response = await togglePostLike(post.id);
      const nextLiked = Boolean(response.liked);
      const nextLikesCount = Number(response.likesCount ?? likesCount);

      setIsLiked(nextLiked);
      setLikesCount(nextLikesCount);
      handlePostUpdated?.({ id: post.id, isLiked: nextLiked, likesCount: nextLikesCount });
    } catch (requestError) {
      console.error(requestError);
    } finally {
      setLikeLoading(false);
    }
  };

  const handleCommentSubmit = async () => {
    if ((!commentInput.trim() && !selectedCommentMedia) || !post?.id || commentSubmitting) return;

    setCommentSubmitting(true);
    setCommentError('');

    try {
      const response = await addPostComment(post.id, {
        text: commentInput.trim(),
        mediaFile: selectedCommentMedia
      });
      const nextComments = response.comment ? [response.comment, ...comments] : comments;
      const nextCount = commentsCount + (response.comment ? 1 : 0);

      setComments(nextComments);
      setCommentsCount(nextCount);
      setCommentsLoaded(true);
      resetCommentComposer();
      handlePostUpdated?.({ id: post.id, commentsCount: nextCount });
    } catch (requestError) {
      setCommentError(requestError.response?.data?.message || 'Comment send nahi ho paaya');
    } finally {
      setCommentSubmitting(false);
    }
  };

  const handleCommentMediaSelect = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setSelectedCommentMedia(file);

    if (file.type.startsWith('image/')) {
      setSelectedCommentMediaPreview(URL.createObjectURL(file));
    } else {
      setSelectedCommentMediaPreview('');
    }
  };

  const handleEmojiPick = (emoji) => {
    setCommentInput((current) => `${current}${emoji}`);
    setIsEmojiOpen(false);
  };

  return (
    <>
      <div className="bg-bg-surface rounded-xl shadow-sm mb-6 border border-border-ui transition-all duration-300">
        <div className="flex justify-between items-start p-6 pb-4">
          <div className="flex items-center gap-3">
            <img
              src={data.author.avatar}
              className="w-12 h-12 rounded-full border border-border-ui/20 object-cover"
              alt={data.author.name}
            />
            <div>
              <h4 className="font-bold text-text-main text-sm">{data.author.name}</h4>
              <div className="flex items-center gap-2 text-xs text-text-sec">
                <span>{data.timestamp}</span>
                <span className="inline-flex items-center gap-1">
                  <VisibilityIcon size={12} />
                  {data.visibilityLabel}
                </span>
              </div>
            </div>
          </div>
          <button className="text-text-sec hover:text-text-main transition-colors">
            <MoreHorizontal size={20} />
          </button>
        </div>

        {data.feeling ? (
          <div className="px-6 pb-2 text-sm font-medium text-text-main">
            is feeling {data.feeling.emoji} {data.feeling.label}
          </div>
        ) : null}

        {data.isLive ? (
          <div className="px-6 pb-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-600">
              <Radio size={14} />
              Live video
            </span>
          </div>
        ) : null}

        {data.content ? (
          <p className="text-text-main mb-4 text-sm leading-relaxed px-6 whitespace-pre-wrap">{data.content}</p>
        ) : null}

        {data.images.length ? (
          <div className="mb-4">
            <ImageGrid images={data.images} onImageClick={handleImageClick} />
          </div>
        ) : null}

        {data.videoUrl ? (
          <div className="mb-4 px-6">
            <video src={data.videoUrl} controls className="w-full rounded-xl border border-border-ui bg-black" />
          </div>
        ) : null}

        {data.pdfUrl ? (
          <div className="mb-4 px-6">
            <a
              href={data.pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-xl border border-border-ui bg-bg-page px-4 py-3 text-text-main hover:border-action-blue/30"
            >
              <FileText size={18} className="text-action-blue" />
              <span className="text-sm font-medium">Open attached PDF</span>
            </a>
          </div>
        ) : null}

        <div className="flex items-center justify-between px-6 pb-4">
          <div className="text-xs text-text-sec">
            <span className="font-bold text-text-main">{likesCount}</span> likes
          </div>
          <div className="text-xs text-text-sec flex gap-4">
            <span>{commentsCount} Comments</span>
            <span>{data.sharesCount || 0} Shares</span>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-border-ui/10 p-2 mx-4">
          <button
            onClick={handleLike}
            disabled={likeLoading}
            className={`flex items-center gap-2 font-bold text-xs transition-colors p-2 rounded-lg w-1/3 justify-center ${
              isLiked ? 'text-red-500' : 'text-text-sec hover:bg-bg-page/50'
            }`}
          >
            <Heart fill={isLiked ? 'currentColor' : 'none'} size={18} />
            <span>{likeLoading ? 'Please wait' : 'Like'}</span>
          </button>
          <button
            onClick={handleToggleComments}
            className="flex items-center gap-2 text-text-sec hover:bg-bg-page/50 font-bold text-xs transition-colors p-2 rounded-lg w-1/3 justify-center"
          >
            <MessageCircle size={18} />
            <span>Comment</span>
          </button>
          <button
            onClick={() => setIsShareOpen(true)}
            className="flex items-center gap-2 text-text-sec hover:bg-bg-page/50 font-bold text-xs transition-colors p-2 rounded-lg w-1/3 justify-center"
          >
            <Share2 size={18} />
            <span>Share</span>
          </button>
        </div>

        {isCommentOpen ? (
          <div className="p-4 border-t border-border-ui/10 mx-4">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*,application/pdf"
              className="hidden"
              onChange={handleCommentMediaSelect}
            />
            <div className="flex items-center gap-3">
              <img src={currentUserAvatar} alt="Your avatar" className="w-8 h-8 rounded-full object-cover" />
              <div className="relative flex-1">
                <input
                  type="text"
                  value={commentInput}
                  onChange={(event) => setCommentInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      event.preventDefault();
                      handleCommentSubmit();
                    }
                  }}
                  placeholder="Write a comment..."
                  className="w-full bg-bg-page border border-border-ui rounded-full py-2 px-4 pr-24 text-sm focus:outline-none"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="p-1 hover:bg-bg-surface rounded-full text-text-sec"
                  >
                    <ImageIcon size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEmojiOpen((current) => !current)}
                    className="p-1 hover:bg-bg-surface rounded-full text-text-sec"
                  >
                    <Smile size={16} />
                  </button>
                  <button type="button" onClick={handleCommentSubmit} className="p-1 text-action-blue">
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </div>

            {selectedCommentMedia ? (
              <div className="mt-3 rounded-2xl border border-border-ui bg-bg-page p-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-text-main truncate">{selectedCommentMedia.name}</p>
                    <p className="text-xs text-text-sec mt-1">
                      {selectedCommentMedia.type.startsWith('image/')
                        ? 'Image attachment ready'
                        : selectedCommentMedia.type.startsWith('video/')
                          ? 'Video attachment ready'
                          : 'PDF attachment ready'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={resetCommentComposer}
                    className="text-xs font-semibold text-red-500 hover:text-red-600"
                  >
                    Remove
                  </button>
                </div>
                {selectedCommentMediaPreview ? (
                  <img src={selectedCommentMediaPreview} alt="Comment preview" className="mt-3 max-h-48 rounded-xl object-cover" />
                ) : null}
              </div>
            ) : null}

            {isEmojiOpen ? (
              <div className="mt-3 flex flex-wrap gap-2 rounded-2xl border border-border-ui bg-bg-page p-3">
                {COMMENT_EMOJIS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => handleEmojiPick(emoji)}
                    className="rounded-xl bg-bg-surface px-3 py-2 text-lg hover:bg-border-ui/20"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            ) : null}

            {commentError ? <p className="mt-3 text-sm text-red-500">{commentError}</p> : null}
            {commentsLoading ? <p className="mt-3 text-sm text-text-sec">Comments loading...</p> : null}

            {comments.length ? (
              <div className="mt-4 space-y-3">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex items-start gap-3">
                    <img src={comment.author.avatar} alt={comment.author.name} className="w-8 h-8 rounded-full object-cover" />
                    <div className="flex-1 rounded-2xl bg-bg-page px-4 py-3">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-bold text-text-main">{comment.author.name}</p>
                        <span className="text-xs text-text-sec">{comment.timestamp}</span>
                      </div>
                      {comment.text ? <p className="mt-1 text-sm text-text-main">{comment.text}</p> : null}
                      {comment.mediaUrl && comment.mediaType === 'image' ? (
                        <img src={comment.mediaUrl} alt="Comment attachment" className="mt-3 max-h-56 rounded-xl object-cover" />
                      ) : null}
                      {comment.mediaUrl && comment.mediaType === 'video' ? (
                        <video src={comment.mediaUrl} controls className="mt-3 max-h-56 rounded-xl" />
                      ) : null}
                      {comment.mediaUrl && comment.mediaType === 'pdf' ? (
                        <a
                          href={comment.mediaUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-3 inline-flex items-center gap-2 rounded-xl border border-border-ui px-3 py-2 text-sm font-medium text-action-blue"
                        >
                          <FileText size={16} />
                          Open PDF
                        </a>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            ) : !commentsLoading && commentsLoaded ? (
              <p className="mt-3 text-sm text-text-sec">No comments yet.</p>
            ) : null}

            {commentSubmitting ? <p className="mt-3 text-sm text-text-sec">Comment posting...</p> : null}
          </div>
        ) : null}
      </div>

      {isModalOpen ? (
        <ImagePreviewModal images={data.images} startIndex={startIndex} onClose={() => setIsModalOpen(false)} />
      ) : null}
      <ShareModal isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} post={post} />
    </>
  );
}
