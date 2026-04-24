import api from '../../api';

const pickFirst = (...values) => values.find((value) => value !== undefined && value !== null && value !== '');

const VISIBILITY_LABELS = {
  PUBLIC: 'Public',
  MY_CONNECTIONS: 'Friends',
  SPECIFIC_CONNECTIONS: 'Specific Connections'
};

const formatRelativeTime = (value) => {
  if (!value) return 'Just now';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Just now';

  const diffMs = Date.now() - date.getTime();
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diffMs < minute) return 'Just now';
  if (diffMs < hour) return `${Math.floor(diffMs / minute)} min ago`;
  if (diffMs < day) return `${Math.floor(diffMs / hour)} hr ago`;
  if (diffMs < 7 * day) return `${Math.floor(diffMs / day)} day ago`;

  return date.toLocaleDateString();
};

export const normalizePost = (post = {}) => {
  const author = post.authorId || post.author || {};
  const mediaUrl = pickFirst(post.mediaUrl, post.media, post.image);
  const contentType = pickFirst(post.contentType, mediaUrl ? 'image' : 'text');

  return {
    ...post,
    id: pickFirst(post.id, post._id),
    author: {
      id: pickFirst(author.id, author._id, post.authorId),
      name: pickFirst(author.name, author.fullname, [author.firstName, author.lastName].filter(Boolean).join(' '), 'YorBux User'),
      avatar: pickFirst(author.profilePic, author.profileImage, post.authorAvatar, 'https://i.pravatar.cc/150?u=yorbux-user')
    },
    content: pickFirst(post.contentBody, post.content, ''),
    mediaUrl,
    contentType,
    images: contentType === 'image' && mediaUrl ? [mediaUrl] : [],
    videoUrl: contentType === 'video' ? mediaUrl : '',
    pdfUrl: contentType === 'pdf' ? mediaUrl : '',
    likesCount: Number(post.likesCount || 0),
    commentsCount: Number(post.commentsCount || 0),
    sharesCount: Number(post.sharesCount || 0),
    timestamp: formatRelativeTime(pickFirst(post.createdAt, post.updatedAt)),
    visibilityLabel: VISIBILITY_LABELS[pickFirst(post.publishType, 'PUBLIC')] || 'Public',
    isLiked: Boolean(post.isLiked),
    isLive: Boolean(post.isLive),
    feeling: post.feeling
      ? {
          key: pickFirst(post.feeling.key, ''),
          label: pickFirst(post.feeling.label, post.feeling.key, ''),
          emoji: pickFirst(post.feeling.emoji, '')
        }
      : null
  };
};

export const normalizeComment = (comment = {}) => {
  const author = comment.userId || comment.author || {};

  return {
    ...comment,
    id: pickFirst(comment.id, comment._id),
    text: String(pickFirst(comment.commentText, comment.comment, '')).trim(),
    timestamp: formatRelativeTime(comment.createdAt),
    mediaUrl: pickFirst(comment.mediaUrl, comment.media, ''),
    mediaType: pickFirst(comment.mediaType, ''),
    author: {
      id: pickFirst(author.id, author._id, comment.userId),
      name: pickFirst(author.name, [author.firstName, author.lastName].filter(Boolean).join(' '), 'YorBux User'),
      avatar: pickFirst(author.profilePic, author.profileImage, 'https://i.pravatar.cc/150?u=yorbux-comment')
    }
  };
};

export const getFeedPosts = async (params = {}) => {
  const response = await api.get('/posts/feed', { params });
  const payload = response.data || {};

  return {
    ...payload,
    posts: Array.isArray(payload.posts) ? payload.posts.map(normalizePost) : []
  };
};

export const getMyPosts = async (params = {}) => {
  const response = await api.get('/posts/me', { params });
  const payload = response.data || {};

  return {
    ...payload,
    posts: Array.isArray(payload.posts) ? payload.posts.map(normalizePost) : []
  };
};

export const createPost = async ({ content, publishType, specificConnections = [], mediaFile, isLive = false, feeling = null }) => {
  const formData = new FormData();

  if (content?.trim()) {
    formData.append('contentBody', content.trim());
  }

  if (publishType) {
    formData.append('publishType', publishType);
  }

  if (specificConnections.length) {
    formData.append('specificConnections', JSON.stringify(specificConnections));
  }

  if (isLive) {
    formData.append('isLive', 'true');
  }

  if (feeling) {
    formData.append('feeling', JSON.stringify(feeling));
  }

  if (mediaFile) {
    formData.append('media', mediaFile);
  }

  const response = await api.post('/posts', formData);
  const payload = response.data || {};

  return {
    ...payload,
    post: payload.post ? normalizePost(payload.post) : null
  };
};

export const togglePostLike = async (postId) => {
  const response = await api.post(`/posts/${postId}/like`);
  return response.data || {};
};

export const getPostComments = async (postId, params = {}) => {
  const response = await api.get(`/posts/${postId}/comments`, { params });
  const payload = response.data || {};

  return {
    ...payload,
    comments: Array.isArray(payload.comments) ? payload.comments.map(normalizeComment) : []
  };
};

export const addPostComment = async (postId, comment) => {
  let requestPayload = { comment };

  if (typeof comment === 'object' && comment !== null) {
    const formData = new FormData();

    if (comment.text?.trim()) {
      formData.append('comment', comment.text.trim());
    }

    if (comment.mediaFile) {
      formData.append('media', comment.mediaFile);
    }

    requestPayload = formData;
  }

  const response = await api.post(`/posts/${postId}/comment`, requestPayload);
  const payload = response.data || {};

  return {
    ...payload,
    comment: payload.comment ? normalizeComment(payload.comment) : null
  };
};

export const getConnections = async () => {
  const response = await api.get('/connections/list');
  const payload = response.data || {};

  return Array.isArray(payload.connections)
    ? payload.connections.map((connection) => ({
        id: pickFirst(connection.id, connection._id),
        name: pickFirst(connection.name, [connection.firstName, connection.lastName].filter(Boolean).join(' '), 'Connection'),
        avatar: pickFirst(connection.profilePic, connection.profileImage, 'https://i.pravatar.cc/150?u=yorbux-connection')
      }))
    : [];
};
