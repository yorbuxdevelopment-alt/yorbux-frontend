import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Mail, Lock, Eye, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faApple } from '@fortawesome/free-brands-svg-icons';

const SignIn = ({ onLogin }) => {
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

      <div className="flex-1 flex flex-col items-center justify-center w-full px-4 mt-[-50px]">
        <div className="text-center mb-10">
          <h1 className="text-text-main text-[32px] font-bold mb-2">Sign In</h1>
          <p className="text-text-sec text-[16px]">Welcome back, you've been missed!</p>
        </div>

        <div className="bg-bg-surface w-full max-w-[520px] rounded-[32px] p-12 shadow-sm border border-border-ui/50">
          
          <div className="flex gap-4 mb-8">
            <button className="flex-1 flex items-center justify-center gap-3 bg-bg-page hover:bg-border-ui/50 py-3.5 rounded-2xl text-text-main font-bold text-[14px] transition-all border border-border-ui">
              <FontAwesomeIcon icon={faGoogle} className="text-lg" />
              Log in with Google
            </button>
            <button className="flex-1 flex items-center justify-center gap-3 bg-bg-page hover:bg-border-ui/50 py-3.5 rounded-2xl text-text-main font-bold text-[14px] transition-all border border-border-ui">
              <FontAwesomeIcon icon={faApple} className="text-xl" />
              Log in with Apple
            </button>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-[1px] bg-border-ui"></div>
            <span className="text-text-sec text-[12px] font-bold">OR</span>
            <div className="flex-1 h-[1px] bg-border-ui"></div>
          </div>

          <div className="space-y-5">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-sec" size={20} />
              <input type="email" placeholder="ahmed@gmail.com" className="w-full bg-bg-surface border border-border-ui rounded-2xl py-4 pl-12 pr-4 text-text-main focus:ring-2 focus:ring-action-blue/20 focus:border-action-blue transition-all outline-none"/>
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-sec" size={20} />
              <input type="password" placeholder="hwahmed07" className="w-full bg-bg-surface border border-border-ui rounded-2xl py-4 pl-12 pr-12 text-text-main focus:ring-2 focus:ring-action-blue/20 focus:border-action-blue transition-all outline-none"/>
              <Eye className="absolute right-4 top-1/2 -translate-y-1/2 text-text-sec cursor-pointer" size={20} />
            </div>

            <div className="flex justify-between items-center px-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-border-ui text-action-blue focus:ring-action-blue" />
                <span className="text-text-main text-[14px] font-medium group-hover:text-action-blue">Remember me</span>
              </label>
              <Link to="/forgot-password">
                <button className="text-action-blue text-[14px] font-bold hover:underline">Forgot Password?</button>
              </Link>
            </div>

            <button onClick={onLogin} className="w-full bg-action-blue hover:opacity-90 text-white py-4 rounded-2xl font-bold text-[16px] shadow-lg shadow-action-blue/20 transition-all mt-4">
              Sign In
            </button>
          </div>
        </div>

        <p className="mt-8 text-text-main text-[15px] font-medium">
          You haven't any account? 
          <Link to="/signup">
            <button className="text-action-blue font-bold hover:underline ml-1">Sign Up</button>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;