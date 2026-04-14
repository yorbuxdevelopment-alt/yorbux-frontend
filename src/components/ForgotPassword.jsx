import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ChevronLeft, Key } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { forgotPassword, verifyOTP } from '../redux/slice/authActions';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // Step 1: Email, Step 2: OTP
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleSend = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await dispatch(forgotPassword({ email })).unwrap();
      setSuccess('OTP sent successfully!');
      localStorage.setItem('resetEmail', email); // Save email for verification step
      setTimeout(() => {
        setSuccess('');
        setStep(2); // Step 2 me OTP input dikhayega
      }, 1500);
    } catch (err) {
      console.error('Forgot Password Error:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await dispatch(verifyOTP({ email, otp })).unwrap();
      setSuccess('OTP verified successfully!');
      localStorage.setItem('resetOtp', otp); // Save OTP for the next step
      // Verification ke baad Reset Password page par redirect
      setTimeout(() => navigate('/reset-password'), 1500); 
    } catch (err) {
      console.error('Verify OTP Error:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-page flex flex-col items-center justify-center font-sans px-4">
      <div className="w-full flex justify-center">
        <div className="bg-bg-surface w-full max-w-[480px] rounded-[32px] p-10 md:p-14 shadow-sm border border-border-ui/50">
          <div className="text-center mb-8">
            <img src='/logo/yor-bux-primary-logo.png' alt="Yorbux" className="h-20 mx-auto mb-4" />
            <h1 className="text-text-main text-[32px] font-bold mb-2 tracking-tight">
              {step === 1 ? 'Forgot password?' : 'Verify OTP'}
            </h1>
            <p className="text-text-sec text-[15px] font-medium">
              {step === 1 ? 'Enter your details to receive a reset link' : `We sent a verification code to ${email}`}
            </p>
          </div>

          <form onSubmit={step === 1 ? handleSend : handleVerifyOTP} className="space-y-6">
            {step === 1 ? (
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-sec" size={18} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ahmed@gmail.com" 
                  required
                  className="w-full bg-bg-surface border border-border-ui rounded-2xl py-4 pl-12 pr-4 text-text-main focus:border-action-blue transition-all outline-none"
                />
              </div>
            ) : (
              <div className="relative">
                <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-text-sec" size={18} />
                <input 
                  type="text" 
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6-digit OTP" 
                  required
                  className="w-full bg-bg-surface border border-border-ui rounded-2xl py-4 pl-12 pr-4 text-text-main focus:border-action-blue transition-all outline-none"
                />
              </div>
            )}
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}

            <button type="submit" disabled={loading} className="w-full bg-action-blue hover:opacity-90 text-white py-4 rounded-2xl font-bold text-[16px] shadow-lg shadow-action-blue/20 transition-all disabled:opacity-70">
              {step === 1 ? (loading ? 'Sending...' : 'Send OTP') : (loading ? 'Verifying...' : 'Verify OTP')}
            </button>

            <div className="text-center">
              {step === 2 ? (
                <button type="button" onClick={() => { setStep(1); setError(''); setSuccess(''); }} className="flex items-center justify-center gap-2 text-action-blue text-[14px] font-bold hover:underline mx-auto">
                  <ChevronLeft size={16} strokeWidth={3} />
                  Back to Email
                </button>
              ) : (
                <Link to="/signin">
                  <button className="flex items-center justify-center gap-2 text-action-blue text-[14px] font-bold hover:underline mx-auto">
                    <ChevronLeft size={16} strokeWidth={3} />
                    Back to Sign In
                  </button>
                </Link>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;