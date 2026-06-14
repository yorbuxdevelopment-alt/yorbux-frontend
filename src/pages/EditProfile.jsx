import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Camera, ChevronDown, CheckCircle, Search, X, User, Briefcase, ArrowRight, ArrowLeft, Save, LoaderCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getMyProfile, updateMyProfessionalProfile, updateMyProfile } from '../services/profile';
import { getCompanies } from '../services/masters';

const prefixOptions = ['Mr.', 'Ms.', 'Mrs.', 'Dr.', 'Prof.'];
const experienceOptions = [
  { label: '0-1 Years', value: '1' },
  { label: '1-3 Years', value: '3' },
  { label: '3-5 Years', value: '5' },
  { label: '5+ Years', value: '6' }
];

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

const normalizeCompanyName = (company) => {
  if (typeof company === 'string') return company;
  return company?.name || company?.companyName || company?.title || '';
};

const normalizeLocationPart = (value) => {
  const text = String(value || '').trim();
  if (!text) return '';
  const normalized = text.toLowerCase();
  if (['not specified', 'unknown', 'n/a', 'na', 'none', 'null', 'undefined'].includes(normalized)) return '';
  return text;
};

const hasMeaningfulLocationValue = (value) => Boolean(normalizeLocationPart(value));

const isLocationFilled = (formData) =>
  hasMeaningfulLocationValue(formData.city) ||
  hasMeaningfulLocationValue(formData.state) ||
  hasMeaningfulLocationValue(formData.country);

const formatDetectedLocation = (location = {}) => {
  const city = normalizeLocationPart(
    location.city || location.town || location.village || location.suburb || location.municipality || location.city_district || ''
  );
  const state = normalizeLocationPart(location.state || location.region || location.county || location.state_district || '');
  const country = normalizeLocationPart(location.country || location.country_code || '');

  return {
    city,
    state,
    country
  };
};

const detectLocationFromIp = async () => {
  const response = await fetch('https://ipapi.co/json/');
  if (!response.ok) {
    throw new Error('IP location lookup failed');
  }

  const data = await response.json();
  return {
    city: normalizeLocationPart(data.city),
    state: normalizeLocationPart(data.region || data.region_code),
    country: normalizeLocationPart(data.country_name || data.country)
  };
};

const SearchSelect = ({
  label,
  value,
  onChange,
  placeholder,
  options,
  loading = false,
  getOptionValue = (option) => option,
  getOptionMeta = () => '',
  onSearch
}) => {
  const [query, setQuery] = useState(value || '');
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    setQuery(value || '');
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!containerRef.current?.contains(event.target)) {
        setOpen(false);
        setQuery(value || '');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [value]);

  const visibleOptions = useMemo(() => {
    if (onSearch) return options;
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return options;
    return options.filter((option) => String(getOptionValue(option)).toLowerCase().includes(normalizedQuery));
  }, [getOptionValue, onSearch, options, query]);

  const handleQueryChange = (event) => {
    const nextQuery = event.target.value;
    setQuery(nextQuery);
    setOpen(true);
    if (onSearch) onSearch(nextQuery);
  };

  const handleSelect = (option) => {
    const nextValue = getOptionValue(option);
    onChange(nextValue);
    setQuery(nextValue);
    setOpen(false);
  };

  const clearValue = () => {
    onChange('');
    setQuery('');
    setOpen(false);
    if (onSearch) onSearch('');
  };

  return (
    <div ref={containerRef}>
      <label className="block text-[12px] font-bold text-gray-600 mb-1.5">{label}</label>
      <div className="relative">
        <div className="relative flex items-center bg-slate-50 border border-gray-200 rounded-xl px-3 py-2.5 transition-all focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500">
          <Search size={16} className="text-gray-400 mr-2 shrink-0" />
          <input
            value={query}
            onChange={handleQueryChange}
            onFocus={() => {
              setOpen(true);
              if (onSearch) onSearch(query);
            }}
            placeholder={loading ? 'Loading...' : placeholder}
            className="w-full min-w-0 bg-transparent text-[14px] text-gray-700 outline-none"
          />
          {value ? (
            <button type="button" onClick={clearValue} className="text-gray-400 ml-2 hover:text-gray-600" aria-label={`Clear ${label}`}>
              <X size={16} />
            </button>
          ) : null}
        </div>
        {open ? (
          <div className="absolute z-30 mt-2 max-h-56 w-full overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-lg">
            {loading ? (
              <div className="px-3 py-3 text-sm text-gray-500">Loading...</div>
            ) : visibleOptions.length ? (
              visibleOptions.map((option) => {
                const optionValue = getOptionValue(option);
                const meta = getOptionMeta(option);

                return (
                  <button
                    key={`${label}-${optionValue}-${meta}`}
                    type="button"
                    onClick={() => handleSelect(option)}
                    className="w-full border-b border-gray-100 px-3 py-2.5 text-left last:border-b-0 hover:bg-slate-50"
                  >
                    <span className="block text-sm font-bold text-gray-800">{optionValue}</span>
                    {meta ? <span className="mt-0.5 block text-xs text-gray-500">{meta}</span> : null}
                  </button>
                );
              })
            ) : (
              <div className="px-3 py-3 text-sm text-gray-500">No results found.</div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

const CompanySearchSelect = ({ label, value, onChange, placeholder }) => {
  const [query, setQuery] = useState('');
  const [companies, setCompanies] = useState([]);
  const [loadingCompanies, setLoadingCompanies] = useState(false);

  useEffect(() => {
    let active = true;
    const trimmedQuery = query.trim();
    const timer = window.setTimeout(async () => {
      setLoadingCompanies(true);

      try {
        const data = await getCompanies({ q: trimmedQuery, limit: 25 });
        if (!active) return;
        setCompanies(Array.isArray(data) ? data : []);
      } catch {
        if (active) setCompanies([]);
      } finally {
        if (active) setLoadingCompanies(false);
      }
    }, trimmedQuery ? 250 : 0);

    return () => {
      active = false;
      window.clearTimeout(timer);
    };
  }, [query]);

  return (
    <SearchSelect
      label={label}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      options={companies.slice(0, 25)}
      loading={loadingCompanies}
      getOptionValue={normalizeCompanyName}
      getOptionMeta={(company) => company?.category || ''}
      onSearch={setQuery}
    />
  );
};

const getCompletion = (formData) => {
  const keys = [
    formData.firstName,
    formData.lastName,
    formData.email,
    formData.mobile,
    formData.country,
    formData.state,
    formData.city,
    formData.organisation,
    formData.designation,
    formData.aboutUser
  ];

  return Math.round((keys.filter(Boolean).length / keys.length) * 100);
};

const dataUrlToBlob = async (dataUrl) => {
  const response = await fetch(dataUrl);
  return response.blob();
};

const getProfileSaveErrorMessage = (error) => {
  const backendMessage = error?.response?.data?.message || error?.message || '';
  const normalizedMessage = String(backendMessage).toLowerCase();

  if (!backendMessage) {
    return 'Unable to save profile. Please try again in a moment.';
  }

  if (normalizedMessage.includes('network error')) {
    return 'Unable to connect to the server. Please check your internet connection or API URL.';
  }

  if (normalizedMessage.includes('timeout')) {
    return 'The request timed out. Please try again.';
  }

  if (normalizedMessage.includes('profile_pic') || normalizedMessage.includes('only image') || normalizedMessage.includes('file')) {
    return 'Profile picture upload failed. Please try again with a JPG or PNG image.';
  }

  if (normalizedMessage.includes('accessdenied') || normalizedMessage.includes('s3') || normalizedMessage.includes('bucket')) {
    return 'There is a storage issue with the profile picture upload. The backend storage configuration needs to be checked.';
  }

  if (normalizedMessage.includes('email already exists')) {
    return 'This email address is already being used by another account.';
  }

  if (normalizedMessage.includes('mobile number already exists')) {
    return 'This mobile number is already being used by another account.';
  }

  return backendMessage;
};

const EditProfile = () => {
  const [activeStep, setActiveStep] = useState(1);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    prefix: 'Mr.',
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    mobile: '',
    secondaryMobile: '',
    country: '',
    state: '',
    city: '',
    organisation: '',
    designation: '',
    totalExperience: '',
    previousOrganisation: '',
    previousDesignation: '',
    aboutUser: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [profileImage, setProfileImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [croppedImageBlob, setCroppedImageBlob] = useState(null);
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [locationDetecting, setLocationDetecting] = useState(false);
  const [locationDetected, setLocationDetected] = useState(false);
  const [locationDetectionError, setLocationDetectionError] = useState('');
  const dragStart = useRef({ x: 0, y: 0 });
  const fileInputRef = useRef(null);
  const locationAttemptedRef = useRef(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getMyProfile();
        const user = data.user || {};
        const professional = data.professionalDetail || {};

        setFormData({
          prefix: user.prefix || 'Mr.',
          firstName: user.firstName || '',
          middleName: user.middleName || '',
          lastName: user.lastName || '',
          email: user.email || '',
          mobile: user.mobile || '',
          secondaryMobile: user.secondaryMobile || '',
          country: user.country || '',
          state: user.state || '',
          city: user.city || '',
          organisation: professional.organisation || user.organisation || '',
          designation: professional.designation || user.designation || '',
          totalExperience: professional.totalExperience !== undefined && professional.totalExperience !== null
            ? String(professional.totalExperience)
            : '',
          previousOrganisation: professional.previousOrganisation || '',
          previousDesignation: professional.previousDesignation || '',
          aboutUser: professional.aboutUser || ''
        });
        setProfileImage(user.profileImage || null);
      } catch (requestError) {
        setError(requestError.response?.data?.message || 'Profile load nahi ho paaya');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  useEffect(() => {
    if (loading || locationAttemptedRef.current || isLocationFilled(formData)) return;

    let active = true;
    locationAttemptedRef.current = true;
    setLocationDetecting(true);
    setLocationDetectionError('');

    const applyDetectedLocation = (detected) => {
      if (!active) return;

      const nextLocation = {
        city: normalizeLocationPart(detected.city),
        state: normalizeLocationPart(detected.state),
        country: normalizeLocationPart(detected.country)
      };

      setFormData((current) => ({
        ...current,
        city: hasMeaningfulLocationValue(current.city) ? current.city : nextLocation.city,
        state: hasMeaningfulLocationValue(current.state) ? current.state : nextLocation.state,
        country: hasMeaningfulLocationValue(current.country) ? current.country : nextLocation.country
      }));

      setLocationDetected(Boolean(nextLocation.city || nextLocation.state || nextLocation.country));
      if (!nextLocation.city && !nextLocation.state && !nextLocation.country) {
        setLocationDetectionError('Could not detect a precise location automatically.');
      }
      setLocationDetecting(false);
    };

    const detect = async () => {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            try {
              const { latitude, longitude } = position.coords;
              const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
              const data = await response.json();
              const detected = formatDetectedLocation(data.address || {});

              if (detected.city || detected.state || detected.country) {
                applyDetectedLocation(detected);
                return;
              }

              const ipDetected = await detectLocationFromIp();
              applyDetectedLocation(ipDetected);
            } catch {
              try {
                const ipDetected = await detectLocationFromIp();
                applyDetectedLocation(ipDetected);
              } catch {
                if (active) {
                  setLocationDetecting(false);
                  setLocationDetectionError('Could not detect location automatically.');
                }
              }
            }
          }, async () => {
            try {
              const ipDetected = await detectLocationFromIp();
              applyDetectedLocation(ipDetected);
            } catch {
              if (active) {
                setLocationDetecting(false);
                setLocationDetectionError('Location permission was denied. You can enter it manually.');
              }
            }
          }, {
            enableHighAccuracy: false,
            timeout: 10000,
            maximumAge: 300000
          });
          return;
        }

        const ipDetected = await detectLocationFromIp();
        applyDetectedLocation(ipDetected);
      } catch {
        if (active) {
          setLocationDetecting(false);
          setLocationDetectionError('Could not detect location automatically.');
        }
      }
    };

    detect();

    return () => {
      active = false;
    };
  }, [formData, loading]);

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value
    }));
  };

  const handleImageSelect = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setZoom(1);
      setOffset({ x: 0, y: 0 });
      setIsCropModalOpen(true);
    }
    event.target.value = '';
  };

  const handleMouseDown = (event) => {
    setIsDragging(true);
    dragStart.current = { x: event.clientX - offset.x, y: event.clientY - offset.y };
  };

  const handleMouseMove = (event) => {
    if (!isDragging) return;
    setOffset({ x: event.clientX - dragStart.current.x, y: event.clientY - dragStart.current.y });
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleTouchStart = (event) => {
    setIsDragging(true);
    dragStart.current = { x: event.touches[0].clientX - offset.x, y: event.touches[0].clientY - offset.y };
  };

  const handleTouchMove = (event) => {
    if (!isDragging) return;
    setOffset({ x: event.touches[0].clientX - dragStart.current.x, y: event.touches[0].clientY - dragStart.current.y });
  };

  const handleCropAndUpdate = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = selectedImage;
    img.onload = async () => {
      canvas.width = 400;
      canvas.height = 400;

      const coverScale = Math.max(canvas.width / img.width, canvas.height / img.height);
      const finalScale = coverScale * zoom;
      const scaledWidth = img.width * finalScale;
      const scaledHeight = img.height * finalScale;
      const centerX = (canvas.width - scaledWidth) / 2;
      const centerY = (canvas.height - scaledHeight) / 2;
      const offsetRatio = canvas.width / 256;

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, centerX + (offset.x * offsetRatio), centerY + (offset.y * offsetRatio), scaledWidth, scaledHeight);

      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      setProfileImage(dataUrl);
      setCroppedImageBlob(await dataUrlToBlob(dataUrl));
      setIsCropModalOpen(false);
    };
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      let generalPayload = null;

      if (croppedImageBlob) {
        generalPayload = new FormData();
        generalPayload.append('prefix', formData.prefix);
        generalPayload.append('firstName', formData.firstName);
        generalPayload.append('middleName', formData.middleName);
        generalPayload.append('lastName', formData.lastName);
        generalPayload.append('email', formData.email);
        generalPayload.append('mobile', formData.mobile);
        generalPayload.append('secondaryMobile', formData.secondaryMobile);
        generalPayload.append('country', formData.country);
        generalPayload.append('state', formData.state);
        generalPayload.append('city', formData.city);
        generalPayload.append('profile_pic', croppedImageBlob, 'profile.jpg');
      } else {
        generalPayload = {
          prefix: formData.prefix,
          firstName: formData.firstName,
          middleName: formData.middleName,
          lastName: formData.lastName,
          email: formData.email,
          mobile: formData.mobile,
          secondaryMobile: formData.secondaryMobile,
          country: formData.country,
          state: formData.state,
          city: formData.city
        };
      }

      const [generalResponse] = await Promise.all([
        updateMyProfile(generalPayload),
        updateMyProfessionalProfile({
          organisation: formData.organisation,
          totalExperience: formData.totalExperience ? Number(formData.totalExperience) : undefined,
          designation: formData.designation,
          previousOrganisation: formData.previousOrganisation,
          previousDesignation: formData.previousDesignation,
          aboutUser: formData.aboutUser
        })
      ]);

      if (generalResponse.profileImage) {
        setProfileImage(generalResponse.profileImage);
        setCroppedImageBlob(null);
      }

      setSuccess('Profile updated successfully');
    } catch (requestError) {
      setError(getProfileSaveErrorMessage(requestError));
    } finally {
      setSaving(false);
    }
  };

  const completion = getCompletion(formData);

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-slate-50 via-blue-50/30 to-teal-50/20 -m-4 sm:-m-6 p-4 md:p-6 lg:p-8 overflow-hidden relative rounded-xl">
      <div className="absolute inset-0 opacity-[0.25] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

      <div className="w-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 relative z-10">
        <div className="col-span-1 lg:col-span-3 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 p-8 flex flex-col items-center justify-center">
            <div className="relative mb-4">
              <div className="w-32 h-32 rounded-full bg-gray-100 border-4 border-white shadow-md flex items-center justify-center overflow-hidden">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="text-gray-300 w-16 h-16" />
                )}
              </div>
              <input type="file" accept="image/png, image/jpeg, image/jpg" ref={fileInputRef} onChange={handleImageSelect} className="hidden" />
              <button onClick={() => fileInputRef.current?.click()} className="absolute bottom-1 right-1 bg-blue-600 p-2.5 rounded-full border-2 border-white shadow-sm hover:bg-blue-700 active:scale-95 transition-all text-white">
                <Camera size={18} />
              </button>
            </div>
            <h3 className="text-gray-800 font-extrabold text-[15px]">Profile Picture</h3>
            <p className="mt-1 text-[12px] font-medium text-gray-500">Allowed formats: JPG, PNG</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 p-5">
            <div className="flex items-center gap-3 text-gray-800 font-bold text-[14px] mb-4">
              <div className="p-2 bg-blue-50 rounded-lg">
                <CheckCircle size={18} className="text-blue-500" />
              </div>
              Profiling
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 mb-2 overflow-hidden shadow-inner">
              <div className="bg-teal-500 h-2 rounded-full relative" style={{ width: `${completion}%` }}></div>
            </div>
            <div className="text-right text-[12px] text-gray-500 font-bold">{completion}% Completed</div>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-9 h-full">
          <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 flex flex-col overflow-hidden min-h-[650px]">
            <div className="flex px-6 pt-6 border-b border-gray-100 gap-8">
              <button onClick={() => setActiveStep(1)} className={`pb-4 text-[15px] font-extrabold transition-all flex items-center gap-2 border-b-2 outline-none ${activeStep === 1 ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-400 hover:text-gray-600'}`}>
                <User size={18} className={activeStep === 1 ? 'text-blue-600' : 'text-gray-400'} />
                General Info
              </button>
              <button onClick={() => setActiveStep(2)} className={`pb-4 text-[15px] font-extrabold transition-all flex items-center gap-2 border-b-2 outline-none ${activeStep === 2 ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-400 hover:text-gray-600'}`}>
                <Briefcase size={18} className={activeStep === 2 ? 'text-blue-600' : 'text-gray-400'} />
                Professional
              </button>
            </div>

            <div className="p-6 flex-1 overflow-y-auto no-scrollbar animate-in fade-in duration-300">
              {loading ? <p className="text-sm text-gray-500">Profile loading...</p> : null}
              {error ? <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div> : null}
              {success ? <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{success}</div> : null}

              {!loading && activeStep === 1 ? (
                <div className="space-y-8">
                  <div>
                    <label className="block text-[14px] font-extrabold text-gray-900 mb-2">About You <span className="text-red-500">*</span></label>
                    <textarea name="aboutUser" value={formData.aboutUser} onChange={handleFieldChange} className="w-full bg-slate-50 border border-gray-200 rounded-xl p-4 text-[14px] text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none transition-all shadow-inner placeholder-gray-400 min-h-[90px]" placeholder="Write a brief introduction about yourself..."></textarea>
                  </div>

                  <div>
                    <h4 className="text-[13px] font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2 uppercase tracking-wide">Personal Details</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                      <div>
                        <label className="block text-[12px] font-bold text-gray-600 mb-1.5">Prefix <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <select name="prefix" value={formData.prefix} onChange={handleFieldChange} className="w-full appearance-none bg-slate-50 border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] text-gray-700 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none cursor-pointer transition-all">
                            {prefixOptions.map((prefix) => <option key={prefix}>{prefix}</option>)}
                          </select>
                          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[12px] font-bold text-gray-600 mb-1.5">First Name <span className="text-red-500">*</span></label>
                        <input name="firstName" value={formData.firstName} onChange={handleFieldChange} type="text" className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] text-gray-700 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[12px] font-bold text-gray-600 mb-1.5">Middle Name</label>
                        <input name="middleName" value={formData.middleName} onChange={handleFieldChange} type="text" className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] text-gray-700 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[12px] font-bold text-gray-600 mb-1.5">Last Name <span className="text-red-500">*</span></label>
                        <input name="lastName" value={formData.lastName} onChange={handleFieldChange} type="text" className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] text-gray-700 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[13px] font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2 uppercase tracking-wide">Contact & Location</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      <div>
                        <label className="block text-[12px] font-bold text-gray-600 mb-1.5">Email</label>
                        <input name="email" value={formData.email} onChange={handleFieldChange} type="email" className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] text-gray-700 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[12px] font-bold text-gray-600 mb-1.5">Mobile</label>
                        <input name="mobile" value={formData.mobile} onChange={handleFieldChange} type="text" className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] text-gray-700 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[12px] font-bold text-gray-600 mb-1.5">Secondary Mobile</label>
                        <input name="secondaryMobile" value={formData.secondaryMobile} onChange={handleFieldChange} type="text" className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] text-gray-700 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[12px] font-bold text-gray-600 mb-1.5">Country <span className="text-red-500">*</span></label>
                        <div className="relative flex items-center bg-slate-50 border border-gray-200 rounded-xl px-3 py-2.5 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
                          <Search size={16} className="text-gray-400 mr-2" />
                          <input name="country" value={formData.country} onChange={handleFieldChange} type="text" className="w-full bg-transparent text-[14px] text-gray-700 outline-none" />
                          {formData.country ? <X size={16} onClick={() => setFormData((current) => ({ ...current, country: '' }))} className="text-gray-400 ml-2 cursor-pointer hover:text-gray-600" /> : null}
                        </div>
                          <p className="mt-1 text-[11px] text-gray-500">
                          {locationDetecting ? 'Detecting current location...' : locationDetected ? 'Location auto-filled from this device.' : locationDetectionError || 'You can type this manually if needed.'}
                        </p>
                      </div>
                      <div>
                        <label className="block text-[12px] font-bold text-gray-600 mb-1.5">State <span className="text-red-500">*</span></label>
                        <input name="state" value={formData.state} onChange={handleFieldChange} type="text" className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] text-gray-700 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[12px] font-bold text-gray-600 mb-1.5">Location <span className="text-red-500">*</span></label>
                        <input name="city" value={formData.city} onChange={handleFieldChange} type="text" className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] text-gray-700 outline-none transition-all" />
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}

              {!loading && activeStep === 2 ? (
                <div className="space-y-8">
                  <div>
                    <h4 className="text-[13px] font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2 uppercase tracking-wide">Current Role</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <CompanySearchSelect
                          label="Organisation"
                          value={formData.organisation}
                          onChange={(value) => setFormData((current) => ({ ...current, organisation: value }))}
                          placeholder="Search organisation by name or category"
                        />
                      </div>
                      <div>
                        <SearchSelect
                          label="Designation"
                          value={formData.designation}
                          onChange={(value) => setFormData((current) => ({ ...current, designation: value }))}
                          placeholder="Search designation"
                          options={designationOptions}
                        />
                      </div>
                      <div>
                        <label className="block text-[12px] font-bold text-gray-600 mb-1.5">Total Experience (Years)</label>
                        <div className="relative">
                          <select name="totalExperience" value={formData.totalExperience} onChange={handleFieldChange} className="w-full appearance-none bg-slate-50 border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] text-gray-700 outline-none cursor-pointer transition-all">
                            <option value="">Select Total Experience</option>
                            {experienceOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                          </select>
                          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[13px] font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2 uppercase tracking-wide">Previous Role</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <CompanySearchSelect
                          label="Previous Organisation"
                          value={formData.previousOrganisation}
                          onChange={(value) => setFormData((current) => ({ ...current, previousOrganisation: value }))}
                          placeholder="Search previous organisation"
                        />
                      </div>
                      <div>
                        <SearchSelect
                          label="Previous Designation"
                          value={formData.previousDesignation}
                          onChange={(value) => setFormData((current) => ({ ...current, previousDesignation: value }))}
                          placeholder="Search previous designation"
                          options={designationOptions}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="p-5 border-t border-gray-100 bg-gray-50/80 flex items-center justify-between">
              {activeStep === 1 ? (
                <>
                  <button onClick={() => navigate(-1)} className="px-6 py-2.5 text-blue-700 font-bold text-[14px] hover:bg-blue-100/50 rounded-xl transition-colors active:scale-95">Cancel</button>
                  <button onClick={() => setActiveStep(2)} className="flex items-center gap-2 px-8 py-2.5 bg-blue-600 text-white font-bold text-[14px] hover:bg-blue-700 rounded-xl shadow-md shadow-blue-600/20 transition-all active:scale-95">Next Step <ArrowRight size={16} /></button>
                </>
              ) : (
                <>
                  <button onClick={() => setActiveStep(1)} className="flex items-center gap-2 px-6 py-2.5 text-gray-600 font-bold text-[14px] hover:bg-gray-200/60 rounded-xl transition-colors active:scale-95"><ArrowLeft size={16} /> Back</button>
                  <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-8 py-2.5 bg-slate-900 text-white font-bold text-[14px] hover:bg-slate-800 rounded-xl shadow-md transition-all active:scale-95 disabled:opacity-70">
                    {saving ? <LoaderCircle size={16} className="animate-spin" /> : <Save size={16} />}
                    {saving ? 'Saving...' : 'Save Profile'}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {isCropModalOpen ? (
        <div className="fixed inset-0 bg-black/60 z-[99] flex items-center justify-center p-4 backdrop-blur-sm select-none">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-in zoom-in-95 duration-200 overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50/50">
              <div>
                <h3 className="text-[17px] font-extrabold text-gray-900">Adjust Picture</h3>
                <p className="text-[12px] text-gray-500 font-medium mt-0.5">Drag to pan, use slider to zoom</p>
              </div>
              <button onClick={() => setIsCropModalOpen(false)} className="text-gray-400 hover:text-gray-600 hover:bg-gray-200 p-2 rounded-full transition-all">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 flex justify-center bg-gray-50/30">
              <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-100 relative cursor-move touch-none group" onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleMouseUp}>
                <img src={selectedImage} alt="Crop Preview" draggable="false" style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`, transformOrigin: 'center', willChange: 'transform' }} className="w-full h-full object-cover pointer-events-none" />

                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-full h-full flex flex-col justify-evenly absolute top-0 left-0">
                    <div className="w-full h-[1px] bg-white/60 shadow-sm" />
                    <div className="w-full h-[1px] bg-white/60 shadow-sm" />
                  </div>
                  <div className="w-full h-full flex justify-evenly absolute top-0 left-0">
                    <div className="w-[1px] h-full bg-white/60 shadow-sm" />
                    <div className="w-[1px] h-full bg-white/60 shadow-sm" />
                  </div>
                </div>
              </div>
            </div>

            <div className="px-8 pb-6 bg-gray-50/30">
              <div className="flex items-center gap-4">
                <span className="text-gray-400"><Search size={16} /></span>
                <input type="range" min="1" max="3" step="0.01" value={zoom} onChange={(event) => setZoom(parseFloat(event.target.value))} className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                <span className="text-gray-600 font-bold text-[13px] min-w-[36px] text-right">{Math.round(zoom * 100)}%</span>
              </div>
            </div>

            <div className="flex justify-end gap-3 p-5 border-t border-gray-100 bg-white">
              <button onClick={() => setIsCropModalOpen(false)} className="px-6 py-2.5 text-gray-600 font-bold text-[14px] hover:bg-gray-100 rounded-xl transition-colors active:scale-95">
                Cancel
              </button>
              <button onClick={handleCropAndUpdate} className="px-8 py-2.5 bg-blue-600 text-white font-bold text-[14px] hover:bg-blue-700 rounded-xl shadow-md shadow-blue-600/20 transition-all active:scale-95 flex items-center gap-2">
                <CheckCircle size={16} /> Apply
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default EditProfile;
