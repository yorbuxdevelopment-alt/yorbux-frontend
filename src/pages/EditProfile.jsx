import React, { useState, useRef } from 'react';
import { Camera, ChevronDown, CheckCircle, Search, X, User, Briefcase, ArrowRight, ArrowLeft, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const [activeStep, setActiveStep] = useState(1);
  const navigate = useNavigate();

  // --- Image Upload & Crop States ---
  const [profileImage, setProfileImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const fileInputRef = useRef(null);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setZoom(1);
      setOffset({ x: 0, y: 0 }); // Reset offset on new image
      setIsCropModalOpen(true);
    }
    e.target.value = ''; // Reset file input
  };

  // --- Drag & Pan Handlers ---
  const handleMouseDown = (e) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX - offset.x, y: e.clientY - offset.y };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setOffset({ x: e.clientX - dragStart.current.x, y: e.clientY - dragStart.current.y });
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleTouchStart = (e) => {
    setIsDragging(true);
    dragStart.current = { x: e.touches[0].clientX - offset.x, y: e.touches[0].clientY - offset.y };
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    setOffset({ x: e.touches[0].clientX - dragStart.current.x, y: e.touches[0].clientY - dragStart.current.y });
  };

  // --- Crop Canvas Execution ---
  const handleCropAndUpdate = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = selectedImage;
    img.onload = () => {
      canvas.width = 400; // High resolution output
      canvas.height = 400;
      
      const coverScale = Math.max(canvas.width / img.width, canvas.height / img.height);
      const finalScale = coverScale * zoom;
      const scaledWidth = img.width * finalScale;
      const scaledHeight = img.height * finalScale;
      const centerX = (canvas.width - scaledWidth) / 2;
      const centerY = (canvas.height - scaledHeight) / 2;

      // Apply drag offset (UI container w-64 = 256px)
      const offsetRatio = canvas.width / 256;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, centerX + (offset.x * offsetRatio), centerY + (offset.y * offsetRatio), scaledWidth, scaledHeight);
      
      setProfileImage(canvas.toDataURL('image/jpeg', 0.9));
      setIsCropModalOpen(false);
    };
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-slate-50 via-blue-50/30 to-teal-50/20 -m-4 sm:-m-6 p-4 md:p-6 lg:p-8 overflow-hidden relative rounded-xl">
      {/* --- GEOMETRIC PATTERN OVERLAY --- */}
      <div 
        className="absolute inset-0 opacity-[0.25] pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '32px 32px' }}
      ></div>

      {/* --- FULL WIDTH CONTAINER --- */}
      <div className="w-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 relative z-10">
        
        {/* --- LEFT SIDEBAR (3 COLS) --- */}
        <div className="col-span-1 lg:col-span-3 space-y-6">
          
          {/* Profile Image Card */}
          <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 p-8 flex flex-col items-center justify-center">
            <div className="relative mb-4">
              <div className="w-32 h-32 rounded-full bg-gray-100 border-4 border-white shadow-md flex items-center justify-center overflow-hidden">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="text-gray-300 w-16 h-16" />
                )}
              </div>
              <input 
                type="file" 
                accept="image/png, image/jpeg, image/jpg" 
                ref={fileInputRef} 
                onChange={handleImageSelect} 
                className="hidden" 
              />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-1 right-1 bg-blue-600 p-2.5 rounded-full border-2 border-white shadow-sm hover:bg-blue-700 active:scale-95 transition-all text-white"
              >
                <Camera size={18} />
              </button>
            </div>
            <h3 className="text-gray-800 font-extrabold text-[15px]">Profile Picture</h3>
            <p className="mt-1 text-[12px] font-medium text-gray-500">Allowed formats: JPG, PNG</p>
          </div>

          {/* Profiling Card */}
          <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 p-5">
            <div className="flex items-center gap-3 text-gray-800 font-bold text-[14px] mb-4">
              <div className="p-2 bg-blue-50 rounded-lg">
                <CheckCircle size={18} className="text-blue-500" />
              </div>
              Profiling
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 mb-2 overflow-hidden shadow-inner">
              <div className="bg-teal-500 h-2 rounded-full relative" style={{ width: '0%' }}></div>
            </div>
            <div className="text-right text-[12px] text-gray-500 font-bold">0% Completed</div>
          </div>
        </div>

        {/* --- MAIN FORM (9 COLS) --- */}
        <div className="col-span-1 lg:col-span-9 h-full">
          <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 flex flex-col overflow-hidden min-h-[650px]">
            
            {/* STEPPER HEADER */}
            <div className="flex px-6 pt-6 border-b border-gray-100 gap-8">
              <button 
                onClick={() => setActiveStep(1)} 
                className={`pb-4 text-[15px] font-extrabold transition-all flex items-center gap-2 border-b-2 outline-none ${activeStep === 1 ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
              >
                <User size={18} className={activeStep === 1 ? 'text-blue-600' : 'text-gray-400'} /> 
                General Info
              </button>
              <button 
                onClick={() => setActiveStep(2)} 
                className={`pb-4 text-[15px] font-extrabold transition-all flex items-center gap-2 border-b-2 outline-none ${activeStep === 2 ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
              >
                <Briefcase size={18} className={activeStep === 2 ? 'text-blue-600' : 'text-gray-400'} /> 
                Professional
              </button>
            </div>

            {/* SCROLLABLE CONTENT AREA */}
            <div className="p-6 flex-1 overflow-y-auto no-scrollbar animate-in fade-in duration-300">
              
              {/* ---- STEP 1: GENERAL INFO ---- */}
              {activeStep === 1 && (
                <div className="space-y-8">
                  {/* About You */}
                  <div>
                    <label className="block text-[14px] font-extrabold text-gray-900 mb-2">About You <span className="text-red-500">*</span></label>
                    <textarea 
                      className="w-full bg-slate-50 border border-gray-200 rounded-xl p-4 text-[14px] text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none transition-all shadow-inner placeholder-gray-400 min-h-[90px]"
                      placeholder="Write a brief introduction about yourself..."
                    ></textarea>
                  </div>

                  {/* Personal Details */}
                  <div>
                    <h4 className="text-[13px] font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2 uppercase tracking-wide">Personal Details</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                      <div>
                        <label className="block text-[12px] font-bold text-gray-600 mb-1.5">Prefix <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <select className="w-full appearance-none bg-slate-50 border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] text-gray-700 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none cursor-pointer transition-all">
                            <option>Mr.</option><option>Ms.</option><option>Mrs.</option>
                          </select>
                          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[12px] font-bold text-gray-600 mb-1.5">First Name <span className="text-red-500">*</span></label>
                        <input type="text" placeholder="First Name" className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] text-gray-700 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[12px] font-bold text-gray-600 mb-1.5">Middle Name</label>
                        <input type="text" placeholder="Middle Name" className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] text-gray-700 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[12px] font-bold text-gray-600 mb-1.5">Last Name <span className="text-red-500">*</span></label>
                        <input type="text" placeholder="Last Name" className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] text-gray-700 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all" />
                      </div>
                    </div>
                  </div>

                  {/* Contact & Location */}
                  <div>
                    <h4 className="text-[13px] font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2 uppercase tracking-wide">Contact & Location</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      <div>
                        <label className="block text-[12px] font-bold text-gray-600 mb-1.5">Email</label>
                        <input type="email" disabled defaultValue="user@example.com" className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] text-gray-500 cursor-not-allowed opacity-80" />
                      </div>
                      <div>
                        <label className="block text-[12px] font-bold text-gray-600 mb-1.5">Mobile</label>
                        <input type="text" disabled defaultValue="+91 9876543210" className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] text-gray-500 cursor-not-allowed opacity-80" />
                      </div>
                      <div>
                        <label className="block text-[12px] font-bold text-gray-600 mb-1.5">Secondary Mobile</label>
                        <input type="text" placeholder="Secondary Mobile" className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] text-gray-700 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[12px] font-bold text-gray-600 mb-1.5">Country <span className="text-red-500">*</span></label>
                        <div className="relative flex items-center bg-slate-50 border border-gray-200 rounded-xl px-3 py-2.5 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
                          <Search size={16} className="text-gray-400 mr-2" />
                          <input type="text" placeholder="Search Country" className="w-full bg-transparent text-[14px] text-gray-700 outline-none" />
                          <X size={16} className="text-gray-400 ml-2 cursor-pointer hover:text-gray-600" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[12px] font-bold text-gray-600 mb-1.5">State <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <select className="w-full appearance-none bg-slate-50 border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] text-gray-700 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none cursor-pointer transition-all">
                            <option>Select State</option>
                          </select>
                          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[12px] font-bold text-gray-600 mb-1.5">Location <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <select className="w-full appearance-none bg-slate-50 border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] text-gray-700 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none cursor-pointer transition-all">
                            <option>Select Location</option>
                          </select>
                          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ---- STEP 2: PROFESSIONAL INFO ---- */}
              {activeStep === 2 && (
                <div className="space-y-8">
                  {/* Current Role */}
                  <div>
                    <h4 className="text-[13px] font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2 uppercase tracking-wide">Current Role</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[12px] font-bold text-gray-600 mb-1.5">Organisation</label>
                        <div className="relative">
                          <select className="w-full appearance-none bg-slate-50 border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] text-gray-700 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none cursor-pointer transition-all"><option>Select Organisation</option></select>
                          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[12px] font-bold text-gray-600 mb-1.5">Designation</label>
                        <div className="relative">
                          <select className="w-full appearance-none bg-slate-50 border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] text-gray-700 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none cursor-pointer transition-all"><option>Select Designation</option></select>
                          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[12px] font-bold text-gray-600 mb-1.5">Total Experience (Years)</label>
                        <div className="relative">
                          <select className="w-full appearance-none bg-slate-50 border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] text-gray-700 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none cursor-pointer transition-all">
                            <option>Select Total Experience</option><option>0-1 Years</option><option>1-3 Years</option><option>3-5 Years</option><option>5+ Years</option>
                          </select>
                          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Previous Role */}
                  <div>
                    <h4 className="text-[13px] font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2 uppercase tracking-wide">Previous Role</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[12px] font-bold text-gray-600 mb-1.5">Previous Organisation</label>
                        <div className="relative">
                          <select className="w-full appearance-none bg-slate-50 border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] text-gray-700 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none cursor-pointer transition-all"><option>Select Previous Organisation</option></select>
                          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[12px] font-bold text-gray-600 mb-1.5">Previous Designation</label>
                        <div className="relative">
                          <select className="w-full appearance-none bg-slate-50 border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] text-gray-700 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none cursor-pointer transition-all"><option>Select Previous Designation</option></select>
                          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* FOOTER ACTIONS */}
            <div className="p-5 border-t border-gray-100 bg-gray-50/80 flex items-center justify-between">
              {activeStep === 1 ? (
                <>
                  <button onClick={() => navigate(-1)} className="px-6 py-2.5 text-blue-700 font-bold text-[14px] hover:bg-blue-100/50 rounded-xl transition-colors active:scale-95">Cancel</button>
                  <button onClick={() => setActiveStep(2)} className="flex items-center gap-2 px-8 py-2.5 bg-blue-600 text-white font-bold text-[14px] hover:bg-blue-700 rounded-xl shadow-md shadow-blue-600/20 transition-all active:scale-95">Next Step <ArrowRight size={16} /></button>
                </>
              ) : (
                <>
                  <button onClick={() => setActiveStep(1)} className="flex items-center gap-2 px-6 py-2.5 text-gray-600 font-bold text-[14px] hover:bg-gray-200/60 rounded-xl transition-colors active:scale-95"><ArrowLeft size={16} /> Back</button>
                  <button className="flex items-center gap-2 px-8 py-2.5 bg-slate-900 text-white font-bold text-[14px] hover:bg-slate-800 rounded-xl shadow-md transition-all active:scale-95"><Save size={16} /> Save Profile</button>
                </>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* --- CROP & UPLOAD MODAL --- */}
      {isCropModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-[99] flex items-center justify-center p-4 backdrop-blur-sm select-none">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-in zoom-in-95 duration-200 overflow-hidden">
            
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50/50">
              <div>
                <h3 className="text-[17px] font-extrabold text-gray-900">Adjust Picture</h3>
                <p className="text-[12px] text-gray-500 font-medium mt-0.5">Drag to pan, use slider to zoom</p>
              </div>
              <button onClick={() => setIsCropModalOpen(false)} className="text-gray-400 hover:text-gray-600 hover:bg-gray-200 p-2 rounded-full transition-all">
                <X size={20} />
              </button>
            </div>
            
            {/* Crop Area */}
            <div className="p-6 flex justify-center bg-gray-50/30">
              <div 
                className="w-64 h-64 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-100 relative cursor-move touch-none group"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleMouseUp}
              >
                <img 
                  src={selectedImage} 
                  alt="Crop Preview" 
                  draggable="false"
                  style={{ 
                    transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`, 
                    transformOrigin: 'center',
                    willChange: 'transform'
                  }} 
                  className="w-full h-full object-cover pointer-events-none" 
                />
                
                {/* 3x3 Grid Overlay on Hover */}
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

            {/* Slider */}
            <div className="px-8 pb-6 bg-gray-50/30">
              <div className="flex items-center gap-4">
                <span className="text-gray-400"><Search size={16} /></span>
                <input 
                  type="range" 
                  min="1" 
                  max="3" 
                  step="0.01" 
                  value={zoom} 
                  onChange={(e) => setZoom(parseFloat(e.target.value))} 
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" 
                />
                <span className="text-gray-600 font-bold text-[13px] min-w-[36px] text-right">{Math.round(zoom * 100)}%</span>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex justify-end gap-3 p-5 border-t border-gray-100 bg-white">
              <button 
                onClick={() => setIsCropModalOpen(false)} 
                className="px-6 py-2.5 text-gray-600 font-bold text-[14px] hover:bg-gray-100 rounded-xl transition-colors active:scale-95"
              >
                Cancel
              </button>
              <button 
                onClick={handleCropAndUpdate} 
                className="px-8 py-2.5 bg-blue-600 text-white font-bold text-[14px] hover:bg-blue-700 rounded-xl shadow-md shadow-blue-600/20 transition-all active:scale-95 flex items-center gap-2"
              >
                <CheckCircle size={16} /> Apply
              </button>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;