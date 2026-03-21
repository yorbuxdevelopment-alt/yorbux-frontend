import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Mail, ChevronLeft, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ForgotPassword = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-bg-page flex flex-col items-center font-sans">
      
      <div className="w-full max-w-[1200px] flex justify-between items-center p-6">
        <div className="flex items-center gap-2">
          <img src={theme === 'dark' ? '/logo/yor-bux-dark-logo.png' : '/logo/yor-bux-primary-logo.png'} alt="Yorbux" className="h-8" />
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 text-text-sec text-sm font-medium bg-bg-surface px-4 py-2 rounded-xl border border-border-ui shadow-sm">
            English (UK) <ChevronDown size={16} />
          </button>
          <button onClick={toggleTheme} className="p-2 rounded-full bg-bg-surface border border-border-ui text-text-sec">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center w-full px-4 mt-[-60px]">
        <div className="text-center mb-8">
          <h1 className="text-text-main text-[32px] font-bold mb-2 tracking-tight">Forgot password?</h1>
          <p className="text-text-sec text-[15px] font-medium">Enter your details to receive a reset link</p>
        </div>

        <div className="bg-bg-surface w-full max-w-[480px] rounded-[32px] p-10 md:p-14 shadow-sm border border-border-ui/50">
          <div className="space-y-6">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-sec" size={18} />
              <input 
                type="email" 
                placeholder="ahmed@gmail.com" 
                className="w-full bg-bg-surface border border-border-ui rounded-2xl py-4 pl-12 pr-4 text-text-main focus:border-action-blue transition-all outline-none"
              />
            </div>

            <button className="w-full bg-action-blue hover:opacity-90 text-white py-4 rounded-2xl font-bold text-[16px] shadow-lg shadow-action-blue/20 transition-all">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;