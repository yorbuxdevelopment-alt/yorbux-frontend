import React, { useState } from 'react';
import { ArrowLeft, Briefcase, MapPin, DollarSign, ListChecks } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createJob } from '../services/jobs';

const PostJob = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    country: '',
    state: '',
    location: '',
    education: '',
    minExperience: '',
    maxExperience: '',
    salary: '',
    description: '',
    validDate: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      await createJob({
        ...formData,
        minExperience: formData.minExperience ? Number(formData.minExperience) : undefined,
        maxExperience: formData.maxExperience ? Number(formData.maxExperience) : undefined,
        validDate: formData.validDate || undefined
      });
      navigate('/jobs');
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Job publish nahi ho paya');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-full bg-blue-50/40 p-4 sm:p-6 font-sans">
      <div className="w-full mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate('/jobs')}
            className="bg-white border border-gray-200 p-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="text-gray-600" size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">Post A Job</h1>
            <p className="text-gray-500 text-sm">Fill out the details below to create a new job listing.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 space-y-6">
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 border-b border-gray-100 pb-2">
              <Briefcase size={18} className="text-blue-500" /> Basic Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Job Title <span className="text-red-500">*</span></label>
                <input name="title" value={formData.title} onChange={handleChange} type="text" placeholder="e.g. Senior Frontend Developer" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" required />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Company Name <span className="text-red-500">*</span></label>
                <input name="company" value={formData.company} onChange={handleChange} type="text" placeholder="e.g. TechNova Solutions" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" required />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 border-b border-gray-100 pb-2">
              <MapPin size={18} className="text-blue-500" /> Location & Compensation
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Country</label>
                <input name="country" value={formData.country} onChange={handleChange} type="text" placeholder="India" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">State</label>
                <input name="state" value={formData.state} onChange={handleChange} type="text" placeholder="Madhya Pradesh" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Estimated Salary</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input name="salary" value={formData.salary} onChange={handleChange} type="text" placeholder="80k - 100k" className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Location</label>
                <input name="location" value={formData.location} onChange={handleChange} type="text" placeholder="Indore / Remote" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Valid Till</label>
                <input name="validDate" value={formData.validDate} onChange={handleChange} type="date" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 border-b border-gray-100 pb-2">
              <ListChecks size={18} className="text-blue-500" /> Job Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Education</label>
                <input name="education" value={formData.education} onChange={handleChange} type="text" placeholder="Graduate" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-700" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Min Experience</label>
                <input name="minExperience" value={formData.minExperience} onChange={handleChange} type="number" min="0" placeholder="2" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-700" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Max Experience</label>
                <input name="maxExperience" value={formData.maxExperience} onChange={handleChange} type="number" min="0" placeholder="5" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-700" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Job Description <span className="text-red-500">*</span></label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows="5" placeholder="Describe the responsibilities, requirements, and perks..." className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-y" required></textarea>
            </div>
          </div>

          {error ? (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-end gap-3">
            <button type="button" onClick={() => navigate('/jobs')} className="w-full sm:w-auto px-6 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors border border-transparent">Cancel</button>
            <button type="submit" disabled={submitting} className="w-full sm:w-auto px-8 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md shadow-blue-500/20 transition-all disabled:opacity-70">
              {submitting ? 'Publishing...' : 'Publish Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
