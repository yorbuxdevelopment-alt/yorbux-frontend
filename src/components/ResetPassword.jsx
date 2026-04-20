import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, ChevronLeft, Eye, EyeOff } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../redux/slice/authActions'; // Corrected import path

const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      return setError('Passwords do not match');
    }

    setError('');
    setSuccess('');
    setLoading(true);
    
    const email = localStorage.getItem('resetEmail') || "";
    const otp = localStorage.getItem('resetOtp') || "";

    try {
      // Backend ki requirement ke hisaab se exact payload structure
      const payload = {
        email: email,
        username: "",
        mobile: "",
        phone: "",
        otp: otp,
        newPassword: newPassword,
        confirmPassword: confirmPassword
      };

      await dispatch(resetPassword(payload)).unwrap();
      setSuccess('Password reset successfully!');
      localStorage.removeItem('resetEmail');
      localStorage.removeItem('resetOtp');
      setTimeout(() => navigate('/signin'), 2000);
    } catch (err) {
      console.error('Reset Password Error:', err);
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
            <h1 className="text-text-main text-2xl md:text-[32px] font-bold mb-1 md:mb-2 tracking-tight">Reset password</h1>
            <p className="text-text-sec text-[13px] md:text-[15px] font-medium px-2 md:px-0">Set a new password for your account</p>
          </div>

          <form onSubmit={handlePasswordReset} className="space-y-4 md:space-y-5">
            {/* New Password Input */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-sec" size={18} />
              <input 
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password" 
                required
                className="w-full bg-bg-surface border border-border-ui rounded-2xl py-3 pl-12 pr-12 text-text-main focus:border-action-blue transition-all outline-none"
              />
              {showNewPassword ? (
                <Eye 
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-sec cursor-pointer hover:text-text-main" 
                  size={20} 
                  onClick={() => setShowNewPassword(false)} 
                />
              ) : (
                <EyeOff 
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-sec cursor-pointer hover:text-text-main" 
                  size={20} 
                  onClick={() => setShowNewPassword(true)} 
                />
              )}
            </div>

            {/* Confirm Password Input */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-sec" size={18} />
              <input 
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm New Password" 
                required
                className="w-full bg-bg-surface border border-border-ui rounded-2xl py-3 pl-12 pr-12 text-text-main focus:border-action-blue transition-all outline-none"
              />
              {showConfirmPassword ? (
                <Eye className="absolute right-4 top-1/2 -translate-y-1/2 text-text-sec cursor-pointer hover:text-text-main" size={20} onClick={() => setShowConfirmPassword(false)} />
              ) : (
                <EyeOff className="absolute right-4 top-1/2 -translate-y-1/2 text-text-sec cursor-pointer hover:text-text-main" size={20} onClick={() => setShowConfirmPassword(true)} />
              )}
            </div>
            {error && <p className="text-red-500 text-sm px-1">{error}</p>}
            {success && <p className="text-green-500 text-sm px-1">{success}</p>}

            <button type="submit" disabled={loading} className="w-full bg-action-blue hover:opacity-90 text-white py-2.5 md:py-3 rounded-2xl font-bold text-[15px] md:text-[16px] shadow-lg shadow-action-blue/20 transition-all mt-1 md:mt-2 disabled:opacity-70">
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>

            <div className="text-center pt-2">
              <Link to="/signin">
                <button type="button" className="flex items-center justify-center gap-2 text-action-blue text-[14px] font-bold hover:underline mx-auto">
                  <ChevronLeft size={16} strokeWidth={3} />
                  Back to Sign In
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;