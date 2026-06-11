import api from '../../api';

const pickFirst = (...values) => values.find((value) => value !== undefined && value !== null && value !== '');

const buildName = (user = {}) =>
  pickFirst(user.name, user.fullname, [user.firstName, user.lastName].filter(Boolean).join(' '), 'YorBux Advisor');

const buildLocation = (...parts) => parts.filter(Boolean).join(', ');

export const normalizeSeller = (seller = {}) => {
  const user = seller.userId || seller.user || {};
  const serviceLocation = Array.isArray(seller.serviceLocations) ? seller.serviceLocations[0] : null;

  return {
    ...seller,
    id: pickFirst(seller.id, seller._id),
    userId: pickFirst(user.id, user._id, seller.userId),
    name: buildName(user),
    avatar: pickFirst(user.profilePic, user.profileImage, seller.businessLogo, 'https://i.pravatar.cc/150?u=yorbux-advisor'),
    title: pickFirst(seller.designation, user.designation, seller.category, 'Financial Advisor'),
    location: pickFirst(
      seller.location,
      buildLocation(serviceLocation?.city, serviceLocation?.state),
      buildLocation(user.city, user.state),
      seller.businessAddress,
      'India'
    ),
    experience: Number(seller.experienceYears || 0),
    rating: Number(seller.rating || 0),
    reviewsCount: Number(seller.reviewsCount || 0),
    services: Array.isArray(seller.servicesOffered) ? seller.servicesOffered : [],
    companies: Array.isArray(seller.associatedCompanies) ? seller.associatedCompanies : [],
    certifications: Array.isArray(seller.certifications) ? seller.certifications : [],
    verified: Boolean(seller.isVerified)
  };
};

export const normalizeArticle = (article = {}) => {
  const author = article.authorId || article.author || {};

  return {
    ...article,
    id: pickFirst(article.id, article._id),
    title: pickFirst(article.title, article.contentBody, 'Financial insight'),
    excerpt: pickFirst(article.excerpt, article.contentBody, ''),
    image: pickFirst(article.image, article.mediaUrl, 'https://placehold.co/320x180/e8eef8/4c6ccc?text=YorBux'),
    authorName: buildName(author),
    createdAt: article.createdAt
  };
};

export const getMarketplaceHome = async () => {
  const response = await api.get('/marketplace/home');
  const payload = response.data || {};

  return {
    ...payload,
    featuredSellers: Array.isArray(payload.featuredSellers)
      ? payload.featuredSellers.map(normalizeSeller)
      : [],
    trendingArticles: Array.isArray(payload.trendingArticles)
      ? payload.trendingArticles.map(normalizeArticle)
      : []
  };
};

export const searchMarketplace = async (params = {}) => {
  const response = await api.get('/marketplace/search', { params });
  const payload = response.data || {};

  return {
    ...payload,
    sellers: {
      ...payload.sellers,
      items: Array.isArray(payload.sellers?.items) ? payload.sellers.items.map(normalizeSeller) : []
    },
    articles: {
      ...payload.articles,
      items: Array.isArray(payload.articles?.items) ? payload.articles.items.map(normalizeArticle) : []
    }
  };
};

export const getSellers = async (params = {}) => {
  const response = await api.get('/marketplace/sellers', { params });
  const payload = response.data || {};

  return {
    ...payload,
    sellers: Array.isArray(payload.sellers) ? payload.sellers.map(normalizeSeller) : []
  };
};

export const getSellerDetail = async (sellerProfileId) => {
  const response = await api.get(`/marketplace/sellers/${sellerProfileId}`);
  const payload = response.data || {};

  return {
    ...payload,
    seller: payload.seller ? normalizeSeller(payload.seller) : null,
    articles: Array.isArray(payload.articles) ? payload.articles.map(normalizeArticle) : []
  };
};

export const requestSellerContact = async (sellerProfileId, payload) => {
  const response = await api.post(`/marketplace/sellers/${sellerProfileId}/contact-requests`, payload);
  return response.data || {};
};

export const reviewSeller = async (sellerProfileId, payload) => {
  const response = await api.post(`/marketplace/sellers/${sellerProfileId}/reviews`, payload);
  return response.data || {};
};
