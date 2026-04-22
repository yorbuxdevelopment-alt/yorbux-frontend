import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/slice/authActions';
import { clearError } from '../redux/slice/authSlice';
import api from '../../api';

const GOOGLE_SCRIPT_ID = 'google-gsi-script';
const FACEBOOK_SCRIPT_ID = 'facebook-sdk-script';

const loadExternalScript = (id, src) => new Promise((resolve, reject) => {
  const existing = document.getElementById(id);
  if (existing) {
    if (existing.dataset.loaded === 'true') {
      resolve();
      return;
    }

    existing.addEventListener('load', resolve, { once: true });
    existing.addEventListener('error', reject, { once: true });
    return;
  }

  const script = document.createElement('script');
  script.id = id;
  script.src = src;
  script.async = true;
  script.defer = true;
  script.onload = () => {
    script.dataset.loaded = 'true';
    resolve();
  };
  script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
  document.body.appendChild(script);
});

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState('');
  const [socialLoading, setSocialLoading] = useState('');

  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';
  const facebookAppId = import.meta.env.VITE_FACEBOOK_APP_ID || '';

  const handleAuthSuccess = (data) => {
    localStorage.setItem('token', data.token);
    navigate('/');
    window.location.reload();
  };

  const handleSocialError = (message) => {
    setLocalError(message);
    setSocialLoading('');
  };

  const handleLoginSubmit = async () => {
    if (!email || !password) {
      return setLocalError('Email and Password are required');
    }
    setLocalError('');
    dispatch(clearError());
    try {
      const response = await dispatch(loginUser({ email, password })).unwrap();
      localStorage.setItem('token', response.token);
      navigate('/');
      window.location.reload();
    } catch (err) {
      console.error('Sign In Error:', err);
    }
  };

  useEffect(() => {
    if (!googleClientId) {
      return undefined;
    }

    let isMounted = true;

    loadExternalScript(GOOGLE_SCRIPT_ID, 'https://accounts.google.com/gsi/client')
      .then(() => {
        if (!isMounted || !window.google?.accounts?.id) {
          return;
        }

        window.google.accounts.id.initialize({
          client_id: googleClientId,
          callback: async (response) => {
            setLocalError('');
            setSocialLoading('google');
            try {
              const { data } = await api.post('/auth/google', { idToken: response.credential });
              handleAuthSuccess(data);
            } catch (requestError) {
              handleSocialError(requestError.response?.data?.message || 'Google login failed');
            }
          }
        });

        window.google.accounts.id.renderButton(
          document.getElementById('googleSignInContainer'),
          { type: 'icon', theme: 'outline', shape: 'circle', size: 'large' }
        );
      })
      .catch(() => {
        if (isMounted) {
          setLocalError('Google login SDK load nahi ho paya');
        }
      });

    return () => {
      isMounted = false;
    };
  }, [googleClientId]);

  useEffect(() => {
    if (!facebookAppId) {
      return undefined;
    }

    let isMounted = true;

    window.fbAsyncInit = function () {
      if (!isMounted || !window.FB) {
        return;
      }

      window.FB.init({
        appId: facebookAppId,
        cookie: true,
        xfbml: false,
        version: 'v23.0'
      });
    };

    loadExternalScript(FACEBOOK_SCRIPT_ID, 'https://connect.facebook.net/en_US/sdk.js').catch(() => {
      if (isMounted) {
        setLocalError('Facebook SDK load nahi ho paya');
      }
    });

    return () => {
      isMounted = false;
    };
  }, [facebookAppId]);

  const handleFacebookLogin = () => {
    if (!window.FB) {
      setLocalError('Facebook SDK abhi ready nahi hai');
      return;
    }

    setLocalError('');
    setSocialLoading('facebook');

    window.FB.login((loginResponse) => {
      if (!loginResponse?.authResponse?.accessToken) {
        handleSocialError('Facebook login cancel ho gaya');
        return;
      }

      api.post('/auth/facebook', {
        accessToken: loginResponse.authResponse.accessToken
      })
        .then(({ data }) => {
          handleAuthSuccess(data);
        })
        .catch((requestError) => {
          handleSocialError(requestError.response?.data?.message || 'Facebook login failed');
        });
    }, { scope: 'email,public_profile' });
  };

  return (
    <div className="min-h-screen bg-bg-page flex flex-col items-center font-sans">
      <div className="flex-1 flex flex-col items-center justify-center w-full px-4 py-6 md:py-8">
        <div className="bg-bg-surface w-full max-w-[520px] rounded-[24px] md:rounded-[32px] p-6 sm:p-8 md:p-10 shadow-sm border border-border-ui/50">
          <div className="text-center mb-6">
            <img src='/logo/yor-bux-primary-logo.png' alt="Yorbux" className="h-12 md:h-14 mx-auto mb-3 md:mb-4" />
            <h3 className="text-text-main text-2xl md:text-[32px] font-bold mb-1 md:mb-2">Welcome</h3>
            <p className="text-text-sec text-sm md:text-[16px] px-2 md:px-0">Stay ahead in your career. Sign in to discover new opportunities and keep up with the latest in your professional world</p>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-center gap-4">
              {googleClientId ? (
                <div 
                  title="Continue with Google" 
                  className="relative w-10 h-10 shrink-0 flex items-center justify-center bg-white border border-border-ui rounded-full shadow-sm hover:bg-gray-50 transition-all cursor-pointer overflow-hidden"
                >
                  {/* Custom Google SVG Icon */}
                  <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  
                  {/* Invisible Google Button Overlay */}
                  <div className="absolute inset-0 z-10 opacity-[0.01] flex items-center justify-center">
                    <div id="googleSignInContainer"></div>
                  </div>
                </div>
              ) : null}

              {facebookAppId ? (
                <button
                  type="button"
                  onClick={handleFacebookLogin}
                  disabled={socialLoading === 'facebook'}
                  // title="Continue with Facebook"
                  className="flex items-center justify-center w-10 h-10 bg-[#1877F2] hover:bg-[#166fe5] disabled:opacity-70 text-white rounded-full transition-all border border-[#1877F2] shadow-sm shrink-0"
                >
                  {socialLoading === 'facebook' ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  ) : (
                    <span className="text-2xl font-bold">f</span>
                  )}
                </button>
              ) : null}
            </div>

            {(googleClientId || facebookAppId) ? (
              <div className="flex items-center gap-4 pt-5">
                <div className="flex-1 h-[1px] bg-border-ui"></div>
                <span className="text-text-sec text-[12px] font-bold">OR</span>
                <div className="flex-1 h-[1px] bg-border-ui"></div>
              </div>
            ) : null}
          </div>

          <div className="space-y-4 md:space-y-5">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-sec" size={20} />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ahmed@gmail.com" className="w-full bg-bg-surface border border-border-ui rounded-2xl py-3 pl-12 pr-4 text-text-main focus:ring-2 focus:ring-action-blue/20 focus:border-action-blue transition-all outline-none"/>
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-sec" size={20} />
              <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="hwahmed07" className="w-full bg-bg-surface border border-border-ui rounded-2xl py-3 pl-12 pr-12 text-text-main focus:ring-2 focus:ring-action-blue/20 focus:border-action-blue transition-all outline-none"/>
              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-sec hover:text-text-main transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
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

            <button onClick={handleLoginSubmit} disabled={loading} className="w-full bg-action-blue hover:opacity-90 text-white py-3 rounded-2xl font-bold text-[16px] shadow-lg shadow-action-blue/20 transition-all mt-2 md:mt-4 disabled:opacity-70">
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </div>

          <p className="mt-6 md:mt-8 text-center text-text-main text-[15px] font-medium">
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



