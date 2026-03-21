import React from 'react';
import { ChevronDown, Mail, User, Lock, EyeOff, Calendar, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faApple } from '@fortawesome/free-brands-svg-icons';

const SignUp = () => {
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

      <div className="flex-1 flex flex-col items-center justify-center w-full px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-text-main text-[32px] font-bold mb-2">Getting Started</h1>
          <p className="text-text-sec text-[15px]">Create an account to continue and connect with the people.</p>
        </div>

        <div className="bg-bg-surface w-full max-w-[580px] rounded-[32px] p-10 md:p-14 shadow-sm border border-border-ui/50">
          
          <div className="flex gap-4 mb-8">
            <button className="flex-1 flex items-center justify-center gap-3 bg-bg-page hover:bg-border-ui/50 py-3.5 rounded-2xl text-text-main font-bold text-[13px] transition-all border border-border-ui">
              <FontAwesomeIcon icon={faGoogle} className="text-lg" />
              Log in with Google
            </button>
            <button className="flex-1 flex items-center justify-center gap-3 bg-bg-page hover:bg-border-ui/50 py-3.5 rounded-2xl text-text-main font-bold text-[13px] transition-all border border-border-ui">
              <FontAwesomeIcon icon={faApple} className="text-xl" />
              Log in with Apple
            </button>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-[1px] bg-border-ui"></div>
            <span className="text-text-sec text-[12px] font-bold tracking-widest">OR</span>
            <div className="flex-1 h-[1px] bg-border-ui"></div>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-sec" size={18} />
              <input type="email" placeholder="Your Email" className="w-full bg-bg-surface border border-border-ui rounded-2xl py-4 pl-12 pr-4 text-text-main focus:border-action-blue outline-none"/>
            </div>
            <p className="text-red-500 text-[11px] font-bold pl-1">Please enter a valid email address.</p>

            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-text-sec" size={18} />
              <input type="text" placeholder="Your Name" className="w-full bg-bg-surface border border-border-ui rounded-2xl py-4 pl-12 pr-4 text-text-main focus:border-action-blue outline-none"/>
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-sec" size={18} />
              <input type="password" placeholder="Create Password" className="w-full bg-bg-surface border border-border-ui rounded-2xl py-4 pl-12 pr-12 text-text-main focus:border-action-blue outline-none"/>
              <EyeOff className="absolute right-4 top-1/2 -translate-y-1/2 text-text-sec cursor-pointer" size={18} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-text-sec" size={18} />
                <input type="text" placeholder="Date of birth" className="w-full bg-bg-surface border border-border-ui rounded-2xl py-4 pl-12 pr-4 text-text-main outline-none"/>
              </div>
              <div className="flex items-center justify-around border border-border-ui rounded-2xl py-4 px-4 bg-bg-surface">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="gender" className="w-4 h-4 text-action-blue focus:ring-action-blue" defaultChecked />
                  <span className="text-text-main text-[13px] font-bold">Male</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="gender" className="w-4 h-4 text-action-blue focus:ring-action-blue" />
                  <span className="text-text-main text-[13px] font-bold">Female</span>
                </label>
              </div>
            </div>

            <button className="w-full bg-action-blue hover:opacity-90 text-white py-4 rounded-2xl font-bold text-[16px] shadow-lg shadow-action-blue/20 transition-all mt-4">
              Sign Up
            </button>
          </div>

          <div className="text-center mt-8">
             <p className="text-text-main text-[14px] font-medium">
                Already have an account? <button className="text-action-blue font-bold hover:underline">Sign In</button>
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;