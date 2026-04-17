import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye } from 'lucide-react';
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
          { theme: 'outline', size: 'large', width: 440, shape: 'pill', text: 'continue_with' }
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

    window.FB.login(async (loginResponse) => {
      if (!loginResponse?.authResponse?.accessToken) {
        handleSocialError('Facebook login cancel ho gaya');
        return;
      }

      try {
        const { data } = await api.post('/auth/facebook', {
          accessToken: loginResponse.authResponse.accessToken
        });
        handleAuthSuccess(data);
      } catch (requestError) {
        handleSocialError(requestError.response?.data?.message || 'Facebook login failed');
      }
    }, { scope: 'email,public_profile' });
  };

  return (
    <div className="min-h-screen bg-bg-page flex flex-col items-center font-sans">
      <div className="flex-1 flex flex-col items-center justify-center w-full px-4 py-10">
        <div className="bg-bg-surface w-full max-w-[520px] rounded-[32px] p-8 md:p-12 shadow-sm border border-border-ui/50">
          <div className="text-center mb-8">
            <img src='/logo/yor-bux-primary-logo.png' alt="Yorbux" className="h-16 mx-auto mb-4" />
            <h3 className="text-text-main text-2xl md:text-[32px] font-bold mb-2">Welcome</h3>
            <p className="text-text-sec text-sm md:text-[16px]">Stay ahead in your career. Sign in to discover new opportunities and keep up with the latest in your professional world</p>
          </div>

          <div className="space-y-4 mb-8">
            {googleClientId ? (
              <div id="googleSignInContainer" className="flex justify-center"></div>
            ) : null}

            {facebookAppId ? (
              <button
                type="button"
                onClick={handleFacebookLogin}
                disabled={socialLoading === 'facebook'}
                className="w-full flex items-center justify-center gap-3 bg-[#1877F2] hover:bg-[#166fe5] disabled:opacity-70 text-white py-3.5 rounded-2xl font-bold text-[14px] transition-all border border-[#1877F2]"
              >
                <span className="text-lg font-black">f</span>
                {socialLoading === 'facebook' ? 'Connecting Facebook...' : 'Continue with Facebook'}
              </button>
            ) : null}

            {(googleClientId || facebookAppId) ? (
              <div className="flex items-center gap-4 pt-2">
                <div className="flex-1 h-[1px] bg-border-ui"></div>
                <span className="text-text-sec text-[12px] font-bold">OR</span>
                <div className="flex-1 h-[1px] bg-border-ui"></div>
              </div>
            ) : null}
          </div>

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
