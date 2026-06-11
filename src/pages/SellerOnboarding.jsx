import React, { useEffect, useMemo, useState } from 'react';
import { Award, Camera, Check, ChevronLeft, ChevronRight, FileUp, MapPin, Plus, ShieldCheck, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getSellerProfile, updateSellerProfile } from '../services/seller';
import { getMarketplaceHome } from '../services/marketplace';

const designationOptions = [
  'Branch Operations Manager',
  'Branch Manager',
  'Auditor',
  'Assistant Vice President',
  'Assistant Manager',
  'Assistant General Manager',
  'Assistant Branch Manager',
  'Alternative Investments Specialist',
  'Agency Development Manager',
  'Actuary',
  'Account Executive'
];

const initialCertification = {
  name: '',
  issuingAuthority: '',
  licenseNumber: '',
  documentUrl: '',
  documentFile: null,
  documentFileName: ''
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
    servicesOffered: [],
    associatedCompanies: [],
    organisationQuery: '',
    locationInput: '',
    serviceLocations: [],
    profilePhoto: null,
    profilePhotoPreview: ''
  });
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [serviceOptions, setServiceOptions] = useState([]);
  const [organisations, setOrganisations] = useState([]);
  const [organisationsLoading, setOrganisationsLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [savingDraft, setSavingDraft] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const steps = useMemo(() => [
    { number: 1, label: 'Personal Details' },
    { number: 2, label: 'Certifications' },
    { number: 3, label: 'Services & Locations' }
  ], []);

  useEffect(() => {
    let active = true;

    const loadSellerProfile = async () => {
      setLoadingProfile(true);

      try {
        const [data, homeData] = await Promise.all([
          getSellerProfile().catch((requestError) => {
            if (requestError.response?.status === 404) return { profile: null };
            throw requestError;
          }),
          getMarketplaceHome().catch(() => ({ categories: [] }))
        ]);
        const profile = data.profile || {};

        if (!active) return;

        const categoryNames = Array.isArray(homeData.categories)
          ? homeData.categories.map((category) => category.name).filter(Boolean)
          : [];
        const profileServices = Array.isArray(profile.servicesOffered) ? profile.servicesOffered : [];
        setServiceOptions(Array.from(new Set([...categoryNames, ...profileServices])));

        setForm((current) => ({
          ...current,
          businessName: profile.businessName || '',
          designation: profile.designation || '',
          experienceYears: profile.experienceYears !== undefined && profile.experienceYears !== null ? String(profile.experienceYears) : '',
          bio: profile.bio || '',
          category: profile.category || 'Financial Services',
          certifications: Array.isArray(profile.certifications) && profile.certifications.length
            ? profile.certifications.map((certification) => ({
              ...initialCertification,
              ...certification,
              documentFile: null,
              documentFileName: ''
            }))
            : [{ ...initialCertification }],
          servicesOffered: Array.isArray(profile.servicesOffered) ? profile.servicesOffered : [],
          associatedCompanies: Array.isArray(profile.associatedCompanies) ? profile.associatedCompanies : [],
          serviceLocations: Array.isArray(profile.serviceLocations) ? profile.serviceLocations : [],
          profilePhotoPreview: profile.businessLogo || ''
        }));
      } catch (requestError) {
        if (!active) return;
        setError(requestError.response?.data?.message || 'Seller profile load nahi ho paaya');
      } finally {
        if (active) setLoadingProfile(false);
      }
    };

    loadSellerProfile();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;

    const loadOrganisations = async () => {
      setOrganisationsLoading(true);

      try {
        const response = await fetch('/excel/list-of-organisations.json');
        const data = await response.json();

        if (!active) return;
        setOrganisations(Array.isArray(data) ? data : []);
      } catch {
        if (active) setOrganisations([]);
      } finally {
        if (active) setOrganisationsLoading(false);
      }
    };

    loadOrganisations();

    return () => {
      active = false;
    };
  }, []);

  const filteredOrganisations = useMemo(() => {
    const query = form.organisationQuery.trim().toLowerCase();
    if (!query) return organisations.slice(0, 25);

    return organisations
      .filter((organisation) =>
        organisation.name?.toLowerCase().includes(query) ||
        organisation.category?.toLowerCase().includes(query)
      )
      .slice(0, 25);
  }, [form.organisationQuery, organisations]);

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

  const handleCertificationDocumentChange = (index, event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      setError('Only PDF, JPG, or PNG certificate documents are allowed.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Certificate document must be under 5 MB.');
      return;
    }

    setError('');
    setForm((current) => ({
      ...current,
      certifications: current.certifications.map((certification, itemIndex) =>
        itemIndex === index
          ? {
            ...certification,
            documentFile: file,
            documentFileName: file.name
          }
          : certification
      )
    }));
  };

  const addOrganisation = (organisationName) => {
    const name = String(organisationName || '').trim();
    if (!name) return;

    setForm((current) => ({
      ...current,
      organisationQuery: '',
      associatedCompanies: current.associatedCompanies.includes(name)
        ? current.associatedCompanies
        : [...current.associatedCompanies, name]
    }));
  };

  const removeOrganisation = (organisationName) => {
    setForm((current) => ({
      ...current,
      associatedCompanies: current.associatedCompanies.filter((company) => company !== organisationName)
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
        certification.name || certification.issuingAuthority || certification.licenseNumber || certification.documentUrl || certification.documentFile
      ).map((certification) => ({
        name: certification.name,
        issuingAuthority: certification.issuingAuthority,
        licenseNumber: certification.licenseNumber,
        validTill: certification.validTill,
        documentUrl: certification.documentUrl
      })),
      servicesOffered: form.servicesOffered,
      serviceLocations: form.serviceLocations,
      associatedCompanies: form.associatedCompanies
    };

    if (!form.profilePhoto) {
      const hasCertificationFiles = form.certifications.some((certification) => certification.documentFile);
      if (!hasCertificationFiles) {
        return payload;
      }
    }

    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      formData.append(key, Array.isArray(value) ? JSON.stringify(value) : value);
    });
    if (form.profilePhoto) {
      formData.append('businessLogo', form.profilePhoto);
    }

    form.certifications
      .filter((certification) =>
        certification.name || certification.issuingAuthority || certification.licenseNumber || certification.documentUrl || certification.documentFile
      )
      .forEach((certification, certificationIndex) => {
        if (certification.documentFile) {
          formData.append('certificationDocuments', certification.documentFile);
          formData.append('certificationDocumentIndexes', String(certificationIndex));
        }
      });

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
            {loadingProfile ? <div className="rounded-xl border border-border-ui bg-bg-page px-4 py-3 text-sm text-text-sec mb-5">Seller profile loading...</div> : null}

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
                    <input value={form.businessName} onChange={(event) => updateField('businessName', event.target.value)} placeholder="Enter full name or business name" className="w-full bg-bg-page border border-border-ui rounded-lg px-3 py-3 text-sm outline-none focus:border-action-blue" />
                  </label>
                  <label className="space-y-1.5">
                    <span className="text-sm font-bold text-text-main">Professional Designation</span>
                    <select value={form.designation} onChange={(event) => updateField('designation', event.target.value)} className="w-full bg-bg-page border border-border-ui rounded-lg px-3 py-3 text-sm outline-none focus:border-action-blue">
                      <option value="">Select designation</option>
                      {designationOptions.map((designation) => (
                        <option key={designation} value={designation}>{designation}</option>
                      ))}
                    </select>
                  </label>
                  <label className="space-y-1.5">
                    <span className="text-sm font-bold text-text-main">Experience (Years)</span>
                    <input type="number" value={form.experienceYears} onChange={(event) => updateField('experienceYears', event.target.value)} placeholder="Enter years of experience" className="w-full bg-bg-page border border-border-ui rounded-lg px-3 py-3 text-sm outline-none focus:border-action-blue" />
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
                          <input value={certification.name} onChange={(event) => updateCertification(index, 'name', event.target.value)} placeholder="Enter certification name" className="w-full bg-bg-surface border border-border-ui rounded-lg px-3 py-3 text-sm outline-none focus:border-action-blue" />
                        </label>
                        <label className="space-y-1.5">
                          <span className="text-sm font-bold text-text-main">Authority</span>
                          <input value={certification.issuingAuthority} onChange={(event) => updateCertification(index, 'issuingAuthority', event.target.value)} placeholder="Enter issuing authority" className="w-full bg-bg-surface border border-border-ui rounded-lg px-3 py-3 text-sm outline-none focus:border-action-blue" />
                        </label>
                        <label className="space-y-1.5 sm:col-span-2">
                          <span className="text-sm font-bold text-text-main">License / Registration Number</span>
                          <input value={certification.licenseNumber} onChange={(event) => updateCertification(index, 'licenseNumber', event.target.value)} placeholder="Enter license number" className="w-full bg-bg-surface border border-border-ui rounded-lg px-3 py-3 text-sm outline-none focus:border-action-blue" />
                        </label>
                        <div className="sm:col-span-2">
                          <input
                            id={`certification-document-${index}`}
                            type="file"
                            accept=".pdf,image/jpeg,image/png"
                            onChange={(event) => handleCertificationDocumentChange(index, event)}
                            className="hidden"
                          />
                          <label htmlFor={`certification-document-${index}`} className="block border-2 border-dashed border-border-ui rounded-lg p-5 text-center bg-bg-surface cursor-pointer hover:border-action-blue">
                            <FileUp className="mx-auto text-action-blue" size={26} />
                            <p className="text-action-blue text-sm font-bold mt-2">Upload certificate document</p>
                            <p className="text-text-sec text-xs mt-1">PDF, JPG, or PNG</p>
                          </label>
                          {certification.documentFileName || certification.documentUrl ? (
                            <div className="mt-2 rounded-lg bg-bg-surface border border-border-ui px-3 py-2 text-xs text-text-sec">
                              {certification.documentFileName || certification.documentUrl}
                            </div>
                          ) : null}
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
                  {serviceOptions.length ? (
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
                  ) : (
                    <div className="mt-3 rounded-lg border border-border-ui bg-bg-page px-4 py-3 text-sm text-text-sec">
                      No service categories available from API.
                    </div>
                  )}
                </div>

                <label className="block space-y-1.5 mt-7">
                  <span className="text-sm font-bold text-text-main">Associated Companies</span>
                  <div className="border border-border-ui rounded-lg bg-bg-page p-3">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {form.associatedCompanies.map((company) => (
                        <span key={company} className="inline-flex items-center gap-2 bg-action-blue text-white rounded-md px-3 py-1.5 text-sm font-bold">
                          {company}
                          <button type="button" onClick={() => removeOrganisation(company)} aria-label={`Remove ${company}`}>
                            <X size={14} />
                          </button>
                        </span>
                      ))}
                    </div>
                    <input
                      value={form.organisationQuery}
                      onChange={(event) => updateField('organisationQuery', event.target.value)}
                      placeholder={organisationsLoading ? 'Loading organisations...' : 'Search organisation by name or category'}
                      className="w-full bg-bg-surface border border-border-ui rounded-lg px-3 py-3 text-sm outline-none focus:border-action-blue"
                    />
                    <div className="mt-3 max-h-56 overflow-y-auto rounded-lg border border-border-ui bg-bg-surface">
                      {filteredOrganisations.length ? filteredOrganisations.map((organisation) => (
                        <button
                          key={`${organisation.name}-${organisation.category}`}
                          type="button"
                          onClick={() => addOrganisation(organisation.name)}
                          className="w-full text-left px-3 py-2.5 hover:bg-bg-page border-b border-border-ui last:border-b-0"
                        >
                          <span className="block text-sm font-bold text-text-main">{organisation.name}</span>
                          {organisation.category ? <span className="block text-xs text-text-sec mt-0.5">{organisation.category}</span> : null}
                        </button>
                      )) : (
                        <div className="px-3 py-3 text-sm text-text-sec">No organisations found.</div>
                      )}
                    </div>
                  </div>
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
