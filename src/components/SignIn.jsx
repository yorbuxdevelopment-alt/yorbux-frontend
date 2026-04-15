import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Mail, Lock, Eye, Moon, Sun } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/slice/authActions';
import { clearError } from '../redux/slice/authSlice';
// import { useTheme } from '../context/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faGoogle, faApple } from '@fortawesome/free-brands-svg-icons';

const SignIn = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  // const { theme, toggleTheme } = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');

  const handleLoginSubmit = async () => {
    if (!email || !password) {
      return setLocalError("Email and Password are required");
    }
    setLocalError('');
    dispatch(clearError());
    try {
      await dispatch(loginUser({ email, password })).unwrap();
      // Navigation automatically handled in App.jsx Route element
    } catch (err) {
      console.error('Sign In Error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-bg-page flex flex-col items-center font-sans">
      
      {/* <div className="w-full max-w-[1200px] flex justify-between items-center p-6">
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
      </div> */}

      <div className="flex-1 flex flex-col items-center justify-center w-full px-4">

        <div className="bg-bg-surface w-full max-w-[520px] rounded-[32px] p-8 md:p-12 shadow-sm border border-border-ui/50">
          
          <div className="text-center mb-8">
            <img src= '/logo/yor-bux-primary-logo.png' alt="Yorbux" className="h-16 mx-auto mb-4" />
            <h3 className="text-text-main text-2xl md:text-[32px] font-bold mb-2">Welcome</h3>
            <p className="text-text-sec text-sm md:text-[16px]">Stay ahead in your career. Sign in to discover new opportunities and keep up with the latest in your professional world</p>
          </div>

          {/* <div className="flex gap-4 mb-8">
            <button className="flex-1 flex items-center justify-center gap-3 bg-bg-page hover:bg-border-ui/50 py-3.5 rounded-2xl text-text-main font-bold text-[14px] transition-all border border-border-ui">
              <FontAwesomeIcon icon={faGoogle} className="text-lg" />
              Log in with Google
            </button>
            <button className="flex-1 flex items-center justify-center gap-3 bg-bg-page hover:bg-border-ui/50 py-3.5 rounded-2xl text-text-main font-bold text-[14px] transition-all border border-border-ui">
              <FontAwesomeIcon icon={faApple} className="text-xl" />
              Log in with Apple
            </button>
          </div> */}

          {/* <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-[1px] bg-border-ui"></div>
            <span className="text-text-sec text-[12px] font-bold">OR</span>
            <div className="flex-1 h-[1px] bg-border-ui"></div>
          </div> */}

          <div className="space-y-5">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-sec" size={20} />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ahmed@gmail.com" className="w-full bg-bg-surface border border-border-ui rounded-2xl py-3 pl-12 pr-4 text-text-main focus:ring-2 focus:ring-action-blue/20 focus:border-action-blue transition-all outline-none"/>
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-sec" size={20} />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="hwahmed07" className="w-full bg-bg-surface border border-border-ui rounded-2xl py-3 pl-12 pr-12 text-text-main focus:ring-2 focus:ring-action-blue/20 focus:border-action-blue transition-all outline-none"/>
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
        
            {localError && <p className="text-red-500 text-sm px-1">{localError}</p>}
            {error && <p className="text-red-500 text-sm px-1">{error}</p>}

            <button onClick={handleLoginSubmit} disabled={loading} className="w-full bg-action-blue hover:opacity-90 text-white py-3 rounded-2xl font-bold text-[16px] shadow-lg shadow-action-blue/20 transition-all mt-4 disabled:opacity-70">
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </div>

          <p className="mt-8 text-center text-text-main text-[15px] font-medium">
            You haven't any account? 
            <Link to="/signup">
              <button className="text-action-blue font-bold hover:underline ml-1">Register now</button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;