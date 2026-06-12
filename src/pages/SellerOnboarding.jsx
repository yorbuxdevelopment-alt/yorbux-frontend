import React, { useMemo, useState } from 'react';
import { Award, Camera, Check, ChevronLeft, ChevronRight, FileUp, MapPin, Plus, ShieldCheck, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { updateSellerProfile } from '../services/seller';

const serviceOptions = [
  'Term Insurance',
  'Health Insurance',
  'Auto Insurance',
  'Home Loans',
  'Business Loans',
  'Mutual Funds',
  'Credit Cards'
];

const initialCertification = {
  name: '',
  issuingAuthority: '',
  licenseNumber: ''
};

const SellerOnboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    businessName: '',
    designation: '',
    experienceYears: '',
    bio: '',
    category: 'Financial Services',
    certifications: [{ ...initialCertification }],
    servicesOffered: ['Term Insurance', 'Health Insurance', 'Mutual Funds'],
    associatedCompaniesText: '',
    locationInput: '',
    serviceLocations: [{ city: 'Bhopal', state: 'MP', country: 'India' }, { city: 'Indore', state: 'MP', country: 'India' }],
    profilePhoto: null,
    profilePhotoPreview: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [savingDraft, setSavingDraft] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const steps = useMemo(() => [
    { number: 1, label: 'Personal Details' },
    { number: 2, label: 'Certifications' },
    { number: 3, label: 'Services & Locations' }
  ], []);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Only image files are allowed for profile photo.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Profile photo must be under 5 MB.');
      return;
    }

    setError('');
    setForm((current) => {
      if (current.profilePhotoPreview) {
        URL.revokeObjectURL(current.profilePhotoPreview);
      }

      return {
        ...current,
        profilePhoto: file,
        profilePhotoPreview: URL.createObjectURL(file)
      };
    });
  };

  const updateCertification = (index, field, value) => {
    setForm((current) => ({
      ...current,
      certifications: current.certifications.map((certification, itemIndex) =>
        itemIndex === index ? { ...certification, [field]: value } : certification
      )
    }));
  };

  const addCertification = () => {
    setForm((current) => ({
      ...current,
      certifications: [...current.certifications, { ...initialCertification }]
    }));
  };

  const removeCertification = (index) => {
    setForm((current) => ({
      ...current,
      certifications: current.certifications.filter((_, itemIndex) => itemIndex !== index)
    }));
  };

  const toggleService = (service) => {
    setForm((current) => {
      const exists = current.servicesOffered.includes(service);
      return {
        ...current,
        servicesOffered: exists
          ? current.servicesOffered.filter((item) => item !== service)
          : [...current.servicesOffered, service]
      };
    });
  };

  const addLocation = () => {
    const city = form.locationInput.trim();
    if (!city) return;

    setForm((current) => ({
      ...current,
      locationInput: '',
      serviceLocations: [...current.serviceLocations, { city, state: '', country: 'India' }]
    }));
  };

  const removeLocation = (index) => {
    setForm((current) => ({
      ...current,
      serviceLocations: current.serviceLocations.filter((_, itemIndex) => itemIndex !== index)
    }));
  };

  const validateCurrentStep = () => {
    if (step === 1 && (!form.businessName.trim() || !form.designation.trim())) {
      setError('Full name/business name and designation are required.');
      return false;
    }

    if (step === 3 && form.servicesOffered.length === 0) {
      setError('Select at least one service.');
      return false;
    }

    setError('');
    return true;
  };

  const buildSellerPayload = () => {
    const payload = {
      businessName: form.businessName,
      designation: form.designation,
      experienceYears: Number(form.experienceYears || 0),
      bio: form.bio,
      category: form.category,
      certifications: form.certifications.filter((certification) =>
        certification.name || certification.issuingAuthority || certification.licenseNumber
      ),
      servicesOffered: form.servicesOffered,
      serviceLocations: form.serviceLocations,
      associatedCompanies: form.associatedCompaniesText
        .split(',')
        .map((company) => company.trim())
        .filter(Boolean)
    };

    if (!form.profilePhoto) {
      return payload;
    }

    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      formData.append(key, Array.isArray(value) ? JSON.stringify(value) : value);
    });
    formData.append('businessLogo', form.profilePhoto);

    return formData;
  };

  const saveDraft = async () => {
    setSavingDraft(true);
    setError('');
    setSuccess('');

    try {
      const response = await updateSellerProfile(buildSellerPayload());
      setSuccess(response.message || 'Seller profile draft saved.');
      return true;
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Seller profile draft save nahi ho paaya');
      return false;
    } finally {
      setSavingDraft(false);
    }
  };

  const goNext = async () => {
    if (!validateCurrentStep()) return;
    const saved = await saveDraft();
    if (!saved) return;
    setStep((current) => Math.min(current + 1, 3));
  };

  const goBack = () => {
    setError('');
    setStep((current) => Math.max(current - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) return;

    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      await updateSellerProfile(buildSellerPayload());

      navigate('/profile');
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Seller profile submit nahi ho paaya');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-96px)] -m-4 md:-m-6 bg-bg-page p-4 md:p-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-action-blue text-2xl font-black">Create Seller Profile</h1>
          <p className="text-text-sec text-sm mt-1">Build a trusted advisor profile and start generating leads.</p>
        </div>

        <div className="bg-bg-surface border border-border-ui rounded-xl shadow-sm overflow-hidden">
          <div className="hidden sm:flex bg-bg-page border-b border-border-ui px-6 py-5">
            {steps.map((item) => {
              const active = step === item.number;
              const completed = step > item.number;

              return (
                <div key={item.number} className={`flex-1 text-center text-sm font-bold ${active ? 'text-action-blue' : completed ? 'text-emerald-600' : 'text-text-sec'}`}>
                  <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center mb-2 ${active ? 'bg-action-blue text-white ring-4 ring-action-blue/15' : completed ? 'bg-emerald-500 text-white' : 'bg-border-ui text-text-sec'}`}>
                    {completed ? <Check size={17} /> : item.number}
                  </div>
                  {item.label}
                </div>
              );
            })}
          </div>

          <div className="p-5 sm:p-8">
            {error ? <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 mb-5">{error}</div> : null}
            {success ? <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 mb-5">{success}</div> : null}

            {step === 1 ? (
              <section>
                <div className="mb-7">
                  <h2 className="text-text-main text-2xl font-black">Personal Details</h2>
                  <p className="text-text-sec text-sm mt-1">Buyers trust detailed profiles. Fill in your information below.</p>
                </div>

                <div className="flex items-center gap-4 mb-7">
                  <div className="w-20 h-20 rounded-full border-2 border-dashed border-border-ui bg-bg-page flex items-center justify-center text-text-sec overflow-hidden">
                    {form.profilePhotoPreview ? (
                      <img src={form.profilePhotoPreview} alt="Profile preview" className="w-full h-full object-cover" />
                    ) : (
                      <Camera size={28} />
                    )}
                  </div>
                  <div>
                    <input id="seller-profile-photo" type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
                    <label htmlFor="seller-profile-photo" className="inline-flex cursor-pointer border border-border-ui px-4 py-2 rounded-lg text-sm font-bold text-text-main hover:bg-bg-page">
                      Upload Profile Photo
                    </label>
                    <p className="text-xs text-text-sec mt-1">JPG or PNG, max 5MB.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <label className="space-y-1.5 sm:col-span-2">
                    <span className="text-sm font-bold text-text-main">Full Name / Business Name</span>
                    <input value={form.businessName} onChange={(event) => updateField('businessName', event.target.value)} placeholder="e.g., Mayank Agnihotri" className="w-full bg-bg-page border border-border-ui rounded-lg px-3 py-3 text-sm outline-none focus:border-action-blue" />
                  </label>
                  <label className="space-y-1.5">
                    <span className="text-sm font-bold text-text-main">Professional Designation</span>
                    <input value={form.designation} onChange={(event) => updateField('designation', event.target.value)} placeholder="Senior Financial Advisor" className="w-full bg-bg-page border border-border-ui rounded-lg px-3 py-3 text-sm outline-none focus:border-action-blue" />
                  </label>
                  <label className="space-y-1.5">
                    <span className="text-sm font-bold text-text-main">Experience (Years)</span>
                    <input type="number" value={form.experienceYears} onChange={(event) => updateField('experienceYears', event.target.value)} placeholder="5" className="w-full bg-bg-page border border-border-ui rounded-lg px-3 py-3 text-sm outline-none focus:border-action-blue" />
                  </label>
                  <label className="space-y-1.5 sm:col-span-2">
                    <span className="text-sm font-bold text-text-main">Professional Summary</span>
                    <textarea rows="4" value={form.bio} onChange={(event) => updateField('bio', event.target.value)} placeholder="Briefly describe your expertise and how you help clients..." className="w-full bg-bg-page border border-border-ui rounded-lg px-3 py-3 text-sm outline-none focus:border-action-blue resize-none" />
                  </label>
                </div>
              </section>
            ) : null}

            {step === 2 ? (
              <section>
                <div className="mb-7">
                  <h2 className="text-text-main text-2xl font-black">Licenses & Certifications</h2>
                  <p className="text-text-sec text-sm mt-1">Add credentials that build buyer trust.</p>
                </div>

                <div className="space-y-4">
                  {form.certifications.map((certification, index) => (
                    <div key={index} className="border border-border-ui rounded-xl p-4 bg-bg-page/50">
                      <div className="flex items-center justify-between mb-4">
                        <div className="inline-flex items-center gap-2 text-text-main font-bold text-sm">
                          <Award size={17} className="text-action-blue" />
                          Certification {index + 1}
                        </div>
                        {form.certifications.length > 1 ? (
                          <button type="button" onClick={() => removeCertification(index)} className="text-text-sec hover:text-red-600">
                            <X size={17} />
                          </button>
                        ) : null}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <label className="space-y-1.5">
                          <span className="text-sm font-bold text-text-main">Certification Name</span>
                          <input value={certification.name} onChange={(event) => updateCertification(index, 'name', event.target.value)} placeholder="IRDA Licensed" className="w-full bg-bg-surface border border-border-ui rounded-lg px-3 py-3 text-sm outline-none focus:border-action-blue" />
                        </label>
                        <label className="space-y-1.5">
                          <span className="text-sm font-bold text-text-main">Authority</span>
                          <input value={certification.issuingAuthority} onChange={(event) => updateCertification(index, 'issuingAuthority', event.target.value)} placeholder="IRDAI, AMFI, SEBI" className="w-full bg-bg-surface border border-border-ui rounded-lg px-3 py-3 text-sm outline-none focus:border-action-blue" />
                        </label>
                        <label className="space-y-1.5 sm:col-span-2">
                          <span className="text-sm font-bold text-text-main">License / Registration Number</span>
                          <input value={certification.licenseNumber} onChange={(event) => updateCertification(index, 'licenseNumber', event.target.value)} placeholder="Enter license number" className="w-full bg-bg-surface border border-border-ui rounded-lg px-3 py-3 text-sm outline-none focus:border-action-blue" />
                        </label>
                        <div className="sm:col-span-2 border-2 border-dashed border-border-ui rounded-lg p-5 text-center bg-bg-surface">
                          <FileUp className="mx-auto text-action-blue" size={26} />
                          <p className="text-action-blue text-sm font-bold mt-2">Document upload can be attached later</p>
                          <p className="text-text-sec text-xs mt-1">PDF, JPG, or PNG</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button type="button" onClick={addCertification} className="inline-flex items-center gap-2 text-action-blue text-sm font-bold mt-4">
                  <Plus size={17} />
                  Add Another Certification
                </button>
              </section>
            ) : null}

            {step === 3 ? (
              <section>
                <div className="mb-7">
                  <h2 className="text-text-main text-2xl font-black">Services & Coverage</h2>
                  <p className="text-text-sec text-sm mt-1">Select what you sell and where you operate.</p>
                </div>

                <div>
                  <label className="text-sm font-bold text-text-main">Select Primary Services Offered</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
                    {serviceOptions.map((service) => {
                      const selected = form.servicesOffered.includes(service);

                      return (
                        <button
                          key={service}
                          type="button"
                          onClick={() => toggleService(service)}
                          className={`border rounded-lg p-3 text-left text-sm font-bold inline-flex items-center gap-2 ${selected ? 'border-action-blue bg-blue-50 text-blue-700' : 'border-border-ui bg-bg-surface text-text-main hover:bg-bg-page'}`}
                        >
                          <span className={`w-5 h-5 rounded border flex items-center justify-center ${selected ? 'bg-action-blue border-action-blue text-white' : 'border-border-ui'}`}>
                            {selected ? <Check size={14} /> : null}
                          </span>
                          {service}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <label className="block space-y-1.5 mt-7">
                  <span className="text-sm font-bold text-text-main">Associated Companies</span>
                  <input value={form.associatedCompaniesText} onChange={(event) => updateField('associatedCompaniesText', event.target.value)} placeholder="LIC, HDFC Life, SBI Mutual Fund" className="w-full bg-bg-page border border-border-ui rounded-lg px-3 py-3 text-sm outline-none focus:border-action-blue" />
                  <span className="text-xs text-text-sec">Separate company names with commas.</span>
                </label>

                <div className="mt-7">
                  <label className="text-sm font-bold text-text-main">Service Locations</label>
                  <div className="border border-border-ui rounded-lg bg-bg-page p-3 mt-2">
                    <div className="flex flex-wrap gap-2">
                      {form.serviceLocations.map((location, index) => (
                        <span key={`${location.city}-${index}`} className="inline-flex items-center gap-2 bg-action-blue text-white rounded-md px-3 py-1.5 text-sm font-bold">
                          <MapPin size={14} />
                          {location.city}
                          <button type="button" onClick={() => removeLocation(index)} aria-label={`Remove ${location.city}`}>
                            <X size={14} />
                          </button>
                        </span>
                      ))}
                      <input
                        value={form.locationInput}
                        onChange={(event) => updateField('locationInput', event.target.value)}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter') {
                            event.preventDefault();
                            addLocation();
                          }
                        }}
                        placeholder="Add city and press Enter"
                        className="min-w-[180px] flex-1 bg-transparent outline-none text-sm px-2 py-1.5"
                      />
                    </div>
                  </div>
                  <button type="button" onClick={addLocation} className="inline-flex items-center gap-2 text-action-blue text-sm font-bold mt-2">
                    <Plus size={16} />
                    Add Location
                  </button>
                </div>
              </section>
            ) : null}

            <div className="flex items-center justify-between gap-3 mt-8 pt-5 border-t border-border-ui">
              <button
                type="button"
                onClick={goBack}
                disabled={step === 1}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border-ui text-text-main font-bold text-sm hover:bg-bg-page disabled:opacity-40"
              >
                <ChevronLeft size={17} />
                Back
              </button>
              {step < 3 ? (
                <button type="button" onClick={goNext} disabled={savingDraft} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-action-blue text-white font-bold text-sm hover:opacity-90 disabled:opacity-60">
                  {savingDraft ? 'Saving...' : 'Save & Continue'}
                  <ChevronRight size={17} />
                </button>
              ) : (
                <button type="button" onClick={handleSubmit} disabled={submitting} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-action-blue text-white font-bold text-sm hover:opacity-90 disabled:opacity-60">
                  <ShieldCheck size={17} />
                  {submitting ? 'Submitting...' : 'Submit Profile'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerOnboarding;
