import React, { useEffect, useState } from 'react';
import { ArrowLeft, BadgeCheck, BriefcaseBusiness, Building2, FileText, MapPin, MessageSquare, Send, ShieldCheck, Star, X } from 'lucide-react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { getSellerDetail, requestSellerContact } from '../services/marketplace';

const ContactModal = ({ seller, onClose }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    email: '',
    city: '',
    age: '',
    income: '',
    cibilScore: '',
    healthIssues: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');
    setMessage('');

    try {
      if (!localStorage.getItem('token')) {
        navigate('/signin');
        return;
      }

      await requestSellerContact(seller.id, {
        ...form,
        serviceType: seller.services[0] || seller.title,
        age: form.age ? Number(form.age) : undefined,
        income: form.income ? Number(form.income) : undefined,
        cibilScore: form.cibilScore ? Number(form.cibilScore) : undefined
      });
      setMessage('Contact request submitted successfully.');
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Contact request submit nahi ho paaya');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-bg-surface w-full sm:max-w-2xl rounded-t-2xl sm:rounded-2xl border border-border-ui shadow-2xl max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b border-border-ui">
          <div>
            <h2 className="text-text-main font-black text-lg">Request Contact Info</h2>
            <p className="text-text-sec text-sm">Share basic details with {seller.name}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-bg-page text-text-sec" aria-label="Close contact form">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {message ? <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{message}</div> : null}
          {error ? <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div> : null}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="space-y-1.5">
              <span className="text-sm font-bold text-text-main">Name</span>
              <input required value={form.name} onChange={(event) => handleChange('name', event.target.value)} className="w-full bg-bg-page border border-border-ui rounded-lg px-3 py-2.5 text-sm outline-none focus:border-action-blue" />
            </label>
            <label className="space-y-1.5">
              <span className="text-sm font-bold text-text-main">Mobile</span>
              <input value={form.mobile} onChange={(event) => handleChange('mobile', event.target.value)} className="w-full bg-bg-page border border-border-ui rounded-lg px-3 py-2.5 text-sm outline-none focus:border-action-blue" />
            </label>
            <label className="space-y-1.5">
              <span className="text-sm font-bold text-text-main">Email</span>
              <input type="email" value={form.email} onChange={(event) => handleChange('email', event.target.value)} className="w-full bg-bg-page border border-border-ui rounded-lg px-3 py-2.5 text-sm outline-none focus:border-action-blue" />
            </label>
            <label className="space-y-1.5">
              <span className="text-sm font-bold text-text-main">City</span>
              <input value={form.city} onChange={(event) => handleChange('city', event.target.value)} className="w-full bg-bg-page border border-border-ui rounded-lg px-3 py-2.5 text-sm outline-none focus:border-action-blue" />
            </label>
            <label className="space-y-1.5">
              <span className="text-sm font-bold text-text-main">Age</span>
              <input type="number" value={form.age} onChange={(event) => handleChange('age', event.target.value)} className="w-full bg-bg-page border border-border-ui rounded-lg px-3 py-2.5 text-sm outline-none focus:border-action-blue" />
            </label>
            <label className="space-y-1.5">
              <span className="text-sm font-bold text-text-main">Income</span>
              <input type="number" value={form.income} onChange={(event) => handleChange('income', event.target.value)} className="w-full bg-bg-page border border-border-ui rounded-lg px-3 py-2.5 text-sm outline-none focus:border-action-blue" />
            </label>
            <label className="space-y-1.5">
              <span className="text-sm font-bold text-text-main">CIBIL Score</span>
              <input type="number" value={form.cibilScore} onChange={(event) => handleChange('cibilScore', event.target.value)} className="w-full bg-bg-page border border-border-ui rounded-lg px-3 py-2.5 text-sm outline-none focus:border-action-blue" />
            </label>
            <label className="space-y-1.5">
              <span className="text-sm font-bold text-text-main">Health Issues</span>
              <input value={form.healthIssues} onChange={(event) => handleChange('healthIssues', event.target.value)} className="w-full bg-bg-page border border-border-ui rounded-lg px-3 py-2.5 text-sm outline-none focus:border-action-blue" />
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-lg border border-border-ui text-text-main font-bold text-sm hover:bg-bg-page">
              Cancel
            </button>
            <button disabled={submitting} type="submit" className="px-5 py-2.5 rounded-lg bg-action-blue text-white font-bold text-sm hover:opacity-90 disabled:opacity-60">
              {submitting ? 'Submitting...' : 'Submit Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const SellerProfile = () => {
  const { sellerId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [seller, setSeller] = useState(null);
  const [articles, setArticles] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showContact, setShowContact] = useState(searchParams.get('contact') === '1');

  useEffect(() => {
    let active = true;

    const loadSeller = async () => {
      setLoading(true);
      setError('');

      try {
        const data = await getSellerDetail(sellerId);
        if (!active) return;
        setSeller(data.seller);
        setArticles(data.articles || []);
        setReviews(data.reviews || []);
      } catch (requestError) {
        if (!active) return;
        setError(requestError.response?.data?.message || 'Seller profile load nahi ho paaya');
      } finally {
        if (active) setLoading(false);
      }
    };

    loadSeller();
    return () => {
      active = false;
    };
  }, [sellerId]);

  if (loading) {
    return <div className="bg-bg-surface border border-border-ui rounded-xl p-8 text-sm text-text-sec">Seller profile loading...</div>;
  }

  if (error || !seller) {
    return (
      <div className="bg-bg-surface border border-border-ui rounded-xl p-8">
        <p className="text-red-600 text-sm">{error || 'Seller not found'}</p>
        <button onClick={() => navigate('/marketplace')} className="mt-4 text-action-blue font-bold text-sm">Back to marketplace</button>
      </div>
    );
  }

  const sellerInitials = seller.name
    ? seller.name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase()
    : 'NA';

  return (
    <div className="min-h-[calc(100vh-96px)] -m-4 md:-m-6 bg-bg-page p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <button onClick={() => navigate('/marketplace')} className="inline-flex items-center gap-2 text-action-blue font-bold text-sm mb-5">
          <ArrowLeft size={17} />
          Back to advisors
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
          <aside className="bg-bg-surface border border-border-ui rounded-xl p-6 text-center shadow-sm lg:sticky lg:top-24 h-fit">
            {seller.avatar ? (
              <img src={seller.avatar} alt={seller.name} className="w-28 h-28 rounded-full object-cover mx-auto border-4 border-bg-page" />
            ) : (
              <div className="w-28 h-28 rounded-full mx-auto border-4 border-bg-page bg-bg-page flex items-center justify-center text-action-blue font-black text-xl">
                {sellerInitials}
              </div>
            )}
            <div className="flex items-center justify-center gap-2 mt-4">
              <h1 className="text-text-main text-xl font-black">{seller.name || 'Advisor'}</h1>
              {seller.verified ? <BadgeCheck size={18} className="text-emerald-500" /> : null}
            </div>
            {seller.title ? <p className="text-text-sec text-sm mt-1">{seller.title}</p> : null}

            <div className="flex flex-wrap items-center justify-center gap-3 text-text-sec text-sm mt-4">
              {seller.location ? <span className="inline-flex items-center gap-1.5"><MapPin size={15} />{seller.location}</span> : null}
              {seller.experience ? <span className="inline-flex items-center gap-1.5"><BriefcaseBusiness size={15} />{seller.experience}+ Years</span> : null}
            </div>

            <div className="flex items-center justify-center gap-1.5 text-amber-500 mt-4">
              <Star size={17} fill="currentColor" />
              <span className="font-black">{seller.rating || 'New'}</span>
              <span className="text-text-sec text-sm">({seller.reviewsCount} reviews)</span>
            </div>

            <div className="space-y-3 mt-6">
              <button onClick={() => setShowContact(true)} className="w-full bg-action-blue text-white rounded-lg py-3 text-sm font-bold hover:opacity-90 inline-flex items-center justify-center gap-2">
                <Send size={17} />
                Request Contact Info
              </button>
              <button className="w-full border border-action-blue text-action-blue rounded-lg py-3 text-sm font-bold hover:bg-bg-page inline-flex items-center justify-center gap-2">
                <MessageSquare size={17} />
                Send a Message
              </button>
            </div>
          </aside>

          <main className="space-y-5">
            <section className="bg-bg-surface border border-border-ui rounded-xl p-6 shadow-sm">
              <h2 className="text-action-blue font-black text-lg pb-3 border-b border-border-ui">About Me</h2>
              <p className="text-text-main text-sm leading-6 mt-4">{seller.bio || 'This advisor has not added a professional summary yet.'}</p>
            </section>

            <section className="bg-bg-surface border border-border-ui rounded-xl p-6 shadow-sm">
              <h2 className="text-action-blue font-black text-lg pb-3 border-b border-border-ui">Certifications & Licenses</h2>
              <div className="flex flex-wrap gap-3 mt-4">
                {seller.certifications.length ? seller.certifications.map((certification, index) => (
                  <span key={`${certification.name}-${index}`} className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-emerald-50 text-emerald-700 text-sm font-bold">
                    <ShieldCheck size={16} />
                    {certification.name || certification.issuingAuthority || 'Certified'}
                  </span>
                )) : (
                  <span className="text-sm text-text-sec">No certifications added yet.</span>
                )}
              </div>
            </section>

            <section className="bg-bg-surface border border-border-ui rounded-xl p-6 shadow-sm">
              <h2 className="text-action-blue font-black text-lg pb-3 border-b border-border-ui">Services Offered</h2>
              <div className="flex flex-wrap gap-3 mt-4">
                {seller.services.length ? seller.services.map((service) => (
                  <span key={service} className="px-3 py-2 rounded-lg bg-blue-50 text-blue-700 text-sm font-bold">{service}</span>
                )) : (
                  <span className="text-sm text-text-sec">No services added yet.</span>
                )}
              </div>
            </section>

            <section className="bg-bg-surface border border-border-ui rounded-xl p-6 shadow-sm">
              <h2 className="text-action-blue font-black text-lg pb-3 border-b border-border-ui">Associated Partners</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 mt-4">
                {seller.companies.length ? seller.companies.map((company) => (
                  <div key={company} className="border border-border-ui rounded-lg p-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-bg-page flex items-center justify-center text-action-blue font-black text-xs">
                      {company.slice(0, 4).toUpperCase()}
                    </div>
                    <span className="text-sm font-bold text-text-main">{company}</span>
                  </div>
                )) : (
                  <span className="text-sm text-text-sec">No partners added yet.</span>
                )}
              </div>
            </section>

            <section className="bg-bg-surface border border-border-ui rounded-xl p-6 shadow-sm">
              <h2 className="text-action-blue font-black text-lg pb-3 border-b border-border-ui">Articles by {seller.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {articles.length ? articles.map((article) => (
                  <article key={article.id} className="border border-border-ui rounded-lg overflow-hidden">
                    <img src={article.image} alt={article.title} className="w-full h-36 object-cover bg-bg-page" />
                    <div className="p-4">
                      <h3 className="text-text-main font-bold text-sm line-clamp-2">{article.title}</h3>
                      <p className="text-text-sec text-xs mt-2">Published article</p>
                    </div>
                  </article>
                )) : (
                  <div className="border border-dashed border-border-ui rounded-lg p-8 text-center md:col-span-2">
                    <FileText className="mx-auto text-text-sec" size={28} />
                    <p className="text-sm text-text-sec mt-2">No articles published yet.</p>
                  </div>
                )}
              </div>
            </section>

            {reviews.length ? (
              <section className="bg-bg-surface border border-border-ui rounded-xl p-6 shadow-sm">
                <h2 className="text-action-blue font-black text-lg pb-3 border-b border-border-ui">Recent Reviews</h2>
                <div className="space-y-3 mt-4">
                  {reviews.map((review) => (
                    <div key={review._id} className="border border-border-ui rounded-lg p-4">
                      <div className="flex items-center gap-1 text-amber-500 text-sm">
                        <Star size={14} fill="currentColor" />
                        <span className="font-bold">{review.rating}</span>
                      </div>
                      <p className="text-sm text-text-main mt-2">{review.review || 'No review text added.'}</p>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}
          </main>
        </div>
      </div>

      {showContact ? <ContactModal seller={seller} onClose={() => setShowContact(false)} /> : null}
    </div>
  );
};

export default SellerProfile;
