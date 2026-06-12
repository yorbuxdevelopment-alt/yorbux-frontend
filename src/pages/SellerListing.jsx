import React, { useEffect, useMemo, useState } from 'react';
import { BadgeCheck, Banknote, BriefcaseBusiness, Building2, CreditCard, Landmark, LifeBuoy, MapPin, Search, ShieldCheck, Star, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getMarketplaceHome, getSellers } from '../services/marketplace';

const getCategoryIcon = (name = '') => {
  const normalizedName = String(name).toLowerCase();
  if (normalizedName.includes('loan')) return Banknote;
  if (normalizedName.includes('credit')) return CreditCard;
  if (normalizedName.includes('invest') || normalizedName.includes('mutual')) return TrendingUp;
  if (normalizedName.includes('insurance')) return ShieldCheck;
  return Landmark;
};

const SellerCard = ({ seller, onView }) => {
  const primaryServices = (seller.services.length ? seller.services : [seller.title]).filter(Boolean).slice(0, 2);
  const companies = seller.companies.slice(0, 3).join(', ');
  const initials = seller.name
    ? seller.name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase()
    : 'NA';

  return (
    <article className="bg-bg-surface border border-border-ui rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex gap-4">
        {seller.avatar ? (
          <img src={seller.avatar} alt={seller.name} className="w-[70px] h-[70px] rounded-full object-cover border border-border-ui bg-bg-page" />
        ) : (
          <div className="w-[70px] h-[70px] rounded-full border border-border-ui bg-bg-page flex items-center justify-center text-action-blue font-black">
            {initials}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-start gap-2">
            <h3 className="text-text-main font-bold text-[17px] leading-tight truncate">{seller.name || 'Advisor'}</h3>
            {seller.verified ? <BadgeCheck size={17} className="text-emerald-500 shrink-0" /> : null}
          </div>
          <p className="text-text-sec text-sm mt-1 line-clamp-1">
            {seller.title}{seller.experience ? ` | ${seller.experience} yrs exp` : ''}
          </p>
          <div className="flex items-center gap-1.5 text-amber-500 text-sm mt-1">
            <Star size={14} fill="currentColor" />
            <span className="font-bold">{seller.rating || 'New'}</span>
            <span className="text-text-sec">({seller.reviewsCount} reviews)</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {primaryServices.length ? primaryServices.map((service) => (
          <span key={service} className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-semibold">
            {service}
          </span>
        )) : null}
      </div>

      <div className="mt-4 space-y-1.5 text-xs text-text-sec">
        {companies ? (
          <p className="flex items-center gap-2">
            <Building2 size={14} />
            <span className="line-clamp-1">Associated: {companies}</span>
          </p>
        ) : null}
        <p className="flex items-center gap-2">
          <MapPin size={14} />
          <span>{seller.location || 'Location unavailable'}</span>
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-5">
        <button
          type="button"
          onClick={() => onView(seller.id)}
          className="border border-action-blue text-action-blue rounded-lg py-2.5 text-sm font-bold hover:bg-bg-page"
        >
          View Profile
        </button>
        <button
          type="button"
          onClick={() => onView(seller.id, { contact: true })}
          className="bg-action-blue text-white rounded-lg py-2.5 text-sm font-bold hover:opacity-90"
        >
          Request Contact
        </button>
      </div>
    </article>
  );
};

const SellerListing = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [articles, setArticles] = useState([]);
  const [searchPlaceholder, setSearchPlaceholder] = useState('Search financial products or advisors');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const searchParams = useMemo(() => ({
    q: query.trim(),
    location: location.trim(),
    category: selectedCategory,
    limit: 8
  }), [query, location, selectedCategory]);

  const loadMarketplace = async (params = searchParams) => {
    setLoading(true);
    setError('');

    try {
      const [homeData, sellerData] = await Promise.all([
        getMarketplaceHome().catch(() => null),
        getSellers(params)
      ]);

      const loadedSellers = sellerData.sellers?.length ? sellerData.sellers : homeData?.featuredSellers || [];
      setCategories(Array.isArray(homeData?.categories) ? homeData.categories : []);
      setSellers(loadedSellers);
      setArticles(homeData?.trendingArticles || []);
      setSearchPlaceholder(homeData?.searchPlaceholder || 'Search financial products or advisors');
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Marketplace data load nahi ho paaya');
      setCategories([]);
      setSellers([]);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMarketplace();
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    loadMarketplace(searchParams);
  };

  const handleCategory = (category) => {
    const categoryName = category.name || category.label || '';
    setSelectedCategory(categoryName);
    loadMarketplace({ ...searchParams, category: categoryName });
  };

  const handleViewSeller = (sellerId, options = {}) => {
    navigate(`/marketplace/sellers/${sellerId}${options.contact ? '?contact=1' : ''}`);
  };

  return (
    <div className="min-h-[calc(100vh-96px)] -m-4 md:-m-6 bg-bg-page">
      <section className="bg-gradient-to-br from-[#0052cc] to-[#003d99] text-white px-4 py-10 sm:py-14 lg:py-16">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold mb-5">
            <Landmark size={15} />
            Retail financial services marketplace
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-normal">Find Trusted Financial Advisors Near You</h1>
          <p className="text-white/85 mt-3 text-base sm:text-lg">Compare insurance, loans, credit cards, and investments effortlessly.</p>

          <form onSubmit={handleSearch} className="max-w-4xl mx-auto mt-8 bg-white rounded-xl p-2 shadow-xl grid grid-cols-1 sm:grid-cols-[1fr_180px_auto] gap-2">
            <div className="relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={searchPlaceholder}
                className="w-full h-12 rounded-lg pl-11 pr-4 text-sm text-slate-900 outline-none border border-transparent focus:border-blue-200 bg-slate-50"
              />
            </div>
            <div className="relative">
              <MapPin size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder="City"
                className="w-full h-12 rounded-lg pl-9 pr-3 text-sm text-slate-900 outline-none border border-transparent focus:border-blue-200 bg-slate-50"
              />
            </div>
            <button type="submit" className="h-12 px-7 rounded-lg bg-[#0052cc] text-white text-sm font-bold hover:bg-[#003d99]">
              Search
            </button>
          </form>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 pb-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 -mt-8 relative z-10">
          {categories.length ? categories.map((category) => {
            const categoryName = category.name || category.label;
            const Icon = getCategoryIcon(categoryName);
            const active = selectedCategory === categoryName;

            return (
              <button
                key={category._id || category.id || categoryName}
                type="button"
                onClick={() => handleCategory(category)}
                className={`bg-bg-surface border rounded-xl p-5 text-center shadow-sm hover:shadow-md transition-all ${active ? 'border-action-blue ring-2 ring-action-blue/15' : 'border-border-ui'}`}
              >
                <Icon className="mx-auto text-action-blue" size={30} />
                <p className="text-text-main font-bold mt-3">{categoryName}</p>
              </button>
            );
          }) : (
            <div className="col-span-full bg-bg-surface border border-border-ui rounded-xl p-5 text-center text-sm text-text-sec shadow-sm">
              No service categories available.
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-8 mt-10">
          <section>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-text-main text-2xl font-black">Top Rated Advisors</h2>
              <button type="button" onClick={() => loadMarketplace(searchParams)} className="text-action-blue text-sm font-bold">
                Refresh
              </button>
            </div>

            {error ? (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 mb-4">{error}</div>
            ) : null}

            {loading ? (
              <div className="bg-bg-surface border border-border-ui rounded-xl p-8 text-sm text-text-sec">Advisors loading...</div>
            ) : sellers.length ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {sellers.map((seller) => (
                  <SellerCard key={seller.id} seller={seller} onView={handleViewSeller} />
                ))}
              </div>
            ) : (
              <div className="bg-bg-surface border border-border-ui rounded-xl p-8 text-center">
                <LifeBuoy className="mx-auto text-text-sec" size={32} />
                <h3 className="text-text-main font-bold mt-3">No advisors found</h3>
                <p className="text-text-sec text-sm mt-1">Try another city, category, or search term.</p>
              </div>
            )}
          </section>

          <aside>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-text-main text-2xl font-black">Financial Insights</h2>
            </div>
            {articles.length ? (
              <div className="space-y-4">
                {articles.slice(0, 5).map((article) => (
                <article key={article.id} className="bg-bg-surface border border-border-ui rounded-xl p-3 flex gap-3 hover:border-action-blue/40 transition-colors">
                  {article.image ? (
                    <img src={article.image} alt={article.title} className="w-20 h-20 rounded-lg object-cover bg-bg-page shrink-0" />
                  ) : (
                    <div className="w-20 h-20 rounded-lg bg-bg-page shrink-0 flex items-center justify-center text-action-blue font-black">
                      Article
                    </div>
                  )}
                  <div className="min-w-0">
                    <h3 className="text-text-main font-bold text-sm leading-snug line-clamp-2">{article.title}</h3>
                    {article.authorName ? <p className="text-text-sec text-xs mt-2">By {article.authorName}</p> : null}
                  </div>
                </article>
                ))}
              </div>
            ) : (
              <div className="bg-bg-surface border border-border-ui rounded-xl p-6 text-sm text-text-sec">
                No financial insights available.
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};

export default SellerListing;
