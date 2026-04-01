import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ChevronLeft } from 'lucide-react';

const ForgotPassword = () => {
  const navigate = useNavigate();

  const handleSend = (e) => {
    e.preventDefault();
    // API call for sending OTP will go here
    navigate('/verify-otp');
  };

  return (
    <div className="min-h-screen bg-bg-page flex flex-col items-center justify-center font-sans px-4">
      <div className="w-full flex justify-center">
        <div className="bg-bg-surface w-full max-w-[480px] rounded-[32px] p-10 md:p-14 shadow-sm border border-border-ui/50">
          <div className="text-center mb-8">
            <img src='/logo/yor-bux-primary-logo.png' alt="Yorbux" className="h-20 mx-auto mb-4" />
            <h1 className="text-text-main text-[32px] font-bold mb-2 tracking-tight">Forgot password?</h1>
            <p className="text-text-sec text-[15px] font-medium">Enter your details to receive a reset link</p>
          </div>

          <form onSubmit={handleSend} className="space-y-6">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-sec" size={18} />
              <input 
                type="email" 
                placeholder="ahmed@gmail.com" 
                className="w-full bg-bg-surface border border-border-ui rounded-2xl py-4 pl-12 pr-4 text-text-main focus:border-action-blue transition-all outline-none"
              />
            </div>

            <button type="submit" className="w-full bg-action-blue hover:opacity-90 text-white py-4 rounded-2xl font-bold text-[16px] shadow-lg shadow-action-blue/20 transition-all">
              Send
            </button>

            <div className="text-center">
              <Link to="/signin">
                <button className="flex items-center justify-center gap-2 text-action-blue text-[14px] font-bold hover:underline mx-auto">
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

export default ForgotPassword;