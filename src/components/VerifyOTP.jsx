import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { KeyRound, ChevronLeft } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { verifyOTP } from '../redux/authActions';

const VerifyOTP = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    
    const email = localStorage.getItem('resetEmail');

    try {
      const data = await dispatch(verifyOTP({ email, otp })).unwrap();
      setSuccess('OTP verified!');
      if (data.resetToken) localStorage.setItem('resetToken', data.resetToken); // Optional: if backend gives a token
      setTimeout(() => navigate('/reset-password'), 1500);
    } catch (err) {
      console.error('Verify OTP Error:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-page flex flex-col items-center font-sans">
      <div className="flex-1 flex flex-col items-center justify-center w-full px-4 py-6 md:py-8">
        <div className="bg-bg-surface w-full max-w-[480px] rounded-[24px] md:rounded-[32px] p-6 sm:p-8 md:p-10 shadow-sm border border-border-ui/50">
          <div className="text-center mb-5 md:mb-6">
            <img src='/logo/yor-bux-primary-logo.png' alt="Yorbux" className="h-12 md:h-14 mx-auto mb-3 md:mb-4" />
            <h1 className="text-text-main text-2xl md:text-[32px] font-bold mb-1 md:mb-2 tracking-tight">Enter OTP</h1>
            <p className="text-text-sec text-[13px] md:text-[15px] font-medium px-2 md:px-0">We've sent a 6-digit code to your email</p>
          </div>

          <form onSubmit={handleVerify} className="space-y-4 md:space-y-6">
            <div className="relative">
              <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-text-sec" size={18} />
              <input 
                type="text" 
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit OTP" 
                required
                maxLength={6}
                className="w-full bg-bg-surface border border-border-ui rounded-2xl py-3 pl-12 pr-4 text-text-main focus:border-action-blue transition-all outline-none tracking-widest"
              />
            </div>
            {error && <p className="text-red-500 text-sm px-1">{error}</p>}
            {success && <p className="text-green-500 text-sm px-1">{success}</p>}

            <button type="submit" disabled={loading} className="w-full bg-action-blue hover:opacity-90 text-white py-2.5 md:py-3 rounded-2xl font-bold text-[15px] md:text-[16px] shadow-lg shadow-action-blue/20 transition-all disabled:opacity-70">
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>

            <div className="text-center pt-2">
              <Link to="/forgot-password">
                <button type="button" className="flex items-center justify-center gap-2 text-action-blue text-[14px] font-bold hover:underline mx-auto">
                  <ChevronLeft size={16} strokeWidth={3} />
                  Back to Forgot Password
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;