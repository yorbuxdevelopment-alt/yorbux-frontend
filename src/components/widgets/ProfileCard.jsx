import React, { useEffect, useState } from 'react';

const ProfileCard = () => {
  const [percentage, setPercentage] = useState(0);
  const targetPercentage = 92.86;

  // Animation effect for the progress chart
  useEffect(() => {
    setTimeout(() => setPercentage(targetPercentage), 300);
  }, []);

  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-bg-surface p-6 rounded-2xl shadow-sm border border-border-ui text-center">
      <div className="relative inline-block mb-4">
        {/* Profile Completion Chart */}
        <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={radius} className="stroke-border-ui" strokeWidth="6" fill="transparent" />
          <circle 
            cx="50" cy="50" r={radius} 
            className="stroke-action-blue drop-shadow-md" 
            strokeWidth="6" fill="transparent" 
            strokeDasharray={circumference} 
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1.5s ease-in-out' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <img src="https://i.pravatar.cc/150?u=saleh" alt="Profile" className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm" />
        </div>
      </div>

      {/* Typography Hierarchy Improvement */}
      <h2 className="text-xl font-extrabold text-text-main mb-1">Saleh Ahmed</h2>
      <p className="text-sm font-medium text-text-sec mb-4">Senior Software Developer</p>

      <div className="bg-action-blue/10 py-3 px-4 rounded-xl inline-block">
        <p className="text-action-blue font-bold text-sm">Profile Completion</p>
        <p className="text-action-blue text-lg font-extrabold">{targetPercentage}%</p>
      </div>
      
      <p className="text-xs text-text-sec mt-4">Complete your profile to attract more views.</p>
    </div>
  );
};

export default ProfileCard;